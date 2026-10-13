import React, { useState } from 'react';
import { ChevronRight, Monitor, Radio, RefreshCw, Settings2, Timer } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import type { LocalLyricsPriority, Theme } from '../../../types';
import { useAudioOutputDevices } from '../../../hooks/useAudioOutputDevices';
import { CustomSelect } from '../../shared/CustomSelect';
import { LYRIC_MATCH_SOURCES } from '../../../utils/lyrics/lyricMatchSources';
import { getLyricProviderPreferenceLabel } from '../../../utils/lyrics/lyricSourceLabels';
import LocalLyricFormatOrderSetting from './LocalLyricFormatOrderSetting';
import { SettingsAnchor } from './navigation/SettingsAnchorContext';
import SettingsSectionHeading from './navigation/SettingsSectionHeading';
import { useLyricSettingsStore } from '../../../stores/useLyricSettingsStore';
import { useAudioSettingsStore } from '../../../stores/useAudioSettingsStore';
import { useOnlineProviderAccountStore } from '../../../stores/useOnlineProviderAccountStore';
import { isNeteaseScrobbleReady } from '../../../services/onlineMusic/playbackReportGate';
import { isNativeMediaPlaybackPreferred } from '../../../services/nativeMediaPlayback';

// src/components/modal/settings/PlaybackSettingsSubview.tsx
// Playback behavior and output-device settings extracted from the global settings modal.

interface MediaDevicesWithAudioOutput extends MediaDevices {
    selectAudioOutput?: (options?: { deviceId?: string; }) => Promise<{ deviceId: string; label?: string; }>;
}

type PlaybackSettingsSubviewProps = {
    isDaylight: boolean;
    onAudioOutputDeviceChange: (deviceId: string) => Promise<boolean> | boolean;
    onOpenGlobalLyricOffsetSettings: () => void;
    settingsCardClass: string;
    theme?: Theme;
    utilityGhostButtonClass: string;
};

