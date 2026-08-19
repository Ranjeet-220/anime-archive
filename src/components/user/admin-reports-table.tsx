"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ReportRow {
  id: string;
  targetType: string;
  targetId: string;
  reason: string;
  details: string | null;
  status: "OPEN" | "RESOLVED" | "DISMISSED";
  createdAt: string;
  resolvedAt: string | null;
  user: { id: string; username: string; email: string };
}

const STATUS_TONE: Record<ReportRow["status"], "warn" | "ok" | "neutral"> = {
  OPEN: "warn",
  RESOLVED: "ok",
  DISMISSED: "neutral",
};

export function AdminReportsTable({ rows }: { rows: ReportRow[] }) {
  const [items, setItems] = useState(rows);

  async function update(id: string, status: "RESOLVED" | "DISMISSED") {
    const res = await fetch("/api/admin/reports", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId: id, status }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      alert(data?.error ?? "Failed to update report.");
      return;
    }
    setItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, resolvedAt: new Date().toISOString() } : r))
    );
  }

  if (items.length === 0) {
    return (
      <p className="rounded border border-dashed border-line-2 bg-charcoal/60 px-4 py-10 text-center text-sm text-muted">
        No reports submitted yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded border border-line">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-charcoal-2/60 text-[11px] uppercase tracking-[0.18em] text-faint">
            <th className="px-4 py-3">Target</th>
            <th className="px-4 py-3">Reason</th>
            <th className="px-4 py-3">Reported by</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.id} className="border-b border-line/60 last:border-0">
              <td className="px-4 py-3">
                <p className="font-display text-[13px] text-paper">
                  {r.targetType}
                  <span className="ml-2 text-xs text-faint">{r.targetId}</span>
                </p>
                {r.details ? (
                  <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted">{r.details}</p>
                ) : null}
              </td>
              <td className="px-4 py-3 text-muted">{r.reason}</td>
              <td className="px-4 py-3 text-muted">
                {r.user.username}
                <span className="block text-xs text-faint">{r.user.email}</span>
              </td>
              <td className="px-4 py-3">
                <Badge tone={STATUS_TONE[r.status]}>{r.status}</Badge>
              </td>
              <td className="px-4 py-3 text-xs text-faint">
                {new Date(r.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-right">
                {r.status === "OPEN" ? (
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => update(r.id, "RESOLVED")}>
                      Resolve
                    </Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => update(r.id, "DISMISSED")}>
                      Dismiss
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs text-faint">
                    {r.resolvedAt ? new Date(r.resolvedAt).toLocaleDateString() : "—"}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}