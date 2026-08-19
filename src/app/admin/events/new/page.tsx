import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminEventForm } from "@/components/user/admin-event-form";

export const metadata: Metadata = {
  title: "Admin · Add event",
};

export default async function AdminEventNewPage() {
  const [eras, anime, studios, people] = await Promise.all([
    prisma.era.findMany({ orderBy: { order: "asc" }, select: { id: true, name: true } }),
    prisma.anime.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true }, take: 500 }),
    prisma.studio.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.person.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Events", href: "/admin/events" }, { label: "Add" }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Add event</h1>
      </div>
      <div className="surface-panel p-6">
        <AdminEventForm mode="create" eras={eras} anime={anime} studios={studios} people={people} />
      </div>
    </div>
  );
}