import React from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import type { Theme } from '../../../types';
import type { AppLanguagePreference } from '../../../i18n/config';
import { CustomSelect } from '../../shared/CustomSelect';
import PlaybackEntryViewSection from './PlaybackEntryViewSection';
import LibrarySuiteSection from './LibrarySuiteSection';
import { SettingsAnchor } from './navigation/SettingsAnchorContext';
import SettingsSectionHeading from './navigation/SettingsSectionHeading';
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
  theme
}) => {
    const { t, i18n } = useTranslation();
    const {
        appLanguagePreference,
        onAppLanguagePreferenceChange,
    } = useSettingsModalStore(useShallow(state => ({
        appLanguagePreference: state.appLanguagePreference,
        onAppLanguagePreferenceChange: state.handleSetAppLanguagePreference,
    })));

    const getResolvedLanguageLabel = (): string => {
        const lang = i18n.resolvedLanguage;
        if (lang === 'zh-TW') return '繁體中文';
        if (lang?.startsWith('zh')) return '简体中文';
        return t('options.appLanguageEnUS') || 'English';
    };

    const currentResolvedLanguage = getResolvedLanguageLabel();

    const languageOptions: Array<{ value: AppLanguagePreference; label: string; }> = [
        { value: 'system', label: t('options.appLanguageSystem') },
        { value: 'zh-CN', label: '简体中文' },
        { value: 'en', label: t('options.appLanguageEnUS') || 'English' },
        { value: 'zh-TW', label: '繁體中文' },
    ];

    const languageHint = appLanguagePreference === 'system'
        ? (t('options.appLanguageSystemHint')).replace('{{language}}', currentResolvedLanguage)
        : null;

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

        </div>
    );
};

export default GeneralSettingsSubview;
