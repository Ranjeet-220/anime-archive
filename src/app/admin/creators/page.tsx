import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DeleteButton } from "@/components/user/delete-button";
import { formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin · Creators",
};

export default async function AdminCreatorsPage() {
  const people = await prisma.person.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { directed: true, created: true, credits: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Creators" }]} />
          <h1 className="mt-4 font-display text-2xl text-paper">Creators</h1>
          <p className="mt-1 text-sm text-muted">{people.length} people.</p>
        </div>
        <Link
          href="/admin/creators/new"
          className="inline-flex items-center gap-2 rounded bg-crimson-500 px-4 py-2 font-display text-xs tracking-wide text-paper hover:bg-crimson-400 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden /> Add person
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-charcoal-2 text-left text-[11px] uppercase tracking-wider text-faint">
              <th className="px-3 py-2.5 font-medium">Name</th>
              <th className="px-3 py-2.5 font-medium">Role</th>
              <th className="px-3 py-2.5 font-medium text-right">Directed</th>
              <th className="px-3 py-2.5 font-medium text-right">Created</th>
              <th className="px-3 py-2.5 font-medium">Updated</th>
              <th className="px-3 py-2.5 font-medium w-36">Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map((p) => (
              <tr key={p.id} className="border-b border-line/60 last:border-0 bg-charcoal/60">
                <td className="px-3 py-2.5">
                  <Link href={`/creator/${p.slug}`} className="text-paper hover:text-crimson-300 transition-colors">
                    {p.name}
                  </Link>
                </td>
                <td className="px-3 py-2.5 text-muted">{p.role ?? "—"}</td>
                <td className="px-3 py-2.5 text-right text-muted tabular-nums">{p._count.directed}</td>
                <td className="px-3 py-2.5 text-right text-muted tabular-nums">{p._count.created}</td>
                <td className="px-3 py-2.5 whitespace-nowrap text-muted tabular-nums">{formatDate(p.updatedAt)}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/admin/creators/${p.slug}`}
                      className="rounded border border-line-2 px-2 py-1 text-[11px] text-muted hover:text-paper transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      url={`/api/admin/people/${p.id}`}
                      label="Delete"
                      confirmText={`Delete "${p.name}"?`}
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