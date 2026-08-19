"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { FORMAT_LABELS, STATUS_LABELS } from "@/lib/format";
import { slugify } from "@/lib/utils";

export interface AnimeFormOption {
  id: string;
  slug?: string;
  name: string;
  title?: string;
}

export interface AnimeFormData {
  slug?: string;
  title?: string;
  japaneseTitle?: string | null;
  alternativeTitles?: string[];
  synopsis?: string | null;
  year?: number | null;
  format?: string;
  episodeCount?: number | null;
  duration?: number | null;
  status?: string;
  sourceMaterial?: string | null;
  officialWebsite?: string | null;
  releaseDate?: string | null;
  studioId?: string | null;
  directorId?: string | null;
  creatorId?: string | null;
  eraId?: string | null;
  genreIds?: string[];
}

export function AdminAnimeForm({
  mode,
  initial,
  studios,
  people,
  eras,
  genres,
}: {
  mode: "create" | "edit";
  initial?: AnimeFormData | null;
  studios: AnimeFormOption[];
  people: AnimeFormOption[];
  eras: AnimeFormOption[];
  genres: AnimeFormOption[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [japaneseTitle, setJapaneseTitle] = useState(initial?.japaneseTitle ?? "");
  const [altTitles, setAltTitles] = useState(initial?.alternativeTitles?.join(", ") ?? "");
  const [synopsis, setSynopsis] = useState(initial?.synopsis ?? "");
  const [year, setYear] = useState(initial?.year ? String(initial.year) : "");
  const [format, setFormat] = useState(initial?.format ?? "TV");
  const [episodeCount, setEpisodeCount] = useState(initial?.episodeCount ? String(initial.episodeCount) : "");
  const [duration, setDuration] = useState(initial?.duration ? String(initial.duration) : "");
  const [status, setStatus] = useState(initial?.status ?? "UNKNOWN");
  const [sourceMaterial, setSourceMaterial] = useState(initial?.sourceMaterial ?? "");
  const [studioId, setStudioId] = useState(initial?.studioId ?? "");
  const [directorId, setDirectorId] = useState(initial?.directorId ?? "");
  const [creatorId, setCreatorId] = useState(initial?.creatorId ?? "");
  const [eraId, setEraId] = useState(initial?.eraId ?? "");
  const [genreIds, setGenreIds] = useState<Set<string>>(new Set(initial?.genreIds ?? []));
  const [officialWebsite, setOfficialWebsite] = useState(initial?.officialWebsite ?? "");
  const [releaseDate, setReleaseDate] = useState(initial?.releaseDate ? initial.releaseDate.slice(0, 10) : "");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const toggleGenre = (id: string) => {
    setGenreIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const body = {
      title,
      slug,
      japaneseTitle,
      altTitles,
      synopsis,
      year: year ? Number(year) : null,
      format,
      episodeCount: episodeCount ? Number(episodeCount) : null,
      duration: duration ? Number(duration) : null,
      status,
      sourceMaterial,
      officialWebsite,
      releaseDate: releaseDate || null,
      studioId: studioId || null,
      directorId: directorId || null,
      creatorId: creatorId || null,
      eraId: eraId || null,
      genreIds: [...genreIds],
    };
    try {
      const url = mode === "create" ? "/api/admin/anime" : `/api/admin/anime/${initial?.slug ?? slug}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Failed to save anime.");
        return;
      }
      router.push("/admin/anime");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" htmlFor="aa-title">
          <Input
            id="aa-title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slug) setSlug(slugify(e.target.value));
            }}
          />
        </Field>
        <Field label="Slug" htmlFor="aa-slug" hint="Auto-generated from the title if left empty.">
          <Input id="aa-slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </Field>
        <Field label="Japanese title" htmlFor="aa-jp">
          <Input id="aa-jp" value={japaneseTitle} onChange={(e) => setJapaneseTitle(e.target.value)} />
        </Field>
        <Field label="Alternative titles" htmlFor="aa-alt" hint="Comma-separated.">
          <Input id="aa-alt" value={altTitles} onChange={(e) => setAltTitles(e.target.value)} />
        </Field>
        <Field label="Year" htmlFor="aa-year">
          <Input id="aa-year" type="number" min={1900} max={2100} value={year} onChange={(e) => setYear(e.target.value)} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Format" htmlFor="aa-format">
            <Select id="aa-format" value={format} onChange={(e) => setFormat(e.target.value)}>
              {Object.entries(FORMAT_LABELS).map(([v, label]) => (
                <option key={v} value={v}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Status" htmlFor="aa-status">
            <Select id="aa-status" value={status} onChange={(e) => setStatus(e.target.value)}>
              {Object.entries(STATUS_LABELS).map(([v, label]) => (
                <option key={v} value={v}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Episode count" htmlFor="aa-episodes">
          <Input id="aa-episodes" type="number" min={0} value={episodeCount} onChange={(e) => setEpisodeCount(e.target.value)} />
        </Field>
        <Field label="Duration (minutes)" htmlFor="aa-duration">
          <Input id="aa-duration" type="number" min={0} value={duration} onChange={(e) => setDuration(e.target.value)} />
        </Field>
        <Field label="Release date" htmlFor="aa-release">
          <Input id="aa-release" type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
        </Field>
        <Field label="Source material" htmlFor="aa-source">
          <Input id="aa-source" value={sourceMaterial} onChange={(e) => setSourceMaterial(e.target.value)} />
        </Field>
        <Field label="Official website" htmlFor="aa-web">
          <Input id="aa-web" type="url" value={officialWebsite} onChange={(e) => setOfficialWebsite(e.target.value)} />
        </Field>
        <Field label="Studio" htmlFor="aa-studio">
          <Select id="aa-studio" value={studioId} onChange={(e) => setStudioId(e.target.value)}>
            <option value="">—</option>
            {studios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Director" htmlFor="aa-director">
          <Select id="aa-director" value={directorId} onChange={(e) => setDirectorId(e.target.value)}>
            <option value="">—</option>
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Creator" htmlFor="aa-creator">
          <Select id="aa-creator" value={creatorId} onChange={(e) => setCreatorId(e.target.value)}>
            <option value="">—</option>
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Era" htmlFor="aa-era">
          <Select id="aa-era" value={eraId} onChange={(e) => setEraId(e.target.value)}>
            <option value="">—</option>
            {eras.map((er) => (
              <option key={er.id} value={er.id}>
                {er.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Genres">
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => {
            const checked = genreIds.has(g.id);
            return (
              <label
                key={g.id}
                className={`cursor-pointer rounded border px-2.5 py-1 text-xs transition-colors ${
                  checked
                    ? "border-crimson-500/60 bg-crimson-500/10 text-crimson-300"
                    : "border-line-2 text-muted hover:border-line-2 hover:text-paper"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleGenre(g.id)}
                />
                {g.name}
              </label>
            );
          })}
        </div>
      </Field>

      <Field label="Synopsis" htmlFor="aa-synopsis">
        <Textarea id="aa-synopsis" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} className="min-h-32" />
      </Field>

      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <div className="flex gap-2">
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : mode === "create" ? "Create anime" : "Save changes"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/anime")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
