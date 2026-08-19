import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Landmark } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate, isValidUrl } from "@/lib/utils";
import type { VerificationStatus } from "@/generated/prisma/client";

export const metadata: Metadata = {
  title: "Sources and References",
  description:
    "Every documented source in the Anime Archive, grouped by entity: anime, studios, creators, and historical events — with verification status and date.",
  alternates: { canonical: "/sources" },
  openGraph: {
    title: "Sources and References — Anime Archive",
    description:
      "The complete list of sources behind the archive, with verification status for each.",
    url: "/sources",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sources and References",
  description:
    "The documented sources of the Anime Archive, with verification status and dates.",
  url: "/sources",
};

const STATUS_TONE: Record<string, "ok" | "warn" | "neutral"> = {
  VERIFIED: "ok",
  PENDING: "warn",
  UNVERIFIED: "neutral",
};

const STATUS_LABELS: Record<string, string> = {
  VERIFIED: "Verified",
  PENDING: "Pending",
  UNVERIFIED: "Unverified",
};

const GROUP_ORDER = ["anime", "studio", "person", "event"] as const;

const GROUP_LABELS: Record<string, string> = {
  anime: "Anime",
  studio: "Studios",
  person: "Creators",
  event: "Historical Events",
};

interface SourceRow {
  id: string;
  entityType: string;
  entityId: string;
  sourceUrl: string;
  sourceName: string;
  sourceTitle: string | null;
  verificationDate: Date | null;
  verificationStatus: VerificationStatus;
}

interface EntityRef {
  name: string;
  href?: string;
}

type GroupedSources = Record<string, { label: string; refs: Map<string, EntityRef>; sources: SourceRow[] }>;

async function getSourcesData(): Promise<{ grouped: GroupedSources | null; total: number }> {
  try {
    const [sources, anime, studios, people, events] = await Promise.all([
      prisma.source.findMany({
        orderBy: [{ entityType: "asc" }, { sourceName: "asc" }],
      }),
      prisma.anime.findMany({ select: { id: true, slug: true, title: true } }),
      prisma.studio.findMany({ select: { id: true, slug: true, name: true } }),
      prisma.person.findMany({ select: { id: true, slug: true, name: true } }),
      prisma.historicalEvent.findMany({ select: { slug: true, title: true } }),
    ]);

    const refs: Record<string, Map<string, EntityRef>> = {
      anime: new Map(anime.map((a) => [a.id, { name: a.title, href: `/anime/${a.slug}` }])),
      studio: new Map(studios.map((s) => [s.id, { name: s.name, href: `/studio/${s.slug}` }])),
      person: new Map(people.map((p) => [p.id, { name: p.name, href: `/creator/${p.slug}` }])),
      event: new Map(events.map((e) => [e.slug, { name: e.title }])),
    };

    const grouped: GroupedSources = {};
    for (const key of GROUP_ORDER) {
      grouped[key] = { label: GROUP_LABELS[key], refs: refs[key], sources: [] };
    }
    for (const s of sources) {
      if (grouped[s.entityType]) grouped[s.entityType].sources.push(s);
    }

    return { grouped, total: sources.length };
  } catch {
    return { grouped: null, total: 0 };
  }
}

export default async function SourcesPage() {
  const { grouped, total } = await getSourcesData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Sources" }]} />

      <SectionHeading
        eyebrow="Institution"
        title="Sources and References"
        description={`Every documented source behind the archive — ${total} references across anime, studios, creators, and historical events — with verification status and date.`}
      />

      <div className="editorial max-w-3xl">
        <p>
          Facts in the archive are collected from the most authoritative source
          available, in priority order: official sources (official anime
          websites, studio pages, publishers, production committees), reputable
          databases, academic sources, industry press, and library or archive
          records. Full details are in{" "}
          <Link href="/methodology">Methodology and Standards</Link>.
        </p>
      </div>

      {!grouped ? (
        <div className="mt-8">
          <EmptyState
            icon={Landmark}
            title="Sources unavailable"
            description="The source index could not be loaded right now. Please try again later."
          />
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {GROUP_ORDER.filter((key) => grouped[key].sources.length > 0).map((key) => {
            const group = grouped[key];
            return (
              <section key={key} aria-label={`${group.label} sources`}>
                <div className="mb-3 flex items-baseline gap-3">
                  <h2 className="font-display text-xl text-paper">{group.label}</h2>
                  <span className="text-xs uppercase tracking-[0.2em] text-faint">
                    {group.sources.length} {group.sources.length === 1 ? "source" : "sources"}
                  </span>
                </div>
                <ul className="surface-card divide-y divide-line overflow-hidden">
                  {group.sources.map((s) => {
                    const ref = group.refs.get(s.entityId);
                    const url = isValidUrl(s.sourceUrl) ? s.sourceUrl : null;
                    return (
                      <li key={s.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm text-paper">
                            {ref?.name ?? "Unnamed entity"}
                            {ref?.href ? (
                              <Link href={ref.href} className="ml-2 text-xs text-holo-400 hover:underline">
                                view entry
                              </Link>
                            ) : null}
                          </p>
                          <p className="truncate text-xs text-muted">
                            {s.sourceName}
                            {s.sourceTitle && s.sourceTitle !== s.sourceName ? ` — ${s.sourceTitle}` : ""}
                          </p>
                          {url ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 inline-flex items-center gap-1 truncate text-xs text-faint hover:text-holo-400 transition-colors"
                            >
                              <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
                              <span className="truncate">{url}</span>
                            </a>
                          ) : (
                            <p className="mt-1 truncate text-xs text-faint">{s.sourceUrl}</p>
                          )}
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <Badge tone={STATUS_TONE[s.verificationStatus] ?? "neutral"}>
                            {STATUS_LABELS[s.verificationStatus] ?? s.verificationStatus}
                          </Badge>
                          <span className="text-xs text-faint whitespace-nowrap">
                            {s.verificationDate ? formatDate(s.verificationDate) : "Not yet dated"}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}

      <div className="mt-10 max-w-3xl">
        <div className="surface-panel border-t border-crimson-500/40 p-5">
          <p className="text-sm text-paper-2">
            Sources are documented for research purposes; Anime Archive does not
            host or redistribute copyrighted content. External links open the
            respective rights holders’ sites.
          </p>
        </div>
      </div>

      <p className="mt-12 border-t border-line pt-6 text-xs text-faint">
        Verification statuses follow the archive’s standards — see{" "}
        <Link href="/methodology" className="text-holo-400 hover:underline">
          Methodology
        </Link>{" "}
        for the full workflow. Spotted a broken or misattributed source?{" "}
        <Link href="/contact" className="text-holo-400 hover:underline">
          Tell us
        </Link>
        .
      </p>
    </div>
  );
}
