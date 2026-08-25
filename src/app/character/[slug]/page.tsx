import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mic, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge, BadgeLink } from "@/components/ui/badge";
import { AnimeCard } from "@/components/ui/anime-card";
import { getCharacterBySlug } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const character = await getCharacterBySlug(slug);
  if (!character) return { title: "Character not found" };
  return {
    title: character.name,
    description: character.biography
      ? character.biography.split("\n\n")[0].slice(0, 160)
      : `Profile of ${character.name}${character.role ? `, ${character.role}` : ""}, who appears in ${character.anime?.title ?? "the archive"}.`,
    alternates: { canonical: `/character/${character.slug}` },
  };
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = await getCharacterBySlug(slug);
  if (!character) notFound();

  const [anime, others] = await Promise.all([
    character.animeId
      ? prisma.anime.findUnique({
          where: { id: character.animeId },
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
        })
      : null,
    character.animeId
      ? prisma.character.findMany({
          where: { animeId: character.animeId, NOT: { id: character.id } },
          orderBy: { name: "asc" },
          take: 8,
          select: {
            id: true,
            slug: true,
            name: true,
            japaneseName: true,
            role: true,
            voiceActorName: true,
          },
        })
      : [],
  ]);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Characters", item: "/characters" },
      { "@type": "ListItem", position: 3, name: character.name, item: `/character/${character.slug}` },
    ],
  };

  const thingLd = {
    "@context": "https://schema.org",
    "@type": "Thing",
    name: character.name,
    ...(character.japaneseName ? { alternateName: character.japaneseName } : {}),
    ...(character.role ? { description: character.role } : {}),
    ...(anime ? { additionalProperty: [{ "@type": "PropertyValue", name: "Appears in", value: anime.title }] } : {}),
  };

  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 py-8 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(thingLd) }}
      />
      <Breadcrumbs
        items={[{ label: "Characters", href: "/characters" }, { label: character.name }]}
      />

      <header className="relative overflow-hidden surface-panel film-grain px-6 py-10 sm:px-10">
        <div className="absolute inset-0 vignette" aria-hidden />
        <div className="relative">
          <p className="mb-3 font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">
            Character Profile
          </p>
          <h1 className="font-display text-3xl text-paper text-balance sm:text-4xl">
            {character.name}
          </h1>
          {character.japaneseName ? (
            <p className="mt-2 font-jp text-lg text-muted">{character.japaneseName}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {character.role ? <Badge tone="neutral">{character.role}</Badge> : null}
            {anime ? (
              <BadgeLink href={`/anime/${anime.slug}`} tone="holo">
                {anime.title}
                {anime.year ? ` (${anime.year})` : null}
              </BadgeLink>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mt-10 space-y-10">
        {character.biography ? (
          <section>
            <p className="mb-3 font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">
              Biography
            </p>
            <div className="editorial">{character.biography}</div>
          </section>
        ) : null}

        {character.voiceActorName ? (
          <section>
            <p className="mb-3 flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">
              <Mic className="h-3.5 w-3.5" aria-hidden />
              Voice Actor
            </p>
            <p className="editorial">{character.voiceActorName}</p>
          </section>
        ) : null}

        {anime ? (
          <section>
            <SectionHeading
              eyebrow="Works"
              title="Appears In"
              description={`${character.name} appears in ${anime.title}.`}
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              <AnimeCard data={anime} />
            </div>
          </section>
        ) : null}

        {others.length > 0 ? (
          <section>
            <SectionHeading
              eyebrow="Shared Cast"
              title={`Other Characters in ${anime?.title ?? "This Anime"}`}
              description={`${others.length} ${others.length === 1 ? "character" : "characters"} sharing the same work, for context.`}
            />
            <ul className="surface-card divide-y divide-line overflow-hidden rounded">
              {others.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
                >
                  <Link
                    href={`/character/${c.slug}`}
                    className="font-display text-sm text-paper hover:text-crimson-300 transition-colors"
                  >
                    {c.name}
                    {c.japaneseName ? (
                      <span className="ml-2 font-jp text-xs text-faint">
                        {c.japaneseName}
                      </span>
                    ) : null}
                  </Link>
                  <div className="flex items-center gap-2">
                    {c.role ? <Badge tone="neutral">{c.role}</Badge> : null}
                    {c.voiceActorName ? (
                      <Badge tone="holo">VA: {c.voiceActorName}</Badge>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {!character.biography && !anime && others.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Nothing documented yet"
            description={`We have no biography or related entries for ${character.name} at this time.`}
          />
        ) : null}
      </div>
    </div>
  );
}
