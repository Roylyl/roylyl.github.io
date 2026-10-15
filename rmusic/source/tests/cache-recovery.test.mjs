import assert from 'node:assert/strict';
import test from 'node:test';
import { isDownloadableCacheKey, summarizeDownloadableCacheEntries } from '../src/services/cacheCleanupPolicy.ts';
import { isStorageQuotaError, writeWithQuotaRecovery } from '../src/services/cacheQuota.ts';
import {
  getAudioCacheStatus, getResourceCacheGeneration, invalidateResourceCacheWork,
  onResourceCacheInvalidated, pauseAudioCaching, resumeAudioCaching, subscribeAudioCacheStatus,
} from '../src/services/cacheRuntime.ts';
import { getPrefetchWindowIndices } from '../src/services/prefetchWindow.ts';

const quotaError = () => Object.assign(new Error('Storage is full'), { name: 'QuotaExceededError' });

test('cache cleanup preserves playback and user-created content', () => {
  const protectedKeys = [
    'last_song', 'last_queue', 'last_theme', 'local_playlists', 'local_dir_handles',
    'lyric_netease:123_state', 'lyric_netease:123_meta', 'lyricSeg_netease:123',
    'lyric_local_123', 'lyric_local:123', 'cover_local_123', 'cover_local:123',
    'dual_theme_netease:123', 'uploaded_lyrics_font', 'user_liked_songs', 'some_future_user_data',
  ];
  const disposableKeys = [
    'audio_rmusic:123', 'replayGain_rmusic:123', 'lyric_rmusic:123', 'cover_rmusic:123',
    'automix_profile_rmusic:123', 'playlist_tracks_123', 'playlist_detail_123',
    'online_provider_netease_playlist_tracks_123',
  ];
  assert.deepEqual(protectedKeys.filter(key => isDownloadableCacheKey(key)), []);
  assert.deepEqual(disposableKeys.filter(key => !isDownloadableCacheKey(key)), []);
  assert.equal(isDownloadableCacheKey('lyric_netease:123_state', 'lyrics'), false);
  assert.equal(isDownloadableCacheKey('audio_rmusic:123', 'lyrics'), false);
});

test('cache statistics exclude protected data and count remote-cover assets once', () => {
  const retained = [
    { key: 'last_queue', data: ['A', 'B'] },
    { key: 'lyric_rmusic:123_state', data: { importedLyrics: 'user lyrics' } },
    { key: 'lyricSeg_rmusic:123', data: { words: ['user', 'edits'] } },
    { key: 'cover_local_123', data: { backend: 'opfs', size: 9000 } },
  ];
  const usage = summarizeDownloadableCacheEntries([
    ...retained,
    { key: 'audio_rmusic:123', data: new Blob(['audio']) },
    { key: 'cover_rmusic:123', data: { backend: 'opfs', size: 250 } },
    { key: 'lyric_rmusic:123', data: 'lyrics' },
  ]);
  assert.deepEqual(usage, { playlist: 0, lyrics: 8, cover: 250, media: 5, analysis: 0, mediaCount: 1 });
  assert.deepEqual(summarizeDownloadableCacheEntries(retained), {
    playlist: 0, lyrics: 0, cover: 0, media: 0, analysis: 0, mediaCount: 0,
  });
});

test('quota recovery evicts once and retries the same bytes once', async () => {
  const events = [];
  let writes = 0;
  await writeWithQuotaRecovery(
    async () => { events.push('write'); if (++writes === 1) throw quotaError(); },
    async () => { events.push('evict'); },
    () => { events.push('pause'); },
  );
  assert.deepEqual(events, ['write', 'evict', 'write']);
});

test('persistent quota failure pauses caching without an unbounded retry', async () => {
  let writes = 0;
  let evictions = 0;
  const statuses = [];
  resumeAudioCaching();
  const unsubscribe = subscribeAudioCacheStatus(() => statuses.push(getAudioCacheStatus()));
  await assert.rejects(writeWithQuotaRecovery(
    async () => { writes++; throw quotaError(); },
    async () => { evictions++; },
    pauseAudioCaching,
  ), { name: 'QuotaExceededError' });
  assert.equal(writes, 2);
  assert.equal(evictions, 1);
  assert.equal(getAudioCacheStatus(), 'storage-full');
  pauseAudioCaching();
  resumeAudioCaching();
  assert.deepEqual(statuses, ['storage-full', 'ready']);
  unsubscribe();
});

test('non-quota errors do not delete cached audio', async () => {
  let reclaimed = false;
  let paused = false;
  await assert.rejects(writeWithQuotaRecovery(
    async () => { throw new Error('Database closed'); },
    async () => { reclaimed = true; },
    () => { paused = true; },
  ), /Database closed/);
  assert.equal(reclaimed, false);
  assert.equal(paused, false);
  assert.equal(isStorageQuotaError({ name: 'UnknownError', inner: quotaError() }), true);
});

test('cleanup invalidates work already downloading before entries are removed', () => {
  const generation = getResourceCacheGeneration();
  let aborts = 0;
  const unsubscribe = onResourceCacheInvalidated(() => { aborts++; });
  invalidateResourceCacheWork();
  assert.notEqual(getResourceCacheGeneration(), generation);
  assert.equal(aborts, 1);
  unsubscribe();
});

test('prefetch window includes wraparound and detects edits at the start of the queue', () => {
  const before = ['A', 'B', 'C', 'D', 'E'];
  const after = ['B', 'A', 'C', 'D', 'E'];
  const indices = getPrefetchWindowIndices(5, 4, true);
  assert.deepEqual(indices.map(index => before[index]), ['E', 'A', 'B', 'C', 'D']);
  assert.notDeepEqual(indices.map(index => before[index]), indices.map(index => after[index]));
  assert.deepEqual(getPrefetchWindowIndices(2, 1, true, 0), [1, 0]);
  assert.deepEqual(getPrefetchWindowIndices(1, 0, true), [0]);
  assert.deepEqual(getPrefetchWindowIndices(0, -1, true), []);
});
