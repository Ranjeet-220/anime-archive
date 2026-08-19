import { describe, expect, it } from "vitest";
import { animeSchema, isoDate, requiredStr, str } from "@/lib/validation";

describe("animeSchema", () => {
  it("accepts a minimal valid payload", () => {
    const result = animeSchema.safeParse({ title: "  Akira  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("Akira");
      expect(result.data.format).toBe("TV");
      expect(result.data.status).toBe("UNKNOWN");
    }
  });

  it("rejects a missing title", () => {
    const result = animeSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("rejects a title that is too long", () => {
    const result = animeSchema.safeParse({ title: "x".repeat(201) });
    expect(result.success).toBe(false);
  });

  it("rejects out-of-range years", () => {
    expect(animeSchema.safeParse({ title: "X", year: 1899 }).success).toBe(false);
    expect(animeSchema.safeParse({ title: "X", year: 2101 }).success).toBe(false);
    expect(animeSchema.safeParse({ title: "X", year: 1917 }).success).toBe(true);
  });

  it("rejects an unknown format", () => {
    const result = animeSchema.safeParse({ title: "X", format: "VHS" });
    expect(result.success).toBe(false);
  });

  it("accepts comma-separated alternative titles", () => {
    const result = animeSchema.safeParse({ title: "X", altTitles: "A, B ,C" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.altTitles).toEqual(["A", "B", "C"]);
  });

  it("trims and empties optional strings", () => {
    const result = animeSchema.safeParse({ title: "X", synopsis: "   " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.synopsis).toBe("");
  });

  it("accepts null numeric fields", () => {
    const result = animeSchema.safeParse({ title: "X", episodeCount: null });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.episodeCount).toBeNull();
  });
});

describe("isoDate", () => {
  it("accepts ISO dates and nulls", () => {
    expect(isoDate.safeParse("1988-07-16").success).toBe(true);
    expect(isoDate.safeParse(null).success).toBe(true);
    expect(isoDate.safeParse("").success).toBe(true);
  });
  it("rejects unparsable dates", () => {
    expect(isoDate.safeParse("not-a-date").success).toBe(false);
  });
});

describe("requiredStr", () => {
  it("trims and enforces min length", () => {
    expect(requiredStr(10).safeParse("   ").success).toBe(false);
    expect(requiredStr(10).safeParse("hi").success).toBe(true);
  });
});

describe("str", () => {
  it("allows null and empty values", () => {
    expect(str(5).safeParse(null).success).toBe(true);
    expect(str(5).safeParse("").success).toBe(true);
  });
  it("rejects non-string values", () => {
    expect(str(5).safeParse(123).success).toBe(false);
  });
});
