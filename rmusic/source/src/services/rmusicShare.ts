import { create } from 'zustand';
import type { SongResult } from '../types';
import { getPlaybackSourceRef, resolveNavidromePlaybackCarrier } from '../utils/appPlaybackGuards';
import { getSongAlbumLabel, getSongArtistLabel } from './onlineMusic/songMetadata';
import { setStatusMessage } from '../stores/useStatusMessageStore';

export const RMUSIC_SHARE_ROOT = 'https://roylyl.github.io/rmusic/share/';
export type RmusicShareData = { title: string; text: string; url: string };

export function getRmusicRawTrackId(song: SongResult): string {
    const source = getPlaybackSourceRef(song);
    const carrier = resolveNavidromePlaybackCarrier(song);
    const value = source.kind === 'navidrome'
        ? source.mediaId || carrier?.navidromeData.id || song.id
        : song.id;
    return String(value).replace(/^rmusic:/, '').trim();
}

export function createRmusicShareData(song: SongResult): RmusicShareData {
    const artist = getSongArtistLabel(song);
    const album = getSongAlbumLabel(song);
    const id = getRmusicRawTrackId(song);
    return {
        title: `${song.name}${artist ? '—' + artist : ''}·R music`,
        text: album ? `专辑：${album}` : '在R music听这首歌',
        url: RMUSIC_SHARE_ROOT + encodeURIComponent(id) + '.html',
    };
}

type ShareCopyState = {
    data: RmusicShareData | null;
    open: (data: RmusicShareData) => void;
    close: () => void;
};
export const useRmusicShareCopyStore = create<ShareCopyState>(set => ({
    data: null, open: data => set({ data }), close: () => set({ data: null }),
}));

function offerCopy(data: RmusicShareData) {
    useRmusicShareCopyStore.getState().open(data);
    setStatusMessage({
        type: 'info', text: '请复制下方歌曲链接',
        durationMs: 5000,
    });
}

export async function copyRmusicSongLink(data: RmusicShareData): Promise<boolean> {
    try {
        if (navigator.clipboard?.writeText && window.isSecureContext) {
            // The request is issued before the first await, preserving the click gesture.
            await navigator.clipboard.writeText(data.url);
        } else {
            const field = document.createElement('textarea');
            field.value = data.url;
            field.style.cssText = 'position:fixed;left:0;top:0;opacity:0;pointer-events:none';
            document.body.append(field);
            field.focus();
            field.select();
            let copied = false;
            try { copied = document.execCommand('copy'); }
            finally { field.remove(); }
            if (!copied) throw new Error('Clipboard unavailable');
        }
        setStatusMessage({ type: 'success', text: '已复制歌曲链接', nonce: Date.now() });
        return true;
    } catch {
        offerCopy(data);
        return false;
    }
}

// All UI entry points call this directly in their click handler. Metadata is
// already in SongResult: sharing never awaits a fetch or includes audio files.
export async function shareRmusicSong(song: SongResult): Promise<void> {
    const data = createRmusicShareData(song);
    if (!getRmusicRawTrackId(song)) {
        setStatusMessage({ type: 'error', text: '这首歌暂时没有可分享的链接' });
        return;
    }
    if (typeof navigator.share === 'function') {
        try {
            await navigator.share(data);
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') return;
            setStatusMessage({
                type: 'info', text: '分享未完成',
                actionLabel: '复制链接',
                onAction: () => { void copyRmusicSongLink(data); },
                nonce: Date.now(), durationMs: 7000,
            });
            useRmusicShareCopyStore.getState().open(data);
        }
        return;
    }
    await copyRmusicSongLink(data);
}

export function readRmusicTrackQuery(): string | null {
    const url = new URL(window.location.href);
    return url.searchParams.has('track') ? url.searchParams.get('track') ?? '' : null;
}

export function clearRmusicTrackQuery() {
    const url = new URL(window.location.href);
    if (!url.searchParams.has('track')) return;
    url.searchParams.delete('track');
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
}
