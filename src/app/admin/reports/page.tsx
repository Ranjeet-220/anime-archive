import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminReportsTable } from "@/components/user/admin-reports-table";

export const metadata: Metadata = {
  title: "Admin · Reports",
};

export default async function AdminReportsPage() {
  const reports = await prisma.report.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    take: 200,
    include: {
      user: { select: { id: true, username: true, email: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Reports" }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Reports</h1>
        <p className="mt-1 text-sm text-muted">
          User-submitted reports (e.g. corrections, takedown requests, factual issues). Resolving or
          dismissing a report is recorded against today&apos;s date.
        </p>
      </div>
      <AdminReportsTable
        rows={reports.map((r) => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
          resolvedAt: r.resolvedAt ? r.resolvedAt.toISOString() : null,
        }))}
      />
    </div>
  );
}