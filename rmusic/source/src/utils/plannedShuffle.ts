import type { SongResult } from '../types';
import { getSongResourceCacheKey } from '../services/onlineMusic/resourceKeys';
let previousKey = '';
let plannedIndex = 0;
export function plannedShuffleIndex(queue: SongResult[], currentIndex: number): number {
    const key = `${currentIndex}:` + queue.map(song => getSongResourceCacheKey('audio', song)).join('|');
    if (key !== previousKey) {
        previousKey = key;
        const candidates = queue.map((_, index) => index).filter(index => index !== currentIndex);
        plannedIndex = candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : 0;
    }
    return plannedIndex;
}
