import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { MoviesIndex } from "@/components/anime/movies-index";
import { getMovies } from "@/lib/data";
import type { AnimeCardData } from "@/components/ui/anime-card";

export const metadata: Metadata = {
  title: "Anime Movies",
  description:
    "The Anime Archive's theatrical film index — from the first surviving short of 1917 to modern award-winning landmarks, grouped by era.",
  alternates: { canonical: "/movies" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function MoviesPage() {
  const movies = await getMovies();
  const cards: AnimeCardData[] = movies.map((m) => ({ ...m, format: "MOVIE" }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Anime Movies",
    description: "Theatrical anime films archived in the Anime Archive.",
    url: `${SITE_URL}/movies`,
    isPartOf: { "@type": "WebSite", name: "Anime Archive", url: SITE_URL },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Movies" }]} />

      <div className="mt-4">
        <SectionHeading
          eyebrow="Theatrical Works"
          title="ANIME MOVIES — Theatrical Films Archived"
          description="Every theatrical film in the archive, from the first animated shorts of 1917 to the modern box-office landmarks. Films are grouped into Classic (pre-1990) and Modern (1990 to present) eras — many of them award-winning."
        />
      </div>

      <MoviesIndex movies={cards} />
    </div>
  );
}
