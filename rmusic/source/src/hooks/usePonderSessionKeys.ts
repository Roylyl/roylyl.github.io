import type { RefObject } from 'react';
import type { PonderTimelineControls } from '../components/ponder/usePonderTimeline';

type UsePonderSessionKeysParams = {
    isActive: boolean;
    sceneCount: number;
    controlsRef: RefObject<PonderTimelineControls | null>;
    onAnyKey?: () => void;
};

export const usePonderSessionKeys = (_params: UsePonderSessionKeysParams): void => {};
export default usePonderSessionKeys;
