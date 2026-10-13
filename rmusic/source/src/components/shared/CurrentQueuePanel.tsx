import type { SongResult } from '../../types';
import { useQueuePanelStore } from '../../stores/useQueuePanelStore';
import { SidePanelList, TrackListItem } from './SidePanelList';

export function CurrentQueuePanel({ queue, currentSong, onPlay, isDaylight }: {
    queue: SongResult[];
    currentSong: SongResult | null;
    onPlay: (song: SongResult, queue: SongResult[]) => void;
    isDaylight: boolean;
}) {
    const { isOpen, setOpen } = useQueuePanelStore();
    const focusedIndex = queue.findIndex(song => song.id === currentSong?.id);
    return <div className="fixed inset-0 z-[90] pointer-events-none">
        <SidePanelList isOpen={isOpen} onClose={() => setOpen(false)} title="当前播放队列"
            items={queue} itemHeight={76} isDaylight={isDaylight}
            focusedIndex={focusedIndex >= 0 ? focusedIndex : undefined}
            renderItem={(track, index, style) => <TrackListItem track={track} index={index}
                style={style} isActive={index === focusedIndex} onPlay={() => onPlay(track, queue)} />}
        />
    </div>;
}
