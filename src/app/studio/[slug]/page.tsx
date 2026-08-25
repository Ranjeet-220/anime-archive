import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, Landmark, MapPin, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { AnimeCard } from "@/components/ui/anime-card";
import { getStudioBySlug } from "@/lib/data";
import { isValidUrl, pluralize } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const studio = await getStudioBySlug(slug);
  if (!studio) return { title: "Studio not found" };
  return {
    title: studio.name,
    description: studio.history
      ? studio.history.split("\n\n")[0].slice(0, 160)
      : `Profile of the animation studio ${studio.name}, founded ${studio.foundedYear ?? "at an unknown date"}.`,
    alternates: { canonical: `/studio/${studio.slug}` },
  };
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const studio = await getStudioBySlug(slug);
  if (!studio) notFound();

  const website = studio.website && isValidUrl(studio.website) ? studio.website : null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Studios", item: "/studios" },
      { "@type": "ListItem", position: 3, name: studio.name, item: `/studio/${studio.slug}` },
    ],
  };

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: studio.name,
    ...(studio.japaneseName ? { alternateName: studio.japaneseName } : {}),
    ...(studio.foundedYear ? { foundingDate: String(studio.foundedYear) } : {}),
    ...(studio.headquarters ? { address: studio.headquarters } : {}),
    url: website ?? undefined,
    description: studio.history?.split("\n\n")[0] ?? undefined,
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
    <div className="mx-auto max-w-[1720px] w-full px-4 py-8 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <Breadcrumbs
        items={[{ label: "Studios", href: "/studios" }, { label: studio.name }]}
      />

      <header className="relative overflow-hidden surface-panel film-grain px-6 py-10 sm:px-10">
        <div className="absolute inset-0 vignette" aria-hidden />
        <div className="relative">
          <p className="mb-3 font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">
            Studio Profile
          </p>
          <h1 className="font-display text-3xl text-paper text-balance sm:text-4xl">
            {studio.name}
          </h1>
          {studio.japaneseName ? (
            <p className="mt-2 font-jp text-lg text-muted">{studio.japaneseName}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {studio.foundedYear ? <Badge>Founded {studio.foundedYear}</Badge> : null}
            {studio.status ? (
              <Badge
                tone={studio.status.toLowerCase().startsWith("active") ? "ok" : "warn"}
              >
                {studio.status}
              </Badge>
            ) : null}
            {studio.headquarters ? (
              <Badge tone="holo">
                <MapPin className="h-3 w-3" aria-hidden />
                {studio.headquarters}
              </Badge>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mt-10 space-y-10">
        {section("History", studio.history)}

        {section("Animation Techniques", studio.techniques)}

        {section("Historical Significance", studio.significance)}

        {studio.founders ? (
          <section>
            <p className="mb-3 font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">
              Founders
            </p>
            <div className="editorial">
              <p>{studio.founders}</p>
            </div>
          </section>
        ) : null}

        {website ? (
          <section>
            <p className="mb-3 font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">
              Official Website
            </p>
            <LinkButton
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              variant="holo"
              size="sm"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              {new URL(website).hostname}
            </LinkButton>
          </section>
        ) : null}

        {studio.anime.length > 0 ? (
          <section>
            <SectionHeading
              eyebrow="Works"
              title="Major Works"
              description={`${studio.anime.length} ${pluralize(studio.anime.length, "work")} documented in the archive.`}
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {studio.anime.map((a) => (
                <AnimeCard key={a.id} data={a} />
              ))}
            </div>
          </section>
        ) : null}

        {studio.people.length > 0 ? (
          <section>
            <SectionHeading
              eyebrow="People"
              title="People Associated"
              description="Creators, directors, and artists affiliated with the studio."
            />
            <ul className="surface-card divide-y divide-line overflow-hidden rounded">
              {studio.people.map((sp) => (
                <li
                  key={sp.id}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
                >
                  <Link
                    href={`/creator/${sp.person.slug}`}
                    className="font-display text-sm text-paper hover:text-crimson-300 transition-colors"
                  >
                    {sp.person.name}
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-faint">
                    {sp.person.japaneseName ? (
                      <span className="font-jp">{sp.person.japaneseName}</span>
                    ) : null}
                    {sp.role ? (
                      <Badge tone="neutral">
                        <Users className="h-3 w-3" aria-hidden />
                        {sp.role}
                      </Badge>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {studio.anime.length === 0 && studio.people.length === 0 ? (
          <EmptyState
            icon={Landmark}
            title="Nothing documented yet"
            description={`We have no recorded works or people for ${studio.name} at this time.`}
          />
        ) : null}
      </div>
    </div>
  );
}
