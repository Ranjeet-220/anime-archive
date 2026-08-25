"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Tv,
  Film,
  Disc,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  Bookmark,
} from "lucide-react";
import { CoverArt } from "@/components/ui/anime-card";
import { cn } from "@/lib/utils";

export interface EraItem {
  id: string;
  slug: string;
  name: string;
  period: string;
  decade: string;
  startYear: number;
  endYear: number | null;
  count: number;
  description: string;
  stats: {
    iconicAnime: number;
    filmsReleased: number;
    ovaReleased: number;
    newStudios: number;
    majorEvents: number;
  };
  anime: Array<{
    slug: string;
    title: string;
    japaneseTitle?: string | null;
    year: number;
    format: string;
    coverUrl?: string | null;
  }>;
}

const DECADES_DATA: EraItem[] = [
  {
    id: "1910s",
    slug: "pioneering-era",
    name: "THE 1910s – 1930s",
    period: "1917 — 1939",
    decade: "1910s",
    startYear: 1917,
    endYear: 1939,
    count: 126,
    description: "The dawn of Japanese animation: chalk drawings, paper cutouts, silent shorts and the very first celluloid experiments.",
    stats: {
      iconicAnime: 18,
      filmsReleased: 45,
      ovaReleased: 0,
      newStudios: 3,
      majorEvents: 12,
    },
    anime: [
      { slug: "namakura-gatana", title: "Namakura Gatana", japaneseTitle: "なまくら刀", year: 1917, format: "MOVIE", coverUrl: "/anime/namakura-gatana.webp" },
      { slug: "urashima-taro", title: "Urashima Taro", japaneseTitle: "浦島太郎", year: 1918, format: "MOVIE", coverUrl: "/anime/astro-boy.webp" },
      { slug: "the-dull-sword", title: "The Dull Sword", japaneseTitle: "塙凹内名刀之巻", year: 1917, format: "MOVIE", coverUrl: "/anime/namakura-gatana.webp" },
    ],
  },
  {
    id: "1960s",
    slug: "dawn-of-television",
    name: "THE 1960s",
    period: "1960 — 1969",
    decade: "1960s",
    startYear: 1960,
    endYear: 1969,
    count: 1966,
    description: "Osamu Tezuka's limited animation breakthrough with Astro Boy, establishing weekly TV broadcast anime and studio pipelines.",
    stats: {
      iconicAnime: 34,
      filmsReleased: 28,
      ovaReleased: 0,
      newStudios: 6,
      majorEvents: 14,
    },
    anime: [
      { slug: "astro-boy", title: "Astro Boy", japaneseTitle: "鉄腕アトム", year: 1963, format: "TV", coverUrl: "/anime/astro-boy.webp" },
      { slug: "speed-racer", title: "Speed Racer", japaneseTitle: "マッハGoGoGo", year: 1967, format: "TV", coverUrl: "/anime/astro-boy.webp" },
      { slug: "dororo", title: "Dororo", japaneseTitle: "どろろ", year: 1969, format: "TV", coverUrl: "/anime/astro-boy.webp" },
    ],
  },
  {
    id: "1970s",
    slug: "mecha-revolution",
    name: "THE 1970s",
    period: "1970 — 1979",
    decade: "1970s",
    startYear: 1970,
    endYear: 1979,
    count: 1979,
    description: "The explosion of real robot mecha drama with Mobile Suit Gundam, Space Battleship Yamato, and sophisticated world-building.",
    stats: {
      iconicAnime: 52,
      filmsReleased: 36,
      ovaReleased: 2,
      newStudios: 7,
      majorEvents: 18,
    },
    anime: [
      { slug: "mobile-suit-gundam", title: "Mobile Suit Gundam", japaneseTitle: "機動戦士ガンダム", year: 1979, format: "TV", coverUrl: "/anime/mobile-suit-gundam.webp" },
      { slug: "lupin-iii", title: "Lupin III: Part II", japaneseTitle: "ルパン三世", year: 1977, format: "TV", coverUrl: "/anime/cowboy-bebop.webp" },
      { slug: "space-battleship-yamato", title: "Space Battleship Yamato", japaneseTitle: "宇宙戦艦ヤマト", year: 1974, format: "TV", coverUrl: "/anime/mobile-suit-gundam.webp" },
    ],
  },
  {
    id: "1980s",
    slug: "golden-age-1980s",
    name: "THE 1980s",
    period: "1980 — 1989",
    decade: "1980s",
    startYear: 1980,
    endYear: 1989,
    count: 1988,
    description: "A golden age of anime films, OVA culture, and iconic series that shaped generations worldwide.",
    stats: {
      iconicAnime: 119,
      filmsReleased: 42,
      ovaReleased: 65,
      newStudios: 8,
      majorEvents: 15,
    },
    anime: [
      { slug: "akira", title: "Akira", japaneseTitle: "アキラ", year: 1988, format: "Movie", coverUrl: "/images/akira-hero.jpg" },
      { slug: "mobile-suit-gundam", title: "Mobile Suit Gundam", japaneseTitle: "機動戦士ガンダム", year: 1979, format: "TV Series", coverUrl: "/anime/mobile-suit-gundam.webp" },
      { slug: "dragon-ball-z", title: "Dragon Ball", japaneseTitle: "ドラゴンボール", year: 1986, format: "TV Series", coverUrl: "/anime/dragon-ball-z.webp" },
      { slug: "city-hunter", title: "City Hunter", japaneseTitle: "シティーハンター", year: 1987, format: "TV Series", coverUrl: "/anime/cowboy-bebop.webp" },
      { slug: "fist-of-the-north-star", title: "Fist of the North Star", japaneseTitle: "北斗の拳", year: 1984, format: "TV Series", coverUrl: "/anime/berserk-1997.webp" },
      { slug: "grave-of-the-fireflies", title: "Grave of the Fireflies", japaneseTitle: "火垂るの墓", year: 1988, format: "Movie", coverUrl: "/anime/grave-of-the-fireflies.webp" },
    ],
  },
  {
    id: "1990s",
    slug: "renaissance-1990s",
    name: "THE 1990s",
    period: "1990 — 1999",
    decade: "1990s",
    startYear: 1990,
    endYear: 1999,
    count: 1999,
    description: "Philosophical masterpieces, Evangelion deconstruction, Bebop jazz noir, and Studio Ghibli international acclaim.",
    stats: {
      iconicAnime: 145,
      filmsReleased: 68,
      ovaReleased: 92,
      newStudios: 11,
      majorEvents: 22,
    },
    anime: [
      { slug: "neon-genesis-evangelion", title: "Neon Genesis Evangelion", japaneseTitle: "新世紀エヴァンゲリオン", year: 1995, format: "TV", coverUrl: "/anime/neon-genesis-evangelion.webp" },
      { slug: "cowboy-bebop", title: "Cowboy Bebop", japaneseTitle: "カウボーイビバップ", year: 1998, format: "TV", coverUrl: "/anime/cowboy-bebop.webp" },
      { slug: "ghost-in-the-shell", title: "Ghost in the Shell", japaneseTitle: "攻殻機動隊", year: 1995, format: "Movie", coverUrl: "/anime/ghost-in-the-shell.webp" },
      { slug: "princess-mononoke", title: "Princess Mononoke", japaneseTitle: "もののけ姫", year: 1997, format: "Movie", coverUrl: "/anime/princess-mononoke.webp" },
      { slug: "one-piece", title: "One Piece", japaneseTitle: "ONE PIECE", year: 1999, format: "TV", coverUrl: "/anime/one-piece.webp" },
    ],
  },
  {
    id: "2000s",
    slug: "digital-transition",
    name: "THE 2000s",
    period: "2000 — 2009",
    decade: "2000s",
    startYear: 2000,
    endYear: 2009,
    count: 2005,
    description: "The digital animation transition, the Big Three shonen era, Spirited Away Academy Award, and Death Note psychological thriller fever.",
    stats: {
      iconicAnime: 180,
      filmsReleased: 95,
      ovaReleased: 74,
      newStudios: 14,
      majorEvents: 28,
    },
    anime: [
      { slug: "death-note", title: "Death Note", japaneseTitle: "デスノート", year: 2006, format: "TV", coverUrl: "/anime/death-note.webp" },
      { slug: "fullmetal-alchemist-brotherhood", title: "Fullmetal Alchemist: Brotherhood", japaneseTitle: "鋼の錬金術師", year: 2009, format: "TV", coverUrl: "/anime/fullmetal-alchemist-brotherhood.webp" },
      { slug: "spirited-away", title: "Spirited Away", japaneseTitle: "千と千尋の神隠し", year: 2001, format: "Movie", coverUrl: "/anime/spirited-away.webp" },
      { slug: "code-geass", title: "Code Geass", japaneseTitle: "コードギアス", year: 2006, format: "TV", coverUrl: "/anime/code-geass.webp" },
    ],
  },
  {
    id: "2010s",
    slug: "global-streaming",
    name: "THE 2010s",
    period: "2010 — 2019",
    decade: "2010s",
    startYear: 2010,
    endYear: 2019,
    count: 2018,
    description: "Global simulcast streaming explosion, modern cinematic records like Your Name, Attack on Titan, and Demon Slayer.",
    stats: {
      iconicAnime: 210,
      filmsReleased: 110,
      ovaReleased: 50,
      newStudios: 16,
      majorEvents: 35,
    },
    anime: [
      { slug: "attack-on-titan", title: "Attack on Titan", japaneseTitle: "進撃の巨人", year: 2013, format: "TV", coverUrl: "/anime/attack-on-titan.webp" },
      { slug: "demon-slayer", title: "Demon Slayer: Kimetsu no Yaiba", japaneseTitle: "鬼滅の刃", year: 2019, format: "TV", coverUrl: "/anime/demon-slayer.webp" },
      { slug: "your-name", title: "Your Name.", japaneseTitle: "君の名は。", year: 2016, format: "Movie", coverUrl: "/anime/your-name.webp" },
      { slug: "hunter-x-hunter-2011", title: "Hunter x Hunter (2011)", japaneseTitle: "ハンター×ハンター", year: 2011, format: "TV", coverUrl: "/anime/hunter-x-hunter-2011.webp" },
    ],
  },
  {
    id: "2020s",
    slug: "modern-era",
    name: "THE 2020s",
    period: "2020 — Present",
    decade: "2020s",
    startYear: 2020,
    endYear: null,
    count: 2026,
    description: "Global theatrical milestones, prestige seasonal production, and worldwide anime cultural dominance.",
    stats: {
      iconicAnime: 130,
      filmsReleased: 65,
      ovaReleased: 20,
      newStudios: 12,
      majorEvents: 20,
    },
    anime: [
      { slug: "jujutsu-kaisen", title: "Jujutsu Kaisen", japaneseTitle: "呪術廻戦", year: 2020, format: "TV", coverUrl: "/anime/jujutsu-kaisen.webp" },
      { slug: "chainsaw-man", title: "Chainsaw Man", japaneseTitle: "チェンソーマン", year: 2022, format: "TV", coverUrl: "/anime/chainsaw-man.webp" },
      { slug: "frieren-beyond-journeys-end", title: "Frieren: Beyond Journey's End", japaneseTitle: "葬送のフリーレン", year: 2023, format: "TV", coverUrl: "/anime/frieren-beyond-journeys-end.webp" },
      { slug: "solo-leveling", title: "Solo Leveling", japaneseTitle: "俺だけレベルアップな件", year: 2024, format: "TV", coverUrl: "/anime/solo-leveling.webp" },
    ],
  },
];

