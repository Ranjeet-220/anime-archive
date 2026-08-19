import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { characterSchema, characterData } from "@/lib/admin-data";
import { invalidateCacheTags } from "@/lib/cache";

export async function GET() {
  try {
    await requireRole("ADMIN", "EDITOR");
    const characters = await prisma.character.findMany({
      orderBy: { name: "asc" },
      take: 500,
      include: { anime: { select: { id: true, slug: true, title: true } } },
    });
    return NextResponse.json({ characters });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/characters]", err);
    return NextResponse.json({ error: "Failed to load characters." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const body = await req.json().catch(() => null);
    const parsed = characterSchema.safeParse(body ?? {});
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { error: first ? `${first.path.join(".")}: ${first.message}` : "Invalid input." },
        { status: 400 }
      );
    }
    const input = parsed.data;
    const slug = slugify(
      typeof input.slug === "string" && input.slug.trim() ? input.slug : input.name
    );
    const clash = await prisma.character.findUnique({ where: { slug }, select: { id: true } });
    if (clash) {
      return NextResponse.json({ error: "A character with this slug already exists." }, { status: 409 });
    }
    const character = await prisma.character.create({ data: { ...characterData(input), slug } });
    invalidateCacheTags(["character", "anime"]);
    return NextResponse.json({ character }, { status: 201 });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/characters]", err);
    return NextResponse.json({ error: "Failed to create character." }, { status: 500 });
  }
}

export const runtime = "nodejs";
