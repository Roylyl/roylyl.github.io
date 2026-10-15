import { plannedShuffleIndex } from '../utils/plannedShuffle';
import { cachePlayedTrackAssets } from './playedTrackCache';
/**
 * Song Prefetch Service
 *
 * Prefetches nearby songs in the queue to enable smooth transitions.
 * Handles URL expiration (1200s TTL) and re-prefetches on queue changes.
 */

import { ReplayGainInfo, SongResult, LyricData, OnlineLyricsState, type LyricProviderSource } from '../types';
import { migrateLyricDataRenderHints } from '../utils/lyrics/renderHints';
import { autoMatchBestLyric } from '../utils/lyrics/autoMatchBestLyric';
import { loadOnlineLyricsState, markOnlineLyricsPureMusic, resolveOnlineLyrics, saveOnlineLyricsState } from '../utils/onlineLyricsState';
import type { AudioQualityPreference, MediaId } from '../types/onlineMusic';
import { getPlaybackSourceRef } from '../utils/appPlaybackGuards';
import { omni } from './onlineMusic/omni';
import { getSongResourceCacheKey } from './onlineMusic/resourceKeys';
import { getSongCacheWithLegacyMigration, hasCachedSongAudio } from './onlineMusic/resourceCache';
import { toPlayableAudioUrl, toSafePlaybackUrl } from '../utils/appPlaybackHelpers';
import { getProviderSongMetadata } from './onlineMusic/songMetadata';
import { ensureTrackProfile, setAnalysisScope } from './automix/profileService';
import { modeNeedsBeatGrid } from './automix/transitionStrategy';
import { useLyricSettingsStore } from '../stores/useLyricSettingsStore';
import { useAutomixSettingsStore } from '../stores/useAutomixSettingsStore';
import { useAudioSettingsStore } from '../stores/useAudioSettingsStore';
import { classifyPlaybackError } from './playbackRecovery/onlinePlaybackFailure';
import { getProviderPlaybackCooldown, noteProviderFailure } from './playbackRecovery/providerPlaybackCooldown';
import { getAudioCacheStatus, onResourceCacheInvalidated, subscribeAudioCacheStatus } from './cacheRuntime';
import { getPrefetchWindowIndices } from './prefetchWindow';

// Cache full audio immediately for the current song and the nearby playback window.
// Automix analysis remains independently disabled unless explicitly enabled.
const URL_TTL_MS = 1200 * 1000; // 1200 seconds = 20 minutes
const MAX_PREFETCH_CACHE_SIZE = 200; // Evict least recently used entries beyond this limit

/**
 * Hands a track to the automix analyser with whatever URL this file resolved for it.
 *
 * 'CACHED_IN_DB' is this file's sentinel for "the bytes are in the media cache rather than at a
 * URL", and the analyser finds those on its own - so it gets a null instead of a string it would
 * try to fetch. Never awaited: a slow decode must not hold up the song after this one.
 */
const analyseForAutomix = (song: SongResult, audioUrl: string | null | undefined) => {
  const settingsAudioSettings = useAudioSettingsStore.getState();
  const settingsAutomixSettings = useAutomixSettingsStore.getState();

    // Nothing reads a profile while blending is switched off, and this is not a cheap thing to
    // produce for nobody: the whole file is read, decoded, and put through the beat model in the
    // inference process - per prefetched track, and a prefetch pass covers three of them. Blending
    // is off by default, so without this gate every listener paid for a feature they never enabled.
    //
    // Off is the only state where the profile itself is never wanted, so that is what gates the
    // call. The mode does not: the crossfade planner reads the profile's SILENCE EDGES - `leadIn`
    // and `leadOut` - so a master with eight seconds of padding does not spend the whole fade
    // blending into nothing. Gating the analysis on `transitionMode` would take the silence trim
    // away from crossfade.
    //
    // The BEAT MODEL is a different question, and it is not this file's to answer. Which modes read
    // a grid is a property of the planners, so it is asked of them - `modeNeedsBeatGrid` - rather
    // than restated here. It was restated here once: crossfade ran the model on every prefetched
    // track and threw the answer away, because a comment in this file said crossfade did "beat
    // alignment" and nothing next to the planner could contradict it.
    if (!settingsAutomixSettings.automixEnabled) return;
    void ensureTrackProfile({
        song,
        audioUrl: audioUrl === 'CACHED_IN_DB' ? null : audioUrl ?? null,
        enableMediaCache: settingsAudioSettings.enableMediaCache,
        wantGrid: modeNeedsBeatGrid(settingsAutomixSettings.transitionMode),
    });
};

