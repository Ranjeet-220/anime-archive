"use client";

import { useState } from "react";
import Link from "next/link";
import { FORMAT_LABELS } from "@/lib/format";
import { cn } from "@/lib/utils";
import { AnimePoster } from "@/components/ui/anime-poster";
import { BookmarkButton } from "@/components/ui/bookmark-button";

export interface AnimeCardData {
  slug: string;
  title: string;
  japaneseTitle?: string | null;
  year?: number | null;
  format: string;
  episodeCount?: number | null;
  averageRating?: number;
  coverUrl?: string | null;
  studio?: { slug: string; name: string } | null;
  genres?: { slug: string; name: string }[];
  compact?: boolean;
}

export function CoverArt({
  title,
  japaneseTitle,
  year,
  format,
  slug,
  coverUrl,
  className,
}: {
  title: string;
  japaneseTitle?: string | null;
  year?: number | null;
  format?: string;
  slug?: string;
  coverUrl?: string | null;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (coverUrl && !hasError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={coverUrl}
        alt={`${title} cover artwork`}
        className={cn("object-cover", className)}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
      />
    );
  }
  return (
    <div aria-hidden className={cn("relative overflow-hidden font-jp", className)}>
      <AnimePoster
        title={title}
        japaneseTitle={japaneseTitle}
        year={year}
        format={format}
        slug={slug}
        className="absolute inset-0 h-full w-full"
      />
      <span className="sr-only">{title}</span>
    </div>
  );
}

export function AnimeCard({ data }: { data: AnimeCardData }) {
  const formatStr = FORMAT_LABELS[data.format as keyof typeof FORMAT_LABELS] ?? data.format;
  const metaText = data.year ? `${data.year}` : formatStr;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[#25282C] bg-[#111316] transition-all duration-300 hover:-translate-y-1 hover:border-crimson-500/70 hover:shadow-[0_0_20px_rgba(227,38,46,0.22)]">
      {/* Poster Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#0A0C0E]">
        <Link href={`/anime/${data.slug}`} className="block h-full w-full relative" aria-label={data.title}>
          <CoverArt
            title={data.title}
            japaneseTitle={data.japaneseTitle}
            year={data.year}
            format={data.format}
            slug={data.slug}
            coverUrl={data.coverUrl}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Subtle bottom gradient shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111316] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />
        </Link>

        {/* Bookmark Action */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <BookmarkButton slug={data.slug} className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-crimson-500 hover:text-crimson-400" />
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-3.5 pt-2.5">
        <div>
          <Link href={`/anime/${data.slug}`} className="block">
            <h3 className="font-display text-sm font-bold tracking-tight text-paper transition-colors group-hover:text-crimson-400 line-clamp-1">
              {data.title}
            </h3>
          </Link>

          <div className="mt-1 flex items-center justify-between text-xs text-muted">
            <span className="font-medium text-[#9A9A9A]">{metaText}</span>
            {data.studio ? (
              <span className="truncate max-w-[110px] text-[11px] text-[#666A70]">
                {data.studio.name}
              </span>
            ) : null}
          </div>

          {/* Genre tags */}
          {data.genres && data.genres.length > 0 ? (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {data.genres.slice(0, 2).map((g) => (
                <span
                  key={g.slug}
                  className="rounded-md bg-[#181B1F] border border-[#25282C] px-2 py-0.5 text-[10px] font-medium text-[#9A9A9A] transition-colors group-hover:border-red-950/60"
                >
                  {g.name}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}