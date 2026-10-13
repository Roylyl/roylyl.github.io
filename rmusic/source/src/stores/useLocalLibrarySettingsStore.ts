import { create } from 'zustand';

// src/stores/useLocalLibrarySettingsStore.ts
// Local-library behaviour settings. Currently one: whether the app watches the imported folders and
// rescans them by itself. The watcher runtime lives in services/localLibraryAutoScan.ts and
// subscribes to this store rather than being driven by the settings UI.

export type LocalLibrarySettingsState = {
    /** Off by default: observation costs OS handles, and an unattended rescan should be opted into. */
    autoScanEnabled: boolean;
    setAutoScanEnabled: (enabled: boolean) => void;
    toggleAutoScan: () => void;
};

export const useLocalLibrarySettingsStore = create<LocalLibrarySettingsState>((set, get) => ({
    autoScanEnabled: false,

    setAutoScanEnabled: () => {
        set({ autoScanEnabled: false });
    },

    toggleAutoScan: () => get().setAutoScanEnabled(!get().autoScanEnabled),
}));
