import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/user/delete-button";
import { FORMAT_LABELS, STATUS_LABELS } from "@/lib/format";
import { formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin · Anime",
};

export default async function AdminAnimePage() {
  const anime = await prisma.anime.findMany({
    orderBy: { updatedAt: "desc" },
    take: 500,
    select: {
      id: true,
      slug: true,
      title: true,
      year: true,
      format: true,
      status: true,
      episodeCount: true,
      isDemoData: true,
      updatedAt: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Anime" }]} />
          <h1 className="mt-4 font-display text-2xl text-paper">Anime</h1>
          <p className="mt-1 text-sm text-muted">{anime.length} records.</p>
        </div>
        <Link
          href="/admin/anime/new"
          className="inline-flex items-center gap-2 rounded bg-crimson-500 px-4 py-2 font-display text-xs tracking-wide text-paper hover:bg-crimson-400 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden /> Add anime
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-charcoal-2 text-left text-[11px] uppercase tracking-wider text-faint">
              <th className="px-3 py-2.5 font-medium">Title</th>
              <th className="px-3 py-2.5 font-medium text-right">Year</th>
              <th className="px-3 py-2.5 font-medium">Format</th>
              <th className="px-3 py-2.5 font-medium">Status</th>
              <th className="px-3 py-2.5 font-medium text-right">Episodes</th>
              <th className="px-3 py-2.5 font-medium">Updated</th>
              <th className="px-3 py-2.5 font-medium w-36">Actions</th>
            </tr>
          </thead>
          <tbody>
            {anime.map((a) => (
              <tr key={a.id} className="border-b border-line/60 last:border-0 bg-charcoal/60">
                <td className="px-3 py-2.5">
                  <Link href={`/anime/${a.slug}`} className="text-paper hover:text-crimson-300 transition-colors">
                    {a.title}
                  </Link>
                  {!a.isDemoData ? (
                    <Badge tone="holo" className="ml-2">user-added</Badge>
                  ) : null}
                </td>
                <td className="px-3 py-2.5 text-right text-muted tabular-nums">{a.year ?? "—"}</td>
                <td className="px-3 py-2.5 text-muted">{FORMAT_LABELS[a.format]}</td>
                <td className="px-3 py-2.5">
                  <Badge tone={a.status === "FINISHED" ? "ok" : a.status === "AIRING" ? "holo" : "neutral"}>
                    {STATUS_LABELS[a.status]}
                  </Badge>
                </td>
                <td className="px-3 py-2.5 text-right text-muted tabular-nums">{a.episodeCount ?? "—"}</td>
                <td className="px-3 py-2.5 whitespace-nowrap text-muted tabular-nums">{formatDate(a.updatedAt)}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/admin/anime/${a.slug}`}
                      className="rounded border border-line-2 px-2 py-1 text-[11px] text-muted hover:text-paper transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      url={`/api/admin/anime/${a.slug}`}
                      label="Delete"
                      confirmText={`Delete "${a.title}"? This also removes its favorites, ratings, notes and characters.`}
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