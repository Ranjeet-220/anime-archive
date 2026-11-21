import Link from "next/link";
import type { Metadata } from "next";
import { Tags } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { getGenres } from "@/lib/data";
import { pluralize } from "@/lib/utils";
import { GenreSpotlight } from "./genre-spotlight";

export const metadata: Metadata = {
  title: "Genres",
  description:
    "Browse anime by genre — action, science fiction, romance, horror, and more. Genre classification is editorial; a work may belong to multiple genres.",
  alternates: { canonical: "/genres" },
  openGraph: {
    title: "Genres — Anime Archive",
    description:
      "Browse the archive by genre: action, science fiction, romance, horror, and more.",
    url: "/genres",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Genres",
  description:
    "An editorial classification of anime genres; a work may belong to multiple genres.",
  url: "/genres",
};

export default async function GenresPage() {
  const genres = await getGenres();

  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 py-8 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Genres" }]} />

      <SectionHeading
        title="Genres"
        description="Explore anime through its genres, from action to quiet character dramas."
      />

      <GenreSpotlight genres={genres} />

      <h2 id="genres" className="mb-6 font-display text-xl text-paper">
        All genres <span className="ml-2 text-base text-muted">{genres.length}</span>
      </h2>

      {genres.length === 0 ? (
        <EmptyState
          icon={Tags}
          title="No genres classified"
          description="The genre index is empty. Check back soon."
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {genres.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/anime?genre=${g.slug}`}
                className="group surface-card lift flex h-full flex-col gap-3 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg text-paper group-hover:text-crimson-300 transition-colors">
                    {g.name}
                  </h3>
                  <Badge tone="crimson">
                    {g.animeCount} {pluralize(g.animeCount, "work")}
                  </Badge>
                </div>
                {g.japaneseName ? (
                  <p className="font-jp text-sm text-faint">{g.japaneseName}</p>
                ) : null}
                {g.description ? (
                  <p className="mt-auto text-xs leading-relaxed text-muted">
                    {g.description}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-xs text-faint">
        Genre classification is editorial; a work may belong to multiple genres.
      </p>
    </div>
  );
}
