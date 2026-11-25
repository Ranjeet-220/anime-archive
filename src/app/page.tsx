import type { Metadata } from "next";
import Link from "next/link";
import { getEras, getHomepageData, getOnThisDay } from "@/lib/data";
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

const historyDayFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long", day: "numeric", timeZone: "UTC",
});

const storyDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
});

export default async function HomePage() {
  const [home, eras, history] = await Promise.all([getHomepageData(), getEras(), getOnThisDay()]);
  const eraById = new Map(eras.map((e) => [e.id, e]));
  const { latest, landmark } = home;

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

        <section aria-labelledby="on-this-day-heading">
          <div className="mb-6">
            <h2 id="on-this-day-heading" className="font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
              On this day in anime history
            </h2>
            <p className="mt-2 text-sm text-muted">
              <time dateTime={history.today.toISOString().slice(0, 10)}>{historyDayFormatter.format(history.today)}</time>
              {history.isSpotlight ? " · Daily archive spotlight" : ""}
            </p>
          </div>

          <ul className={history.stories.length === 1 ? "max-w-3xl" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
            {history.stories.map((story) => {
              const era = story.eraId ? eraById.get(story.eraId) : undefined;
              const href = story.href ?? (era ? `/timeline/${era.slug}` : "/timeline");
              return (
                <li key={story.id} className="surface-card p-5">
                  <p className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-semibold text-crimson-300">
                    <time dateTime={story.date}>{storyDateFormatter.format(new Date(story.date))}</time>
                    <span aria-hidden="true">·</span>
                    <span>{EVENT_KIND_LABELS[story.kind]}</span>
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-paper">{story.title}</h3>
                  {story.description && <p className="mt-2 text-sm leading-relaxed text-paper-2">{story.description}</p>}
                  <div className="mt-3 flex flex-wrap gap-x-5">
                    {(story.href || !story.source) && (
                      <Link href={href} className="inline-flex min-h-11 items-center text-sm font-semibold text-holo-400 hover:underline">
                        {story.href ? "View anime entry" : era ? "Explore this era" : "Explore the timeline"}
                      </Link>
                    )}
                    {story.source && (
                      <a href={story.source.href} className="inline-flex min-h-11 items-center text-sm font-semibold text-holo-400 hover:underline">
                        {story.source.name} source
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
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