const DECADE_TRACK = [
  { label: "1910s", count: "126" },
  { label: "1930s", count: "1935" },
  { label: "1950s", count: "1966" },
  { label: "1960s", count: "1968" },
  { label: "1970s", count: "1976" },
  { label: "1980s", count: "1980s" },
  { label: "1990s", count: "1990s" },
  { label: "2000s", count: "2000s" },
  { label: "2010s", count: "2010s" },
  { label: "2020s", count: "2026" },
];

export function TimelineCinematic() {
  const [selectedDecade, setSelectedDecade] = useState("1980s");
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentEra =
    DECADES_DATA.find((d) => d.decade === selectedDecade) ?? DECADES_DATA[3];

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 320;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      {/* 1. Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-paper">
            ANIME TIMELINE
          </h1>
          <p className="mt-1.5 text-sm text-[#9A9A9A]">
            Explore the evolution of anime across the decades.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="inline-flex items-center rounded-full border border-[#25282C] bg-[#111316] p-1 self-start">
          <Link
            href="/museum"
            className="inline-flex items-center gap-2 rounded-full bg-crimson-500 px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_12px_rgba(227,38,46,0.4)] transition-all hover:bg-crimson-400"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>3D VIEW</span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#9A9A9A] transition-colors hover:text-paper"
          >
            <span>CLASSIC VIEW</span>
          </button>
        </div>
      </div>

      {/* 2. Horizontal Decade Selector Line */}
      <div className="relative py-6">
        {/* Connecting track line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 -translate-y-1/2 bg-[#25282C]" />

        {/* Decade nodes */}
        <div className="relative flex items-center justify-between overflow-x-auto no-scrollbar gap-8 px-4">
          {DECADE_TRACK.map((item) => {
            const isSelected = selectedDecade === item.label || (selectedDecade === "1980s" && item.label === "1980s");
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  const match = DECADES_DATA.find((d) => d.decade === item.label);
                  if (match) setSelectedDecade(match.decade);
                  else setSelectedDecade(item.label);
                }}
                className="group relative flex flex-col items-center gap-2.5 transition-all cursor-pointer"
              >
                {/* Top Label */}
                <span
                  className={cn(
                    "text-xs font-bold tracking-wider transition-colors",
                    isSelected ? "text-paper text-sm scale-105" : "text-[#666A70] group-hover:text-[#9A9A9A]"
                  )}
                >
                  {item.label}
                </span>

                {/* Node Ring Indicator */}
                <div
                  className={cn(
                    "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isSelected
                      ? "border-crimson-500 bg-[#050607] shadow-[0_0_16px_#ff3038] scale-125"
                      : "border-[#343840] bg-[#111316] group-hover:border-crimson-500/50"
                  )}
                >
                  {isSelected ? (
                    <span className="h-2 w-2 rounded-full bg-crimson-500 shadow-[0_0_8px_#ff3038]" />
                  ) : null}
                </div>

                {/* Bottom Count Subtext */}
                <span
                  className={cn(
                    "text-[10px] font-mono tracking-tight",
                    isSelected ? "text-crimson-400 font-bold" : "text-[#40444C]"
                  )}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Selected Era Showcase Section */}
      <div className="grid gap-8 lg:grid-cols-12 items-center">
        {/* Left: Era Details & Statistics Sidebar */}
        <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-[#25282C] bg-[#111316] p-6 sm:p-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-paper">
              {currentEra.name}
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#9A9A9A]">
              {currentEra.description}
            </p>

            {/* Statistics list with circular red icons */}
            <div className="mt-8 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-crimson-500/10 text-crimson-400 border border-crimson-500/30">
                    <Tv className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[#9A9A9A]">Iconic Anime</span>
                </div>
                <span className="font-display text-sm font-bold text-paper">
                  {currentEra.stats.iconicAnime}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-crimson-500/10 text-crimson-400 border border-crimson-500/30">
                    <Film className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[#9A9A9A]">Films Released</span>
                </div>
                <span className="font-display text-sm font-bold text-paper">
                  {currentEra.stats.filmsReleased}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-crimson-500/10 text-crimson-400 border border-crimson-500/30">
                    <Disc className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[#9A9A9A]">OVA Released</span>
                </div>
                <span className="font-display text-sm font-bold text-paper">
                  {currentEra.stats.ovaReleased}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-crimson-500/10 text-crimson-400 border border-crimson-500/30">
                    <Building2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[#9A9A9A]">New Studios</span>
                </div>
                <span className="font-display text-sm font-bold text-paper">
                  {currentEra.stats.newStudios}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-crimson-500/10 text-crimson-400 border border-crimson-500/30">
                    <Calendar className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[#9A9A9A]">Major Events</span>
                </div>
                <span className="font-display text-sm font-bold text-paper">
                  {currentEra.stats.majorEvents}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#25282C]">
            <Link
              href={`/timeline/${currentEra.slug}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-crimson-500 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_0_16px_rgba(227,38,46,0.35)] transition-all hover:bg-crimson-400"
            >
              <span>EXPLORE THIS ERA</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right: Era Anime Horizontal Carousel */}
        <div className="relative lg:col-span-8">
          {/* Arrow Buttons */}
          <button
            type="button"
            onClick={() => scrollCarousel("left")}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#25282C] bg-[#111316]/90 text-paper backdrop-blur-md transition-all hover:border-crimson-500 hover:text-crimson-400 cursor-pointer shadow-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => scrollCarousel("right")}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#25282C] bg-[#111316]/90 text-paper backdrop-blur-md transition-all hover:border-crimson-500 hover:text-crimson-400 cursor-pointer shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-2"
          >
            {currentEra.anime.map((a) => (
              <div
                key={a.slug}
                className="w-48 sm:w-56 shrink-0 group relative flex flex-col overflow-hidden rounded-xl border border-[#25282C] bg-[#111316] transition-all duration-300 hover:-translate-y-1 hover:border-crimson-500/70 hover:shadow-[0_0_20px_rgba(227,38,46,0.22)]"
              >
                {/* Poster */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0A0C0E]">
                  <Link href={`/anime/${a.slug}`} className="block h-full w-full">
                    <CoverArt
                      title={a.title}
                      japaneseTitle={a.japaneseTitle}
                      year={a.year}
                      format={a.format}
                      slug={a.slug}
                      coverUrl={a.coverUrl}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111316] via-transparent to-black/20" />
                  </Link>

                  <div className="absolute top-2.5 right-2.5 z-10">
                    <button
                      type="button"
                      aria-label="Bookmark"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-muted hover:text-crimson-400 hover:border-crimson-500 transition-colors cursor-pointer"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3.5 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/anime/${a.slug}`}>
                      <h4 className="font-display text-sm font-bold tracking-tight text-paper transition-colors group-hover:text-crimson-400 line-clamp-1">
                        {a.title}
                      </h4>
                    </Link>
                    {a.japaneseTitle && (
                      <p className="font-jp text-[11px] text-[#666A70] line-clamp-1 mt-0.5">
                        {a.japaneseTitle}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-2 text-xs font-mono text-[#9A9A9A]">
                    <span>{a.year}</span>
                    <span>•</span>
                    <span>{a.format}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination indicator dots below */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {[0, 1, 2, 3].map((dot, idx) => (
              <span
                key={dot}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === 0 ? "w-6 bg-crimson-500 shadow-[0_0_6px_#ff3038]" : "w-1.5 bg-[#343840]"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
