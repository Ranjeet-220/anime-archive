"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/field";
import { CONTRIBUTION_TYPE_LABELS, CONTRIBUTION_STATUS_LABELS } from "@/lib/format";
import type { ContributionStatus } from "@/generated/prisma/client";

const STATUSES: ContributionStatus[] = ["SUBMITTED", "UNDER_REVIEW", "VERIFIED", "PUBLISHED", "REJECTED"];

const STATUS_TONE: Record<ContributionStatus, "default" | "crimson" | "holo" | "neutral" | "ok" | "warn"> = {
  SUBMITTED: "neutral",
  UNDER_REVIEW: "holo",
  VERIFIED: "warn",
  PUBLISHED: "ok",
  REJECTED: "crimson",
};

export interface ContributionRow {
  id: string;
  type: string;
  title: string;
  description?: string | null;
  status: ContributionStatus;
  reviewerNotes?: string | null;
  createdAt: string;
  user: { id: string; username: string; email: string };
  reviewedBy?: { id: string; username: string } | null;
}

export function AdminContributionsTable({ rows, isAdmin }: { rows: ContributionRow[]; isAdmin: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function changeStatus(id: string, status: ContributionStatus) {
    let reviewerNotes: string | null = null;
    if (status === "REJECTED") {
      reviewerNotes = window.prompt("Reviewer notes (required for rejection):");
      if (reviewerNotes === null) return;
      if (!reviewerNotes.trim()) {
        setError("Reviewer notes are required when rejecting.");
        return;
      }
    }
    setError(null);
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/contributions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reviewerNotes: reviewerNotes ?? undefined }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Failed to update contribution.");
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
              <th className="px-3 py-2.5 font-medium">Type</th>
              <th className="px-3 py-2.5 font-medium">Title</th>
              <th className="px-3 py-2.5 font-medium">Submitted by</th>
              <th className="px-3 py-2.5 font-medium">Created</th>
              <th className="px-3 py-2.5 font-medium">Status</th>
              <th className="px-3 py-2.5 font-medium">Reviewer</th>
              <th className="px-3 py-2.5 font-medium">Notes</th>
              <th className="px-3 py-2.5 font-medium w-44">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-line/60 last:border-0 bg-charcoal/60 align-top">
                <td className="px-3 py-2.5 whitespace-nowrap text-muted">
                  {CONTRIBUTION_TYPE_LABELS[c.type] ?? c.type}
                </td>
                <td className="px-3 py-2.5">
                  <p className="text-paper">{c.title}</p>
                  {c.description ? <p className="mt-0.5 max-w-xs text-xs text-muted line-clamp-2">{c.description}</p> : null}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-muted">{c.user.username}</td>
                <td className="px-3 py-2.5 whitespace-nowrap text-muted tabular-nums">
                  {new Date(c.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </td>
                <td className="px-3 py-2.5">
                  <Badge tone={STATUS_TONE[c.status]}>{CONTRIBUTION_STATUS_LABELS[c.status]}</Badge>
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-muted">{c.reviewedBy?.username ?? "—"}</td>
                <td className="px-3 py-2.5 max-w-[220px] text-xs text-muted">{c.reviewerNotes ?? "—"}</td>
                <td className="px-3 py-2.5">
                  <Select
                    value={c.status}
                    disabled={busy === c.id}
                    onChange={(e) => changeStatus(c.id, e.target.value as ContributionStatus)}
                    className="h-8 py-1 text-xs"
                    aria-label={`Status for ${c.title}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {CONTRIBUTION_STATUS_LABELS[s]}
                      </option>
                    ))}
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAdmin ? null : (
        <p className="mt-2 text-xs text-faint">Editors can review; only administrators can change user roles.</p>
      )}
    </div>
  );
}
