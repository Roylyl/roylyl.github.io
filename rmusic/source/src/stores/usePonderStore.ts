import { create } from 'zustand';
import type { PonderHintVisibility, PonderTargetId } from '../types/ponder';

/** 正在进行的一次思索。null 表示没有教程在开。 */
type PonderSession = { targetId: PonderTargetId; sceneIndex: number };

type PonderState = {
    /** 悬停满 600ms 之后才会被置上，不是每次 pointermove 都写。 */
    hoveredTargetId: PonderTargetId | null;
    session: PonderSession | null;
    isPaused: boolean;
    seenTargetIds: ReadonlySet<string>;
    ponderHintVisibility: PonderHintVisibility;
    showPonderTouchButton: boolean;
    /** 思索导航页开着没有。帮助页那颗按钮开的就是它。 */
    isNavigationOpen: boolean;

    setHoveredTargetId: (targetId: PonderTargetId | null) => void;
    openPonder: (targetId: PonderTargetId, sceneIndex?: number) => void;
    closePonder: () => void;
    /** 在当前目标的场景之间循环切换；sceneCount 由调用方从注册表取。 */
    stepScene: (direction: -1 | 1, sceneCount: number) => void;
    setPaused: (paused: boolean) => void;
    markPonderSeen: (targetId: PonderTargetId) => void;
    setPonderHintVisibility: (visibility: PonderHintVisibility) => void;
    setShowPonderTouchButton: (show: boolean) => void;
    openNavigation: () => void;
    closeNavigation: () => void;
};

// Compatibility state for unmounted upstream modules. Saved Ponder settings
// cannot reopen a tutorial or enable a floating entry in R music.
export const usePonderStore = create<PonderState>(() => ({
    hoveredTargetId: null,
    session: null,
    isPaused: false,
    seenTargetIds: new Set<string>(),
    ponderHintVisibility: 'off',
    showPonderTouchButton: false,
    isNavigationOpen: false,
    setHoveredTargetId: () => {},
    openPonder: () => {},
    closePonder: () => {},
    stepScene: () => {},
    setPaused: () => {},
    markPonderSeen: () => {},
    setPonderHintVisibility: () => {},
    setShowPonderTouchButton: () => {},
    openNavigation: () => {},
    closeNavigation: () => {},
}));

export const selectPonderSettingsSnapshot = (state: PonderState) => ({
    ponderHintVisibility: state.ponderHintVisibility,
    setPonderHintVisibility: state.setPonderHintVisibility,
    showPonderTouchButton: state.showPonderTouchButton,
    setShowPonderTouchButton: state.setShowPonderTouchButton,
});
