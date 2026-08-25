"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/field";
import { CONTRIBUTION_TYPE_LABELS, CONTRIBUTION_STATUS_LABELS } from "@/lib/format";
import type { ContributionStatus } from "@/generated/prisma/client";
import { Check, ChevronDown, ChevronRight, Copy } from "lucide-react";
import {
  flattenPayload,
  isPlainObject,
  lineDiff,
  parseCorrectionEntry,
  parsePayload,
  prettyJson,
  stringifyValue,
} from "@/components/user/contribution-diff";
import type { DiffLine, PayloadField } from "@/components/user/contribution-diff";

const STATUSES: ContributionStatus[] = ["SUBMITTED", "UNDER_REVIEW", "VERIFIED", "PUBLISHED", "REJECTED"];

const STATUS_TONE: Record<ContributionStatus, "default" | "crimson" | "holo" | "neutral" | "ok" | "warn"> = {
  SUBMITTED: "neutral",
  UNDER_REVIEW: "holo",
  VERIFIED: "warn",
  PUBLISHED: "ok",
  REJECTED: "crimson",
};

const NEW_TYPES = new Set(["NEW_ANIME", "NEW_CREATOR", "NEW_STUDIO", "NEW_SOURCE"]);

export interface ContributionRow {
  id: string;
  type: string;
  title: string;
  description?: string | null;
  status: ContributionStatus;
  reviewerNotes?: string | null;
  payload?: unknown;
  createdAt: string;
  user: { id: string; username: string; email: string };
  reviewedBy?: { id: string; username: string } | null;
}

export function AdminContributionsTable({ rows, isAdmin }: { rows: ContributionRow[]; isAdmin: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

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
              <th className="px-3 py-2.5 w-16 font-medium">Diff</th>
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
            {rows.map((c) => {
              const isOpen = openId === c.id;
              return (
                <Fragment key={c.id}>
                  <tr className="border-b border-line/60 last:border-0 bg-charcoal/60 align-top">
                    <td className="px-3 py-2.5">
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : c.id)}
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Hide" : "Show"} diff for ${c.title}`}
                        className="inline-flex items-center gap-1 rounded border border-line-2 bg-charcoal px-2 py-1.5 font-display text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-crimson-500/50 hover:text-paper"
                      >
                        {isOpen ? <ChevronDown className="h-3.5 w-3.5" aria-hidden /> : <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
                        Diff
                      </button>
                    </td>
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
                  {isOpen ? <DiffPanel c={c} /> : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {isAdmin ? null : (
        <p className="mt-2 text-xs text-faint">Editors can review; only administrators can change user roles.</p>
      )}
    </div>
  );
}

function MetaItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-display text-[11px] uppercase tracking-wider text-faint">{label}</span>
      <span className="text-xs text-paper-2">{children}</span>
    </div>
  );
}

function UnifiedDiff({ title, lines }: { title: string; lines: DiffLine[] }) {
  return (
    <div className="mb-3">
      <p className="mb-1 font-display text-[11px] uppercase tracking-wider text-faint">{title}</p>
      <pre className="overflow-x-auto rounded border border-line bg-charcoal font-mono text-xs leading-relaxed">
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              l.type === "add"
                ? "bg-ok/10 text-ok"
                : l.type === "remove"
                  ? "bg-danger/10 text-danger line-through decoration-danger/60"
                  : "text-muted"
            }
          >
            <span className="inline-block w-4 select-none text-center">
              {l.type === "add" ? "+" : l.type === "remove" ? "-" : " "}
            </span>
            {l.line || " "}
          </div>
        ))}
      </pre>
    </div>
  );
}

