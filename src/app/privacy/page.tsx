import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, Database, ShieldCheck, Trash2 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Anime Archive’s privacy policy: no tracking beyond necessary functionality, no third-party ad networks, no selling of data. What we store, and how to request deletion.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — Anime Archive",
    description:
      "Minimal data, no ads, no selling. The plain-language privacy policy of the archive.",
    url: "/privacy",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  description: "The privacy policy of the Anime Archive.",
  url: "/privacy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Privacy" }]} />

      <SectionHeading
        eyebrow="Archive"
        title="Privacy Policy"
        description="Plain-language privacy policy. The short version: we collect as little as possible, we never sell data, and we run no advertising trackers."
      />

      <div className="editorial max-w-3xl">
        <h2>No Tracking Beyond What Is Necessary</h2>
        <p>
          Anime Archive does not run analytics that track you across the web,
          and it displays <strong>no third-party advertising networks</strong>{" "}
          at all. The only data stored on your device is what the site itself
          needs to function:
        </p>
        <ul>
          <li>
            <strong>Session cookie</strong> — a functional, httpOnly cookie used
            only to keep you signed in to your account.
          </li>
          <li>
            <strong>LocalStorage</strong> — your 3D museum preferences (device
            mode, graphics quality). This never leaves your browser.
          </li>
        </ul>

        <h2>We Do Not Sell Data</h2>
        <p>
          We do not sell, rent, or trade personal data. We do not share it with
          advertisers, because there are none. Personal data is used only to
          operate your account and provide the archive’s features.
        </p>

        <h2>What We Store</h2>
        <ul>
          <li>
            <strong>Account data</strong> — email address, username, and a
            password stored only as a cryptographic hash.
          </li>
          <li>
            <strong>User-generated content</strong> — favorites, ratings,
            notes, collections, and contribution submissions, tied to your
            account.
          </li>
        </ul>

        <h2>Your Rights</h2>
        <p>
          You can request access to, correction of, or <strong>deletion</strong>{" "}
          of your personal data at any time — including a full account wipe —
          by contacting us through the{" "}
          <Link href="/contact">contact form</Link>. This policy is written to
          be compatible with the GDPR (including the right to erasure and data
          portability) and the CCPA (including the right to know and the right
          to delete), and we honor those rights for everyone regardless of
          where you live.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          If this policy changes, the updated version will be published on this
          page with a revised date. Material changes will be announced on the
          site.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <PolicyCard
          icon={<Cookie className="h-4 w-4" aria-hidden />}
          title="Functional cookies only"
          text="Session login only. No ad or analytics cookies."
        />
        <PolicyCard
          icon={<Database className="h-4 w-4" aria-hidden />}
          title="Minimal data"
          text="Account data and your own contributions, nothing else."
        />
        <PolicyCard
          icon={<ShieldCheck className="h-4 w-4" aria-hidden />}
          title="Never sold"
          text="We do not sell, rent, or trade personal data. Ever."
        />
      </div>

      <p className="mt-12 border-t border-line pt-6 text-xs text-faint">
        <Trash2 className="mr-1 inline h-3 w-3" aria-hidden />
        Want your data removed?{" "}
        <Link href="/contact" className="text-holo-400 hover:underline">
          Contact us
        </Link>{" "}
        and we will handle the request.
      </p>
    </div>
  );
}

function PolicyCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="surface-card flex flex-col gap-2 p-5">
      <div className="flex h-8 w-8 items-center justify-center rounded border border-line-2 bg-charcoal-2 text-crimson-300">
        {icon}
      </div>
      <h3 className="font-display text-base text-paper">{title}</h3>
      <p className="text-sm text-muted">{text}</p>
    </div>
  );
}
