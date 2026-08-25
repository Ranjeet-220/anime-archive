import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimeCard } from "@/components/ui/anime-card";
import { getAnimeList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Archive Editorial Selections — curated collections of landmark anime, from the most influential works to the classics of each decade.",
  alternates: { canonical: "/collections" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const COLLECTIONS: { id: string; title: string; description: string; slugs: string[] }[] = [
  {
    id: "most-influential",
    title: "Most Influential Anime",
    description:
      "Works that shaped the medium and the wider world — from Tezuka's television blueprint to the global phenomenon of Attack on Titan.",
    slugs: [
      "akira",
      "astro-boy",
      "mobile-suit-gundam",
      "neon-genesis-evangelion",
      "spirited-away",
      "cowboy-bebop",
      "ghost-in-the-shell",
      "attack-on-titan",
    ],
  },
  {
    id: "changed-animation",
    title: "Anime That Changed Animation",
    description:
      "Where technique leapt forward — series that rewrote what Japanese animation could put on screen, from the first TV masterpieces to K-On's rebirth of the slice-of-life form.",
    slugs: [
      "astro-boy",
      "space-battleship-yamato",
      "mobile-suit-gundam",
      "akira",
      "neon-genesis-evangelion",
      "k-on",
    ],
  },
  {
    id: "classic-anime",
    title: "Classic Anime",
    description:
      "The foundational decades — from the first surviving short of 1917 through the rise of weekly television and the golden age of the 1970s and 80s.",
    slugs: [
      "namakura-gatana",
      "momotaro-divine-sea-warriors",
      "astro-boy",
      "kimba-the-white-lion",
      "space-battleship-yamato",
      "mobile-suit-gundam",
      "dragon-ball",
    ],
  },
  {
    id: "best-movies",
    title: "Best Anime Movies",
    description:
      "Theatrical landmarks every student of the medium should watch — from the first feature to the biggest box-office hits in anime history.",
    slugs: [
      "akira",
      "spirited-away",
      "ghost-in-the-shell",
      "your-name",
      "perfect-blue",
      "momotaro-divine-sea-warriors",
    ],
  },
  {
    id: "1980s-essentials",
    title: "1980s Essentials",
    description:
      "The decade that brought anime to the world — cyberpunk milestones, space operas, and the birth of the modern anime film.",
    slugs: ["akira", "dragon-ball"],
  },
  {
    id: "1990s-essentials",
    title: "1990s Essentials",
    description:
      "The '90s — psychological thrillers, cyberpunk philosophy, and the golden age of late-night television.",
    slugs: [
      "neon-genesis-evangelion",
      "cowboy-bebop",
      "ghost-in-the-shell",
      "perfect-blue",
      "sailor-moon",
    ],
  },
  {
    id: "2000s-essentials",
    title: "2000s Essentials",
    description:
      "The 2000s — shonen domination, philosophical epics, and the first Academy Award for Japanese animation.",
    slugs: [
      "spirited-away",
      "naruto",
      "death-note",
      "fullmetal-alchemist-brotherhood",
      "k-on",
    ],
  },
  {
    id: "modern-classics",
    title: "Modern Classics",
    description:
      "The 2010s and beyond — record-breaking blockbusters and contemporary masterpieces of the streaming era.",
    slugs: [
      "attack-on-titan",
      "your-name",
      "demon-slayer",
      "jujutsu-kaisen",
      "frieren-beyond-journeys-end",
    ],
  },
];

export default async function CollectionsPage() {
  const all = await getAnimeList({ perPage: 48 });
  const bySlug = new Map(all.items.map((i) => [i.slug, i]));
  const collections = COLLECTIONS.map((c) => ({
    ...c,
    items: c.slugs
      .map((s) => bySlug.get(s))
      .filter((x): x is NonNullable<typeof x> => x !== undefined),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Collections",
    description: "Archive Editorial Selections — curated collections of landmark anime.",
    url: `${SITE_URL}/collections`,
    isPartOf: { "@type": "WebSite", name: "Anime Archive", url: SITE_URL },
  };

  return (
    <div className="mx-auto max-w-[1720px] w-full space-y-14 px-4 py-10 sm:px-8 lg:px-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Collections" }]} />

      <SectionHeading
        eyebrow="Archive Editorial Selection"
        title="Collections"
        description="All collections are Archive Editorial Selections — curated opinions, not objective rankings."
      />

      {collections.map((collection) => (
        <section key={collection.id} className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-xl tracking-wide text-paper text-balance">
                {collection.title}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-muted">{collection.description}</p>
            </div>
            <span className="font-display text-xs uppercase tracking-[0.2em] text-faint">
              {collection.items.length} work{collection.items.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {collection.items.map((item) => (
              <AnimeCard key={item.slug} data={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
