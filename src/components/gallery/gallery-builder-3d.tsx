"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import {
  Palette,
  Layers,
  Sparkles,
  Share2,
  Save,
  Eye,
  Check,
  Search,
  ChevronRight,
  Move,
  Maximize2,
  Sliders,
  RotateCcw,
  LayoutGrid,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface GallerySlot {
  id: number;
  label: string;
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number];
  animeSlug: string;
  animeTitle: string;
  posterUrl: string;
  frameStyle: "gold" | "crimson" | "black" | "hologram";
}

const DEFAULT_SLOTS: GallerySlot[] = [
  {
    id: 1,
    label: "Centerpiece Masterwork",
    position: [0, 2.2, -4.8],
    rotation: [0, 0, 0],
    size: [2.4, 3.2],
    animeSlug: "akira",
    animeTitle: "Akira (1988)",
    posterUrl: "/images/akira-hero.jpg",
    frameStyle: "crimson",
  },
  {
    id: 2,
    label: "Left Gallery 1",
    position: [-4.8, 2.2, -2],
    rotation: [0, Math.PI / 2, 0],
    size: [1.8, 2.4],
    animeSlug: "spirited-away",
    animeTitle: "Spirited Away (2001)",
    posterUrl: "/anime/spirited-away.webp",
    frameStyle: "gold",
  },
  {
    id: 3,
    label: "Left Gallery 2",
    position: [-4.8, 2.2, 2],
    rotation: [0, Math.PI / 2, 0],
    size: [1.8, 2.4],
    animeSlug: "attack-on-titan",
    animeTitle: "Attack on Titan (2013)",
    posterUrl: "/anime/attack-on-titan.webp",
    frameStyle: "black",
  },
  {
    id: 4,
    label: "Right Gallery 1",
    position: [4.8, 2.2, -2],
    rotation: [0, -Math.PI / 2, 0],
    size: [1.8, 2.4],
    animeSlug: "death-note",
    animeTitle: "Death Note (2006)",
    posterUrl: "/anime/death-note.webp",
    frameStyle: "black",
  },
  {
    id: 5,
    label: "Right Gallery 2",
    position: [4.8, 2.2, 2],
    rotation: [0, -Math.PI / 2, 0],
    size: [1.8, 2.4],
    animeSlug: "neon-genesis-evangelion",
    animeTitle: "Neon Genesis Evangelion (1995)",
    posterUrl: "/anime/neon-genesis-evangelion.webp",
    frameStyle: "gold",
  },
];

const AVAILABLE_ARTWORKS = [
  { slug: "akira", title: "Akira", year: 1988, url: "/images/akira-hero.jpg" },
  { slug: "spirited-away", title: "Spirited Away", year: 2001, url: "/anime/spirited-away.webp" },
  { slug: "attack-on-titan", title: "Attack on Titan", year: 2013, url: "/anime/attack-on-titan.webp" },
  { slug: "death-note", title: "Death Note", year: 2006, url: "/anime/death-note.webp" },
  { slug: "neon-genesis-evangelion", title: "Neon Genesis Evangelion", year: 1995, url: "/anime/neon-genesis-evangelion.webp" },
  { slug: "cowboy-bebop", title: "Cowboy Bebop", year: 1998, url: "/anime/cowboy-bebop.webp" },
  { slug: "demon-slayer", title: "Demon Slayer", year: 2019, url: "/anime/demon-slayer.webp" },
  { slug: "jujutsu-kaisen", title: "Jujutsu Kaisen", year: 2020, url: "/anime/jujutsu-kaisen.webp" },
  { slug: "fullmetal-alchemist-brotherhood", title: "Fullmetal Alchemist: Brotherhood", year: 2009, url: "/anime/fullmetal-alchemist-brotherhood.webp" },
  { slug: "mobile-suit-gundam", title: "Mobile Suit Gundam", year: 1979, url: "/anime/mobile-suit-gundam.webp" },
  { slug: "dragon-ball-z", title: "Dragon Ball Z", year: 1986, url: "/anime/dragon-ball-z.webp" },
  { slug: "one-piece", title: "One Piece", year: 1999, url: "/anime/one-piece.webp" },
];

