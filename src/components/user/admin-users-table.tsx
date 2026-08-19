"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/field";
import { ROLE_LABELS } from "@/lib/format";
import type { Role } from "@/generated/prisma/client";

const ROLES: Role[] = ["USER", "CONTRIBUTOR", "EDITOR", "ADMIN"];

const ROLE_TONE: Record<Role, "default" | "crimson" | "holo" | "neutral" | "ok" | "warn"> = {
  USER: "neutral",
  CONTRIBUTOR: "default",
  EDITOR: "holo",
  ADMIN: "crimson",
};

export interface UserRow {
  id: string;
  username: string;
  email: string;
  role: Role;
  name?: string | null;
  createdAt: string;
  _count: { contributions: number };
}

export function AdminUsersTable({ users, canManage }: { users: UserRow[]; canManage: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function changeRole(id: string, role: Role) {
    setError(null);
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Failed to update role.");
      } else {
        router.refresh();
      }
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      {error ? <p className="mb-3 text-sm text-danger">{error}</p> : null}
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-charcoal-2 text-left text-[11px] uppercase tracking-wider text-faint">
              <th className="px-3 py-2.5 font-medium">Username</th>
              <th className="px-3 py-2.5 font-medium">Email</th>
              <th className="px-3 py-2.5 font-medium">Role</th>
              <th className="px-3 py-2.5 font-medium text-right">Contributions</th>
              <th className="px-3 py-2.5 font-medium">Joined</th>
              {canManage ? <th className="px-3 py-2.5 font-medium w-44">Change role</th> : null}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-line/60 last:border-0 bg-charcoal/60">
                <td className="px-3 py-2.5">
                  <span className="text-paper">{u.username}</span>
                  {u.name ? <span className="ml-1.5 text-xs text-faint">{u.name}</span> : null}
                </td>
                <td className="px-3 py-2.5 text-muted">{u.email}</td>
                <td className="px-3 py-2.5">
                  <Badge tone={ROLE_TONE[u.role]}>{ROLE_LABELS[u.role]}</Badge>
                </td>
                <td className="px-3 py-2.5 text-right text-muted tabular-nums">{u._count.contributions}</td>
                <td className="px-3 py-2.5 whitespace-nowrap text-muted tabular-nums">
                  {new Date(u.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </td>
                {canManage ? (
                  <td className="px-3 py-2.5">
                    <Select
                      value={u.role}
                      disabled={busy === u.id}
                      onChange={(e) => changeRole(u.id, e.target.value as Role)}
                      className="h-8 py-1 text-xs"
                      aria-label={`Role for ${u.username}`}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {ROLE_LABELS[r]}
                        </option>
                      ))}
                    </Select>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
