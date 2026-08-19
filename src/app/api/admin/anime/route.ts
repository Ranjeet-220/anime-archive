import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { animeSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";
import { animeData } from "@/lib/admin-data";
import { invalidateCacheTags } from "@/lib/cache";

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

export async function POST(req: NextRequest) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const body = await req.json().catch(() => null);
    const parsed = animeSchema.safeParse(body ?? {});
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { error: first ? `${first.path.join(".")}: ${first.message}` : "Invalid input." },
        { status: 400 }
      );
    }
    const input = parsed.data;

    const slug =
      typeof input.slug === "string" && input.slug.trim()
        ? await uniqueSlug(input.slug)
        : await uniqueSlug(input.title);

    const anime = await prisma.anime.create({
      data: {
        ...animeData(input),
        slug,
        isDemoData: false,
        genres: input.genreIds?.length ? { connect: input.genreIds.map((id) => ({ id })) } : undefined,
      },
    });
    invalidateCacheTags(["anime", "stats", "home"]);
    return NextResponse.json({ anime }, { status: 201 });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/anime]", err);
    return NextResponse.json({ error: "Failed to create anime." }, { status: 500 });
  }
}

export const runtime = "nodejs";
