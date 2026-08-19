import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Award, Film, MapPin, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { AnimeCard } from "@/components/ui/anime-card";
import { getPersonBySlug } from "@/lib/data";
import { isValidUrl, pluralize } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = await getPersonBySlug(slug);
  if (!person) return { title: "Creator not found" };
  return {
    title: person.name,
    description: person.biography
      ? person.biography.split("\n\n")[0].slice(0, 160)
      : `Profile of ${person.name}${person.role ? `, ${person.role}` : ""}.`,
    alternates: { canonical: `/creator/${person.slug}` },
  };
}

function years(bornYear: number | null, diedYear: number | null): string | null {
  if (bornYear && diedYear) return `${bornYear}–${diedYear}`;
  if (bornYear) return `b. ${bornYear}`;
  if (diedYear) return `d. ${diedYear}`;
  return null;
}

export default async function CreatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = await getPersonBySlug(slug);
  if (!person) notFound();

  const span = years(person.bornYear, person.diedYear);
  const website = person.website && isValidUrl(person.website) ? person.website : null;
  const directedCount = person.directed.length;
  const createdCount = person.created.length;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Creators", item: "/creators" },
      { "@type": "ListItem", position: 3, name: person.name, item: `/creator/${person.slug}` },
    ],
  };

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    ...(person.japaneseName ? { alternateName: person.japaneseName } : {}),
    ...(person.role ? { jobTitle: person.role } : {}),
    ...(person.bornYear ? { birthDate: String(person.bornYear) } : {}),
    ...(person.diedYear ? { deathDate: String(person.diedYear) } : {}),
    ...(person.birthplace ? { birthPlace: person.birthplace } : {}),
    ...(website ? { url: website } : {}),
    description: person.biography?.split("\n\n")[0] ?? undefined,
  };

  const section = (label: string, content: string | null) =>
    content ? (
      <section>
        <p className="mb-3 font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">
          {label}
        </p>
        <div className="editorial">{content}</div>
      </section>
    ) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <Breadcrumbs
        items={[{ label: "Creators", href: "/creators" }, { label: person.name }]}
      />

      <header className="relative overflow-hidden surface-panel film-grain px-6 py-10 sm:px-10">
        <div className="absolute inset-0 vignette" aria-hidden />
        <div className="relative">
          <p className="mb-3 font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">
            Creator Profile
          </p>
          <h1 className="font-display text-3xl text-paper text-balance sm:text-4xl">
            {person.name}
          </h1>
          {person.japaneseName ? (
            <p className="mt-2 font-jp text-lg text-muted">{person.japaneseName}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {span ? <Badge>{span}</Badge> : null}
            {person.role ? <Badge tone="holo">{person.role}</Badge> : null}
            {person.birthplace ? (
              <Badge tone="neutral">
                <MapPin className="h-3 w-3" aria-hidden />
                {person.birthplace}
              </Badge>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mt-10 space-y-10">
        {section("Biography", person.biography)}
        {section("Career", person.career)}
        {section("Major Works", person.majorWorks)}

        {person.awards ? (
          <section>
            <p className="mb-3 flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">
              <Award className="h-3.5 w-3.5" aria-hidden />
              Awards
            </p>
            <div className="editorial">{person.awards}</div>
          </section>
        ) : null}

        {person.contribution ? (
          <section className="surface-panel edge-crimson px-6 py-5">
            <p className="mb-3 flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">
              <Star className="h-3.5 w-3.5" aria-hidden />
              Historical Contribution
            </p>
            <div className="editorial">{person.contribution}</div>
          </section>
        ) : null}

        {person.directed.length > 0 ? (
          <section>
            <SectionHeading
              eyebrow="Filmography"
              title="Directed"
              description={`${directedCount} ${pluralize(directedCount, "title")} directed by ${person.name}.`}
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {person.directed.map((a) => (
                <AnimeCard key={a.slug} data={a} />
              ))}
            </div>
          </section>
        ) : null}

        {person.created.length > 0 ? (
          <section>
            <SectionHeading
              eyebrow="Filmography"
              title="Created"
              description={`${createdCount} ${pluralize(createdCount, "original work")} credited to ${person.name}.`}
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {person.created.map((a) => (
                <AnimeCard key={a.slug} data={a} />
              ))}
            </div>
          </section>
        ) : null}

        {person.credits.length > 0 ? (
          <section>
            <SectionHeading
              eyebrow="Filmography"
              title="Other Credits"
              description="Staff and special credits across the archive."
            />
            <ul className="surface-card divide-y divide-line overflow-hidden rounded">
              {person.credits.map((c) => (
                <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                  <Link
                    href={`/anime/${c.anime.slug}`}
                    className="font-display text-sm text-paper hover:text-crimson-300 transition-colors"
                  >
                    {c.anime.title}
                  </Link>
                  <div className="flex items-center gap-2">
                    {c.anime.year ? (
                      <span className="text-xs text-faint">{c.anime.year}</span>
                    ) : null}
                    <Badge tone="neutral">{c.role}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {person.studios.length > 0 ? (
          <section>
            <SectionHeading
              eyebrow="Affiliation"
              title="Associated Studios"
              description={`Studios ${person.name} has worked with.`}
            />
            <ul className="surface-card divide-y divide-line overflow-hidden rounded">
              {person.studios.map((sp) => (
                <li
                  key={sp.id}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
                >
                  <Link
                    href={`/studio/${sp.studio.slug}`}
                    className="font-display text-sm text-paper hover:text-crimson-300 transition-colors"
                  >
                    {sp.studio.name}
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-faint">
                    {sp.studio.japaneseName ? (
                      <span className="font-jp">{sp.studio.japaneseName}</span>
                    ) : null}
                    {sp.role ? <Badge tone="neutral">{sp.role}</Badge> : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {directedCount === 0 && createdCount === 0 && person.credits.length === 0 ? (
          <EmptyState
            icon={Film}
            title="No works documented"
            description={`We have no recorded works for ${person.name} at this time.`}
          />
        ) : null}
      </div>
    </div>
  );
}
