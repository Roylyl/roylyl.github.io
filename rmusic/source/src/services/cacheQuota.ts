export const isStorageQuotaError = (error: unknown): boolean => {
  let candidate = error;
  for (let depth = 0; candidate && typeof candidate === 'object' && depth < 4; depth++) {
    const value = candidate as { name?: string; code?: number; inner?: unknown; cause?: unknown };
    if (value.name === 'QuotaExceededError' || value.name === 'NS_ERROR_DOM_QUOTA_REACHED'
      || value.code === 22 || value.code === 1014) return true;
    candidate = value.inner ?? value.cause;
  }
  return false;
};

// Reuse the already-downloaded bytes. A full disk must never cause a download/retry loop.
export const writeWithQuotaRecovery = async (
  write: () => Promise<unknown>,
  reclaim: () => Promise<unknown>,
  onExhausted: () => void,
): Promise<void> => {
  try {
    await write();
  } catch (error) {
    if (!isStorageQuotaError(error)) throw error;
    try {
      await reclaim();
      await write();
    } catch (retryError) {
      onExhausted();
      throw retryError;
    }
  }
};
