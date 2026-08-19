import "server-only";
import { prisma } from "@/lib/prisma";
import { cached, CACHE_TTL_MS } from "@/lib/cache";
import { decadeOf } from "@/lib/utils";
import type { Prisma } from "@/generated/prisma/client";
import type {
  ArchiveStatsDto,
  EraDto,
  GenreDto,
  MuseumAnimeDto,
  MuseumPersonDto,
  MuseumStudioDto,
  SearchResultDto,
} from "@/lib/types";

export type AnimeSort = "year" | "year_desc" | "title" | "rating" | "newest";

export interface AnimeListParams {
  q?: string;
  year?: number;
  decade?: number;
  genre?: string;
  studio?: string;
  director?: string;
  creator?: string;
  format?: string;
  status?: string;
  era?: string;
  minEpisodes?: number;
  maxEpisodes?: number;
  isMovie?: boolean;
  sort?: AnimeSort;
  page?: number;
  perPage?: number;
}

export interface AnimeListItem {
  id: string;
  slug: string;
  title: string;
  japaneseTitle: string | null;
  year: number | null;
  format: string;
  status: string;
  episodeCount: number | null;
  averageRating: number;
  coverUrl: string | null;
  studio: { slug: string; name: string } | null;
  genres: { slug: string; name: string }[];
}

// ---------------------------------------------------------------------------
// Anime list
// ---------------------------------------------------------------------------

export async function getAnimeList(params: AnimeListParams = {}) {
  const page = Math.max(1, params.page ?? 1);
  const perPage = Math.min(48, Math.max(1, params.perPage ?? 24));

  const where: Record<string, unknown> = {};
  if (params.q) {
    where.OR = [
      { title: { contains: params.q, mode: "insensitive" } },
      { japaneseTitle: { contains: params.q, mode: "insensitive" } },
      { alternativeTitles: { has: params.q } },
    ];
  }
  if (params.year) where.year = params.year;
  if (params.decade) {
    where.year = { gte: params.decade, lt: params.decade + 10 };
  }
  if (params.genre) where.genres = { some: { slug: params.genre } };
  if (params.studio) where.studio = { slug: params.studio };
  if (params.director) where.director = { slug: params.director };
  if (params.creator) where.creator = { slug: params.creator };
  if (params.format) where.format = params.format.toUpperCase();
  if (params.status) where.status = params.status.toUpperCase();
  if (params.era) where.era = { slug: params.era };
  if (params.isMovie !== undefined) where.isMovie = params.isMovie;
  if (params.minEpisodes !== undefined) where.episodeCount = { ...(where.episodeCount as object), gte: params.minEpisodes };
  if (params.maxEpisodes !== undefined) where.episodeCount = { ...(where.episodeCount as object), lte: params.maxEpisodes };

  const orderBy: Prisma.AnimeOrderByWithRelationInput[] = (() => {
    switch (params.sort) {
      case "year_desc":
        return [{ year: "desc" }];
      case "title":
        return [{ title: "asc" }];
      case "rating":
        return [{ averageRating: "desc" }, { ratingCount: "desc" }];
      case "newest":
        return [{ createdAt: "desc" }];
      default:
        return [{ year: "asc" }];
    }
  })();

  return cached(`anime:list:${JSON.stringify({ ...params, page, perPage })}`, CACHE_TTL_MS, async () => {
    const [total, items] = await Promise.all([
      prisma.anime.count({ where: where as never }),
      prisma.anime.findMany({
        where: where as never,
        orderBy,
        skip: (page - 1) * perPage,
        take: perPage,
        select: {
          id: true,
          slug: true,
          title: true,
          japaneseTitle: true,
          year: true,
          format: true,
          status: true,
          episodeCount: true,
          averageRating: true,
          coverUrl: true,
          studio: { select: { slug: true, name: true } },
          genres: { select: { slug: true, name: true } },
        },
      }),
    ]);

    return { items, total, page, perPage, pages: Math.max(1, Math.ceil(total / perPage)) };
  });
}

// ---------------------------------------------------------------------------
// Anime detail
// ---------------------------------------------------------------------------

