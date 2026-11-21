"use client";

import { useState } from "react";
import { VipCardPreview } from "@/components/membership/vip-card-preview";
import { MemberExperience } from "@/components/membership/member-experience";
import { LinkButton } from "@/components/ui/button";

export default function MembershipPage() {
  const [curatorName, setCuratorName] = useState("MASTER CURATOR");

  return (
    <div className="bg-ink pb-12 text-paper">
      <header className="border-b border-line">
        <div className="mx-auto w-full max-w-[1720px] px-4 py-12 sm:px-8 lg:px-12">
          <h1 className="font-display text-4xl font-semibold">VIP Pass</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">Explore anime history, collect exhibit stamps, and build your own gallery.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href="#member-experience">Explore exhibits</LinkButton>
            <LinkButton href="/gallery/create" variant="outline">Create a gallery</LinkButton>
          </div>
        </div>
      </header>
      <MemberExperience />
      <div className="mx-auto w-full max-w-[1720px] space-y-4 px-4 sm:px-8 lg:px-12">
        <details className="rounded-lg border border-line bg-charcoal p-5">
          <summary className="min-h-11 cursor-pointer py-2 font-display text-lg">Customise your pass preview</summary>
          <div className="mt-5 grid items-center gap-8 lg:grid-cols-2">
            <div>
              <label htmlFor="curator-name" className="block text-sm text-muted">Name on pass</label>
              <input id="curator-name" maxLength={24} value={curatorName} onChange={(event) => setCuratorName(event.target.value.toUpperCase())} className="mt-2 h-12 w-full max-w-sm rounded border border-line-2 bg-ink px-4 text-base text-paper" />
              <p className="mt-3 text-sm text-muted">Design preview. Paid membership is coming soon.</p>
            </div>
            <div className="flex justify-center overflow-hidden py-6">
              <VipCardPreview memberName={curatorName || "MASTER CURATOR"} tier="EXPLORER PREVIEW" memberNumber="PREVIEW" issueDate="DESIGN PREVIEW" />
            </div>
          </div>
        </details>
        <details className="rounded-lg border border-line bg-charcoal p-5">
          <summary className="min-h-11 cursor-pointer py-2 font-display text-lg">Upcoming membership plans</summary>
          <p className="mt-4 text-base text-muted">Current exhibits, passport, recap, and gallery are free to explore. Paid memberships and checkout are coming soon.</p>
          <dl className="mt-6 grid gap-6 sm:grid-cols-3">
            <div><dt className="font-display font-semibold">Visitor</dt><dd className="mt-2 text-muted">Free</dd></div>
            <div><dt className="font-display font-semibold">Museum Curator</dt><dd className="mt-2 text-muted">$8 / month or $76 / year</dd></div>
            <div><dt className="font-display font-semibold">Scholar &amp; Founder</dt><dd className="mt-2 text-muted">$199 / lifetime</dd></div>
          </dl>
          <p className="mt-5 text-sm text-muted">Proposed prices in USD. Final benefits will be announced at launch.</p>
        </details>
      </div>
    </div>
  );
}
