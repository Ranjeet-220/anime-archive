import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import type { AnimeFormat } from "@/generated/prisma/client";

const FORMATS: AnimeFormat[] = ["TV", "MOVIE", "OVA", "ONA", "SPECIAL", "WEB"];

interface ImportRow {
  title: string;
  slug?: string;
  japaneseTitle?: string;
  year?: number;
  format?: AnimeFormat;
  synopsis?: string;
}

export interface ImportAnalysis {
  total: number;
  valid: number;
  duplicates: number;
  invalid: number;
  rows: {
    title: string;
    slug: string;
    status: "valid" | "duplicate" | "invalid";
    reason?: string;
  }[];
}

function parseCsvLine(line: string): string[] {
  const parts: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      parts.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  parts.push(current.trim());
  return parts;
}

function parseCsv(text: string): ImportRow[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return [];

  const header = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
  const isHeader = header.some((h) => h === "title" || h === "slug" || h === "name");
  const start = isHeader ? 1 : 0;
  const col = (row: string[], key: string): string | undefined => {
    const idx = isHeader ? header.indexOf(key) : { title: 0, slug: 1, year: 2, format: 3, japanesetitle: 4, synopsis: 5 }[key] ?? -1;
    return idx >= 0 ? row[idx]?.trim() : undefined;
  };

  const rows: ImportRow[] = [];
  for (let i = start; i < lines.length; i++) {
    const parts = parseCsvLine(lines[i]);
    const title = col(parts, "title");
    const slug = col(parts, "slug");
    const year = Number(col(parts, "year"));
    const format = col(parts, "format");
    const japaneseTitle = col(parts, "japanesetitle") ?? col(parts, "japanese_title");
    const synopsis = col(parts, "synopsis");
    rows.push({
      title: title ?? "",
      slug,
      japaneseTitle: japaneseTitle || undefined,
      year: Number.isInteger(year) && year >= 1900 && year <= 2100 ? year : undefined,
      format: format && FORMATS.includes(format.toUpperCase() as AnimeFormat)
        ? (format.toUpperCase() as AnimeFormat)
        : undefined,
      synopsis: synopsis || undefined,
    });
  }
  return rows;
}

async function analyzeRows(rows: ImportRow[]): Promise<ImportAnalysis> {
  const seenSlugs = new Set<string>();
  const seenTitles = new Set<string>();
  const result: ImportAnalysis = { total: rows.length, valid: 0, duplicates: 0, invalid: 0, rows: [] };

  for (const row of rows) {
    const title = row.title.trim();
    if (!title) {
      result.invalid++;
      result.rows.push({ title: "(untitled)", slug: "", status: "invalid", reason: "Missing title" });
      continue;
    }
    const slug = slugify(row.slug?.trim() ? row.slug : title);
    const titleKey = title.toLowerCase();

    let reason: string | undefined;
    const bySlug = await prisma.anime.findUnique({ where: { slug }, select: { slug: true } });
    const byTitle = await prisma.anime.findFirst({
      where: { title: { equals: titleKey, mode: "insensitive" } },
      select: { slug: true },
    });
    if (bySlug) reason = `Slug already exists (${slug})`;
    else if (byTitle) reason = `Title already exists (${byTitle.slug})`;
    else if (seenSlugs.has(slug)) reason = `Duplicate within batch (${slug})`;
    else if (seenTitles.has(titleKey)) reason = "Duplicate title within batch";

    if (reason) {
      result.duplicates++;
      result.rows.push({ title, slug, status: "duplicate", reason });
    } else {
      result.valid++;
      result.rows.push({ title, slug, status: "valid" });
    }
    seenSlugs.add(slug);
    seenTitles.add(titleKey);
  }
  return result;
}

export async function POST(req: NextRequest) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const body = await req.json().catch(() => null);
    const format = body?.format === "csv" ? "csv" : "json";
    const commit = body?.commit === true;

    let rows: ImportRow[];
    if (format === "csv") {
      if (typeof body?.text !== "string" || !body.text.trim()) {
        return NextResponse.json({ error: "CSV text is required." }, { status: 400 });
      }
      rows = parseCsv(body.text);
    } else {
      const data = body?.data as { anime?: unknown } | undefined;
      const anime = Array.isArray(data?.anime) ? data.anime : null;
      if (!anime) {
        return NextResponse.json({ error: "JSON import requires data.anime to be an array." }, { status: 400 });
      }
      rows = anime.map((a: unknown) => {
        const item = (a ?? {}) as Record<string, unknown>;
        const year = Number(item.year);
        const format = typeof item.format === "string" ? item.format.toUpperCase() : "";
        return {
          title: typeof item.title === "string" ? item.title : "",
          slug: typeof item.slug === "string" ? item.slug : undefined,
          japaneseTitle: typeof item.japaneseTitle === "string" ? item.japaneseTitle : undefined,
          year: Number.isInteger(year) && year >= 1900 && year <= 2100 ? year : undefined,
          format: FORMATS.includes(format as AnimeFormat) ? (format as AnimeFormat) : undefined,
          synopsis: typeof item.synopsis === "string" ? item.synopsis : undefined,
        };
      });
    }

    const analysis = await analyzeRows(rows);
    if (!commit) {
      return NextResponse.json({ analysis });
    }

    const validRows = analysis.rows.filter((r) => r.status === "valid");
    const created: string[] = [];
    await prisma.$transaction(async (tx) => {
      for (const row of validRows) {
        const source = rows.find((r) => r.title === row.title && slugify(r.slug?.trim() ? r.slug : r.title) === row.slug);
        const year = source?.year ?? null;
        const anime = await tx.anime.create({
          data: {
            slug: row.slug,
            title: row.title,
            japaneseTitle: source?.japaneseTitle ?? null,
            synopsis: source?.synopsis ?? null,
            year,
            decade: year !== null ? Math.floor(year / 10) * 10 : null,
            format: source?.format ?? "TV",
            isDemoData: false,
          },
        });
        created.push(anime.slug);
      }
    });
    return NextResponse.json({ analysis, created });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/import]", err);
    return NextResponse.json({ error: "Import failed." }, { status: 500 });
  }
}

export const runtime = "nodejs";
