import { describe, expect, it } from "vitest";
import {
  cn,
  clamp,
  decadeOf,
  eraPeriod,
  formatDate,
  formatYear,
  initials,
  isValidUrl,
  maskEmail,
  pluralize,
  safeJsonParse,
  slugify,
  truncate,
} from "@/lib/utils";

describe("cn", () => {
  it("joins truthy values", () => {
    expect(cn("a", "b", false, null, undefined, "c")).toBe("a b c");
  });
});

describe("slugify", () => {
  it("lowercases and kebab-cases", () => {
    expect(slugify("Akira (1988)")).toBe("akira-1988");
  });
  it("strips leading/trailing separators", () => {
    expect(slugify("  --Ghost in the Shell--  ")).toBe("ghost-in-the-shell");
  });
  it("keeps Japanese characters", () => {
    expect(slugify("もののけ姫")).toBe("もののけ姫");
  });
  it("caps at 80 chars", () => {
    expect(slugify("a".repeat(200))).toHaveLength(80);
  });
});

describe("formatDate", () => {
  it("returns an em dash for empty input", () => {
    expect(formatDate(null)).toBe("—");
    expect(formatDate(undefined)).toBe("—");
    expect(formatDate("not-a-date")).toBe("—");
  });
  it("formats a Date", () => {
    expect(formatDate(new Date(1988, 6, 16))).toBe("July 16, 1988");
  });
  it("formats an ISO string", () => {
    expect(formatDate("1988-07-16")).toBe("July 16, 1988");
  });
});

describe("formatYear", () => {
  it("extracts the year", () => {
    expect(formatYear(new Date(1995, 0, 1))).toBe("1995");
  });
  it("handles invalid input", () => {
    expect(formatYear(null)).toBe("—");
  });
});

describe("decadeOf", () => {
  it("floors to the decade", () => {
    expect(decadeOf(1995)).toBe(1990);
    expect(decadeOf(1988)).toBe(1980);
  });
  it("returns null for empty input", () => {
    expect(decadeOf(null)).toBeNull();
  });
});

describe("eraPeriod", () => {
  it("renders a range", () => {
    expect(eraPeriod(1963, 1972)).toBe("1963–1972");
  });
  it("renders an open range", () => {
    expect(eraPeriod(2010, null)).toBe("2010–present");
  });
});

describe("pluralize", () => {
  it("handles singular and plural", () => {
    expect(pluralize(1, "episode")).toBe("episode");
    expect(pluralize(5, "episode")).toBe("episodes");
  });
  it("accepts a custom plural", () => {
    expect(pluralize(3, "series", "series")).toBe("series");
  });
});

describe("truncate", () => {
  it("leaves short text untouched", () => {
    expect(truncate("short", 10)).toBe("short");
  });
  it("truncates long text with an ellipsis", () => {
    expect(truncate("abcdefghijklm", 5)).toBe("abcde…");
  });
});

describe("initials", () => {
  it("takes the first letters of up to two words", () => {
    expect(initials("hayao miyazaki")).toBe("HM");
    expect(initials("akira")).toBe("A");
  });
});

describe("safeJsonParse", () => {
  it("parses valid JSON", () => {
    expect(safeJsonParse('{"a":1}', {})).toEqual({ a: 1 });
  });
  it("falls back on invalid input", () => {
    expect(safeJsonParse("not json", [])).toEqual([]);
    expect(safeJsonParse(null, "fb")).toBe("fb");
  });
});

describe("clamp", () => {
  it("clamps to the bounds", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(42, 0, 10)).toBe(10);
  });
});

describe("isValidUrl", () => {
  it("accepts http(s) URLs", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("http://localhost:3000")).toBe(true);
  });
  it("rejects other schemes and garbage", () => {
    expect(isValidUrl("javascript:alert(1)")).toBe(false);
    expect(isValidUrl("not a url")).toBe(false);
  });
});

describe("maskEmail", () => {
  it("masks the local part", () => {
    expect(maskEmail("john@example.com")).toBe("jo**@example.com");
  });
  it("returns the input when unparsable", () => {
    expect(maskEmail("nope")).toBe("nope");
  });
});
