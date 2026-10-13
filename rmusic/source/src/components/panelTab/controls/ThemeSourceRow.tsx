import RmusicThemeSelector from '../../shared/RmusicThemeSelector';
import React from 'react';
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

const ThemeSourceRow: React.FC<ThemeSourceRowProps> = ({}) => {

    return <RmusicThemeSelector />;
};

export default ThemeSourceRow;
