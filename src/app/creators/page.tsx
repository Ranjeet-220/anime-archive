import Link from "next/link";
import type { Metadata } from "next";
import { Clapperboard } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { getCreators, getHallOfLegends } from "@/lib/data";
import { pluralize } from "@/lib/utils";
import { HallOfLegendsSection } from "@/components/three/scene-sections";

export const metadata: Metadata = {
  title: "Creator Archive",
  description:
    "Directors, animators, manga artists, and writers whose work shaped anime history — from Osamu Tezuka and Hayao Miyazaki to the visionaries of today.",
  alternates: { canonical: "/creators" },
  openGraph: {
    title: "Creator Archive — Anime Archive",
    description:
      "A historical archive of the directors, artists, and writers behind Japanese animation.",
    url: "/creators",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Creator Archive",
  description:
    "Directors, animators, manga artists, and writers whose work shaped anime history.",
  url: "/creators",
};

function years(bornYear: number | null, diedYear: number | null): string | null {
  if (bornYear && diedYear) return `${bornYear}–${diedYear}`;
  if (bornYear) return `b. ${bornYear}`;
  if (diedYear) return `d. ${diedYear}`;
  return null;
}

export default async function CreatorsPage() {
  const [people, legends] = await Promise.all([getCreators(), getHallOfLegends()]);

  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 py-8 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Creators" }]} />

      <SectionHeading
        eyebrow="People"
        title="Creator Archive"
        description="Directors, artists, writers — the people whose work shaped anime history."
      />

      {legends.length > 1 ? (
        <section aria-label="Hall of Legends" className="mb-10">
          <div className="rounded-lg border border-line bg-charcoal/40 p-1">
            <HallOfLegendsSection people={legends} />
          </div>
        </section>
      ) : null}

      <h2 id="creators" className="font-display text-sm uppercase tracking-[0.3em] text-faint">
        All creators
      </h2>

      {people.length === 0 ? (
        <EmptyState
          icon={Clapperboard}
          title="No creators documented"
          description="The creator archive is empty. Check back soon."
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((p) => {
            const span = years(p.bornYear, p.diedYear);
            const workCount = p._count.directed + p._count.created;
            return (
              <li key={p.id}>
                <Link
                  href={`/creator/${p.slug}`}
                  className="group surface-card lift flex h-full flex-col gap-3 p-5"
                >
                  <div>
                    <h3 className="font-display text-lg text-paper group-hover:text-crimson-300 transition-colors">
                      {p.name}
                    </h3>
                    {p.japaneseName ? (
                      <p className="mt-0.5 font-jp text-sm text-faint">
                        {p.japaneseName}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {span ? <Badge tone="neutral">{span}</Badge> : null}
                    {workCount > 0 ? (
                      <Badge tone="default">
                        {workCount} {pluralize(workCount, "work")}
                      </Badge>
                    ) : null}
                  </div>
                  {p.role ? (
                    <p className="mt-auto text-xs leading-relaxed text-muted">
                      {p.role}
                    </p>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-8 text-xs text-faint">
        Creators include directors, animators, manga artists, and writers whose
        work shaped anime history.
      </p>
    </div>
  );
}
