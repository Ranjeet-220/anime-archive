import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminPersonForm } from "@/components/user/admin-person-form";

export const metadata: Metadata = {
  title: "Admin · Edit person",
};

export default async function AdminPersonEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = await prisma.person.findUnique({ where: { slug } });
  if (!person) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Creators", href: "/admin/creators" }, { label: person.name }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Edit — {person.name}</h1>
      </div>
      <div className="surface-panel p-6">
        <AdminPersonForm
          mode="edit"
          initial={{
            id: person.id,
            slug: person.slug,
            name: person.name,
            japaneseName: person.japaneseName,
            role: person.role,
            bornYear: person.bornYear,
            diedYear: person.diedYear,
            birthplace: person.birthplace,
            biography: person.biography,
            career: person.career,
            majorWorks: person.majorWorks,
            awards: person.awards,
            contribution: person.contribution,
            website: person.website,
          }}
        />
      </div>
    </div>
  );
}