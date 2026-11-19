"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Search,
  X,
  RotateCcw,
  LayoutGrid,
  Box,
  ArrowUpDown,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { StudioArchiveSection } from "@/components/three/scene-sections";
import type { MuseumStudioDto } from "@/lib/types";
import { cn, decadeOf, pluralize } from "@/lib/utils";

export interface StudioListItem {
  id: string;
  slug: string;
  name: string;
  japaneseName: string | null;
  foundedYear: number | null;
  status: string | null;
  logoUrl: string | null;
  _count: { anime: number };
}

export interface StudiosArchiveViewProps {
  studios: StudioListItem[];
  studioArchive: MuseumStudioDto[];
  initialQuery?: string;
}

type ViewMode = "classic" | "3d";
type StatusFilter = "all" | "active" | "inactive";
type SortOption =
  | "name_asc"
  | "name_desc"
  | "works_desc"
  | "works_asc"
  | "year_asc"
  | "year_desc";

export function StudiosArchiveView({
  studios,
  studioArchive,
  initialQuery = "",
}: StudiosArchiveViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("classic");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [decadeFilter, setDecadeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("name_asc");

  const decades = useMemo(() => {
    const set = new Set<number>();
    for (const s of studios) {
      if (s.foundedYear) {
        const d = decadeOf(s.foundedYear);
        if (d !== null) set.add(d);
      }
    }
    return [...set].sort((a, b) => a - b);
  }, [studios]);

  const filteredStudios = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();

    return studios
      .filter((s) => {
        if (term) {
          const matchName = s.name.toLowerCase().includes(term);
          const matchJp = s.japaneseName?.toLowerCase().includes(term);
          if (!matchName && !matchJp) return false;
        }

        if (statusFilter === "active") {
          if (!s.status?.toLowerCase().includes("active")) return false;
        } else if (statusFilter === "inactive") {
          if (s.status?.toLowerCase().includes("active")) return false;
        }

        if (decadeFilter !== "all") {
          if (decadeFilter === "unknown") {
            if (s.foundedYear !== null) return false;
          } else {
            const targetDecade = parseInt(decadeFilter, 10);
            if (decadeOf(s.foundedYear) !== targetDecade) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          case "works_desc":
            return b._count.anime - a._count.anime || a.name.localeCompare(b.name);
          case "works_asc":
            return a._count.anime - b._count.anime || a.name.localeCompare(b.name);
          case "year_asc":
            return (
              (a.foundedYear ?? 9999) - (b.foundedYear ?? 9999) ||
              a.name.localeCompare(b.name)
            );
          case "year_desc":
            return (
              (b.foundedYear ?? -1) - (a.foundedYear ?? -1) ||
              a.name.localeCompare(b.name)
            );
          default:
            return 0;
        }
      });
  }, [studios, searchQuery, statusFilter, decadeFilter, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    statusFilter !== "all" ||
    decadeFilter !== "all" ||
    sortBy !== "name_asc";

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setDecadeFilter("all");
    setSortBy("name_asc");
  };

  return (
    <div className="space-y-8">
      {/* Top View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-line pb-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-crimson-400" aria-hidden />
          <span className="font-display text-xs uppercase tracking-[0.25em] text-muted">
            Display Mode
          </span>
        </div>

        {/* Toggle [ CLASSIC VIEW ] [ 3D ARCHIVE ] */}
        <div
          role="group"
          aria-label="Studios view mode"
          className="inline-flex rounded-lg border border-line bg-charcoal p-1 shadow-inner"
        >
          <button
            type="button"
            onClick={() => setViewMode("classic")}
            aria-pressed={viewMode === "classic"}
            className={cn(
              "inline-flex items-center gap-2 rounded px-4 py-2 font-display text-xs uppercase tracking-[0.2em] transition-all",
              viewMode === "classic"
                ? "bg-crimson-500 text-paper shadow-sm font-semibold"
                : "text-muted hover:text-paper"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
            Classic View
          </button>
          <button
            type="button"
            onClick={() => setViewMode("3d")}
            aria-pressed={viewMode === "3d"}
            className={cn(
              "inline-flex items-center gap-2 rounded px-4 py-2 font-display text-xs uppercase tracking-[0.2em] transition-all",
              viewMode === "3d"
                ? "bg-crimson-500 text-paper shadow-sm font-semibold"
                : "text-muted hover:text-paper"
            )}
          >
            <Box className="h-3.5 w-3.5" aria-hidden />
            3D Archive
          </button>
        </div>
      </div>

      {/* 3D View Mode */}
      {viewMode === "3d" ? (
        <section aria-label="Studio Archive 3D Gallery" className="space-y-4">
          <div className="rounded-xl border border-line bg-charcoal/60 p-2 shadow-2xl backdrop-blur-md">
            <StudioArchiveSection studios={studioArchive} />
          </div>
          <p className="text-center font-display text-xs uppercase tracking-[0.2em] text-faint">
            Interactive 3D Wall · Drag to Orbit · Click a slab to inspect studio profile
          </p>
        </section>
      ) : (
        /* Classic View Mode */
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="rounded-xl border border-line bg-charcoal/50 p-4 sm:p-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-center">
              {/* Search input with clear button */}
              <div className="relative lg:col-span-4">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-faint"
                  aria-hidden
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search studios by name or kanji…"
                  className="w-full rounded-lg border border-line bg-ink/70 pl-9 pr-9 py-2 text-sm text-paper placeholder:text-faint focus:border-crimson-500/60 focus:outline-none focus:ring-1 focus:ring-crimson-500/40 transition-colors"
                  aria-label="Search studios"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-1 text-faint hover:text-paper transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>

              {/* Status Filter Chips */}
              <div className="lg:col-span-4 flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-xs font-display uppercase tracking-wider text-faint">
                  Status:
                </span>
                {(
                  [
                    { id: "all", label: "All" },
                    { id: "active", label: "Active" },
                    { id: "inactive", label: "Historical / Inactive" },
                  ] as const
                ).map((status) => (
                  <button
                    key={status.id}
                    type="button"
                    onClick={() => setStatusFilter(status.id)}
                    className={cn(
                      "rounded border px-2.5 py-1 font-display text-[11px] uppercase tracking-wider transition-colors",
                      statusFilter === status.id
                        ? "border-crimson-500 bg-crimson-500/15 text-crimson-300 font-semibold"
                        : "border-line bg-ink/40 text-muted hover:border-line-2 hover:text-paper"
                    )}
                  >
                    {status.label}
                  </button>
                ))}
              </div>

              {/* Decade & Sort dropdowns */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-2">
                {/* Decade Filter Dropdown */}
                <div className="relative">
                  <select
                    value={decadeFilter}
                    onChange={(e) => setDecadeFilter(e.target.value)}
                    aria-label="Filter by founded decade"
                    className="w-full appearance-none rounded-lg border border-line bg-ink/70 px-3 py-2 text-xs font-medium text-paper focus:border-crimson-500/60 focus:outline-none focus:ring-1 focus:ring-crimson-500/40 transition-colors"
                  >
                    <option value="all">All Founded Eras</option>
                    {decades.map((d) => (
                      <option key={d} value={String(d)}>
                        EST. {d}s
                      </option>
                    ))}
                    <option value="unknown">EST. Unknown</option>
                  </select>
                  <Calendar className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint" />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    aria-label="Sort studios"
                    className="w-full appearance-none rounded-lg border border-line bg-ink/70 px-3 py-2 text-xs font-medium text-paper focus:border-crimson-500/60 focus:outline-none focus:ring-1 focus:ring-crimson-500/40 transition-colors"
                  >
                    <option value="name_asc">Name (A–Z)</option>
                    <option value="name_desc">Name (Z–A)</option>
                    <option value="works_desc">Most Works</option>
                    <option value="works_asc">Least Works</option>
                    <option value="year_asc">Founded (Oldest)</option>
                    <option value="year_desc">Founded (Newest)</option>
                  </select>
                  <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint" />
                </div>
              </div>
            </div>

            {/* Filter Summary & Reset Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-3 text-xs">
              <p className="font-display tracking-wider text-muted">
                Showing <span className="text-paper font-semibold">{filteredStudios.length}</span>{" "}
                of <span className="text-paper">{studios.length}</span> {pluralize(studios.length, "studio")}
              </p>

              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-wider text-crimson-400 hover:text-crimson-300 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset all filters
                </button>
              ) : null}
            </div>
          </div>

          {/* Studios Grid */}
          {filteredStudios.length === 0 ? (
            <EmptyState
              icon={Building2}
              title="No studios found"
              description={
                hasActiveFilters
                  ? "No studios match your active filters. Try clearing your search query or relaxing filter criteria."
                  : "No studios are documented in the archive."
              }
              action={
                hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1 text-xs text-holo-400 hover:underline"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset filters
                  </button>
                ) : undefined
              }
            />
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStudios.map((s) => {
                const isActive = s.status?.toLowerCase().startsWith("active");
                return (
                  <li key={s.id}>
                    <Link
                      href={`/studio/${s.slug}`}
                      className="group surface-card lift relative flex h-full flex-col justify-between rounded-lg border border-line p-5 transition-all hover:border-crimson-500/40"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-lg font-semibold text-paper group-hover:text-crimson-300 transition-colors">
                            {s.name}
                          </h3>
                          {s.foundedYear ? (
                            <Badge tone="neutral" className="shrink-0">
                              EST. {s.foundedYear}
                            </Badge>
                          ) : (
                            <Badge tone="neutral" className="shrink-0 text-faint">
                              EST. ?
                            </Badge>
                          )}
                        </div>

                        {s.japaneseName ? (
                          <p className="font-jp text-sm text-faint">
                            {s.japaneseName}
                          </p>
                        ) : null}
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-line/40 pt-3">
                        <Badge tone={isActive ? "ok" : "warn"}>
                          {s.status ?? "Historical"}
                        </Badge>
                        <Badge tone="default">
                          {s._count.anime} {pluralize(s._count.anime, "work")}
                        </Badge>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
