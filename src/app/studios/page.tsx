import Link from "next/link";
import type { Metadata } from "next";
import { Building2, Search } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading, Stat } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { getStudios, getStudioArchive } from "@/lib/data";
import { pluralize } from "@/lib/utils";
import { StudioArchiveSection } from "@/components/three/scene-sections";

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
  const term = q?.trim().toLowerCase();

  const studios = await getStudios();
  const studioArchive = await getStudioArchive();
  const filtered = term
    ? studios.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.japaneseName?.toLowerCase().includes(term)
      )
    : studios;

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

      {studioArchive.length > 1 ? (
        <section aria-label="Studio Archive 3D" className="mb-10">
          <div className="rounded-lg border border-line bg-charcoal/40 p-1">
            <StudioArchiveSection studios={studioArchive} />
          </div>
        </section>
      ) : null}

      <div id="studios" className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Stat value={filtered.length} label={pluralize(filtered.length, "studio documented")} />
        <form method="get" action="/studios" className="flex w-full max-w-sm gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden />
            <Input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Filter by name…"
              className="pl-9"
              aria-label="Filter studios by name"
            />
          </div>
          <Button type="submit" variant="outline" size="sm">
            Filter
          </Button>
        </form>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No studios found"
          description={
            term
              ? `No studios match "${q}". Try a different search term.`
              : "No studios are documented yet."
          }
          action={
            <Link href="/studios" className="text-xs text-holo-400 hover:underline">
              Clear filter
            </Link>
          }
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <li key={s.id}>
              <Link
                href={`/studio/${s.slug}`}
                className="group surface-card lift flex h-full flex-col gap-3 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg text-paper group-hover:text-crimson-300 transition-colors">
                    {s.name}
                  </h3>
                  {s.foundedYear ? (
                    <Badge tone="neutral">{s.foundedYear}</Badge>
                  ) : null}
                </div>
                {s.japaneseName ? (
                  <p className="font-jp text-sm text-faint">{s.japaneseName}</p>
                ) : null}
                <div className="mt-auto flex flex-wrap items-center gap-2">
                  <Badge
                    tone={s.status?.toLowerCase().startsWith("active") ? "ok" : "warn"}
                  >
                    {s.status ?? "Status unknown"}
                  </Badge>
                  <Badge tone="default">
                    {s._count.anime} {pluralize(s._count.anime, "work")}
                  </Badge>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-xs text-faint">
        Studios are documented for historical purposes; the archive is not
        affiliated with any studio.
      </p>
    </div>
  );
}
