import type { Metadata } from "next";
import { Suspense } from "react";
import { Search } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimeCard } from "@/components/ui/anime-card";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState, LoadingGrid } from "@/components/ui/empty-state";
import { LinkButton } from "@/components/ui/button";
import { FilterBar, type FilterBarValues } from "@/components/anime/filter-bar";
import { getAnimeList, getEras, getGenres, getStudios, type AnimeSort } from "@/lib/data";

export const metadata: Metadata = {
  title: "Anime Database",
  description:
    "Browse the Anime Archive database — search, filter, and sort over a century of Japanese animation by year, decade, genre, studio, era, format, and more.",
  alternates: { canonical: "/anime" },
};

const SORTS: AnimeSort[] = ["year", "year_desc", "title", "rating", "newest"];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function parseFilters(sp: Record<string, string | string[] | undefined>) {
  const get = (key: string) => {
    const v = sp[key];
    return typeof v === "string" ? v : undefined;
  };
  const num = (key: string) => {
    const v = get(key);
    if (!v) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };
  const sort = get("sort");
  return {
    q: get("q") || undefined,
    year: num("year"),
    decade: num("decade"),
    genre: get("genre") || undefined,
    studio: get("studio") || undefined,
    director: get("director") || undefined,
    creator: get("creator") || undefined,
    format: get("format") || undefined,
    status: get("status") || undefined,
    era: get("era") || undefined,
    minEpisodes: num("minEpisodes"),
    maxEpisodes: num("maxEpisodes"),
    sort: SORTS.includes(sort as AnimeSort) ? (sort as AnimeSort) : undefined,
    page: num("page"),
  };
}

function toFilterValues(filters: ReturnType<typeof parseFilters>): FilterBarValues {
  return {
    q: filters.q,
    year: filters.year?.toString(),
    decade: filters.decade?.toString(),
    genre: filters.genre,
    studio: filters.studio,
    director: filters.director,
    creator: filters.creator,
    format: filters.format,
    status: filters.status,
    era: filters.era,
    minEpisodes: filters.minEpisodes?.toString(),
    maxEpisodes: filters.maxEpisodes?.toString(),
    sort: filters.sort,
  };
}

async function AnimeResults({ filters }: { filters: ReturnType<typeof parseFilters> }) {
  const data = await getAnimeList({ ...filters, perPage: 24 });

  return (
    <section className="mt-8">
      <p className="mb-4 font-display text-xs uppercase tracking-[0.2em] text-muted">
        {data.total.toLocaleString()} work{data.total === 1 ? "" : "s"} archived
      </p>
      {data.items.length === 0 ? (
        <EmptyState
          title="No works match your filters"
          description="Try removing a filter, widening the year range, or searching for a different title."
          icon={Search}
          action={
            <LinkButton href="/anime" variant="outline" size="sm">
              Reset all filters
            </LinkButton>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {data.items.map((item) => (
              <AnimeCard key={item.slug} data={item} />
            ))}
          </div>
          <div className="mt-10">
            <Pagination page={data.page} pages={data.pages} basePath="/anime" />
          </div>
        </>
      )}
    </section>
  );
}

export default async function AnimeDatabasePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const filters = parseFilters(sp);

  const [genres, studios, eras] = await Promise.all([getGenres(), getStudios(), getEras()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Anime Database",
    description: "The Anime Archive database — a searchable index of Japanese animation from 1917 to the present.",
    url: `${SITE_URL}/anime`,
    isPartOf: { "@type": "WebSite", name: "Anime Archive", url: SITE_URL },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Anime Database" }]} />

      <div className="mt-4">
        <SectionHeading
          eyebrow="Archive"
          title="ANIME DATABASE"
          description="Search, filter, and sort over a century of Japanese animation — every work, one archive."
        />
      </div>

      <FilterBar
        initial={toFilterValues(filters)}
        genres={genres.map((g) => ({ value: g.slug, label: g.name }))}
        studios={studios.map((s) => ({ value: s.slug, label: s.name }))}
        eras={eras.map((e) => ({ value: e.slug, label: e.name }))}
        className="mt-6"
      />

      <Suspense fallback={<div className="mt-10"><LoadingGrid count={12} /></div>}>
        <AnimeResults filters={filters} />
      </Suspense>
    </div>
  );
}
