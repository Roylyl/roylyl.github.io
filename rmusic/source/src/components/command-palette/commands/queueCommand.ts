import { ListMusic } from 'lucide-react';
import { defineCommand } from '../commandFactories';
import { useQueuePanelStore } from '../../../stores/useQueuePanelStore';
import type { CommandPaletteCommand } from '../types';

export const queueCommand: CommandPaletteCommand = defineCommand({
    id: 'queue',
    group: 'playback',
    title: 'Queue',
    description: 'Open the current play queue',
    keywords: ['播放队列', '当前歌单'],
    icon: ListMusic,
    isAvailable: context => !context?.playback.isFmMode,
    execute: () => {
        useQueuePanelStore.getState().setOpen(true);
        return true;
    },
});
