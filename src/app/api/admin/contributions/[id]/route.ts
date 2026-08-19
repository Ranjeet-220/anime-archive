import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { invalidateCacheTags } from "@/lib/cache";
import { slugify } from "@/lib/utils";
import type { ContributionStatus, AnimeFormat } from "@/generated/prisma/client";

const STATUSES: ContributionStatus[] = ["SUBMITTED", "UNDER_REVIEW", "VERIFIED", "PUBLISHED", "REJECTED"];
const FORMATS: AnimeFormat[] = ["TV", "MOVIE", "OVA", "ONA", "SPECIAL", "WEB"];

async function uniqueSlug(base: string): Promise<string> {
  const clean = slugify(base) || "untitled";
  let slug = clean;
  let n = 2;
  while (await prisma.anime.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${clean}-${n}`;
    n += 1;
  }
  return slug;
}

async function publishAnime(payload: unknown): Promise<{ ok: boolean; error?: string; slug?: string }> {
  const p = payload as Record<string, unknown>;
  if (!p || typeof p !== "object" || typeof p.title !== "string" || !p.title.trim()) {
    return { ok: false, error: "Payload must contain a 'title' to publish a new anime." };
  }
  const format = typeof p.format === "string" && FORMATS.includes(p.format as AnimeFormat)
    ? (p.format as AnimeFormat)
    : "TV";
  const year = typeof p.year === "number" && Number.isInteger(p.year) && p.year >= 1900 && p.year <= 2100
    ? p.year
    : null;

  let studioId: string | null = null;
  if (typeof p.studioSlug === "string" && p.studioSlug) {
    const studio = await prisma.studio.findUnique({ where: { slug: p.studioSlug }, select: { id: true } });
    studioId = studio?.id ?? null;
  }

  const slug = await uniqueSlug(typeof p.slug === "string" && p.slug ? p.slug : String(p.title));
  const anime = await prisma.anime.create({
    data: {
      slug,
      title: String(p.title).trim(),
      japaneseTitle: typeof p.japaneseTitle === "string" ? p.japaneseTitle : null,
      synopsis: typeof p.synopsis === "string" ? p.synopsis : null,
      year,
      decade: year !== null ? Math.floor(year / 10) * 10 : null,
      format,
      studioId,
      isDemoData: false,
    },
  });
  return { ok: true, slug: anime.slug };
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const reviewer = await requireRole("ADMIN", "EDITOR");
    const { id } = await params;
    const body = await req.json().catch(() => null);

    const status = (typeof body?.status === "string" ? body.status : "") as ContributionStatus;
    const reviewerNotes = typeof body?.reviewerNotes === "string" ? body.reviewerNotes.trim() : undefined;

    if (!STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid contribution status." }, { status: 400 });
    }
    if (status === "REJECTED" && !reviewerNotes) {
      return NextResponse.json({ error: "Reviewer notes are required when rejecting." }, { status: 400 });
    }

    const existing = await prisma.contribution.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Contribution not found." }, { status: 404 });
    }

    // Publishing a NEW_ANIME contribution creates the anime record from its payload.
    let publishedSlug: string | undefined;
    if (status === "PUBLISHED" && existing.type === "NEW_ANIME") {
      const result = await publishAnime(existing.payload);
      if (!result.ok) {
        return NextResponse.json(
          { error: result.error ?? "Cannot publish: invalid payload." },
          { status: 400 }
        );
      }
      publishedSlug = result.slug;
    }

    const contribution = await prisma.contribution.update({
      where: { id },
      data: {
        status,
        reviewerNotes: reviewerNotes ?? undefined,
        reviewedById: reviewer.id,
        ...(status === "REJECTED" || status === "VERIFIED" || status === "PUBLISHED"
          ? { reviewedById: reviewer.id }
          : {}),
      },
    });

    if (status === "PUBLISHED") {
      invalidateCacheTags(["anime", "stats", "home"]);
    }

    return NextResponse.json({ contribution, publishedSlug });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/contributions/[id]]", err);
    return NextResponse.json({ error: "Failed to update contribution." }, { status: 500 });
  }
}

export const runtime = "nodejs";
