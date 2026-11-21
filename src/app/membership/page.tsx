"use client";

import { useState } from "react";
import { VipCardPreview } from "@/components/membership/vip-card-preview";
import { MemberExperience } from "@/components/membership/member-experience";
import { LinkButton } from "@/components/ui/button";

export default function MembershipPage() {
  const [curatorName, setCuratorName] = useState("MASTER CURATOR");
  const [annual, setAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-ink pb-20 text-paper">
      <header className="border-b border-line bg-charcoal/40">
        <div className="mx-auto grid w-full max-w-[1720px] items-center gap-12 px-4 py-16 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.2em] text-crimson-400">Anime Archive · VIP Pass</p>
            <h1 className="mt-4 font-serif text-4xl font-bold sm:text-6xl">Make anime history part of your story.</h1>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">Explore guided exhibits, collect Museum Passport stamps, discover your anime tastes, and curate your own 3D gallery.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton href="#member-experience">Preview this month’s exhibit</LinkButton>
              <LinkButton href="/gallery/create" variant="outline">Try the gallery demo</LinkButton>
            </div>
            <label htmlFor="curator-name" className="mt-8 block text-sm text-muted">Preview your pass name</label>
            <input id="curator-name" maxLength={24} value={curatorName} onChange={(event) => setCuratorName(event.target.value.toUpperCase())} className="mt-2 w-full max-w-sm rounded border border-line-2 bg-charcoal px-4 py-3 text-paper focus-visible:outline-crimson-400" />
            <p className="mt-2 text-xs text-muted">Card design preview. Membership activation is planned.</p>
          </div>
          <div className="flex justify-center overflow-hidden py-8"><VipCardPreview memberName={curatorName || "MASTER CURATOR"} tier="EXPLORER PREVIEW" memberNumber="PREVIEW" issueDate="DESIGN PREVIEW" /></div>
        </div>
      </header>

      <MemberExperience />

      <section className="mx-auto w-full max-w-[1720px] px-4 py-12 sm:px-8 lg:px-12" aria-labelledby="plans-title">
        <h2 id="plans-title" className="font-display text-3xl">Membership plans</h2>
        <p className="mt-3 max-w-2xl text-muted">Explore the exhibits, passport, recap, and gallery demo today. Paid memberships are planned. Checkout and account billing are coming soon.</p>
        <label className="mt-6 inline-flex items-center gap-3 rounded border border-line px-4 py-3 text-sm">
          <input type="checkbox" checked={annual} onChange={(event) => setAnnual(event.target.checked)} className="accent-crimson-500" />
          Show annual pricing
        </label>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <article className="rounded-lg border border-line bg-charcoal p-6">
            <h3 className="font-display text-xl">Visitor</h3>
            <p className="mt-3 text-3xl">Free</p>
            <p className="my-5 text-sm leading-relaxed text-muted">Explore the public archive, timeline, museum, guided exhibits, browser passport, and personal watchlist recap.</p>
            <LinkButton href="/anime" variant="outline">Explore the archive</LinkButton>
          </article>
          <article className="rounded-lg border border-crimson-500/50 bg-charcoal p-6">
            <h3 className="font-display text-xl">Museum Curator</h3>
            <p className="mt-3 text-3xl">{annual ? "$76" : "$8"}<span className="text-sm text-muted"> / {annual ? "year" : "month"}</span></p>
            <p className="mt-2 text-xs text-muted">Proposed pricing in USD · Coming soon</p>
            <p className="my-5 text-sm leading-relaxed text-muted">Planned membership supporting new editorial exhibits and gallery customisation. Try the current gallery builder and exhibit collection before launch.</p>
            <LinkButton href="/gallery/create" variant="outline">Try the gallery demo</LinkButton>
          </article>
          <article className="rounded-lg border border-line bg-charcoal p-6">
            <h3 className="font-display text-xl">Scholar &amp; Founder</h3>
            <p className="mt-3 text-3xl">$199<span className="text-sm text-muted"> / lifetime</span></p>
            <p className="mt-2 text-xs text-muted">Proposed pricing in USD · Coming soon</p>
            <p className="my-5 text-sm leading-relaxed text-muted">A proposed founding supporter tier with patron recognition and input on future exhibit topics. Final benefits will be published when membership opens.</p>
            <LinkButton href="#passport" variant="outline">Explore your passport</LinkButton>
          </article>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1720px] px-4 py-12 sm:px-8 lg:px-12">
        <h2 className="font-display text-3xl">Built for curious fans</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div><h3 className="font-display text-lg">English audio and transcripts</h3><p className="mt-2 text-sm text-muted">Read at your own pace or listen with your device’s speech voice. Each exhibit includes its sources and an original viewing exercise.</p></div>
          <div><h3 className="font-display text-lg">A passport you can keep</h3><p className="mt-2 text-sm text-muted">Earn three exhibit stamps and download your passport as an image. Browser progress stays on this device and may be removed when browser data is cleared.</p></div>
          <div><h3 className="font-display text-lg">Your actual watchlist</h3><p className="mt-2 text-sm text-muted">Sign in to see your most-watched decade, studio, and genre across completed titles. Your recap updates when you refresh after editing your watchlist.</p></div>
        </div>
      </section>
    </div>
  );
}
