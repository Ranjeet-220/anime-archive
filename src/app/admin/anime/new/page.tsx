import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminAnimeForm } from "@/components/user/admin-anime-form";

export const metadata: Metadata = {
  title: "Admin · Add anime",
};

export default async function AdminAnimeNewPage() {
  const [studios, people, eras, genres] = await Promise.all([
    prisma.studio.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.person.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.era.findMany({ orderBy: { order: "asc" }, select: { id: true, name: true } }),
    prisma.genre.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Anime", href: "/admin/anime" }, { label: "Add" }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Add anime</h1>
        <p className="mt-1 text-sm text-muted">
          New records are marked as user-added (isDemoData = false).
        </p>
      </div>
      <div className="surface-panel p-6">
        <AdminAnimeForm mode="create" studios={studios} people={people} eras={eras} genres={genres} />
      </div>
    </div>
  );
}