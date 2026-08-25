import type { Metadata } from "next";
import Link from "next/link";
import { Globe, MessageSquare, ShieldAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Anime Archive editorial team: general questions, corrections, press, and partnership inquiries. Takedown requests are handled via the content removal policy.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Anime Archive",
    description:
      "Reach the independent editorial team behind the archive.",
    url: "/contact",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact",
  description: "Contact the Anime Archive editorial team.",
  url: "/contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 py-8 sm:px-8 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <SectionHeading
        eyebrow="Institution"
        title="Contact"
        description="Questions, corrections, press, and partnership inquiries — the editorial team reads every message."
      />

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="editorial max-w-3xl">
            <p>
              Anime Archive is a <strong>digital-first archive</strong>; there
              is no physical mailing address, and none is needed — please use
              the form. The archive is maintained by an independent editorial
              team with no studio affiliation.
            </p>
          </div>

          <div className="mt-6">
            <ContactForm />
          </div>

          <p className="mt-4 text-xs text-faint">
            The contact handler is a demo implementation: messages are
            validated and logged for review rather than sent by email.
          </p>
        </div>

        <aside className="space-y-4 lg:col-span-2">
          <div className="surface-card p-5">
            <h2 className="flex items-center gap-2 font-display text-base text-paper">
              <MessageSquare className="h-4 w-4 text-crimson-300" aria-hidden />
              What to send where
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <strong className="text-paper-2">Corrections</strong> — use the{" "}
                <Link href="/contribute" className="text-holo-400 hover:underline">
                  contribution system
                </Link>{" "}
                with type Correction, or the form with subject Correction.
              </li>
              <li>
                <strong className="text-paper-2">Takedown requests</strong> — see the{" "}
                <Link href="/content-removal" className="text-holo-400 hover:underline">
                  content removal policy
                </Link>
                .
              </li>
              <li>
                <strong className="text-paper-2">Press and partnerships</strong> — use
                the form with subject Press or Partnership.
              </li>
            </ul>
          </div>

          <div className="surface-panel border-t border-crimson-500/40 p-5">
            <h2 className="flex items-center gap-2 font-display text-base text-paper">
              <ShieldAlert className="h-4 w-4 text-crimson-300" aria-hidden />
              Rights holders
            </h2>
            <p className="mt-2 text-sm text-paper-2">
              If you hold rights in a work listed in the archive, please use
              the{" "}
              <Link href="/content-removal" className="text-holo-400 hover:underline">
                content removal process
              </Link>
              . The archive hosts no copyrighted media, but we will review any
              request, typically within 7–14 business days.
            </p>
          </div>

          <div className="surface-card p-5">
            <h2 className="flex items-center gap-2 font-display text-base text-paper">
              <Globe className="h-4 w-4 text-crimson-300" aria-hidden />
              Before you write
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
              <li>
                How records are verified:{" "}
                <Link href="/methodology" className="text-holo-400 hover:underline">
                  Methodology
                </Link>
              </li>
              <li>
                Where facts come from:{" "}
                <Link href="/sources" className="text-holo-400 hover:underline">
                  Sources
                </Link>
              </li>
              <li>
                About the archive:{" "}
                <Link href="/about" className="text-holo-400 hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <p className="mt-12 border-t border-line pt-6 text-xs text-faint">
        Anime Archive is a digital-first archive; please use the form above.
        We do not publish addresses or contact details of our editorial team.
      </p>
    </div>
  );
}
