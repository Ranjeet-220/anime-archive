import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "holo";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-medium tracking-wide " +
  "transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-crimson-500 text-paper hover:bg-crimson-400 active:bg-crimson-600 shadow-[0_0_24px_rgba(200,56,63,0.25)]",
  outline:
    "border border-line-2 text-paper hover:border-crimson-500 hover:text-crimson-300 bg-transparent",
  ghost: "text-muted hover:text-paper hover:bg-charcoal-2",
  holo:
    "border border-holo-500/40 text-holo-300 hover:bg-holo-500/10 hover:border-holo-400",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs rounded",
  md: "h-10 px-5 text-sm rounded",
  lg: "h-12 px-7 text-base rounded",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}