// Client-only dynamic import of the Three.js Canvas Scene
const DynamicGalleryScene = dynamic(
  () => import("./gallery-canvas-scene").then((m) => m.GalleryCanvasScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#050607] text-[#9A9A9A]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-crimson-500 border-t-transparent animate-spin" />
        <p className="mt-4 font-display text-xs uppercase tracking-[0.2em] text-crimson-400">
          INITIALIZING 3D EXHIBITION CHAMBER…
        </p>
      </div>
    ),
  }
);

export function GalleryBuilder3D() {
  const [mounted, setMounted] = useState(false);
  const [slots, setSlots] = useState<GallerySlot[]>(DEFAULT_SLOTS);
  const [selectedSlotId, setSelectedSlotId] = useState<number>(1);
  const [theme, setTheme] = useState<"zen" | "cyberpunk" | "classic">("zen");
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d");
  const [galleryTitle, setGalleryTitle] = useState("Master Curator's Exhibition");
  const [isSaved, setIsSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeSlot = slots.find((s) => s.id === selectedSlotId) ?? slots[0];

  const updateActiveSlotArtwork = (art: typeof AVAILABLE_ARTWORKS[0]) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === selectedSlotId
          ? {
              ...s,
              animeSlug: art.slug,
              animeTitle: `${art.title} (${art.year})`,
              posterUrl: art.url,
            }
          : s
      )
    );
  };

  const updateActiveSlotFrame = (frame: "gold" | "crimson" | "black" | "hologram") => {
    setSlots((prev) =>
      prev.map((s) => (s.id === selectedSlotId ? { ...s, frameStyle: frame } : s))
    );
  };

  const filteredArtworks = AVAILABLE_ARTWORKS.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] min-h-[650px] w-full bg-[#050607] text-paper overflow-hidden">
      {/* 1. Left Controls & Curator Studio */}
      <aside className="w-full lg:w-[420px] shrink-0 border-r border-[#25282C] bg-[#0B0D0F] flex flex-col justify-between overflow-y-auto no-scrollbar p-5">
        <div className="space-y-6">
          {/* Top Title & View Switcher */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-crimson-500/40 bg-crimson-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-crimson-400">
              <Sparkles className="h-3 w-3" />
              <span>3D CURATOR STUDIO</span>
            </div>

            <div className="flex items-center rounded-lg border border-[#25282C] bg-[#111316] p-0.5 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setViewMode("3d")}
                className={cn(
                  "flex items-center gap-1 rounded px-2.5 py-1 uppercase transition-colors cursor-pointer",
                  viewMode === "3d" ? "bg-crimson-500 text-white" : "text-[#9A9A9A] hover:text-paper"
                )}
              >
                <Box className="h-3 w-3" />
                <span>3D ROOM</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-1 rounded px-2.5 py-1 uppercase transition-colors cursor-pointer",
                  viewMode === "grid" ? "bg-crimson-500 text-white" : "text-[#9A9A9A] hover:text-paper"
                )}
              >
                <LayoutGrid className="h-3 w-3" />
                <span>GALLERY GRID</span>
              </button>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666A70]">
              EXHIBITION TITLE
            </label>
            <input
              type="text"
              value={galleryTitle}
              onChange={(e) => setGalleryTitle(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[#25282C] bg-[#111316] px-3.5 py-2.5 font-display text-sm font-bold text-paper focus:border-crimson-500 focus:outline-none"
              placeholder="Exhibition Title"
            />
          </div>

          {/* Theme Preset */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666A70]">
              ARCHITECTURAL ENVIRONMENT
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setTheme("zen")}
                className={cn(
                  "rounded-lg border p-2 text-center font-semibold uppercase transition-all cursor-pointer",
                  theme === "zen"
                    ? "border-crimson-500 bg-crimson-500/10 text-crimson-400"
                    : "border-[#25282C] bg-[#111316] text-[#9A9A9A] hover:border-line-2"
                )}
              >
                🏮 Zen
              </button>
              <button
                type="button"
                onClick={() => setTheme("cyberpunk")}
                className={cn(
                  "rounded-lg border p-2 text-center font-semibold uppercase transition-all cursor-pointer",
                  theme === "cyberpunk"
                    ? "border-crimson-500 bg-crimson-500/10 text-crimson-400"
                    : "border-[#25282C] bg-[#111316] text-[#9A9A9A] hover:border-line-2"
                )}
              >
                🌆 Cyberpunk
              </button>
              <button
                type="button"
                onClick={() => setTheme("classic")}
                className={cn(
                  "rounded-lg border p-2 text-center font-semibold uppercase transition-all cursor-pointer",
                  theme === "classic"
                    ? "border-crimson-500 bg-crimson-500/10 text-crimson-400"
                    : "border-[#25282C] bg-[#111316] text-[#9A9A9A] hover:border-line-2"
                )}
              >
                🏛️ Archival
              </button>
            </div>
          </div>

          {/* Slot Selection */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666A70]">
              EXHIBIT WALL POSITIONS
            </label>
            <div className="mt-2 flex flex-col gap-1.5">
              {slots.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSlotId(s.id)}
                  className={cn(
                    "flex items-center justify-between rounded-lg border px-3 py-2 text-xs transition-all cursor-pointer",
                    s.id === selectedSlotId
                      ? "border-crimson-500 bg-crimson-500/15 text-paper font-bold shadow-[0_0_12px_rgba(227,38,46,0.35)]"
                      : "border-[#25282C] bg-[#111316] text-[#9A9A9A] hover:bg-[#181B1F] hover:text-paper"
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-[10px] font-bold text-crimson-400 border border-crimson-500/30">
                      {s.id}
                    </span>
                    <span className="truncate">{s.animeTitle}</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-[#666A70]" />
                </button>
              ))}
            </div>
          </div>

          {/* Artwork Selector Modal/List for Active Slot */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666A70]">
              FRAME MATERIAL FOR SLOT {selectedSlotId}
            </label>

            {/* Frame Style Picker */}
            <div className="mt-2 flex gap-2 text-[10px] font-bold">
              {(["gold", "crimson", "black", "hologram"] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => updateActiveSlotFrame(style)}
                  className={cn(
                    "flex-1 rounded-md border py-1.5 uppercase text-center cursor-pointer transition-all",
                    activeSlot.frameStyle === style
                      ? "border-crimson-500 bg-crimson-500 text-white font-bold shadow-sm"
                      : "border-[#25282C] bg-[#111316] text-[#9A9A9A] hover:text-paper"
                  )}
                >
                  {style}
                </button>
              ))}
            </div>

            {/* Artwork Search */}
            <div className="mt-4 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artworks to mount..."
                className="w-full rounded-lg border border-[#25282C] bg-[#111316] pl-8 pr-3 py-2 text-xs text-paper focus:border-crimson-500 focus:outline-none"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666A70]" />
            </div>

            {/* Artwork Grid List */}
            <div className="mt-2 grid grid-cols-4 gap-2 max-h-48 overflow-y-auto no-scrollbar border border-[#25282C] rounded-lg p-2 bg-[#111316]">
              {filteredArtworks.map((art) => {
                const isSelected = activeSlot.animeSlug === art.slug;
                return (
                  <button
                    key={art.slug}
                    type="button"
                    onClick={() => updateActiveSlotArtwork(art)}
                    className={cn(
                      "group relative aspect-[3/4] overflow-hidden rounded border transition-all cursor-pointer",
                      isSelected
                        ? "border-crimson-500 ring-2 ring-crimson-500 shadow-md"
                        : "border-[#25282C] hover:border-crimson-500/50"
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={art.url} alt={art.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 text-[8.5px] text-center font-bold text-white leading-tight">
                      {art.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 pt-4 border-t border-[#25282C] flex gap-3">
          <button
            type="button"
            onClick={() => {
              setIsSaved(true);
              setTimeout(() => setIsSaved(false), 2500);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-crimson-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(227,38,46,0.4)] hover:bg-crimson-400 transition-all cursor-pointer"
          >
            {isSaved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span>{isSaved ? "SAVED TO ARCHIVE" : "SAVE ROOM"}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center justify-center rounded-lg border border-[#25282C] bg-[#181B1F] px-4 py-3 text-xs font-bold uppercase text-paper hover:bg-[#20242a] transition-colors cursor-pointer"
          >
            <Share2 className="h-4 w-4 text-crimson-400" />
          </button>
        </div>
      </aside>

      {/* 2. Main Gallery Presentation Area */}
      <main className="flex-1 relative h-full w-full bg-[#050607] overflow-hidden">
        {viewMode === "3d" ? (
          <>
            {/* Top Floating Helper Overlay */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-3 rounded-full border border-white/10 bg-black/75 px-4 py-1.5 text-xs text-[#D8D8D8] backdrop-blur-md shadow-lg">
              <Move className="h-3.5 w-3.5 text-crimson-400 animate-pulse" />
              <span>Click & drag to look around 360° • Click any frame to select</span>
            </div>

            {/* 3D Canvas Chamber */}
            {mounted ? (
              <DynamicGalleryScene
                slots={slots}
                selectedSlotId={selectedSlotId}
                theme={theme}
                onSelectSlot={(id) => setSelectedSlotId(id)}
              />
            ) : null}
          </>
        ) : (
          /* 2D Exhibition Grid Mode */
          <div className="h-full w-full overflow-y-auto p-8 max-w-5xl mx-auto">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-400">
                EXHIBITION CURATION VIEW
              </span>
              <h2 className="text-2xl font-display font-extrabold uppercase text-paper mt-1">
                {galleryTitle}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {slots.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSlotId(s.id)}
                  className={cn(
                    "rounded-xl border bg-[#111316] p-4 transition-all cursor-pointer flex flex-col justify-between",
                    s.id === selectedSlotId
                      ? "border-crimson-500 shadow-[0_0_20px_rgba(227,38,46,0.3)]"
                      : "border-[#25282C] hover:border-[#40444c]"
                  )}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.posterUrl} alt={s.animeTitle} className="h-full w-full object-cover" />
                    <div className="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-crimson-500 text-white font-bold text-xs">
                      {s.id}
                    </div>
                  </div>

                  <div className="mt-3">
                    <h4 className="font-display text-sm font-bold text-paper line-clamp-1">{s.animeTitle}</h4>
                    <div className="mt-1 flex items-center justify-between text-xs text-[#9A9A9A]">
                      <span>Frame: <strong className="capitalize text-paper">{s.frameStyle}</strong></span>
                      <span className="text-crimson-400 font-bold">{s.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#25282C] bg-[#111316] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-paper">
              SHARE YOUR 3D EXHIBITION
            </h3>
            <p className="mt-2 text-xs text-[#9A9A9A]">
              Anyone with this link can walk through your personal 3D virtual anime gallery room.
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#25282C] bg-[#050607] p-2 text-xs">
              <input
                type="text"
                readOnly
                value="https://animearchive.com/gallery/master-curator-exhibit"
                className="w-full bg-transparent text-paper outline-none font-mono text-[11px]"
              />
              <button
                type="button"
                onClick={() => alert("Link copied to clipboard!")}
                className="shrink-0 rounded bg-crimson-500 px-3 py-1 text-[11px] font-bold text-white"
              >
                COPY
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="rounded-lg border border-[#25282C] bg-[#181B1F] px-5 py-2 text-xs font-bold uppercase text-paper hover:bg-[#20242a]"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
