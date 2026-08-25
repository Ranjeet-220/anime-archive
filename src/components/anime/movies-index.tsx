"use client";

import { useMemo, useState } from "react";
import { AnimeCard, type AnimeCardData } from "@/components/ui/anime-card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn, decadeOf } from "@/lib/utils";

export function MoviesIndex({ movies }: { movies: AnimeCardData[] }) {
  const decades = useMemo(() => {
    const set = new Set<number>();
    for (const m of movies) {
      const d = decadeOf(m.year);
      if (d !== null) set.add(d);
    }
    return [...set].sort((a, b) => a - b);
  }, [movies]);

  const [decade, setDecade] = useState<number | null>(null);

  const filtered = decade === null ? movies : movies.filter((m) => decadeOf(m.year ?? null) === decade);
  const classic = filtered.filter((m) => m.year != null && m.year < 1990);
  const modern = filtered.filter((m) => m.year == null || m.year >= 1990);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter films by decade">
        <button
          type="button"
          onClick={() => setDecade(null)}
          className={cn(
            "rounded border px-3 py-1.5 font-display text-xs uppercase tracking-wider transition-colors",
            decade === null
              ? "border-crimson-500 bg-crimson-500/10 text-crimson-300"
              : "border-line text-muted hover:border-line-2 hover:text-paper"
          )}
        >
          All
        </button>
        {decades.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDecade(d)}
            aria-pressed={decade === d}
            className={cn(
              "rounded border px-3 py-1.5 font-display text-xs uppercase tracking-wider transition-colors",
              decade === d
                ? "border-crimson-500 bg-crimson-500/10 text-crimson-300"
                : "border-line text-muted hover:border-line-2 hover:text-paper"
            )}
          >
            {d}s
          </button>
        ))}
      </div>

      <p className="mt-4 font-display text-xs uppercase tracking-[0.2em] text-muted">
        {filtered.length} theatrical film{filtered.length === 1 ? "" : "s"} archived
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No films archived in this decade" description="Try another decade or clear the filter." />
        </div>
      ) : (
        <div className="mt-8 space-y-12">
          <section>
            <h2 className="font-display text-lg text-paper tracking-wide">
              CLASSIC FILMS <span className="text-faint">— pre-1990</span>
            </h2>
            <p className="mt-1 text-sm text-muted">
              Pioneering shorts and features that built theatrical Japanese animation, from the first surviving film of 1917 to the landmark 1980s.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {classic.map((m) => (
                <AnimeCard key={m.slug} data={m} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg text-paper tracking-wide">
              MODERN FILMS <span className="text-faint">— 1990 to present</span>
            </h2>
            <p className="mt-1 text-sm text-muted">
              The contemporary theatrical era — international festival winners, record-breaking blockbusters, and award-winning masterpieces of the medium.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {modern.map((m) => (
                <AnimeCard key={m.slug} data={m} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
