import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminCharacterForm } from "@/components/user/admin-character-form";

export const metadata: Metadata = {
  title: "Admin · Edit character",
};

export default async function AdminCharacterEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [character, anime] = await Promise.all([
    prisma.character.findUnique({ where: { slug } }),
    prisma.anime.findMany({
      orderBy: { title: "asc" },
      select: { id: true, slug: true, title: true },
      take: 500,
    }),
  ]);
  if (!character) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Characters", href: "/admin/characters" }, { label: character.name }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Edit — {character.name}</h1>
      </div>
      <div className="surface-panel p-6">
        <AdminCharacterForm
          mode="edit"
          initial={{
            id: character.id,
            slug: character.slug,
            name: character.name,
            japaneseName: character.japaneseName,
            role: character.role,
            biography: character.biography,
            voiceActorName: character.voiceActorName,
            animeId: character.animeId,
          }}
          animeOptions={anime}
        />
      </div>
    </div>
  );
}