import { z } from "zod";
import type { AnimeFormat, AnimeStatus } from "@/generated/prisma/client";

export const FORMATS: AnimeFormat[] = ["TV", "MOVIE", "OVA", "ONA", "SPECIAL", "WEB"];
export const STATUSES: AnimeStatus[] = ["FINISHED", "AIRING", "UPCOMING", "UNKNOWN"];

/** Trim strings and collapse empty strings to null. */
export const str = (max: number) =>
  z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : v),
    z.string().max(max).nullable().optional()
  );

export const requiredStr = (max: number) =>
  z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : v),
    z.string().min(1, "Required").max(max, `Max ${max} characters`)
  );

export const num = z.preprocess(
  (v) => (v === null || v === "" ? null : v),
  z.coerce.number().int().nullable().optional()
);

export const isoDate = z.preprocess(
  (v) => (typeof v === "string" && v.trim() ? v.trim() : null),
  z.string().refine((v) => v === null || !Number.isNaN(Date.parse(v)), { message: "Invalid date" }).nullable().optional()
);

export const id = str(100);

export const altTitles = z.preprocess(
  (v) => {
    if (Array.isArray(v)) return v.filter((x) => typeof x === "string" && x.trim());
    if (typeof v === "string" && v.trim()) {
      return v.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return null;
  },
  z.array(requiredStr(200)).max(20).nullable().optional()
);

export const genreIds = z.preprocess(
  (v) => (Array.isArray(v) ? v.filter((x) => typeof x === "string" && x) : null),
  z.array(z.string()).max(20).nullable().optional()
);

export const animeSchema = z.object({
  title: requiredStr(200),
  slug: str(80),
  japaneseTitle: str(200),
  altTitles,
  synopsis: str(20000),
  year: z.preprocess(
    (v) => (v === null || v === "" ? null : v),
    z.coerce.number().int().min(1900).max(2100).nullable().optional()
  ),
  format: z.enum(FORMATS as unknown as [AnimeFormat, ...AnimeFormat[]]).default("TV"),
  episodeCount: num,
  duration: num,
  status: z.enum(STATUSES as unknown as [AnimeStatus, ...AnimeStatus[]]).default("UNKNOWN"),
  sourceMaterial: str(100),
  officialWebsite: str(300),
  releaseDate: isoDate,
  studioId: id,
  directorId: id,
  creatorId: id,
  eraId: id,
  genreIds,
});

export type AnimeInput = z.infer<typeof animeSchema>;