export interface PrefetchedSongData {
    songKey: string;
    songId: MediaId;
    audioUrl: string | null;
    audioUrlFetchedAt: number;
    audioUrlQuality: string | null; // Track which quality the URL was fetched for
    replayGain?: ReplayGainInfo;
    lyrics: LyricData | null;
    lyricRaw: {
        mainLrc: string | null;
        yrcLrc: string | null;
        transLrc: string | null;
        isPureMusic: boolean;
    } | null;
    lyricPreferenceSource: LyricProviderSource | null;
    coverUrl: string | null;
}

// In-memory prefetch cache (not persisted to IndexedDB to avoid stale URLs)
const prefetchCache = new Map<string, PrefetchedSongData>();

const getPrefetchSongKey = (song: SongResult): string => getSongResourceCacheKey('audio', song);

const touchPrefetchCacheEntry = (songKey: string, data: PrefetchedSongData): PrefetchedSongData => {
    prefetchCache.delete(songKey);
    prefetchCache.set(songKey, data);
    return data;
};

// Track current prefetch operation to cancel on queue change
let currentPrefetchAbortController: AbortController | null = null;
let lastPrefetchRequest: [SongResult, SongResult[], AudioQualityPreference, MediaId | null | undefined] | null = null;
useAudioSettingsStore.subscribe((state, previous) => {
    if (previous.enableMediaCache && !state.enableMediaCache) currentPrefetchAbortController?.abort();
});
subscribeAudioCacheStatus(() => {
    if (getAudioCacheStatus() === 'storage-full') currentPrefetchAbortController?.abort();
    else if (lastPrefetchRequest && useAudioSettingsStore.getState().enableMediaCache) {
        void prefetchNearbySongs(...lastPrefetchRequest).catch(error => console.warn('[Prefetch] Retry failed', error));
    }
});
onResourceCacheInvalidated(() => clearPrefetchRuntime(true));
/**
 * Check if a prefetched URL is still valid (not expired)
 */
export const isUrlValid = (fetchedAt: number): boolean => {
    return Date.now() - fetchedAt < URL_TTL_MS;
};

/**
 * Get prefetched data for a song
 * @param songId - The song ID to get prefetched data for
 * @param requiredQuality - The audio quality to validate against (optional)
 */
export const getPrefetchedData = (song: SongResult, requiredQuality?: AudioQualityPreference): PrefetchedSongData | null => {
    const songKey = getPrefetchSongKey(song);
    const songId = song.id;
    const cached = prefetchCache.get(songKey);
    if (!cached) return null;

    if (cached.audioUrl && cached.audioUrl !== 'CACHED_IN_DB') {
        cached.audioUrl = toSafePlaybackUrl(cached.audioUrl) ?? null;
    }

    // 'CACHED_IN_DB' is not a URL. It says the bytes are already in the media cache, so it has no
    // expiry to run out and no quality to match against - `audioUrlQuality` stays null for one.
    // Both checks below fired on it anyway (null never equals the required quality), and each one
    // ANSWERED by nulling the sentinel. So the first read of a media-cached track threw away the
    // fact that it was cached, and the next prefetch pass rediscovered it from scratch - which is
    // the "Starting prefetch for X" / "Audio already cached for X" pair repeating for the same
    // song every time the queue moves.
    const hasUrl = Boolean(cached.audioUrl) && cached.audioUrl !== 'CACHED_IN_DB';

    // Check if URL is expired
    if (hasUrl && !isUrlValid(cached.audioUrlFetchedAt)) {
        console.log(`[Prefetch] URL expired for song ${songId}, will refetch`);
        cached.audioUrl = null;
        cached.audioUrlQuality = null;
        cached.replayGain = undefined;
    }

    // Check if quality matches (if requiredQuality is specified)
    if (hasUrl && requiredQuality && cached.audioUrlQuality !== requiredQuality) {
        console.log(`[Prefetch] Quality mismatch for song ${songId}: cached=${cached.audioUrlQuality}, required=${requiredQuality}`);
        // Don't use cached URL, but keep other data (lyrics, cover)
        cached.audioUrl = null;
        cached.audioUrlQuality = null;
        cached.replayGain = undefined;
    }

    return touchPrefetchCacheEntry(songKey, cached);
};

