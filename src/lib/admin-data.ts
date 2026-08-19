import { z } from "zod";
import type { AnimeInput } from "@/lib/validation";
import { requiredStr, str, num } from "@/lib/validation";
export const studioSchema = z.object({
  name: requiredStr(200),
  slug: str(80),
  japaneseName: str(200),
  foundedYear: num,
  headquarters: str(300),
  founders: str(300),
  history: str(20000),
  techniques: str(1000),
  significance: str(2000),
  status: str(100),
  website: str(300),
});

export const characterSchema = z.object({
  name: requiredStr(200),
  slug: str(80),
  japaneseName: str(200),
  role: str(200),
  biography: str(20000),
  voiceActorName: str(200),
  animeId: str(100),
});

export const personSchema = z.object({
  name: requiredStr(200),
  slug: str(80),
  japaneseName: str(200),
  role: str(100),
  bornYear: num,
  diedYear: num,
  birthplace: str(300),
  biography: str(20000),
  career: str(20000),
  majorWorks: str(5000),
  awards: str(5000),
  contribution: str(5000),
  website: str(300),
});

export function studioData(input: z.infer<typeof studioSchema>) {
  return {
    name: input.name,
    japaneseName: input.japaneseName ?? null,
    foundedYear: input.foundedYear ?? null,
    headquarters: input.headquarters ?? null,
    founders: input.founders ?? null,
    history: input.history ?? null,
    techniques: input.techniques ?? null,
    significance: input.significance ?? null,
    status: input.status ?? null,
    website: input.website ?? null,
  };
}

export function characterData(input: z.infer<typeof characterSchema>) {
  return {
    name: input.name,
    japaneseName: input.japaneseName ?? null,
    role: input.role ?? null,
    biography: input.biography ?? null,
    voiceActorName: input.voiceActorName ?? null,
    animeId: input.animeId ?? null,
  };
}

export function personData(input: z.infer<typeof personSchema>) {
  return {
    name: input.name,
    japaneseName: input.japaneseName ?? null,
    role: input.role ?? null,
    bornYear: input.bornYear ?? null,
    diedYear: input.diedYear ?? null,
    birthplace: input.birthplace ?? null,
    biography: input.biography ?? null,
    career: input.career ?? null,
    majorWorks: input.majorWorks ?? null,
    awards: input.awards ?? null,
    contribution: input.contribution ?? null,
    website: input.website ?? null,
  };
}

export function animeData(input: AnimeInput) {
  const year = input.year ?? null;
  return {
    title: input.title,
    japaneseTitle: input.japaneseTitle ?? null,
    alternativeTitles: input.altTitles ?? [],
    synopsis: input.synopsis ?? null,
    releaseDate: input.releaseDate ? new Date(input.releaseDate) : null,
    year,
    decade: year !== null ? Math.floor(year / 10) * 10 : null,
    format: input.format,
    episodeCount: input.episodeCount ?? null,
    duration: input.duration ?? null,
    status: input.status,
    sourceMaterial: input.sourceMaterial ?? null,
    officialWebsite: input.officialWebsite ?? null,
    studioId: input.studioId ?? null,
    directorId: input.directorId ?? null,
    creatorId: input.creatorId ?? null,
    eraId: input.eraId ?? null,
  };
}