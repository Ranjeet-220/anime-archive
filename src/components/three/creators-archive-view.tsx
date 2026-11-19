"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Clapperboard,
  Search,
  X,
  RotateCcw,
  LayoutGrid,
  Box,
  ArrowUpDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { HallOfLegendsSection } from "@/components/three/scene-sections";
import type { MuseumPersonDto } from "@/lib/types";
import { cn, pluralize } from "@/lib/utils";

export interface CreatorListItem {
  id: string;
  slug: string;
  name: string;
  japaneseName: string | null;
  role: string | null;
  bornYear: number | null;
  diedYear: number | null;
  biography: string | null;
  majorWorks: string | null;
  website: string | null;
  profileUrl: string | null;
  _count: {
    directed: number;
    created: number;
  };
}

export interface CreatorsArchiveViewProps {
  creators: CreatorListItem[];
  legends: MuseumPersonDto[];
  initialQuery?: string;
}

type ViewMode = "classic" | "3d";
type RoleFilter =
  | "all"
  | "director"
  | "animator"
  | "writer"
  | "producer"
  | "creator"
  | "manga";

type SortOption =
  | "name_asc"
  | "name_desc"
  | "works_desc"
  | "works_asc"
  | "born_asc"
  | "born_desc";

const ROLE_FILTERS: { id: RoleFilter; label: string; match: string[] }[] = [
  { id: "all", label: "All Roles", match: [] },
  { id: "director", label: "Directors", match: ["director", "directing"] },
  { id: "animator", label: "Animators", match: ["animator", "animation", "key animator"] },
  { id: "writer", label: "Writers / Script", match: ["writer", "screenplay", "script", "author"] },
  { id: "producer", label: "Producers", match: ["producer", "production"] },
  { id: "creator", label: "Original Creators", match: ["creator", "concept", "original work"] },
  { id: "manga", label: "Manga Artists", match: ["manga", "mangaka", "artist", "illustrator"] },
];

function years(bornYear: number | null, diedYear: number | null): string | null {
  if (bornYear && diedYear) return `${bornYear}–${diedYear}`;
  if (bornYear) return `b. ${bornYear}`;
  if (diedYear) return `d. ${diedYear}`;
  return null;
}

