import { FileJson, FileText } from 'lucide-react';
import { defineCommand } from '../commandFactories';
import type { CommandPaletteCommand, CommandPaletteContext } from '../types';
import type { LyricExportFormat } from '../../../services/lyricExport/types';
import { hasExportableLyrics } from '../../../utils/lyrics/exportableLyrics';

// src/components/command-palette/commands/lyricExportCommands.ts
// Export the current song lyrics in either format.
//
// The export services are imported on demand: they reach the cache database and the provider
// registry, which the node-environment registry tests must not have to load.


const hasLyricsOnScreen = (context?: CommandPaletteContext) => (
    context ? Boolean(context.shared.currentSong) && hasExportableLyrics(context.shared.lyrics) : true
);

const exportCurrent = async (format: LyricExportFormat, context: CommandPaletteContext): Promise<boolean> => {
    const { currentSong, lyrics, t, setStatusMsg } = context.shared;
    if (!currentSong) return false;
    const [{ exportCurrentSongLyrics }, { usePlaybackStore }, { useLyricSettingsStore }] = await Promise.all([
        import('../../../services/lyricExport/currentSongExport'),
        import('../../../stores/usePlaybackStore'),
        import('../../../stores/useLyricSettingsStore'),
    ]);
    try {
        const exported = await exportCurrentSongLyrics({
            song: currentSong,
            onScreenLyrics: lyrics,
            activeLocalLyricsSource: usePlaybackStore.getState().activeLocalLyricsSource,
            localLyricsPriority: useLyricSettingsStore.getState().localLyricsPriority,
        }, format);
        setStatusMsg({
            type: exported ? 'success' : 'info',
            text: exported ? t('lyricExport.exported', 'Lyrics exported') : t('lyricExport.noLyrics', 'No lyrics to export'),
        });
        return exported;
    } catch (error) {
        console.error('[CommandPalette] Lyric export failed', error);
        setStatusMsg({ type: 'error', text: t('lyricExport.failed', 'Lyric export failed') });
        return false;
    }
};

export const lyricExportCommands: CommandPaletteCommand[] = [
    defineCommand({
        id: 'export-current-lyrics-fia',
        group: 'settings',
        title: 'Export current lyrics as .fia',
        description: 'Save this song’s lyrics in Folia’s lossless format, saved word segmentation included',
        keywords: ['save lyrics', 'folia lyrics file', 'fia file', '导出当前歌词', '保存歌词'],
        icon: FileJson,
        isAvailable: hasLyricsOnScreen,
        execute: (_input, context) => exportCurrent('fia', context),
    }),
    defineCommand({
        id: 'export-current-lyrics-lrc',
        group: 'settings',
        title: 'Export current lyrics as LRC',
        description: 'Save this song’s lyrics as an enhanced LRC other players can read',
        keywords: ['save lrc', 'lrc file', 'enhanced lrc', '导出 lrc', '保存 lrc'],
        icon: FileText,
        isAvailable: hasLyricsOnScreen,
        execute: (_input, context) => exportCurrent('lrc', context),
    }),
];
