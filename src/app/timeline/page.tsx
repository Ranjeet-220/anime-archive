import type { Metadata } from "next";
import { getHallOfLegends, getStudioArchive, getTimelineData } from "@/lib/data";
import { HistoryComparison } from "@/components/timeline/history-comparison";
import { WorldAnimeComparison } from "@/components/timeline/world-anime-comparison";
import { TimelineCinematic } from "@/components/timeline/timeline-cinematic";

export const metadata: Metadata = {
  title: "Anime Timeline — Historical Decades",
  description:
    "The complete timeline of anime history: seven eras from the first animated shorts of 1917 to the modern streaming age — set against a century of world history, with landmark works, studios, and creators.",
  alternates: { canonical: "/timeline" },
};

export default async function TimelinePage() {
  const [eras, studios, people] = await Promise.all([
    getTimelineData(),
    getStudioArchive(),
    getHallOfLegends(),
  ]);

  const studioSlugs = Object.fromEntries(studios.map((s) => [s.name, s.slug]));
  const creatorSlugs = Object.fromEntries(people.map((p) => [p.name, p.slug]));

  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 pt-8 pb-24 sm:px-8 lg:px-12 bg-ink flex flex-col gap-16">
      {/* 1. Cinematic Timeline Experience matching reference */}
      <TimelineCinematic />

      {/* 2. Side-by-side World History & Industry Comparison */}
      <section className="pt-8 border-t border-[#25282C]">
        <div className="mb-6">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-crimson-400">
            CHRONOLOGICAL PARALLEL
          </p>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-paper sm:text-3xl">
            WORLD HISTORY & ANIME COMPARISON
          </h2>
          <p className="mt-1 text-sm text-[#9A9A9A] max-w-2xl">
            Explore how major world events, technological milestones, and artistic movements aligned with the evolution of Japanese animation.
          </p>
        </div>

        <HistoryComparison
          eras={eras}
          studioSlugs={studioSlugs}
          creatorSlugs={creatorSlugs}
          comparison={<WorldAnimeComparison eras={eras} />}
        />
      </section>
    </div>
  );
}
