import React from 'react';
import { Command, MousePointerClick } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import type { Theme } from '../../../types';
import { SettingsAnchor } from './navigation/SettingsAnchorContext';
import SettingsSectionHeading from './navigation/SettingsSectionHeading';
import {
    useInteractionSettingsStore,
    type GridActionButtonSlideTarget,
} from '../../../stores/useInteractionSettingsStore';

// src/components/modal/settings/InteractionSettingsSubview.tsx
// How the listener reaches the command palette: what the grids' action button leads to, whether a
// bare `s` on a grid means "filter" or "commands".

type InteractionSettingsSubviewProps = {
    isDaylight: boolean;
    settingsCardClass: string;
    theme?: Theme;
};

export const InteractionSettingsSubview: React.FC<InteractionSettingsSubviewProps> = ({
    isDaylight,
    settingsCardClass,
    theme,
}) => {
    const { t } = useTranslation();
    const {
        gridActionButtonSlideTarget,
        gridCommandPaletteHotkey,
        setGridActionButtonSlideTarget,
        handleToggleGridCommandPaletteHotkey,
    } = useInteractionSettingsStore(useShallow(state => ({
        gridActionButtonSlideTarget: state.gridActionButtonSlideTarget,
        gridCommandPaletteHotkey: state.gridCommandPaletteHotkey,
        setGridActionButtonSlideTarget: state.setGridActionButtonSlideTarget,
        handleToggleGridCommandPaletteHotkey: state.handleToggleGridCommandPaletteHotkey,
    })));

    const accentOutlineColor = theme?.secondaryColor || 'rgba(114, 119, 134, 1)';
    const toggleOffBackgroundClass = isDaylight ? 'bg-zinc-300/90' : 'bg-white/10';

    const optionStyle = (selected: boolean) => (
        selected
            ? {
                borderColor: accentOutlineColor,
                boxShadow: `inset 0 0 0 1px ${accentOutlineColor}`,
                backgroundColor: isDaylight ? `${accentOutlineColor}12` : `${accentOutlineColor}18`,
            }
            : { borderColor: isDaylight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.10)' }
    );

    const renderToggle = (checked: boolean, onChange: () => void, label: string) => (
        <button
            type="button"
            onClick={onChange}
            className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${checked ? '' : toggleOffBackgroundClass}`}
            style={{ backgroundColor: checked ? accentOutlineColor : undefined }}
            role="switch"
            aria-checked={checked}
            aria-label={label}
        >
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
    );

    const slideOptions: Array<{ value: GridActionButtonSlideTarget; label: string; desc: string }> = [
        {
            value: 'filter',
            label: t('options.gridSlideTargetFilter'),
            desc: t('options.gridSlideTargetFilterDesc'),
        },
        {
            value: 'command-palette',
            label: t('options.gridSlideTargetCommandPalette'),
            desc: t('options.gridSlideTargetCommandPaletteDesc'),
        },
    ];

    return (
        <div className="space-y-5">
            <SettingsAnchor anchorId="gridActionButton" label={t('options.gridActionButton')}>
                <SettingsSectionHeading icon={MousePointerClick} label={t('options.gridActionButton')} />
                <div className={`p-4 rounded-xl border space-y-4 ${settingsCardClass}`}>
                    <div className="space-y-1">
                        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                            {t('options.gridSlideTarget')}
                        </div>
                        <div className="text-[11px] opacity-50 max-w-[360px]" style={{ color: 'var(--text-secondary)' }}>
                            {t('options.gridSlideTargetDesc')}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {slideOptions.map(option => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setGridActionButtonSlideTarget(option.value)}
                                className="rounded-xl border px-3 py-3 text-left transition-colors"
                                style={optionStyle(gridActionButtonSlideTarget === option.value)}
                                aria-pressed={gridActionButtonSlideTarget === option.value}
                            >
                                <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                    {option.label}
                                </div>
                                <div className="mt-1 text-[11px] opacity-50" style={{ color: 'var(--text-secondary)' }}>
                                    {option.desc}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </SettingsAnchor>

            <SettingsAnchor anchorId="gridPaletteHotkey" label={t('options.gridPaletteHotkey')}>
                <SettingsSectionHeading icon={Command} label={t('options.gridPaletteHotkey')} />
                <div className={`p-4 rounded-xl border ${settingsCardClass}`}>
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1">
                            <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                {t('options.gridPaletteHotkey')}
                            </div>
                            <div className="text-[11px] opacity-50 max-w-[420px]" style={{ color: 'var(--text-secondary)' }}>
                                {t('options.gridPaletteHotkeyDesc')}
                            </div>
                        </div>
                        {renderToggle(
                            gridCommandPaletteHotkey,
                            () => handleToggleGridCommandPaletteHotkey(!gridCommandPaletteHotkey),
                            t('options.gridPaletteHotkey'),
                        )}
                    </div>
                </div>
            </SettingsAnchor>

        </div>
    );
};

export default InteractionSettingsSubview;