/** 预取到的音源：'CACHED_IN_DB' 表示媒体缓存里已有这首歌，否则是 provider 给的地址与它附带的 ReplayGain。 */
export interface PrefetchedAudioUrl {
    audioUrl: string;
    replayGain?: ReplayGainInfo;
}

/**
 * 预取一首歌的音源地址；拿不到时返回 null，调用方什么都不写。
 *
 * provider 在冷却期内（限流 / 服务异常之后）不请求；请求失败按原因登记冷却，但永不回写预取条目、可用性或缓存。
 * 每个 await 之后检查 signal：预取已被新的队列取代时，结果直接丢弃。
 * 不能 import onlinePlayback.ts（它反过来依赖本文件），所以失败归一直接用分类器和冷却模块。
 */
export const resolvePrefetchAudioUrl = async (
    song: SongResult,
    audioQuality: AudioQualityPreference,
    signal: AbortSignal,
): Promise<PrefetchedAudioUrl | null> => {
    const sourceRef = getPlaybackSourceRef(song);
    const providerId = sourceRef.kind === 'online' ? sourceRef.providerId : undefined;
    try {
        const audioExists = await hasCachedSongAudio(song);
        if (signal.aborted) return null;
        if (audioExists) {
            console.log(`[Prefetch] Audio already cached for: ${song.name}`);
            return { audioUrl: 'CACHED_IN_DB' };
        }

        const cooldown = providerId ? getProviderPlaybackCooldown(providerId, 'prefetch') : null;
        if (cooldown) {
            console.log(`[Prefetch] Skipping audio URL for ${song.name}: ${providerId} is cooling down (${Math.ceil(cooldown.remainingMs / 1000)}s left)`);
            return null;
        }

        const audioSource = await omni.getAudioSource(song, audioQuality);
        if (signal.aborted) return null;
        const url = toPlayableAudioUrl(audioSource?.url);
        if (!url) return null;
        console.log(`[Prefetch] Got audio URL for: ${song.name} (quality: ${audioQuality})`);
        return { audioUrl: url, replayGain: audioSource?.replayGain };
    } catch (e) {
        console.warn(`[Prefetch] Failed to get audio URL for ${song.name}:`, e);
        // 只有策略表标了冷却的原因（限流、服务异常）才会真正登记；其余原因在这里是空操作。
        noteProviderFailure(classifyPlaybackError(e, { stage: 'prefetch', providerId }));
        return null;
    }
};

/**
 * Prefetch a single song's resources
 */
