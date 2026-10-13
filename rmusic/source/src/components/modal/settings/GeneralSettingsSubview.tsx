import React from 'react';
import { Languages, LayoutList, Move } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import type { Theme } from '../../../types';
import type { AppLanguagePreference } from '../../../i18n/config';
import { CustomSelect } from '../../shared/CustomSelect';
import PinnedCommandSettings from './PinnedCommandSettings';
import PonderHintSettingsSection from './PonderHintSettingsSection';
import PlaybackEntryViewSection from './PlaybackEntryViewSection';
import LibrarySuiteSection from './LibrarySuiteSection';
import BravaisSettingsSection from './BravaisSettingsSection';
import PlayerBottomBarSection from './PlayerBottomBarSection';
import HomeCardPositionSection from './HomeCardPositionSection';
import { SettingsAnchor } from './navigation/SettingsAnchorContext';
import SettingsSectionHeading from './navigation/SettingsSectionHeading';
import { settingsDividerClassFor } from './settingsCardClasses';
import { useHomeLayoutSettingsStore } from '../../../stores/useHomeLayoutSettingsStore';
import { useSettingsModalStore } from '../../../stores/useSettingsModalStore';

// src/components/modal/settings/GeneralSettingsSubview.tsx
// Global app preferences that should stay independent from playback and desktop-only settings.

type GeneralSettingsSubviewProps = {
    isDaylight: boolean;
    settingsCardClass: string;
    theme?: Theme;
    utilityGhostButtonClass: string;
};

const GeneralSettingsSubview: React.FC<GeneralSettingsSubviewProps> = ({
    isDaylight,
    settingsCardClass,
    theme,
    utilityGhostButtonClass,
}) => {
    const { t, i18n } = useTranslation();
    const {
        appLanguagePreference,
        onAppLanguagePreferenceChange,
    } = useSettingsModalStore(useShallow(state => ({
        appLanguagePreference: state.appLanguagePreference,
        onAppLanguagePreferenceChange: state.handleSetAppLanguagePreference,
    })));
    const {
        showHomeTabPlaylist,
        showHomeTabRadio,
        showHomeTabAlbums,
        showHomeTabLocal,
        handleToggleHomeTabPlaylist,
        handleToggleHomeTabRadio,
        handleToggleHomeTabAlbums,
        handleToggleHomeTabLocal,
    } = useHomeLayoutSettingsStore(useShallow(state => ({
        showHomeTabPlaylist: state.showHomeTabPlaylist,
        showHomeTabRadio: state.showHomeTabRadio,
        showHomeTabAlbums: state.showHomeTabAlbums,
        showHomeTabLocal: state.showHomeTabLocal,
        handleToggleHomeTabPlaylist: state.handleToggleHomeTabPlaylist,
        handleToggleHomeTabRadio: state.handleToggleHomeTabRadio,
        handleToggleHomeTabAlbums: state.handleToggleHomeTabAlbums,
        handleToggleHomeTabLocal: state.handleToggleHomeTabLocal,
    })));
    const getResolvedLanguageLabel = (): string => {
        const lang = i18n.resolvedLanguage;
        if (lang?.startsWith('zh')) {
            return t('options.appLanguageZhCN');
        }
        if (lang === 'in' || lang?.startsWith('id')) {
            return t('options.appLanguageInID') || 'Bahasa Indonesia';
        }
        return t('options.appLanguageEnUS') || 'English';
    };

    const currentResolvedLanguage = getResolvedLanguageLabel();

    const languageOptions: Array<{ value: AppLanguagePreference; label: string; }> = [
        { value: 'system', label: t('options.appLanguageSystem') },
        { value: 'zh-CN', label: t('options.appLanguageZhCN') },
        { value: 'en', label: t('options.appLanguageEnUS') || 'English' },
        { value: 'in', label: t('options.appLanguageInID') || 'Bahasa Indonesia' },
    ];

    const languageHint = appLanguagePreference === 'system'
        ? (t('options.appLanguageSystemHint')).replace('{{language}}', currentResolvedLanguage)
        : null;

    const toggleOffBackgroundClass = isDaylight ? 'bg-zinc-200' : 'bg-[#2A2D35]';
    const rangeInputClass = [
        'w-full accent-current',
        isDaylight ? 'text-zinc-900' : 'text-white',
    ].join(' ');

    return (
        <div className="space-y-5">
            <SettingsAnchor anchorId="languageSettings" label={t('options.languageSettings')}>
                <SettingsSectionHeading icon={Languages} label={t('options.languageSettings')} />
                <div className={`p-4 rounded-xl border space-y-4 ${settingsCardClass}`}>
                    <div className="space-y-1">
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                            {t('options.appLanguage')}
                        </div>
                        <div className="text-[11px] opacity-50 max-w-[420px]" style={{ color: 'var(--text-secondary)' }}>
                            {t('options.appLanguageDesc')}
                        </div>
                    </div>
                    <CustomSelect
                        value={appLanguagePreference}
                        onChange={(value) => {
                            void onAppLanguagePreferenceChange(value as AppLanguagePreference);
                        }}
                        options={languageOptions}
                        isDaylight={isDaylight}
                        theme={theme}
                    />
                    {languageHint && (
                        <div className="text-[11px] opacity-50" style={{ color: 'var(--text-secondary)' }}>
                            {languageHint}
                        </div>
                    )}
                </div>
            </SettingsAnchor>

            

            <HomeCardPositionSection isDaylight={isDaylight} settingsCardClass={settingsCardClass} theme={theme} />

            <PlaybackEntryViewSection
                isDaylight={isDaylight}
                settingsCardClass={settingsCardClass}
                theme={theme}
            />

            <LibrarySuiteSection
                isDaylight={isDaylight}
                settingsCardClass={settingsCardClass}
                theme={theme}
            />

            <BravaisSettingsSection
                isDaylight={isDaylight}
                settingsCardClass={settingsCardClass}
                theme={theme}
            />

            <SettingsAnchor anchorId="bottomUiSettings" label={t('options.bottomUiSettings')} className="space-y-4">
                <SettingsSectionHeading icon={Move} label={t('options.bottomUiSettings')} />
                <PlayerBottomBarSection
                    settingsCardClass={settingsCardClass}
                    utilityGhostButtonClass={utilityGhostButtonClass}
                    rangeInputClass={rangeInputClass}
                    isDaylight={isDaylight}
                    theme={theme}
                />
            </SettingsAnchor>

            <PinnedCommandSettings
                isDaylight={isDaylight}
                settingsCardClass={settingsCardClass}
                theme={theme}
            />

            <PonderHintSettingsSection
                settingsCardClass={settingsCardClass}
                isDaylight={isDaylight}
                accentColor={theme?.accentColor}
            />
        </div>
    );
};

export default GeneralSettingsSubview;
