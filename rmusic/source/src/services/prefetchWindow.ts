// Shared by the downloader and queue-change detection, including the wrap back to the first song.
export const getPrefetchWindowIndices = (
  length: number,
  currentIndex: number,
  includeCurrent: boolean,
  shuffleIndex?: number,
): number[] => {
  if (length <= 0 || currentIndex < 0 || currentIndex >= length) return [];
  const indices = new Set<number>();
  if (includeCurrent) indices.add(currentIndex);
  if (shuffleIndex !== undefined && shuffleIndex >= 0 && shuffleIndex < length) indices.add(shuffleIndex);
  for (let offset = 1; offset <= Math.min(3, length - 1); offset++) indices.add((currentIndex + offset) % length);
  if (length > 1) indices.add((currentIndex - 1 + length) % length);
  return [...indices];
};
