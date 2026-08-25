import type { Metadata } from "next";
import { Suspense } from "react";
import { Search } from "lucide-react";
import { AnimeCard } from "@/components/ui/anime-card";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState, LoadingGrid } from "@/components/ui/empty-state";
import { LinkButton } from "@/components/ui/button";
import { FilterBar, type FilterBarValues } from "@/components/anime/filter-bar";
import { CatalogSidebar } from "@/components/anime/catalog-sidebar";
import { getAnimeList, getEras, getGenres, getStudios, type AnimeSort } from "@/lib/data";

export const metadata: Metadata = {
  title: "Anime Catalog — Explore The History",
  description:
    "Browse the Anime Archive database — search, filter, and sort over a century of Japanese animation by year, decade, genre, studio, era, format, and more.",
  alternates: { canonical: "/anime" },
};

const SORTS: AnimeSort[] = ["year", "year_desc", "title", "rating", "newest"];

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
  const data = await getAnimeList({ ...filters, perPage: 25 });

  return (
    <section className="mt-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#666A70]">
          SHOWING {data.items.length} OF {data.total.toLocaleString()} ARCHIVED WORKS
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
        {/* Left Sidebar on Desktop */}
        <div className="hidden lg:block">
          <CatalogSidebar />
        </div>

        {/* Main Catalog Content */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-6">
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-paper">
              ANIME CATALOG
            </h1>
            <p className="mt-1.5 text-sm text-[#9A9A9A]">
              Explore thousands of anime from across the history.
            </p>
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
        </main>
      </div>
    </div>
  );
}
