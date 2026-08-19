import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compass, Film, Landmark, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getTourBySlug } from "@/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return { title: "Tour Not Found" };
  return {
    title: tour.title,
    description: tour.description ?? `Archive guided tour: ${tour.title}.`,
    alternates: { canonical: `/tour/${tour.slug}` },
  };
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour || !tour.published) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: tour.title,
    description: tour.description ?? undefined,
    url: `${SITE_URL}/tour/${tour.slug}`,
    isPartOf: { "@type": "WebSite", name: "Anime Archive", url: SITE_URL },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Guided Tours", href: "/tours" }, { label: tour.title }]} />

      <header className="mt-6">
        <p className="font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">
          Guided tour · {tour.steps.length} stop{tour.steps.length === 1 ? "" : "s"}
        </p>
        <h1 className="mt-2 font-display text-3xl text-paper text-balance sm:text-4xl">{tour.title}</h1>
        {tour.description ? <p className="mt-3 max-w-2xl text-sm text-muted">{tour.description}</p> : null}
      </header>

      <ol className="relative mt-10 space-y-0">
        {tour.steps.map((step, i) => {
          const last = i === tour.steps.length - 1;
          return (
            <li key={step.id} className="relative flex gap-5 pb-10 last:pb-0">
              <div className="flex flex-col items-center">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-crimson-500/50 bg-charcoal font-display text-sm text-crimson-300"
                  aria-hidden
                >
                  {i + 1}
                </span>
                {!last ? <span className="mt-2 w-px flex-1 bg-line-2" aria-hidden /> : null}
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  {step.year ? (
                    <span className="font-display text-xs tabular-nums text-faint">
                      <span className="mr-1 text-crimson-400">—</span>
                      {step.year}
                    </span>
                  ) : null}
                  {step.animeSlug ? (
                    <Link
                      href={`/anime/${step.animeSlug}`}
                      className="inline-flex items-center gap-1 rounded border border-line-2 px-2 py-0.5 text-[11px] font-medium tracking-wide text-holo-300 transition-colors hover:border-holo-400"
                    >
                      <Film className="h-3 w-3" aria-hidden /> /anime/{step.animeSlug}
                    </Link>
                  ) : null}
                  {step.eraSlug ? (
                    <Link
                      href={`/timeline/${step.eraSlug}`}
                      className="inline-flex items-center gap-1 rounded border border-line-2 px-2 py-0.5 text-[11px] font-medium tracking-wide text-crimson-300 transition-colors hover:border-crimson-400"
                    >
                      <Landmark className="h-3 w-3" aria-hidden /> /timeline/{step.eraSlug}
                    </Link>
                  ) : null}
                </div>

                <h2 className="mt-2 font-display text-xl text-paper">{step.title}</h2>
                {step.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                ) : null}

                {step.animeSlug || step.eraSlug ? (
                  <p className="mt-3 flex flex-wrap items-center gap-3 text-xs text-faint">
                    <Compass className="h-3 w-3" aria-hidden />
                    {step.animeSlug ? (
                      <Link
                        href={`/anime/${step.animeSlug}`}
                        className="inline-flex items-center gap-1 transition-colors hover:text-holo-300"
                      >
                        <MapPin className="h-3 w-3" aria-hidden /> Visit the archive record
                      </Link>
                    ) : null}
                    {step.eraSlug ? (
                      <Link
                        href={`/timeline/${step.eraSlug}`}
                        className="inline-flex items-center gap-1 transition-colors hover:text-crimson-300"
                      >
                        <MapPin className="h-3 w-3" aria-hidden /> Enter this era
                      </Link>
                    ) : null}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}