import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "crimson" | "holo" | "neutral" | "ok" | "warn";

const tones: Record<Tone, string> = {
  default: "bg-charcoal-3 text-paper-2 border-line-2",
  crimson: "bg-crimson-500/10 text-crimson-300 border-crimson-500/30",
  holo: "bg-holo-500/10 text-holo-300 border-holo-500/30",
  neutral: "bg-charcoal text-muted border-line",
  ok: "bg-ok/10 text-ok border-ok/30",
  warn: "bg-warn/10 text-warn border-warn/30",
};

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium tracking-wide border",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function BadgeLink({
  href,
  children,
  tone = "default",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium tracking-wide border",
        "transition-colors hover:border-current",
        tones[tone],
        className
      )}
    >
      {children}
    </Link>
  );
}