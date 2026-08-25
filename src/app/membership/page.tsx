"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Sparkles,
  ShieldCheck,
  Lock,
  Crown,
  Eye,
  Layers,
  Headphones,
  FileDown,
  Box,
  Palette,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { VipCardPreview } from "@/components/membership/vip-card-preview";
import { cn } from "@/lib/utils";

const VAULTS = [
  {
    title: "The Ghibli Archival Vault",
    tag: "RESTRICTED 3D WING",
    image: "/anime/spirited-away.webp",
    description: "Explore hand-painted background cels, unreleased watercolor storyboards, and Hayao Miyazaki's production annotations in high-fidelity 3D.",
  },
  {
    title: "Neo-Tokyo 1988 Cyberpunk Wing",
    tag: "RESTRICTED 3D WING",
    image: "/images/akira-hero.jpg",
    description: "Inspect the 160,000 hand-drawn animation cels of Akira, frame-by-frame light cycle lighting passes, and Otomo's sound mixing chamber.",
  },
  {
    title: "Mecha Engineering Hangar",
    tag: "RESTRICTED 3D WING",
    image: "/anime/mobile-suit-gundam.webp",
    description: "Full-scale 3D wireframe schematics of classic Mobile Suits and Evangelion Unit-01 with original mechanical designer notes.",
  },
];

const COMPARISON_ROWS = [
  { feature: "Access to Public Anime Database (67+ Titles)", free: true, curator: true, lifetime: true },
  { feature: "Historical Timeline (1917 — Today)", free: true, curator: true, lifetime: true },
  { feature: "Standard 3D Museum Hall", free: true, curator: true, lifetime: true },
  { feature: "Personal 3D Gallery Builder (Curator Mode)", free: false, curator: true, lifetime: true },
  { feature: "Secret 3D Museum Vaults (Ghibli, Mecha, Cyberpunk)", free: false, curator: true, lifetime: true },
  { feature: "8K Storyboard & Cel Layer Inspector", free: false, curator: true, lifetime: true },
  { feature: "Curator Audio Guides & Historian Documentaries", free: false, curator: true, lifetime: true },
  { feature: "Holographic VIP Member Card & Japanese Hanko Seal", free: false, curator: true, lifetime: true },
  { feature: "High-Resolution Archival PDF & Infographics Export", free: false, curator: true, lifetime: true },
  { feature: "Name Engraved on the 3D Museum Wall of Patrons", free: false, curator: false, lifetime: true },
  { feature: "Archival Digitization Voting Rights", free: false, curator: false, lifetime: true },
  { feature: "WebXR & VR Headset Immersive Mode (Beta)", free: false, curator: false, lifetime: true },
];

const FAQS = [
  {
    q: "What is the Anime Archive Curator Pass?",
    a: "The Curator Pass is an exclusive patron tier supporting the digital preservation of anime history. Members receive access to restricted 3D museum chambers, the 3D Personal Gallery Builder, 8K cel scans, and audio documentaries.",
  },
  {
    q: "How does the Personal 3D Gallery Builder work?",
    a: "Curators can create, customize, and arrange their own 3D virtual exhibition hall with chosen anime posters, lighting presets, and architectural styles, generating a public URL to share with friends and collectors.",
  },
  {
    q: "Can I cancel or upgrade my membership anytime?",
    a: "Yes. Monthly and annual memberships can be paused or cancelled anytime with zero penalty. Lifetime Founder passes are a single one-time payment with no recurring charges.",
  },
  {
    q: "Do you offer academic or student discounts?",
    a: "Yes! Animation students and academic researchers can request a 50% educational grant by submitting their school affiliation through the contribute/contact portal.",
  },
];

