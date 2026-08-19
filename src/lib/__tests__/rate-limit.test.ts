import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows requests under the limit", () => {
    expect(checkRateLimit("a", 2, 1000).limited).toBe(false);
    expect(checkRateLimit("a", 2, 1000).limited).toBe(false);
  });

  it("limits requests over the threshold", () => {
    checkRateLimit("b", 2, 1000);
    checkRateLimit("b", 2, 1000);
    const result = checkRateLimit("b", 2, 1000);
    expect(result.limited).toBe(true);
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("keeps buckets independent per key", () => {
    checkRateLimit("c1", 1, 1000);
    expect(checkRateLimit("c1", 1, 1000).limited).toBe(true);
    expect(checkRateLimit("c2", 1, 1000).limited).toBe(false);
  });

  it("resets after the window elapses", () => {
    checkRateLimit("d", 1, 1000);
    expect(checkRateLimit("d", 1, 1000).limited).toBe(true);
    vi.advanceTimersByTime(1001);
    expect(checkRateLimit("d", 1, 1000).limited).toBe(false);
  });
});
