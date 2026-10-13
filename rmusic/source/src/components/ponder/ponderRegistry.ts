import type { PonderTargetCategory, PonderTargetDefinition, PonderTargetId } from '../../types/ponder';

// R music does not expose Ponder. Keep the upstream extension contract inert;
// no tutorial targets or scene modules are imported into the application.
export const PONDER_TARGETS = {} as Record<PonderTargetId, PonderTargetDefinition>;
export const PONDER_TARGET_LIST: PonderTargetDefinition[] = [];
export const registerPonderTarget = (_definition: PonderTargetDefinition): boolean => false;
export const unregisterPonderTarget = (_id: PonderTargetId): boolean => false;
export const findPonderTarget = (_id: PonderTargetId): PonderTargetDefinition | null => null;
export const ponderTargetsByCategory = (): { category: PonderTargetCategory; targets: PonderTargetDefinition[] }[] => [];
export const resolveHoveredPonderTarget = (_element: Element | null): PonderTargetDefinition | null => null;
