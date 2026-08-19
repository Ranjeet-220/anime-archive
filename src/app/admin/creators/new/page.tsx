import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminPersonForm } from "@/components/user/admin-person-form";

export const metadata: Metadata = {
  title: "Admin · Add person",
};

export default function AdminPersonNewPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Creators", href: "/admin/creators" }, { label: "Add" }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Add person</h1>
      </div>
      <div className="surface-panel p-6">
        <AdminPersonForm mode="create" />
      </div>
    </div>
  );
}