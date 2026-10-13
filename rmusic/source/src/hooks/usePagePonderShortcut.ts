import type { PonderTargetId } from '../types/ponder';
import type { PonderHoldProgressRefs } from './ponderHoldProgress';

export type PagePonderShortcutState = {
    isHolding: boolean;
    targetId: PonderTargetId | null;
};

export const usePagePonderShortcut = (_refs: PonderHoldProgressRefs): PagePonderShortcutState => ({
    isHolding: false,
    targetId: null,
});
export default usePagePonderShortcut;
