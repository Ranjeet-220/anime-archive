import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Stat } from "@/components/ui/section-heading";
import { CONTRIBUTION_TYPE_LABELS, CONTRIBUTION_STATUS_LABELS } from "@/lib/format";

export const metadata: Metadata = {
  title: "Admin dashboard",
};

const STATUS_TONE: Record<string, "default" | "crimson" | "holo" | "neutral" | "ok" | "warn"> = {
  SUBMITTED: "neutral",
  UNDER_REVIEW: "holo",
  VERIFIED: "warn",
  PUBLISHED: "ok",
  REJECTED: "crimson",
};

export default async function AdminDashboardPage() {
  const [
    animeCount,
    studioCount,
    personCount,
    characterCount,
    eventCount,
    sourceCount,
    userCount,
    statusGroups,
    recentContributions,
    recentUsers,
  ] = await Promise.all([
    prisma.anime.count(),
    prisma.studio.count(),
    prisma.person.count(),
    prisma.character.count(),
    prisma.historicalEvent.count(),
    prisma.source.count(),
    prisma.user.count(),
    prisma.contribution.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.contribution.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { user: { select: { username: true } } },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: { id: true, username: true, email: true, role: true, createdAt: true },
    }),
  ]);

  const statusCounts = Object.fromEntries(statusGroups.map((c) => [c.status, c._count._all]));

  return (
    <div className="space-y-10">
      <div>
        <Breadcrumbs items={[{ label: "Admin" }]} />
        <h1 className="mt-6 font-display text-3xl text-paper">Dashboard</h1>
        <p className="mt-2 text-sm text-muted">Archive overview and review queue.</p>
      </div>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <div className="surface-card p-4">
          <Stat value={animeCount} label="Anime" />
        </div>
        <div className="surface-card p-4">
          <Stat value={studioCount} label="Studios" />
        </div>
        <div className="surface-card p-4">
          <Stat value={personCount} label="Creators" />
        </div>
        <div className="surface-card p-4">
          <Stat value={characterCount} label="Characters" />
        </div>
        <div className="surface-card p-4">
          <Stat value={eventCount} label="Events" />
        </div>
        <div className="surface-card p-4">
          <Stat value={sourceCount} label="Sources" />
        </div>
        <div className="surface-card p-4">
          <Stat value={userCount} label="Users" />
        </div>
        <div className="surface-card p-4">
          <Stat value={statusCounts.SUBMITTED ?? 0} label="Open queue" />
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-paper">Contributions by status</h2>
          <Link href="/admin/contributions" className="text-xs text-holo-300 hover:text-holo-400">
            Review queue →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(CONTRIBUTION_STATUS_LABELS).map(([status, label]) => (
            <div key={status} className="surface-card px-4 py-3">
              <p className="font-display text-2xl text-paper tabular-nums">{statusCounts[status] ?? 0}</p>
              <Badge tone={STATUS_TONE[status]} className="mt-1">
                {label}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 font-display text-xl text-paper">Recent contributions</h2>
          <div className="overflow-hidden rounded-lg border border-line">
            <table className="w-full text-sm">
              <tbody>
                {recentContributions.map((c) => (
                  <tr key={c.id} className="border-b border-line/60 last:border-0 bg-charcoal/60 align-top">
                    <td className="px-3 py-2.5 max-w-[220px]">
                      <p className="truncate text-paper">{c.title}</p>
                      <p className="text-xs text-faint">{CONTRIBUTION_TYPE_LABELS[c.type] ?? c.type}</p>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-muted">{c.user.username}</td>
                    <td className="px-3 py-2.5">
                      <Badge tone={STATUS_TONE[c.status]}>{CONTRIBUTION_STATUS_LABELS[c.status]}</Badge>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-muted tabular-nums">
                      {new Date(c.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl text-paper">Recent users</h2>
          <div className="overflow-hidden rounded-lg border border-line">
            <table className="w-full text-sm">
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u.id} className="border-b border-line/60 last:border-0 bg-charcoal/60">
                    <td className="px-3 py-2.5 text-paper">{u.username}</td>
                    <td className="px-3 py-2.5 text-muted">{u.email}</td>
                    <td className="px-3 py-2.5 text-xs text-faint tabular-nums">
                      {new Date(u.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}