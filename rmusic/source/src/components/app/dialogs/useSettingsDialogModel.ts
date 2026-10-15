import { useMemo } from 'react';
import { lyricCurrentTime } from '../../../stores/motionSignals';
import { usePlaybackStore } from '../../../stores/usePlaybackStore';
import { useSettingsModalStore } from '../../../stores/useSettingsModalStore';
import { buildSettingsDialogModel, type SettingsDialogDeps } from './buildSettingsDialogModel';

export const useSettingsDialogModel = ({
    themeController,
    themeParkInitialTheme,
    onAudioOutputDeviceChange,
}: SettingsDialogDeps) => {
    const state = useSettingsModalStore(modal => modal.settingsModalState);
    const currentLyrics = usePlaybackStore(playback => playback.lyrics);

    return useMemo(() => buildSettingsDialogModel({
        themeController,
        themeParkInitialTheme,
        onAudioOutputDeviceChange,
        state,
        currentLyrics,
        lyricCurrentTime,
    }), [themeController, themeParkInitialTheme, onAudioOutputDeviceChange, state, currentLyrics]);
};
