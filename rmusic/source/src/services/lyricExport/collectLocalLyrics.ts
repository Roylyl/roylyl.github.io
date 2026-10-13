import type { LocalSong } from '../../types';
import { isPureMusicLyricText } from '../../utils/lyrics/pureMusic';

/** The audio file's library-relative path without its extension: where its sidecar would live. */
export const getLocalLyricExportPath = (localSong: LocalSong): string => (
    localSong.filePath.replace(/\.[^./]+$/, '')
);

/**
 * Instrumental, decided the way a local song's own match decided it: a recorded verdict is
 * trusted as-is, otherwise the lyric text is read.
 */
export const isMatchedPureMusic = (localSong: LocalSong, text: string) => (
    typeof localSong.matchedIsPureMusic === 'boolean' ? localSong.matchedIsPureMusic : isPureMusicLyricText(text)
);

