export type DownloadableCacheCategory = 'playlist' | 'lyrics' | 'cover' | 'media' | 'analysis';
const categories: readonly DownloadableCacheCategory[] = ['playlist', 'lyrics', 'cover', 'media', 'analysis'];

// Only known, downloadable data belongs to cache cleanup. Unknown keys are user data by default.
export const isDownloadableCacheKey = (key: string, category?: DownloadableCacheCategory): boolean => {
  if (!category) return categories.some(value => isDownloadableCacheKey(key, value));
  switch (category) {
    case 'playlist':
      return key.startsWith('playlist_tracks_') || key.startsWith('playlist_detail_')
        || (key.startsWith('online_provider_')
          && (key.includes('_playlist_tracks_') || key.includes('_playlist_detail_')));
    case 'lyrics':
      return key.startsWith('lyric_') && !key.endsWith('_state') && !key.endsWith('_meta')
        && !key.startsWith('lyric_local_') && !key.startsWith('lyric_local:');
    case 'cover':
      return key.startsWith('cover_') && !key.startsWith('cover_local_') && !key.startsWith('cover_local:');
    case 'media':
      return key.startsWith('audio_') || key.startsWith('replayGain_');
    case 'analysis':
      return key.startsWith('automix_profile_');
  }
};

/** Count the same records that cleanup can remove, including external remote-cover bytes. */
export const summarizeDownloadableCacheEntries = (entries: readonly { key: string; data: unknown }[]) => {
  const usage = { playlist: 0, lyrics: 0, cover: 0, media: 0, analysis: 0, mediaCount: 0 };
  for (const entry of entries) {
    const category = categories.find(value => isDownloadableCacheKey(entry.key, value));
    if (!category) continue;
    let size = 0;
    if (typeof Blob !== 'undefined' && entry.data instanceof Blob) size = entry.data.size;
    else if (category === 'cover' && entry.data && typeof entry.data === 'object'
      && 'backend' in entry.data && (entry.data.backend === 'opfs' || entry.data.backend === 'electron')
      && 'size' in entry.data && typeof entry.data.size === 'number' && Number.isFinite(entry.data.size)) {
      size = Math.max(0, entry.data.size);
    } else {
      try { size = new TextEncoder().encode(JSON.stringify(entry.data) ?? '').byteLength; } catch { /* Unserializable cache values have no useful estimate. */ }
    }
    usage[category] += size;
    if (category === 'media' && entry.key.startsWith('audio_') && typeof Blob !== 'undefined'
      && entry.data instanceof Blob) usage.mediaCount++;
  }
  return usage;
};