export async function getAnimeBySlug(slug: string) {
  return cached(`anime:bySlug:${slug}`, CACHE_TTL_MS, () =>
    prisma.anime.findUnique({
      where: { slug },
      include: {
        era: true,
        studio: true,
        creator: true,
        director: true,
        genres: true,
        characters: { orderBy: { name: "asc" }, take: 8 },
        episodes: { orderBy: { number: "asc" } },
        staff: { include: { person: true }, orderBy: { role: "asc" } },
        relatedFrom: { include: { related: { select: { slug: true, title: true, year: true, coverUrl: true } } } },
        relatedTo: { include: { anime: { select: { slug: true, title: true, year: true, coverUrl: true } } } },
      },
    })
  );
}

export async function getAnimeSources(entityId: string) {
  return cached(`anime:sources:${entityId}`, CACHE_TTL_MS, () =>
    prisma.source.findMany({
      where: { entityType: "anime", entityId },
      orderBy: { verificationDate: "desc" },
    })
  );
}

// ---------------------------------------------------------------------------
// Eras
// ---------------------------------------------------------------------------

const eraSelect = {
  id: true,
  slug: true,
  name: true,
  period: true,
  startYear: true,
  endYear: true,
  order: true,
  description: true,
  imageUrl: true,
} as const;

export async function getEras(): Promise<EraDto[]> {
  return cached("era:list", CACHE_TTL_MS, async () => {
    const eras = await prisma.era.findMany({ orderBy: { order: "asc" }, select: eraSelect });
    const counts = await prisma.anime.groupBy({ by: ["eraId"], _count: { _all: true } });
    const countMap = new Map(counts.map((c) => [c.eraId, c._count._all]));
    return eras.map((e) => ({ ...e, animeCount: countMap.get(e.id) ?? 0 }));
  });
}

export async function getEraBySlug(slug: string) {
  return cached(`era:bySlug:${slug}`, CACHE_TTL_MS, async () => {
    const era = await prisma.era.findUnique({
      where: { slug },
      include: {
        anime: {
          orderBy: { year: "asc" },
          select: {
            id: true,
            slug: true,
            title: true,
            japaneseTitle: true,
            year: true,
            format: true,
            episodeCount: true,
            averageRating: true,
            coverUrl: true,
            studio: { select: { slug: true, name: true } },
            genres: { select: { slug: true, name: true } },
          },
        },
      },
    });
    if (!era) return null;
    const events = await prisma.historicalEvent.findMany({
      where: { eraId: era.id },
      orderBy: [{ year: "asc" }, { month: "asc" }, { day: "asc" }],
    });
    return { ...era, events };
  });
}

export async function getTimelineData(): Promise<EraDto[]> {
  return cached("era:timeline", CACHE_TTL_MS, async () => {
    const eras = await getEras();
    const anime = await prisma.anime.findMany({
      orderBy: { year: "asc" },
      select: {
        slug: true,
        title: true,
        japaneseTitle: true,
        year: true,
        format: true,
        eraId: true,
        studio: { select: { name: true } },
        director: { select: { name: true } },
        synopsis: true,
      },
    });
    const byEra = new Map<string, MuseumAnimeDto[]>();
    for (const a of anime) {
      if (!a.eraId) continue;
      const list = byEra.get(a.eraId) ?? [];
      list.push({
        slug: a.slug,
        title: a.title,
        japaneseTitle: a.japaneseTitle,
        year: a.year,
        format: a.format,
        studio: a.studio?.name ?? null,
        director: a.director?.name ?? null,
        synopsis: a.synopsis,
      });
      byEra.set(a.eraId, list);
    }
    return eras.map((e) => ({ ...e, anime: byEra.get(e.id) ?? [] }));
  });
}

export async function getMuseumData(): Promise<EraDto[]> {
  return getTimelineData();
}

// ---------------------------------------------------------------------------
// Studios
// ---------------------------------------------------------------------------

