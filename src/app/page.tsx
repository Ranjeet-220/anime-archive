import type { Metadata } from "next";
import Link from "next/link";
import { getEras, getHomepageData } from "@/lib/data";
import { SectionHeading, Stat } from "@/components/ui/section-heading";
import { AnimeCard, type AnimeCardData } from "@/components/ui/anime-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { EVENT_KIND_LABELS } from "@/lib/format";
import { HeroCinematic } from "@/components/home/hero-cinematic";
import { ExploreCollections } from "@/components/home/explore-collections";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Anime Archive — Walk Through the History of Anime",
  description:
    "Step into the Anime Archive: a digital museum and historical encyclopedia of Japanese animation. Explore eras, studios, creators, and landmark works from 1917 to today.",
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
    genres?: { slug: string; name: string }[];
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
    genres: a.genres,
    ...extra,
  };
}

export default async function HomePage() {
  const [home, eras] = await Promise.all([getHomepageData(), getEras()]);
  const eraByEventId = new Map(eras.map((e) => [e.id, e]));
  const { stats, onThisDay, latest, landmark } = home;

  return (
    <div className="flex flex-col gap-16 sm:gap-20 pb-24 bg-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
      />

      {/* Cinematic Hero matching reference image */}
      <HeroCinematic />

      <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 flex flex-col gap-20">
        {/* Explore The Collections: 6 Cards */}
        <ExploreCollections />

        {/* Landmark Classics / Top Masterpieces */}
        <section aria-labelledby="landmark-heading">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-crimson-400">
                Landmarks of Animation
              </p>
              <h2
                id="landmark-heading"
                className="font-display text-2xl font-extrabold uppercase tracking-tight text-paper sm:text-3xl"
              >
                Iconic Anime Masterpieces
              </h2>
            </div>
            <Link
              href="/rankings"
              className="text-xs font-semibold uppercase tracking-wider text-crimson-400 hover:text-crimson-300 transition-colors hidden sm:inline-flex items-center gap-1"
            >
              <span>Top 60 Hall of Fame</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {landmark.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-4">
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

        {/* 3D Museum Interactive Banner */}
        <section className="relative overflow-hidden rounded-2xl border border-[#25282C] bg-[#111316] p-6 sm:p-10">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(227,38,46,0.6),transparent_70%)]" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-crimson-500/40 bg-crimson-500/10 px-3 py-1 text-xs font-semibold text-crimson-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>INTERACTIVE EXPERIENCE</span>
            </div>
            <h3 className="mt-4 font-serif text-2xl sm:text-4xl font-bold uppercase tracking-tight text-paper">
              WALK THROUGH THE 3D MUSEUM
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#9A9A9A]">
              Immerse yourself in our real-time 3D museum chambers. Walk through distinct historical eras, explore floating exhibits, inspect archival cel artwork, and interact with the physical history of anime.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/museum"
                className="inline-flex items-center gap-2 rounded-full bg-crimson-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_0_16px_rgba(227,38,46,0.4)] transition-all hover:bg-crimson-400 hover:scale-[1.02]"
              >
                <span>LAUNCH 3D SPACE</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-charcoal px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-paper transition-colors hover:border-line-2 hover:bg-charcoal-2"
              >
                <span>GUIDED TOURS</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Archive Statistics */}
        <section aria-labelledby="stats-heading">
          <SectionHeading
            eyebrow="The archive in numbers"
            title="A Century of Japanese Animation"
            align="center"
          />
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <Stat value={stats.anime} label="Anime Archived" />
            <Stat value={stats.studios} label="Studios Documented" />
            <Stat value={stats.creators} label="Creators Documented" />
            <Stat value={stats.movies} label="Movies Archived" />
            <Stat value={stats.events} label="Historical Events" />
            <Stat value={stats.genres} label="Genres" />
          </dl>
        </section>

        {/* On this day in history */}
        <section aria-labelledby="on-this-day-heading">
          <SectionHeading
            eyebrow="Chronicle of milestones"
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
                    <span className="font-display text-[11px] uppercase tracking-[0.2em] text-crimson-400 tabular-nums font-semibold">
                      {date ? `${date} · ` : ""}
                      {event.year ?? ""}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-paper">
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
                  <li key={event.id} className="surface-card p-4 transition-all hover:border-crimson-500/50 hover:bg-[#181B1F]">
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

        {/* Recently added */}
        <section aria-labelledby="recent-heading">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-crimson-400">
                Fresh from the archive
              </p>
              <h2
                id="recent-heading"
                className="font-display text-2xl font-extrabold uppercase tracking-tight text-paper sm:text-3xl"
              >
                Recently Documented
              </h2>
            </div>
            <Link
              href="/anime"
              className="text-xs font-semibold uppercase tracking-wider text-crimson-400 hover:text-crimson-300 transition-colors"
            >
              Browse All →
            </Link>
          </div>
          {latest.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-4">
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
      </div>
    </div>
  );
}

