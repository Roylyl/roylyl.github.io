import { selectWebObsSource } from '../../../services/obs/webObsTarget';
import RmusicThemeSelector from '../../shared/RmusicThemeSelector';
import React from 'react';
import { Monitor, Palette, Settings2, LayoutGrid, PanelsTopLeft, Images, ChevronRight, AlertTriangle, KeyRound, Music2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import {
    type DualTheme,
    type Theme,
    type ThemeMode,
    type UrlBackgroundItem,
} from '../../../types';
import { ObsCopyCssButton } from '../../shared/ObsCopyCssButton';
import { ObsCopyUrlButton } from '../../shared/ObsCopyUrlButton';
import LatticeSettingsSection from './LatticeSettingsSection';
import GridViewSettingsSection from './GridViewSettingsSection';
import NowPlayingCardSettingsSection from './NowPlayingCardSettingsSection';
import { isThemeGenerationSource, type ThemeGenerationSource } from '../../../services/themePreferences';
import { SettingsAnchor } from './navigation/SettingsAnchorContext';
import SettingsSectionHeading from './navigation/SettingsSectionHeading';
import { settingsDividerClassFor } from './settingsCardClasses';
import { usePlayerChromeSettingsStore } from '../../../stores/usePlayerChromeSettingsStore';
import { useStageSettingsStore } from '../../../stores/useStageSettingsStore';
import { useLibraryWallLookStore } from '../../../stores/useLibraryWallLookStore';
import { isLibraryWallSeamStyle } from '../../../utils/libraryWallSeamStyle';

// src/components/modal/settings/AppearanceSettingsSubview.tsx
// Visual settings subview for theme presets, lyric renderer entry, layout settings, and configurations import/export.

type AppearanceSettingsSubviewProps = {
    accentOutlineColor: string;
    bgMode: ThemeMode;
    hasCustomTheme: boolean;
    isCustomThemePreferred: boolean;
    isDaylight: boolean;
    followSystemTheme: boolean;
    onApplyCustomTheme: () => void;
    onApplyDefaultTheme: () => void;
    onOpenThemePark: () => void;
    onOpenVisPlayground: () => void;
    onToggleSongThemeAutoGenerate: (enabled: boolean) => void;
    onToggleFollowSystemTheme: (enabled: boolean) => void;
    onToggleCustomThemePreferred: (enabled: boolean) => void;
    onToggleSongThemeAutoSwitch: (enabled: boolean) => void;
    themeGenerationSource: ThemeGenerationSource;
    onChangeThemeGenerationSource: (source: ThemeGenerationSource) => void;
    aiApiKeyStatus: 'loading' | 'configured' | 'missing';
    onOpenAiSettings: () => void;
    onToggleTransparentPlayerBackground: (enabled: boolean) => void;
    onToggleAutoHidePlayerChrome: (enabled: boolean) => void;
    onToggleAutoHideCursorWithPlayerChrome: (enabled: boolean) => void;
    onSaveCustomTheme: (dualTheme: DualTheme) => void;
    settingsCardClass: string;
    songThemeAutoSwitchEnabled: boolean;
    songThemeAutoGenerateEnabled: boolean;
    theme?: Theme;
    themeParkInitialTheme: DualTheme;
    toggleOffBackgroundClass: string;
    transparentPlayerBackground: boolean;
    autoHidePlayerChrome: boolean;
    autoHideCursorWithPlayerChrome: boolean;
    stageTrackPillMode: 'auto' | 'always' | 'never';
    stageTrackPillTimeoutSec: number;
    stageTrackPillOnHome: boolean;
    onChangeStageTrackPillMode: (mode: 'auto' | 'always' | 'never') => void;
    onChangeStageTrackPillTimeoutSec: (sec: number) => void;
    onToggleStageTrackPillOnHome: (enable: boolean) => void;
    utilityGhostButtonClass: string;
    grid3dCardStyle: 'image' | 'card';
    onChangeGrid3dCardStyle: (style: 'image' | 'card') => void;
    aiTheme?: DualTheme | null;
    customTheme?: DualTheme | null;
};

// ==========================================
// Component
// ==========================================

const AppearanceSettingsSubview: React.FC<AppearanceSettingsSubviewProps> = ({
    accentOutlineColor,
    bgMode,
    hasCustomTheme,
    isCustomThemePreferred,
    isDaylight,
    followSystemTheme,
    onApplyCustomTheme,
    onApplyDefaultTheme,
    onOpenThemePark,
    onOpenVisPlayground,
    onToggleSongThemeAutoGenerate,
    onToggleFollowSystemTheme,
    onToggleCustomThemePreferred,
    onToggleSongThemeAutoSwitch,
    themeGenerationSource,
    onChangeThemeGenerationSource,
    aiApiKeyStatus,
    onOpenAiSettings,
    onToggleTransparentPlayerBackground,
    onToggleAutoHidePlayerChrome,
    onToggleAutoHideCursorWithPlayerChrome,
    onSaveCustomTheme,
    settingsCardClass,
    songThemeAutoSwitchEnabled,
    songThemeAutoGenerateEnabled,
    theme,
    themeParkInitialTheme,
    toggleOffBackgroundClass,
    transparentPlayerBackground,
    autoHidePlayerChrome,
    autoHideCursorWithPlayerChrome,
    stageTrackPillMode,
    stageTrackPillTimeoutSec,
    onChangeStageTrackPillMode,
    onChangeStageTrackPillTimeoutSec,
    stageTrackPillOnHome,
    onToggleStageTrackPillOnHome,
    utilityGhostButtonClass,
    grid3dCardStyle,
    onChangeGrid3dCardStyle,
    aiTheme,
    customTheme,
}) => {
    const { t } = useTranslation();
    // OBS static URL points to this web deploy, so the copy button is web-only (no shareable URL under Electron).
    // The link follows the selected web stage source (Now Playing / PlayerCap); disabled when none is on.
    const isElectron = typeof window !== 'undefined' && Boolean((window as { electron?: unknown }).electron);
    const webObsSource = useStageSettingsStore(selectWebObsSource);
    const storePlayerChromeSettings = usePlayerChromeSettingsStore(useShallow(state => ({
        enablePlayerPageNativeBlur: state.enablePlayerPageNativeBlur,
    })));
    const getAccentOptionStyle = (selected: boolean) => (
        selected
            ? {
                borderColor: accentOutlineColor,
                boxShadow: `inset 0 0 0 1px ${accentOutlineColor}`,
                backgroundColor: isDaylight ? `${accentOutlineColor}12` : `${accentOutlineColor}18`,
            }
            : {
                borderColor: isDaylight ? 'rgba(24, 24, 27, 0.12)' : 'rgba(255, 255, 255, 0.1)',
                backgroundColor: isDaylight ? 'rgba(255, 255, 255, 0.72)' : 'rgba(255, 255, 255, 0.05)',
            }
    );
    const lyricsStyleBorderStart = theme?.accentColor || accentOutlineColor;
    const lyricsStyleBorderEnd = theme?.secondaryColor || theme?.primaryColor || accentOutlineColor;

    return (
        <div className="space-y-6">
            {/* Section 1: Lyrics Animation & Player View */}
            <SettingsAnchor anchorId="lyricsRenderer" label={t('options.lyricsRenderer')}>
                <SettingsSectionHeading icon={Monitor} label={t('options.lyricsRenderer')} />
                <div className="space-y-3">
                    {storePlayerChromeSettings.enablePlayerPageNativeBlur && (
                        <div className={`flex items-center gap-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-xs ${isDaylight ? 'text-amber-600' : 'text-amber-400'}`}>
                            <AlertTriangle size={16} className="shrink-0 text-amber-500" />
                            <span>{t('options.nativeBlurBackgroundNotice')}</span>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={onOpenVisPlayground}
                        className="group flex w-full items-center gap-3 rounded-xl border-2 border-transparent p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        style={{
                            color: 'var(--text-primary)',
                            background: [
                                `linear-gradient(color-mix(in srgb, var(--bg-color) ${isDaylight ? '96%' : '92%'}, ${lyricsStyleBorderStart}), color-mix(in srgb, var(--bg-color) ${isDaylight ? '96%' : '92%'}, ${lyricsStyleBorderStart})) padding-box`,
                                `linear-gradient(120deg, ${lyricsStyleBorderStart}, ${lyricsStyleBorderEnd}) border-box`,
                            ].join(', '),
                        }}
                    >
                        <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                            style={{
                                color: accentOutlineColor,
                                borderColor: `${accentOutlineColor}55`,
                                backgroundColor: `${accentOutlineColor}18`,
                            }}
                        >
                            <Settings2 size={19} />
                        </span>
                        <span className="min-w-0 flex-1 space-y-1">
                            <span className="block text-sm font-semibold">
                                {t('options.lyricsAnimationAdjust')}
                            </span>
                            <span className="block text-xs opacity-55" style={{ color: 'var(--text-secondary)' }}>
                                {t('options.lyricsRendererDesc')}
                            </span>
                        </span>
                        <ChevronRight size={18} className="shrink-0 opacity-45 transition-transform group-hover:translate-x-0.5 group-hover:opacity-80" />
                    </button>
                    <div className={`p-4 rounded-xl border space-y-4 ${settingsCardClass}`}>
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                                <div className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                    {t('options.transparentPlayerBackground')}
                                </div>
                                <div className="text-xs opacity-50 max-w-[360px]" style={{ color: 'var(--text-secondary)' }}>
                                    {t('options.transparentPlayerBackgroundDesc')}
                                </div>
                            </div>
                            <button
                                onClick={() => onToggleTransparentPlayerBackground(!transparentPlayerBackground)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${!transparentPlayerBackground ? toggleOffBackgroundClass : ''}`}
                                style={{ backgroundColor: transparentPlayerBackground ? theme?.secondaryColor || 'rgba(114, 119, 134, 1)' : undefined }}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${transparentPlayerBackground ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-4">
                            <div className="space-y-1">
                                <div className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                    {t('options.autoHidePlayerChrome')}
                                </div>
                                <div className="text-xs opacity-50 max-w-[360px]" style={{ color: 'var(--text-secondary)' }}>
                                    {t('options.autoHidePlayerChromeDesc')}
                                </div>
                            </div>
                            <button
                                onClick={() => onToggleAutoHidePlayerChrome(!autoHidePlayerChrome)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${!autoHidePlayerChrome ? toggleOffBackgroundClass : ''}`}
                                style={{ backgroundColor: autoHidePlayerChrome ? theme?.secondaryColor || 'rgba(114, 119, 134, 1)' : undefined }}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${autoHidePlayerChrome ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                        {/* 指针隐藏是控制栏自动隐藏的附加项：上面那个开关关着时它无事可做，
                            所以整行淡出，但仍可点击——先设好偏好再开自动隐藏也是合理的顺序。 */}
                        <div className={`pl-4 border-l-2 border-white/10 flex items-center justify-between gap-4 transition-opacity ${autoHidePlayerChrome ? '' : 'opacity-40'}`}>
                            <div className="space-y-1">
                                <div className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                    {t('options.autoHideCursorWithPlayerChrome')}
                                </div>
                                <div className="text-xs opacity-50 max-w-[360px]" style={{ color: 'var(--text-secondary)' }}>
                                    {t('options.autoHideCursorWithPlayerChromeDesc')}
                                </div>
                            </div>
                            <button
                                onClick={() => onToggleAutoHideCursorWithPlayerChrome(!autoHideCursorWithPlayerChrome)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${!autoHideCursorWithPlayerChrome ? toggleOffBackgroundClass : ''}`}
                                style={{ backgroundColor: autoHideCursorWithPlayerChrome ? theme?.secondaryColor || 'rgba(114, 119, 134, 1)' : undefined }}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${autoHideCursorWithPlayerChrome ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </SettingsAnchor>

            {/* Section 2: Theme presets and edit options */}
            <SettingsAnchor anchorId="themePresets" label="主题">
                <SettingsSectionHeading icon={Palette} label="主题" />
                <div className={`p-4 rounded-xl border ${settingsCardClass}`}>
                    <RmusicThemeSelector />
                </div>
            </SettingsAnchor>
            {/* Section 3: Now playing card */}
            

            {/* Section 4: Grid card style */}
            <SettingsAnchor anchorId="grid3dCardStyle" label={t('options.grid3dCardStyle')}>
                <SettingsSectionHeading icon={LayoutGrid} label={t('options.grid3dCardStyle')} />
                <div className={`p-4 rounded-xl border space-y-4 ${settingsCardClass}`}>
                    <div className="space-y-1">
                        <div className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                            {t('options.grid3dCardStyle')}
                        </div>
                        <div className="text-xs opacity-50 max-w-[360px]" style={{ color: 'var(--text-secondary)' }}>
                            {t('options.grid3dCardStyleDesc')}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => onChangeGrid3dCardStyle('image')}
                            className="flex flex-col items-center gap-2 p-3 rounded-lg border transition-all"
                            style={getAccentOptionStyle(grid3dCardStyle === 'image')}
                        >
                            <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                                {t('options.grid3dCardStyleImage')}
                            </span>
                        </button>
                        <button
                            onClick={() => onChangeGrid3dCardStyle('card')}
                            className="flex flex-col items-center gap-2 p-3 rounded-lg border transition-all"
                            style={getAccentOptionStyle(grid3dCardStyle === 'card')}
                        >
                            <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                                {t('options.grid3dCardStyleCard')}
                            </span>
                        </button>
                    </div>
                </div>
            </SettingsAnchor>

            {/* Section 5: Tile wall appearance (queue collage + bravais library wall) */}
            <SettingsAnchor anchorId="latticeSettings" label={t('options.latticeSettings')}>
                <SettingsSectionHeading icon={PanelsTopLeft} label={t('options.latticeSettings')} />
                <LatticeSettingsSection
                    settingsCardClass={settingsCardClass}
                    toggleOffBackgroundClass={toggleOffBackgroundClass}
                    isDaylight={isDaylight}
                    theme={theme}
                />
            </SettingsAnchor>

            {/* Section 6: Folia card grid, sitting with the poster wall it shares its look with. */}
            <SettingsAnchor anchorId="gridViewCardSettings" label={t('options.gridViewCardSettings')}>
                <SettingsSectionHeading icon={Images} label={t('options.gridViewCardSettings')} />
                <GridViewSettingsSection
                    settingsCardClass={settingsCardClass}
                    settingsDividerClass={settingsDividerClassFor(isDaylight)}
                    toggleOffBackgroundClass={toggleOffBackgroundClass}
                    theme={theme}
                />
            </SettingsAnchor>


        </div>
    );
};

export default AppearanceSettingsSubview;