const prefetchSong = async (
    song: SongResult,
    audioQuality: AudioQualityPreference,
    signal: AbortSignal,
    userId?: MediaId | null
): Promise<void> => {
    if (signal.aborted) return;

    const sourceRef = getPlaybackSourceRef(song);
    if (sourceRef.kind !== 'online') {
        console.log(`[Prefetch] Skipping non-online song: ${song.name}`);
        return;
    }
    if (!omni.canPlaySong(song)) {
        console.log(`[Prefetch] Skipping unavailable provider for song: ${song.name}`);
        return;
    }

    const songId = song.id;
    const songKey = getPrefetchSongKey(song);

    // Check if already prefetched with valid URL
    const existing = prefetchCache.get(songKey);
    if (existing?.audioUrl && existing.audioUrl !== 'CACHED_IN_DB') {
        existing.audioUrl = toSafePlaybackUrl(existing.audioUrl) ?? null;
    }
  const currentSettingsLyricSettings = useLyricSettingsStore.getState();
    const lyricPreferenceMatches = !currentSettingsLyricSettings.autoUseBestLyric
        || existing?.lyricPreferenceSource === currentSettingsLyricSettings.preferredAlternativeLyricSource;
    if (existing && lyricPreferenceMatches && existing.audioUrl && isUrlValid(existing.audioUrlFetchedAt) && (existing.lyrics || existing.lyricRaw?.isPureMusic)) {
        console.log(`[Prefetch] Already cached: ${song.name}`);
        touchPrefetchCacheEntry(songKey, existing);
        if (useAudioSettingsStore.getState().enableMediaCache && existing.audioUrl !== 'CACHED_IN_DB') {
            await cachePlayedTrackAssets(song, existing.audioUrl, undefined, signal);
        }
        analyseForAutomix(song, existing.audioUrl);
        return;
    }

    console.log(`[Prefetch] Starting prefetch for: ${song.name} (quality: ${audioQuality})`);

    const data: PrefetchedSongData = {
        songKey,
        songId,
        audioUrl: existing?.audioUrl && existing.audioUrlQuality === audioQuality && isUrlValid(existing.audioUrlFetchedAt) ? existing.audioUrl : null,
        audioUrlFetchedAt: existing?.audioUrlFetchedAt || 0,
        audioUrlQuality: existing?.audioUrlQuality || null,
        replayGain: existing?.replayGain ?? song.replayGain,
        lyrics: existing?.lyrics || null,
        lyricRaw: existing?.lyricRaw || null,
        lyricPreferenceSource: existing?.lyricPreferenceSource || null,
        coverUrl: existing?.coverUrl || null,
    };

    // Prefetch audio URL (if not cached or expired)
    if (!data.audioUrl) {
        const resolved = await resolvePrefetchAudioUrl(song, audioQuality, signal);
        if (resolved) {
            data.audioUrl = resolved.audioUrl;
            data.audioUrlFetchedAt = Date.now();
            if (resolved.audioUrl !== 'CACHED_IN_DB') {
                data.audioUrlQuality = audioQuality;
                data.replayGain = resolved.replayGain
                    ? { ...data.replayGain, ...resolved.replayGain }
                    : data.replayGain;
            }
        }
    }

    if (!signal.aborted && useAudioSettingsStore.getState().enableMediaCache && data.audioUrl && data.audioUrl !== 'CACHED_IN_DB') {
        await cachePlayedTrackAssets(song, data.audioUrl, undefined, signal);
    }

    // Prefetch lyrics (if not cached)
    if (!data.lyrics) {
        try {
            // Check IndexedDB cache first
            const cachedLyrics = await getSongCacheWithLegacyMigration<LyricData>('lyric', song, migrateLyricDataRenderHints);
            if (cachedLyrics) {
                console.log(`[Prefetch] Lyrics in IndexedDB for: ${song.name}`);
                data.lyrics = cachedLyrics;
                // The same stamp the fetched path leaves below. Without it a track whose lyrics came
                // from the cache can never satisfy the "already cached" test at the top of this
                // function, so every prefetch pass re-enters the whole thing for it.
                data.lyricPreferenceSource = currentSettingsLyricSettings.autoUseBestLyric
                    ? currentSettingsLyricSettings.preferredAlternativeLyricSource
                    : null;
            } else if (!signal.aborted) {
                const lyricResult = await omni.getLyrics(song, { userId });
                const processed = {
                    mainLrc: lyricResult.mainText ?? null,
                    yrcLrc: lyricResult.wordByWordText ?? null,
                    transLrc: lyricResult.translationText ?? null,
                    isPureMusic: lyricResult.isPureMusic,
                    lyrics: lyricResult.lyrics,
                    chorusRanges: lyricResult.chorusRanges || [],
                };
                data.lyricRaw = {
                    mainLrc: processed.mainLrc,
                    yrcLrc: processed.yrcLrc,
                    transLrc: processed.transLrc,
                    isPureMusic: processed.isPureMusic
                };

                let parsedLyrics = processed.lyrics;
                let finalLyrics = parsedLyrics;

                const onlineLyricsState = await loadOnlineLyricsState(song);
                const resolvedLyrics = resolveOnlineLyrics(onlineLyricsState, parsedLyrics);

  const settingsLyricSettings = useLyricSettingsStore.getState();
                const autoUseBest = settingsLyricSettings.autoUseBestLyric;
                const preferredSource = settingsLyricSettings.preferredAlternativeLyricSource;
                const shouldAutoMatch = autoUseBest && !onlineLyricsState?.hasOnlineOverride;

                if (shouldAutoMatch) {
                    try {
                        const metadata = getProviderSongMetadata(song);
                        const artistName = metadata.artists.map(a => a.name).join(', ');
                        const bestMatch = await autoMatchBestLyric(song.name, artistName, metadata.durationMs, {
                            album: metadata.album?.name,
                            preferredSource: settingsLyricSettings.preferredAlternativeLyricSource,
                            ...(sourceRef.providerId === 'netease' || sourceRef.providerId === 'kugou' || sourceRef.providerId === 'qq'
                                ? { providerCandidate: {
                                    providerId: sourceRef.providerId as 'netease' | 'kugou' | 'qq',
                                    song,
                                    lyricsResult: {
                                        lyrics: parsedLyrics,
                                        mainText: processed.mainLrc,
                                        wordByWordText: processed.yrcLrc,
                                        translationText: processed.transLrc,
                                        isPureMusic: processed.isPureMusic,
                                        chorusRanges: processed.chorusRanges,
                                    },
                                } }
                                : {})
                        });
                        if (bestMatch && 'lyrics' in bestMatch && bestMatch.source !== sourceRef.providerId) {
                            const overrideState: OnlineLyricsState = {
                                lyricsSource: 'online',
                                matchedSongId: bestMatch.id,
                                hasOnlineOverride: true,
                                onlineOverrideLyrics: bestMatch.lyrics,
                                matchedLyricsSource: bestMatch.source,
                                matchedLyricsProviderPlatform: bestMatch.matchedLyricsProviderPlatform,
                            };
                            await saveOnlineLyricsState(song, overrideState);
                            finalLyrics = bestMatch.lyrics;
                        } else if (bestMatch?.isPureMusic) {
                            // Same discriminator fix as in onlinePlayback: a MATCH object carries
                            // `isPureMusic: false`, so the old `'isPureMusic' in bestMatch` also
                            // caught a best match from the track's own provider and discarded it.
                            await saveOnlineLyricsState(song, markOnlineLyricsPureMusic(onlineLyricsState));
                            finalLyrics = null;
                            if (data.lyricRaw) data.lyricRaw.isPureMusic = true;
                        }
                    } catch (error) {
                        console.warn('[Prefetch] Failed to auto-match best lyric:', error);
                    }
                } else {
                    console.log(
                        `[Prefetch] Skipping autoMatchBestLyric for "${song.name}": ` +
                        `preferredSource=${preferredSource}, ` +
                        `autoUseBestLyric=${autoUseBest}`
                    );
                    if (resolvedLyrics) {
                        finalLyrics = resolvedLyrics;
                    }
                }

                data.lyrics = finalLyrics;
                data.lyricPreferenceSource = autoUseBest ? preferredSource : null;

                if (data.lyrics) {
                    console.log(`[Prefetch] Parsed and processed lyrics for: ${song.name}`);
                }
            }
        } catch (e) {
            console.warn(`[Prefetch] Failed to get lyrics for ${song.name}:`, e);
        }
    }

    // Prefetch cover URL (just store the URL, don't download)
    if (!data.coverUrl) {
        const coverUrl = getProviderSongMetadata(song).coverUrl;
        if (coverUrl) {
            data.coverUrl = coverUrl.startsWith('http:') ? coverUrl.replace('http:', 'https:') : coverUrl;
        }
    }

    if (signal.aborted) return;
    prefetchCache.delete(songKey);

    // Evict least recently used entries if cache exceeds limit
    while (prefetchCache.size >= MAX_PREFETCH_CACHE_SIZE) {
        const oldestKey = prefetchCache.keys().next().value;
        if (oldestKey !== undefined) {
            prefetchCache.delete(oldestKey);
        } else {
            break;
        }
    }

    prefetchCache.set(songKey, data);

    // Measured here because this is where the bytes are cheapest: the track is about to be cached
    // anyway, so with song caching on it is one download feeding both the cache and the analysis,
    // and with it off nothing is fetched at all.
    analyseForAutomix(song, data.audioUrl);
};

