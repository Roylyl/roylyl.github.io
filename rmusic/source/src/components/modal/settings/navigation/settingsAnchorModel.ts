import type { SettingsSubviewId } from '../../../../stores/useSettingsModalStore';

// Destinations shared by settings sections and command-palette links.
export const SETTINGS_ANCHOR_DEFINITIONS = {
    lyricsRenderer: { section: 'appearance', labelKey: 'options.lyricsRenderer' },
    themePresets: { section: 'appearance', labelKey: 'options.themePresets' },
    languageSettings: { section: 'general', labelKey: 'options.languageSettings' },
    playbackEntryView: { section: 'general', labelKey: 'options.playbackEntryView' },
    librarySuite: { section: 'general', labelKey: 'options.librarySuite', requiresLibrarySuiteChoice: true },
    lyrics: { section: 'playback', labelKey: 'options.lyrics' },
    audioOutputSettings: { section: 'playback', labelKey: 'options.audioOutputSettings' },
    cacheDetails: { section: 'storage', labelKey: 'options.cacheDetails' },
    mediaCache: { section: 'storage', labelKey: 'options.mediaCache' },
} as const satisfies Record<string, { section: SettingsSubviewId; labelKey: string; requiresLibrarySuiteChoice?: boolean }>;

export type SettingsAnchorId = keyof typeof SETTINGS_ANCHOR_DEFINITIONS;

export const SETTINGS_ANCHOR_SECTION = Object.fromEntries(
    Object.entries(SETTINGS_ANCHOR_DEFINITIONS).map(([id, definition]) => [id, definition.section]),
) as Record<SettingsAnchorId, SettingsSubviewId>;

export const settingsAnchorSubview = (anchorId: SettingsAnchorId): SettingsSubviewId => (
    SETTINGS_ANCHOR_SECTION[anchorId]
);
