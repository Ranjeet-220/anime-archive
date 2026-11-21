import type { Metadata } from "next";
import Link from "next/link";
import { getEras, getHomepageData } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimeCard, type AnimeCardData } from "@/components/ui/anime-card";
import { EmptyState } from "@/components/ui/empty-state";
import { EVENT_KIND_LABELS } from "@/lib/format";
import { HeroCinematic } from "@/components/home/hero-cinematic";
import { ExploreCollections } from "@/components/home/explore-collections";

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
  const { onThisDay, latest, landmark } = home;

  return (
    <div className="flex flex-col gap-10 sm:gap-12 pb-16 bg-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
      />

      {/* Cinematic Hero matching reference image */}
      <HeroCinematic />

      <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-8 lg:px-12 flex flex-col gap-12 sm:gap-16">
        {/* Explore The Collections: 6 Cards */}
        <ExploreCollections />

        {/* Landmark Classics / Top Masterpieces */}
        <section aria-labelledby="landmark-heading">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2
                id="landmark-heading"
                className="font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl"
              >
                Landmark anime
              </h2>
            </div>
            <Link
              href="/rankings"
              className="text-sm font-medium text-crimson-400 hover:text-crimson-300 transition-colors inline-flex items-center gap-1"
            >
              <span>View rankings</span>
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

        {/* On this day in history */}
        <section aria-labelledby="on-this-day-heading">
          <SectionHeading
            title="On this day"
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
              <h2
                id="recent-heading"
                className="font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl"
              >
                Recently added
              </h2>
            </div>
            <Link
              href="/anime"
              className="text-sm font-medium text-crimson-400 hover:text-crimson-300 transition-colors"
            >
              View all anime
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

