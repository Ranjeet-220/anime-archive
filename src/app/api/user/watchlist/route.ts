import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import type { WatchStatus } from "@/generated/prisma/client";

const WATCH_STATUSES: WatchStatus[] = ["PLANNED", "WATCHING", "COMPLETED", "ON_HOLD", "DROPPED"];

export async function GET() {
  try {
    const user = await requireUser();
    const items = await prisma.watchlistItem.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        anime: {
          select: {
            id: true,
            slug: true,
            title: true,
            japaneseTitle: true,
            year: true,
            format: true,
            averageRating: true,
            coverUrl: true,
          },
        },
      },
    });
    return NextResponse.json({ items });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/watchlist]", err);
    return NextResponse.json({ error: "Failed to load watchlist." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => null);
    const animeId = typeof body?.animeId === "string" ? body.animeId : "";
    const status = (typeof body?.status === "string" ? body.status : "PLANNED") as WatchStatus;

    if (!animeId) {
      return NextResponse.json({ error: "animeId is required." }, { status: 400 });
    }
    if (!WATCH_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid watchlist status." }, { status: 400 });
    }
    const anime = await prisma.anime.findUnique({ where: { id: animeId }, select: { id: true } });
    if (!anime) {
      return NextResponse.json({ error: "Anime not found." }, { status: 404 });
    }

    const item = await prisma.watchlistItem.upsert({
      where: { userId_animeId: { userId: user.id, animeId } },
      update: { status },
      create: { userId: user.id, animeId, status },
    });
    return NextResponse.json({ item });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/watchlist]", err);
    return NextResponse.json({ error: "Failed to update watchlist." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => null);
    const animeId = typeof body?.animeId === "string" ? body.animeId : "";
    const status = (typeof body?.status === "string" ? body.status : "") as WatchStatus;

    if (!animeId || !status) {
      return NextResponse.json({ error: "animeId and status are required." }, { status: 400 });
    }
    if (!WATCH_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid watchlist status." }, { status: 400 });
    }

    const item = await prisma.watchlistItem.update({
      where: { userId_animeId: { userId: user.id, animeId } },
      data: { status },
    });
    return NextResponse.json({ item });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/watchlist]", err);
    return NextResponse.json({ error: "Failed to update watchlist." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await requireUser();
    const animeId = req.nextUrl.searchParams.get("animeId") ?? "";

    if (!animeId) {
      return NextResponse.json({ error: "animeId is required." }, { status: 400 });
    }
    await prisma.watchlistItem.deleteMany({
      where: { userId: user.id, animeId },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/watchlist]", err);
    return NextResponse.json({ error: "Failed to update watchlist." }, { status: 500 });
  }
}

export const runtime = "nodejs";
