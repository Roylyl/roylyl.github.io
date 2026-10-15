import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { createContext, runInContext } from 'node:vm';
import test from 'node:test';
import * as runtime from '../src/services/cacheRuntime.ts';
import { isDownloadableCacheKey } from '../src/services/cacheCleanupPolicy.ts';
import { writeWithQuotaRecovery } from '../src/services/cacheQuota.ts';

// Run the production service against controlled storage/network dependencies.
const loadService = (name, dependencies, exports) => {
  const source = stripTypeScriptTypes(readFileSync(new URL(`../src/services/${name}.ts`, import.meta.url), 'utf8'))
    .replace(/^import\s[\s\S]*?;\n/gm, '')
    .replace(/^export\s*\{[^}]*\};?\s*$/gm, '')
    .replace(/^export\s+(?=(?:async\s+)?function|const|let|class)/gm, '');
  const context = createContext({ console, Blob, URL, window: {}, ...dependencies });
  runInContext(`${source}\nglobalThis.result = { ${exports.join(', ')} };`, context);
  return context.result;
};

const deferred = () => {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
};

const createCoverService = (overrides = {}) => {
  const writes = [];
  const metadata = [];
  const removed = [];
  const service = loadService('coverCache', {
    ...runtime,
    isDownloadableCacheKey,
    isBlob: value => value instanceof Blob,
    createSafeObjectUrl: () => 'blob:cover',
    getFromCache: async () => null,
    readCoverAsset: async () => null,
    saveToCache: async key => { metadata.push(key); },
    removeFromCache: async () => {},
    removeCoverAsset: async key => { removed.push(key); },
    writeCoverAsset: async (key, value) => {
      writes.push(key);
      return { backend: 'opfs', mimeType: value.type, size: value.size, updatedAt: 1 };
    },
    ...overrides,
  }, ['loadCachedOrFetchCover', 'saveCoverBlob']);
  return { ...service, writes, metadata, removed };
};

test('old cover download cannot repopulate the cache after cleanup', async () => {
  const download = deferred();
  const started = deferred();
  const service = createCoverService({ fetch: () => { started.resolve(); return download.promise; } });
  const pending = service.loadCachedOrFetchCover('cover_rmusic:123', 'https://example.test/cover.jpg');
  await started.promise;
  runtime.invalidateResourceCacheWork();
  download.resolve({ ok: true, blob: async () => new Blob(['image'], { type: 'image/jpeg' }) });
  assert.equal(await pending, 'blob:cover');
  assert.deepEqual(service.writes, []);
  assert.deepEqual(service.metadata, []);
});

test('cleanup during an OPFS write removes the obsolete asset before the next cover write', async () => {
  const writing = deferred();
  const started = deferred();
  const service = createCoverService({
    writeCoverAsset: () => { started.resolve(); return writing.promise; },
  });
  const pending = service.saveCoverBlob('cover_rmusic:123', new Blob(['image']));
  await started.promise;
  runtime.invalidateResourceCacheWork();
  writing.resolve({ backend: 'opfs', mimeType: 'image/jpeg', size: 5, updatedAt: 1 });
  await pending;
  assert.deepEqual(service.removed, ['cover_rmusic:123']);
  assert.deepEqual(service.metadata, []);
});

test('cache cleanup does not discard a protected local-cover edit', async () => {
  const generation = runtime.getResourceCacheGeneration();
  runtime.invalidateResourceCacheWork();
  const service = createCoverService();
  await service.saveCoverBlob('cover_local_123', new Blob(['image']), generation);
  assert.deepEqual(service.writes, ['cover_local_123']);
  assert.deepEqual(service.metadata, ['cover_local_123']);
});

test('an analysis download carrying its original generation cannot save audio after cleanup', async () => {
  let writes = 0;
  const settings = { mediaCacheLimitGb: 0, enableMediaCache: true };
  const service = loadService('audioCache', {
    ...runtime,
    writeWithQuotaRecovery,
    isBlob: value => value instanceof Blob,
    useAudioSettingsStore: { getState: () => settings, subscribe: () => {} },
    appDatabase: { media_cache: { put: async () => { writes++; } } },
  }, ['saveAudioBlob']);
  const generation = runtime.getResourceCacheGeneration();
  runtime.invalidateResourceCacheWork();
  assert.equal(await service.saveAudioBlob('audio_rmusic:123', new Blob(['audio']), generation), false);
  assert.equal(writes, 0);
  assert.equal(await service.saveAudioBlob('audio_rmusic:123', new Blob(['audio'])), true);
  assert.equal(writes, 1);
});

test('explicit resume notifies the prefetcher when cache status is already ready', () => {
  runtime.resumeAudioCaching();
  let resumes = 0;
  const unsubscribe = runtime.subscribeAudioCacheStatus(() => {
    if (runtime.getAudioCacheStatus() === 'ready') resumes++;
  });
  runtime.resumeAudioCaching();
  assert.equal(resumes, 1);
  unsubscribe();
});
