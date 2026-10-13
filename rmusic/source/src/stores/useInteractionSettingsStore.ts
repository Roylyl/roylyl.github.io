// src/stores/useInteractionSettingsStore.ts
// How the listener drives the app rather than what it plays: what the grids' action button does,
// and whether the single S key opens the command palette on filtering surfaces.
//
// Separate from the chrome and playback stores because it is about input, not about what is on
// screen — and because the settings section that shows it is its own section for the same reason.

import { create } from 'zustand';
import { getStoredBoolean, getStoredString, setStoredBoolean } from './storagePrimitives';

/** What the grid action button's leftward slide reaches. */
export type GridActionButtonSlideTarget = 'filter' | 'command-palette';

const SLIDE_TARGET_KEY = 'grid_action_button_slide_target';
const PALETTE_HOTKEY_KEY = 'grid_command_palette_hotkey';
const QUEUE_PALETTE_KEEP_OPEN_KEY = 'queue_palette_keep_open';

const readSlideTarget = (): GridActionButtonSlideTarget => (
    getStoredString(SLIDE_TARGET_KEY, 'filter') === 'command-palette' ? 'command-palette' : 'filter'
);

const writeString = (key: string, value: string | null) => {
    if (typeof window === 'undefined') {
        return;
    }
    if (value) {
        localStorage.setItem(key, value);
    } else {
        localStorage.removeItem(key);
    }
};

export type InteractionSettingsState = {
    gridActionButtonSlideTarget: GridActionButtonSlideTarget;
    /**
     * Whether bare `s` on a filtering surface opens the command list instead of being read as
     * filter input. Off by default: typing a letter on a grid has always meant "filter", and the
     * listener who wants the other meaning is the one who should have to ask for it.
     */
    gridCommandPaletteHotkey: boolean;
    /** Keep the queue surface and its query after choosing a song. */
    queuePaletteKeepOpen: boolean;
    setGridActionButtonSlideTarget: (target: GridActionButtonSlideTarget) => void;
    handleToggleGridCommandPaletteHotkey: (enable: boolean) => void;
    setQueuePaletteKeepOpen: (enable: boolean) => void;
};

export const useInteractionSettingsStore = create<InteractionSettingsState>((set) => ({
    gridActionButtonSlideTarget: readSlideTarget(),
    gridCommandPaletteHotkey: getStoredBoolean(PALETTE_HOTKEY_KEY, false),
    queuePaletteKeepOpen: getStoredBoolean(QUEUE_PALETTE_KEEP_OPEN_KEY, false),

    setGridActionButtonSlideTarget: (target) => {
        writeString(SLIDE_TARGET_KEY, target);
        set({ gridActionButtonSlideTarget: target });
    },
    handleToggleGridCommandPaletteHotkey: (enable) => {
        setStoredBoolean(PALETTE_HOTKEY_KEY, enable);
        set({ gridCommandPaletteHotkey: enable });
    },
    setQueuePaletteKeepOpen: (enable) => {
        setStoredBoolean(QUEUE_PALETTE_KEEP_OPEN_KEY, enable);
        set({ queuePaletteKeepOpen: enable });
    },

}));
