import { recordRmusicPlaybackEvent } from './rmusicPlaybackDiagnostics';

/** iOS media elements must keep their native output and Now Playing session. */
export const isNativeMediaPlaybackPreferred = (): boolean => {
    if (typeof navigator === 'undefined') return false;
    return /iPad|iPhone|iPod/i.test(navigator.userAgent)
        || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

export type PlaybackAudioSession = EventTarget & {
    type: string;
    state?: string;
};

export const getPlaybackAudioSession = (): PlaybackAudioSession | null => {
    if (typeof navigator === 'undefined') return null;
    try {
        return (navigator as Navigator & { audioSession?: PlaybackAudioSession }).audioSession ?? null;
    } catch {
        return null;
    }
};

const observedSessions = new WeakSet<PlaybackAudioSession>();
const recordNativeEvent = (event: string, detail = '', audio?: HTMLAudioElement): void => {
    try {
        recordRmusicPlaybackEvent(event, detail, audio);
    } catch {
        // Diagnostics must never prevent an audio request on a partial WebKit implementation.
    }
};

export const configurePlaybackAudioSession = (): void => {
    const session = getPlaybackAudioSession();
    if (!session) return;
    if (!observedSessions.has(session) && typeof session.addEventListener === 'function') {
        observedSessions.add(session);
        session.addEventListener('statechange', () => {
            // Record the interruption; an explicit user/system play action owns resuming.
            recordNativeEvent('audio-session-statechange', session.state ?? 'unavailable');
        });
    }
    try {
        if (session.type !== 'playback') {
            session.type = 'playback';
            recordNativeEvent('audio-session-type', session.type);
        }
    } catch (error) {
        recordNativeEvent('audio-session-type-failed', String(error));
    }
};

/** A src assignment already starts resource selection; a second load() aborts play(). */
export const setNativeMediaSource = (audio: HTMLAudioElement, source: string): void => {
    if (audio.getAttribute('src') !== source) {
        audio.src = source;
        recordNativeEvent('native-source-set', '', audio);
    }
};

/** Call in the original click, system action or ended callback, before any await. */
export const playNativeMedia = (audio: HTMLAudioElement): Promise<void> => {
    configurePlaybackAudioSession();
    recordNativeEvent('native-play-request', '', audio);
    try {
        // play() itself is called synchronously. Only its completion uses a promise.
        return Promise.resolve(audio.play()).then(() => {
            recordNativeEvent('native-play-resolved', '', audio);
        }, error => {
            recordNativeEvent('native-play-rejected', String(error), audio);
            throw error;
        });
    } catch (error) {
        recordNativeEvent('native-play-rejected', String(error), audio);
        return Promise.reject(error);
    }
};
