import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { invalidateCacheTags } from "@/lib/cache";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    const animeId = req.nextUrl.searchParams.get("animeId") ?? "";
    if (!animeId) {
      return NextResponse.json({ error: "animeId is required." }, { status: 400 });
    }
    const rating = await prisma.rating.findUnique({
      where: { userId_animeId: { userId: user.id, animeId } },
    });
    return NextResponse.json({ rating });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/rating]", err);
    return NextResponse.json({ error: "Failed to load rating." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => null);
    const animeId = typeof body?.animeId === "string" ? body.animeId : "";
    const score = Number(body?.score);
    const comment = typeof body?.comment === "string" ? body.comment.trim().slice(0, 1000) : null;

    if (!animeId) {
      return NextResponse.json({ error: "animeId is required." }, { status: 400 });
    }
    if (!Number.isInteger(score) || score < 1 || score > 10) {
      return NextResponse.json({ error: "Score must be an integer between 1 and 10." }, { status: 400 });
    }
    const anime = await prisma.anime.findUnique({ where: { id: animeId }, select: { id: true } });
    if (!anime) {
      return NextResponse.json({ error: "Anime not found." }, { status: 404 });
    }

    const rating = await prisma.$transaction(async (tx) => {
      const r = await tx.rating.upsert({
        where: { userId_animeId: { userId: user.id, animeId } },
        update: { score, comment },
        create: { userId: user.id, animeId, score, comment },
      });
      const agg = await tx.rating.aggregate({
        where: { animeId },
        _avg: { score: true },
        _count: { score: true },
      });
      await tx.anime.update({
        where: { id: animeId },
        data: {
          averageRating: Math.round((agg._avg.score ?? 0) * 10) / 10,
          ratingCount: agg._count.score,
        },
      });
      return r;
    });

    invalidateCacheTags(["anime", "home"]);
    return NextResponse.json({ rating });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/rating]", err);
    return NextResponse.json({ error: "Failed to save rating." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await requireUser();
    const animeId = req.nextUrl.searchParams.get("animeId") ?? "";
    if (!animeId) {
      return NextResponse.json({ error: "animeId is required." }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.rating.deleteMany({ where: { userId: user.id, animeId } });
      const agg = await tx.rating.aggregate({
        where: { animeId },
        _avg: { score: true },
        _count: { score: true },
      });
      await tx.anime.update({
        where: { id: animeId },
        data: {
          averageRating: Math.round((agg._avg.score ?? 0) * 10) / 10,
          ratingCount: agg._count.score,
        },
      });
    });
    invalidateCacheTags(["anime", "home"]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/rating]", err);
    return NextResponse.json({ error: "Failed to delete rating." }, { status: 500 });
  }
}

export const runtime = "nodejs";
