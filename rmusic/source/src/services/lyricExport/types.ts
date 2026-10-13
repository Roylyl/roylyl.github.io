import type { LyricData } from '../../types';
import type { FoliaLyricDocumentSource, FoliaLyricDocumentSong } from '../../utils/lyrics/foliaLyricDocument';

// src/services/lyricExport/types.ts
// Shared shapes for exporting the current song lyrics.

export type LyricExportFormat = 'fia' | 'lrc';

/** One song's lyrics, ready to be adjusted and written. */
export interface ExportableLyric {
    /** `getPlaybackSongKey` form, e.g. `online:netease:123` or `local:abc`. */
    songKey: string;
    lyrics: LyricData;
    source: FoliaLyricDocumentSource;
    song: FoliaLyricDocumentSong;
    /** Key `lyricOffsetMemory` stores this song's offset under (the song's `id`). */
    offsetKey?: string | number;
    offsetMs?: number;
    /**
     * Local songs only: the audio file's path relative to the library root, without its extension
     * (`Music/Album/01 Song`). Exported files are named and placed after it so they can be dropped
     * next to the audio as sidecars, which is how Folia's own scan and other players find lyrics.
     */
    localPath?: string;
}

