import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { PlayerState } from '../types';
import type { SongResult } from '../types';
import { getSongAlbumLabel, getSongArtistLabel, getSongCoverUrl } from '../services/onlineMusic/songMetadata';
import {
    createMediaSessionPositionState,
    getSupportedMediaSessionArtworkUrl,
    isMediaSessionSourceReady,
    publishMediaSessionTrack,
} from '../utils/mediaSessionSync';
import { recordRmusicPlaybackEvent } from '../services/rmusicPlaybackDiagnostics';
import { isNativeMediaPlaybackPreferred } from '../services/nativeMediaPlayback';
import { selectCoverUrl, usePlaybackStore } from '../stores/usePlaybackStore';

// Bridges Folia playback state to the browser Media Session API.
type UseMediaSessionBridgeOptions = {
    audioRef: RefObject<HTMLAudioElement | null>;
    /**
     * The deck the displayed track is playing on, or null when the picture is live.
     *
     * Metadata, clock and source have to describe the same deck. `currentSong` is already the
     * DISPLAYED track - the outgoing one for the length of a blend - while `audioRef` names the
     * active deck, which by then is the arriving track. Publishing the two together put the outgoing
     * track's title on the incoming track's duration and position, so the system panel showed one
     * song's name over another song's progress. `audioSrc` is passed to match this element.
     */
    getDisplayAudioElement?: () => HTMLAudioElement | null;
    audioSrc: string | null;
    currentSong: SongResult | null;
    cachedCoverUrl: string | null;
    playerState: PlayerState;
    isNowPlayingStageActive: boolean;
    unknownArtistLabel: string;
    mediaSessionPlayRef: RefObject<() => Promise<void>>;
    mediaSessionPauseRef: RefObject<() => void>;
    mediaSessionPrevRef: RefObject<() => void>;
    mediaSessionNextRef: RefObject<() => Promise<void> | void>;
    isNowPlayingControlDisabledRef: RefObject<boolean>;
};

