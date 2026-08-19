import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminCharacterForm } from "@/components/user/admin-character-form";

export const metadata: Metadata = {
  title: "Admin · Add character",
};

export default async function AdminCharacterNewPage() {
  const anime = await prisma.anime.findMany({
    orderBy: { title: "asc" },
    select: { id: true, slug: true, title: true },
    take: 500,
  });

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Characters", href: "/admin/characters" }, { label: "Add" }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Add character</h1>
      </div>
      <div className="surface-panel p-6">
        <AdminCharacterForm mode="create" animeOptions={anime} />
      </div>
    </div>
  );
}