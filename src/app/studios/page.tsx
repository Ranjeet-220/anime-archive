import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { getStudios, getStudioArchive } from "@/lib/data";
import { StudiosArchiveView } from "@/components/three/studios-archive-view";

export const metadata: Metadata = {
  title: "Studio Archive",
  description:
    "Documentation of the animation studios that built anime history — from Toei and Mushi Production to Studio Ghibli and MAPPA — with founding years, status, and major works.",
  alternates: { canonical: "/studios" },
  openGraph: {
    title: "Studio Archive — Anime Archive",
    description:
      "A historical archive of the animation studios behind anime's greatest works, from the 1950s to today.",
    url: "/studios",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Studio Archive",
  description:
    "A historical archive of Japanese animation studios, their founding years, status, and documented works.",
  url: "/studios",
};

export default async function StudiosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const studios = await getStudios();
  const studioArchive = await getStudioArchive();

  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 py-8 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Studios" }]} />

      <SectionHeading
        eyebrow="Entities"
        title="Studio Archive"
        description="The animation studios and production houses behind the history of Japanese animation — documented for historical purposes. This archive is not affiliated with any studio."
      />

      <div className="mt-8">
        <StudiosArchiveView
          studios={studios}
          studioArchive={studioArchive}
          initialQuery={q}
        />
      </div>

      <p className="mt-12 text-xs text-faint">
        Studios are documented for historical purposes; the archive is not
        affiliated with any studio.
      </p>
    </div>
  );
}
