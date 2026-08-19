import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Scale, ScrollText, UserX } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms of service for using Anime Archive: acceptable use, accounts, user content license, contribution review, and disclaimers.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service — Anime Archive",
    description:
      "The rules of the road for the archive: acceptable use, accounts, contributions, and liability.",
    url: "/terms",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  description: "The terms of service of the Anime Archive.",
  url: "/terms",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Terms" }]} />

      <SectionHeading
        eyebrow="Archive"
        title="Terms of Service"
        description="By using Anime Archive you agree to these terms. They are written to keep the archive useful, accurate, and lawful."
      />

      <div className="editorial max-w-3xl">
        <h2>Acceptable Use</h2>
        <p>When using the archive, you agree not to:</p>
        <ul>
          <li>
            <strong>Abuse the systems</strong> — no scraping at abusive rates,
            no automated bulk access that impairs the site for others, and no
            attempts to bypass rate limits.
          </li>
          <li>
            <strong>Post illegal content</strong> — no unlawful, infringing,
            or abusive user-generated content.
          </li>
          <li>
            <strong>Impersonate</strong> — no pretending to be another person,
            the editorial team, or any rights holder.
          </li>
        </ul>

        <h2>Accounts</h2>
        <p>
          Accounts are personal. You are responsible for keeping your
          credentials private and for activity under your account. You may
          delete your account at any time by contacting us; see the{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>

        <h2>User Content License</h2>
        <p>
          When you contribute to the archive — records, corrections, notes, or
          reviews — you grant Anime Archive a{" "}
          <strong>non-exclusive, royalty-free license</strong> to store,
          display, and distribute your contribution within the archive and its
          associated media. You retain ownership of your own content and may
          ask for its removal.
        </p>

        <h2>Contributions Are Reviewed</h2>
        <p>
          All contributions pass through the review pipeline described in{" "}
          <Link href="/methodology">Methodology and Standards</Link>. Nothing
          is auto-published, and the editorial team may reject or edit
          submissions that fail our sourcing standards. Publication in the
          archive is not a guarantee of factual accuracy — but everything we
          publish is our best, sourced, verified effort.
        </p>

        <h2>Disclaimer of Warranties</h2>
        <p>
          The archive is provided <strong>as is</strong>, without warranties of
          any kind, express or implied. Historical information is best-effort
          and sourced; sources and records may contain errors despite review.
          The archive is an informational, nonprofit-style project and not a
          professional or academic authority.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Anime Archive and its
          editorial team are not liable for any damages arising from your use
          of the site, reliance on its content, or inability to access it.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We may update these terms as the archive evolves. Updates are
          published on this page with a revised date and take effect on
          publication. Continued use of the archive after changes constitutes
          acceptance.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <PolicyLink href="/privacy" icon={<ScrollText className="h-4 w-4" aria-hidden />} label="Privacy Policy" />
        <PolicyLink href="/copyright" icon={<Scale className="h-4 w-4" aria-hidden />} label="Copyright and Fair Use" />
        <PolicyLink href="/content-removal" icon={<AlertTriangle className="h-4 w-4" aria-hidden />} label="Content Removal" />
      </div>

      <p className="mt-12 border-t border-line pt-6 text-xs text-faint">
        <UserX className="mr-1 inline h-3 w-3" aria-hidden />
        Questions about these terms?{" "}
        <Link href="/contact" className="text-holo-400 hover:underline">
          Contact the editorial team
        </Link>
        .
      </p>
    </div>
  );
}

function PolicyLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded border border-line-2 px-4 py-2 font-display text-sm text-paper transition-colors hover:border-crimson-500 hover:text-crimson-300"
    >
      {icon}
      {label}
    </Link>
  );
}
