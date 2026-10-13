import { useEffect } from 'react';
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
    useEffect(() => {
        if (!('mediaSession' in navigator)) {
            return;
        }

        const mediaSession = navigator.mediaSession;
        const setActionHandlerSafely = (
            action: MediaSessionAction,
            handler: MediaSessionActionHandler | null
        ) => {
            try {
                mediaSession.setActionHandler(action, handler);
            } catch (e) {
                console.warn(`[MediaSession] Failed to bind ${action} handler`, e);
            }
        };

        setActionHandlerSafely('play', async () => {
            if (isNowPlayingControlDisabledRef.current || !audioRef.current) {
                return;
            }

            try {
                await mediaSessionPlayRef.current();
            } catch (e) {
                console.error('MediaSession play failed', e);
            }
        });
        setActionHandlerSafely('pause', () => {
            if (isNowPlayingControlDisabledRef.current || !audioRef.current) {
                return;
            }

            mediaSessionPauseRef.current();
        });
        setActionHandlerSafely('previoustrack', () => {
            if (isNowPlayingControlDisabledRef.current) {
                return;
            }
            mediaSessionPrevRef.current();
        });
        setActionHandlerSafely('nexttrack', () => {
            if (isNowPlayingControlDisabledRef.current) {
                return;
            }
            void mediaSessionNextRef.current();
        });

        // Music controls are track controls; leave the separate ten-second
        // actions disabled and keep absolute system scrubbing available.
        setActionHandlerSafely('seekbackward', null);
        setActionHandlerSafely('seekforward', null);
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
        setActionHandlerSafely('seekto', action => {
            if (isNowPlayingControlDisabledRef.current || !Number.isFinite(action.seekTime)) return;
            const audio = getDisplayAudioElement?.() ?? audioRef.current;
            if (!audio) return;
            pendingSeek = {audio, source: audio.getAttribute('src') || '', time: action.seekTime!};
            applyPendingSeek();
        });
        const elements = Array.from(document.querySelectorAll<HTMLAudioElement>('audio'));
        for (const element of elements) {
            element.addEventListener('loadedmetadata', applyPendingSeek);
            element.addEventListener('canplay', applyPendingSeek);
            element.addEventListener('progress', applyPendingSeek);
            element.addEventListener('seeked', applyPendingSeek);
        }

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
            }
        };
    }, [audioRef, getDisplayAudioElement, isNowPlayingControlDisabledRef, mediaSessionNextRef, mediaSessionPauseRef, mediaSessionPlayRef, mediaSessionPrevRef]);

    useEffect(() => {
        if (!('mediaSession' in navigator)) {
            return;
        }

        if (!currentSong) {
            try {
                navigator.mediaSession.setPositionState();
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
            if (position) { try { navigator.mediaSession.setPositionState(position); } catch {} }
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

        try {
            navigator.mediaSession.playbackState = isNowPlayingStageActive
                ? 'none'
                : currentSong
                    ? (playerState === PlayerState.PLAYING ? 'playing' : 'paused')
                    : 'none';
        } catch (e) {
            console.warn('[MediaSession] Failed to update playback state', e);
        }
    }, [currentSong, isNowPlayingStageActive, playerState]);
};
