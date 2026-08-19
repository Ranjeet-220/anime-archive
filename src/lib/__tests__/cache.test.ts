import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cached, invalidateCacheTags } from "@/lib/cache";

describe("cached", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the same value within the TTL without calling the source again", async () => {
    let calls = 0;
    const fn = () => {
      calls += 1;
      return Promise.resolve(`v${calls}`);
    };
    expect(await cached("anime:test", 1000, fn)).toBe("v1");
    expect(await cached("anime:test", 1000, fn)).toBe("v1");
    expect(calls).toBe(1);
  });

  it("re-runs the source after the TTL expires", async () => {
    let calls = 0;
    const fn = () => {
      calls += 1;
      return Promise.resolve(calls);
    };
    await cached("anime:test2", 1000, fn);
    vi.advanceTimersByTime(1001);
    await cached("anime:test2", 1000, fn);
    expect(calls).toBe(2);
  });

  it("invalidates entries by tag prefix", async () => {
    let calls = 0;
    const fn = () => {
      calls += 1;
      return Promise.resolve(calls);
    };
    await cached("anime:list:a", 60000, fn);
    await cached("era:list", 60000, fn);
    invalidateCacheTags(["anime"]);
    await cached("anime:list:a", 60000, fn);
    expect(calls).toBe(3);
    await cached("era:list", 60000, fn);
    expect(calls).toBe(3);
  });

  it("does not cache rejected promises", async () => {
    let calls = 0;
    const fn = () => {
      calls += 1;
      return Promise.reject(new Error("boom"));
    };
    await expect(cached("anime:fail", 60000, fn)).rejects.toThrow("boom");
    await expect(cached("anime:fail", 60000, fn)).rejects.toThrow("boom");
    expect(calls).toBe(2);
  });
});
