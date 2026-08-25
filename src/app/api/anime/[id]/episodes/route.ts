import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const anime = await prisma.anime.findUnique({ where: { id }, select: { id: true } });
    if (!anime) return NextResponse.json({ error: "Anime not found." }, { status: 404 });
    const episodes = await prisma.episode.findMany({
      where: { animeId: id },
      orderBy: { number: "asc" },
      select: { id: true, number: true, title: true, airDate: true, synopsis: true },
    });
    return NextResponse.json({ episodes }, { status: 200, headers: { "Cache-Control": "public, max-age=60" } });
  } catch (err) {
    console.error("[anime/[id]/episodes]", err);
    return NextResponse.json({ error: "Failed to load episodes." }, { status: 500 });
  }
}

export const runtime = "nodejs";