export default function MembershipPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [curatorName, setCuratorName] = useState("MASTER CURATOR");

  return (
    <div className="min-h-screen bg-[#050607] pb-24 text-paper">
      {/* 1. Hero Section with Interactive Live VIP Card */}
      <div className="relative overflow-hidden border-b border-[#25282C] bg-gradient-to-b from-[#0B0D0F] via-[#050607] to-[#050607] py-16 sm:py-24">
        <div className="mx-auto max-w-[1720px] w-full px-4 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-crimson-500/40 bg-crimson-500/10 px-3.5 py-1 text-xs font-semibold text-crimson-400">
                <Crown className="h-3.5 w-3.5" />
                <span>ARCHIVE PATRON & CURATOR PASS</span>
              </div>

              <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-black uppercase tracking-tight text-paper">
                BECOME AN ARCHIVE PATRON & CURATOR
              </h1>

              <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-[#9A9A9A]">
                Help preserve a century of Japanese animation history while unlocking restricted 3D vaults, high-res cel art inspectors, museum audio guides, and your personal 3D exhibition hall.
              </p>

              {/* Name customization input for live card */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label htmlFor="curator-name" className="text-xs font-bold uppercase tracking-wider text-[#666A70]">
                  Customize Pass Name:
                </label>
                <input
                  id="curator-name"
                  type="text"
                  value={curatorName}
                  onChange={(e) => setCuratorName(e.target.value.toUpperCase())}
                  maxLength={24}
                  placeholder="YOUR NAME"
                  className="rounded-lg border border-[#25282C] bg-[#111316] px-3.5 py-2 text-xs font-bold text-paper placeholder:text-[#666A70] focus:border-crimson-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Right: Live Interactive Holographic VIP Card Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <VipCardPreview memberName={curatorName || "MASTER CURATOR"} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Pricing Tiers Section */}
      <div className="mx-auto max-w-[1720px] w-full px-4 py-16 sm:px-8 lg:px-12">
        {/* Billing Switcher */}
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-400">
            MEMBERSHIP PLANS
          </p>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-paper">
            CHOOSE YOUR CURATOR TIER
          </h2>

          <div className="mt-6 inline-flex items-center rounded-full border border-[#25282C] bg-[#111316] p-1">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                billingCycle === "monthly" ? "bg-crimson-500 text-white" : "text-[#9A9A9A] hover:text-paper"
              )}
            >
              MONTHLY
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                billingCycle === "annual" ? "bg-crimson-500 text-white shadow-[0_0_12px_rgba(227,38,46,0.4)]" : "text-[#9A9A9A] hover:text-paper"
              )}
            >
              <span>ANNUAL</span>
              <span className="rounded bg-black/40 px-1.5 py-0.5 text-[9px] font-extrabold text-[#E6AF2E]">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* TIER 1: Free Visitor */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#25282C] bg-[#111316] p-8 transition-all hover:border-[#3a3f45]">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-[#666A70]">
                TIER 01
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase text-paper">
                ARCHIVE VISITOR
              </h3>
              <p className="mt-2 text-xs text-[#9A9A9A] leading-relaxed">
                Free standard access to the historical public encyclopedia and general timeline.
              </p>

              <div className="my-6">
                <span className="font-display text-4xl font-black text-paper">¥0</span>
                <span className="text-xs text-[#666A70] ml-2">/ forever free</span>
              </div>

              <ul className="space-y-3 border-t border-[#25282C] pt-6 text-xs text-[#D8D8D8]">
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Browse full database (67+ titles)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Public 1917–2026 Historical Timeline</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Standard 3D Museum Hall view</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Personal Watchlist & Bookmarking</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#25282C]">
              <Link
                href="/anime"
                className="block w-full rounded-lg border border-[#25282C] bg-[#181B1F] py-3 text-center text-xs font-bold uppercase tracking-wider text-paper hover:bg-[#20242a] transition-colors"
              >
                CURRENT PLAN
              </Link>
            </div>
          </div>

          {/* TIER 2: Museum Curator (Featured) */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-crimson-500 bg-[#14161A] p-8 shadow-[0_0_35px_rgba(227,38,46,0.25)] transition-all hover:shadow-[0_0_45px_rgba(227,38,46,0.35)] scale-105 z-10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-crimson-500 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
              RECOMMENDED PATRON PASS
            </div>

            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-crimson-400">
                TIER 02
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase text-paper">
                MUSEUM CURATOR
              </h3>
              <p className="mt-2 text-xs text-[#9A9A9A] leading-relaxed">
                Full patron access to exclusive 3D vaults, personal 3D gallery builder, audio tours, and 8K cels.
              </p>

              <div className="my-6">
                <span className="font-display text-4xl font-black text-paper">
                  {billingCycle === "annual" ? "¥560" : "¥680"}
                </span>
                <span className="text-xs text-[#9A9A9A] ml-2">
                  / month {billingCycle === "annual" ? "(billed ¥6,800/yr)" : ""}
                </span>
              </div>

              <ul className="space-y-3 border-t border-[#25282C] pt-6 text-xs text-[#D8D8D8]">
                <li className="flex items-center gap-2.5 font-medium text-paper">
                  <Check className="h-4 w-4 text-crimson-400 shrink-0" />
                  <span>Personal 3D Gallery Builder (Curator Mode)</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-paper">
                  <Check className="h-4 w-4 text-crimson-400 shrink-0" />
                  <span>Secret 3D Museum Vaults (Ghibli, Cyberpunk, Mecha)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-crimson-400 shrink-0" />
                  <span>8K Storyboard & Cel Layer Inspector</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-crimson-400 shrink-0" />
                  <span>Historian Curator Audio Guides</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-crimson-400 shrink-0" />
                  <span>Holographic VIP Member Pass with Hanko Seal</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-crimson-400 shrink-0" />
                  <span>Printable Archival PDF Infographics</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#25282C]">
              <Link
                href="/gallery/create"
                className="block w-full rounded-lg bg-crimson-500 py-3.5 text-center text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_0_20px_rgba(227,38,46,0.45)] transition-all hover:bg-crimson-400 hover:scale-[1.02]"
              >
                BECOME A CURATOR
              </Link>
            </div>
          </div>

          {/* TIER 3: Archive Scholar & Founder (Lifetime) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#E6AF2E]/50 bg-[#151410] p-8 transition-all hover:border-[#E6AF2E]">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-[#E6AF2E]">
                TIER 03 • ONE-TIME
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase text-paper">
                SCHOLAR & FOUNDER
              </h3>
              <p className="mt-2 text-xs text-[#9A9A9A] leading-relaxed">
                Permanent lifetime patron pass with your name engraved on the 3D Museum Wall of Patrons.
              </p>

              <div className="my-6">
                <span className="font-display text-4xl font-black text-[#E6AF2E]">¥18,000</span>
                <span className="text-xs text-[#9A9A9A] ml-2">/ one-time payment</span>
              </div>

              <ul className="space-y-3 border-t border-[#25282C] pt-6 text-xs text-[#D8D8D8]">
                <li className="flex items-center gap-2.5 font-medium text-white">
                  <Check className="h-4 w-4 text-[#E6AF2E] shrink-0" />
                  <span>All Museum Curator features for life</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-white">
                  <Check className="h-4 w-4 text-[#E6AF2E] shrink-0" />
                  <span>Name engraved on 3D Museum Wall of Patrons</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#E6AF2E] shrink-0" />
                  <span>Archival Digitization Voting Rights</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#E6AF2E] shrink-0" />
                  <span>WebXR & VR Headset Immersive Mode</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-[#E6AF2E] shrink-0" />
                  <span>Gold Torii Founder Badge on profile</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#25282C]">
              <Link
                href="/gallery/create"
                className="block w-full rounded-lg border border-[#E6AF2E] bg-[#E6AF2E]/10 py-3 text-center text-xs font-bold uppercase tracking-wider text-[#E6AF2E] hover:bg-[#E6AF2E]/20 transition-colors"
              >
                JOIN AS FOUNDER
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. VIP Restricted Vaults Showcase */}
      <div className="mx-auto max-w-[1720px] w-full px-4 py-16 sm:px-8 lg:px-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-400">
            EXCLUSIVE CURATOR WINGS
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-paper">
            SECRET 3D ARCHIVAL VAULTS
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VAULTS.map((vault) => (
            <div
              key={vault.title}
              className="group relative overflow-hidden rounded-2xl border border-[#25282C] bg-[#111316] transition-all hover:border-crimson-500/60"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vault.image}
                  alt={vault.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111316] via-transparent to-black/40" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded bg-black/80 px-2.5 py-1 text-[10px] font-bold text-crimson-400 border border-crimson-900/50 backdrop-blur-md">
                  <Lock className="h-3 w-3" />
                  <span>{vault.tag}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-lg font-bold uppercase text-paper group-hover:text-crimson-400 transition-colors">
                  {vault.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#9A9A9A]">
                  {vault.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Full Feature Comparison Matrix */}
      <div className="mx-auto max-w-[1720px] w-full px-4 py-16 sm:px-8 lg:px-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-400">
            DETAILED BREAKDOWN
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-paper">
            FEATURE COMPARISON
          </h2>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#25282C] bg-[#111316]">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#25282C] bg-[#181B1F]">
                <th className="p-4 font-bold uppercase text-[#666A70]">Archival Features</th>
                <th className="p-4 font-bold uppercase text-center text-paper">Visitor (Free)</th>
                <th className="p-4 font-bold uppercase text-center text-crimson-400">Curator (Patron)</th>
                <th className="p-4 font-bold uppercase text-center text-[#E6AF2E]">Founder (Lifetime)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25282C]">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="hover:bg-[#181B1F]/50 transition-colors">
                  <td className="p-4 font-medium text-[#D8D8D8]">{row.feature}</td>
                  <td className="p-4 text-center">
                    {row.free ? (
                      <Check className="mx-auto h-4 w-4 text-emerald-400" />
                    ) : (
                      <span className="text-[#40444C]">—</span>
                    )}
                  </td>
                  <td className="p-4 text-center bg-crimson-500/5">
                    {row.curator ? (
                      <Check className="mx-auto h-4 w-4 text-crimson-400" />
                    ) : (
                      <span className="text-[#40444C]">—</span>
                    )}
                  </td>
                  <td className="p-4 text-center bg-[#E6AF2E]/5">
                    {row.lifetime ? (
                      <Check className="mx-auto h-4 w-4 text-[#E6AF2E]" />
                    ) : (
                      <span className="text-[#40444C]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. FAQ Section */}
      <div className="mx-auto max-w-[1720px] w-full px-4 py-16 sm:px-8 lg:px-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-400">
            FREQUENTLY ASKED
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-paper">
            QUESTIONS & ANSWERS
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {FAQS.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-[#25282C] bg-[#111316] p-6">
              <h3 className="font-display text-sm font-bold text-paper flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-crimson-400 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#9A9A9A]">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
