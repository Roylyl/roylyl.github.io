// Application shortcuts only use unmodified keys. Returning early leaves
// browser shortcuts, input editing and native Tab/ShiftTab focus untouched.
export type AppKeyboardInput = {
    key: string; ctrlKey?: boolean; metaKey?: boolean; altKey?: boolean;
    shiftKey?: boolean; isComposing?: boolean;
};
export const isAppCombinationShortcut = (event: AppKeyboardInput): boolean =>
    Boolean(event.ctrlKey || event.metaKey || event.altKey || event.shiftKey);
export const shouldIgnoreAppKeyboardShortcut = (event: AppKeyboardInput): boolean =>
    isAppCombinationShortcut(event) || event.key === 'Tab' || Boolean(event.isComposing);
