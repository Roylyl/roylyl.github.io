import type React from 'react';
import type { MotionValue } from 'framer-motion';
import type SettingsModal from '../../modal/SettingsModal';
import type { DualTheme, LyricData } from '../../../types';
import type { useThemeController } from '../../../hooks/useThemeController';
import { closeSettings, type SettingsModalState } from '../../../stores/useSettingsModalStore';

type SettingsDialogProps = React.ComponentProps<typeof SettingsModal>;
type ThemeController = ReturnType<typeof useThemeController>;

type SettingsDialogAmbient = {
    state: SettingsModalState;
    currentLyrics: LyricData | null;
    lyricCurrentTime: MotionValue<number>;
};

export type SettingsDialogDeps = {
    themeController: ThemeController;
    themeParkInitialTheme: DualTheme;
    onAudioOutputDeviceChange: (deviceId: string) => Promise<boolean> | boolean;
};

type BuildSettingsDialogModelParams = SettingsDialogAmbient & SettingsDialogDeps;

export const buildSettingsDialogModel = ({
    state,
    themeController,
    themeParkInitialTheme,
    currentLyrics,
    lyricCurrentTime,
    onAudioOutputDeviceChange,
}: BuildSettingsDialogModelParams): SettingsDialogProps | null => {
    if (!state.isOpen) return null;

    return {
        theme: themeController.theme,
        themeParkInitialTheme,
        onSaveCustomTheme: themeController.saveCustomDualTheme,
        onSaveAiTheme: themeController.saveEditedAiDualTheme,
        currentLyrics,
        lyricCurrentTime,
        onAudioOutputDeviceChange,
        initialTab: state.initialTab,
        initialSubview: state.initialSubview ?? null,
        initialVisualizerSection: state.initialVisualizerSection ?? null,
        initialAnchor: state.initialAnchor ?? null,
        onClose: closeSettings,
    };
};
