import type { Metadata } from "next";
import { Suspense } from "react";
import { Search } from "lucide-react";
import { AnimeCard } from "@/components/ui/anime-card";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState, LoadingGrid } from "@/components/ui/empty-state";
import { LinkButton } from "@/components/ui/button";
import { FilterBar, type FilterBarValues } from "@/components/anime/filter-bar";
import { getAnimeList, getEras, getGenres, getStudios } from "@/lib/data";
import { parseFilters } from "@/lib/catalog-filters";

export const metadata: Metadata = {
  title: "Anime Catalog — Explore The History",
  description:
    "Browse the Anime Archive database — search, filter, and sort over a century of Japanese animation by year, decade, genre, studio, era, format, and more.",
  alternates: { canonical: "/anime" },
};

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
  const data = await getAnimeList({ ...filters, perPage: 25 });

  return (
    <section className="mt-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-display text-sm text-muted">
          {data.total.toLocaleString()} titles · {data.items.length} shown
        </p>
      </div>

      {data.items.length === 0 ? (
        <EmptyState
          title="No works match your filters"
          description="Try clearing some filters or searching for a different title or creator."
          icon={Search}
          action={
            <LinkButton href="/anime" variant="outline" size="sm">
              Reset all filters
            </LinkButton>
          }
        />
      ) : (
        <>
          {/* 5-to-6 column responsive grid matching reference */}
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 sm:gap-4">
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

export default async function AnimeCatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const filters = parseFilters(sp);

  const [genres, studios, eras] = await Promise.all([
    getGenres(),
    getStudios(),
    getEras(),
  ]);

  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 py-8 sm:px-8 lg:px-12 bg-ink">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        {/* Main Catalog Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-6">
            <h1 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-paper">
              Anime catalog
            </h1>
          </div>

          {/* Search and Filters Bar */}
          <FilterBar
            initial={toFilterValues(filters)}
            genres={genres.map((g) => ({ value: g.slug, label: g.name }))}
            studios={studios.map((s) => ({ value: s.slug, label: s.name }))}
            eras={eras.map((e) => ({ value: e.slug, label: e.name }))}
          />

          {/* Results Grid */}
          <Suspense fallback={<div className="mt-10"><LoadingGrid count={15} /></div>}>
            <AnimeResults filters={filters} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
