import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { searchAll } from "@/lib/data";
import type { SearchResultDto } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
    if (q.length < 2) {
      return new Response(JSON.stringify({ error: "Query must be at least 2 characters." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const results: SearchResultDto[] = await searchAll(q, 8);

    // Typo tolerance: pg_trgm similarity on anime titles. The extension may
    // not be installed on every database, so this is best-effort.
    if (q.length >= 3) {
      try {
        const rows = await prisma.$queryRaw<Array<{ slug: string }>>`
          SELECT slug FROM "Anime"
          WHERE similarity(title, ${q}) > 0.2
          ORDER BY similarity(title, ${q}) DESC
          LIMIT 8
        `;
        if (rows.length > 0) {
          const known = new Set(results.filter((r) => r.type === "anime").map((r) => r.slug));
          const extra = rows.map((r) => r.slug).filter((slug) => !known.has(slug));
          if (extra.length > 0) {
            const found = await prisma.anime.findMany({
              where: { slug: { in: extra } },
              select: { slug: true, title: true, japaneseTitle: true, year: true },
            });
            for (const a of found) {
              results.push({
                type: "anime",
                slug: a.slug,
                title: a.title,
                subtitle: [a.japaneseTitle, a.year ? String(a.year) : null]
                  .filter(Boolean)
                  .join(" · ") || null,
                year: a.year,
              });
            }
          }
        }
      } catch {
        // pg_trgm extension not available — fall back to contains matches only.
      }
    }

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
