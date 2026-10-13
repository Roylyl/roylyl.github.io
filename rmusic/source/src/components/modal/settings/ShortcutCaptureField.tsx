import type { Theme } from '../../../types';

type ShortcutCaptureFieldProps = {
    /** The letter currently bound, or null. */
    value: string | null;
    /** Called with the captured letter, or null when cleared. */
    onChange: (letter: string | null) => void;
    /** Refuses a key and says why; the reason is shown under the field. */
    validate: (letter: string) => string | null;
    label: string;
    isDaylight: boolean;
    theme?: Theme;
};


// Kept as an inert upstream import contract; custom combination bindings are removed.
export const ShortcutCaptureField = (_props: ShortcutCaptureFieldProps) => null;
export default ShortcutCaptureField;
