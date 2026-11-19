"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Lock,
  Crown,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Film,
  BookOpen,
  Box,
  Globe2,
  ShieldCheck,
  Award,
} from "lucide-react";
import { VipCardPreview } from "@/components/membership/vip-card-preview";
import { cn } from "@/lib/utils";

const MISSION_PILLARS = [
  {
    icon: Film,
    title: "Digital Preservation & 4K/8K Scans",
    description:
      "Rescuing decaying celluloid animation cels, acetate sheets, and original background watercolors from 1917–1990s through ultra-high-resolution multispectral 8K scanning.",
    metric: "1,200+ Cels Preserved",
    color: "from-crimson-500/20 to-transparent",
    borderColor: "border-crimson-500/30",
    iconColor: "text-crimson-400",
  },
  {
    icon: BookOpen,
    title: "Historical Documentation & Research",
    description:
      "Translating rare production logs, animator diaries, lost storyboards, and director interview manuscripts to construct the most rigorous historical anime timeline in existence.",
    metric: "100+ Years Documented",
    color: "from-amber-500/20 to-transparent",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
  },
  {
    icon: Box,
    title: "3D Museum & WebXR Infrastructure",
    description:
      "Engineering interactive 3D virtual exhibition halls, spatial lighting simulation, and upcoming WebXR VR/spatial headset integration for spatial art appreciation.",
    metric: "7 Era Halls Built",
    color: "from-sky-500/20 to-transparent",
    borderColor: "border-sky-500/30",
    iconColor: "text-sky-400",
  },
  {
    icon: Globe2,
    title: "Open Access Anime Encyclopedia",
    description:
      "Keeping the core anime history database free, open-source, ad-free, and universally accessible to educators, students, historians, and animation enthusiasts worldwide.",
    metric: "100% Ad-Free & Open",
    color: "from-emerald-500/20 to-transparent",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
];

const VAULTS = [
  {
    title: "The Ghibli Archival Vault",
    tag: "RESTRICTED 3D WING",
    image: "/anime/spirited-away.webp",
    description:
      "Explore hand-painted background cels, unreleased watercolor storyboards, and Hayao Miyazaki's production annotations in high-fidelity 3D.",
  },
  {
    title: "Neo-Tokyo 1988 Cyberpunk Wing",
    tag: "RESTRICTED 3D WING",
    image: "/images/akira-hero.jpg",
    description:
      "Inspect the 160,000 hand-drawn animation cels of Akira, frame-by-frame light cycle lighting passes, and Otomo's sound mixing chamber.",
  },
  {
    title: "Mecha Engineering Hangar",
    tag: "RESTRICTED 3D WING",
    image: "/anime/mobile-suit-gundam.webp",
    description:
      "Full-scale 3D wireframe schematics of classic Mobile Suits and Evangelion Unit-01 with original mechanical designer notes.",
  },
];

const COMPARISON_ROWS = [
  { feature: "Access to Public Anime Database (67+ Titles)", free: true, curator: true, lifetime: true },
  { feature: "Historical Timeline (1917 — Today)", free: true, curator: true, lifetime: true },
  { feature: "Standard 3D Museum Hall", free: true, curator: true, lifetime: true },
  { feature: "Personal Watchlist & Bookmarking", free: true, curator: true, lifetime: true },
  { feature: "Personal 3D Gallery Builder (Curator Mode)", free: false, curator: true, lifetime: true },
  { feature: "Secret 3D Museum Vaults (Ghibli, Mecha, Cyberpunk)", free: false, curator: true, lifetime: true },
  { feature: "8K Storyboard & Cel Layer Inspector", free: false, curator: true, lifetime: true },
  { feature: "Historian Curator Audio Guides & Documentaries", free: false, curator: true, lifetime: true },
  { feature: "Holographic VIP Member Card with Japanese Hanko", free: false, curator: true, lifetime: true },
  { feature: "High-Resolution Archival PDF & Infographics Export", free: false, curator: true, lifetime: true },
  { feature: "Name Engraved on the 3D Museum Wall of Patrons", free: false, curator: false, lifetime: true },
  { feature: "Archival Digitization Voting Rights", free: false, curator: false, lifetime: true },
  { feature: "WebXR & VR Headset Immersive Mode (Beta)", free: false, curator: false, lifetime: true },
  { feature: "VIP Founder Gold Torii Profile Badge", free: false, curator: false, lifetime: true },
];

const FAQS = [
  {
    q: "What is the difference between Museum Curator and Scholar & Founder?",
    a: "The Museum Curator tier gives you full monthly or annual access to all patron features, including restricted 3D vaults, the 3D Gallery Builder, audio guides, and 8K scans. The Scholar & Founder pass is a single lifetime payment that permanently unlocks all current and future features, includes your name permanently engraved on the 3D Museum Wall of Patrons, and grants archival voting rights.",
  },
  {
    q: "How does the Personal 3D Gallery Builder work?",
    a: "Curators can customize and arrange their own 3D virtual exhibition hall in real-time. You can choose architectural environments (Zen Temple, Cyberpunk, Archival), picture frame materials (Gold, Crimson, Obsidian, Hologram), and lighting presets, then save and share a public 3D link with friends and collectors.",
  },
  {
    q: "Where does my membership contribution go?",
    a: "100% of membership proceeds directly fund physical cel digitization scans (4K/8K), archival research, translation of lost Japanese production notes, and hosting infrastructure for the open-access virtual 3D museum without ads.",
  },
  {
    q: "Can I cancel or change my membership anytime?",
    a: "Yes. Monthly and annual memberships can be paused or cancelled anytime with zero hassle from your account settings. You retain curator privileges until the end of your billing period. Lifetime Founder passes have no recurring fees.",
  },
  {
    q: "Do you offer academic or student grants?",
    a: "Yes! Animation students, film historians, and university researchers can request complimentary or discounted academic access by contacting us through our contribution and support portal.",
  },
  {
    q: "What devices are supported for the 3D Virtual Museum?",
    a: "The 3D museum and gallery builder run natively in modern web browsers (Chrome, Safari, Firefox, Edge) on desktop, laptop, tablet, and mobile devices with WebGL support. A lightweight 2D floor plan mode is always available as an accessible fallback.",
  },
];

export default function MembershipPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [curatorName, setCuratorName] = useState("MASTER CURATOR");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-[#050607] pb-24 text-paper">
      {/* 1. Hero Section with Interactive Live VIP Card */}
      <div className="relative overflow-hidden border-b border-[#25282C] bg-gradient-to-b from-[#0B0D0F] via-[#050607] to-[#050607] py-16 sm:py-24">
        <div className="mx-auto max-w-[1720px] w-full px-4 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-crimson-500/40 bg-crimson-500/10 px-3.5 py-1 text-xs font-bold text-crimson-400">
                <Crown className="h-3.5 w-3.5" />
                <span>ARCHIVE PATRON & CURATOR PASS</span>
              </div>

              <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F2F2F2]">
                BECOME AN ARCHIVE PATRON & CURATOR
              </h1>

              <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-[#B0B0B8]">
                Help preserve a century of Japanese animation history while unlocking restricted 3D vaults, high-res cel art inspectors, museum audio guides, and your personal 3D exhibition hall.
              </p>

              {/* Name customization input for live card */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label htmlFor="curator-name" className="text-xs font-bold uppercase tracking-wider text-[#8E9099]">
                  Customize Pass Name:
                </label>
                <input
                  id="curator-name"
                  type="text"
                  value={curatorName}
                  onChange={(e) => setCuratorName(e.target.value.toUpperCase())}
                  maxLength={24}
                  placeholder="YOUR NAME"
                  className="rounded-lg border border-[#25282C] bg-[#111316] px-3.5 py-2 text-xs font-bold text-[#F2F2F2] placeholder:text-[#666A70] focus:border-crimson-500 focus:outline-none"
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
          <h2 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#F2F2F2]">
            CHOOSE YOUR CURATOR TIER
          </h2>

          <div className="mt-6 inline-flex items-center rounded-full border border-[#25282C] bg-[#111316] p-1">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                billingCycle === "monthly" ? "bg-crimson-500 text-white shadow-sm" : "text-[#8E9099] hover:text-[#F2F2F2]"
              )}
            >
              MONTHLY
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                billingCycle === "annual" ? "bg-crimson-500 text-white shadow-[0_0_12px_rgba(227,38,46,0.4)]" : "text-[#8E9099] hover:text-[#F2F2F2]"
              )}
            >
              <span>ANNUAL</span>
              <span className="rounded bg-black/40 px-1.5 py-0.5 text-[9px] font-extrabold text-amber-400">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3 items-stretch">
          {/* TIER 1: Archive Visitor (FREE) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#25282C] bg-[#111316] p-8 transition-all hover:border-[#3a3f45]">
            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-[#8E9099]">
                TIER 01 • STANDARD ACCESS
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase text-[#F2F2F2]">
                ARCHIVE VISITOR
              </h3>
              <p className="mt-2 text-xs text-[#B0B0B8] leading-relaxed">
                Standard access to explore the complete historical database, chronological timeline, and general museum floor.
              </p>

              <div className="my-6">
                <span className="font-display text-4xl font-black text-[#F2F2F2]">$0</span>
                <span className="text-xs text-[#8E9099] ml-2 font-medium">/ free forever</span>
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
                className="block w-full rounded-lg border border-[#25282C] bg-[#181B1F] py-3 text-center text-xs font-bold uppercase tracking-wider text-[#F2F2F2] hover:bg-[#20242a] transition-colors"
              >
                CURRENT PLAN
              </Link>
            </div>
          </div>

          {/* TIER 2: Museum Curator ($8/mo or $76/yr) - Visually Recommended */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-crimson-500 bg-[#14161A] p-8 shadow-[0_0_35px_rgba(227,38,46,0.25)] transition-all hover:shadow-[0_0_45px_rgba(227,38,46,0.35)] scale-105 z-10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-crimson-500 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              <span>MOST POPULAR</span>
            </div>

            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-crimson-400">
                TIER 02 • PATRON PASS
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase text-[#F2F2F2]">
                MUSEUM CURATOR
              </h3>
              <p className="mt-2 text-xs text-[#B0B0B8] leading-relaxed">
                Full patron access to exclusive 3D vaults, personal 3D gallery builder, historian audio tours, and 8K cels.
              </p>

              <div className="my-6">
                <span className="font-display text-4xl font-black text-[#F2F2F2]">
                  {billingCycle === "annual" ? "$76" : "$8"}
                </span>
                <span className="text-xs text-[#8E9099] ml-2 font-medium">
                  {billingCycle === "annual" ? "/ year ($6.33/mo)" : "/ month"}
                </span>
              </div>

              <ul className="space-y-3 border-t border-[#25282C] pt-6 text-xs text-[#D8D8D8]">
                <li className="flex items-center gap-2.5 font-medium text-[#F2F2F2]">
                  <Check className="h-4 w-4 text-crimson-400 shrink-0" />
                  <span>Personal 3D Gallery Builder (Curator Mode)</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-[#F2F2F2]">
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
                className="block w-full rounded-lg bg-crimson-500 py-3.5 text-center text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_0_20px_rgba(227,38,46,0.45)] transition-all hover:bg-crimson-400 hover:scale-[1.02] cursor-pointer"
              >
                BECOME A CURATOR
              </Link>
            </div>
          </div>

          {/* TIER 3: Scholar & Founder ($199 Lifetime) - Premium Gold Accent */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-yellow-500/40 bg-[#151410] p-8 shadow-[0_0_35px_rgba(234,179,8,0.2)] transition-all hover:border-yellow-500/80 hover:shadow-[0_0_45px_rgba(234,179,8,0.3)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-yellow-500 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-black shadow-md flex items-center gap-1.5">
              <Award className="h-3 w-3 text-black" />
              <span>LIFETIME ACCESS</span>
            </div>

            <div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-yellow-500">
                TIER 03 • FOUNDER CIRCLE
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase text-[#F2F2F2]">
                SCHOLAR & FOUNDER
              </h3>
              <p className="mt-2 text-xs text-[#B0B0B8] leading-relaxed">
                Permanent lifetime patron pass with your name engraved on the 3D Museum Wall of Patrons.
              </p>

              <div className="my-6">
                <span className="font-display text-4xl font-black text-yellow-500">$199</span>
                <span className="text-xs text-[#8E9099] ml-2 font-medium">/ lifetime access</span>
              </div>

              <ul className="space-y-3 border-t border-[#25282C] pt-6 text-xs text-[#D8D8D8]">
                <li className="flex items-center gap-2.5 font-medium text-white">
                  <Check className="h-4 w-4 text-yellow-500 shrink-0" />
                  <span>All Museum Curator features for life</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-white">
                  <Check className="h-4 w-4 text-yellow-500 shrink-0" />
                  <span>Name engraved on 3D Museum Wall of Patrons</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-yellow-500 shrink-0" />
                  <span>Archival Digitization Voting Rights</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-yellow-500 shrink-0" />
                  <span>WebXR & VR Headset Immersive Mode</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-yellow-500 shrink-0" />
                  <span>Gold Torii Founder Badge on profile</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#25282C]">
              <Link
                href="/gallery/create"
                className="block w-full rounded-lg bg-yellow-500 py-3.5 text-center text-xs font-bold uppercase tracking-[0.16em] text-black shadow-[0_0_18px_rgba(234,179,8,0.35)] transition-all hover:bg-yellow-400 hover:scale-[1.02] cursor-pointer"
              >
                JOIN AS FOUNDER
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. WHERE YOUR SUPPORT GOES - Mission Value Section */}
      <div className="mx-auto max-w-[1720px] w-full px-4 py-16 sm:px-8 lg:px-12">
        <div className="rounded-3xl border border-[#25282C] bg-gradient-to-b from-[#111316] to-[#0A0C0E] p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-crimson-500/40 bg-crimson-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-crimson-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>PRESERVATION MISSION</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#F2F2F2]">
              WHERE YOUR SUPPORT GOES
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#B0B0B8]">
              Unlike commercial streaming platforms, the Anime Archive is an independent cultural preservation initiative. Every dollar received is directly reinvested into salvaging physical animation artifacts and making Japanese animation history immortal and accessible.
            </p>
          </div>

          {/* 4 Mission Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MISSION_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className={cn(
                    "relative overflow-hidden rounded-2xl border bg-[#0D0F12] p-6 flex flex-col justify-between transition-all hover:-translate-y-1",
                    pillar.borderColor
                  )}
                >
                  <div className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl ${pillar.color} rounded-bl-full pointer-events-none`} />

                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#16181D] border border-[#25282C]">
                      <Icon className={cn("h-6 w-6", pillar.iconColor)} />
                    </div>

                    <h3 className="mt-5 font-display text-base font-bold uppercase text-[#F2F2F2] leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-[#8E9099] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#25282C]/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#666A70]">
                      IMPACT
                    </span>
                    <span className={cn("text-xs font-black uppercase tracking-wider", pillar.iconColor)}>
                      {pillar.metric}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. VIP Restricted Vaults Showcase */}
      <div className="mx-auto max-w-[1720px] w-full px-4 py-16 sm:px-8 lg:px-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-400">
            EXCLUSIVE CURATOR WINGS
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F2F2F2]">
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
                <h3 className="font-display text-lg font-bold uppercase text-[#F2F2F2] group-hover:text-crimson-400 transition-colors">
                  {vault.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#8E9099]">
                  {vault.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Feature Comparison Table (Sticky Header & Sticky First Column) */}
      <div className="mx-auto max-w-[1720px] w-full px-4 py-16 sm:px-8 lg:px-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-400">
            DETAILED BREAKDOWN
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F2F2F2]">
            FEATURE COMPARISON
          </h2>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#25282C] bg-[#111316] shadow-xl">
          <table className="w-full text-left text-xs border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-[#25282C] bg-[#181B1F] sticky top-0 z-20">
                <th className="p-4 sm:p-5 font-bold uppercase text-[#8E9099] sticky left-0 bg-[#181B1F] z-30 min-w-[220px]">
                  Archival Features
                </th>
                <th className="p-4 sm:p-5 font-bold uppercase text-center text-[#F2F2F2] min-w-[130px]">
                  Visitor (Free)
                </th>
                <th className="p-4 sm:p-5 font-bold uppercase text-center text-crimson-400 bg-crimson-500/10 min-w-[150px]">
                  Curator ($8/mo)
                </th>
                <th className="p-4 sm:p-5 font-bold uppercase text-center text-yellow-500 bg-yellow-500/10 min-w-[150px]">
                  Founder ($199)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25282C]">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="hover:bg-[#181B1F]/50 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-[#D8D8D8] sticky left-0 bg-[#111316] z-10">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    {row.free ? (
                      <Check className="mx-auto h-4 w-4 text-emerald-400" />
                    ) : (
                      <span className="text-[#40444C] font-black">—</span>
                    )}
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-crimson-500/5">
                    {row.curator ? (
                      <Check className="mx-auto h-4 w-4 text-crimson-400" />
                    ) : (
                      <span className="text-[#40444C] font-black">—</span>
                    )}
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-yellow-500/5">
                    {row.lifetime ? (
                      <Check className="mx-auto h-4 w-4 text-yellow-500" />
                    ) : (
                      <span className="text-[#40444C] font-black">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Interactive Accordion FAQ Section */}
      <div className="mx-auto max-w-[1720px] w-full px-4 py-16 sm:px-8 lg:px-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-400">
            FREQUENTLY ASKED
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F2F2F2]">
            QUESTIONS & ANSWERS
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-xl border border-[#25282C] bg-[#111316] transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-[#16181D] cursor-pointer"
                >
                  <span className="font-display text-sm font-bold text-[#F2F2F2] flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-crimson-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-[#8E9099] transition-transform duration-300 shrink-0 ml-3",
                      isOpen ? "rotate-180 text-crimson-400" : ""
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs leading-relaxed text-[#B0B0B8] border-t border-[#25282C]/50 animate-in fade-in duration-200">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
