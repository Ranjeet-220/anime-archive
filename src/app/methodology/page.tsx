import type { Metadata } from "next";
import Link from "next/link";
import {
  CircleDashed,
  ClipboardList,
  ListChecks,
  UploadCloud,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Methodology and Standards",
  description:
    "How Anime Archive collects, verifies, and publishes its records: source hierarchy, verification workflow, contribution and import pipelines, and editorial policy.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "Methodology and Standards — Anime Archive",
    description:
      "The sourcing and verification standards behind every record in the archive.",
    url: "/methodology",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Methodology and Standards",
  description:
    "How Anime Archive collects, verifies, and publishes historical records about Japanese animation.",
  url: "/methodology",
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 py-8 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Methodology" }]} />

      <SectionHeading
        eyebrow="Institution"
        title="Methodology and Standards"
        description="The archive is only as trustworthy as its sourcing. These are the standards every record must pass before it is published."
      />

      <div className="editorial max-w-3xl">
        <h2>Data Collection</h2>
        <p>
          Facts are collected from the most authoritative source available, in
          the following priority order:
        </p>
        <ol className="list-decimal pl-5 [&>li]:mb-1.5">
          <li>
            <strong>Official sources</strong> — official anime websites,
            official studio pages, publishers, and production committees.
          </li>
          <li>
            <strong>Reputable databases</strong> — established, citation-grade
            anime and industry databases.
          </li>
          <li>
            <strong>Academic sources</strong> — scholarly writing on Japanese
            animation and its history.
          </li>
          <li>
            <strong>Industry press</strong> — major industry publications and
            reliable reporting.
          </li>
          <li>
            <strong>Library and archive records</strong> — film archives,
            libraries, and institutional catalogs.
          </li>
        </ol>
        <p>
          When sources disagree, the record reflects the more authoritative
          source and the conflict is noted rather than silently resolved.
        </p>

        <h2>Verification Workflow</h2>
        <p>
          Every important record in the archive carries the following fields:
        </p>
        <ul>
          <li>
            <strong>Source</strong> — the named source the fact came from.
          </li>
          <li>
            <strong>Source URL</strong> — a direct link to the reference.
          </li>
          <li>
            <strong>Verification status</strong> — whether the fact has been
            checked against the source.
          </li>
          <li>
            <strong>Verification date</strong> — when that check last happened.
          </li>
          <li>
            <strong>Contributor</strong> — who submitted the record.
          </li>
          <li>
            <strong>Last updated</strong> — when the record last changed.
          </li>
        </ul>

        <h2>Verification Statuses</h2>
        <ul>
          <li>
            <Badge tone="ok">Verified</Badge>{" "}
            <span className="ml-1">
              — checked against the cited source by a reviewer.
            </span>
          </li>
          <li>
            <Badge tone="warn">Pending</Badge>{" "}
            <span className="ml-1">
              — submitted with a source, not yet checked.
            </span>
          </li>
          <li>
            <Badge tone="neutral">Unverified</Badge>{" "}
            <span className="ml-1">
              — present in the archive, but no reliable source is attached.
            </span>
          </li>
        </ul>
        <p>
          Unverified records are always labeled as such and are never presented
          as established fact.
        </p>

        <h2>Contribution Workflow</h2>
        <p>
          Contributions from the community flow through a strict pipeline.{" "}
          <strong>Nothing is auto-published</strong>:
        </p>
        <ol className="list-decimal pl-5 [&>li]:mb-1.5">
          <li>
            <strong>Submitted</strong> — a contributor submits a record via the{" "}
            <Link href="/contribute">contribution system</Link>.
          </li>
          <li>
            <strong>Under Review</strong> — editors check the submission against
            our sourcing standards.
          </li>
          <li>
            <strong>Verified</strong> — facts match the cited sources; the
            record is approved.
          </li>
          <li>
            <strong>Published</strong> — the verified record enters the public
            catalog.
          </li>
        </ol>

        <h2>Import Workflow</h2>
        <p>
          Batch imports (for example, large reference sets) never enter the
          catalog blindly. Each import runs through the same discipline:
        </p>
        <ol className="list-decimal pl-5 [&>li]:mb-1.5">
          <li>
            <strong>Import</strong> — raw data is staged outside the public
            catalog.
          </li>
          <li>
            <strong>Validate</strong> — required fields, dates, and slugs are
            checked programmatically.
          </li>
          <li>
            <strong>Detect duplicates</strong> — records are matched against
            existing entries to prevent double listings.
          </li>
          <li>
            <strong>Review</strong> — editors inspect the staged records.
          </li>
          <li>
            <strong>Verify sources</strong> — every record keeps its citations,
            and verification status is applied.
          </li>
          <li>
            <strong>Publish</strong> — only verified, deduplicated records reach
            the catalog.
          </li>
        </ol>

        <h2>Editorial Selection Policy</h2>
        <p>
          Collections — such as era halls in the museum or curated lists — are{" "}
          <strong>Archive Editorial Selections</strong>: choices made by the
          editorial team according to historical significance and documented
          impact. They are <strong>not objective rankings</strong> and are not
          derived from popularity scores, ratings, or commercial agreements.
        </p>

        <h2>Subjective Judgments</h2>
        <p>
          Where the archive discusses quality, influence, or legacy — words
          like “greatest” or “influential” — those statements are explicitly
          labeled as <strong>editorial opinion</strong>, and are separated from
          sourced facts in the record.
        </p>

        <h2>Corrections</h2>
        <p>
          Found an error? Corrections are submitted through the{" "}
          <Link href="/contribute">contribution system</Link> (type{" "}
          <Badge tone="crimson">Correction</Badge>), and they pass through the
          same review pipeline as everything else. Alternatively, use the{" "}
          <Link href="/contact">contact form</Link>.
        </p>
      </div>

      <section className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <WorkflowCard
          icon={<UploadCloud className="h-4 w-4" aria-hidden />}
          title="Contribute"
          text="Submit new records or corrections through the contribution system."
          href="/contribute"
        />
        <WorkflowCard
          icon={<ListChecks className="h-4 w-4" aria-hidden />}
          title="Sources"
          text="Browse every documented source with its verification status."
          href="/sources"
        />
        <WorkflowCard
          icon={<ClipboardList className="h-4 w-4" aria-hidden />}
          title="Contact"
          text="Reach the editorial team with questions or reports."
          href="/contact"
        />
      </section>

      <p className="mt-12 border-t border-line pt-6 text-xs text-faint">
        <CircleDashed className="mr-1 inline h-3 w-3" aria-hidden />
        Status legend: <Badge tone="ok">Verified</Badge>{" "}
        <Badge tone="warn">Pending</Badge>{" "}
        <Badge tone="neutral">Unverified</Badge> — see the{" "}
        <Link href="/sources" className="text-holo-400 hover:underline">
          sources page
        </Link>{" "}
        for live statuses.
      </p>
    </div>
  );
}

function WorkflowCard({
  icon,
  title,
  text,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
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
