"use client";

import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export function HeroCinematic() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden border-b border-line bg-ink">
      {/* Background Image: Japanese Anime Museum Interior (Ultra HD) */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/museum-hero.jpg"
          alt="Anime Museum Grand Entrance"
          className="h-full w-full object-cover object-center brightness-105 contrast-[1.08] saturate-[1.1]"
          loading="eager"
        />
        {/* Subtle, balanced gradient overlays for maximum HD image clarity and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050607]/90 via-[#050607]/35 to-transparent sm:w-3/4" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050607] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050607]/70 to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl text-left">
          {/* Eyebrow Label */}
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-crimson-500 shadow-[0_0_10px_#ff3038]" />
            <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-paper-2 drop-shadow-sm">
              WELCOME TO THE
            </p>
          </div>

          {/* Main Display Headings */}
          <h1 className="flex flex-col font-serif font-extrabold tracking-tight leading-[0.9] text-paper">
            <span className="text-5xl sm:text-7xl lg:text-8xl tracking-wider uppercase text-paper drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              ANIME
            </span>
            <span className="text-5xl sm:text-7xl lg:text-8xl tracking-wider uppercase text-crimson-500 drop-shadow-[0_0_35px_rgba(227,38,46,0.5)]">
              ARCHIVE
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base sm:text-lg font-normal leading-relaxed text-[#D8D8D8] drop-shadow-md">
            A digital museum dedicated to preserving the art, history and legacy of anime.
          </p>

          {/* Call to action buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            {/* Primary Button */}
            <Link
              href="/museum"
              className="group inline-flex items-center gap-2.5 rounded-full bg-crimson-500 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_0_20px_rgba(227,38,46,0.45)] transition-all duration-300 hover:bg-crimson-400 hover:shadow-[0_0_30px_rgba(255,48,56,0.65)] hover:scale-[1.02]"
            >
              <span>ENTER THE MUSEUM</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Button */}
            <Link
              href="/anime"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-charcoal/80 px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-paper backdrop-blur-md transition-all duration-300 hover:border-line-2 hover:bg-charcoal-2 hover:text-white hover:scale-[1.02]"
            >
              <Compass className="h-4 w-4 text-muted group-hover:text-paper transition-colors" />
              <span>BROWSE ANIME</span>
            </Link>
          </div>

          {/* Micro stats banner */}
          <div className="mt-12 pt-6 border-t border-line/50 flex flex-wrap items-center gap-6 sm:gap-10 text-xs">
            <div>
              <span className="font-display font-bold text-sm text-paper">1917 — 2026</span>
              <span className="block text-[10px] uppercase tracking-wider text-faint">Historic Span</span>
            </div>
            <div className="h-6 w-px bg-line/60" />
            <div>
              <span className="font-display font-bold text-sm text-paper">7 Key Eras</span>
              <span className="block text-[10px] uppercase tracking-wider text-faint">Chronology</span>
            </div>
            <div className="h-6 w-px bg-line/60" />
            <div>
              <span className="font-display font-bold text-sm text-paper">3D Virtual Space</span>
              <span className="block text-[10px] uppercase tracking-wider text-faint">Interactive</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
