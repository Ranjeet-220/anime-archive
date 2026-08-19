import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AdminUsersTable } from "@/components/user/admin-users-table";
import { getSessionUser, canManage } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin · Users",
};

export default async function AdminUsersPage() {
  const session = await getSessionUser();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      name: true,
      createdAt: true,
      _count: { select: { contributions: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Users" }]} />
        <h1 className="mt-4 font-display text-2xl text-paper">Users</h1>
        <p className="mt-1 text-sm text-muted">
          {users.length} accounts. {canManage(session?.role ?? "USER") ? "You can change roles." : "Only administrators can change roles."}
        </p>
      </div>
      <AdminUsersTable
        users={users.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() }))}
        canManage={canManage(session?.role ?? "USER")}
      />
    </div>
  );
}