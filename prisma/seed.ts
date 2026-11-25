import { prisma } from "../src/lib/prisma";
import reviewedFilmSources from "./seed-data/reviewed-film-sources.json";
import { addNovemberReleases } from "./seed-data/november-2026";
import bcrypt from "bcryptjs";
import { eras, genres } from "./seed-data/eras-genres";
import { studios } from "./seed-data/studios";
import { people } from "./seed-data/people";
import { animeEarly } from "./seed-data/anime-early";
import { animeModern } from "./seed-data/anime-modern";
import { animeCuratedTierS } from "./seed-data/anime-curated-tier-s";
import { animeCuratedPopular } from "./seed-data/anime-curated-popular";
import { animeCuratedCinema } from "./seed-data/anime-curated-cinema";
import { animeCuratedModern } from "./seed-data/anime-curated-modern";
import { anime60Cards } from "./seed-data/anime-60-cards";
import { animeUserList } from "./seed-data/anime-user-list";
import { events } from "./seed-data/events";
import { quizzes, badges, tours } from "./seed-data/quiz-tours";
import { rankings } from "./seed-data/rankings";
import {
  CURATED_OVERRIDES,
  ADDITIONAL_CHARACTERS,
  ADDITIONAL_EPISODES,
  ADDITIONAL_RELATIONS,
} from "./seed-data/anime-enrichments";
import {
  isekaiAnime,
  isekaiStudios,
  isekaiPeople,
} from "./seed-data/anime-isekai-consolidated";

