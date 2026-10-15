export type AudioCacheStatus = 'ready' | 'storage-full';

let audioCacheStatus: AudioCacheStatus = 'ready';
let resourceCacheGeneration = 0;
const statusListeners = new Set<() => void>();
const invalidationListeners = new Set<() => void>();

export const getAudioCacheStatus = (): AudioCacheStatus => audioCacheStatus;
export const getResourceCacheGeneration = (): number => resourceCacheGeneration;

export const subscribeAudioCacheStatus = (listener: () => void): (() => void) => {
  statusListeners.add(listener);
  return () => { statusListeners.delete(listener); };
};

const setAudioCacheStatus = (status: AudioCacheStatus, resumeRequested = false) => {
  if (audioCacheStatus === status && !resumeRequested) return;
  audioCacheStatus = status;
  for (const listener of [...statusListeners]) listener();
};

export const pauseAudioCaching = (): void => setAudioCacheStatus('storage-full');
// Re-enabling caching must restart an aborted window even when capacity was never exhausted.
export const resumeAudioCaching = (): void => setAudioCacheStatus('ready', true);

export const onResourceCacheInvalidated = (listener: () => void): (() => void) => {
  invalidationListeners.add(listener);
  return () => { invalidationListeners.delete(listener); };
};

// In-flight downloads must not restore entries after the user has cleared them.
export const invalidateResourceCacheWork = (): void => {
  resourceCacheGeneration += 1;
  for (const listener of [...invalidationListeners]) listener();
};
