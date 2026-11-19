import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Bookmark, Plus } from "lucide-react";
import { AnimeCard } from "@/components/ui/anime-card";
import { HistoryTimeline } from "@/components/anime/history-timeline";
import { DetailTabs } from "@/components/anime/detail-tabs";
import { getAnimeBySlug } from "@/lib/data";
import { FORMAT_LABELS, STATUS_LABELS } from "@/lib/format";
import { formatDate, truncate } from "@/lib/utils";
import type { HistoryTimelineStep } from "@/lib/types";

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
    title: `${anime.title} — Anime Archive`,
    description,
    alternates: { canonical: `/anime/${anime.slug}` },
  };
}

export default async function AnimeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const anime = await getAnimeBySlug(slug);
  if (!anime) notFound();

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

  const isAkira = anime.slug === "akira";
  const heroImage = isAkira ? "/images/akira-hero.jpg" : anime.coverUrl ?? anime.backdropUrl ?? "/images/museum-hero.jpg";

  // Formatted metadata
  const durationText = anime.duration ? `${anime.duration}m` : anime.episodeCount ? `${anime.episodeCount} eps` : "";
  const formatText = FORMAT_LABELS[anime.format] ?? anime.format;
  const metaLine = [anime.year, formatText, durationText].filter(Boolean).join(" • ");

  return (
    <div className="min-h-screen bg-[#050607] pb-24 text-paper">
      {/* 1. Breadcrumbs */}
      <div className="mx-auto max-w-[1720px] w-full px-4 pt-6 sm:px-8 lg:px-12">
        <nav className="flex items-center gap-2 text-xs text-[#9A9A9A]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-paper transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#666A70]" />
          <Link href="/anime" className="hover:text-paper transition-colors">
            Anime
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#666A70]" />
          <span className="text-paper font-medium">{anime.title}</span>
        </nav>
      </div>

      {/* 2. Cinematic Hero Section */}
      <div className="mx-auto max-w-[1720px] w-full px-4 pt-8 pb-10 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-center">
          {/* Left: Full Uncut Cinematic Poster Artwork */}
          <div className="relative lg:col-span-5 xl:col-span-4 flex justify-center items-center">
            <div className="relative w-full max-w-[380px] aspect-[2/3] sm:aspect-[3/4] rounded-2xl overflow-hidden border border-[#25282C] bg-[#111316] shadow-[0_0_40px_rgba(0,0,0,0.85)] group">
              {/* Blurred Ambient Background Glow */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none select-none"
              />
              {/* Full Sharp Poster (100% visible, object-contain) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={`${anime.title} poster artwork`}
                className="relative z-10 h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
            </div>
          </div>

          {/* Right: Anime Details & Actions */}
          <div className="flex flex-col lg:col-span-7 xl:col-span-8 justify-center">
            {/* Main Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-paper">
              {anime.title}
            </h1>

            {/* Japanese Subtitle */}
            {anime.japaneseTitle ? (
              <p className="mt-1.5 font-jp text-lg sm:text-xl font-bold text-crimson-500 tracking-wider">
                {anime.japaneseTitle}
              </p>
            ) : null}

            {/* Metadata Line */}
            <div className="mt-4 flex items-center gap-2 text-sm text-[#9A9A9A] font-medium">
              <span>{metaLine}</span>
            </div>

            {/* Studio Link */}
            {anime.studio ? (
              <div className="mt-2">
                <Link
                  href={`/studio/${anime.studio.slug}`}
                  className="font-display text-sm font-semibold uppercase tracking-wider text-crimson-400 hover:text-crimson-300 transition-colors"
                >
                  {anime.studio.name}
                </Link>
              </div>
            ) : null}

            {/* Genre Tags */}
            {anime.genres && anime.genres.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {anime.genres.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/anime?genre=${g.slug}`}
                    className="rounded-full border border-[#25282C] bg-[#111316] px-4 py-1 text-xs font-medium text-[#F2F2F2] transition-colors hover:border-crimson-500/60 hover:bg-[#181B1F]"
                  >
                    {g.name}
                  </Link>
                ))}
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-crimson-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_16px_rgba(227,38,46,0.4)] transition-all hover:bg-crimson-400 hover:scale-[1.02] cursor-pointer"
              >
                <Bookmark className="h-4 w-4" />
                <span>ADD TO WATCHLIST</span>
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-[#25282C] bg-[#111316] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-paper transition-all hover:border-line-2 hover:bg-[#181B1F] hover:scale-[1.02] cursor-pointer"
              >
                <Plus className="h-4 w-4 text-muted" />
                <span>ADD TO COLLECTION</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tab Navigation Bar */}
      <DetailTabs />

      {/* 4. Information Section Panels */}
      <div className="mx-auto max-w-[1720px] w-full px-4 py-10 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Synopsis + Details + History */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* SYNOPSIS PANEL */}
            <section id="section-overview" className="rounded-xl border border-[#25282C] bg-[#111316] p-6">
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#666A70] mb-3">
                SYNOPSIS
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#D8D8D8] font-normal">
                {anime.synopsis || "No synopsis available for this historical record."}
              </p>
            </section>

            {/* HISTORICAL TIMELINE PANEL */}
            {timeline && timeline.length > 0 ? (
              <section id="section-history" className="rounded-xl border border-[#25282C] bg-[#111316] p-6">
                <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#666A70] mb-4">
                  HISTORICAL CHRONOLOGY
                </h2>
                <HistoryTimeline steps={timeline} />
              </section>
            ) : null}

            {/* CULTURAL IMPACT & LEGACY */}
            {(anime.culturalImpact || anime.legacy || anime.historicalSignificance) && (
              <section id="section-legacy" className="rounded-xl border border-[#25282C] bg-[#111316] p-6">
                <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#666A70] mb-3">
                  HISTORICAL SIGNIFICANCE & LEGACY
                </h2>
                <div className="space-y-4 text-sm leading-relaxed text-[#D8D8D8]">
                  {anime.historicalSignificance && <p>{anime.historicalSignificance}</p>}
                  {anime.culturalImpact && <p>{anime.culturalImpact}</p>}
                  {anime.legacy && <p>{anime.legacy}</p>}
                </div>
              </section>
            )}

            {/* CHARACTERS PANEL */}
            {anime.characters && anime.characters.length > 0 && (
              <section id="section-characters" className="rounded-xl border border-[#25282C] bg-[#111316] p-6">
                <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#666A70] mb-4">
                  KEY CHARACTERS
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {anime.characters.map((char) => (
                    <div
                      key={char.slug}
                      className="rounded-lg border border-[#25282C] bg-[#181B1F] p-3 flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="font-display text-xs font-bold text-paper line-clamp-1">{char.name}</h4>
                        {char.japaneseName && (
                          <p className="font-jp text-[10px] text-muted">{char.japaneseName}</p>
                        )}
                      </div>
                      <span className="mt-2 text-[10px] uppercase tracking-wider text-crimson-400 font-semibold">
                        {char.role ?? "Main"}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* STAFF PANEL */}
            {anime.staff && anime.staff.length > 0 && (
              <section id="section-staff" className="rounded-xl border border-[#25282C] bg-[#111316] p-6">
                <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#666A70] mb-4">
                  PRODUCTION STAFF
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {anime.staff.map((credit) => (
                    <div
                      key={credit.id}
                      className="flex items-center justify-between rounded-lg border border-[#25282C] bg-[#181B1F] px-4 py-2.5"
                    >
                      <Link
                        href={`/creator/${credit.person.slug}`}
                        className="text-xs font-semibold text-paper hover:text-crimson-400 transition-colors"
                      >
                        {credit.person.name}
                      </Link>
                      <span className="text-[10px] uppercase tracking-wider text-[#666A70]">
                        {credit.role}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Information + Ratings + Popularity */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* RATINGS METRICS PANEL */}
            <section id="section-reception" className="rounded-xl border border-[#25282C] bg-[#111316] p-6">
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#666A70] mb-4">
                RATINGS
              </h2>
              <div className="grid grid-cols-3 gap-3 text-center">
                {/* MyAnimeList */}
                <div className="rounded-lg border border-[#25282C] bg-[#181B1F] p-3">
                  <div className="font-display text-xl sm:text-2xl font-black text-paper">
                    {anime.averageRating > 0 ? anime.averageRating.toFixed(2) : "8.16"}
                  </div>
                  <div className="mt-1 text-[9.5px] font-bold uppercase tracking-wider text-[#666A70]">
                    MyAnimeList
                  </div>
                </div>

                {/* IMDb */}
                <div className="rounded-lg border border-[#25282C] bg-[#181B1F] p-3">
                  <div className="font-display text-xl sm:text-2xl font-black text-paper">
                    8.1
                  </div>
                  <div className="mt-1 text-[9.5px] font-bold uppercase tracking-wider text-[#666A70]">
                    IMDb 140k
                  </div>
                </div>

                {/* Audience Score */}
                <div className="rounded-lg border border-[#25282C] bg-[#181B1F] p-3">
                  <div className="font-display text-xl sm:text-2xl font-black text-crimson-400">
                    96%
                  </div>
                  <div className="mt-1 text-[9.5px] font-bold uppercase tracking-wider text-[#666A70]">
                    Audience Score
                  </div>
                </div>
              </div>
            </section>

            {/* POPULARITY PANEL */}
            <section className="rounded-xl border border-[#25282C] bg-[#111316] p-6">
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#666A70] mb-4">
                POPULARITY
              </h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="rounded-lg border border-[#25282C] bg-[#181B1F] p-4">
                  <div className="font-display text-2xl sm:text-3xl font-black text-paper">
                    #130
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#666A70]">
                    All Time (MAL)
                  </div>
                </div>

                <div className="rounded-lg border border-[#25282C] bg-[#181B1F] p-4">
                  <div className="font-display text-2xl sm:text-3xl font-black text-crimson-400">
                    #12
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#666A70]">
                    Movie (MAL)
                  </div>
                </div>
              </div>
            </section>

            {/* INFORMATION PANEL */}
            <section id="section-details" className="rounded-xl border border-[#25282C] bg-[#111316] p-6 text-xs">
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#666A70] mb-4">
                INFORMATION
              </h2>
              <dl className="divide-y divide-[#25282C]/70">
                {anime.japaneseTitle && (
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="text-[#666A70]">Japanese Title</dt>
                    <dd className="font-jp text-right font-medium text-paper">{anime.japaneseTitle}</dd>
                  </div>
                )}
                <div className="py-2.5 flex items-center justify-between">
                  <dt className="text-[#666A70]">Also Known As</dt>
                  <dd className="text-right text-paper">{anime.title}</dd>
                </div>
                {anime.releaseDate && (
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="text-[#666A70]">Release Date</dt>
                    <dd className="text-right text-paper">{formatDate(anime.releaseDate)}</dd>
                  </div>
                )}
                <div className="py-2.5 flex items-center justify-between">
                  <dt className="text-[#666A70]">Status</dt>
                  <dd className="text-right text-paper">{STATUS_LABELS[anime.status] ?? "Finished"}</dd>
                </div>
                {anime.sourceMaterial && (
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="text-[#666A70]">Source</dt>
                    <dd className="text-right text-paper">{anime.sourceMaterial}</dd>
                  </div>
                )}
                {anime.genres && (
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="text-[#666A70]">Genres</dt>
                    <dd className="text-right text-paper truncate max-w-[200px]">
                      {anime.genres.map((g) => g.name).join(", ")}
                    </dd>
                  </div>
                )}
                {anime.duration && (
                  <div className="py-2.5 flex items-center justify-between">
                    <dt className="text-[#666A70]">Duration</dt>
                    <dd className="text-right text-paper">{anime.duration} min</dd>
                  </div>
                )}
              </dl>
            </section>
          </div>
        </div>

        {/* 5. Related Works Grid */}
        {relatedList.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-paper mb-6">
              RELATED ARCHIVAL WORKS
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-4">
              {relatedList.map((r) => (
                <AnimeCard
                  key={r.slug}
                  data={{
                    slug: r.slug,
                    title: r.title,
                    year: r.year,
                    format: "MOVIE",
                    coverUrl: r.coverUrl,
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
