"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Clapperboard,
  Search,
  X,
  RotateCcw,
  LayoutGrid,
  Box,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { cn, pluralize } from "@/lib/utils";
import { SceneGate, SceneUnavailable, SceneLoading } from "./scene-shell";
import type { MuseumPersonDto, MuseumStudioDto, GenreDto } from "@/lib/types";

const HallOfLegendsCanvas = dynamic(
  () => import("./hall-of-legends-scene").then((m) => m.HallOfLegendsScene),
  {
    ssr: false,
    loading: () => <SceneLoading label="Entering the Hall of Legends…" />,
  }
);

const StudioArchiveCanvas = dynamic(
  () => import("./studio-archive-scene").then((m) => m.StudioArchiveScene),
  {
    ssr: false,
    loading: () => <SceneLoading label="Opening the Studio Archive…" />,
  }
);

const GenreWorldCanvas = dynamic(
  () => import("./genre-world-scene").then((m) => m.GenreWorldScene),
  {
    ssr: false,
    loading: () => <SceneLoading label="Mapping the Genre World…" />,
  }
);

/**
 * 3D section for the creator archive: a gallery of pedestals, one per
 * director, each leading to the creator's profile page.
 */
export function HallOfLegendsSection({ people }: { people: MuseumPersonDto[] }) {
  return (
    <SceneGate
      label="Entering the Hall of Legends…"
      fallback={
        <SceneUnavailable
          title="Hall of Legends unavailable"
          description="The interactive gallery needs WebGL or reduced-motion support to be off. The full creator archive is listed below."
          actionLabel="Browse creators"
          actionHref="#creators"
        />
      }
    >
      {({ mode, mobile }) => (
        <HallOfLegendsCanvas mode={mode} mobile={mobile} people={people} />
      )}
    </SceneGate>
  );
}

/**
 * 3D section for the studio archive: pedestals for each studio,
 * leading to studio profile pages.
 */
export function StudioArchiveSection({ studios }: { studios: MuseumStudioDto[] }) {
  return (
    <SceneGate
      label="Opening the Studio Archive…"
      fallback={
        <SceneUnavailable
          title="Studio Archive unavailable"
          description="The interactive 3D archive needs WebGL or reduced-motion support to be off. The full studio list is below."
          actionLabel="Browse studios"
          actionHref="#studios"
        />
      }
    >
      {({ mode, mobile }) => (
        <StudioArchiveCanvas mode={mode} mobile={mobile} studios={studios} />
      )}
    </SceneGate>
  );
}

/**
 * 3D section for the genre index: a constellation of genre markers,
 * leading to genre pages.
 */
export function GenreWorldSection({ genres }: { genres: GenreDto[] }) {
  return (
    <SceneGate
      label="Mapping the Genre World…"
      fallback={
        <SceneUnavailable
          title="Genre World unavailable"
          description="The interactive genre map needs WebGL or reduced-motion support to be off. The full genre index is below."
          actionLabel="Browse genres"
          actionHref="#genres"
        />
      }
    >
      {({ mode, mobile }) => (
        <GenreWorldCanvas mode={mode} mobile={mobile} genres={genres} />
      )}
    </SceneGate>
  );
}

// ---------------------------------------------------------------------------
// Creators Archive View (Classic 2D Default + 3D Hall of Legends Toggle)
// ---------------------------------------------------------------------------

export interface CreatorListItem {
  id: string;
  slug: string;
  name: string;
  japaneseName: string | null;
  role: string | null;
  bornYear: number | null;
  diedYear: number | null;
  profileUrl: string | null;
  _count: { directed: number; created: number };
}

export interface CreatorsArchiveViewProps {
  creators: CreatorListItem[];
  legends: MuseumPersonDto[];
  initialQuery?: string;
}

type CreatorViewMode = "classic" | "3d";
type CreatorRoleFilter =
  | "all"
  | "director"
  | "animator"
  | "writer"
  | "producer"
  | "creator"
  | "manga_artist";

type CreatorSortOption =
  | "name_asc"
  | "name_desc"
  | "born_asc"
  | "born_desc"
  | "works_desc"
  | "works_asc";