export const updatePrefetchedAudioUrl = (
    song: SongResult,
    audioUrl: string,
    audioQuality: string,
    replayGain?: ReplayGainInfo,
): void => {
    const songKey = getPrefetchSongKey(song);
    const existing = prefetchCache.get(songKey);

    const nextData: PrefetchedSongData = {
        songKey,
        songId: song.id,
        audioUrl,
        audioUrlFetchedAt: Date.now(),
        audioUrlQuality: audioQuality,
        replayGain: replayGain
            ? { ...song.replayGain, ...existing?.replayGain, ...replayGain }
            : existing?.replayGain ?? song.replayGain,
        lyrics: existing?.lyrics || null,
        lyricRaw: existing?.lyricRaw || null,
        lyricPreferenceSource: existing?.lyricPreferenceSource || null,
        coverUrl: existing?.coverUrl || null,
    };

    touchPrefetchCacheEntry(songKey, nextData);
};

/**
 * Prefetch nearby songs based on current song and queue
 */
export const prefetchNearbySongs = async (
    currentSong: SongResult,
    queue: SongResult[],
    audioQuality: AudioQualityPreference,
    userId?: MediaId | null
): Promise<void> => {
    lastPrefetchRequest = [currentSong, queue, audioQuality, userId];
    // Cancel any ongoing prefetch
    if (currentPrefetchAbortController) {
        currentPrefetchAbortController.abort();
    }
    currentPrefetchAbortController = new AbortController();
    const signal = currentPrefetchAbortController.signal;
    if (getAudioCacheStatus() !== 'ready') return;

    // Find current song index in queue
    const currentSongKey = getPrefetchSongKey(currentSong);
    const currentIndex = queue.findIndex(song => getPrefetchSongKey(song) === currentSongKey);

    // Told before anything is asked for, so the analyser can drop work it has queued for tracks that
    // are no longer either half of the next transition. This function is called on every track change
    // and every queue change, which is exactly when that set moves - and analysis is serial, so a
    // stale entry does not merely waste itself, it delays the track the listener just chose.
    const { loopMode, enableMediaCache } = useAudioSettingsStore.getState();
    const shuffleIndex = loopMode === 'shuffle' && currentIndex >= 0 && queue.length > 1
        ? plannedShuffleIndex(queue, currentIndex) : undefined;
    const nextSong = currentIndex >= 0 && queue.length > 0
        ? queue[loopMode === 'one' ? currentIndex : shuffleIndex ?? (currentIndex + 1) % queue.length]
        : undefined;
    setAnalysisScope(nextSong ? [currentSong, nextSong] : [currentSong]);

    if (currentIndex === -1) {
        console.log('[Prefetch] Current song not in queue, skipping prefetch');
        return;
    }

    const songsToPrefetch = getPrefetchWindowIndices(queue.length, currentIndex, enableMediaCache, shuffleIndex)
        .map(index => queue[index]);

    console.log(`[Prefetch] Will prefetch ${songsToPrefetch.length} songs near index ${currentIndex}`);

    // Analyse the current track even if audio caching is disabled.
    analyseForAutomix(currentSong, prefetchCache.get(currentSongKey)?.audioUrl);

    // Start immediately with two workers: current audio and the next track can download together.
    let cursor = 0;
    const run = async () => {
        while (!signal.aborted && cursor < songsToPrefetch.length) {
            const song = songsToPrefetch[cursor++];
            try {
                await prefetchSong(song, audioQuality, signal, userId);
            } catch (error) {
                if (!signal.aborted) console.warn('[Prefetch] Could not prefetch song', error);
            }
        }
    };
    await Promise.all([run(), run()]);
};

