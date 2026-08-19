import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CalendarDays, Clock, ExternalLink, Globe, ShieldCheck, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { AnimeCard, CoverArt, type AnimeCardData } from "@/components/ui/anime-card";
import { GenreChips } from "@/components/anime/genre-chips";
import { HistoryTimeline } from "@/components/anime/history-timeline";
import { SaveButtons } from "@/components/anime/save-buttons";
import { getAnimeBySlug, getAnimeList, getAnimeSources } from "@/lib/data";
import { getSessionUser } from "@/lib/auth";
import { FORMAT_LABELS, STATUS_LABELS } from "@/lib/format";
import { formatDate, truncate } from "@/lib/utils";
import type { HistoryTimelineStep } from "@/lib/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const anime = await getAnimeBySlug(slug);
  if (!anime) return { title: "Anime Not Found" };
  const description = truncate(anime.synopsis ?? `Archive record for ${anime.title}.`, 160);
  return {
    title: anime.title,
    description,
    alternates: { canonical: `/anime/${anime.slug}` },
    openGraph: {
      title: anime.title,
      description,
      url: `/anime/${anime.slug}`,
      type: "website",
    },
  };
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="flex items-center gap-2.5 font-display text-xl tracking-wide text-paper">
        <span className="h-4 w-1 rounded bg-crimson-500" aria-hidden />
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function SidebarTitle({ children }: { children: ReactNode }) {
  return <h3 className="font-display text-[11px] uppercase tracking-[0.25em] text-muted">{children}</h3>;
}

