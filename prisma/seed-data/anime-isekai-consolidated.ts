import type { AnimeSeed } from "./anime-early";
import { isekaiBatch1, batch1People, batch1Studios } from "./isekai-batch-1";
import { isekaiBatch2, batch2People, batch2Studios } from "./isekai-batch-2";
import { isekaiBatch3, batch3People, batch3Studios } from "./isekai-batch-3";
import { studios as baseStudios } from "./studios";
import { people as basePeople } from "./people";

function eraForYear(y: number): string {
  if (y < 1960) return "the-beginning";
  if (y < 1980) return "television-era";
  if (y < 1990) return "golden-age";
  if (y < 2000) return "global-expansion";
  if (y < 2010) return "digital-revolution";
  if (y < 2020) return "streaming-era";
  return "modern-anime";
}

// 50 New Isekai Anime conforming strictly to AnimeSeed
export const isekaiAnime: AnimeSeed[] = [
  ...isekaiBatch1,
  ...isekaiBatch2,
  ...isekaiBatch3,
].map((raw: any): AnimeSeed => ({
  slug: raw.slug,
  title: raw.title,
  japaneseTitle: raw.japaneseTitle ?? "",
  altTitles: raw.altTitles ?? [],
  synopsis: raw.synopsis ?? "",
  coverUrl: raw.coverUrl || `/anime-cards/${raw.slug}.webp`,
  releaseDate: raw.releaseDate ?? undefined,
  endDate: raw.endDate ?? undefined,
  year: raw.year,
  format: raw.format ?? "TV",
  episodeCount: raw.episodeCount ?? undefined,
  duration: raw.duration ?? 24,
  status: raw.status ?? "FINISHED",
  sourceMaterial: raw.sourceMaterial ?? "Original",
  officialWebsite: raw.officialWebsite ?? undefined,
  studio: raw.studio ?? null,
  creator: raw.creator ?? undefined,
  director: raw.director ?? undefined,
  genreSlugs: raw.genreSlugs ?? ["isekai", "fantasy"],
  eraSlug: raw.eraSlug ?? eraForYear(raw.year),
  characters: (raw.characters ?? []).map((c: any) => ({
    slug: c.slug,
    name: c.name,
    japaneseName: c.japaneseName ?? "",
    role: c.role ?? "Main",
    biography: c.biography ?? "",
    voiceActor: c.voiceActor ?? "",
  })),
  episodes: (raw.episodes ?? []).map((e: any) => ({
    number: e.number,
    title: e.title,
    airDate: e.airDate ?? undefined,
    synopsis: e.synopsis ?? undefined,
  })),
  historicalSignificance: raw.historicalSignificance ?? "",
  productionHistory: raw.productionHistory ?? "",
  reception: raw.reception ?? "",
  awards: raw.awards ?? "",
  culturalImpact: raw.culturalImpact ?? "",
  legacy: raw.legacy ?? "",
  historyTimeline: (raw.historyTimeline ?? []).map((h: any) => ({
    label: h.label,
    year: h.year ?? undefined,
    text: h.text,
  })),
  related: raw.related ?? [],
  sources: raw.sources ?? [],
}));

// Deduplicate and normalize new studios against base studios
const baseStudioSlugs = new Set(baseStudios.map((s) => s.slug));
const seenStudios = new Set<string>();
const allBatchStudios = [
  ...batch1Studios,
  ...batch2Studios,
  ...batch3Studios,
];

export const isekaiStudios = allBatchStudios
  .filter((s) => {
    if (baseStudioSlugs.has(s.slug) || seenStudios.has(s.slug)) {
      return false;
    }
    seenStudios.add(s.slug);
    return true;
  })
  .map((s: any) => ({
    slug: s.slug,
    name: s.name,
    japaneseName: s.japaneseName ?? null,
    foundedYear: s.foundedYear ?? s.establishedYear ?? null,
    headquarters: s.headquarters ?? s.location ?? null,
    founders: s.founders ?? null,
    history: s.history ?? s.about ?? null,
    techniques: s.techniques ?? null,
    significance: s.significance ?? s.about ?? null,
    status: s.status ?? "Active",
    website: s.website ?? null,
    logoUrl: s.logoUrl ?? null,
  }));

// Deduplicate and normalize new people against base people
const basePeopleSlugs = new Set(basePeople.map((p) => p.slug));
const seenPeople = new Set<string>();
const allBatchPeople = [
  ...batch1People,
  ...batch2People,
  ...batch3People,
];

export const isekaiPeople = allBatchPeople
  .filter((p) => {
    if (basePeopleSlugs.has(p.slug) || seenPeople.has(p.slug)) {
      return false;
    }
    seenPeople.add(p.slug);
    return true;
  })
  .map((p: any) => ({
    slug: p.slug,
    name: p.name,
    japaneseName: p.japaneseName ?? null,
    role: p.role ?? null,
    bornYear: p.bornYear ?? p.birthYear ?? null,
    diedYear: p.diedYear ?? null,
    birthplace: p.birthplace ?? null,
    biography: p.biography ?? null,
    career: p.career ?? null,
    majorWorks: Array.isArray(p.works) ? p.works.join(", ") : (p.majorWorks ?? null),
    awards: p.awards ?? null,
    contribution: p.contribution ?? null,
    website: p.website ?? null,
    profileUrl: p.profileUrl ?? null,
  }));
