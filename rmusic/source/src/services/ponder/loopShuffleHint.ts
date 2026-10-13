// Retained pure upstream utility; R music does not show tutorial prompts.
const PRESSES_TO_TRIGGER = 3;
const MAX_PRESS_GAP_MS = 1500;

export type LoopPressStreak = { count: number; lastAt: number };

/** 记一次按下，返回新的连点状态和这一下是否凑满了次数。凑满后从零重新数。 */
export const advanceLoopPressStreak = (
    streak: LoopPressStreak,
    now: number,
): { streak: LoopPressStreak; triggered: boolean } => {
    const count = now - streak.lastAt <= MAX_PRESS_GAP_MS ? streak.count + 1 : 1;
    return count >= PRESSES_TO_TRIGGER
        ? { streak: { count: 0, lastAt: now }, triggered: true }
        : { streak: { count, lastAt: now }, triggered: false };
};


export const noteLoopButtonPress = (_now = Date.now()): void => {};