const CREATOR_ROLE_OPTIONS: { id: CreatorRoleFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "director", label: "Director" },
  { id: "animator", label: "Animator" },
  { id: "writer", label: "Writer" },
  { id: "producer", label: "Producer" },
  { id: "creator", label: "Creator" },
  { id: "manga_artist", label: "Manga Artist" },
];

function formatLifeDates(bornYear: number | null, diedYear: number | null): string | null {
  if (bornYear && diedYear) return `${bornYear}–${diedYear}`;
  if (bornYear) return `${bornYear}–present`;
  if (diedYear) return `d. ${diedYear}`;
  return null;
}

export function CreatorsArchiveView({
  creators,
  legends,
  initialQuery = "",
}: CreatorsArchiveViewProps) {
  const [viewMode, setViewMode] = useState<CreatorViewMode>("classic");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [roleFilter, setRoleFilter] = useState<CreatorRoleFilter>("all");
  const [sortBy, setSortBy] = useState<CreatorSortOption>("name_asc");

  const filteredCreators = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();

    return creators
      .filter((c) => {
        // Search filter
        if (term) {
          const matchName = c.name.toLowerCase().includes(term);
          const matchJp = c.japaneseName?.toLowerCase().includes(term);
          const matchRole = c.role?.toLowerCase().includes(term);
          if (!matchName && !matchJp && !matchRole) return false;
        }

        // Role filter
        if (roleFilter !== "all") {
          const r = c.role?.toLowerCase() ?? "";
          switch (roleFilter) {
            case "director":
              if (!r.includes("director")) return false;
              break;
            case "animator":
              if (!r.includes("animat")) return false;
              break;
            case "writer":
              if (
                !r.includes("writer") &&
                !r.includes("screenplay") &&
                !r.includes("script") &&
                !r.includes("author")
              )
                return false;
              break;
            case "producer":
              if (!r.includes("producer")) return false;
              break;
            case "creator":
              if (
                !r.includes("creator") &&
                !r.includes("original") &&
                !r.includes("mangaka")
              )
                return false;
              break;
            case "manga_artist":
              if (
                !r.includes("manga") &&
                !r.includes("mangaka") &&
                !r.includes("artist")
              )
                return false;
              break;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const aWorkCount = (a._count?.directed ?? 0) + (a._count?.created ?? 0);
        const bWorkCount = (b._count?.directed ?? 0) + (b._count?.created ?? 0);

        switch (sortBy) {
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          case "born_asc":
            return (
              (a.bornYear ?? 9999) - (b.bornYear ?? 9999) ||
              a.name.localeCompare(b.name)
            );
          case "born_desc":
            return (
              (b.bornYear ?? -1) - (a.bornYear ?? -1) ||
              a.name.localeCompare(b.name)
            );
          case "works_desc":
            return bWorkCount - aWorkCount || a.name.localeCompare(b.name);
          case "works_asc":
            return aWorkCount - bWorkCount || a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [creators, searchQuery, roleFilter, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== "" || roleFilter !== "all" || sortBy !== "name_asc";

  const resetFilters = () => {
    setSearchQuery("");
    setRoleFilter("all");
    setSortBy("name_asc");
  };

  return (
    <div className="space-y-8">
      {/* Top View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-line pb-6">
        <div className="flex items-center gap-2">
          <Clapperboard className="h-5 w-5 text-crimson-400" aria-hidden />
          <span className="font-display text-xs uppercase tracking-[0.25em] text-muted">
            Display Mode
          </span>
        </div>

        {/* Toggle [ CLASSIC VIEW ] [ 3D HALL ] */}
        <div
          role="group"
          aria-label="Creators view mode"
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
            3D Hall
          </button>
        </div>
      </div>

      {/* 3D View Mode */}
      {viewMode === "3d" ? (
        <section aria-label="Hall of Legends 3D Gallery" className="space-y-4">
          <div className="rounded-xl border border-line bg-charcoal/60 p-2 shadow-2xl backdrop-blur-md">
            <HallOfLegendsSection people={legends} />
          </div>
          <p className="text-center font-display text-xs uppercase tracking-[0.2em] text-faint">
            Interactive 3D Pedestals · Tiered Sightlines · Click a pedestal to view director profile
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
                  placeholder="Search creators by name, role, kanji…"
                  className="w-full rounded-lg border border-line bg-ink/70 pl-9 pr-9 py-2 text-sm text-paper placeholder:text-faint focus:border-crimson-500/60 focus:outline-none focus:ring-1 focus:ring-crimson-500/40 transition-colors"
                  aria-label="Search creators"
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

              {/* Role filter chips */}
              <div className="lg:col-span-5 flex flex-wrap items-center gap-1.5">
                <Filter className="h-3.5 w-3.5 text-faint mr-1 shrink-0" />
                {CREATOR_ROLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRoleFilter(opt.id)}
                    className={cn(
                      "rounded border px-2.5 py-1 font-display text-[11px] uppercase tracking-wider transition-colors",
                      roleFilter === opt.id
                        ? "border-crimson-500 bg-crimson-500/15 text-crimson-300 font-semibold"
                        : "border-line bg-ink/40 text-muted hover:border-line-2 hover:text-paper"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Sort dropdown */}
              <div className="lg:col-span-3">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as CreatorSortOption)}
                    aria-label="Sort creators"
                    className="w-full appearance-none rounded-lg border border-line bg-ink/70 px-3 py-2 text-xs font-medium text-paper focus:border-crimson-500/60 focus:outline-none focus:ring-1 focus:ring-crimson-500/40 transition-colors"
                  >
                    <option value="name_asc">Name (A–Z)</option>
                    <option value="name_desc">Name (Z–A)</option>
                    <option value="born_asc">Birth Year (Oldest First)</option>
                    <option value="born_desc">Birth Year (Newest First)</option>
                    <option value="works_desc">Most Works</option>
                    <option value="works_asc">Least Works</option>
                  </select>
                  <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint" />
                </div>
              </div>
            </div>

            {/* Filter Summary & Reset Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-3 text-xs">
              <p className="font-display tracking-wider text-muted">
                Showing <span className="text-paper font-semibold">{filteredCreators.length}</span>{" "}
                of <span className="text-paper">{creators.length}</span> {pluralize(creators.length, "creator")}
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

          {/* Creators Grid */}
          {filteredCreators.length === 0 ? (
            <EmptyState
              icon={Clapperboard}
              title="No creators found"
              description={
                hasActiveFilters
                  ? "No creators match your active search and filter criteria. Try resetting filters."
                  : "No creators are documented in the archive."
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
              {filteredCreators.map((c) => {
                const span = formatLifeDates(c.bornYear, c.diedYear);
                const workCount = (c._count?.directed ?? 0) + (c._count?.created ?? 0);

                return (
                  <li key={c.id}>
                    <Link
                      href={`/creator/${c.slug}`}
                      className="group surface-card lift relative flex h-full flex-col justify-between rounded-lg border border-line p-5 transition-all hover:border-crimson-500/40"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-lg font-semibold text-paper group-hover:text-crimson-300 transition-colors">
                            {c.name}
                          </h3>
                          {span ? (
                            <Badge tone="neutral" className="shrink-0 font-mono text-[10px]">
                              {span}
                            </Badge>
                          ) : null}
                        </div>

                        {c.japaneseName ? (
                          <p className="font-jp text-sm text-faint">
                            {c.japaneseName}
                          </p>
                        ) : null}
                      </div>

                      <div className="mt-5 space-y-3 border-t border-line/40 pt-3">
                        {c.role ? (
                          <p className="line-clamp-1 text-xs leading-relaxed text-muted">
                            {c.role}
                          </p>
                        ) : null}

                        <div className="flex flex-wrap items-center justify-between gap-2">
                          {c.role ? (
                            <Badge tone="holo" className="text-[10px]">
                              {c.role.split(",")[0]?.trim() ?? "Creator"}
                            </Badge>
                          ) : (
                            <span />
                          )}
                          {workCount > 0 ? (
                            <Badge tone="default">
                              {workCount} {pluralize(workCount, "work")}
                            </Badge>
                          ) : null}
                        </div>
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

export { StudiosArchiveView } from "./studios-archive-view";
export type { StudiosArchiveViewProps, StudioListItem } from "./studios-archive-view";