export const useMediaSessionBridge = ({
    audioRef,
    getDisplayAudioElement,
    audioSrc,
    currentSong,
    cachedCoverUrl,
    playerState,
    isNowPlayingStageActive,
    unknownArtistLabel,
    mediaSessionPlayRef,
    mediaSessionPauseRef,
    mediaSessionPrevRef,
    mediaSessionNextRef,
    isNowPlayingControlDisabledRef,
}: UseMediaSessionBridgeOptions) => {
    const displayAudioReaderRef = useRef(getDisplayAudioElement);
    displayAudioReaderRef.current = getDisplayAudioElement;
    const artistLabelRef = useRef(unknownArtistLabel);
    artistLabelRef.current = unknownArtistLabel;

    useEffect(() => {
        if (!('mediaSession' in navigator)) {
            return;
        }

        const mediaSession = navigator.mediaSession;
        const unsupportedActions = new Set<MediaSessionAction>();
        const setActionHandlerSafely = (
            action: MediaSessionAction,
            handler: MediaSessionActionHandler | null
        ) => {
            if (unsupportedActions.has(action)) return;
            try {
                mediaSession.setActionHandler(action, handler);
            } catch (e) {
                unsupportedActions.add(action);
                recordRmusicPlaybackEvent('system-action-unavailable', action);
                console.warn(`[MediaSession] Failed to bind ${action} handler`, e);
            }
        };

        const play: MediaSessionActionHandler = () => {
            recordRmusicPlaybackEvent('system-play');
            if (isNowPlayingControlDisabledRef.current || !audioRef.current) {
                return;
            }
            // Call the transport before awaiting anything: this callback carries
            // the system play gesture on iOS.
            void mediaSessionPlayRef.current().catch(error => {
                recordRmusicPlaybackEvent('system-play-failed', String(error));
                console.error('MediaSession play failed', error);
            });
        };
        const pause: MediaSessionActionHandler = () => {
            recordRmusicPlaybackEvent('system-pause');
            if (isNowPlayingControlDisabledRef.current || !audioRef.current) {
                return;
            }
            mediaSessionPauseRef.current();
        };
        const previous: MediaSessionActionHandler = () => {
            recordRmusicPlaybackEvent('system-previous');
            if (isNowPlayingControlDisabledRef.current) {
                return;
            }
            mediaSessionPrevRef.current();
        };
        const next: MediaSessionActionHandler = () => {
            recordRmusicPlaybackEvent('system-next');
            if (isNowPlayingControlDisabledRef.current) {
                return;
            }
            void Promise.resolve(mediaSessionNextRef.current()).catch(error => {
                recordRmusicPlaybackEvent('system-next-failed', String(error));
                console.error('MediaSession next track failed', error);
            });
        };

        // Music controls are track controls; leave the separate ten-second
        // actions disabled and keep absolute system scrubbing available.
        let pendingSeek: {audio: HTMLAudioElement; source: string; time: number; applied?: boolean; appliedAt?: number; nativeSeek?: boolean} | null = null;
        const applyPendingSeek = () => {
            const target = pendingSeek;
            if (!target) return;
            const audio = target.audio;
            if (audio.getAttribute('src') !== target.source) { pendingSeek = null; return; }
            if (!Number.isFinite(audio.duration) || audio.readyState < 1) return;
            const time = Math.max(0, Math.min(target.time, audio.duration));
            if (target.applied && audio.seeking) return;
            const elapsed = Math.max(0, performance.now() - (target.appliedAt ?? performance.now())) / 1000;
            const tolerance = target.nativeSeek && !audio.paused ? elapsed * audio.playbackRate + .15 : .15;
            if (target.applied && audio.currentTime >= time - .15 && audio.currentTime <= time + tolerance) {
                pendingSeek = null;
                return;
            }
            for (let index = 0; index < audio.seekable.length; index++) {
                if (time >= audio.seekable.start(index) - .01 && time <= audio.seekable.end(index) + .01) {
                    try {
                        target.appliedAt = performance.now();
                        audio.currentTime = time;
                        target.applied = true;
                        target.nativeSeek = audio.seeking;
                        if (!audio.seeking && Math.abs(audio.currentTime - time) < .15) pendingSeek = null;
                    } catch { target.applied = false; }
                    return;
                }
            }
        };
        const seek: MediaSessionActionHandler = action => {
            recordRmusicPlaybackEvent('system-seek', String(action.seekTime));
            if (isNowPlayingControlDisabledRef.current || !Number.isFinite(action.seekTime)) return;
            const audio = displayAudioReaderRef.current?.() ?? audioRef.current;
            if (!audio) return;
            pendingSeek = {audio, source: audio.getAttribute('src') || '', time: action.seekTime!};
            applyPendingSeek();
        };
        const bindActions = () => {
            setActionHandlerSafely('play', play);
            setActionHandlerSafely('pause', pause);
            setActionHandlerSafely('previoustrack', previous);
            setActionHandlerSafely('nexttrack', next);
            setActionHandlerSafely('seekto', seek);
            setActionHandlerSafely('seekbackward', null);
            setActionHandlerSafely('seekforward', null);
        };
        bindActions();
        const elements = Array.from(document.querySelectorAll<HTMLAudioElement>('audio'));
        for (const element of elements) {
            element.addEventListener('loadedmetadata', applyPendingSeek);
            element.addEventListener('canplay', applyPendingSeek);
            element.addEventListener('progress', applyPendingSeek);
            element.addEventListener('seeked', applyPendingSeek);
            // Native audio has claimed the platform session now. Reassert track
            // actions after a new source or an interruption changes its owner.
            element.addEventListener('playing', bindActions);
        }
        const lifecycle = (event: Event) => {
            recordRmusicPlaybackEvent(event.type);
            if (!document.hidden) bindActions();
        };
        window.addEventListener('pageshow', lifecycle);
        document.addEventListener('visibilitychange', lifecycle);
        const audioEvents = ['loadstart', 'play', 'playing', 'pause', 'ended', 'loadedmetadata', 'durationchange', 'waiting', 'stalled', 'seeking', 'seeked', 'error'];
        const recordAudio = (event: Event) => {
            if (event.target instanceof HTMLAudioElement) {
                recordRmusicPlaybackEvent(`audio-${event.type}`, '', event.target);
                if (isNativeMediaPlaybackPreferred() && event.target === audioRef.current) {
                    // A locked page can receive ended/playing before React renders
                    // the new track. Publish from the synchronous playback store.
                    const state = usePlaybackStore.getState();
                    const audio = event.target;
                    if (state.currentSong && state.audioSrc
                        && ['loadedmetadata', 'durationchange', 'playing', 'seeked'].includes(event.type)
                        && !audio.seeking && isMediaSessionSourceReady(audio, state.audioSrc, document.baseURI)) {
                        try {
                            publishMediaSessionTrack(mediaSession, audio, {
                                title: state.currentSong.name,
                                artist: getSongArtistLabel(state.currentSong) || artistLabelRef.current,
                                album: getSongAlbumLabel(state.currentSong),
                                artworkUrl: getSupportedMediaSessionArtworkUrl(selectCoverUrl(state) || '', document.baseURI),
                            });
                        } catch (error) {
                            console.warn('[MediaSession] Failed to publish native track', error);
                        }
                    }
                    try {
                        mediaSession.playbackState = !state.currentSong || isNowPlayingControlDisabledRef.current
                            ? 'none'
                            : !audio.paused && !audio.ended && audio.readyState >= 2 ? 'playing' : 'paused';
                    } catch { /* Optional browser capability. */ }
                }
            }
        };
        for (const event of audioEvents) document.addEventListener(event, recordAudio, true);

        return () => {
            setActionHandlerSafely('play', null);
            setActionHandlerSafely('pause', null);
            setActionHandlerSafely('previoustrack', null);
            setActionHandlerSafely('nexttrack', null);
            setActionHandlerSafely('seekto', null);
            pendingSeek = null;
            for (const element of elements) {
                element.removeEventListener('loadedmetadata', applyPendingSeek);
                element.removeEventListener('canplay', applyPendingSeek);
                element.removeEventListener('progress', applyPendingSeek);
                element.removeEventListener('seeked', applyPendingSeek);
                element.removeEventListener('playing', bindActions);
            }
            window.removeEventListener('pageshow', lifecycle);
            document.removeEventListener('visibilitychange', lifecycle);
            for (const event of audioEvents) document.removeEventListener(event, recordAudio, true);
        };
    }, [audioRef, isNowPlayingControlDisabledRef, mediaSessionNextRef, mediaSessionPauseRef, mediaSessionPlayRef, mediaSessionPrevRef]);

    useEffect(() => {
        if (!('mediaSession' in navigator)) {
            return;
        }

        if (!currentSong) {
            try { navigator.mediaSession.setPositionState?.(); } catch { /* Optional API. */ }
            try {
                navigator.mediaSession.metadata = null;
            } catch (e) {
                console.warn('[MediaSession] Failed to clear metadata', e);
            }
            return;
        }

        // The displayed track's own deck, so the position published below belongs to the title
        // published beside it. Falls back to the active deck whenever no blend is holding a picture.
        const audio = getDisplayAudioElement?.() ?? audioRef.current;
        if (!audio || !audioSrc) {
            return;
        }

        let disposed = false;
        const sourceArtworkUrl = cachedCoverUrl || getSongCoverUrl(currentSong) || '';
        let artworkUrl = getSupportedMediaSessionArtworkUrl(sourceArtworkUrl, document.baseURI);
        let disposableArtworkUrl: string | null = null;
        const publish = () => {
            if (disposed || !isMediaSessionSourceReady(audio, audioSrc, document.baseURI)) {
                return;
            }

            try {
                publishMediaSessionTrack(navigator.mediaSession, audio, {
                    title: currentSong.name,
                    artist: getSongArtistLabel(currentSong) || unknownArtistLabel,
                    album: getSongAlbumLabel(currentSong),
                    artworkUrl,
                });
            } catch (e) {
                console.warn('[MediaSession] Failed to update metadata', e);
            }
        };

        // MediaMetadata rejects Electron's custom protocol, so expose that image through a
        // short-lived blob URL while this track owns the platform media session.
        const prepareUnsupportedArtwork = async () => {
            if (!sourceArtworkUrl || artworkUrl) return;

            try {
                const response = await fetch(sourceArtworkUrl);
                if (!response.ok) throw new Error(`Artwork request failed: ${response.status}`);
                const artworkBlob = await response.blob();
                if (artworkBlob.size <= 0 || !artworkBlob.type.startsWith('image/')) {
                    throw new Error('Artwork response is not a valid image');
                }

                const objectUrl = URL.createObjectURL(artworkBlob);
                if (disposed) {
                    URL.revokeObjectURL(objectUrl);
                    return;
                }
                disposableArtworkUrl = objectUrl;
                artworkUrl = objectUrl;
                publish();
            } catch (e) {
                if (!disposed) console.warn('[MediaSession] Failed to prepare artwork', e);
            }
        };

        audio.addEventListener('loadedmetadata', publish);
        audio.addEventListener('durationchange', publish);
        // Re-publish after playback starts in case Chromium delivered a late clear from the old source.
        audio.addEventListener('playing', publish);
        const publishSeekPosition = () => {
            if (disposed || audio.seeking || !isMediaSessionSourceReady(audio, audioSrc, document.baseURI)) return;
            const position = createMediaSessionPositionState(audio);
            if (position) { try { navigator.mediaSession.setPositionState?.(position); } catch {} }
        };
        audio.addEventListener('seeked', publishSeekPosition);
        publish();
        void prepareUnsupportedArtwork();

        return () => {
            disposed = true;
            audio.removeEventListener('loadedmetadata', publish);
            audio.removeEventListener('durationchange', publish);
            audio.removeEventListener('playing', publish);
            audio.removeEventListener('seeked', publishSeekPosition);
            if (disposableArtworkUrl) URL.revokeObjectURL(disposableArtworkUrl);
        };
    }, [audioRef, audioSrc, cachedCoverUrl, currentSong, getDisplayAudioElement, unknownArtistLabel]);

    useEffect(() => {
        if (!('mediaSession' in navigator)) {
            return;
        }

        const syncPlaybackState = () => {
            const audio = displayAudioReaderRef.current?.() ?? audioRef.current;
            const song = isNativeMediaPlaybackPreferred() ? usePlaybackStore.getState().currentSong : currentSong;
            try {
                navigator.mediaSession.playbackState = isNowPlayingStageActive || !song
                    ? 'none'
                    : audio && !audio.paused && !audio.ended && audio.readyState >= 2
                        ? 'playing'
                        : 'paused';
            } catch (error) {
                console.warn('[MediaSession] Failed to update playback state', error);
            }
        };
        const elements = Array.from(document.querySelectorAll<HTMLAudioElement>('audio'));
        const events = ['playing', 'pause', 'ended', 'waiting', 'emptied'];
        for (const audio of elements) {
            for (const event of events) audio.addEventListener(event, syncPlaybackState);
        }
        syncPlaybackState();
        return () => {
            for (const audio of elements) {
                for (const event of events) audio.removeEventListener(event, syncPlaybackState);
            }
        };
    }, [audioRef, currentSong, isNowPlayingStageActive, playerState]);
};
