import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminImportForm } from "@/components/user/admin-import-form";

export const metadata: Metadata = {
  title: "Admin · Import",
};

export default function AdminImportPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Import" }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Import</h1>
        <p className="mt-1 text-sm text-muted">
          Bulk-import anime records from JSON or CSV. Nothing is persisted until you confirm.
        </p>
      </div>
      <AdminImportForm />
    </div>
  );
}