export async function getStudioArchive(): Promise<MuseumStudioDto[]> {
  return cached("studio:archive", CACHE_TTL_MS, async () => {
    const studios = await prisma.studio.findMany({
      orderBy: [{ foundedYear: "asc" }, { name: "asc" }],
      select: {
        id: true,
        slug: true,
        name: true,
        japaneseName: true,
        foundedYear: true,
        history: true,
        status: true,
        anime: {
          orderBy: { year: "asc" },
          take: 4,
          select: { slug: true, title: true, year: true },
        },
      },
    });
    return studios.map((s) => ({
      slug: s.slug,
      name: s.name,
      japaneseName: s.japaneseName,
      foundedYear: s.foundedYear,
      history: s.history,
      status: s.status,
      animeCount: s.anime.length,
      majorWorks: s.anime,
    }));
  });
}

export async function getStudios() {
  return cached("studio:list", CACHE_TTL_MS, () =>
    prisma.studio.findMany({
      orderBy: [{ foundedYear: "asc" }, { name: "asc" }],
      select: {
        id: true,
        slug: true,
        name: true,
        japaneseName: true,
        foundedYear: true,
        status: true,
        logoUrl: true,
        _count: { select: { anime: true } },
      },
    })
  );
}

export async function getStudioBySlug(slug: string) {
  return cached(`studio:bySlug:${slug}`, CACHE_TTL_MS, () =>
    prisma.studio.findUnique({
      where: { slug },
      include: {
        anime: {
          orderBy: { year: "asc" },
          select: {
            id: true,
            slug: true,
            title: true,
            japaneseTitle: true,
            year: true,
            format: true,
            averageRating: true,
            coverUrl: true,
          },
        },
        people: { include: { person: true } },
      },
    })
  );
}

// ---------------------------------------------------------------------------
// People / Creators
// ---------------------------------------------------------------------------

export async function getHallOfLegends(): Promise<MuseumPersonDto[]> {
  return cached("person:hall", CACHE_TTL_MS, async () => {
    const people = await prisma.person.findMany({
      where: { role: { contains: "Director", mode: "insensitive" } },
      orderBy: [{ bornYear: "asc" }, { name: "asc" }],
      select: {
        id: true,
        slug: true,
        name: true,
        japaneseName: true,
        role: true,
        bornYear: true,
        diedYear: true,
        biography: true,
        majorWorks: true,
      },
    });
    const anime = await prisma.anime.findMany({
      where: { directorId: { in: people.map((p) => p.id) } },
      orderBy: { year: "asc" },
      select: { slug: true, title: true, year: true, directorId: true },
    });
    const byPerson = new Map<string, { slug: string; title: string; year: number | null }[]>();
    for (const a of anime) {
      if (!a.directorId) continue;
      const list = byPerson.get(a.directorId) ?? [];
      list.push({ slug: a.slug, title: a.title, year: a.year });
      byPerson.set(a.directorId, list);
    }
    return people.map((p) => ({
      slug: p.slug,
      name: p.name,
      japaneseName: p.japaneseName,
      role: p.role,
      bornYear: p.bornYear,
      diedYear: p.diedYear,
      biography: p.biography,
      majorWorks: p.majorWorks,
      works: byPerson.get(p.id) ?? [],
    }));
  });
}

export async function getCreators() {
  return cached("person:list", CACHE_TTL_MS, () =>
    prisma.person.findMany({
      orderBy: [{ bornYear: "asc" }, { name: "asc" }],
      select: {
        id: true,
        slug: true,
        name: true,
        japaneseName: true,
        role: true,
        bornYear: true,
        diedYear: true,
        profileUrl: true,
        _count: { select: { directed: true, created: true } },
      },
    })
  );
}

export async function getPersonBySlug(slug: string) {
  return cached(`person:bySlug:${slug}`, CACHE_TTL_MS, () =>
    prisma.person.findUnique({
      where: { slug },
      include: {
        directed: {
          orderBy: { year: "asc" },
          select: {
            slug: true,
            title: true,
            japaneseTitle: true,
            year: true,
            format: true,
            averageRating: true,
            coverUrl: true,
          },
        },
        created: {
          orderBy: { year: "asc" },
          select: {
            slug: true,
            title: true,
            japaneseTitle: true,
            year: true,
            format: true,
            averageRating: true,
            coverUrl: true,
          },
        },
        credits: { include: { anime: true }, take: 12 },
        studios: { include: { studio: true } },
      },
    })
  );
}

