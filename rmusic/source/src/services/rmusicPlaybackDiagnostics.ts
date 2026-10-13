import { usePlaybackStore } from '../stores/usePlaybackStore';

const revision = '20261013-native-1';
const events: Record<string, unknown>[] = [];
const limit = 100;

type AudioSessionNavigator = Navigator & {
    audioSession?: { type?: string; state?: string };
    standalone?: boolean;
};

export const recordRmusicPlaybackEvent = (
    event: string,
    detail = '',
    audio?: HTMLAudioElement | null,
) => {
    try {
    const state = usePlaybackStore.getState();
    const element = audio ?? Array.from(document.querySelectorAll('audio')).find(item => !item.paused)
        ?? document.querySelector('audio');
    const session = (navigator as AudioSessionNavigator).audioSession;
    events.push({
        at: new Date().toISOString(), event, detail, track: state.currentSong?.id ?? null,
        position: element?.currentTime ?? null,
        duration: element && Number.isFinite(element.duration) ? element.duration : null,
        paused: element?.paused ?? true, ended: element?.ended ?? false,
        readyState: element?.readyState ?? 0, networkState: element?.networkState ?? 0,
        error: element?.error?.code ?? 0,
        source: element?.currentSrc.startsWith('blob:') ? 'blob' : element?.currentSrc ? 'url' : 'none',
        sessionType: session?.type ?? 'unsupported', sessionState: session?.state ?? 'unsupported',
        hidden: document.hidden,
    });
    if (events.length > limit) events.splice(0, events.length - limit);
    } catch {
        // Diagnostics must never interrupt a playback or system-control callback.
    }
};

export const getRmusicPlaybackDiagnostics = () => JSON.stringify({
    version: revision, browser: navigator.userAgent,
    standalone: Boolean((navigator as AudioSessionNavigator).standalone)
        || matchMedia('(display-mode: standalone)').matches,
    eventOrder: 'newest-first', events: [...events].reverse(),
}, null, 2);

export const copyRmusicPlaybackDiagnostics = async (): Promise<boolean> => {
    const content = getRmusicPlaybackDiagnostics();
    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(content);
            return true;
        }
        const field = document.createElement('textarea');
        field.value = content;
        field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.append(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        return copied;
    } catch {
        return false;
    }
};
