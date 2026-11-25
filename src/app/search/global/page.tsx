import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { FORMAT_LABELS } from "@/lib/format";
import {
  GLOBAL_SEARCH_LIMIT,
  GLOBAL_SEARCH_MAX_LENGTH,
  GLOBAL_SEARCH_MIN_LENGTH,
  isGlobalAnimeSearchEnabled,
  searchGlobalAnime,
} from "@/lib/global-anime-search";

export const metadata: Metadata = {
  title: "Global Title Search",
  description: "Find anime by original, translated, and alternate titles.",
  robots: { index: false, follow: true },
};

export const runtime = "nodejs";

function validId(id: number | null): id is number {
  return id !== null && Number.isSafeInteger(id) && id > 0;
}

export default async function GlobalSearchPage({ searchParams }: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  if (!isGlobalAnimeSearchEnabled()) notFound();
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim().slice(0, GLOBAL_SEARCH_MAX_LENGTH) : "";
  const canSearch = query.length >= GLOBAL_SEARCH_MIN_LENGTH;
  const results = await searchGlobalAnime(query).catch((error: unknown) => {
    console.error("[global-anime-search]", error);
    return null;
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Search", href: "/search" }, { label: "Global title search" }]} />
      <h1 className="mt-4 font-display text-3xl text-paper">Global title search</h1>
      <p className="mt-2 text-sm text-muted">Search a community metadata snapshot by original, translated, or alternate title.</p>

      <form action="/search/global" role="search" className="mt-6 flex flex-wrap gap-2">
        <label htmlFor="global-title" className="sr-only">Anime title</label>
        <input
          id="global-title"
          name="q"
          type="search"
          defaultValue={query}
          minLength={GLOBAL_SEARCH_MIN_LENGTH}
          maxLength={GLOBAL_SEARCH_MAX_LENGTH}
          required
          placeholder="Search anime titles…"
          className="h-12 min-w-0 flex-1 rounded-lg border border-line bg-charcoal px-4 text-paper placeholder:text-faint focus-visible:outline-2 focus-visible:outline-holo-400"
        />
        <button type="submit" className="h-12 rounded bg-crimson-600 px-5 font-display text-sm font-semibold text-white hover:bg-crimson-700">
          Search
        </button>
      </form>

      {query && !canSearch ? <p className="mt-4 text-sm text-muted">Enter at least {GLOBAL_SEARCH_MIN_LENGTH} characters.</p> : null}

      {canSearch && (
        <div className="mt-8">
          {results === null ? (
            <EmptyState title="Global title search is unavailable" description="Try again later or return to archive search." />
          ) : results.length === 0 ? (
            <EmptyState title="No matching titles" description="Try another spelling or a shorter title." />
          ) : (
            <>
              <p className="text-sm text-muted">
                {results.length === GLOBAL_SEARCH_LIMIT ? `Top ${GLOBAL_SEARCH_LIMIT} matches` : `${results.length} ${results.length === 1 ? "match" : "matches"}`} for “{query}”
              </p>
              <ul className="mt-3 divide-y divide-line rounded-lg border border-line bg-charcoal">
                {results.map((anime) => {
                  const format = anime.format && Object.hasOwn(FORMAT_LABELS, anime.format)
                    ? FORMAT_LABELS[anime.format as keyof typeof FORMAT_LABELS]
                    : null;
                  const details = [anime.year || null, format].filter(Boolean).join(" · ");
                  return (
                    <li key={anime.id} className="flex flex-wrap items-center justify-between gap-x-5 px-4 py-3">
                      <div className="min-w-0">
                        <h2 className="font-display text-base text-paper" dir="auto">{anime.title}</h2>
                        {details && <p className="mt-0.5 text-xs text-muted">{details}</p>}
                        {anime.matchedTitle && <p className="mt-1 text-xs text-muted">Matched title · <bdi>{anime.matchedTitle}</bdi></p>}
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs">
                        {validId(anime.aniListId) && (
                          <a href={`https://anilist.co/anime/${anime.aniListId}`} aria-label={`${anime.title} on AniList`} className="inline-flex min-h-11 items-center text-holo-400 hover:underline">AniList</a>
                        )}
                        {validId(anime.malId) && (
                          <a href={`https://myanimelist.net/anime/${anime.malId}`} aria-label={`${anime.title} on MyAnimeList`} className="inline-flex min-h-11 items-center text-holo-400 hover:underline">MyAnimeList</a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}

      <p className="mt-8 text-xs text-muted">
        Metadata from <a href="https://github.com/manami-project/anime-offline-database" className="text-holo-400 hover:underline">Manami</a> (<a href="https://github.com/manami-project/anime-offline-database/blob/master/LICENSE" className="text-holo-400 hover:underline">ODbL and DbCL</a>).
        {" "}Cross-references from <a href="https://github.com/Fribb/anime-lists" className="text-holo-400 hover:underline">Fribb Anime-Lists</a>.
      </p>
    </div>
  );
}
