"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Loader, Search as SearchIcon, X } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import type { SearchResultDto } from "@/lib/types";

const GROUP_LABELS: Record<SearchResultDto["type"], string> = {
  anime: "Anime",
  character: "Characters",
  studio: "Studios",
  creator: "Creators",
  event: "Events",
};

const GROUP_ORDER: SearchResultDto["type"][] = ["anime", "character", "studio", "creator", "event"];

const POPULAR = [
  { label: "Gundam", href: "/anime?q=Gundam" },
  { label: "Ghibli", href: "/anime?q=Ghibli" },
  { label: "Tezuka", href: "/anime?q=Tezuka" },
  { label: "Akira", href: "/anime?q=Akira" },
  { label: "Evangelion", href: "/anime?q=Evangelion" },
];

function resultHref(r: SearchResultDto): string {
  switch (r.type) {
    case "anime":
      return `/anime/${r.slug}`;
    case "character":
      return `/character/${r.slug}`;
    case "studio":
      return `/studio/${r.slug}`;
    case "creator":
      return `/creator/${r.slug}`;
    case "event":
      return "/timeline";
  }
}

export function SearchPage({ globalSearchEnabled }: { globalSearchEnabled: boolean }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reqId = useRef(0);

  const q = query.trim();

  function handleQueryChange(value: string) {
    setQuery(value);
    if (value.trim().length < 2) {
      reqId.current++;
      setResults([]);
      setLoading(false);
      setError(null);
    }
  }

  useEffect(() => {
    if (q.length < 2) return;
    const id = ++reqId.current;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        if (!res.ok) throw new Error("Search failed");
        const data = (await res.json()) as { results?: SearchResultDto[] };
        if (reqId.current === id) setResults(data.results ?? []);
      } catch {
        if (reqId.current === id) {
          setError("Search failed. Please try again.");
          setResults([]);
        }
      } finally {
        if (reqId.current === id) setLoading(false);
      }
    }, 300);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [q]);

  const groups = GROUP_ORDER.map((type) => ({ type, items: results.filter((r) => r.type === type) })).filter(
    (g) => g.items.length > 0
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-paper text-balance">Search the Archive</h1>
      <p className="mt-2 text-sm text-muted">Anime, characters, studios, creators, and historical events — all in one search.</p>

      <div className="relative mt-6">
        <SearchIcon
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
          aria-hidden
        />
        <input
          autoFocus
          type="search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search titles, names, studios…"
          aria-label="Search the archive"
          className="h-12 w-full rounded-lg border border-line bg-charcoal pl-10 pr-10 text-base text-paper placeholder:text-faint focus:border-holo-500/60 focus:outline-none focus:ring-1 focus:ring-holo-500/40 transition-colors"
        />
        {q.length > 0 ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-faint transition-colors hover:text-paper"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {globalSearchEnabled && (
        <Link
          href={{ pathname: "/search/global", query: q ? { q } : undefined }}
          prefetch={false}
          className="mt-3 inline-flex min-h-11 items-center text-sm text-holo-400 hover:underline"
        >
          Search the global anime catalog
        </Link>
      )}

      {loading ? (
        <p className="mt-6 flex items-center gap-2 text-sm text-faint">
          <Loader className="h-4 w-4 animate-spin" aria-hidden />
          Searching the archive…
        </p>
      ) : null}

      {!loading && q.length < 2 ? (
        <div className="mt-8">
          <p className="text-sm text-muted">Type at least 2 characters to search the archive.</p>
          <h2 className="mt-8 font-display text-xs uppercase tracking-[0.25em] text-muted">Popular searches</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {POPULAR.map((p) => (
              <Link
                key={p.label}
                href={p.href}
                className="rounded border border-line bg-charcoal px-3 py-1.5 text-sm text-paper-2 transition-colors hover:border-crimson-500/50 hover:text-crimson-300"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {!loading && error ? <p className="mt-6 text-sm text-danger">{error}</p> : null}

      {!loading && !error && q.length >= 2 && results.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No results found"
            description={`Nothing in the archive matched “${q}”. Try a different spelling or a broader term.`}
          />
        </div>
      ) : null}

      {!loading && groups.length > 0 ? (
        <div className="mt-8 space-y-8">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-faint">
            {results.length} result{results.length === 1 ? "" : "s"} for “{q}”
          </p>
          {groups.map((group) => (
            <section key={group.type}>
              <h2 className="font-display text-xs uppercase tracking-[0.25em] text-crimson-400">
                {GROUP_LABELS[group.type]}
              </h2>
              <ul className="mt-3 divide-y divide-line rounded-lg border border-line bg-charcoal">
                {group.items.map((r) => (
                  <li key={`${r.type}-${r.slug}`}>
                    <Link
                      href={resultHref(r)}
                      className="group flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-charcoal-2"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm text-paper transition-colors group-hover:text-crimson-300">
                          {r.title}
                        </span>
                        {r.subtitle ? <span className="mt-0.5 block truncate text-xs text-faint">{r.subtitle}</span> : null}
                      </span>
                      {r.year ? <span className="shrink-0 text-xs text-faint">{r.year}</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : null}
    </div>
  );
}
