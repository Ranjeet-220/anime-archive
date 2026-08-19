import type { NextRequest } from "next/server";

// In-memory sliding-window rate limiter, keyed by caller-supplied key
// (typically the client IP). Suitable for single-instance deployments;
// swap for a shared store (Redis/DB) when scaling to multiple instances.

interface Bucket {
  timestamps: number[];
}

const buckets = new Map<string, Bucket>();

const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;
const MAX_KEPT_MS = 60 * 60 * 1000;
let lastCleanup = 0;

function cleanup(now: number): void {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    bucket.timestamps = bucket.timestamps.filter((t) => now - t < MAX_KEPT_MS);
    if (bucket.timestamps.length === 0) buckets.delete(key);
  }
}

export interface RateLimitResult {
  limited: boolean;
  retryAfterSeconds: number;
}

/** Records an attempt and returns whether the caller is over `max` per `windowMs`. */
export function checkRateLimit(key: string, max: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  cleanup(now);

  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);

  if (bucket.timestamps.length >= max) {
    buckets.set(key, bucket);
    const oldest = bucket.timestamps[0];
    return {
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return { limited: false, retryAfterSeconds: 0 };
}

/** Best-effort client IP from common reverse-proxy headers. */
export function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export const RATE = {
  LOGIN: { max: 10, windowMs: 15 * 60 * 1000 },
  REGISTER: { max: 5, windowMs: 60 * 60 * 1000 },
  CONTACT: { max: 5, windowMs: 60 * 60 * 1000 },
  CONTRIBUTE: { max: 20, windowMs: 60 * 60 * 1000 },
} as const;
