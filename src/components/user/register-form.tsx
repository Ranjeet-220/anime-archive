"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

const USERNAME_RE = /^[a-zA-Z0-9_-]{3,20}$/;

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    if (!USERNAME_RE.test(username)) {
      next.username = "Username must be 3–20 characters (letters, numbers, _ or -).";
    }
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      next.password = "Password must be at least 8 characters and contain a letter and a number.";
    }
    if (confirm !== password) next.confirm = "Passwords do not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setErrors({ form: data?.error ?? "Registration failed. Please try again." });
        return;
      }
      router.push("/profile");
      router.refresh();
    } catch {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field label="Email" htmlFor="reg-email" error={errors.email}>
        <Input
          id="reg-email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Field label="Username" htmlFor="reg-username" error={errors.username}>
        <Input
          id="reg-username"
          autoComplete="username"
          required
          placeholder="3–20 letters, numbers, _ or -"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Field>
      <Field label="Password" htmlFor="reg-password" error={errors.password} hint="At least 8 characters, one letter and one number.">
        <Input
          id="reg-password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>
      <Field label="Confirm password" htmlFor="reg-confirm" error={errors.confirm}>
        <Input
          id="reg-confirm"
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </Field>
      {errors.form ? <p className="text-sm text-danger">{errors.form}</p> : null}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
