"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";

export interface PersonFormData {
  id?: string;
  slug?: string;
  name?: string;
  japaneseName?: string | null;
  role?: string | null;
  bornYear?: number | null;
  diedYear?: number | null;
  birthplace?: string | null;
  biography?: string | null;
  career?: string | null;
  majorWorks?: string | null;
  awards?: string | null;
  contribution?: string | null;
  website?: string | null;
}

export function AdminPersonForm({ mode, initial }: { mode: "create" | "edit"; initial?: PersonFormData | null }) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [japaneseName, setJapaneseName] = useState(initial?.japaneseName ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [bornYear, setBornYear] = useState(initial?.bornYear ? String(initial.bornYear) : "");
  const [diedYear, setDiedYear] = useState(initial?.diedYear ? String(initial.diedYear) : "");
  const [birthplace, setBirthplace] = useState(initial?.birthplace ?? "");
  const [biography, setBiography] = useState(initial?.biography ?? "");
  const [career, setCareer] = useState(initial?.career ?? "");
  const [majorWorks, setMajorWorks] = useState(initial?.majorWorks ?? "");
  const [awards, setAwards] = useState(initial?.awards ?? "");
  const [contribution, setContribution] = useState(initial?.contribution ?? "");
  const [website, setWebsite] = useState(initial?.website ?? "");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const body = {
      name,
      slug,
      japaneseName,
      role,
      bornYear: bornYear ? Number(bornYear) : null,
      diedYear: diedYear ? Number(diedYear) : null,
      birthplace,
      biography,
      career,
      majorWorks,
      awards,
      contribution,
      website,
    };
    try {
      const url = mode === "create" ? "/api/admin/people" : `/api/admin/people/${initial?.id}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Failed to save person.");
        return;
      }
      router.push("/admin/creators");
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
        <Field label="Name" htmlFor="pe-name">
          <Input
            id="pe-name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slug) setSlug(slugify(e.target.value));
            }}
          />
        </Field>
        <Field label="Slug" htmlFor="pe-slug">
          <Input id="pe-slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </Field>
        <Field label="Japanese name" htmlFor="pe-jp">
          <Input id="pe-jp" value={japaneseName} onChange={(e) => setJapaneseName(e.target.value)} />
        </Field>
        <Field label="Role" htmlFor="pe-role" hint="e.g. Director, Animator, Composer">
          <Input id="pe-role" value={role} onChange={(e) => setRole(e.target.value)} />
        </Field>
        <Field label="Born year" htmlFor="pe-born">
          <Input id="pe-born" type="number" min={1800} max={2100} value={bornYear} onChange={(e) => setBornYear(e.target.value)} />
        </Field>
        <Field label="Died year" htmlFor="pe-died">
          <Input id="pe-died" type="number" min={1800} max={2100} value={diedYear} onChange={(e) => setDiedYear(e.target.value)} />
        </Field>
        <Field label="Birthplace" htmlFor="pe-place">
          <Input id="pe-place" value={birthplace} onChange={(e) => setBirthplace(e.target.value)} />
        </Field>
        <Field label="Website" htmlFor="pe-web">
          <Input id="pe-web" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </Field>
      </div>
      <Field label="Biography" htmlFor="pe-bio">
        <Textarea id="pe-bio" value={biography} onChange={(e) => setBiography(e.target.value)} className="min-h-24" />
      </Field>
      <Field label="Career" htmlFor="pe-career">
        <Textarea id="pe-career" value={career} onChange={(e) => setCareer(e.target.value)} className="min-h-24" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Major works" htmlFor="pe-works">
          <Textarea id="pe-works" value={majorWorks} onChange={(e) => setMajorWorks(e.target.value)} className="min-h-20" />
        </Field>
        <Field label="Awards" htmlFor="pe-awards">
          <Textarea id="pe-awards" value={awards} onChange={(e) => setAwards(e.target.value)} className="min-h-20" />
        </Field>
        <Field label="Contribution" htmlFor="pe-contribution" className="sm:col-span-2">
          <Textarea id="pe-contribution" value={contribution} onChange={(e) => setContribution(e.target.value)} className="min-h-20" />
        </Field>
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <div className="flex gap-2">
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : mode === "create" ? "Create person" : "Save changes"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/creators")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
