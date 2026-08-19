"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface EpisodeRow {
  id: string;
  number: number;
  title: string | null;
  airDate: string | null;
  synopsis: string | null;
}

interface Draft {
  number: string;
  title: string;
  airDate: string;
  synopsis: string;
}

const EMPTY: Draft = { number: "", title: "", airDate: "", synopsis: "" };

function toDraft(e: EpisodeRow): Draft {
  return {
    number: String(e.number),
    title: e.title ?? "",
    airDate: e.airDate ? e.airDate.slice(0, 10) : "",
    synopsis: e.synopsis ?? "",
  };
}

function toRow(e: {
  id: string;
  number: number;
  title: string | null;
  airDate: Date | string | null;
  synopsis: string | null;
}): EpisodeRow {
  return {
    id: e.id,
    number: e.number,
    title: e.title,
    airDate: e.airDate ? new Date(e.airDate).toISOString() : null,
    synopsis: e.synopsis,
  };
}

export function AdminEpisodesManager({ animeId }: { animeId: string }) {
  const [rows, setRows] = useState<EpisodeRow[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState<EpisodeRow | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [busy, setBusy] = useState(false);

  async function load() {
    if (loaded) return;
    setLoaded(true);
    const res = await fetch(`/api/anime/${animeId}/episodes`).catch(() => null);
    if (res?.ok) {
      const data = await res.json().catch(() => null);
      if (data?.episodes) setRows(data.episodes.map(toRow));
    }
  }

  function startNew() {
    const next = rows.length ? Math.max(...rows.map((r) => r.number)) + 1 : 1;
    setDraft({ ...EMPTY, number: String(next) });
    setEditing("new");
  }

  function startEdit(row: EpisodeRow) {
    setDraft(toDraft(row));
    setEditing(row);
  }

  async function save() {
    if (editing === null) return;
    const number = Number(draft.number);
    if (!Number.isInteger(number) || number < 1) return;
    setBusy(true);
    const payload = {
      ...(editing === "new" ? { animeId } : { episodeId: editing.id }),
      number,
      title: draft.title.trim(),
      airDate: draft.airDate || null,
      synopsis: draft.synopsis.trim(),
    };
    const method = editing === "new" ? "POST" : "PATCH";
    const res = await fetch("/api/admin/episodes", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);
    setBusy(false);
    if (!res.ok) {
      alert(data?.error ?? "Failed to save episode.");
      return;
    }
    const saved = toRow(data.episode);
    setRows((prev) => {
      if (editing === "new") return [...prev, saved].sort((a, b) => a.number - b.number);
      return prev.map((r) => (r.id === saved.id ? saved : r)).sort((a, b) => a.number - b.number);
    });
    setEditing(null);
    setDraft(EMPTY);
  }

  async function remove(row: EpisodeRow) {
    if (!window.confirm(`Delete episode ${row.number}?`)) return;
    const res = await fetch("/api/admin/episodes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ episodeId: row.id }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      alert(data?.error ?? "Failed to delete episode.");
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg text-paper">Episodes</h2>
        <Button type="button" variant="outline" size="sm" onClick={loaded ? startNew : load}>
          <Plus className="mr-1.5 h-3.5 w-3.5" aria-hidden />
          {loaded ? "Add episode" : "Load episodes"}
        </Button>
      </div>

      {!loaded ? (
        <p className="rounded border border-dashed border-line-2 bg-charcoal/60 px-4 py-8 text-center text-xs text-faint">
          Click “Load episodes” to manage this anime&apos;s episode list.
        </p>
      ) : rows.length === 0 && editing !== "new" ? (
        <p className="rounded border border-dashed border-line-2 bg-charcoal/60 px-4 py-8 text-center text-sm text-muted">
          No episodes recorded yet.
        </p>
      ) : (
        <ul className="divide-y divide-line/60 rounded border border-line">
          {rows.map((row) =>
            editing === row ? (
              <EpisodeEditor
                key={row.id}
                draft={draft}
                busy={busy}
                onChange={setDraft}
                onSave={save}
                onCancel={() => {
                  setEditing(null);
                  setDraft(EMPTY);
                }}
              />
            ) : (
              <li key={row.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <span className="w-10 shrink-0 font-display text-sm text-crimson-300">
                  EP{String(row.number).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-paper">{row.title ?? "Untitled episode"}</p>
                  <p className="text-xs text-faint">
                    {row.airDate ? new Date(row.airDate).toLocaleDateString() : "Air date unknown"}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => startEdit(row)}
                    aria-label={`Edit episode ${row.number}`}
                    className="rounded p-1.5 text-faint hover:bg-charcoal hover:text-paper"
                  >
                    <Pencil className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(row)}
                    aria-label={`Delete episode ${row.number}`}
                    className="rounded p-1.5 text-faint hover:bg-charcoal hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </li>
            )
          )}
          {editing === "new" ? (
            <EpisodeEditor
              draft={draft}
              busy={busy}
              onChange={setDraft}
              onSave={save}
              onCancel={() => {
                setEditing(null);
                setDraft(EMPTY);
              }}
            />
          ) : null}
        </ul>
      )}
    </div>
  );
}

function EpisodeEditor({
  draft,
  busy,
  onChange,
  onSave,
  onCancel,
}: {
  draft: Draft;
  busy: boolean;
  onChange: (d: Draft) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <li className={cn("space-y-3 bg-charcoal/50 px-4 py-4")}>
      <div className="grid grid-cols-[90px_1fr] gap-3">
        <label className="flex flex-col gap-1 text-xs text-faint">
          Number
          <Input
            type="number"
            min={1}
            value={draft.number}
            onChange={(e) => onChange({ ...draft, number: e.target.value })}
            aria-label="Episode number"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs text-faint">
          Title
          <Input
            value={draft.title}
            onChange={(e) => onChange({ ...draft, title: e.target.value })}
            placeholder="Episode title"
            aria-label="Episode title"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-xs text-faint">
        Air date
        <Input
          type="date"
          value={draft.airDate}
          onChange={(e) => onChange({ ...draft, airDate: e.target.value })}
          aria-label="Air date"
        />
      </label>
      <label className="flex flex-col gap-1 text-xs text-faint">
        Synopsis
        <Textarea
          rows={3}
          value={draft.synopsis}
          onChange={(e) => onChange({ ...draft, synopsis: e.target.value })}
          placeholder="Short summary (optional)"
          aria-label="Synopsis"
        />
      </label>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          <X className="mr-1.5 h-3.5 w-3.5" aria-hidden />
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={onSave}
          disabled={busy || !Number.isInteger(Number(draft.number)) || Number(draft.number) < 1}
        >
          <Check className="mr-1.5 h-3.5 w-3.5" aria-hidden />
          {busy ? "Saving…" : "Save"}
        </Button>
      </div>
    </li>
  );
}