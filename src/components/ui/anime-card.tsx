import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FORMAT_LABELS } from "@/lib/format";
import { cn } from "@/lib/utils";
import { AnimePoster } from "@/components/ui/anime-poster";

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
  if (coverUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={coverUrl} alt={`${title} cover artwork`} className={cn("object-cover", className)} loading="lazy" />;
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
  return (
    <article className="group relative surface-card overflow-hidden lift">
      <Link href={`/anime/${data.slug}`} className="block" aria-label={data.title}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <CoverArt
            title={data.title}
            japaneseTitle={data.japaneseTitle}
            year={data.year}
            format={data.format}
            slug={data.slug}
            coverUrl={data.coverUrl}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
          <div className="absolute top-2 left-2 flex gap-1.5">
            <Badge tone="crimson">{FORMAT_LABELS[data.format as keyof typeof FORMAT_LABELS] ?? data.format}</Badge>
            {data.year ? <Badge>{data.year}</Badge> : null}
          </div>
          {data.averageRating ? (
            <div className="absolute top-2 right-2 rounded bg-ink/70 px-1.5 py-0.5 text-[11px] font-display text-warn backdrop-blur-sm">
              {data.averageRating.toFixed(1)}
            </div>
          ) : null}
        </div>
        <div className="p-3">
          <h3 className="font-display text-sm text-paper leading-snug group-hover:text-crimson-300 transition-colors line-clamp-2">
            {data.title}
          </h3>
          <p className="mt-1 text-xs text-faint line-clamp-1">
            {data.japaneseTitle ?? data.studio?.name ?? "\u00A0"}
          </p>
        </div>
      </Link>
    </article>
  );
}