// ---------------------------------------------------------------------------
// Characters
// ---------------------------------------------------------------------------

export async function getCharacters(q?: string) {
  return cached(`character:list:${q ?? ""}`, CACHE_TTL_MS, () =>
    prisma.character.findMany({
      where: q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { japaneseName: { contains: q, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: { name: "asc" },
      select: {
        id: true,
        slug: true,
        name: true,
        japaneseName: true,
        role: true,
        voiceActorName: true,
        imageUrl: true,
        anime: { select: { slug: true, title: true, year: true } },
      },
    })
  );
}

export async function getCharacterBySlug(slug: string) {
  return cached(`character:bySlug:${slug}`, CACHE_TTL_MS, () =>
    prisma.character.findUnique({
      where: { slug },
      include: {
        anime: { select: { slug: true, title: true, year: true, coverUrl: true } },
      },
    })
  );
}

// ---------------------------------------------------------------------------
// Genres
// ---------------------------------------------------------------------------

export async function getGenres(): Promise<GenreDto[]> {
  return cached("genre:list", CACHE_TTL_MS, async () => {
    const genres = await prisma.genre.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        slug: true,
        name: true,
        japaneseName: true,
        description: true,
        anime: { select: { id: true } },
      },
    });
    return genres.map((g) => ({ ...g, animeCount: g.anime.length }));
  });
}

export async function getGenreBySlug(slug: string) {
  return cached(`genre:bySlug:${slug}`, CACHE_TTL_MS, () =>
    prisma.genre.findUnique({
      where: { slug },
      include: {
        anime: {
          orderBy: { year: "asc" },
          select: {
            slug: true,
            title: true,
            japaneseTitle: true,
            year: true,
            format: true,
            averageRating: true,
            coverUrl: true,
            studio: { select: { slug: true, name: true } },
          },
        },
      },
    })
  );
}

// ---------------------------------------------------------------------------
// Movies
// ---------------------------------------------------------------------------

