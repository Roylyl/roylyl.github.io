import type { RefObject } from 'react';
import type { PonderHoldProgressRefs } from './ponderHoldProgress';

type PonderHoldRefs = PonderHoldProgressRefs & {
    hoveredElementRef: RefObject<Element | null>;
};

// The upstream Ponder host is not mounted in R music.
export const usePonderHoldToEnter = (_refs: PonderHoldRefs): void => {};
export default usePonderHoldToEnter;
