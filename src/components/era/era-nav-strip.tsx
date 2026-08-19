import Link from "next/link";
import type { EraDto } from "@/lib/types";
import { cn } from "@/lib/utils";

export function EraNavStrip({
  eras,
  currentSlug,
}: {
  eras: EraDto[];
  currentSlug: string;
}) {
  return (
    <nav aria-label="Eras" className="mt-6">
      <div className="-mx-1 flex items-stretch gap-2 overflow-x-auto px-1 pb-1">
        {eras.map((era) => {
          const active = era.slug === currentSlug;
          return (
            <Link
              key={era.slug}
              href={`/timeline/${era.slug}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex shrink-0 flex-col justify-center gap-0.5 rounded border px-3 py-2 font-display transition-colors",
                active
                  ? "border-crimson-500 bg-crimson-500/10 text-crimson-300"
                  : "border-line text-muted hover:border-line-2 hover:text-paper"
              )}
            >
              <span className="flex items-baseline gap-2 text-xs uppercase tracking-wide">
                <span className={cn("text-[10px] tracking-[0.2em]", active ? "text-crimson-500/70" : "text-faint")}>
                  {String(era.order).padStart(2, "0")}
                </span>
                <span>{era.name}</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-faint">
                {era.period}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
