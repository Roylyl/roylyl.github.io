import React from 'react';
import { Heart, Repeat, Repeat1, RepeatOff, Sparkle, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ThemeSourceModel } from '../../../hooks/themeControllerState';

// src/components/panelTab/controls/SongActionRow.tsx
// 当前歌曲的三个动作：循环、喜欢、生成 AI 主题。面板里唯一一排大触控目标，保持原样。

interface SongActionRowProps {
    loopMode: 'off' | 'all' | 'one';
    /** Receives the click so the handler can stop it from reaching the panel container. */
    onToggleLoop: (event?: React.MouseEvent) => void;
    loopToggleDisabled: boolean;
    onLike: () => void;
    isLiked: boolean;
    likeDisabled: boolean;
    likeDisabledReason?: string;
    onGenerateAITheme: () => void;
    isGeneratingTheme: boolean;
    canGenerateAITheme: boolean;
    themeSourceModel: ThemeSourceModel;
    isDaylight: boolean;
}

const SongActionRow: React.FC<SongActionRowProps> = ({
    loopMode,
    onToggleLoop,
    loopToggleDisabled,
    onLike,
    isLiked,
    likeDisabled,
    likeDisabledReason,
    onGenerateAITheme,
    isGeneratingTheme,
    canGenerateAITheme,
    themeSourceModel,
    isDaylight,
}) => {
    const { t } = useTranslation();
    const loopButtonBg = isDaylight ? 'bg-black/5 hover:bg-zinc-300/85' : 'bg-white/5 hover:bg-white/10';
    const buttonBg = isDaylight ? 'bg-black/5 hover:bg-black/10' : 'bg-white/5 hover:bg-white/10';
    const loopTitle = loopMode === 'off' ? t('player.loopOff') : loopMode === 'one' ? t('player.loopOne') : t('player.loopAll');
    const generateThemeTitle = isGeneratingTheme ? t('ui.generatingTheme') : t('ui.generateAITheme');

    return (
        <div className="grid grid-cols-2 gap-3">
            <button
                onClick={event => {
                    onToggleLoop(event);
                }}
                disabled={loopToggleDisabled}
                title={loopTitle}
                aria-label={loopTitle}
                className={`h-12 rounded-xl flex items-center justify-center transition-colors ${loopButtonBg} ${loopToggleDisabled ? 'opacity-35 cursor-not-allowed' : ''}`}
            >
                {loopMode === 'off' ? <RepeatOff size={20} /> : loopMode === 'one' ? <Repeat1 size={20} /> : <Repeat size={20} />}
            </button>

            <button
                onClick={onLike}
                disabled={likeDisabled}
                title={likeDisabledReason || (isLiked ? t('player.unlike') : t('player.like'))}
                aria-label={likeDisabledReason || (isLiked ? t('player.unlike') : t('player.like'))}
                className={`h-12 rounded-xl flex items-center justify-center transition-colors ${isLiked ? 'bg-red-500/20 text-red-500' : buttonBg} ${likeDisabled ? 'opacity-35 cursor-not-allowed' : ''}`}
            >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>

        </div>
    );
};

export default SongActionRow;
