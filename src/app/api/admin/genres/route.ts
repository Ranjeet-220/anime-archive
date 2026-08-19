import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { requiredStr } from "@/lib/validation";
import { invalidateCacheTags } from "@/lib/cache";
import { z } from "zod";
import { slugify } from "@/lib/utils";

const genreSchema = z.object({
  name: requiredStr(100),
  japaneseName: z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : v),
    z.string().max(100).nullable().optional()
  ),
  description: z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : v),
    z.string().max(2000).nullable().optional()
  ),
});

export async function GET() {
  try {
    await requireRole("ADMIN", "EDITOR");
    const genres = await prisma.genre.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { anime: true } } },
    });
    return NextResponse.json({ genres });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/genres]", err);
    return NextResponse.json({ error: "Failed to load genres." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const body = await req.json().catch(() => null);
    const parsed = genreSchema.safeParse(body ?? {});
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { error: first ? `${first.path.join(".")}: ${first.message}` : "Invalid input." },
        { status: 400 }
      );
    }
    const input = parsed.data;
    const slug = slugify(input.name);
    const clash = await prisma.genre.findUnique({ where: { slug }, select: { id: true } });
    if (clash) {
      return NextResponse.json({ error: "A genre with this slug already exists." }, { status: 409 });
    }
    const genre = await prisma.genre.create({
      data: { slug, name: input.name, japaneseName: input.japaneseName ?? null, description: input.description ?? null },
    });
    invalidateCacheTags(["genre", "anime"]);
    return NextResponse.json({ genre }, { status: 201 });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/genres]", err);
    return NextResponse.json({ error: "Failed to create genre." }, { status: 500 });
  }
}

export const runtime = "nodejs";
