import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/user/delete-button";
import { EVENT_KIND_LABELS } from "@/lib/format";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin · Events",
};

export default async function AdminEventsPage() {
  const [events, eras, anime, studios, people] = await Promise.all([
    prisma.historicalEvent.findMany({
      orderBy: [{ year: "desc" }, { month: "desc" }, { day: "desc" }],
      take: 500,
    }),
    prisma.era.findMany({ select: { id: true, name: true } }),
    prisma.anime.findMany({ select: { id: true, title: true } }),
    prisma.studio.findMany({ select: { id: true, name: true } }),
    prisma.person.findMany({ select: { id: true, name: true } }),
  ]);
  const eraName = (id: string | null) => eras.find((e) => e.id === id)?.name ?? "—";
  const animeTitle = (id: string | null) => anime.find((a) => a.id === id)?.title ?? "—";
  const studioName = (id: string | null) => studios.find((s) => s.id === id)?.name ?? "—";
  const personName = (id: string | null) => people.find((p) => p.id === id)?.name ?? "—";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Events" }]} />
          <h1 className="mt-4 font-display text-2xl text-paper">Events</h1>
          <p className="mt-1 text-sm text-muted">{events.length} events (showing first 500).</p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 rounded bg-crimson-500 px-4 py-2 font-display text-xs tracking-wide text-paper hover:bg-crimson-400 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden /> Add event
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-charcoal-2 text-left text-[11px] uppercase tracking-wider text-faint">
              <th className="px-3 py-2.5 font-medium">Date</th>
              <th className="px-3 py-2.5 font-medium">Title</th>
              <th className="px-3 py-2.5 font-medium">Kind</th>
              <th className="px-3 py-2.5 font-medium">Era</th>
              <th className="px-3 py-2.5 font-medium">Related to</th>
              <th className="px-3 py-2.5 font-medium w-36">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b border-line/60 last:border-0 bg-charcoal/60">
                <td className="px-3 py-2.5 whitespace-nowrap text-muted tabular-nums">
                  {e.year ?? "—"}
                  {e.month ? `-${String(e.month).padStart(2, "0")}` : ""}
                  {e.day ? `-${String(e.day).padStart(2, "0")}` : ""}
                </td>
                <td className="px-3 py-2.5">
                  <Link href="/timeline" className="text-paper hover:text-crimson-300 transition-colors">
                    {e.title}
                  </Link>
                </td>
                <td className="px-3 py-2.5">
                  <Badge>{EVENT_KIND_LABELS[e.kind] ?? e.kind}</Badge>
                </td>
                <td className="px-3 py-2.5 text-muted">{eraName(e.eraId)}</td>
                <td className="px-3 py-2.5 text-muted">
                  {e.animeId ? animeTitle(e.animeId) : e.studioId ? studioName(e.studioId) : e.personId ? personName(e.personId) : "—"}
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/admin/events/${e.slug}`}
                      className="rounded border border-line-2 px-2 py-1 text-[11px] text-muted hover:text-paper transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      url={`/api/admin/events/${e.id}`}
                      label="Delete"
                      confirmText={`Delete event "${e.title}"?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}