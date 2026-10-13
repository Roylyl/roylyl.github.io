import React from 'react';
import { Monitor, Moon, Sun, Palette } from 'lucide-react';
import { useThemeSettingsStore, type RmusicAppearanceMode } from '../../stores/useThemeSettingsStore';

const options = [
    { value: 'system', label: '跟随系统', icon: Monitor },
    { value: 'dark', label: '深色模式', icon: Moon },
    { value: 'light', label: '浅色模式', icon: Sun },
    { value: 'cover', label: '跟随封面', icon: Palette },
] as const;

export default function RmusicThemeSelector() {
    const mode = useThemeSettingsStore(state => state.appearanceMode);
    const setMode = useThemeSettingsStore(state => state.setAppearanceMode);
    return (
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="主题" data-rmusic-theme-selector>
            {options.map(({ value, label, icon: Icon }) => (
                <button key={value} type="button" role="radio" aria-checked={mode === value}
                    onClick={() => setMode(value as RmusicAppearanceMode)}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-colors touch-manipulation"
                    style={{ color: 'var(--text-primary)', borderColor: mode === value ? 'var(--text-accent)' : 'color-mix(in srgb, var(--text-primary) 15%, transparent)',
                        backgroundColor: mode === value ? 'color-mix(in srgb, var(--text-accent) 12%, transparent)' : 'transparent' }}>
                    <Icon size={16} aria-hidden="true" />{label}
                </button>
            ))}
        </div>
    );
}
