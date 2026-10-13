import { create } from 'zustand';

export type MotionSurfaceId =
    | 'lattice'
    | 'transitionOverlay'
    | 'collectionMorph'
    | 'monetBackground'
    | 'uiMicroMotion'
    | 'settingsScroll';

export const MOTION_SURFACE_IDS = [
    'lattice',
    'transitionOverlay',
    'collectionMorph',
    'monetBackground',
    'uiMicroMotion',
    'settingsScroll',
] as const satisfies readonly MotionSurfaceId[];

// R music always uses full motion, independent of saved or system preferences.
export const SYSTEM_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const fullMotion = (): Record<MotionSurfaceId, boolean> => Object.fromEntries(
    MOTION_SURFACE_IDS.map(surface => [surface, false]),
) as Record<MotionSurfaceId, boolean>;

export type MotionSettingsState = {
    reducedMotionSurfaces: Record<MotionSurfaceId, boolean>;
    followSystemReducedMotion: boolean;
    systemPrefersReducedMotion: boolean;
    handleToggleReducedMotionSurface: (surface: MotionSurfaceId, enabled: boolean) => void;
    handleToggleFollowSystemReducedMotion: (enabled: boolean) => void;
    setSystemPrefersReducedMotion: (matches: boolean) => void;
};

export const useMotionSettingsStore = create<MotionSettingsState>(() => ({
    reducedMotionSurfaces: fullMotion(),
    followSystemReducedMotion: false,
    systemPrefersReducedMotion: false,
    handleToggleReducedMotionSurface: () => {},
    handleToggleFollowSystemReducedMotion: () => {},
    setSystemPrefersReducedMotion: () => {},
}));

export const resolveReducedMotion = (_state: Pick<MotionSettingsState, 'reducedMotionSurfaces' | 'followSystemReducedMotion' | 'systemPrefersReducedMotion'>, _surface: MotionSurfaceId): boolean => false;
export const selectReducedSurfaceList = (_state: MotionSettingsState): string => '';
export const readReducedMotion = (_surface: MotionSurfaceId): boolean => false;

if (typeof document !== 'undefined') document.documentElement.removeAttribute('data-reduce-motion');
