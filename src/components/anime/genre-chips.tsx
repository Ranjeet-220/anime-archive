import { BadgeLink } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function GenreChips({
  genres,
  className,
}: {
  genres: { slug: string; name: string }[];
  className?: string;
}) {
  if (genres.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {genres.map((g) => (
        <BadgeLink key={g.slug} href={`/anime?genre=${g.slug}`} tone="holo">
          {g.name}
        </BadgeLink>
      ))}
    </div>
  );
}
