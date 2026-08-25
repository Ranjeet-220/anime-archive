import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Landmark, Library, MessageSquare, Scale } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading, Stat } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { getEras, getStats } from "@/lib/data";
import type { ArchiveStatsDto, EraDto } from "@/lib/types";

export const metadata: Metadata = {
  title: "About the Archive",
  description:
    "Anime Archive is a nonprofit-style digital museum and historical encyclopedia of Japanese animation — covering 1917 to the present with sourced, verified facts.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About the Archive — Anime Archive",
    description:
      "A digital museum and historical encyclopedia of Japanese animation, from the first surviving shorts of 1917 to the streaming era.",
    url: "/about",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "About the Archive",
  description:
    "Anime Archive is a nonprofit-style informational digital museum and historical encyclopedia of Japanese animation.",
  url: "/about",
};

interface SafeData {
  stats: ArchiveStatsDto | null;
  eras: EraDto[] | null;
}

async function getSafeData(): Promise<SafeData> {
  try {
    const [stats, eras] = await Promise.all([getStats(), getEras()]);
    return { stats, eras };
  } catch {
    return { stats: null, eras: null };
  }
}

export default async function AboutPage() {
  const { stats, eras } = await getSafeData();

  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 py-8 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "About" }]} />

      <SectionHeading
        eyebrow="Institution"
        title="About the Archive"
        description="Anime Archive is a nonprofit-style informational digital museum and historical encyclopedia of Japanese animation — from the first surviving animated short of 1917 to the streaming era."
      />

      <div className="editorial max-w-3xl">
        <h2>Mission</h2>
        <p>
          Anime Archive exists to document, preserve, and explain the history of
          Japanese animation. It is an informational archive in the spirit of a
          public museum: it records <strong>what happened, when it happened, who
          made it, and why it mattered</strong> — with every claim traced to a
          documented source.
        </p>
        <p>
          The archive covers the medium from <strong>1917</strong> — the year of{" "}
          <em>Namakura Gatana</em>, the first surviving Japanese animated short —
          to the present day. Coverage spans eras, landmark works, studios,
          creators, characters, and the historical events that shaped the
          industry.
        </p>

        <h2>What We Document</h2>
        <ul>
          <li>
            <strong>Eras</strong> — the seven periods of Japanese animation,
            from the beginnings (1917–1959) to the modern streaming era, with
            curated landmark works for each.
          </li>
          <li>
            <strong>Works</strong> — anime across every format: television
            series, films, OVAs, ONAs, and specials, with production and release
            metadata.
          </li>
          <li>
            <strong>Studios</strong> — the production houses that built the
            industry, their founding histories, and their documented works.
          </li>
          <li>
            <strong>Creators</strong> — directors, animators, writers, and other
            figures whose careers defined the medium.
          </li>
          <li>
            <strong>Characters</strong> — notable characters documented with
            their roles and voice actors.
          </li>
          <li>
            <strong>Historical events</strong> — premieres, milestones, and
            industry events placed on a dated timeline.
          </li>
          <li>
            <strong>Sources</strong> — every important record carries references
            to the sources it was verified against (see{" "}
            <Link href="/methodology">Methodology</Link> and{" "}
            <Link href="/sources">Sources</Link>).
          </li>
        </ul>

        <h2>The Museum and the Encyclopedia</h2>
        <p>
          Anime Archive deliberately offers <strong>two ways in</strong> to the
          same history:
        </p>
        <ul>
          <li>
            <strong>The 3D Museum</strong> is for <em>exploration</em> — a
            walkable digital exhibition in which eras become rooms, and you move
            through history as a physical space.
          </li>
          <li>
            <strong>The 2D Encyclopedia</strong> is for <em>reference</em> — a
            structured database of works, studios, creators, and events,
            queryable like any encyclopedia.
          </li>
        </ul>
        <p>
          Both interfaces are served by the same curated catalog, so the fact a
          film sits in the museum hall of the 1980s is the same fact you find on
          its encyclopedia entry.
        </p>

        <h2>Editorial Principles</h2>
        <ul>
          <li>
            <strong>Accuracy first.</strong> A listing without a source is
            treated as unverified until one is attached.
          </li>
          <li>
            <strong>Sourced facts.</strong> Important records carry their
            source, verification status, and verification date.
          </li>
          <li>
            <strong>No invented information.</strong> We never fabricate facts,
            dates, or credits. Where a fact is unknown, we say so rather than
            guess.
          </li>
          <li>
            <strong>Labeled opinion.</strong> Subjective judgments are marked as
            editorial opinion, never presented as objective fact.
          </li>
        </ul>

        <h2>Data Status</h2>
        <p>
          The archive is under <strong>active editorial expansion</strong>. The
          records you see today are a representative sample of the full planned
          catalog, and every record carries a flag marking it as part of the
          initial archival sample (<Badge tone="warn">demo data</Badge>).
          Nothing in the sample is fabricated — it is real, sourced history —
          but it is not yet exhaustive, and the catalog grows as records pass
          review.
        </p>

        <h2>Team</h2>
        <p>
          Anime Archive is maintained by an <strong>independent editorial
          team</strong> — no fake names, no invented biographies. The archive is
          not affiliated with, funded by, or endorsed by any production studio,
          publisher, or rights holder.
        </p>
        <p>
          Questions, corrections, or partnership inquiries? Reach us through the{" "}
          <Link href="/contact">contact page</Link>.
        </p>
      </div>

      {stats ? (
        <section className="mt-10">
          <SectionHeading
            eyebrow="Archive"
            title="The Archive in Numbers"
            description="Live counts from the current catalog. All of it is representative sample data (demo) pending editorial expansion."
          />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <Stat value={stats.anime} label="Works documented" />
            <Stat value={stats.studios} label="Studios" />
            <Stat value={stats.creators} label="Creators" />
            <Stat value={stats.events} label="Historical events" />
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <SectionHeading
          eyebrow="Demo Data"
          title="About the Current Sample"
          description="The initial archival sample: a 24-title catalog deliberately chosen to cover every era of anime history."
        />
        <div className="editorial max-w-3xl">
          <p>
            The catalog currently holds <strong>24 works</strong> — a
            representative sample covering each era of Japanese animation, from
            the pioneers of the 1910s to modern global hits. Every record in
            this sample is flagged as demo data (<em>isDemoData</em>) so that it
            can be clearly distinguished from future, fully expanded catalog
            entries.
          </p>
          <p>
            Coverage is balanced across the seven eras of the timeline:
          </p>
        </div>
        {eras ? (
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {eras.map((era) => (
              <li key={era.slug}>
                <Link
                  href={`/timeline/${era.slug}`}
                  className="group surface-card lift flex items-center justify-between gap-3 p-4"
                >
                  <span>
                    <span className="block font-display text-sm text-paper group-hover:text-crimson-300 transition-colors">
                      {era.name.charAt(0) + era.name.slice(1).toLowerCase()}
                    </span>
                    <span className="mt-0.5 block text-xs text-faint">{era.period}</span>
                  </span>
                  <Badge tone="neutral">
                    {era.animeCount} {era.animeCount === 1 ? "work" : "works"}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted">
            Era coverage data is unavailable right now. The sample spans every
            era of the timeline.
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/timeline" variant="outline">
            <Library className="h-4 w-4" aria-hidden />
            Explore the Timeline
          </LinkButton>
          <LinkButton href="/anime" variant="outline">
            <BookOpen className="h-4 w-4" aria-hidden />
            Browse the Catalog
          </LinkButton>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeading
          eyebrow="Institution"
          title="Guides and Policies"
          description="How we work, where our facts come from, and the legal framework of the archive."
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <GuideCard
            href="/methodology"
            icon={<Scale className="h-4 w-4" aria-hidden />}
            title="Methodology and Standards"
            text="How records are collected, verified, and published."
          />
          <GuideCard
            href="/sources"
            icon={<Landmark className="h-4 w-4" aria-hidden />}
            title="Sources and References"
            text="Every documented source in the archive, with verification status."
          />
          <GuideCard
            href="/contact"
            icon={<MessageSquare className="h-4 w-4" aria-hidden />}
            title="Contact"
            text="Corrections, press, and partnership inquiries."
          />
        </div>
      </section>

      <p className="mt-12 border-t border-line pt-6 text-xs text-faint">
        Anime Archive is an informational historical archive. It does not host
        or distribute copyrighted media. See{" "}
        <Link href="/copyright" className="text-holo-400 hover:underline">
          Copyright and Fair Use
        </Link>{" "}
        for details.
      </p>
    </div>
  );
}

function GuideCard({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link href={href} className="group surface-card lift flex flex-col gap-2 p-5">
      <div className="flex h-8 w-8 items-center justify-center rounded border border-line-2 bg-charcoal-2 text-crimson-300">
        {icon}
      </div>
      <h3 className="font-display text-base text-paper group-hover:text-crimson-300 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted">{text}</p>
    </Link>
  );
}
