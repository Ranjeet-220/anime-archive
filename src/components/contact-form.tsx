"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";

const SUBJECTS = ["General", "Correction", "Press", "Partnership", "Other"] as const;

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<(typeof SUBJECTS)[number]>("General");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function clearError() {
    if (error) setError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("General");
      setMessage("");
    } catch {
      setStatus("error");
      setError("Could not reach the server. Please try again later.");
    }
  }

  if (status === "success") {
    return (
      <div className="surface-panel border-t border-ok/50 p-6">
        <p className="font-display text-base text-paper">Message received.</p>
        <p className="mt-2 text-sm text-paper-2">
          We’ll respond to <span className="text-paper">{email}</span> as soon
          as possible. In the meantime, you might find answers in the{" "}
          <a href="/methodology" className="text-holo-400 hover:underline">
            methodology
          </a>{" "}
          or the{" "}
          <a href="/sources" className="text-holo-400 hover:underline">
            sources
          </a>{" "}
          pages.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs text-faint hover:text-paper transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="surface-card space-y-4 p-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name">
          <Input
            id="contact-name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError();
            }}
            placeholder="Your name"
            autoComplete="name"
            minLength={2}
            maxLength={100}
            required
          />
        </Field>
        <Field label="Email" htmlFor="contact-email">
          <Input
            id="contact-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError();
            }}
            placeholder="you@example.com"
            autoComplete="email"
            maxLength={200}
            required
          />
        </Field>
      </div>
      <Field label="Subject" htmlFor="contact-subject">
        <Select
          id="contact-subject"
          name="subject"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value as (typeof SUBJECTS)[number]);
            clearError();
          }}
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </Field>
      <Field
        label="Message"
        htmlFor="contact-message"
        hint="Please include any URLs relevant to your message."
      >
        <Textarea
          id="contact-message"
          name="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearError();
          }}
          placeholder="Your message…"
          minLength={10}
          maxLength={5000}
          required
        />
      </Field>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-faint">
          This is a demo submission handler — messages are logged for review.
        </p>
        <Button type="submit" disabled={status === "sending"}>
          <Send className="h-4 w-4" aria-hidden />
          {status === "sending" ? "Sending…" : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
