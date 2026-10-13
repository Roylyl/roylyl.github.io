import { appDatabase } from './appDatabase';
import { getFromCache, removeFromCache } from './db';
import { isBlob } from '../utils/blobGuards';
import { useAudioSettingsStore } from '../stores/useAudioSettingsStore';

/**
 * The ceiling the desktop cache is pruned back to after each write, in bytes.
 *
 * Read here rather than passed in, because every caller would otherwise have to know about a
 * setting that has nothing to do with the song it is saving. Zero means the listener asked for
 * no ceiling and reaches the main process unchanged.
 */
const cacheLimitBytes = () =>
  useAudioSettingsStore.getState().mediaCacheLimitGb * 1024 * 1024 * 1024;

const trimBrowserAudioCache = async () => {
  const limit = cacheLimitBytes();
  if (!limit) return;
  const table = appDatabase.media_cache;
  await appDatabase.transaction('rw', table, async () => {
    const entries = (await table.toArray()).filter(entry => entry.key.startsWith('audio_') && isBlob(entry.data));
    let total = entries.reduce((sum, entry) => sum + (entry.data as Blob).size, 0);
    entries.sort((a, b) => a.timestamp - b.timestamp);
    for (const entry of entries) {
      if (total <= limit) break;
      await table.delete(entry.key);
      total -= (entry.data as Blob).size;
    }
  });
};
useAudioSettingsStore.subscribe((state, previous) => {
  if (state.mediaCacheLimitGb !== previous.mediaCacheLimitGb) {
    void trimBrowserAudioCache().catch(error => console.warn('[Cache] Could not enforce cache limit', error));
  }
});

interface ElectronAudioCacheEntry {
  found: boolean;
  data?: Uint8Array | ArrayBuffer | null;
  mimeType?: string | null;
}

const isElectronAudioCacheAvailable = () =>
  Boolean(
    window.electron &&
    typeof window.electron.getAudioCache === 'function' &&
    typeof window.electron.hasAudioCache === 'function' &&
    typeof window.electron.saveAudioCache === 'function'
  );

const toBlob = (entry: ElectronAudioCacheEntry): Blob | null => {
  if (!entry.found || !entry.data) {
    return null;
  }

  const mimeType = entry.mimeType || 'audio/mpeg';
  const blobData = entry.data instanceof ArrayBuffer ? entry.data : new Uint8Array(entry.data);
  return new Blob([blobData], { type: mimeType });
};

export async function getCachedAudioBlob(cacheKey: string): Promise<Blob | null> {
  if (isElectronAudioCacheAvailable()) {
    const electronEntry = await window.electron!.getAudioCache(cacheKey);
    const electronBlob = toBlob(electronEntry);
    if (electronBlob) {
      return electronBlob;
    }
  }

  const indexedDbValue = await getFromCache<unknown>(cacheKey);
  if (!isBlob(indexedDbValue)) {
    if (indexedDbValue != null) {
      await removeFromCache(cacheKey);
    }
    return null;
  }
  const indexedDbBlob = indexedDbValue;
  await appDatabase.media_cache.update(cacheKey, { timestamp: Date.now() });

  if (isElectronAudioCacheAvailable()) {
    try {
      await saveAudioBlob(cacheKey, indexedDbBlob);
      await removeFromCache(cacheKey);
    } catch (error) {
      console.warn('[AudioCache] Failed to migrate IndexedDB audio cache to Electron file cache', error);
    }
  }

  return indexedDbBlob;
}

export async function hasCachedAudio(cacheKey: string): Promise<boolean> {
  if (isElectronAudioCacheAvailable()) {
    const existsInElectronCache = await window.electron!.hasAudioCache(cacheKey);
    if (existsInElectronCache) {
      return true;
    }
  }

  const indexedDbValue = await getFromCache<unknown>(cacheKey);
  if (isBlob(indexedDbValue)) return true;
  if (indexedDbValue != null) await removeFromCache(cacheKey);
  return false;
}

/**
 * Notified after bytes land in the media cache, with the key they landed under.
 *
 * Separation is what this exists for. It is allowed to read cached bytes and never to download any,
 * and for an online track the cache is EMPTY at the moment it is asked: separation is requested when
 * a track starts, and the file only arrives when analysis downloads it seconds later. Left to guess,
 * it read the empty cache, gave up for good, and the blend fell back to the master crossfade while
 * the bytes sat on disk from four seconds later onwards. See `parked` in stems.ts.
 */
const cacheWriteListeners = new Set<(cacheKey: string) => void>();

/** Subscribe to media-cache writes. Returns the unsubscribe. */
export function onAudioCached(listener: (cacheKey: string) => void): () => void {
  cacheWriteListeners.add(listener);
  return () => { cacheWriteListeners.delete(listener); };
}

export async function saveAudioBlob(cacheKey: string, blob: Blob): Promise<void> {
  if (!isBlob(blob)) {
    throw new TypeError('Audio cache only accepts Blob values');
  }
  if (isElectronAudioCacheAvailable()) {
    const buffer = await blob.arrayBuffer();
    await window.electron!.saveAudioCache(cacheKey, buffer, blob.type || 'audio/mpeg', cacheLimitBytes());
  } else {
    const limit = cacheLimitBytes();
    if (limit && blob.size > limit) return;
    await appDatabase.media_cache.put({ key: cacheKey, data: blob, timestamp: Date.now() });
    await trimBrowserAudioCache();
  }

  // After the write, and over a copy: a listener that throws must not fail a write that has already
  // happened, and one that unsubscribes itself must not disturb the iteration it is inside.
  for (const listener of [...cacheWriteListeners]) {
    try {
      listener(cacheKey);
    } catch (error) {
      console.warn('[AudioCache] a cache-write listener threw', error);
    }
  }
}
