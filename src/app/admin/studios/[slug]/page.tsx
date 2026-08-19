import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminStudioForm } from "@/components/user/admin-studio-form";

export const metadata: Metadata = {
  title: "Admin · Edit studio",
};

export default async function AdminStudioEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const studio = await prisma.studio.findUnique({ where: { slug } });
  if (!studio) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Studios", href: "/admin/studios" }, { label: studio.name }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Edit — {studio.name}</h1>
      </div>
      <div className="surface-panel p-6">
        <AdminStudioForm
          mode="edit"
          initial={{
            id: studio.id,
            slug: studio.slug,
            name: studio.name,
            japaneseName: studio.japaneseName,
            foundedYear: studio.foundedYear,
            headquarters: studio.headquarters,
            founders: studio.founders,
            history: studio.history,
            techniques: studio.techniques,
            significance: studio.significance,
            status: studio.status,
            website: studio.website,
          }}
        />
      </div>
    </div>
  );
}