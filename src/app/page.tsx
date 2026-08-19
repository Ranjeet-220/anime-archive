import type { Metadata } from "next";
import Link from "next/link";
import { getEras, getHomepageData } from "@/lib/data";
import { SectionHeading, Stat } from "@/components/ui/section-heading";
import { AnimeCard, type AnimeCardData } from "@/components/ui/anime-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { EVENT_KIND_LABELS } from "@/lib/format";
import { HomeHero } from "@/components/three/home-hero";

export const metadata: Metadata = {
  title: "Anime Archive — Walk Through the History of Anime",
  description:
    "Step into the Anime Archive: a 3D digital museum of Japanese animation. Explore eras, studios, creators, and landmark works from 1917 to today.",
  alternates: { canonical: "/" },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Anime Archive",
  alternateName: "Anime Archive — Walk Through the History of Anime",
  url: "https://anime-archive.example",
  description:
    "A digital museum and historical encyclopedia of Japanese animation, from the first animated shorts of 1917 to the streaming era.",
  inLanguage: "en",
};

function toCard(
  a: {
    slug: string;
    title: string;
    japaneseTitle: string | null;
    year: number | null;
    format: string;
    averageRating: number;
    coverUrl: string | null;
    studio: { slug: string; name: string } | null;
  } | null,
  extra: Partial<AnimeCardData> = {}
): AnimeCardData | null {
  if (!a) return null;
  return {
    slug: a.slug,
    title: a.title,
    japaneseTitle: a.japaneseTitle,
    year: a.year,
    format: a.format,
    averageRating: a.averageRating,
    coverUrl: a.coverUrl,
    studio: a.studio,
    ...extra,
  };
}

export default async function HomePage() {
  const [home, eras] = await Promise.all([getHomepageData(), getEras()]);
  const eraByEventId = new Map(eras.map((e) => [e.id, e]));
  const { stats, onThisDay, latest, landmark } = home;

  return (
    <div className="flex flex-col gap-20 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
      />

      {/* Cinematic 3D intro hero */}
      <HomeHero />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Archive statistics */}
        <section aria-labelledby="stats-heading">
          <SectionHeading
            eyebrow="The archive in numbers"
            title="A Century of Japanese Animation"
            align="center"
          />
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            <Stat value={stats.anime} label="Anime Archived" />
            <Stat value={stats.studios} label="Studios Documented" />
            <Stat value={stats.creators} label="Creators Documented" />
            <Stat value={stats.movies} label="Movies Archived" />
            <Stat value={stats.events} label="Historical Events" />
            <Stat value={stats.genres} label="Genres" />
          </dl>
        </section>

        {/* On this day */}
        <section aria-labelledby="on-this-day-heading" className="mt-20">
          <SectionHeading
            eyebrow="Today in history"
            title="On This Day in Anime History"
          />
          {onThisDay.length ? (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {onThisDay.map((event) => {
                const era = event.eraId ? eraByEventId.get(event.eraId) : undefined;
                const date =
                  event.month && event.day
                    ? `${String(event.month).padStart(2, "0")}/${String(event.day).padStart(2, "0")}`
                    : null;
                const body = (
                  <>
                    <span className="font-display text-[11px] uppercase tracking-[0.2em] text-crimson-400 tabular-nums">
                      {date ? `${date} · ` : ""}
                      {event.year ?? ""}
                    </span>
                    <span className="mt-1 block text-sm text-paper-2">
                      {EVENT_KIND_LABELS[event.kind] ?? "Event"} — {event.title}
                    </span>
                    {event.description ? (
                      <span className="mt-1 block text-xs leading-relaxed text-muted line-clamp-2">
                        {event.description}
                      </span>
                    ) : null}
                  </>
                );
                return (
                  <li key={event.id} className="surface-card p-4">
                    {era ? (
                      <Link href={`/timeline/${era.slug}`} className="block transition-colors hover:text-crimson-300">
                        {body}
                        <span className="mt-2 inline-block font-display text-[10px] uppercase tracking-[0.22em] text-faint">
                          {era.name} →
                        </span>
                      </Link>
                    ) : (
                      body
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyState
              title="No events for today"
              description="Nothing is archived for this date yet — check back tomorrow."
            />
          )}
        </section>

        {/* Landmark of the 1980s */}
        <section aria-labelledby="landmark-heading" className="mt-20">
          <SectionHeading
            eyebrow="Landmark of the 1980s"
            title="The Golden Age Defined"
            description="Works that proved anime's artistic and commercial reach worldwide."
          />
          {landmark.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {landmark.map((a) => {
                const card = toCard(a);
                return card ? <AnimeCard key={card.slug} data={card} /> : null;
              })}
            </div>
          ) : (
            <EmptyState
              title="Landmarks not archived yet"
              description="The golden-age showcase is being digitised."
            />
          )}
        </section>

        {/* Recently added */}
        <section aria-labelledby="recent-heading" className="mt-20">
          <SectionHeading
            eyebrow="Fresh from the archive"
            title="Recently Added to the Archive"
          />
          {latest.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {latest.map((a) => {
                const card = toCard(a);
                return card ? <AnimeCard key={card.slug} data={card} /> : null;
              })}
            </div>
          ) : (
            <EmptyState
              title="Nothing added yet"
              description="New entries appear here as the archive grows."
            />
          )}
        </section>

        <section className="mt-20 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <Badge tone="crimson">1917 — 2020s</Badge>
            <Badge>7 eras</Badge>
            <Badge>16 genres</Badge>
            <Link
              href="/museum"
              className="font-display text-[11px] uppercase tracking-[0.26em] text-holo-300 underline-offset-4 transition-colors hover:text-holo-400 hover:underline"
            >
              Enter the 3D museum →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