const PlaybackSettingsSubview: React.FC<PlaybackSettingsSubviewProps> = ({
    isDaylight,
    onAudioOutputDeviceChange,
    onOpenGlobalLyricOffsetSettings,
    settingsCardClass,
    theme,
    utilityGhostButtonClass,
}) => {
    const { t } = useTranslation();
    const supportsAudioProcessing = !isNativeMediaPlaybackPreferred();
    const {
        audioOutputDeviceId,
        enableTranscodeFallback,
        neteaseScrobbleEnabled,
        playbackFadeEnabled,
        onToggleTranscodeFallback,
        onToggleNeteaseScrobble,
        onTogglePlaybackFade,
    } = useAudioSettingsStore(useShallow(state => ({
        audioOutputDeviceId: state.audioOutputDeviceId,
        enableTranscodeFallback: state.enableTranscodeFallback,
        neteaseScrobbleEnabled: state.neteaseScrobbleEnabled,
        playbackFadeEnabled: state.playbackFadeEnabled,
        onToggleTranscodeFallback: state.handleToggleTranscodeFallback,
        onToggleNeteaseScrobble: state.handleToggleNeteaseScrobble,
        onTogglePlaybackFade: state.handleTogglePlaybackFade,
    })));
    // Subscribed to rather than read once: the panel has to grey out the moment the NetEase account
    // signs out. `isNeteaseScrobbleReady` is the same predicate the command palette gates on, so the
    // two can never disagree about whether the toggle may be flipped.
    useOnlineProviderAccountStore(state => state.accounts.netease?.status);
    const canReportNeteasePlayback = isNeteaseScrobbleReady();
    const {
        autoUseBestLyric,
        preferredAlternativeLyricSource,
        localLyricsPriority,
        globalLyricTimelineOffsetMs,
        onToggleAutoUseBestLyric,
        onPreferredAlternativeLyricSourceChange,
        onLocalLyricsPriorityChange,
    } = useLyricSettingsStore(useShallow(state => ({
        autoUseBestLyric: state.autoUseBestLyric,
        preferredAlternativeLyricSource: state.preferredAlternativeLyricSource,
        localLyricsPriority: state.localLyricsPriority,
        globalLyricTimelineOffsetMs: state.globalLyricTimelineOffsetMs,
        onToggleAutoUseBestLyric: state.handleToggleAutoUseBestLyric,
        onPreferredAlternativeLyricSourceChange: state.handleSetPreferredAlternativeLyricSource,
        onLocalLyricsPriorityChange: state.handleSetLocalLyricsPriority,
    })));
    const {
        devices: audioOutputDevices,
        ensureLoaded: ensureAudioOutputDevicesLoaded,
        errorKey: audioOutputDevicesErrorKey,
        hasLoaded: hasLoadedAudioOutputDevices,
        isLoading: isAudioOutputDevicesLoading,
        isSupported: supportsAudioOutputSelection,
        refresh: refreshAudioOutputDevices,
        selectedDeviceLabel: selectedAudioOutputLabel,
        setErrorKey: setAudioOutputDevicesErrorKey,
    } = useAudioOutputDevices(audioOutputDeviceId);
    const [isSelectingAudioOutput, setIsSelectingAudioOutput] = useState(false);
    const mediaDevicesWithAudioOutput = navigator.mediaDevices as MediaDevicesWithAudioOutput | undefined;
    const accentOutlineColor = theme?.accentColor || (isDaylight ? '#44403c' : '#f4f4f5');
    const toggleOffBackgroundClass = isDaylight ? 'bg-zinc-300/90' : 'bg-white/10';

    // `disabled` rather than a `pointer-events-none` wrapper: that only stops the mouse, leaving the
    // button in the tab order and still operable with Enter or Space. Same shape as the one in
    // DesktopSettingsSubview.
    const renderToggle = (checked: boolean, onChange: () => void, disabled?: boolean) => (
        <button
            type="button"
            onClick={onChange}
            disabled={disabled}
            className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 disabled:cursor-not-allowed disabled:opacity-40 ${checked ? '' : toggleOffBackgroundClass}`}
            style={{ backgroundColor: checked ? theme?.secondaryColor || 'rgba(114, 119, 134, 1)' : undefined }}
            aria-pressed={checked}
        >
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
    );

    const handleSelectAudioOutputDevice = async (deviceId: string) => {
        setAudioOutputDevicesErrorKey(null);

        if (!deviceId) {
            await onAudioOutputDeviceChange('');
            return;
        }

        if (!mediaDevicesWithAudioOutput?.selectAudioOutput) {
            await onAudioOutputDeviceChange(deviceId);
            return;
        }

        setIsSelectingAudioOutput(true);
        try {
            const selected = await mediaDevicesWithAudioOutput.selectAudioOutput({ deviceId });
            const applied = await onAudioOutputDeviceChange(selected.deviceId);
            if (applied) {
                await refreshAudioOutputDevices();
            } else {
                setAudioOutputDevicesErrorKey('options.audioOutputSelectFailed');
            }
        } catch (error) {
            console.error('[PlaybackSettingsSubview] Failed to select audio output device', error);
            setAudioOutputDevicesErrorKey('options.audioOutputSelectFailed');
        } finally {
            setIsSelectingAudioOutput(false);
        }
    };

    const audioOutputOptions = [
        { value: '', label: t('options.audioOutputDefault') },
        ...audioOutputDevices.map((device, index) => ({
            value: device.deviceId,
            label: device.label || `${t('options.audioOutputUnnamed')} ${index + 1}`,
        })),
    ];

    // The list is enumerated on demand, so a device saved in an earlier session needs its own entry
    // until then; without it the picker would look empty while a non-default output is active.
    if (audioOutputDeviceId && !audioOutputDevices.some(device => device.deviceId === audioOutputDeviceId)) {
        audioOutputOptions.push({
            value: audioOutputDeviceId,
            label: selectedAudioOutputLabel || t('options.audioOutputUnnamed'),
        });
    }

    return (
        <div className="space-y-5">
            <SettingsAnchor anchorId="lyrics" label={t('options.lyrics')}>
                <SettingsSectionHeading icon={Settings2} label={t('options.lyrics')} />
                <div className={`rounded-xl border overflow-hidden ${settingsCardClass}`}>
                    <p className="p-4 text-sm opacity-65">歌词使用Music仓库中的标准化版本。</p>
                    <button
                        type="button"
                        onClick={onOpenGlobalLyricOffsetSettings}
                        className="w-full p-4 border-t text-left transition-colors hover:bg-white/8"
                        style={{ borderColor: 'var(--border-primary, rgba(255,255,255,0.06))' }}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                                <div className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                    <Timer size={14} />
                                    {t('options.globalLyricTimelineOffset')}
                                </div>
                                <div className="text-[11px] opacity-50 max-w-[420px]" style={{ color: 'var(--text-secondary)' }}>
                                    {t('options.globalLyricTimelineOffsetDesc')}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="font-mono text-xs opacity-70" style={{ color: 'var(--text-primary)' }}>
                                    {globalLyricTimelineOffsetMs > 0 ? `+${globalLyricTimelineOffsetMs}` : globalLyricTimelineOffsetMs}ms
                                </span>
                                <ChevronRight size={18} className="opacity-60" style={{ color: 'var(--text-primary)' }} />
                            </div>
                        </div>
                    </button>

                </div>
            </SettingsAnchor>

            <SettingsAnchor anchorId="audioOutputSettings" label={t('options.audioOutputSettings')}>
                <SettingsSectionHeading icon={Monitor} label={t('options.audioOutputSettings')} />
                <div className={`p-4 rounded-xl border space-y-4 ${settingsCardClass}`}>
                    {supportsAudioProcessing && <div className="flex items-start justify-between gap-3 border-b border-current/10 pb-4">
                        <div className="space-y-1">
                            <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                {t('options.playbackFade')}
                            </div>
                            <div className="text-[11px] opacity-50 max-w-[420px]" style={{ color: 'var(--text-secondary)' }}>
                                {t('options.playbackFadeDesc')}
                            </div>
                        </div>
                        {renderToggle(playbackFadeEnabled, () => onTogglePlaybackFade(!playbackFadeEnabled))}
                    </div>}
                    {window.electron?.requestTranscodeFallback && (
                        <div className="flex items-start justify-between gap-3 border-b border-current/10 pb-4">
                            <div className="space-y-1">
                                <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                    {t('options.transcodeFallback')}
                                </div>
                                <div className="text-[11px] opacity-50 max-w-[420px]" style={{ color: 'var(--text-secondary)' }}>
                                    {t('options.transcodeFallbackDesc')}
                                </div>
                            </div>
                            {renderToggle(enableTranscodeFallback, () => onToggleTranscodeFallback(!enableTranscodeFallback))}
                        </div>
                    )}
                    <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                            <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                {t('options.audioOutputDevice')}
                            </div>
                            <div className="text-[11px] opacity-50 max-w-[420px]" style={{ color: 'var(--text-secondary)' }}>
                                {t('options.audioOutputDeviceDesc')}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => void refreshAudioOutputDevices()}
                            disabled={!supportsAudioOutputSelection || isAudioOutputDevicesLoading || isSelectingAudioOutput}
                            className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition-colors ${utilityGhostButtonClass} disabled:cursor-not-allowed disabled:opacity-45`}
                            style={{ color: 'var(--text-primary)' }}
                        >
                            <RefreshCw size={13} className={isAudioOutputDevicesLoading ? 'animate-spin' : ''} />
                            <span>{t('options.audioOutputRefresh')}</span>
                        </button>
                    </div>

                    {!supportsAudioOutputSelection ? (
                        <div className="text-xs opacity-60" style={{ color: 'var(--text-secondary)' }}>
                            {t('options.audioOutputUnsupported')}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <CustomSelect
                                value={audioOutputDeviceId}
                                onChange={(val) => {
                                    void handleSelectAudioOutputDevice(val);
                                }}
                                options={audioOutputOptions}
                                onOpen={ensureAudioOutputDevicesLoaded}
                                disabled={isSelectingAudioOutput}
                                isDaylight={isDaylight}
                                theme={theme}
                            />

                            <div className="text-[11px] opacity-50" style={{ color: 'var(--text-secondary)' }}>
                                {isSelectingAudioOutput
                                    ? (t('options.audioOutputSelecting'))
                                    : isAudioOutputDevicesLoading
                                        ? (t('options.audioOutputLoading'))
                                        : (t('options.audioOutputDefaultDesc'))}
                            </div>

                            {audioOutputDevicesErrorKey && (
                                <div className="text-xs opacity-60" style={{ color: 'var(--text-secondary)' }}>
                                    {t(audioOutputDevicesErrorKey)}
                                </div>
                            )}

                            {hasLoadedAudioOutputDevices && !isAudioOutputDevicesLoading && audioOutputDevices.length === 0 && !audioOutputDevicesErrorKey && (
                                <div className="text-xs opacity-60" style={{ color: 'var(--text-secondary)' }}>
                                    {t('options.audioOutputEmpty')}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </SettingsAnchor>
        </div>
    );
};

export default PlaybackSettingsSubview;