async function main() {
  console.log("Seeding Anime Archive database…");

  await prisma.$transaction([
    prisma.animeRelation.deleteMany(),
    prisma.collectionItem.deleteMany(),
    prisma.collection.deleteMany(),
    prisma.note.deleteMany(),
    prisma.rating.deleteMany(),
    prisma.watchlistItem.deleteMany(),
    prisma.favorite.deleteMany(),
    prisma.report.deleteMany(),
    prisma.contribution.deleteMany(),
    prisma.source.deleteMany(),
    prisma.historicalEvent.deleteMany(),
    prisma.episode.deleteMany(),
    prisma.character.deleteMany(),
    prisma.personCredit.deleteMany(),
    prisma.studioPerson.deleteMany(),
    prisma.rankingItem.deleteMany(),
    prisma.ranking.deleteMany(),
    prisma.person.deleteMany(),
    prisma.studio.deleteMany(),
    prisma.genre.deleteMany(),
    prisma.anime.deleteMany(),

    prisma.era.deleteMany(),
    prisma.quizAttempt.deleteMany(),
    prisma.userBadge.deleteMany(),
    prisma.tourStep.deleteMany(),
    prisma.tour.deleteMany(),
    prisma.badge.deleteMany(),
    prisma.quiz.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Eras
  const eraById: Record<string, string> = {};
  for (const era of eras) {
    const created = await prisma.era.create({
      data: {
        slug: era.slug,
        name: era.name,
        period: era.period,
        startYear: era.startYear,
        endYear: era.endYear,
        order: era.order,
        description: era.description,
      },
    });
    eraById[era.slug] = created.id;
  }

  // Genres
  const genreById: Record<string, string> = {};
  for (const genre of genres) {
    const created = await prisma.genre.create({ data: genre });
    genreById[genre.slug] = created.id;
  }

  // Studios
  const studioById: Record<string, string> = {};
  const allStudios = [...studios, ...isekaiStudios];
  for (const studio of allStudios) {
    const created = await prisma.studio.create({ data: studio });
    studioById[studio.slug] = created.id;
  }

  // People
  const personById: Record<string, string> = {};
  const allPeople = [...people, ...isekaiPeople];
  for (const person of allPeople) {
    const created = await prisma.person.create({ data: person });
    personById[person.slug] = created.id;
  }

  // Anime — curated entries carry full data; anime60Cards only provides
  // cover art (its own placeholder entries are never created).
  const animeIdBySlug: Record<string, string> = {};
  const coverBySlug = new Map(anime60Cards.map((a) => [a.slug, a.coverUrl]));
  const rawAnimeList = [
    ...animeEarly,
    ...animeModern,
    ...animeCuratedTierS,
    ...animeCuratedPopular,
    ...animeCuratedCinema,
    ...animeCuratedModern,
    ...animeUserList,
    ...isekaiAnime,
  ];
  const seenSlugs = new Set<string>();
  const seenCharacterSlugs = new Set<string>();
  const allAnime = rawAnimeList.filter((a) => {
    if (seenSlugs.has(a.slug)) return false;
    seenSlugs.add(a.slug);
    return true;
  });
  for (const a of allAnime) {
    const override = CURATED_OVERRIDES[a.slug];
    const directorSlug = a.director ?? override?.director ?? null;
    const creatorSlug = a.creator ?? override?.creator ?? null;
    const rawStudio = a.studio === "olim" ? "olm" : a.studio;
    const studioSlug = rawStudio ?? override?.studio ?? null;

    const created = await prisma.anime.create({
      data: {
        slug: a.slug,
        title: a.title,
        japaneseTitle: a.japaneseTitle,
        alternativeTitles: a.altTitles,
        synopsis: a.synopsis,
        releaseDate: a.releaseDate ? new Date(a.releaseDate) : null,
        endDate: a.endDate ? new Date(a.endDate) : null,
        coverUrl: a.coverUrl ?? coverBySlug.get(a.slug) ?? null,
        year: a.year,
        decade: Math.floor(a.year / 10) * 10,
        format: a.format,
        episodeCount: a.episodeCount ?? null,
        duration: a.duration ?? null,
        status: a.status,
        sourceMaterial: a.sourceMaterial,
        officialWebsite: a.officialWebsite ?? null,
        studioId: studioSlug ? (studioById[studioSlug] ?? studioById["olim"] ?? null) : null,
        creatorId: creatorSlug ? (personById[creatorSlug] ?? null) : null,
        directorId: directorSlug ? (personById[directorSlug] ?? null) : null,
        eraId: a.eraSlug ? (eraById[a.eraSlug] ?? null) : null,
        historicalSignificance: a.historicalSignificance,
        productionHistory: a.productionHistory,
        reception: a.reception,
        awards: a.awards,
        culturalImpact: a.culturalImpact,
        legacy: a.legacy,
        historyTimeline: a.historyTimeline,
        genres: {
          connect: a.genreSlugs
            .filter((slug) => Boolean(genreById[slug]))
            .map((slug) => ({ id: genreById[slug] })),
        },
        isDemoData: true,
      },
    });
    animeIdBySlug[a.slug] = created.id;

    // Characters (including extra characters for core classics)
    const extraChars = ADDITIONAL_CHARACTERS[a.slug] ?? [];
    for (const c of [...a.characters, ...extraChars]) {
      let charSlug = c.slug;
      if (seenCharacterSlugs.has(charSlug)) {
        charSlug = `${charSlug}-${a.slug}`;
      }
      seenCharacterSlugs.add(charSlug);
      await prisma.character.create({
        data: {
          slug: charSlug,
          name: c.name,
          japaneseName: c.japaneseName,
          role: c.role,
          biography: c.biography,
          voiceActorName: c.voiceActor,
          animeId: created.id,
        },
      });
    }

    // Episodes (including landmark episodes for television series)
    const extraEps = ADDITIONAL_EPISODES[a.slug] ?? [];
    const episodeList = (a.episodes.length <= 1 && extraEps.length > 0) ? extraEps : a.episodes;
    for (const e of episodeList) {
      let validAirDate: Date | null = null;
      if (e.airDate) {
        const parsed = new Date(e.airDate);
        if (!Number.isNaN(parsed.getTime())) {
          validAirDate = parsed;
        }
      }
      await prisma.episode.create({
        data: {
          animeId: created.id,
          number: e.number,
          title: e.title,
          airDate: validAirDate,
          synopsis: e.synopsis ?? null,
        },
      });
    }

    // Director credits
    if (directorSlug) {
      const directorId = personById[directorSlug];
      if (directorId) {
        try {
          await prisma.personCredit.create({
            data: { animeId: created.id, personId: directorId, role: "Director" },
          });
        } catch {}
      }
    }
    if (creatorSlug) {
      const creatorId = personById[creatorSlug];
      if (creatorId) {
        try {
          await prisma.personCredit.create({
            data: { animeId: created.id, personId: creatorId, role: "Creator" },
          });
        } catch {}
      }
    }
  }

  // Studio–person affiliations
  const affiliations: [string, string, string?][] = [
    ["mushi-production", "osamu-tezuka", "Founder"],
    ["studio-ghibli", "hayao-miyazaki", "Co-founder"],
    ["studio-ghibli", "isao-takahata", "Co-founder"],
    ["gainax", "hideaki-anno", "Co-founder"],
    ["trigger", "hiroyuki-imaishi", "Founder"],
    ["madhouse", "masao-maruyama", "Co-founder"],
    ["production-ig", "mamoru-oshii", "Director"],
    ["toei-animation", "hayao-miyazaki", "Alumnus (1963–1971)"],
    ["sunrise", "yoshiyuki-tomino", "Director"],
    ["mushi-production", "yoshiyuki-tomino", "Alumnus"],
    ["sunrise", "shinichiro-watanabe", "Director"],
    ["wit-studio", "tetsuro-araki", "Director"],
    ["madhouse", "tetsuro-araki", "Director"],
    ["mappa", "sunghoo-park", "Director"],
  ];
  for (const [studioSlug, personSlug, role] of affiliations) {
    if (studioById[studioSlug] && personById[personSlug]) {
      await prisma.studioPerson.create({
        data: { studioId: studioById[studioSlug], personId: personById[personSlug], role },
      });
    }
  }

  // Related anime
  for (const a of allAnime) {
    for (const rel of a.related) {
      if (animeIdBySlug[rel.slug] && animeIdBySlug[a.slug]) {
        try {
          await prisma.animeRelation.create({
            data: {
              animeId: animeIdBySlug[a.slug],
              relatedId: animeIdBySlug[rel.slug],
              type: rel.type,
            },
          });
        } catch {}
      }
    }
  }

  for (const rel of ADDITIONAL_RELATIONS) {
    if (animeIdBySlug[rel.animeSlug] && animeIdBySlug[rel.relatedSlug]) {
      try {
        await prisma.animeRelation.create({
          data: {
            animeId: animeIdBySlug[rel.animeSlug],
            relatedId: animeIdBySlug[rel.relatedSlug],
            type: rel.type,
          },
        });
      } catch {}
    }
  }

  // Historical events
  for (const e of events) {
    await prisma.historicalEvent.create({
      data: {
        slug: e.slug,
        title: e.title,
        year: e.year ?? null,
        month: e.month ?? null,
        day: e.day ?? null,
        date: e.year ? new Date(Date.UTC(e.year, (e.month ?? 1) - 1, e.day ?? 1)) : null,
        description: e.description,
        kind: e.kind as never,
        eraId: e.eraSlug ? eraById[e.eraSlug] : null,
        animeId: e.animeSlug ? animeIdBySlug[e.animeSlug] : null,
        studioId: e.studioSlug ? studioById[e.studioSlug] : null,
        personId: e.personSlug ? personById[e.personSlug] : null,
      },
    });
  }

  // Sources for every anime, person, studio and event
  const sourceRows: {
    entityType: string;
    entityId: string;
    sourceUrl: string;
    sourceName: string;
    sourceTitle: string;
  }[] = [];
  for (const a of allAnime) {
    for (const s of a.sources) {
      sourceRows.push({
        entityType: "anime",
        entityId: animeIdBySlug[a.slug],
        sourceUrl: s.url,
        sourceName: s.name,
        sourceTitle: s.title,
      });
    }
  }
  for (const p of people) {
    sourceRows.push({
      entityType: "person",
      entityId: personById[p.slug],
      sourceUrl: `https://en.wikipedia.org/wiki/${p.name.replace(/ /g, "_")}`,
      sourceName: "Wikipedia",
      sourceTitle: `${p.name} — Wikipedia`,
    });
  }
  for (const s of studios) {
    sourceRows.push({
      entityType: "studio",
      entityId: studioById[s.slug],
      sourceUrl: s.website ?? `https://en.wikipedia.org/wiki/${s.name.replace(/ /g, "_")}`,
      sourceName: s.website ? "Official website" : "Wikipedia",
      sourceTitle: `${s.name} — ${s.website ? "official site" : "Wikipedia"}`,
    });
  }
  for (const e of events) {
    sourceRows.push({
      entityType: "event",
      entityId: e.slug,
      sourceUrl: `https://en.wikipedia.org/wiki/${e.title.replace(/ /g, "_")}`,
      sourceName: "Wikipedia",
      sourceTitle: `${e.title} — Wikipedia`,
    });
  }
  await prisma.source.createMany({ data: sourceRows });
  await prisma.source.createMany({
    data: reviewedFilmSources.map(({ slug, ...reference }) => ({
      ...reference,
      entityType: "anime",
      entityId: animeIdBySlug[slug],
      verificationStatus: "VERIFIED",
      verificationDate: new Date("2026-11-22"),
    })),
  });

  // Admin user
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@animearchive.local";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe-Admin-2026!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.create({
    data: {
      email: adminEmail,
      username: "admin",
      passwordHash,
      role: "ADMIN",
      name: "Archive Administrator",
    },
  });

  // A demo user
  const demoHash = await bcrypt.hash("DemoUser-2026!", 12);
  await prisma.user.create({
    data: {
      email: "demo@animearchive.local",
      username: "visitor",
      passwordHash: demoHash,
      role: "USER",
      name: "Demo Visitor",
    },
  });

  // Quizzes
  for (const quiz of quizzes) {
    await prisma.quiz.upsert({
      where: { slug: quiz.slug },
      update: {
        title: quiz.title,
        description: quiz.description,
        questions: quiz.questions as never,
        isPublished: true,
      },
      create: {
        slug: quiz.slug,
        title: quiz.title,
        description: quiz.description,
        questions: quiz.questions as never,
        isPublished: true,
      },
    });
  }

  // Badges (linked to their awarding quiz where applicable)
  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: {
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        quiz: badge.quizSlug ? { connect: { slug: badge.quizSlug } } : undefined,
      },
      create: {
        slug: badge.slug,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        quiz: badge.quizSlug ? { connect: { slug: badge.quizSlug } } : undefined,
      },
    });
  }

  // Guided tours
  for (const tour of tours) {
    const created = await prisma.tour.upsert({
      where: { slug: tour.slug },
      update: { title: tour.title, description: tour.description, published: true },
      create: {
        slug: tour.slug,
        title: tour.title,
        description: tour.description,
        published: true,
      },
    });
    await prisma.tourStep.deleteMany({ where: { tourId: created.id } });
    await prisma.tourStep.createMany({
      data: tour.steps.map((s) => ({
        tourId: created.id,
        order: s.order,
        title: s.title,
        description: s.description,
        year: s.year ?? null,
        eraSlug: s.eraSlug ?? null,
        animeSlug: s.animeSlug ?? null,
      })),
    });
  }

  // Curated rankings
  for (const ranking of rankings) {
    const created = await prisma.ranking.upsert({
      where: { slug: ranking.slug },
      update: {
        name: ranking.name,
        tagline: ranking.tagline,
        description: ranking.description,
        methodology: ranking.methodology,
      },
      create: {
        slug: ranking.slug,
        name: ranking.name,
        tagline: ranking.tagline,
        description: ranking.description,
        methodology: ranking.methodology,
      },
    });
    await prisma.rankingItem.deleteMany({ where: { rankingId: created.id } });
    await prisma.rankingItem.createMany({
      data: ranking.items
        .filter((item) => Boolean(animeIdBySlug[item.slug]))
        .map((item, index) => ({
          rankingId: created.id,
          animeId: animeIdBySlug[item.slug],
          rank: index + 1,
          note: item.note ?? null,
        })),
    });
  }

  const newReleases = await addNovemberReleases();
  const stats = {
    anime: allAnime.length + newReleases,
    studios: allStudios.length,
    people: allPeople.length,
    characters: allAnime.reduce((n, a) => n + a.characters.length, 0),
    events: events.length,
  };
  console.log("Seed complete:", JSON.stringify(stats));
  console.log(
    `Admin account: ${adminEmail} (password from ADMIN_PASSWORD env or default) — CHANGE BEFORE PRODUCTION.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
