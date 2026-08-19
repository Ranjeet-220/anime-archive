import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await requireUser();
    const collections = await prisma.collection.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        _count: { select: { items: true } },
        items: {
          orderBy: { addedAt: "desc" },
          take: 12,
          include: { anime: { select: { id: true, slug: true, title: true, year: true } } },
        },
      },
    });
    return NextResponse.json({ collections });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/collections]", err);
    return NextResponse.json({ error: "Failed to load collections." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => null);

    // Add item to a collection: { collectionId, animeId }
    if (typeof body?.collectionId === "string" && typeof body?.animeId === "string") {
      const { collectionId, animeId } = body;
      const collection = await prisma.collection.findFirst({
        where: { id: collectionId, userId: user.id },
        select: { id: true },
      });
      if (!collection) {
        return NextResponse.json({ error: "Collection not found." }, { status: 404 });
      }
      const anime = await prisma.anime.findUnique({ where: { id: animeId }, select: { id: true } });
      if (!anime) {
        return NextResponse.json({ error: "Anime not found." }, { status: 404 });
      }
      await prisma.collectionItem.upsert({
        where: { collectionId_animeId: { collectionId, animeId } },
        update: {},
        create: { collectionId, animeId },
      });
      return NextResponse.json({ ok: true });
    }

    // Create collection: { name, description?, isPublic? }
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    if (!name || name.length > 80) {
      return NextResponse.json({ error: "Collection name is required (max 80 characters)." }, { status: 400 });
    }
    const collection = await prisma.collection.create({
      data: {
        userId: user.id,
        name,
        description: typeof body?.description === "string" ? body.description.trim().slice(0, 500) : null,
        isPublic: typeof body?.isPublic === "boolean" ? body.isPublic : true,
      },
    });
    return NextResponse.json({ collection }, { status: 201 });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/collections]", err);
    return NextResponse.json({ error: "Failed to update collections." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => null);
    const id = typeof body?.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ error: "id is required." }, { status: 400 });
    }

    const data: { name?: string; description?: string | null; isPublic?: boolean } = {};
    if (typeof body?.name === "string") {
      const name = body.name.trim();
      if (!name || name.length > 80) {
        return NextResponse.json({ error: "Collection name must be 1–80 characters." }, { status: 400 });
      }
      data.name = name;
    }
    if (typeof body?.description === "string") {
      data.description = body.description.trim().slice(0, 500);
    }
    if (typeof body?.isPublic === "boolean") {
      data.isPublic = body.isPublic;
    }

    const collection = await prisma.collection.updateMany({
      where: { id, userId: user.id },
      data,
    });
    if (collection.count === 0) {
      return NextResponse.json({ error: "Collection not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/collections]", err);
    return NextResponse.json({ error: "Failed to update collection." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await requireUser();
    const search = req.nextUrl.searchParams;

    // Remove item: ?collectionId=&animeId=
    const collectionId = search.get("collectionId");
    const animeId = search.get("animeId");
    if (collectionId && animeId) {
      const collection = await prisma.collection.findFirst({
        where: { id: collectionId, userId: user.id },
        select: { id: true },
      });
      if (!collection) {
        return NextResponse.json({ error: "Collection not found." }, { status: 404 });
      }
      await prisma.collectionItem.deleteMany({ where: { collectionId, animeId } });
      return NextResponse.json({ ok: true });
    }

    // Delete collection: ?id=
    const id = search.get("id");
    if (!id) {
      return NextResponse.json({ error: "id (or collectionId + animeId) is required." }, { status: 400 });
    }
    const deleted = await prisma.collection.deleteMany({ where: { id, userId: user.id } });
    if (deleted.count === 0) {
      return NextResponse.json({ error: "Collection not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/collections]", err);
    return NextResponse.json({ error: "Failed to delete collection." }, { status: 500 });
  }
}

export const runtime = "nodejs";
