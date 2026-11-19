"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  CornerDownLeft,
  Film,
  Flame,
  History,
  Landmark,
  Library,
  Loader2,
  Search,
  Sparkles,
  Trash2,
  Trophy,
  Tv,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchResultDto } from "@/lib/types";

export type FilterType = "all" | "anime" | "movies" | "creators" | "studios" | "events";

export interface RecentSearchItem {
  id: string;
  title: string;
  subtitle?: string | null;
  href: string;
  type: SearchResultDto["type"] | "movie";
  format?: string | null;
  timestamp: number;
}

const RECENT_SEARCHES_KEY = "anime_archive_recent_searches";
const MAX_RECENTS = 6;

const POPULAR_SEARCHES = [
  { term: "Akira", tag: "Film · 1988" },
  { term: "Studio Ghibli", tag: "Studio" },
  { term: "Hayao Miyazaki", tag: "Director" },
  { term: "Neon Genesis Evangelion", tag: "TV · 1995" },
  { term: "Cowboy Bebop", tag: "TV · 1998" },
  { term: "Astro Boy", tag: "TV · 1963" },
  { term: "Ghost in the Shell", tag: "Film · 1995" },
  { term: "Makoto Shinkai", tag: "Director" },
];

const QUICK_LINKS = [
  {
    title: "Historical Timeline",
    subtitle: "Walk through 100+ years from 1917 to present",
    href: "/timeline",
    icon: Clock,
    badge: "1917–Now",
  },
  {
    title: "Top 60 Masterpieces",
    subtitle: "Curated all-time landmark anime rankings",
    href: "/rankings",
    icon: Trophy,
    badge: "Top 60",
  },
  {
    title: "3D Digital Museum",
    subtitle: "Interactive 3D gallery exhibition rooms",
    href: "/museum",
    icon: Sparkles,
    badge: "3D View",
  },
  {
    title: "Animation Studios",
    subtitle: "Toei, Ghibli, Madhouse, Bones, MAPPA & more",
    href: "/studios",
    icon: Landmark,
    badge: "Directory",
  },
  {
    title: "Creators & Legends",
    subtitle: "Directors, animators, authors & visionaries",
    href: "/creators",
    icon: User,
    badge: "Legends",
  },
  {
    title: "Curated Collections",
    subtitle: "Handpicked thematic anime exhibits",
    href: "/collections",
    icon: Library,
    badge: "Themes",
  },
];

const FILTER_CONFIG: { id: FilterType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "anime", label: "Anime" },
  { id: "movies", label: "Movies" },
  { id: "creators", label: "Creators" },
  { id: "studios", label: "Studios" },
  { id: "events", label: "Events" },
];

function getResultHref(item: SearchResultDto): string {
  switch (item.type) {
    case "anime":
      return `/anime/${item.slug}`;
    case "character":
      return `/character/${item.slug}`;
    case "studio":
      return `/studio/${item.slug}`;
    case "creator":
      return `/creator/${item.slug}`;
    case "event":
      return `/timeline#${item.slug}`;
    default:
      return `/anime/${item.slug}`;
  }
}

function getItemTypeIcon(type: SearchResultDto["type"] | "movie", format?: string | null) {
  if (type === "anime" && format === "MOVIE") {
    return <Film className="h-4 w-4 text-warn" />;
  }
  if (type === "movie") {
    return <Film className="h-4 w-4 text-warn" />;
  }
  switch (type) {
    case "anime":
      return <Tv className="h-4 w-4 text-crimson-400" />;
    case "creator":
      return <User className="h-4 w-4 text-holo-300" />;
    case "studio":
      return <Landmark className="h-4 w-4 text-blue-400" />;
    case "event":
      return <Clock className="h-4 w-4 text-ok" />;
    case "character":
      return <Sparkles className="h-4 w-4 text-pink-400" />;
    default:
      return <Tv className="h-4 w-4 text-crimson-400" />;
  }
}

function getItemBadgeLabel(item: SearchResultDto): string {
  if (item.type === "anime") {
    if (item.format === "MOVIE") return "Movie";
    if (item.format === "TV") return "TV Series";
    if (item.format) return item.format;
    return "Anime";
  }
  if (item.type === "creator") return "Creator";
  if (item.type === "studio") return "Studio";
  if (item.type === "event") return "Event";
  if (item.type === "character") return "Character";
  return "Entry";
}

export interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({ open: controlledOpen, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const listboxId = useId();
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [results, setResults] = useState<SearchResultDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
        if (stored) return JSON.parse(stored);
      } catch {
        // Ignore
      }
    }
    return [];
  });
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const resetSearchState = useCallback(() => {
    setQuery("");
    setResults([]);
    setError(null);
    setHighlightedIndex(0);
  }, [setQuery, setResults, setError, setHighlightedIndex]);

  const setIsOpen = useCallback(
    (value: boolean) => {
      if (!value) {
        resetSearchState();
      }
      if (!isControlled) setInternalOpen(value);
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange, resetSearchState]
  );

  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (prevOpen !== isOpen) {
    setPrevOpen(isOpen);
    if (!isOpen) {
      resetSearchState();
    }
  }

  const handleQueryChange = useCallback(
    (val: string) => {
      setQuery(val);
      if (val.trim().length < 2) {
        setResults([]);
        setLoading(false);
        setError(null);
      }
    },
    [setQuery, setResults, setLoading, setError]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const reqId = useRef(0);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveRecentSearch = useCallback(
    (item: {
      title: string;
      subtitle?: string | null;
      href: string;
      type: SearchResultDto["type"] | "movie";
      format?: string | null;
    }) => {
      try {
        const newItem: RecentSearchItem = {
          id: `${item.type}-${item.href}-${Date.now()}`,
          title: item.title,
          subtitle: item.subtitle,
          href: item.href,
          type: item.type,
          format: item.format,
          timestamp: Date.now(),
        };
        setRecentSearches((prev) => {
          const updated = [newItem, ...prev.filter((r) => r.href !== item.href)].slice(
            0,
            MAX_RECENTS
          );
          try {
            localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
          } catch {
            // Ignore
          }
          return updated;
        });
      } catch {
        // Ignore
      }
    },
    [setRecentSearches]
  );

  const removeRecentSearch = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.stopPropagation();
      e.preventDefault();
      setRecentSearches((prev) => {
        const updated = prev.filter((r) => r.href !== href);
        try {
          localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
        } catch {
          // Ignore
        }
        return updated;
      });
    },
    [setRecentSearches]
  );

  const clearAllRecents = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
      // Ignore
    }
  }, [setRecentSearches]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setIsOpen(!isOpen);
        return;
      }
      if (
        e.key === "/" &&
        !isOpen &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setIsOpen(true);
      }
    }

    function handleCustomOpen() {
      setIsOpen(true);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const trimmedQuery = query.trim();
  useEffect(() => {
    if (trimmedQuery.length < 2) {
      reqId.current++;
      return;
    }

    const currentReq = ++reqId.current;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}`);
        if (!res.ok) {
          throw new Error(`Search failed: ${res.status}`);
        }
        const data = (await res.json()) as { results?: SearchResultDto[] };
        if (reqId.current === currentReq) {
          setResults(data.results ?? []);
          setHighlightedIndex(0);
        }
      } catch {
        if (reqId.current === currentReq) {
          setError("Failed to fetch search results. Please check your connection.");
          setResults([]);
        }
      } finally {
        if (reqId.current === currentReq) {
          setLoading(false);
        }
      }
    }, 220);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [trimmedQuery]);

  const filteredResults = useMemo(() => {
    if (activeFilter === "all") return results;
    if (activeFilter === "anime") {
      return results.filter((r) => r.type === "anime" && r.format !== "MOVIE");
    }
    if (activeFilter === "movies") {
      return results.filter((r) => r.type === "anime" && r.format === "MOVIE");
    }
    if (activeFilter === "creators") {
      return results.filter((r) => r.type === "creator");
    }
    if (activeFilter === "studios") {
      return results.filter((r) => r.type === "studio");
    }
    if (activeFilter === "events") {
      return results.filter((r) => r.type === "event");
    }
    return results;
  }, [results, activeFilter]);

  const groupedResults = useMemo(() => {
    if (activeFilter !== "all") {
      return [{ key: activeFilter, label: activeFilter.toUpperCase(), items: filteredResults }];
    }

    const animeList = filteredResults.filter((r) => r.type === "anime" && r.format !== "MOVIE");
    const moviesList = filteredResults.filter((r) => r.type === "anime" && r.format === "MOVIE");
    const creatorsList = filteredResults.filter((r) => r.type === "creator");
    const studiosList = filteredResults.filter((r) => r.type === "studio");
    const eventsList = filteredResults.filter((r) => r.type === "event");
    const charactersList = filteredResults.filter((r) => r.type === "character");

    const groups: { key: string; label: string; items: SearchResultDto[] }[] = [];
    if (animeList.length > 0) groups.push({ key: "anime", label: "Anime Series", items: animeList });
    if (moviesList.length > 0) groups.push({ key: "movies", label: "Feature Films", items: moviesList });
    if (creatorsList.length > 0)
      groups.push({ key: "creators", label: "Creators & Directors", items: creatorsList });
    if (studiosList.length > 0) groups.push({ key: "studios", label: "Studios", items: studiosList });
    if (eventsList.length > 0)
      groups.push({ key: "events", label: "Historical Events", items: eventsList });
    if (charactersList.length > 0)
      groups.push({ key: "characters", label: "Characters", items: charactersList });

    return groups;
  }, [filteredResults, activeFilter]);

  const navigableItems = useMemo(() => {
    if (trimmedQuery.length >= 2) {
      return filteredResults.map((item) => ({
        type: "search-result" as const,
        data: item,
        href: getResultHref(item),
      }));
    }
    if (recentSearches.length > 0) {
      return recentSearches.map((rec) => ({
        type: "recent" as const,
        data: rec,
        href: rec.href,
      }));
    }
    return QUICK_LINKS.map((q) => ({
      type: "quick-link" as const,
      data: q,
      href: q.href,
    }));
  }, [trimmedQuery, filteredResults, recentSearches]);

  const handleNavigate = useCallback(
    (href: string, itemData?: SearchResultDto | RecentSearchItem | (typeof QUICK_LINKS)[0]) => {
      if (itemData) {
        if ("type" in itemData && typeof itemData.type === "string") {
          saveRecentSearch({
            title: itemData.title,
            subtitle: itemData.subtitle,
            href,
            type: itemData.type as SearchResultDto["type"],
            format: "format" in itemData ? itemData.format : undefined,
          });
        }
      }
      setIsOpen(false);
      router.push(href);
    },
    [router, setIsOpen, saveRecentSearch]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      return;
    }

    if (navigableItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % navigableItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + navigableItems.length) % navigableItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = navigableItems[highlightedIndex];
      if (current) {
        handleNavigate(current.href, current.data);
      }
    }
  };

  useEffect(() => {
    if (!listRef.current) return;
    const selectedEl = listRef.current.querySelector<HTMLElement>("[data-highlighted='true']");
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search the archive"
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 md:pt-20"
      onKeyDown={handleKeyDown}
    >
      <div
        className="fixed inset-0 bg-ink/80 backdrop-blur-md transition-opacity duration-200"
        onClick={() => setIsOpen(false)}
        aria-hidden
      />

      <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-charcoal-2/95 shadow-2xl shadow-black/90 backdrop-blur-xl ring-1 ring-white/10 animate-in fade-in zoom-in-95 duration-150">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-crimson-500 to-transparent" />

        <div className="border-b border-line/80 px-4 pt-4 pb-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-crimson-500 shadow-[0_0_8px_rgba(227,38,46,0.8)]" />
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-paper">
                SEARCH THE ARCHIVE
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="hidden text-[11px] text-faint sm:inline-block">Navigate with</span>
              <kbd className="rounded border border-line-2 bg-charcoal px-1.5 py-0.5 text-[10px] font-mono text-muted">
                ↑↓
              </kbd>
              <kbd className="rounded border border-line-2 bg-charcoal px-1.5 py-0.5 text-[10px] font-mono text-muted">
                ↵
              </kbd>
              <kbd className="rounded border border-line-2 bg-charcoal px-1.5 py-0.5 text-[10px] font-mono text-muted">
                ESC
              </kbd>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close command palette"
                className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-line text-muted hover:border-line-2 hover:bg-charcoal hover:text-paper cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mt-1 text-xs text-muted">
            Explore 100+ years of anime history, films, creators, legendary studios & milestones.
          </p>

          <div className="relative mt-3">
            <Search
              className={cn(
                "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
                loading ? "text-crimson-400" : "text-faint"
              )}
              aria-hidden
            />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded={isOpen}
              aria-controls={listboxId}
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search anime title, movie, director, studio, or event..."
              className="w-full rounded-xl border border-line bg-charcoal/80 py-2.5 pr-10 pl-10 text-sm text-paper placeholder:text-faint focus:border-crimson-500 focus:bg-charcoal focus:ring-1 focus:ring-crimson-500 focus:outline-none"
            />
            {loading ? (
              <Loader2 className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-crimson-400" />
            ) : query ? (
              <button
                type="button"
                onClick={() => {
                  handleQueryChange("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search input"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:text-paper cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          <div className="no-scrollbar mt-3 flex items-center gap-1.5 overflow-x-auto pb-0.5" role="tablist">
            {FILTER_CONFIG.map((filter) => {
              const isSelected = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    setHighlightedIndex(0);
                  }}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150 cursor-pointer",
                    isSelected
                      ? "bg-crimson-500 text-white shadow-[0_0_12px_rgba(227,38,46,0.4)]"
                      : "border border-line/80 bg-charcoal/60 text-muted hover:border-line hover:bg-charcoal hover:text-paper"
                  )}
                >
                  {filter.label}
                  {trimmedQuery.length >= 2 && results.length > 0 ? (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.2 text-[9px] font-semibold",
                        isSelected ? "bg-black/30 text-white" : "bg-charcoal-3 text-faint"
                      )}
                    >
                      {filter.id === "all"
                        ? results.length
                        : filter.id === "anime"
                        ? results.filter((r) => r.type === "anime" && r.format !== "MOVIE").length
                        : filter.id === "movies"
                        ? results.filter((r) => r.type === "anime" && r.format === "MOVIE").length
                        : results.filter((r) => r.type === filter.id.slice(0, -1)).length}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="flex-1 overflow-y-auto px-4 py-3 sm:px-6 space-y-4"
        >
          {error ? (
            <div className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-xs text-crimson-300">
              {error}
            </div>
          ) : null}

          {loading && results.length === 0 ? (
            <div className="space-y-2 py-2" aria-label="Loading search results">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border border-line/60 bg-charcoal/40 p-3 animate-pulse"
                >
                  <div className="h-9 w-9 rounded-lg bg-charcoal-3 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-1/3 rounded bg-charcoal-3" />
                    <div className="h-2.5 w-1/2 rounded bg-charcoal-3" />
                  </div>
                  <div className="h-4 w-12 rounded bg-charcoal-3" />
                </div>
              ))}
            </div>
          ) : null}

          {trimmedQuery.length >= 2 ? (
            <>
              {filteredResults.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line-2 bg-charcoal text-faint">
                    <Search className="h-5 w-5" />
                  </div>
                  <p className="mt-3 font-display text-sm font-semibold text-paper">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="mt-1 max-w-sm text-xs text-muted">
                    Try searching with broader terms, alternative English or Japanese titles, or explore
                    popular landmarks.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {POPULAR_SEARCHES.slice(0, 4).map((pop) => (
                      <button
                        key={pop.term}
                        type="button"
                        onClick={() => handleQueryChange(pop.term)}
                        className="rounded-lg border border-line bg-charcoal/80 px-2.5 py-1 text-xs text-muted hover:border-crimson-500 hover:text-paper cursor-pointer"
                      >
                        {pop.term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {groupedResults.map((group) => (
                    <div key={group.key} className="space-y-1.5">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                          {group.label}
                        </span>
                        <span className="text-[10px] font-mono text-faint">
                          {group.items.length} {group.items.length === 1 ? "match" : "matches"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {group.items.map((item) => {
                          const itemIndex = navigableItems.findIndex(
                            (n) => n.type === "search-result" && n.data === item
                          );
                          const isHighlighted = itemIndex === highlightedIndex;

                          return (
                            <button
                              key={`${item.type}-${item.slug}`}
                              type="button"
                              role="option"
                              aria-selected={isHighlighted}
                              data-highlighted={isHighlighted}
                              onClick={() => handleNavigate(getResultHref(item), item)}
                              onMouseEnter={() => setHighlightedIndex(itemIndex)}
                              className={cn(
                                "group flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-all duration-150 cursor-pointer",
                                isHighlighted
                                  ? "border-crimson-500/60 bg-charcoal-3 shadow-md ring-1 ring-crimson-500/20"
                                  : "border-line/60 bg-charcoal/40 hover:border-line hover:bg-charcoal"
                              )}
                            >
                              <div
                                className={cn(
                                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
                                  isHighlighted
                                    ? "border-crimson-500/50 bg-crimson-500/10"
                                    : "border-line-2 bg-charcoal"
                                )}
                              >
                                {getItemTypeIcon(item.type, item.format)}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="truncate text-xs font-semibold text-paper group-hover:text-crimson-300">
                                    {item.title}
                                  </span>
                                </div>
                                {item.subtitle ? (
                                  <p className="truncate text-[11px] text-muted">{item.subtitle}</p>
                                ) : null}
                              </div>

                              <div className="flex shrink-0 items-center gap-2">
                                <span className="rounded-md border border-line bg-charcoal px-2 py-0.5 text-[10px] font-medium text-muted">
                                  {getItemBadgeLabel(item)}
                                </span>
                                <CornerDownLeft
                                  className={cn(
                                    "h-3.5 w-3.5 text-crimson-400 transition-opacity",
                                    isHighlighted ? "opacity-100" : "opacity-0"
                                  )}
                                />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-5">
              {recentSearches.length > 0 ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                      <History className="h-3.5 w-3.5 text-faint" />
                      RECENT SEARCHES
                    </span>
                    <button
                      type="button"
                      onClick={clearAllRecents}
                      className="text-[10px] font-medium text-faint hover:text-crimson-400 transition-colors cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((rec, idx) => {
                      const isHighlighted = idx === highlightedIndex;
                      return (
                        <div
                          key={rec.id}
                          role="option"
                          aria-selected={isHighlighted}
                          data-highlighted={isHighlighted}
                          onClick={() => handleNavigate(rec.href, rec)}
                          onMouseEnter={() => setHighlightedIndex(idx)}
                          className={cn(
                            "group flex cursor-pointer items-center justify-between rounded-xl border p-2.5 transition-all duration-150",
                            isHighlighted
                              ? "border-crimson-500/60 bg-charcoal-3 shadow-md ring-1 ring-crimson-500/20"
                              : "border-line/60 bg-charcoal/40 hover:border-line hover:bg-charcoal"
                          )}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line-2 bg-charcoal">
                              {getItemTypeIcon(rec.type, rec.format)}
                            </div>
                            <div className="min-w-0">
                              <span className="truncate text-xs font-medium text-paper block">
                                {rec.title}
                              </span>
                              {rec.subtitle ? (
                                <span className="truncate text-[10.5px] text-muted block">
                                  {rec.subtitle}
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => removeRecentSearch(e, rec.href)}
                              aria-label={`Remove ${rec.title} from recents`}
                              className="rounded p-1 text-faint hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                            <CornerDownLeft
                              className={cn(
                                "h-3.5 w-3.5 text-crimson-400 transition-opacity",
                                isHighlighted ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 px-1">
                  <Flame className="h-3.5 w-3.5 text-crimson-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                    POPULAR IN THE ARCHIVE
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCHES.map((pop) => (
                    <button
                      key={pop.term}
                      type="button"
                      onClick={() => handleQueryChange(pop.term)}
                      className="group flex items-center gap-1.5 rounded-lg border border-line/80 bg-charcoal/60 px-2.5 py-1.5 text-xs text-muted transition-all hover:border-crimson-500 hover:bg-charcoal hover:text-paper cursor-pointer"
                    >
                      <Search className="h-3 w-3 text-faint group-hover:text-crimson-400" />
                      <span className="font-medium">{pop.term}</span>
                      <span className="rounded bg-charcoal-3 px-1 py-0.2 text-[9px] text-faint">
                        {pop.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                  EXPLORE ARCHIVE SECTIONS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {QUICK_LINKS.map((link, idx) => {
                    const offsetIndex =
                      recentSearches.length > 0 ? recentSearches.length + idx : idx;
                    const isHighlighted = offsetIndex === highlightedIndex;

                    return (
                      <button
                        key={link.href}
                        type="button"
                        role="option"
                        aria-selected={isHighlighted}
                        data-highlighted={isHighlighted}
                        onClick={() => handleNavigate(link.href, link)}
                        onMouseEnter={() => setHighlightedIndex(offsetIndex)}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl border p-2.5 text-left transition-all duration-150 cursor-pointer",
                          isHighlighted
                            ? "border-crimson-500/60 bg-charcoal-3 shadow-md ring-1 ring-crimson-500/20"
                            : "border-line/60 bg-charcoal/40 hover:border-line hover:bg-charcoal"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
                            isHighlighted
                              ? "border-crimson-500/50 bg-crimson-500/10 text-crimson-400"
                              : "border-line-2 bg-charcoal text-muted group-hover:text-paper"
                          )}
                        >
                          <link.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="truncate text-xs font-semibold text-paper group-hover:text-crimson-300">
                              {link.title}
                            </span>
                            <span className="rounded bg-charcoal-3 px-1.5 py-0.5 text-[9.5px] font-mono text-faint">
                              {link.badge}
                            </span>
                          </div>
                          <p className="truncate text-[10.5px] text-muted">{link.subtitle}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-line/80 bg-ink-2/90 px-4 py-2.5 sm:px-6 flex items-center justify-between text-[11px] text-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-line-2 bg-charcoal px-1 text-[10px] font-mono">
                ↑↓
              </kbd>{" "}
              select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-line-2 bg-charcoal px-1 text-[10px] font-mono">
                ↵
              </kbd>{" "}
              open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-line-2 bg-charcoal px-1 text-[10px] font-mono">
                ESC
              </kbd>{" "}
              dismiss
            </span>
          </div>
          <span className="hidden sm:inline-block text-[10px] tracking-wider text-faint font-mono uppercase">
            Anime Archive Museum
          </span>
        </div>
      </div>
    </div>
  );
}
