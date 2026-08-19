import type { Metadata } from "next";
import { getHallOfLegends, getStudioArchive, getTimelineData } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { TimelineExperience } from "@/components/three/timeline-experience";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "The complete timeline of anime history: seven eras from the first animated shorts of 1917 to the modern streaming age, with studios, creators, and landmark works.",
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
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-20 sm:px-6">
      <Breadcrumbs items={[{ label: "Timeline" }]} />

      <header className="mb-8 mt-6">
        <p className="mb-2 font-display text-[11px] uppercase tracking-[0.34em] text-crimson-400">
          Chronological index
        </p>
        <h1 className="font-display text-4xl uppercase tracking-[0.12em] text-paper text-balance sm:text-5xl">
          Timeline of Anime History
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          From the first animated shorts of 1917 to the streaming era — seven
          eras, their studios, their creators, and the works that defined
          them. Explore the floating timeline in 3D, or browse the classic
          chronological view.
        </p>
      </header>

      <TimelineExperience
        eras={eras}
        studioSlugs={studioSlugs}
        creatorSlugs={creatorSlugs}
      />
    </div>
  );
}
