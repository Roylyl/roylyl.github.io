import { Monitor, Moon, Sun, Palette } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeSettingsStore, type RmusicAppearanceMode } from '../../stores/useThemeSettingsStore';

const options = [
    { value: 'system', label: 'options.appearanceModeSystem', icon: Monitor },
    { value: 'dark', label: 'options.appearanceModeDark', icon: Moon },
    { value: 'light', label: 'options.appearanceModeLight', icon: Sun },
    { value: 'cover', label: 'options.appearanceModeCover', icon: Palette },
] as const;

export default function RmusicThemeSelector() {
    const { t } = useTranslation();
    const mode = useThemeSettingsStore(state => state.appearanceMode);
    const setMode = useThemeSettingsStore(state => state.setAppearanceMode);
    return (
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={t('options.themePresets')} data-rmusic-theme-selector>
            {options.map(({ value, label, icon: Icon }) => (
                <button key={value} type="button" role="radio" aria-checked={mode === value}
                    onClick={() => setMode(value as RmusicAppearanceMode)}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-colors touch-manipulation"
                    style={{ color: 'var(--text-primary)', borderColor: mode === value ? 'var(--text-accent)' : 'color-mix(in srgb, var(--text-primary) 15%, transparent)',
                        backgroundColor: mode === value ? 'color-mix(in srgb, var(--text-accent) 12%, transparent)' : 'transparent' }}>
                    <Icon size={16} aria-hidden="true" />{t(label)}
                </button>
            ))}
        </div>
    );
}
