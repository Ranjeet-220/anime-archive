"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type RowStatus = "valid" | "duplicate" | "invalid";

interface Analysis {
  total: number;
  valid: number;
  duplicates: number;
  invalid: number;
  rows: { title: string; slug: string; status: RowStatus; reason?: string }[];
}

const EXAMPLE_CSV = `title,slug,year,format
My New Anime,my-new-anime,2026,TV
Another Title,,1999,MOVIE`;

export function AdminImportForm() {
  const router = useRouter();
  const [format, setFormat] = useState<"json" | "csv">("json");
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ created: string[] } | null>(null);

  function parseInput(): Record<string, unknown> | null {
    if (format === "csv") return { format: "csv", text };
    try {
      return { format: "json", data: JSON.parse(text) };
    } catch {
      return null;
    }
  }

  async function analyze() {
    setError(null);
    setResult(null);
    const input = parseInput();
    if (!input) {
      setError(format === "json" ? "Invalid JSON." : "Enter CSV text.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Analysis failed.");
        return;
      }
      setAnalysis(data.analysis);
    } finally {
      setBusy(false);
    }
  }

  async function commit() {
    setError(null);
    if (!window.confirm(`Import ${analysis?.valid ?? 0} anime records? Nothing else will be touched.`)) return;
    setBusy(true);
    try {
      const input = parseInput();
      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, commit: true }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Import failed.");
        return;
      }
      setResult({ created: data.created ?? [] });
      setAnalysis(null);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-line bg-charcoal/60 px-4 py-3 text-xs text-muted">
        Import workflow: Import → Validate → Detect Duplicates → Review → Verify Sources → Publish.
        Nothing is imported until you review and confirm.
      </div>

      <div className="space-y-3">
        <Field label="Format">
          <Select value={format} onChange={(e) => setFormat(e.target.value as "json" | "csv")} className="max-w-52">
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </Select>
        </Field>
        <Field
          label={format === "json" ? "JSON payload" : "CSV text"}
          htmlFor="import-text"
          hint={
            format === "json"
              ? 'Expected shape: { "anime": [ { "title": "...", "slug": "...", "year": 2026, "format": "TV" } ] }'
              : `Expected columns: title, slug, year, format\n${EXAMPLE_CSV}`
          }
        >
          <Textarea
            id="import-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-48 font-mono text-xs"
            spellCheck={false}
          />
        </Field>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <Button onClick={analyze} disabled={busy || !text.trim()}>
          {busy ? "Analyzing…" : "Analyze import"}
        </Button>
      </div>

      {result ? (
        <div className="surface-card border-ok/40 p-4">
          <p className="text-sm text-ok">Imported {result.created.length} anime records.</p>
          {result.created.length > 0 ? (
            <p className="mt-1 text-xs text-muted">{result.created.join(", ")}</p>
          ) : null}
        </div>
      ) : null}

      {analysis ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Badge tone="neutral">Total {analysis.total}</Badge>
            <Badge tone="ok">Valid {analysis.valid}</Badge>
            <Badge tone="warn">Duplicates {analysis.duplicates}</Badge>
            <Badge tone="crimson">Invalid {analysis.invalid}</Badge>
          </div>
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-charcoal-2 text-left text-[11px] uppercase tracking-wider text-faint">
                  <th className="px-3 py-2.5 font-medium">Title</th>
                  <th className="px-3 py-2.5 font-medium">Slug</th>
                  <th className="px-3 py-2.5 font-medium">Status</th>
                  <th className="px-3 py-2.5 font-medium">Reason</th>
                </tr>
              </thead>
              <tbody>
                {analysis.rows.map((r, i) => (
                  <tr key={i} className="border-b border-line/60 last:border-0 bg-charcoal/60">
                    <td className="px-3 py-2 text-paper">{r.title}</td>
                    <td className="px-3 py-2 text-muted tabular-nums">{r.slug}</td>
                    <td className="px-3 py-2">
                      <Badge
                        tone={r.status === "valid" ? "ok" : r.status === "duplicate" ? "warn" : "crimson"}
                      >
                        {r.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 text-xs text-muted">{r.reason ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={commit} disabled={busy || analysis.valid === 0}>
              {busy ? "Importing…" : `Import ${analysis.valid} valid records`}
            </Button>
            <Button variant="ghost" onClick={() => setAnalysis(null)} disabled={busy}>
              Discard analysis
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
