import { AnimeFormat, AnimeStatus } from "@/generated/prisma/enums";
import type { AnimeSort } from "@/lib/data";

const SORTS: AnimeSort[] = ["year", "year_desc", "title", "rating", "newest"];

export function parseFilters(sp: Record<string, string | string[] | undefined>) {
  const get = (key: string) => {
    const v = sp[key];
    return typeof v === "string" ? v.trim() : undefined;
  };
  const num = (key: string, min: number, max = 2_147_483_647) => {
    const v = get(key);
    if (!v) return undefined;
    const n = Number(v);
    return Number.isInteger(n) && n >= min && n <= max ? n : undefined;
  };
  const format = get("format")?.toUpperCase();
  const status = get("status")?.toUpperCase();
  const sort = get("sort");
  return {
    q: get("q") || undefined,
    year: num("year", 1900, 2100),
    decade: num("decade", 1900, 2100),
    genre: get("genre") || undefined,
    studio: get("studio") || undefined,
    director: get("director") || undefined,
    creator: get("creator") || undefined,
    format: Object.values(AnimeFormat).find((value) => value === format),
    status: Object.values(AnimeStatus).find((value) => value === status),
    era: get("era") || undefined,
    minEpisodes: num("minEpisodes", 0),
    maxEpisodes: num("maxEpisodes", 0),
    sort: SORTS.includes(sort as AnimeSort) ? (sort as AnimeSort) : undefined,
    page: num("page", 1),
  };
}