/**
 * Clear prefetch cache for songs not in the current queue
 * Call this after queue shuffle to free memory
 */
export const cleanupPrefetchCache = (currentQueue: SongResult[]): void => {
    const queueIds = new Set(currentQueue.map((song) => getPrefetchSongKey(song)));

    for (const songKey of prefetchCache.keys()) {
        if (!queueIds.has(songKey)) {
            prefetchCache.delete(songKey);
        }
    }

    console.log(`[Prefetch] Cleanup complete, cache size: ${prefetchCache.size}`);
};

export const invalidatePrefetchedLyrics = (): void => {
    for (const [songKey, cached] of prefetchCache.entries()) {
        prefetchCache.set(songKey, {
            ...cached,
            lyrics: null,
            lyricRaw: null,
            lyricPreferenceSource: null,
        });
    }

    console.log(`[Prefetch] Invalidated lyrics for ${prefetchCache.size} prefetched songs`);
};

// Aborts provider-bound work and releases every in-memory prefetch entry.
export const clearPrefetchRuntime = (preserveRequest = false): void => {
    currentPrefetchAbortController?.abort();
    currentPrefetchAbortController = null;
    prefetchCache.clear();
    if (!preserveRequest) lastPrefetchRequest = null;
};

/**
 * 正在播放那首的预取窗口（前一首、它自己、后三首，含列表首尾环绕）的身份串；
 * 当前歌不在队列里时是空串。队列被编辑（拖拽排序、下一首播放、移到末尾、移除）前后这个串变了，才需要重新预取。
 */
