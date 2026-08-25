import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Boxes, CalendarDays } from "lucide-react";
import { getEraBySlug, getEras } from "@/lib/data";
import type { EraDto } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { AnimeCard } from "@/components/ui/anime-card";
import { LinkButton } from "@/components/ui/button";
import { PageFade } from "@/components/transitions/page-fade";
import { EraHero } from "@/components/era/era-hero";
import { EraNavStrip } from "@/components/era/era-nav-strip";
import { EraEventList, type EraEventLinks } from "@/components/era/era-event-list";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface EraPageProps {
  params: Promise<{ era: string }>;
}

interface EraAnimeItem {
  id: string;
  slug: string;
  title: string;
  japaneseTitle: string | null;
  year: number | null;
  format: string;
  episodeCount: number | null;
  averageRating: number;
  coverUrl: string | null;
  studio: { slug: string; name: string } | null;
  genres: { slug: string; name: string }[];
}

interface EraRecord {
  id: string;
  slug: string;
  name: string;
  period: string;
  startYear: number;
  endYear: number | null;
  order: number;
  description: string | null;
  imageUrl: string | null;
  anime: EraAnimeItem[];
  events: EraEventView[];
}

interface EraEventView {
  slug: string;
  title: string;
  year: number | null;
  month: number | null;
  day: number | null;
  description: string | null;
  kind: string;
  animeId: string | null;
  studioId: string | null;
  personId: string | null;
}

async function resolveEventLinks(events: EraEventView[]): Promise<EraEventLinks> {
  const animeIds = events
    .map((e) => e.animeId)
    .filter((id): id is string => Boolean(id));
  const studioIds = events
    .map((e) => e.studioId)
    .filter((id): id is string => Boolean(id));
  const personIds = events
    .map((e) => e.personId)
    .filter((id): id is string => Boolean(id));
  if (animeIds.length === 0 && studioIds.length === 0 && personIds.length === 0) {
    return {};
  }
  try {
    const [anime, studios, people] = await Promise.all([
      animeIds.length > 0
        ? prisma.anime.findMany({
            where: { id: { in: animeIds } },
            select: { id: true, slug: true, title: true },
          })
        : Promise.resolve([]),
      studioIds.length > 0
        ? prisma.studio.findMany({
            where: { id: { in: studioIds } },
            select: { id: true, slug: true, name: true },
          })
        : Promise.resolve([]),
      personIds.length > 0
        ? prisma.person.findMany({
            where: { id: { in: personIds } },
            select: { id: true, slug: true, name: true },
          })
        : Promise.resolve([]),
    ]);
    return {
      anime: new Map(anime.map((a) => [a.id, { href: `/anime/${a.slug}`, title: a.title }])),
      studio: new Map(studios.map((s) => [s.id, { href: `/studio/${s.slug}`, title: s.name }])),
      person: new Map(people.map((p) => [p.id, { href: `/creator/${p.slug}`, title: p.name }])),
    };
  } catch {
    return {};
  }
}

async function loadEra(slug: string) {
  let era: EraRecord | null = null;
  let eras: EraDto[] = [];
  let links: EraEventLinks = {};
  try {
    [era, eras] = await Promise.all([getEraBySlug(slug), getEras()]);
  } catch {
    return { era: null, eras, links, dbError: true };
  }
  if (era) {
    links = await resolveEventLinks(era.events);
  }
  return { era, eras, links, dbError: false };
}

export async function generateMetadata({ params }: EraPageProps): Promise<Metadata> {
  const { era: slug } = await params;
  let era: EraRecord | null = null;
  try {
    era = await getEraBySlug(slug);
  } catch {
    era = null;
  }
  if (!era) {
    return { title: "Era not found" };
  }
  const title = `${era.name} (${era.period})`;
  return {
    title,
    description:
      era.description ??
      `Explore the ${era.name} era of anime history — ${era.anime.length} archived works and counting.`,
    alternates: { canonical: `/timeline/${era.slug}` },
    openGraph: {
      title,
      description: era.description ?? undefined,
      url: `/timeline/${era.slug}`,
      type: "website",
    },
  };
}

