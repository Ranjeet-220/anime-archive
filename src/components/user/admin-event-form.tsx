"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { EVENT_KIND_LABELS } from "@/lib/format";
import { slugify } from "@/lib/utils";

export interface EventOption {
  id: string;
  name?: string;
  title?: string;
}

export interface EventFormData {
  id?: string;
  slug?: string;
  title?: string;
  year?: number | null;
  month?: number | null;
  day?: number | null;
  description?: string | null;
  kind?: string;
  eraId?: string | null;
  animeId?: string | null;
  studioId?: string | null;
  personId?: string | null;
}

export function AdminEventForm({
  mode,
  initial,
  eras,
  anime,
  studios,
  people,
}: {
  mode: "create" | "edit";
  initial?: EventFormData | null;
  eras: EventOption[];
  anime: EventOption[];
  studios: EventOption[];
  people: EventOption[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [year, setYear] = useState(initial?.year ? String(initial.year) : "");
  const [month, setMonth] = useState(initial?.month ? String(initial.month) : "");
  const [day, setDay] = useState(initial?.day ? String(initial.day) : "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [kind, setKind] = useState(initial?.kind ?? "MILESTONE");
  const [eraId, setEraId] = useState(initial?.eraId ?? "");
  const [animeId, setAnimeId] = useState(initial?.animeId ?? "");
  const [studioId, setStudioId] = useState(initial?.studioId ?? "");
  const [personId, setPersonId] = useState(initial?.personId ?? "");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const num = (v: string) => (/^-?\d+$/.test(v) ? Number(v) : null);
    const body = {
      title,
      slug,
      year: num(year),
      month: num(month),
      day: num(day),
      description,
      kind,
      eraId: eraId || null,
      animeId: animeId || null,
      studioId: studioId || null,
      personId: personId || null,
    };
    try {
      const url = mode === "create" ? "/api/admin/events" : `/api/admin/events/${initial?.id}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Failed to save event.");
        return;
      }
      router.push("/admin/events");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" htmlFor="ev-title">
          <Input
            id="ev-title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slug) setSlug(slugify(e.target.value));
            }}
          />
        </Field>
        <Field label="Slug" htmlFor="ev-slug">
          <Input id="ev-slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </Field>
        <Field label="Year" htmlFor="ev-year">
          <Input id="ev-year" type="number" min={1800} max={2200} value={year} onChange={(e) => setYear(e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Month" htmlFor="ev-month">
            <Input id="ev-month" type="number" min={1} max={12} value={month} onChange={(e) => setMonth(e.target.value)} />
          </Field>
          <Field label="Day" htmlFor="ev-day">
            <Input id="ev-day" type="number" min={1} max={31} value={day} onChange={(e) => setDay(e.target.value)} />
          </Field>
        </div>
        <Field label="Kind" htmlFor="ev-kind">
          <Select id="ev-kind" value={kind} onChange={(e) => setKind(e.target.value)}>
            {Object.entries(EVENT_KIND_LABELS).map(([v, label]) => (
              <option key={v} value={v}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Era" htmlFor="ev-era">
          <Select id="ev-era" value={eraId} onChange={(e) => setEraId(e.target.value)}>
            <option value="">—</option>
            {eras.map((er) => (
              <option key={er.id} value={er.id}>
                {er.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Anime" htmlFor="ev-anime">
          <Select id="ev-anime" value={animeId} onChange={(e) => setAnimeId(e.target.value)}>
            <option value="">—</option>
            {anime.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Studio" htmlFor="ev-studio">
          <Select id="ev-studio" value={studioId} onChange={(e) => setStudioId(e.target.value)}>
            <option value="">—</option>
            {studios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Person" htmlFor="ev-person">
          <Select id="ev-person" value={personId} onChange={(e) => setPersonId(e.target.value)}>
            <option value="">—</option>
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Description" htmlFor="ev-desc">
        <Textarea id="ev-desc" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-24" />
      </Field>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <div className="flex gap-2">
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : mode === "create" ? "Create event" : "Save changes"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/events")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}