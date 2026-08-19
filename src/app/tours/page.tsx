import type { Metadata } from "next";
import Link from "next/link";
import { Compass, MapPinned } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { getTours } from "@/lib/data";

export const metadata: Metadata = {
  title: "Guided Tours",
  description:
    "Curated journeys through anime history — themed walks from the first shorts of 1917 to the streaming era, linking the archive's records.",
  alternates: { canonical: "/tours" },
};

export default async function ToursPage() {
  const tours = await getTours();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Guided Tours" }]} />

      <div className="mt-4">
        <SectionHeading
          eyebrow="Curated Journeys"
          title="GUIDED TOURS — Walks Through Anime History"
          description="The archive's curators have arranged its records into themed journeys. Each tour is a numbered itinerary — follow the steps in order, or wander off the path."
        />
      </div>

      {tours.length === 0 ? (
        <EmptyState
          title="No tours archived yet"
          description="The curators are still charting routes. Check back soon."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {tours.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tour/${tour.slug}`}
              className="lift group surface-card flex flex-col p-5 transition-colors hover:border-crimson-500/50"
            >
              <div className="flex items-start justify-between gap-3">
                <Compass
                  className="h-5 w-5 text-holo-400 transition-colors group-hover:text-holo-300"
                  aria-hidden
                />
                <span className="inline-flex items-center gap-1 rounded border border-line-2 px-2 py-0.5 text-[11px] font-medium tracking-wide text-muted">
                  <MapPinned className="h-3 w-3" aria-hidden />
                  {tour.stepCount} stop{tour.stepCount === 1 ? "" : "s"}
                </span>
              </div>
              <h2 className="mt-4 font-display text-lg leading-snug text-paper group-hover:text-crimson-300 transition-colors">
                {tour.title}
              </h2>
              {tour.description ? (
                <p className="mt-2 line-clamp-3 text-sm text-muted">{tour.description}</p>
              ) : null}
              <p className="mt-4 pt-3 font-display text-[11px] uppercase tracking-[0.2em] text-faint border-t border-line">
                Begin the journey
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}