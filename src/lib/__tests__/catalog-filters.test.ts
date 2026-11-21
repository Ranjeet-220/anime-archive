import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { FilterBar } from "@/components/anime/filter-bar";
import { parseFilters } from "@/lib/catalog-filters";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

describe("catalog filters", () => {
  it("ignores invalid URL values while preserving valid filters", () => {
    expect(parseFilters({
      year: "2000.5", page: "1.5", maxEpisodes: "3000000000",
      format: "invalid", status: "invalid", genre: "adventure",
    })).toMatchObject({
      year: undefined, page: undefined, maxEpisodes: undefined,
      format: undefined, status: undefined, genre: "adventure",
    });
  });

  it("accepts lowercase enum values and a zero episode bound", () => {
    expect(parseFilters({ status: "airing", format: "tv", minEpisodes: "0", page: "2" }))
      .toMatchObject({ status: "AIRING", format: "TV", minEpisodes: 0, page: 2 });
  });

  it("shows the default rating sort and looks up chip labels within their own field", () => {
    const html = renderToStaticMarkup(createElement(FilterBar, {
      initial: { genre: "shared", studio: "shared", q: "shared" },
      genres: [{ value: "shared", label: "Genre name" }],
      studios: [{ value: "shared", label: "Studio name" }],
      eras: [],
    }));
    expect(html).toMatch(/<option[^>]*value="rating"[^>]*selected/);
    expect(html).toContain("Remove Search · shared");
    expect(html).toContain("Remove Genre · Genre name");
    expect(html).toContain("Remove Studio · Studio name");
  });
});
