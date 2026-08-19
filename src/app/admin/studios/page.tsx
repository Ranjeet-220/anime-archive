import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DeleteButton } from "@/components/user/delete-button";
import { formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin · Studios",
};

export default async function AdminStudiosPage() {
  const studios = await prisma.studio.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { anime: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Studios" }]} />
          <h1 className="mt-4 font-display text-2xl text-paper">Studios</h1>
          <p className="mt-1 text-sm text-muted">{studios.length} studios.</p>
        </div>
        <Link
          href="/admin/studios/new"
          className="inline-flex items-center gap-2 rounded bg-crimson-500 px-4 py-2 font-display text-xs tracking-wide text-paper hover:bg-crimson-400 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden /> Add studio
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-charcoal-2 text-left text-[11px] uppercase tracking-wider text-faint">
              <th className="px-3 py-2.5 font-medium">Name</th>
              <th className="px-3 py-2.5 font-medium text-right">Founded</th>
              <th className="px-3 py-2.5 font-medium text-right">Anime</th>
              <th className="px-3 py-2.5 font-medium">Updated</th>
              <th className="px-3 py-2.5 font-medium w-36">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studios.map((s) => (
              <tr key={s.id} className="border-b border-line/60 last:border-0 bg-charcoal/60">
                <td className="px-3 py-2.5">
                  <Link href={`/studio/${s.slug}`} className="text-paper hover:text-crimson-300 transition-colors">
                    {s.name}
                  </Link>
                  {s.status ? <span className="ml-2 text-xs text-faint">{s.status}</span> : null}
                </td>
                <td className="px-3 py-2.5 text-right text-muted tabular-nums">{s.foundedYear ?? "—"}</td>
                <td className="px-3 py-2.5 text-right text-muted tabular-nums">{s._count.anime}</td>
                <td className="px-3 py-2.5 whitespace-nowrap text-muted tabular-nums">{formatDate(s.updatedAt)}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/admin/studios/${s.slug}`}
                      className="rounded border border-line-2 px-2 py-1 text-[11px] text-muted hover:text-paper transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      url={`/api/admin/studios/${s.id}`}
                      label="Delete"
                      confirmText={`Delete "${s.name}"?`}
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