export async function getMovies() {
  return cached("anime:movies", CACHE_TTL_MS, () =>
    prisma.anime.findMany({
      where: { format: "MOVIE" },
      orderBy: { year: "asc" },
      select: {
        id: true,
        slug: true,
        title: true,
        japaneseTitle: true,
        year: true,
        averageRating: true,
        ratingCount: true,
        coverUrl: true,
        duration: true,
        studio: { select: { slug: true, name: true } },
        genres: { select: { slug: true, name: true } },
      },
    })
  );
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export async function getStats(): Promise<ArchiveStatsDto> {
  return cached("stats:all", CACHE_TTL_MS, async () => {
    const [anime, studios, creators, movies, events, genres, characters] = await Promise.all([
      prisma.anime.count(),
      prisma.studio.count(),
      prisma.person.count(),
      prisma.anime.count({ where: { format: "MOVIE" } }),
      prisma.historicalEvent.count(),
      prisma.genre.count(),
      prisma.character.count(),
    ]);
    return { anime, studios, creators, movies, events, genres, characters };
  });
}

// ---------------------------------------------------------------------------
// On this day
// ---------------------------------------------------------------------------

export async function getOnThisDay() {
  const now = new Date();
  const month = now.getUTCMonth() + 1;
  const day = now.getUTCDate();
  return cached(`event:onThisDay:${month}-${day}`, CACHE_TTL_MS, () =>
    prisma.historicalEvent.findMany({
      where: { month, day },
      orderBy: [{ year: "asc" }],
      take: 12,
    })
  );
}

export async function getRecentEvents(limit = 12) {
  return cached(`event:recent:${limit}`, CACHE_TTL_MS, () =>
    prisma.historicalEvent.findMany({
      orderBy: [{ year: "desc" }, { month: "desc" }, { day: "desc" }],
      take: limit,
    })
  );
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

export async function searchAll(q: string, limit = 8): Promise<SearchResultDto[]> {
  const term = q.trim();
  if (!term) return [];
  const results: SearchResultDto[] = [];

  const [anime, characters, studios, people, events] = await Promise.all([
    prisma.anime.findMany({
      where: {
        OR: [
          { title: { contains: term, mode: "insensitive" } },
          { japaneseTitle: { contains: term, mode: "insensitive" } },
          { alternativeTitles: { has: term } },
        ],
      },
      take: limit,
      select: { slug: true, title: true, japaneseTitle: true, year: true, format: true },
    }),
    prisma.character.findMany({
      where: {
        OR: [
          { name: { contains: term, mode: "insensitive" } },
          { japaneseName: { contains: term, mode: "insensitive" } },
        ],
      },
      take: 4,
      select: {
        slug: true,
        name: true,
        japaneseName: true,
        anime: { select: { title: true } },
      },
    }),
    prisma.studio.findMany({
      where: {
        OR: [
          { name: { contains: term, mode: "insensitive" } },
          { japaneseName: { contains: term, mode: "insensitive" } },
        ],
      },
      take: 4,
      select: { slug: true, name: true, foundedYear: true },
    }),
    prisma.person.findMany({
      where: {
        OR: [
          { name: { contains: term, mode: "insensitive" } },
          { japaneseName: { contains: term, mode: "insensitive" } },
        ],
      },
      take: 4,
      select: { slug: true, name: true, role: true, bornYear: true },
    }),
    prisma.historicalEvent.findMany({
      where: { title: { contains: term, mode: "insensitive" } },
      take: 4,
      select: { slug: true, title: true, year: true },
    }),
  ]);

  results.push(
    ...anime.map((a) => ({
      type: "anime" as const,
      slug: a.slug,
      title: a.title,
      subtitle: [a.japaneseTitle, a.year ? String(a.year) : null].filter(Boolean).join(" · ") || null,
      year: a.year,
    }))
  );
  results.push(
    ...characters.map((c) => ({
      type: "character" as const,
      slug: c.slug,
      title: c.name,
      subtitle: c.anime?.title ?? null,
    }))
  );
  results.push(
    ...studios.map((s) => ({
      type: "studio" as const,
      slug: s.slug,
      title: s.name,
      subtitle: s.foundedYear ? `Founded ${s.foundedYear}` : null,
    }))
  );
  results.push(
    ...people.map((p) => ({
      type: "creator" as const,
      slug: p.slug,
      title: p.name,
      subtitle: [p.role, p.bornYear ? String(p.bornYear) : null].filter(Boolean).join(" · ") || null,
    }))
  );
  results.push(
    ...events.map((e) => ({
      type: "event" as const,
      slug: e.slug,
      title: e.title,
      subtitle: e.year ? String(e.year) : null,
    }))
  );

  return results.slice(0, limit * 2);
}

// ---------------------------------------------------------------------------
// Homepage
// ---------------------------------------------------------------------------

export async function getHomepageData() {
  return cached("home:data", CACHE_TTL_MS, async () => {
    const [stats, onThisDay, latest, landmark] = await Promise.all([
      getStats(),
      getOnThisDay(),
      prisma.anime.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        select: {
          slug: true,
          title: true,
          japaneseTitle: true,
          year: true,
          format: true,
          averageRating: true,
          coverUrl: true,
          studio: { select: { slug: true, name: true } },
          genres: { select: { slug: true, name: true } },
        },
      }),
      prisma.anime.findMany({
        where: { era: { order: 3 } },
        orderBy: { year: "asc" },
        take: 6,
        select: {
          slug: true,
          title: true,
          japaneseTitle: true,
          year: true,
          format: true,
          averageRating: true,
          coverUrl: true,
          studio: { select: { slug: true, name: true } },
          genres: { select: { slug: true, name: true } },
        },
      }),
    ]);
    return { stats, onThisDay, latest, landmark };
  });
}

export { decadeOf };