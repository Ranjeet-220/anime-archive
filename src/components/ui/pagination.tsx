"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  pages,
  basePath,
}: {
  page: number;
  pages: number;
  basePath: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function href(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    return `${basePath || pathname}?${params.toString()}`;
  }

  if (pages <= 1) return null;

  const window: (number | "…")[] = [];
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - page) <= 1) window.push(i);
    else if (window[window.length - 1] !== "…") window.push("…");
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      {page > 1 ? (
        <Link
          href={href(page - 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded border border-line text-muted hover:border-crimson-500 hover:text-paper transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : null}
      {window.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-1 text-faint" aria-hidden>
            …
          </span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded border text-sm transition-colors",
              p === page
                ? "border-crimson-500 bg-crimson-500/10 text-crimson-300 font-display"
                : "border-line text-muted hover:border-line-2 hover:text-paper"
            )}
          >
            {p}
          </Link>
        )
      )}
      {page < pages ? (
        <Link
          href={href(page + 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded border border-line text-muted hover:border-crimson-500 hover:text-paper transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : null}
    </nav>
  );
}