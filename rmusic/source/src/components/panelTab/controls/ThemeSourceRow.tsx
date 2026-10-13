import RmusicThemeSelector from '../../shared/RmusicThemeSelector';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Theme, ThemeMode } from '../../../types';
import type { ThemeSourceModel } from '../../../hooks/themeControllerState';

// src/components/panelTab/controls/ThemeSourceRow.tsx
// 主题来源选择（默认 / AI / 自定义），和歌词样式、背景同属外观区。
// 自定义主题不可用时保留占位而不是整格消失，避免这一行的宽度跳变。

interface ThemeSourceRowProps {
    themeSourceModel: ThemeSourceModel;
    onBgModeChange: (mode: ThemeMode) => void;
    hasCustomTheme: boolean;
    defaultTheme: Theme;
    daylightTheme: Theme;
    isDaylight: boolean;
}

const ThemeSourceRow: React.FC<ThemeSourceRowProps> = ({
    themeSourceModel,
    onBgModeChange,
    hasCustomTheme,
    defaultTheme,
    daylightTheme,
    isDaylight,
}) => {
    const { t } = useTranslation();
    const wellBg = isDaylight ? 'bg-black/5' : 'bg-black/20';
    const activeOptionBg = isDaylight ? 'bg-white shadow-sm hover:bg-white/90' : 'bg-white/20 shadow-sm hover:bg-white/30';
    const aiThemeSource = themeSourceModel.options.ai;
    const customThemeSource = themeSourceModel.options.custom;

    const sources: {
        mode: ThemeMode;
        label: string;
        swatch: string;
        available: boolean;
        bordered: boolean;
    }[] = [
        {
            mode: 'default',
            label: t('ui.default'),
            swatch: isDaylight ? daylightTheme.backgroundColor : defaultTheme.backgroundColor,
            available: true,
            bordered: false,
        },
        {
            mode: 'ai',
            label: t('ui.aiTheme'),
            swatch: aiThemeSource.theme?.backgroundColor ?? 'rgba(114,119,134,0.4)',
            available: aiThemeSource.available,
            bordered: true,
        },
        {
            mode: 'custom',
            label: t('options.customTheme') || 'Custom',
            swatch: customThemeSource.theme?.accentColor ?? 'rgba(114,119,134,0.4)',
            available: hasCustomTheme,
            bordered: true,
        },
    ];

    return <RmusicThemeSelector />;
};

export default ThemeSourceRow;
