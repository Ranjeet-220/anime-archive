import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Info } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { CoverArt } from "@/components/ui/anime-card";
import { FORMAT_LABELS } from "@/lib/format";
import { getRankings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Rankings — The Archive's Top 60",
  description:
    "Seven curated lenses on a century of anime: Most Popular, Most Watched, Highest Rated, Most Influential, Global Icons, Popular in India, and Historical Milestones.",
  alternates: { canonical: "/rankings" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function RankingsPage() {
  const rankings = await getRankings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Anime Archive — Rankings",
    description:
      "Seven curated categories — most popular, most watched, highest rated, most influential, global icons, popular in India, and historical milestones.",
    url: `${SITE_URL}/rankings`,
    isPartOf: { "@type": "WebSite", name: "Anime Archive", url: SITE_URL },
  };

  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 py-8 sm:px-8 lg:px-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Rankings" }]} />

      <div className="mt-6 border-b border-red-950/40 pb-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-crimson-500/30 bg-crimson-950/30 text-crimson-400">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-paper sm:text-4xl">
              The Archive&apos;s Top 60
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              We deliberately do not offer a single &ldquo;greatest anime&rdquo; list — one
              ranking cannot measure popularity, viewership, ratings, influence,
              icon status, regional fandom, and history at once. Instead, the
              Archive presents sixty landmark works through seven distinct lenses,
              each with its own explicit methodology.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-14">
        {rankings.map((ranking) => (
          <section key={ranking.slug} aria-labelledby={`heading-${ranking.slug}`}>
            <SectionHeading
              eyebrow={`Ranking ${ranking.items.length} works`}
              title={ranking.name}
              description={ranking.tagline ?? undefined}
            />
            <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-line bg-charcoal/60 px-4 py-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-crimson-400" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper">
                  Methodology
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{ranking.description}</p>
                <p className="mt-1 text-xs leading-relaxed text-faint">{ranking.methodology}</p>
              </div>
            </div>

            <ol className="divide-y divide-line/60 border-y border-line/60">
              {ranking.items.map((item) => (
                <li key={item.anime.slug}>
                  <Link
                    href={`/anime/${item.anime.slug}`}
                    className="group flex items-center gap-4 px-2 py-3 transition-colors hover:bg-charcoal/60 sm:gap-5 sm:px-3"
                  >
                    <span
                      aria-hidden
                      className="w-8 shrink-0 text-right font-display text-lg font-bold tabular-nums text-crimson-400/80 sm:text-xl"
                    >
                      {item.rank}
                    </span>
                    <span className="relative h-20 w-14 shrink-0 overflow-hidden rounded border border-line-2 bg-charcoal-2">
                      <CoverArt
                        title={item.anime.title}
                        japaneseTitle={item.anime.japaneseTitle}
                        year={item.anime.year}
                        format={item.anime.format}
                        slug={item.anime.slug}
                        coverUrl={item.anime.coverUrl}
                        className="absolute inset-0 h-full w-full"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-sm font-semibold uppercase tracking-wide text-paper group-hover:text-crimson-300">
                        {item.anime.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-faint">
                        {[
                          item.anime.year,
                          item.anime.studio?.name,
                          FORMAT_LABELS[item.anime.format as keyof typeof FORMAT_LABELS] ?? item.anime.format,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                      {item.note ? (
                        <span className="mt-1 block text-xs leading-snug text-muted">
                          {item.note}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}