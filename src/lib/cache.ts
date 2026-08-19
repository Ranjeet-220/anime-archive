// In-process TTL cache for read-heavy data access.
// Values are stored as returned (Date objects intact — no serialization).
// Invalidate after mutations with invalidateCacheTags([...]).

interface Entry<T> {
  expires: number;
  value: T;
}

const store = new Map<string, Entry<unknown>>();

const MAX_ENTRIES = 1000;

export const CACHE_TTL_MS = 5 * 60 * 1000;

function evictIfFull(): void {
  if (store.size < MAX_ENTRIES) return;
  const oldest = store.keys().next().value;
  if (oldest !== undefined) store.delete(oldest);
}

/** Caches the result of `fn` for `ttlMs`, keyed by `key` (key prefix = tag). */
export function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = store.get(key);
  if (hit && hit.expires > now) return Promise.resolve(hit.value as T);
  return Promise.resolve()
    .then(fn)
    .then((value) => {
      evictIfFull();
      store.set(key, { expires: now + ttlMs, value });
      return value;
    });
}

/** Deletes every cache entry whose key tag (text before the first ":") matches. */
export function invalidateCacheTags(tags: string[]): void {
  if (tags.length === 0) return;
  const tagSet = new Set(tags);
  for (const key of [...store.keys()]) {
    const sep = key.indexOf(":");
    const tag = sep === -1 ? key : key.slice(0, sep);
    if (tagSet.has(tag)) store.delete(key);
  }
}
