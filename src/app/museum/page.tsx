import type { Metadata } from "next";
import { Info } from "lucide-react";
import { getMuseumData } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { MuseumExperience } from "@/components/three/museum-experience";

export const metadata: Metadata = {
  title: "The 3D Museum",
  description:
    "Walk through the Anime Archive's 3D museum: seven rooms, one per era of Japanese animation, filled with floating exhibits from 1917 to today.",
  alternates: { canonical: "/museum" },
};

export default async function MuseumPage() {
  const eras = await getMuseumData();

  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 pt-8 pb-20 sm:px-8 lg:px-12">
      <Breadcrumbs items={[{ label: "Museum" }]} />

      <header className="mb-8 mt-6">
        <p className="mb-2 font-display text-[11px] uppercase tracking-[0.34em] text-crimson-400">
          Immersive gallery
        </p>
        <h1 className="font-display text-4xl uppercase tracking-[0.12em] text-paper text-balance sm:text-5xl">
          The 3D Museum
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Seven rooms in a line — one for each era of Japanese animation.
          Drag to orbit, use the arrow keys or the controls to move between
          rooms, and click an exhibit to open it. A floor plan with the same
          content is always available below the experience.
        </p>
      </header>

      <MuseumExperience eras={eras} />

      <aside className="mx-auto mt-14 flex max-w-2xl items-start gap-3 rounded-lg border border-line bg-charcoal/60 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-holo-300" aria-hidden />
        <p className="text-xs leading-relaxed text-muted">
          <span className="font-display text-[11px] uppercase tracking-[0.2em] text-paper">
            Accessibility note
          </span>
          <br />
          The 3D experience is an alternative way to browse the archive, not
          the only one. If you prefer reduced motion, are using assistive
          technology, or the scene does not render on your device, choose
          “Skip 3D Experience” to view the same content as a 2D floor plan.
          Every exhibit remains reachable through the classic pages.
        </p>
      </aside>
    </div>
  );
}
