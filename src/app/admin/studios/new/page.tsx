import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminStudioForm } from "@/components/user/admin-studio-form";

export const metadata: Metadata = {
  title: "Admin · Add studio",
};

export default function AdminStudioNewPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Studios", href: "/admin/studios" }, { label: "Add" }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Add studio</h1>
      </div>
      <div className="surface-panel p-6">
        <AdminStudioForm mode="create" />
      </div>
    </div>
  );
}