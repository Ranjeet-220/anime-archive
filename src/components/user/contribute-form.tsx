"use client";

import { useState } from "react";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { CONTRIBUTION_TYPE_LABELS } from "@/lib/format";
import { ArrowRight } from "lucide-react";
import type { ContributionType } from "@/generated/prisma/client";

const TYPES: ContributionType[] = ["NEW_ANIME", "NEW_CREATOR", "NEW_STUDIO", "NEW_SOURCE", "CORRECTION", "REPORT", "OTHER"];

const WORKFLOW = ["Submitted", "Under Review", "Verified", "Published"];

const PAYLOAD_HINT = `For NEW_ANIME, a suggested shape:
{
  "title": "My Anime",
  "japaneseTitle": "マイ・アニメ",
  "year": 2026,
  "format": "TV",
  "studioSlug": "studio-name",
  "synopsis": "A short synopsis."
}`;

export function ContributeForm() {
  const [type, setType] = useState<ContributionType>("NEW_ANIME");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ title: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, title, description, payload }),
      });
      const data = await res.json().catch(() => null);
      if (res.status === 401) {
        setError("You must be signed in to contribute.");
        return;
      }
      if (!res.ok) {
        setError(data?.error ?? "Failed to submit. Please try again.");
        return;
      }
      setSubmitted({ title });
      setType("NEW_ANIME");
      setTitle("");
      setDescription("");
      setPayload("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="surface-card border-ok/40 p-6">
          <h3 className="font-display text-lg text-ok">Submitted — “{submitted.title}”</h3>
          <p className="mt-2 text-sm text-muted">
            Your contribution enters the review workflow: Submitted → Under Review → Verified →
            Published. Nothing is published automatically.
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => setSubmitted(null)}>
            Submit another contribution
          </Button>
        </div>
        <WorkflowDiagram />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Contribution type" htmlFor="ct-type">
        <Select id="ct-type" value={type} onChange={(e) => setType(e.target.value as ContributionType)}>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {CONTRIBUTION_TYPE_LABELS[t]}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Title" htmlFor="ct-title">
        <Input id="ct-title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What are you contributing?" />
      </Field>
      <Field label="Description" htmlFor="ct-desc" hint="Explain your contribution — why it matters, what's new, what should change.">
        <Textarea id="ct-desc" value={description} onChange={(e) => setDescription(e.target.value)} />
      </Field>
      <Field label="Structured payload (optional, JSON)" htmlFor="ct-payload" hint={PAYLOAD_HINT}>
        <Textarea
          id="ct-payload"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          className="min-h-40 font-mono text-xs"
          spellCheck={false}
          placeholder='{ "title": "…", "year": 2026 }'
        />
      </Field>
      {error ? (
        <p className="text-sm text-danger">
          {error}
          {error.includes("signed in") ? (
            <a href="/login" className="ml-1 underline underline-offset-2 hover:text-paper">
              Sign in
            </a>
          ) : null}
        </p>
      ) : null}
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting…" : "Submit contribution"}
      </Button>
    </form>
  );
}

export function WorkflowDiagram() {
  return (
    <div className="surface-panel p-5">
      <h3 className="mb-4 font-display text-sm uppercase tracking-[0.2em] text-muted">Review workflow</h3>
      <ol className="flex flex-wrap items-center gap-2">
        {WORKFLOW.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span className="rounded border border-line-2 bg-charcoal px-3 py-1.5 font-display text-xs text-paper">
              <span className="mr-1.5 text-crimson-400">{i + 1}.</span>
              {step}
            </span>
            {i < WORKFLOW.length - 1 ? <ArrowRight className="h-3.5 w-3.5 text-faint" aria-hidden /> : null}
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-faint">
        Every contribution is reviewed by an editor or administrator before it appears in the
        archive. Nothing is published automatically.
      </p>
    </div>
  );
}
