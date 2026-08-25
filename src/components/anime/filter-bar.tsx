"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterBarValues {
  q?: string;
  year?: string;
  decade?: string;
  genre?: string;
  studio?: string;
  director?: string;
  creator?: string;
  format?: string;
  status?: string;
  era?: string;
  minEpisodes?: string;
  maxEpisodes?: string;
  sort?: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

const DECADES = [1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

const SORT_OPTIONS: FilterOption[] = [
  { value: "rating", label: "Popularity / Rating" },
  { value: "year_desc", label: "Newest First" },
  { value: "year", label: "Oldest First" },
  { value: "title", label: "Title A–Z" },
];

export function FilterBar({
  initial,
  genres,
  studios,
  eras,
  className,
}: {
  initial: FilterBarValues;
  genres: FilterOption[];
  studios: FilterOption[];
  eras: FilterOption[];
  className?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState(initial.q ?? "");
  const [genre, setGenre] = useState(initial.genre ?? "");
  const [era, setEra] = useState(initial.era ?? "");
  const [studio, setStudio] = useState(initial.studio ?? "");
  const [year, setYear] = useState(initial.year ?? initial.decade ?? "");
  const [sort, setSort] = useState(initial.sort ?? "rating");
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (genre) params.set("genre", genre);
    if (era) params.set("era", era);
    if (studio) params.set("studio", studio);
    if (year) {
      if (year.endsWith("0s") || Number(year) % 10 === 0) {
        params.set("decade", year.replace("s", ""));
      } else {
        params.set("year", year);
      }
    }
    if (sort) params.set("sort", sort);
    router.push(`/anime?${params.toString()}`);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Search Input Bar with Red Search Button */}
      <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search anime, movies, creators..."
          className="w-full h-12 rounded-lg border border-[#25282C] bg-[#111316] pl-4 pr-14 text-sm text-paper placeholder:text-[#666A70] focus:border-crimson-500 focus:outline-none focus:ring-1 focus:ring-crimson-500 transition-all"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-1.5 top-1.5 bottom-1.5 w-10 flex items-center justify-center rounded-md bg-crimson-500 text-white transition-all hover:bg-crimson-400 hover:shadow-[0_0_12px_rgba(227,38,46,0.5)]"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {/* Filter Selectors Row */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
        {/* GENRE */}
        <div className="flex flex-col flex-1 min-w-[130px]">
          <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#666A70]">
            GENRE
          </span>
          <div className="relative">
            <select
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value);
              }}
              className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#111316] px-3 py-2.5 text-xs text-paper focus:border-crimson-500 focus:outline-none cursor-pointer"
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666A70]" />
          </div>
        </div>

        {/* ERA */}
        <div className="flex flex-col flex-1 min-w-[130px]">
          <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#666A70]">
            ERA
          </span>
          <div className="relative">
            <select
              value={era}
              onChange={(e) => {
                setEra(e.target.value);
              }}
              className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#111316] px-3 py-2.5 text-xs text-paper focus:border-crimson-500 focus:outline-none cursor-pointer"
            >
              <option value="">All Eras</option>
              {eras.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666A70]" />
          </div>
        </div>

        {/* STUDIO */}
        <div className="flex flex-col flex-1 min-w-[130px]">
          <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#666A70]">
            STUDIO
          </span>
          <div className="relative">
            <select
              value={studio}
              onChange={(e) => {
                setStudio(e.target.value);
              }}
              className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#111316] px-3 py-2.5 text-xs text-paper focus:border-crimson-500 focus:outline-none cursor-pointer"
            >
              <option value="">All Studios</option>
              {studios.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666A70]" />
          </div>
        </div>

        {/* YEAR */}
        <div className="flex flex-col flex-1 min-w-[110px]">
          <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#666A70]">
            YEAR
          </span>
          <div className="relative">
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#111316] px-3 py-2.5 text-xs text-paper focus:border-crimson-500 focus:outline-none cursor-pointer"
            >
              <option value="">All Years</option>
              {DECADES.map((d) => (
                <option key={d} value={`${d}s`}>
                  {d}s Decade
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666A70]" />
          </div>
        </div>

        {/* SORT BY */}
        <div className="flex flex-col flex-1 min-w-[130px]">
          <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#666A70]">
            SORT BY
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
              }}
              className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#111316] px-3 py-2.5 text-xs text-paper focus:border-crimson-500 focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666A70]" />
          </div>
        </div>

        {/* FILTERS APPLY BUTTON */}
        <div className="flex flex-col self-end">
          <button
            type="button"
            onClick={applyFilters}
            className="flex items-center justify-center gap-1.5 h-10 rounded-lg border border-[#25282C] bg-[#181B1F] px-4 text-xs font-semibold uppercase tracking-wider text-paper transition-all hover:border-crimson-500 hover:bg-crimson-500/10 hover:text-crimson-300"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-crimson-400" />
            <span>FILTERS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