export function CreatorsArchiveView({
  creators,
  legends,
  initialQuery = "",
}: CreatorsArchiveViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("classic");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("name_asc");

  const filteredCreators = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();

    return creators
      .filter((c) => {
        if (term) {
          const matchName = c.name.toLowerCase().includes(term);
          const matchJp = c.japaneseName?.toLowerCase().includes(term);
          const matchRole = c.role?.toLowerCase().includes(term);
          const matchBio = c.biography?.toLowerCase().includes(term);
          if (!matchName && !matchJp && !matchRole && !matchBio) return false;
        }

        if (roleFilter !== "all") {
          const config = ROLE_FILTERS.find((r) => r.id === roleFilter);
          if (config && config.match.length > 0) {
            const roleStr = (c.role ?? "").toLowerCase();
            const bioStr = (c.biography ?? "").toLowerCase();
            const matched = config.match.some(
              (m) => roleStr.includes(m) || bioStr.includes(m)
            );
            if (!matched) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const worksA = a._count.directed + a._count.created;
        const worksB = b._count.directed + b._count.created;

        switch (sortBy) {
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          case "works_desc":
            return worksB - worksA || a.name.localeCompare(b.name);
          case "works_asc":
            return worksA - worksB || a.name.localeCompare(b.name);
          case "born_asc":
            return (a.bornYear ?? 9999) - (b.bornYear ?? 9999) || a.name.localeCompare(b.name);
          case "born_desc":
            return (b.bornYear ?? -9999) - (a.bornYear ?? -9999) || a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [creators, searchQuery, roleFilter, sortBy]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    roleFilter !== "all" ||
    sortBy !== "name_asc";

  const clearAllFilters = () => {
    setSearchQuery("");
    setRoleFilter("all");
    setSortBy("name_asc");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Primary View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div className="flex items-center gap-1 rounded-xl border border-line bg-charcoal p-1">
          <button
            type="button"
            onClick={() => setViewMode("classic")}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.18em] transition-all cursor-pointer",
              viewMode === "classic"
                ? "bg-crimson-500 text-white shadow-[0_0_12px_rgba(227,38,46,0.4)]"
                : "text-muted hover:text-paper"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            CLASSIC VIEW
          </button>

          <button
            type="button"
            onClick={() => setViewMode("3d")}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.18em] transition-all cursor-pointer",
              viewMode === "3d"
                ? "bg-crimson-500 text-white shadow-[0_0_12px_rgba(227,38,46,0.4)]"
                : "text-muted hover:text-paper"
            )}
          >
            <Box className="h-3.5 w-3.5" />
            3D HALL
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="font-semibold text-paper">{filteredCreators.length}</span> of{" "}
          <span>{creators.length}</span> creators documented
        </div>
      </div>

      {/* 3D View Render */}
      {viewMode === "3d" ? (
        <section aria-label="Hall of Legends 3D Experience" className="flex flex-col gap-4">
          <div className="rounded-2xl border border-line bg-charcoal/40 p-2 overflow-hidden shadow-2xl">
            <HallOfLegendsSection people={legends} />
          </div>
          <div className="flex items-center justify-between text-xs text-faint px-2">
            <span>Click any pedestal to inspect creator works and biography.</span>
            <button
              type="button"
              onClick={() => setViewMode("classic")}
              className="text-crimson-400 hover:underline cursor-pointer"
            >
              Switch to Classic View →
            </button>
          </div>
        </section>
      ) : (
        /* Classic View Render */
        <div className="flex flex-col gap-6">
          {/* Controls Bar: Search & Sort */}
          <div className="grid gap-3 sm:grid-cols-12 items-center">
            {/* Search Input */}
            <div className="sm:col-span-8 lg:col-span-9 relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
                aria-hidden
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by creator name, Japanese name, or role..."
                className="w-full rounded-xl border border-line bg-charcoal py-2.5 pr-10 pl-10 text-sm text-paper placeholder:text-faint focus:border-crimson-500 focus:outline-none focus:ring-1 focus:ring-crimson-500"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search input"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-paper cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-4 lg:col-span-3 relative">
              <ArrowUpDown
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
                aria-hidden
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort creators"
                className="w-full appearance-none rounded-xl border border-line bg-charcoal py-2.5 pr-8 pl-10 text-xs font-semibold text-paper focus:border-crimson-500 focus:outline-none cursor-pointer"
              >
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
                <option value="works_desc">Most Works</option>
                <option value="works_asc">Least Works</option>
                <option value="born_asc">Birth Year: Oldest</option>
                <option value="born_desc">Birth Year: Newest</option>
              </select>
            </div>
          </div>

          {/* Role Filter Chips */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Role filters">
            {ROLE_FILTERS.map((r) => {
              const active = roleFilter === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setRoleFilter(r.id)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                    active
                      ? "bg-crimson-500 text-white shadow-[0_0_10px_rgba(227,38,46,0.35)]"
                      : "border border-line bg-charcoal text-muted hover:border-line-2 hover:text-paper"
                  )}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          {/* Active Filter Chips & Clear All */}
          {hasActiveFilters ? (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-faint">Active filters:</span>

              {searchQuery ? (
                <span className="inline-flex items-center gap-1 rounded-md border border-line bg-charcoal-2 px-2.5 py-1 text-xs text-paper">
                  Search: &ldquo;{searchQuery}&rdquo;
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Remove search filter"
                    className="text-faint hover:text-crimson-400 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ) : null}

              {roleFilter !== "all" ? (
                <span className="inline-flex items-center gap-1 rounded-md border border-line bg-charcoal-2 px-2.5 py-1 text-xs text-paper">
                  Role: {ROLE_FILTERS.find((r) => r.id === roleFilter)?.label}
                  <button
                    type="button"
                    onClick={() => setRoleFilter("all")}
                    aria-label="Remove role filter"
                    className="text-faint hover:text-crimson-400 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ) : null}

              {sortBy !== "name_asc" ? (
                <span className="inline-flex items-center gap-1 rounded-md border border-line bg-charcoal-2 px-2.5 py-1 text-xs text-paper">
                  Sorted
                  <button
                    type="button"
                    onClick={() => setSortBy("name_asc")}
                    aria-label="Reset sort"
                    className="text-faint hover:text-crimson-400 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ) : null}

              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-crimson-400 hover:text-crimson-300 transition-colors ml-2 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                CLEAR ALL
              </button>
            </div>
          ) : null}

          {/* Creators Card Grid */}
          {filteredCreators.length === 0 ? (
            <EmptyState
              icon={Clapperboard}
              title="No creators match your criteria"
              description={
                searchQuery
                  ? `No creators found for "${searchQuery}". Try different keywords or reset filters.`
                  : "No creators match the selected criteria."
              }
              action={
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="rounded-lg border border-crimson-500/50 bg-crimson-500/10 px-4 py-2 text-xs font-semibold text-crimson-400 hover:bg-crimson-500/20 transition-all cursor-pointer"
                >
                  Reset all filters
                </button>
              }
            />
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCreators.map((p) => {
                const span = years(p.bornYear, p.diedYear);
                const workCount = p._count.directed + p._count.created;

                return (
                  <li key={p.id}>
                    <Link
                      href={`/creator/${p.slug}`}
                      className="group surface-card lift flex h-full flex-col justify-between p-5 transition-all duration-200 hover:border-crimson-500/60 hover:shadow-[0_0_20px_rgba(227,38,46,0.15)]"
                    >
                      <div>
                        {/* Header: Name & Life Dates */}
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-lg font-bold text-paper group-hover:text-crimson-300 transition-colors">
                            {p.name}
                          </h3>
                          {span ? (
                            <span className="shrink-0 rounded-md border border-line bg-charcoal px-2 py-0.5 text-[10px] font-medium text-muted">
                              {span}
                            </span>
                          ) : null}
                        </div>

                        {/* Japanese Name */}
                        {p.japaneseName ? (
                          <p className="mt-1 font-jp text-xs text-faint">
                            {p.japaneseName}
                          </p>
                        ) : null}

                        {/* Role Description */}
                        <p className="mt-3 text-xs text-muted line-clamp-2">
                          {p.role ?? "Director · Animator · Creator"}
                        </p>
                      </div>

                      {/* Footer Badges */}
                      <div className="mt-5 pt-3 border-t border-line/60 flex items-center justify-between">
                        <Badge tone="default">
                          {workCount > 0
                            ? `${workCount} ${pluralize(workCount, "work")}`
                            : "Archived"}
                        </Badge>
                        <span className="text-xs font-semibold text-crimson-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          View Dossier →
                        </span>
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
