import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded border border-line bg-charcoal px-3 py-2 text-sm text-paper placeholder:text-faint " +
  "focus:border-holo-500/60 focus:outline-none focus:ring-1 focus:ring-holo-500/40 transition-colors";

export function Field({
  label,
  hint,
  error,
  htmlFor,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="block text-xs font-medium tracking-wide text-muted">
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs text-faint">{hint}</p> : null}
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldBase, "min-h-28", className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldBase, "appearance-none bg-charcoal", className)} {...props}>
      {children}
    </select>
  );
}

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("block text-xs font-medium tracking-wide text-muted", className)}
      {...props}
    />
  );
}