export default async function EraPage({ params }: EraPageProps) {
  const { era: slug } = await params;
  const { era, eras, links, dbError } = await loadEra(slug);

  if (dbError) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="The archive is out of reach"
          description="We couldn't reach the archive database. Please try again shortly."
        />
      </div>
    );
  }

  if (!era) notFound();

  const index = eras.findIndex((e) => e.slug === era.slug);
  const prev = index > 0 ? eras[index - 1] : null;
  const next = index >= 0 && index < eras.length - 1 ? eras[index + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Timeline", item: `${SITE_URL}/timeline` },
      { "@type": "ListItem", position: 3, name: era.name, item: `${SITE_URL}/timeline/${era.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageFade className="mx-auto w-full max-w-[1720px] px-4 py-8 sm:px-8 lg:px-12 sm:py-12">
        <Breadcrumbs items={[{ label: "Timeline", href: "/timeline" }, { label: era.name }]} />
        <div className="mt-6">
          <EraHero era={era} />
        </div>
        <EraNavStrip eras={eras} currentSlug={era.slug} />
        <div className="mt-8">
          <LinkButton href="/museum" variant="primary" size="lg">
            Enter This Room in 3D
            <ArrowRight className="h-4 w-4" aria-hidden />
          </LinkButton>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Collection"
              title="The Archive in This Era"
              description="Every work archived from this era, ordered by release year."
            />
            {era.anime.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {era.anime.map((anime) => (
                  <AnimeCard key={anime.id} data={anime} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Nothing archived yet"
                description={`No works from the ${era.name} era are in the archive yet. Check back soon.`}
              />
            )}

            <div className="mt-14">
              <SectionHeading
                eyebrow="History"
                title="Historical Events"
                description="Moments that shaped this era — premieres, milestones, and the people behind them."
              />
              <EraEventList events={era.events} links={links} />
            </div>
          </div>

          <aside>
            <div className="space-y-6">
              <div className="surface-card p-5">
                <h2 className="font-display text-sm uppercase tracking-[0.2em] text-crimson-300">
                  Era Overview
                </h2>
                <dl className="mt-4 divide-y divide-line text-sm">
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-muted">Period</dt>
                    <dd className="font-display text-paper">{era.period}</dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-muted">Years</dt>
                    <dd className="font-display tabular-nums text-paper">
                      {era.endYear ? `${era.startYear}–${era.endYear}` : `${era.startYear}–present`}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-muted">Anime archived</dt>
                    <dd className="font-display tabular-nums text-paper">{era.anime.length}</dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-muted">Events</dt>
                    <dd className="font-display tabular-nums text-paper">{era.events.length}</dd>
                  </div>
                </dl>
                {prev || next ? (
                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
                    {prev ? (
                      <Link
                        href={`/timeline/${prev.slug}`}
                        className="group flex flex-col rounded border border-line px-3 py-2.5 transition-colors hover:border-crimson-500/50"
                      >
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-faint">
                          <ArrowLeft className="h-3 w-3" aria-hidden /> Preceding
                        </span>
                        <span className="mt-1 font-display text-xs text-paper transition-colors group-hover:text-crimson-300">
                          {prev.name}
                        </span>
                      </Link>
                    ) : (
                      <span aria-hidden />
                    )}
                    {next ? (
                      <Link
                        href={`/timeline/${next.slug}`}
                        className="group flex flex-col items-end rounded border border-line px-3 py-2.5 text-right transition-colors hover:border-crimson-500/50"
                      >
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-faint">
                          Following <ArrowRight className="h-3 w-3" aria-hidden />
                        </span>
                        <span className="mt-1 font-display text-xs text-paper transition-colors group-hover:text-crimson-300">
                          {next.name}
                        </span>
                      </Link>
                    ) : (
                      <span aria-hidden />
                    )}
                  </div>
                ) : null}
              </div>

              <div className="surface-panel p-5">
                <div className="flex items-start gap-3">
                  <Boxes className="mt-0.5 h-4 w-4 shrink-0 text-holo-400" aria-hidden />
                  <div>
                    <h2 className="font-display text-sm text-paper">The 3D Museum</h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      The 3D museum presents this era as an explorable room. Everything here is
                      also available in 2D.
                    </p>
                  </div>
                </div>
              </div>

              <div className="surface-panel p-5">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-crimson-400" aria-hidden />
                  <div>
                    <h2 className="font-display text-sm text-paper">Read Full History</h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      Every work in this era has its own full record — production details, staff,
                      ratings, and more.
                    </p>
                    <Link
                      href="/anime"
                      className="mt-2 inline-block font-display text-xs uppercase tracking-wide text-holo-300 transition-colors hover:text-holo-400"
                    >
                      Browse all anime →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </PageFade>
    </>
  );
}
