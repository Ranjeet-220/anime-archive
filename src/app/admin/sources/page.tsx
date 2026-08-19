import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminSourcesTable } from "@/components/user/admin-sources-table";

export const metadata: Metadata = {
  title: "Admin · Sources",
};

export default async function AdminSourcesPage() {
  const sources = await prisma.source.findMany({
    orderBy: [{ verificationStatus: "asc" }, { sourceName: "asc" }],
    take: 500,
  });

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Sources" }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Sources</h1>
        <p className="mt-1 text-sm text-muted">
          {sources.length} sources. Verifying a source stamps its verification date; unverifying clears it.
        </p>
      </div>
      <AdminSourcesTable
        sources={sources.map((s) => ({
          ...s,
          verificationDate: s.verificationDate ? s.verificationDate.toISOString() : null,
        }))}
      />
    </div>
  );
}