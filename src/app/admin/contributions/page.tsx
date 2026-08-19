import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminContributionsTable } from "@/components/user/admin-contributions-table";

export const metadata: Metadata = {
  title: "Admin · Contributions",
};

export default async function AdminContributionsPage() {
  const contributions = await prisma.contribution.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      user: { select: { id: true, username: true, email: true } },
      reviewedBy: { select: { id: true, username: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Contributions" }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Contributions</h1>
        <p className="mt-1 text-sm text-muted">
          {contributions.length} submissions. Publishing a NEW_ANIME contribution creates the anime
          record from its payload; rejection requires reviewer notes.
        </p>
      </div>
      <AdminContributionsTable
        rows={contributions.map((c) => ({
          ...c,
          createdAt: c.createdAt.toISOString(),
        }))}
        isAdmin={false}
      />
    </div>
  );
}