export default async function AnimeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const anime = await getAnimeBySlug(slug);
  if (!anime) notFound();

  const [sources, session, allAnime] = await Promise.all([
    getAnimeSources(anime.id),
    getSessionUser(),
    getAnimeList({ perPage: 48 }),
  ]);
  const formatBySlug = new Map(allAnime.items.map((i) => [i.slug, i.format]));

  const timeline = Array.isArray(anime.historyTimeline)
    ? (anime.historyTimeline as unknown as HistoryTimelineStep[])
    : null;

  const related = [...anime.relatedFrom.map((r) => r.related), ...anime.relatedTo.map((r) => r.anime)];
  const relatedSeen = new Set<string>();
  const relatedList = related.filter((r) => {
    if (relatedSeen.has(r.slug)) return false;
    relatedSeen.add(r.slug);
    return true;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": anime.format === "MOVIE" ? "Movie" : "Series",
    name: anime.title,
    description: anime.synopsis ?? undefined,
    datePublished: anime.releaseDate ? anime.releaseDate.toISOString().slice(0, 10) : undefined,
    genre: anime.genres.map((g) => g.name),
    url: `${SITE_URL}/anime/${anime.slug}`,
    inLanguage: "ja",
    ...(anime.creator ? { creator: { "@type": "Person", name: anime.creator.name } } : {}),
    ...(anime.studio ? { productionCompany: { "@type": "Organization", name: anime.studio.name } } : {}),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Anime Database", item: `${SITE_URL}/anime` },
      { "@type": "ListItem", position: 3, name: anime.title, item: `${SITE_URL}/anime/${anime.slug}` },
    ],
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Cinematic hero                                                     */}
      {/* ------------------------------------------------------------------ */}
      <header className="film-grain relative overflow-hidden border-b border-line">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-charcoal-3 via-ink to-ink" />
        <div aria-hidden className="absolute -left-32 -top-24 h-96 w-96 rounded-full bg-crimson-500/10 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-holo-500/10 blur-3xl" />
        <div aria-hidden className="vignette absolute inset-0" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <Breadcrumbs
            items={[{ label: "Anime Database", href: "/anime" }, { label: anime.title }]}
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
            <div className="mx-auto w-48 max-w-[260px] lg:w-full">
              <CoverArt
                title={anime.title}
                japaneseTitle={anime.japaneseTitle}
                year={anime.year}
                format={anime.format}
                slug={anime.slug}
                coverUrl={anime.coverUrl}
                className="aspect-[3/4] w-full rounded-lg border border-line-2"
              />
            </div>

            <div className="min-w-0">
              {anime.era ? (
                <p className="font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">
                  {anime.era.name}
                </p>
              ) : null}
              <h1 className="mt-2 font-display text-4xl leading-[1.05] text-paper text-balance sm:text-5xl lg:text-6xl">
                {anime.title}
              </h1>
              {anime.japaneseTitle ? (
                <p className="mt-3 font-jp text-lg text-paper-2/80">{anime.japaneseTitle}</p>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {anime.year ? <Badge>{anime.year}</Badge> : null}
                <Badge tone="crimson">{FORMAT_LABELS[anime.format]}</Badge>
                <Badge tone={anime.status === "FINISHED" ? "ok" : "neutral"}>
                  {STATUS_LABELS[anime.status]}
                </Badge>
                {anime.averageRating > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-sm text-warn">
                    <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
                    <span className="font-display">{anime.averageRating.toFixed(1)}</span>
                    <span className="text-faint">
                      ({anime.ratingCount} rating{anime.ratingCount === 1 ? "" : "s"})
                    </span>
                  </span>
                ) : null}
              </div>

              <GenreChips genres={anime.genres} className="mt-3" />

              <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {anime.studio ? (
                  <div className="flex items-center gap-1.5">
                    <dt className="text-faint">Studio</dt>
                    <dd>
                      <Link
                        href={`/studio/${anime.studio.slug}`}
                        className="text-paper-2 underline-offset-2 transition-colors hover:text-crimson-300 hover:underline"
                      >
                        {anime.studio.name}
                      </Link>
                    </dd>
                  </div>
                ) : null}
                {anime.director ? (
                  <div className="flex items-center gap-1.5">
                    <dt className="text-faint">Director</dt>
                    <dd>
                      <Link
                        href={`/creator/${anime.director.slug}`}
                        className="text-paper-2 underline-offset-2 transition-colors hover:text-crimson-300 hover:underline"
                      >
                        {anime.director.name}
                      </Link>
                    </dd>
                  </div>
                ) : null}
                {anime.creator ? (
                  <div className="flex items-center gap-1.5">
                    <dt className="text-faint">Creator</dt>
                    <dd>
                      <Link
                        href={`/creator/${anime.creator.slug}`}
                        className="text-paper-2 underline-offset-2 transition-colors hover:text-crimson-300 hover:underline"
                      >
                        {anime.creator.name}
                      </Link>
                    </dd>
                  </div>
                ) : null}
                {anime.releaseDate ? (
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-faint" aria-hidden />
                    <dd className="text-paper-2">{formatDate(anime.releaseDate)}</dd>
                  </div>
                ) : null}
                {anime.episodeCount ? (
                  <div className="flex items-center gap-1.5">
                    <dd className="text-paper-2">
                      {anime.episodeCount} episode{anime.episodeCount === 1 ? "" : "s"}
                    </dd>
                  </div>
                ) : null}
                {anime.duration ? (
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-faint" aria-hidden />
                    <dd className="text-paper-2">{anime.duration} min</dd>
                  </div>
                ) : null}
                {anime.sourceMaterial ? (
                  <div className="flex items-center gap-1.5">
                    <dt className="text-faint">Source</dt>
                    <dd className="text-paper-2">{anime.sourceMaterial}</dd>
                  </div>
                ) : null}
                {anime.officialWebsite ? (
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-faint" aria-hidden />
                    <dd>
                      <a
                        href={anime.officialWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-holo-400 underline-offset-2 transition-colors hover:text-holo-300 hover:underline"
                      >
                        Official website <ExternalLink className="h-3 w-3" aria-hidden />
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Sticky info bar                                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="sticky top-16 z-30 border-y border-line bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6">
          <p className="min-w-0 flex-1 truncate font-display text-sm text-paper">{anime.title}</p>
          {anime.averageRating > 0 ? (
            <span className="hidden shrink-0 items-center gap-1 text-xs text-warn sm:inline-flex">
              <Star className="h-3 w-3 fill-current" aria-hidden />
              {anime.averageRating.toFixed(1)}
            </span>
          ) : null}
          <SaveButtons animeId={anime.id} slug={anime.slug} isLoggedIn={session !== null} />
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main + sidebar                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-12">
            {anime.synopsis ? (
              <Section title="Synopsis">
                <p className="editorial">{anime.synopsis}</p>
              </Section>
            ) : null}

            {timeline && timeline.length > 0 ? (
              <Section title="ANIME HISTORY — Explore This Anime's History">
                <div className="rounded-lg border border-line bg-charcoal/60 p-5 sm:p-6">
                  <HistoryTimeline steps={timeline} />
                </div>
              </Section>
            ) : null}

            {anime.historicalSignificance ? (
              <Section title="Historical Significance">
                <p className="editorial">{anime.historicalSignificance}</p>
              </Section>
            ) : null}

            {anime.productionHistory ? (
              <Section title="Production History">
                <p className="editorial">{anime.productionHistory}</p>
              </Section>
            ) : null}

            {anime.reception ? (
              <Section title="Reception">
                <p className="editorial">{anime.reception}</p>
              </Section>
            ) : null}

            {anime.awards ? (
              <Section title="Awards">
                <p className="editorial">{anime.awards}</p>
              </Section>
            ) : null}

            {anime.culturalImpact ? (
              <Section title="Cultural Impact">
                <p className="editorial">{anime.culturalImpact}</p>
              </Section>
            ) : null}

            {anime.legacy ? (
              <Section title="Legacy">
                <p className="editorial">{anime.legacy}</p>
              </Section>
            ) : null}

            <Section title="Episodes">
              {anime.episodes.length === 0 ? (
                <p className="rounded-lg border border-dashed border-line-2 px-4 py-6 text-sm text-muted">
                  Episode data not yet archived.
                </p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-line">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-line bg-charcoal text-left text-[11px] uppercase tracking-[0.15em] text-faint">
                        <th scope="col" className="w-14 px-3 py-2">
                          Ep
                        </th>
                        <th scope="col" className="px-3 py-2">
                          Title
                        </th>
                        <th scope="col" className="w-40 px-3 py-2">
                          Air date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {anime.episodes.map((ep) => (
                        <tr
                          key={ep.id}
                          className="border-b border-line/60 last:border-0 hover:bg-charcoal/60 transition-colors"
                        >
                          <td className="px-3 py-2 font-display text-crimson-300">{ep.number}</td>
                          <td className="px-3 py-2 text-paper-2">{ep.title ?? "—"}</td>
                          <td className="px-3 py-2 text-muted">{formatDate(ep.airDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Section>

            {anime.staff.length > 0 ? (
              <Section title="Staff">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {anime.staff.map((credit) => (
                    <li
                      key={credit.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-line bg-charcoal px-3 py-2"
                    >
                      <Link
                        href={`/creator/${credit.person.slug}`}
                        className="min-w-0 truncate text-sm text-paper underline-offset-2 transition-colors hover:text-crimson-300 hover:underline"
                      >
                        {credit.person.name}
                      </Link>
                      <span className="shrink-0 text-[11px] uppercase tracking-wider text-faint">
                        {credit.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {sources.length > 0 ? (
              <Section title="Sources & Verification">
                <ul className="space-y-2">
                  {sources.map((s) => (
                    <li
                      key={s.id}
                      className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg border border-line bg-charcoal px-3 py-2.5 text-sm"
                    >
                      <a
                        href={s.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-w-0 items-center gap-1.5 text-holo-400 underline-offset-2 transition-colors hover:text-holo-300 hover:underline"
                      >
                        <span className="truncate">{s.sourceName ?? s.sourceTitle}</span>
                        <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
                      </a>
                      <Badge
                        tone={
                          s.verificationStatus === "VERIFIED"
                            ? "ok"
                            : s.verificationStatus === "PENDING"
                              ? "warn"
                              : "neutral"
                        }
                      >
                        <ShieldCheck className="h-3 w-3" aria-hidden />
                        {s.verificationStatus === "VERIFIED"
                          ? "Verified"
                          : s.verificationStatus === "PENDING"
                            ? "Pending"
                            : "Unverified"}
                      </Badge>
                      {s.verificationDate ? (
                        <span className="text-xs text-faint">{formatDate(s.verificationDate)}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-faint">
                  All facts in this record are sourced and verified by the archive editorial team.{" "}
                  <Link
                    href="/methodology"
                    className="text-holo-400 underline underline-offset-2 transition-colors hover:text-holo-300"
                  >
                    See methodology
                  </Link>
                  .
                </p>
              </Section>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div>
              <SidebarTitle>Quick Facts</SidebarTitle>
              <dl className="mt-3 divide-y divide-line rounded-lg border border-line bg-charcoal text-sm">
                <FactRow label="Release date" value={formatDate(anime.releaseDate)} />
                {anime.endDate ? <FactRow label="End date" value={formatDate(anime.endDate)} /> : null}
                <FactRow label="Year" value={anime.year ? String(anime.year) : "—"} />
                <FactRow label="Format" value={FORMAT_LABELS[anime.format]} />
                <FactRow label="Status" value={STATUS_LABELS[anime.status]} />
                <FactRow
                  label="Episodes"
                  value={anime.episodeCount ? String(anime.episodeCount) : "—"}
                />
                <FactRow label="Duration" value={anime.duration ? `${anime.duration} min` : "—"} />
                <FactRow label="Source material" value={anime.sourceMaterial ?? "—"} />
                {anime.era ? <FactRow label="Era" value={anime.era.name} /> : null}
                {anime.studio ? (
                  <FactRow
                    label="Studio"
                    value={
                      <Link
                        href={`/studio/${anime.studio.slug}`}
                        className="text-holo-400 underline-offset-2 transition-colors hover:text-holo-300 hover:underline"
                      >
                        {anime.studio.name}
                      </Link>
                    }
                  />
                ) : null}
                {anime.director ? (
                  <FactRow
                    label="Director"
                    value={
                      <Link
                        href={`/creator/${anime.director.slug}`}
                        className="text-holo-400 underline-offset-2 transition-colors hover:text-holo-300 hover:underline"
                      >
                        {anime.director.name}
                      </Link>
                    }
                  />
                ) : null}
                {anime.creator ? (
                  <FactRow
                    label="Creator"
                    value={
                      <Link
                        href={`/creator/${anime.creator.slug}`}
                        className="text-holo-400 underline-offset-2 transition-colors hover:text-holo-300 hover:underline"
                      >
                        {anime.creator.name}
                      </Link>
                    }
                  />
                ) : null}
                {anime.officialWebsite ? (
                  <FactRow
                    label="Website"
                    value={
                      <a
                        href={anime.officialWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-holo-400 underline-offset-2 transition-colors hover:text-holo-300 hover:underline"
                      >
                        Visit site
                      </a>
                    }
                  />
                ) : null}
              </dl>
            </div>

            {anime.characters.length > 0 ? (
              <div>
                <SidebarTitle>Characters</SidebarTitle>
                <ul className="mt-3 space-y-2">
                  {anime.characters.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/character/${c.slug}`}
                        className="group flex items-baseline justify-between gap-3 rounded border border-line bg-charcoal px-3 py-2 transition-colors hover:border-crimson-500/50"
                      >
                        <span className="truncate text-sm text-paper transition-colors group-hover:text-crimson-300">
                          {c.name}
                        </span>
                        {c.role ? (
                          <span className="shrink-0 text-[11px] uppercase tracking-wider text-faint">
                            {c.role}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {relatedList.length > 0 ? (
              <div>
                <SidebarTitle>Related Works</SidebarTitle>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {relatedList.map((r) => (
                    <AnimeCard
                      key={r.slug}
                      data={
                        {
                          slug: r.slug,
                          title: r.title,
                          year: r.year,
                          coverUrl: r.coverUrl,
                          format: formatBySlug.get(r.slug) ?? "TV",
                        } satisfies AnimeCardData
                      }
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </article>
  );
}

function FactRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-3 py-2">
      <dt className="text-xs uppercase tracking-wider text-muted">{label}</dt>
      <dd className="min-w-0 truncate text-right text-paper-2">{value}</dd>
    </div>
  );
}
