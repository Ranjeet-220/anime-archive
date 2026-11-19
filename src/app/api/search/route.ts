import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { searchAll } from "@/lib/data";
import type { SearchResultDto } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const rawQ = request.nextUrl.searchParams.get("q")?.trim() ?? "";
    if (rawQ.length < 2) {
      return NextResponse.json({ error: "Query must be at least 2 characters." }, { status: 400 });
    }

    const cleanQ = rawQ.slice(0, 100);
    const limitParam = request.nextUrl.searchParams.get("limit");
    const limit = limitParam ? Math.min(20, Math.max(1, parseInt(limitParam, 10) || 8)) : 8;

    const results: SearchResultDto[] = await searchAll(cleanQ, limit);

    // Typo tolerance: pg_trgm similarity on anime titles. The extension may
    // not be installed on every database, so this is best-effort.
    if (cleanQ.length >= 3) {
      try {
        const rows = await prisma.$queryRaw<Array<{ slug: string }>>`
          SELECT slug FROM "Anime"
          WHERE similarity(title, ${cleanQ}) > 0.2
          ORDER BY similarity(title, ${cleanQ}) DESC
          LIMIT ${limit}
        `;
        if (Array.isArray(rows) && rows.length > 0) {
          const known = new Set(results.filter((r) => r.type === "anime").map((r) => r.slug));
          const extra = rows
            .map((r) => r.slug)
            .filter((slug): slug is string => typeof slug === "string" && slug.length > 0 && !known.has(slug));
          if (extra.length > 0) {
            const found = await prisma.anime.findMany({
              where: { slug: { in: extra } },
              select: { slug: true, title: true, japaneseTitle: true, year: true, format: true },
            });
            for (const a of found) {
              const formatLabel =
                a.format === "MOVIE"
                  ? "Film"
                  : a.format === "TV"
                  ? "TV Series"
                  : a.format === "OVA"
                  ? "OVA"
                  : a.format === "ONA"
                  ? "ONA"
                  : a.format || "Anime";
              results.push({
                type: "anime",
                slug: a.slug,
                title: a.title,
                subtitle: [a.year ? String(a.year) : null, formatLabel, a.japaneseTitle]
                  .filter(Boolean)
                  .join(" · ") || null,
                year: a.year,
                format: a.format,
              });
            }
          }
        }
      } catch {
        // pg_trgm extension not available — fall back to contains matches only.
      }
    }

    return NextResponse.json(
      { results },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=60",
        },
      }
    );
  } catch (err) {
    console.error("[api/search]", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export const runtime = "nodejs";
