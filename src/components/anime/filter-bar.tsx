"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  RotateCcw,
  Sparkles,
} from "lucide-react";
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

const FORMAT_OPTIONS: FilterOption[] = [
  { value: "TV", label: "TV Series" },
  { value: "MOVIE", label: "Movie / Film" },
  { value: "OVA", label: "OVA" },
  { value: "ONA", label: "ONA" },
  { value: "SPECIAL", label: "Special" },
  { value: "WEB", label: "Web Series" },
];

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
  const [format, setFormat] = useState(initial.format ?? "");
  const [sort, setSort] = useState(initial.sort ?? "rating");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const applyFilters = useCallback(
    (overrides?: Partial<FilterBarValues>) => {
      const activeQ = overrides && "q" in overrides ? overrides.q : q;
      const activeGenre = overrides && "genre" in overrides ? overrides.genre : genre;
      const activeEra = overrides && "era" in overrides ? overrides.era : era;
      const activeStudio = overrides && "studio" in overrides ? overrides.studio : studio;
      const activeYear = overrides && "year" in overrides ? overrides.year : year;
      const activeFormat = overrides && "format" in overrides ? overrides.format : format;
      const activeSort = overrides && "sort" in overrides ? overrides.sort : sort;

      const params = new URLSearchParams();
      if (activeQ) params.set("q", activeQ);
      if (activeGenre) params.set("genre", activeGenre);
      if (activeEra) params.set("era", activeEra);
      if (activeStudio) params.set("studio", activeStudio);
      if (activeFormat) params.set("format", activeFormat);
      if (activeYear) {
        if (activeYear.endsWith("0s") || Number(activeYear) % 10 === 0) {
          params.set("decade", activeYear.replace("s", ""));
        } else {
          params.set("year", activeYear);
        }
      }
      if (activeSort && activeSort !== "rating") {
        params.set("sort", activeSort);
      }
      router.push(`/anime?${params.toString()}`);
      setIsMobileDrawerOpen(false);
    },
    [q, genre, era, studio, year, format, sort, router]
  );

  const clearAllFilters = () => {
    setQ("");
    setGenre("");
    setEra("");
    setStudio("");
    setYear("");
    setFormat("");
    setSort("rating");
    router.push("/anime");
    setIsMobileDrawerOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // Active filter chips calculation
  const activeChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];

    if (q) {
      chips.push({
        key: "q",
        label: `Search: "${q}"`,
        onRemove: () => {
          setQ("");
          applyFilters({ q: "" });
        },
      });
    }

    if (genre) {
      const gObj = genres.find((g) => g.value === genre);
      chips.push({
        key: "genre",
        label: `Genre: ${gObj ? gObj.label : genre}`,
        onRemove: () => {
          setGenre("");
          applyFilters({ genre: "" });
        },
      });
    }

    if (era) {
      const eObj = eras.find((e) => e.value === era);
      chips.push({
        key: "era",
        label: `Era: ${eObj ? eObj.label : era}`,
        onRemove: () => {
          setEra("");
          applyFilters({ era: "" });
        },
      });
    }

    if (studio) {
      const sObj = studios.find((s) => s.value === studio);
      chips.push({
        key: "studio",
        label: `Studio: ${sObj ? sObj.label : studio}`,
        onRemove: () => {
          setStudio("");
          applyFilters({ studio: "" });
        },
      });
    }

    if (format) {
      const fObj = FORMAT_OPTIONS.find((f) => f.value === format);
      chips.push({
        key: "format",
        label: `Format: ${fObj ? fObj.label : format}`,
        onRemove: () => {
          setFormat("");
          applyFilters({ format: "" });
        },
      });
    }

    if (year) {
      chips.push({
        key: "year",
        label: `Year: ${year.endsWith("s") ? year : `${year}s`}`,
        onRemove: () => {
          setYear("");
          applyFilters({ year: "" });
        },
      });
    }

    if (sort && sort !== "rating") {
      const sObj = SORT_OPTIONS.find((s) => s.value === sort);
      chips.push({
        key: "sort",
        label: `Sort: ${sObj ? sObj.label : sort}`,
        onRemove: () => {
          setSort("rating");
          applyFilters({ sort: "rating" });
        },
      });
    }

    return chips;
  }, [q, genre, era, studio, format, year, sort, genres, eras, studios, applyFilters]);

  const activeCount = activeChips.length;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Top Search Input Bar with Crimson Button & Mobile Filter Drawer Toggle */}
      <div className="flex items-center gap-2">
        <form onSubmit={handleSearchSubmit} className="relative flex flex-1 items-center">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search anime, movies, creators, studios..."
            className="w-full h-11 sm:h-12 rounded-lg border border-[#25282C] bg-[#111316] pl-4 pr-12 text-sm text-[#F2F2F2] placeholder:text-[#666A70] focus:border-crimson-500 focus:outline-none focus:ring-1 focus:ring-crimson-500 transition-all"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-1.5 top-1.5 bottom-1.5 w-9 sm:w-10 flex items-center justify-center rounded-md bg-crimson-500 text-white transition-all hover:bg-crimson-400 hover:shadow-[0_0_12px_rgba(227,38,46,0.5)] cursor-pointer"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Mobile/Tablet Drawer Trigger Button */}
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className="lg:hidden flex items-center gap-1.5 h-11 sm:h-12 rounded-lg border border-[#25282C] bg-[#14161A] px-3.5 text-xs font-bold uppercase tracking-wider text-[#F2F2F2] hover:border-crimson-500 hover:text-crimson-400 transition-all cursor-pointer shrink-0"
        >
          <SlidersHorizontal className="h-4 w-4 text-crimson-400" />
          <span className="hidden sm:inline">Filters</span>
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-crimson-500 text-[10px] font-black text-white ml-0.5">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Filter Selectors Row */}
      <div className="hidden lg:flex flex-wrap items-center gap-2.5 text-xs">
        {/* GENRE */}
        <div className="flex flex-col flex-1 min-w-[120px]">
          <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E9099]">
            GENRE
          </span>
          <div className="relative">
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#111316] px-3 py-2.5 text-xs text-[#F2F2F2] focus:border-crimson-500 focus:outline-none cursor-pointer"
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
        <div className="flex flex-col flex-1 min-w-[120px]">
          <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E9099]">
            ERA
          </span>
          <div className="relative">
            <select
              value={era}
              onChange={(e) => setEra(e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#111316] px-3 py-2.5 text-xs text-[#F2F2F2] focus:border-crimson-500 focus:outline-none cursor-pointer"
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
        <div className="flex flex-col flex-1 min-w-[120px]">
          <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E9099]">
            STUDIO
          </span>
          <div className="relative">
            <select
              value={studio}
              onChange={(e) => setStudio(e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#111316] px-3 py-2.5 text-xs text-[#F2F2F2] focus:border-crimson-500 focus:outline-none cursor-pointer"
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

        {/* FORMAT */}
        <div className="flex flex-col flex-1 min-w-[110px]">
          <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E9099]">
            FORMAT
          </span>
          <div className="relative">
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#111316] px-3 py-2.5 text-xs text-[#F2F2F2] focus:border-crimson-500 focus:outline-none cursor-pointer"
            >
              <option value="">All Formats</option>
              {FORMAT_OPTIONS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666A70]" />
          </div>
        </div>

        {/* YEAR / DECADE */}
        <div className="flex flex-col flex-1 min-w-[110px]">
          <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E9099]">
            DECADE
          </span>
          <div className="relative">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#111316] px-3 py-2.5 text-xs text-[#F2F2F2] focus:border-crimson-500 focus:outline-none cursor-pointer"
            >
              <option value="">All Decades</option>
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
          <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E9099]">
            SORT BY
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#111316] px-3 py-2.5 text-xs text-[#F2F2F2] focus:border-crimson-500 focus:outline-none cursor-pointer"
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

        {/* APPLY BUTTON */}
        <div className="flex flex-col self-end">
          <button
            type="button"
            onClick={() => applyFilters()}
            className="flex items-center justify-center gap-1.5 h-10 rounded-lg border border-crimson-500/40 bg-crimson-500/10 px-4 text-xs font-bold uppercase tracking-wider text-crimson-400 transition-all hover:bg-crimson-500 hover:text-white cursor-pointer shadow-sm"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>APPLY</span>
          </button>
        </div>
      </div>

      {/* Active Filter Chips with Remove (×) Button & CLEAR ALL */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#8E9099] mr-1">
            <Sparkles className="h-3 w-3 text-crimson-400" />
            <span>Active:</span>
          </div>

          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1.5 rounded-full border border-crimson-500/30 bg-[#16181D] px-3 py-1 text-xs font-semibold text-[#F2F2F2] shadow-sm transition-colors hover:border-crimson-500/60"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                onClick={chip.onRemove}
                aria-label={`Remove ${chip.label}`}
                className="flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-crimson-500 hover:text-white text-[#8E9099] transition-colors cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          {/* CLEAR ALL button */}
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1 rounded-full border border-[#33373E] bg-[#14161A] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#A0A5AE] hover:border-crimson-500 hover:text-crimson-400 hover:bg-crimson-500/10 transition-all cursor-pointer ml-1"
          >
            <RotateCcw className="h-3 w-3" />
            <span>CLEAR ALL</span>
          </button>
        </div>
      )}

      {/* Mobile Filter Drawer / Bottom Sheet Modal */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setIsMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full rounded-t-2xl border-t border-[#25282C] bg-[#111316] p-6 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#25282C]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-crimson-400" />
                <h3 className="font-display text-base font-bold uppercase tracking-tight text-[#F2F2F2]">
                  FILTER CATALOG
                </h3>
                {activeCount > 0 && (
                  <span className="rounded-full bg-crimson-500/20 border border-crimson-500/40 px-2 py-0.5 text-[10px] font-bold text-crimson-400">
                    {activeCount} active
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#25282C] text-[#8E9099] hover:text-[#F2F2F2] hover:bg-[#181B1F] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Filter Fields in Drawer */}
            <div className="grid gap-4 py-5 sm:grid-cols-2 text-xs">
              {/* GENRE */}
              <div className="flex flex-col">
                <label className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E9099]">
                  GENRE
                </label>
                <div className="relative">
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#16181D] px-3.5 py-3 text-xs text-[#F2F2F2] focus:border-crimson-500 focus:outline-none cursor-pointer"
                  >
                    <option value="">All Genres</option>
                    {genres.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666A70]" />
                </div>
              </div>

              {/* ERA */}
              <div className="flex flex-col">
                <label className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E9099]">
                  ERA
                </label>
                <div className="relative">
                  <select
                    value={era}
                    onChange={(e) => setEra(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#16181D] px-3.5 py-3 text-xs text-[#F2F2F2] focus:border-crimson-500 focus:outline-none cursor-pointer"
                  >
                    <option value="">All Eras</option>
                    {eras.map((e) => (
                      <option key={e.value} value={e.value}>
                        {e.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666A70]" />
                </div>
              </div>

              {/* STUDIO */}
              <div className="flex flex-col">
                <label className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E9099]">
                  STUDIO
                </label>
                <div className="relative">
                  <select
                    value={studio}
                    onChange={(e) => setStudio(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#16181D] px-3.5 py-3 text-xs text-[#F2F2F2] focus:border-crimson-500 focus:outline-none cursor-pointer"
                  >
                    <option value="">All Studios</option>
                    {studios.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666A70]" />
                </div>
              </div>

              {/* FORMAT */}
              <div className="flex flex-col">
                <label className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E9099]">
                  FORMAT
                </label>
                <div className="relative">
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#16181D] px-3.5 py-3 text-xs text-[#F2F2F2] focus:border-crimson-500 focus:outline-none cursor-pointer"
                  >
                    <option value="">All Formats</option>
                    {FORMAT_OPTIONS.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666A70]" />
                </div>
              </div>

              {/* YEAR / DECADE */}
              <div className="flex flex-col">
                <label className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E9099]">
                  DECADE
                </label>
                <div className="relative">
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#16181D] px-3.5 py-3 text-xs text-[#F2F2F2] focus:border-crimson-500 focus:outline-none cursor-pointer"
                  >
                    <option value="">All Decades</option>
                    {DECADES.map((d) => (
                      <option key={d} value={`${d}s`}>
                        {d}s Decade
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666A70]" />
                </div>
              </div>

              {/* SORT BY */}
              <div className="flex flex-col">
                <label className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E9099]">
                  SORT BY
                </label>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#25282C] bg-[#16181D] px-3.5 py-3 text-xs text-[#F2F2F2] focus:border-crimson-500 focus:outline-none cursor-pointer"
                  >
                    {SORT_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666A70]" />
                </div>
              </div>
            </div>

            {/* Bottom Actions CTA */}
            <div className="flex gap-3 pt-4 border-t border-[#25282C]">
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="flex-1 rounded-lg border border-[#25282C] bg-[#181B1F] py-3 text-xs font-bold uppercase tracking-wider text-[#A0A5AE] hover:text-[#F2F2F2] transition-colors cursor-pointer"
                >
                  Reset
                </button>
              )}
              <button
                type="button"
                onClick={() => applyFilters()}
                className="flex-[2] rounded-lg bg-crimson-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(227,38,46,0.4)] hover:bg-crimson-400 transition-all cursor-pointer text-center"
              >
                APPLY FILTERS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