export const getPrefetchWindowKey = (currentSong: SongResult, queue: readonly SongResult[]): string => {
    const currentSongKey = getPrefetchSongKey(currentSong);
    const currentIndex = queue.findIndex(song => getPrefetchSongKey(song) === currentSongKey);
    if (currentIndex < 0) return '';
    const windowKey = getPrefetchWindowIndices(queue.length, currentIndex, true)
        .map(index => getPrefetchSongKey(queue[index])).join('|');
    // Shuffle planning depends on the entire queue. Comparing queue identities avoids drawing
    // a different random track just to inspect whether a queue edit changed the plan.
    return useAudioSettingsStore.getState().loopMode === 'shuffle'
        ? `${windowKey}::${queue.map(getPrefetchSongKey).join('|')}` : windowKey;
};

/**
 * 队列被就地编辑（拖拽排序、下一首播放、移到末尾、移除、批量操作、Electron 舞台的 move / remove）之后要不要重新预取：
 * 正在播放那首前后的预取窗口变了才要。编辑后当前歌不在队列里（窗口键为空）时不要——prefetchNearbySongs 表达不了
 * 「当前歌不在队列里」：invalidateAndRefetch 会先按新队列清缓存（把当前歌自己的预取删掉）、中止进行中的邻近预取，
 * 然后因为找不到当前歌直接返回、不再重启，setAnalysisScope 还会把原来的下一首踢出分析范围。保留旧窗口的预取更正确：
 * 下一次切歌（handleNextTrack 在当前歌不在队列里时回到队首）会照常按新队列预取。
 */
export const shouldRefreshPrefetchAfterQueueEdit = (
    currentSong: SongResult | null,
    previousQueue: readonly SongResult[],
    nextQueue: SongResult[],
): currentSong is SongResult => {
    if (!currentSong || nextQueue === previousQueue || nextQueue.length <= 1) return false;
    const nextWindowKey = getPrefetchWindowKey(currentSong, nextQueue);
    return nextWindowKey !== '' && nextWindowKey !== getPrefetchWindowKey(currentSong, previousQueue);
};

/**
 * 队列就地编辑之后：预取窗口变了就与洗牌一样重新预取。automix 与「下一首」提示每次都读 store 里最新的队列，能感知顺序
 * 变化；但下一首的地址与歌词只在切歌与洗牌时预取，不补这一步的话，刚挪到下一首的那首到交叉淡入时还没有预取数据
 * （混音只能盲排、不能预热）。所有就地编辑都经这里（createQueueMutations.updateQueueOrder 与舞台的队列请求）。
 */
export const refreshPrefetchAfterQueueEdit = (
    currentSong: SongResult | null,
    previousQueue: readonly SongResult[],
    nextQueue: SongResult[],
    audioQuality: AudioQualityPreference,
    userId?: MediaId | null,
): void => {
    if (!shouldRefreshPrefetchAfterQueueEdit(currentSong, previousQueue, nextQueue)) return;
    void invalidateAndRefetch(currentSong, nextQueue, audioQuality, userId);
};

/**
 * Force re-prefetch (e.g., after queue shuffle)
 */
export const invalidateAndRefetch = async (
    currentSong: SongResult,
    queue: SongResult[],
    audioQuality: AudioQualityPreference,
    userId?: MediaId | null
): Promise<void> => {
    console.log('[Prefetch] Queue changed, invalidating and re-prefetching');
    cleanupPrefetchCache(queue);
    await prefetchNearbySongs(currentSong, queue, audioQuality, userId);
};
