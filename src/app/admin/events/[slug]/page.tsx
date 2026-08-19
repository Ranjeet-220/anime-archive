import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminEventForm } from "@/components/user/admin-event-form";

export const metadata: Metadata = {
  title: "Admin · Edit event",
};

export default async function AdminEventEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [event, eras, anime, studios, people] = await Promise.all([
    prisma.historicalEvent.findUnique({ where: { slug } }),
    prisma.era.findMany({ orderBy: { order: "asc" }, select: { id: true, name: true } }),
    prisma.anime.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true }, take: 500 }),
    prisma.studio.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.person.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!event) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Events", href: "/admin/events" }, { label: event.title }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Edit — {event.title}</h1>
      </div>
      <div className="surface-panel p-6">
        <AdminEventForm
          mode="edit"
          initial={{
            id: event.id,
            slug: event.slug,
            title: event.title,
            year: event.year,
            month: event.month,
            day: event.day,
            description: event.description,
            kind: event.kind,
            eraId: event.eraId,
            animeId: event.animeId,
            studioId: event.studioId,
            personId: event.personId,
          }}
          eras={eras}
          anime={anime}
          studios={studios}
          people={people}
        />
      </div>
    </div>
  );
}