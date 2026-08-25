import Link from "next/link";
import type { Metadata } from "next";
import { Search, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading, Stat } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { getCharacters } from "@/lib/data";
import { pluralize } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Character Database",
  description:
    "A database of anime characters and their roles — from Astro Boy to the icons of the modern era, with voice actor information and the works they appear in.",
  alternates: { canonical: "/characters" },
  openGraph: {
    title: "Character Database — Anime Archive",
    description:
      "Anime characters documented in the archive, with roles, voice actors, and the works they appear in.",
    url: "/characters",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Character Database",
  description:
    "Anime characters and the works they appear in, documented for historical reference.",
  url: "/characters",
};

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const characters = await getCharacters(q?.trim() || undefined);

  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 py-8 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Characters" }]} />

      <SectionHeading
        eyebrow="Entities"
        title="Character Database"
        description="Anime characters and the works they appear in — documented from the anime themselves."
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Stat
          value={characters.length}
          label={pluralize(characters.length, "character documented")}
        />
        <form method="get" action="/characters" className="flex w-full max-w-sm gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden />
            <Input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search characters…"
              className="pl-9"
              aria-label="Search characters by name"
            />
          </div>
          <Button type="submit" variant="outline" size="sm">
            Search
          </Button>
        </form>
      </div>

      {characters.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No characters found"
          description={
            q
              ? `No characters match "${q}". Try a different search term.`
              : "No characters are documented yet."
          }
          action={
            q ? (
              <Link href="/characters" className="text-xs text-holo-400 hover:underline">
                Clear search
              </Link>
            ) : undefined
          }
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {characters.map((c) => (
            <li key={c.id}>
              <Link
                href={`/character/${c.slug}`}
                className="group surface-card lift flex h-full flex-col gap-3 p-5"
              >
                <div>
                  <h3 className="font-display text-lg text-paper group-hover:text-crimson-300 transition-colors">
                    {c.name}
                  </h3>
                  {c.japaneseName ? (
                    <p className="mt-0.5 font-jp text-sm text-faint">
                      {c.japaneseName}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {c.role ? <Badge tone="neutral">{c.role}</Badge> : null}
                  {c.voiceActorName ? (
                    <Badge tone="holo">VA: {c.voiceActorName}</Badge>
                  ) : null}
                </div>
                <p className="mt-auto text-xs text-muted">
                  {c.anime ? (
                    <>
                      Appears in{" "}
                      <span className="text-paper-2 group-hover:text-crimson-300 transition-colors">
                        {c.anime.title}
                      </span>
                      {c.anime.year ? ` (${c.anime.year})` : null}
                    </>
                  ) : (
                    "No work documented yet."
                  )}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-xs text-faint">
        Character biographies are informational and derived from the anime
        themselves; voice actor names reflect Japanese casts.
      </p>
    </div>
  );
}
