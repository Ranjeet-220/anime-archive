import Link from "next/link";
import { Clapperboard, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { decadeOf } from "@/lib/utils";
import type { EraDto, MuseumAnimeDto } from "@/lib/types";
import {
  WORLD_DECADES,
  type WorldEventCategory,
} from "@/lib/world-history-data";

const CATEGORY_TONES: Record<WorldEventCategory, "crimson" | "warn" | "holo" | "default"> = {
  Politics: "crimson",
  Society: "warn",
  Technology: "holo",
  Culture: "default",
};

const MAX_WORKS_PER_DECADE = 6;

export function WorldAnimeComparison({ eras }: { eras: EraDto[] }) {
  const worksByDecade = new Map<number, MuseumAnimeDto[]>();
  for (const era of eras) {
    for (const anime of era.anime ?? []) {
      const decade = decadeOf(anime.year);
      if (decade === null) continue;
      const list = worksByDecade.get(decade) ?? [];
      list.push(anime);
      worksByDecade.set(decade, list);
    }
  }
  for (const list of worksByDecade.values()) {
    list.sort(
      (a, b) => (a.year ?? 0) - (b.year ?? 0) || a.title.localeCompare(b.title)
    );
  }

  const erasForDecade = (decade: number) =>
    eras.filter(
      (era) =>
        era.startYear <= decade + 9 &&
        (era.endYear ?? Number.POSITIVE_INFINITY) >= decade
    );

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <SectionHeading
        align="center"
        eyebrow="World history vs anime history"
        title="A Century in Parallel"
        description="Japan's modern century told twice — once through the events that shaped the nation and the world, once through the animated works that mirrored, escaped, and reimagined them."
      />

      <div
        role="tabpanel"
        aria-label="World and anime timeline comparison"
        className="mt-10"
      >
        <div className="mb-8 hidden grid-cols-[1fr_7rem_1fr] gap-x-8 font-display text-[11px] uppercase tracking-[0.3em] text-faint lg:grid">
          <p className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-crimson-400" aria-hidden />
            World history
          </p>
          <p className="text-center">Decade</p>
          <p className="flex items-center gap-2">
            <Clapperboard className="h-3.5 w-3.5 text-crimson-400" aria-hidden />
            Anime history
          </p>
        </div>

        <div className="space-y-12">
          {WORLD_DECADES.map(({ decade, events }) => {
            const eraList = erasForDecade(decade);
            const works = worksByDecade.get(decade)?.slice(0, MAX_WORKS_PER_DECADE) ?? [];

            return (
              <article
                key={decade}
                className="grid gap-6 lg:grid-cols-[1fr_7rem_1fr] lg:gap-x-8"
              >
                <div className="border-t border-line pt-5 lg:border-t-0 lg:pt-0">
                  <p className="mb-4 font-display text-[11px] uppercase tracking-[0.3em] text-faint lg:hidden">
                    World · {decade}s
                  </p>
                  <ul className="space-y-6">
                    {events.map((event) => (
                      <li key={`${event.year}-${event.title}`} className="relative pl-8">
                        <span
                          className="absolute left-0 top-1.5 h-2 w-2 rounded-full border border-crimson-500 bg-ink"
                          aria-hidden
                        />
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-display text-xs tabular-nums tracking-[0.1em] text-crimson-400">
                            {event.year}
                          </span>
                          <Badge tone={CATEGORY_TONES[event.category]}>
                            {event.category}
                          </Badge>
                        </div>
                        <h3 className="mt-1.5 font-display text-sm uppercase tracking-[0.08em] text-paper">
                          {event.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {event.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden lg:flex flex-col items-center py-2" aria-hidden>
                  <span className="h-3 w-3 rounded-full border border-crimson-500 bg-ink" />
                  <div className="w-px flex-1 bg-line-2" />
                  <p className="whitespace-nowrap font-display text-[11px] uppercase tracking-[0.3em] text-paper">
                    {decade}s
                  </p>
                  <div className="w-px flex-1 bg-line-2" />
                  <span className="h-3 w-3 rounded-full border border-crimson-500 bg-ink" />
                </div>

                <div className="border-t border-line pt-5 lg:border-t-0 lg:pt-0">
                  <p className="mb-4 font-display text-[11px] uppercase tracking-[0.3em] text-faint lg:hidden">
                    Anime · {decade}s
                  </p>
                  <div className="surface-card p-5">
                    {eraList.length ? (
                      <div className="space-y-4">
                        {eraList.map((era) => (
                          <div key={era.id}>
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <Link
                                href={`/timeline/${era.slug}`}
                                className="font-display text-sm uppercase tracking-[0.14em] text-paper transition-colors hover:text-crimson-300"
                              >
                                {era.name}
                              </Link>
                              <span className="font-display text-[10px] uppercase tracking-[0.18em] text-faint">
                                {era.period}
                              </span>
                            </div>
                            {era.description ? (
                              <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted">
                                {era.description}
                              </p>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className={eraList.length ? "mt-4 border-t border-line pt-4" : ""}>
                      <p className="font-display text-[10px] uppercase tracking-[0.3em] text-faint">
                        Landmark works
                      </p>
                      {works.length ? (
                        <ul className="mt-3 space-y-2">
                          {works.map((anime) => (
                            <li key={anime.slug}>
                              <Link
                                href={`/anime/${anime.slug}`}
                                className="group flex items-baseline justify-between gap-3"
                              >
                                <span className="flex min-w-0 items-baseline gap-2">
                                  <span className="shrink-0 font-display text-xs tabular-nums text-crimson-400">
                                    {anime.year}
                                  </span>
                                  <span className="truncate text-sm text-paper-2 transition-colors group-hover:text-crimson-300">
                                    {anime.title}
                                  </span>
                                </span>
                                {anime.japaneseTitle ? (
                                  <span className="shrink-0 font-jp text-xs text-faint">
                                    {anime.japaneseTitle}
                                  </span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-3 text-sm italic text-faint">
                          No works from this decade are archived yet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
