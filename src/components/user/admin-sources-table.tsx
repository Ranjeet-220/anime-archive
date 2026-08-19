"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldCheck, ShieldX } from "lucide-react";
import type { VerificationStatus } from "@/generated/prisma/client";

export interface SourceRow {
  id: string;
  entityType: string;
  entityId: string;
  sourceUrl: string;
  sourceName: string;
  sourceTitle?: string | null;
  author?: string | null;
  publisher?: string | null;
  verificationDate?: string | null;
  verificationStatus: VerificationStatus;
}

const TONE: Record<VerificationStatus, "default" | "crimson" | "holo" | "neutral" | "ok" | "warn"> = {
  PENDING: "warn",
  VERIFIED: "ok",
  UNVERIFIED: "crimson",
};

export function AdminSourcesTable({ sources }: { sources: SourceRow[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function setStatus(id: string, status: "VERIFIED" | "UNVERIFIED") {
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/sources/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this source?")) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/sources/${id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line bg-charcoal-2 text-left text-[11px] uppercase tracking-wider text-faint">
            <th className="px-3 py-2.5 font-medium">Source</th>
            <th className="px-3 py-2.5 font-medium">Entity</th>
            <th className="px-3 py-2.5 font-medium">Status</th>
            <th className="px-3 py-2.5 font-medium">Verified</th>
            <th className="px-3 py-2.5 font-medium w-64">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((s) => (
            <tr key={s.id} className="border-b border-line/60 last:border-0 bg-charcoal/60 align-top">
              <td className="px-3 py-2.5 max-w-[320px]">
                <p className="truncate text-paper">{s.sourceTitle ?? s.sourceName}</p>
                <a
                  href={s.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-flex items-center gap-1 text-xs text-holo-300 hover:text-holo-400 truncate"
                >
                  {s.sourceName} <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
                </a>
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-muted">{s.entityType}</td>
              <td className="px-3 py-2.5">
                <Badge tone={TONE[s.verificationStatus]}>{s.verificationStatus}</Badge>
              </td>
              <td className="px-3 py-2.5 whitespace-nowrap text-muted tabular-nums">
                {s.verificationDate
                  ? new Date(s.verificationDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                  : "—"}
              </td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busy === s.id || s.verificationStatus === "VERIFIED"}
                    onClick={() => setStatus(s.id, "VERIFIED")}
                    className="h-7 px-2 text-[11px]"
                  >
                    <ShieldCheck className="h-3 w-3" aria-hidden /> Verify
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busy === s.id || s.verificationStatus === "UNVERIFIED"}
                    onClick={() => setStatus(s.id, "UNVERIFIED")}
                    className="h-7 px-2 text-[11px]"
                  >
                    <ShieldX className="h-3 w-3" aria-hidden /> Unverify
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={busy === s.id}
                    onClick={() => remove(s.id)}
                    className="h-7 px-2 text-[11px] text-danger hover:bg-danger/10"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