function NewFieldsView({ fields }: { fields: PayloadField[] }) {
  const textFields = fields.filter((f) => f.value.includes("\n") && f.value.trim().length > 0);
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded border border-line">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-line bg-charcoal-2 text-left font-display text-[11px] uppercase tracking-wider text-faint">
              <th className="px-3 py-2 font-medium">Field</th>
              <th className="px-3 py-2 font-medium">Proposed value</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f) => (
              <tr key={f.field} className="border-b border-line/60 last:border-0 align-top">
                <td className="px-3 py-2 whitespace-nowrap font-mono text-muted">
                  <span className="mr-1.5 text-ok">+</span>
                  {f.field}
                </td>
                <td className="max-w-xl px-3 py-2 whitespace-pre-wrap text-paper">{f.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {textFields.length > 0 ? (
        <div>
          <p className="mb-2 font-display text-[11px] uppercase tracking-wider text-faint">Text diff (vs blank record)</p>
          {textFields.map((f) => (
            <UnifiedDiff key={f.field} title={f.field} lines={lineDiff("", f.value)} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CorrectionView({ payload }: { payload: Record<string, unknown> }) {
  const entries = Object.entries(payload).map(([field, raw]) => {
    const entry = parseCorrectionEntry(raw);
    const proposed = entry?.proposed ?? stringifyValue(raw);
    const current = entry?.current ?? null;
    return {
      field,
      current,
      proposed,
      diff: proposed.includes("\n") || (current !== null && current.includes("\n"))
        ? lineDiff(current ?? "", proposed)
        : null,
    };
  });
  const multiLine = entries.filter((e) => e.diff !== null);
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded border border-line">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-line bg-charcoal-2 text-left font-display text-[11px] uppercase tracking-wider text-faint">
              <th className="px-3 py-2 font-medium">Field</th>
              <th className="px-3 py-2 font-medium">Current</th>
              <th className="px-3 py-2 font-medium">Proposed change</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.field} className="border-b border-line/60 last:border-0 align-top">
                <td className="px-3 py-2 whitespace-nowrap font-mono text-muted">{e.field}</td>
                <td className="max-w-xs px-3 py-2 whitespace-pre-wrap text-paper-2">{e.current ?? <span className="text-faint">—</span>}</td>
                <td className="max-w-xl px-3 py-2 whitespace-pre-wrap text-paper">
                  <span className="mr-1.5 text-ok">+</span>
                  {e.proposed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {entries.some((e) => e.current === null) ? (
        <p className="text-xs text-faint">
          Corrections carry proposed values only; the archive&apos;s current value is shown when the payload
          includes it (as current/proposed, old/new, or from/to). Otherwise only the proposed change is listed.
        </p>
      ) : null}
      {multiLine.length > 0 ? (
        <div>
          <p className="mb-2 font-display text-[11px] uppercase tracking-wider text-faint">Text diff (proposed vs current)</p>
          {multiLine.map((e) => (
            <UnifiedDiff key={e.field} title={e.field} lines={e.diff ?? []} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FallbackJsonView({ json }: { json: string }) {
  const lines = lineDiff("", json);
  return (
    <pre className="overflow-x-auto rounded border border-line bg-charcoal p-3 font-mono text-xs leading-relaxed">
      {lines.map((l, i) => (
        <div key={i} className="text-ok">
          <span className="inline-block w-4 select-none text-center">+</span>
          {l.line || " "}
        </div>
      ))}
    </pre>
  );
}

function DiffPanel({ c }: { c: ContributionRow }) {
  const payload = parsePayload(c.payload);
  const json = payload !== null ? prettyJson(payload) : null;
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  async function copyJson() {
    if (json === null) return;
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  let view: ReactNode = null;
  if (payload === null) {
    view = (
      <p className="rounded border border-line bg-charcoal px-3 py-5 text-center text-xs text-faint">
        No payload was submitted with this contribution.
      </p>
    );
  } else if (NEW_TYPES.has(c.type) && isPlainObject(payload)) {
    view = <NewFieldsView fields={flattenPayload(payload)} />;
  } else if (c.type === "CORRECTION" && isPlainObject(payload)) {
    view = <CorrectionView payload={payload} />;
  } else if (json !== null) {
    view = <FallbackJsonView json={json} />;
  }

  return (
    <tr className="border-b border-line/60 last:border-0 bg-charcoal-2/60 align-top">
      <td colSpan={9} className="px-4 py-4">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <MetaItem label="Type">{CONTRIBUTION_TYPE_LABELS[c.type] ?? c.type}</MetaItem>
            <MetaItem label="Status">
              <Badge tone={STATUS_TONE[c.status]}>{CONTRIBUTION_STATUS_LABELS[c.status]}</Badge>
            </MetaItem>
            <MetaItem label="Submitted">
              {new Date(c.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
            </MetaItem>
            <MetaItem label="By">{c.user.username}</MetaItem>
            {c.reviewedBy ? <MetaItem label="Reviewed by">{c.reviewedBy.username}</MetaItem> : null}
            <button
              type="button"
              onClick={copyJson}
              disabled={json === null}
              className="ml-auto inline-flex items-center gap-1.5 rounded border border-line-2 bg-charcoal px-2.5 py-1.5 font-display text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-crimson-500/50 hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-ok" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
              {copied ? "Copied" : "Copy payload JSON"}
            </button>
          </div>
          <div>
            <p className="mb-2 font-display text-[11px] uppercase tracking-wider text-faint">
              {NEW_TYPES.has(c.type) ? "Proposed new record" : c.type === "CORRECTION" ? "Proposed changes" : "Payload"}
            </p>
            {view}
          </div>
        </div>
      </td>
    </tr>
  );
}
