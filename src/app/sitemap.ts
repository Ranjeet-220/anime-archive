import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

// DB-driven sitemap: rendered at request time, never statically prerendered.
export const dynamic = "force-dynamic";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

const WEEKLY = "weekly" as const;
const MONTHLY = "monthly" as const;

const STATIC_MAIN: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, changeFrequency: WEEKLY, priority: 1 },
  ...["/museum", "/timeline", "/anime", "/movies", "/studios", "/creators", "/characters", "/genres", "/collections", "/search"].map(
    (path): MetadataRoute.Sitemap[number] => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: WEEKLY,
      priority: 0.8,
    })
  ),
];

const STATIC_INSTITUTIONAL: MetadataRoute.Sitemap = [
  ...["/about", "/methodology", "/sources", "/copyright", "/privacy", "/terms", "/contact", "/content-removal", "/contribute"].map(
    (path): MetadataRoute.Sitemap[number] => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: MONTHLY,
      priority: 0.5,
    })
  ),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let anime: { slug: string; updatedAt: Date }[] = [];
  let studios: { slug: string; updatedAt: Date }[] = [];
  let people: { slug: string; updatedAt: Date }[] = [];
  let characters: { slug: string }[] = [];
  let eras: { slug: string }[] = [];

  try {
    [anime, studios, people, characters, eras] = await Promise.all([
      prisma.anime.findMany({
        select: { slug: true, updatedAt: true },
        orderBy: { slug: "asc" },
      }),
      prisma.studio.findMany({
        select: { slug: true, updatedAt: true },
        orderBy: { slug: "asc" },
      }),
      prisma.person.findMany({
        select: { slug: true, updatedAt: true },
        orderBy: { slug: "asc" },
      }),
      prisma.character.findMany({
        select: { slug: true },
        orderBy: { slug: "asc" },
      }),
      prisma.era.findMany({
        select: { slug: true },
        orderBy: { order: "asc" },
      }),
    ]);
  } catch (error) {
    console.error("[sitemap] Failed to load catalog for sitemap:", error);
  }

  return [
    ...STATIC_MAIN,
    ...STATIC_INSTITUTIONAL,
    ...anime.map((a): MetadataRoute.Sitemap[number] => ({
      url: `${SITE_URL}/anime/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: WEEKLY,
      priority: 0.7,
    })),
    ...studios.map((s): MetadataRoute.Sitemap[number] => ({
      url: `${SITE_URL}/studio/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: MONTHLY,
      priority: 0.6,
    })),
    ...people.map((p): MetadataRoute.Sitemap[number] => ({
      url: `${SITE_URL}/creator/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: MONTHLY,
      priority: 0.6,
    })),
    ...characters.map((c): MetadataRoute.Sitemap[number] => ({
      url: `${SITE_URL}/character/${c.slug}`,
      changeFrequency: MONTHLY,
      priority: 0.4,
    })),
    ...eras.map((e): MetadataRoute.Sitemap[number] => ({
      url: `${SITE_URL}/timeline/${e.slug}`,
      changeFrequency: MONTHLY,
      priority: 0.6,
    })),
  ];
}
