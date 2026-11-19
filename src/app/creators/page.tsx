import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCreators, getHallOfLegends } from "@/lib/data";
import { CreatorsArchiveView } from "@/components/three/scene-sections";

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

export default async function CreatorsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const { q } = (await searchParams) ?? {};
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
        description="Directors, artists, writers — the visionaries and craftspeople whose work shaped anime history."
      />

      <div className="mt-8">
        <CreatorsArchiveView
          creators={people}
          legends={legends}
          initialQuery={q}
        />
      </div>

      <p className="mt-12 text-xs text-faint">
        Creators include directors, animators, manga artists, and writers whose
        work shaped anime history.
      </p>
    </div>
  );
}
