import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-6",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-2 font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-2xl text-paper text-balance sm:text-3xl">{title}</h2>
      {description ? (
        <p className={cn("mt-2 max-w-2xl text-sm text-muted", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Stat({
  value,
  label,
  className,
}: {
  value: number;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <p className="font-display text-3xl text-paper tabular-nums sm:text-4xl">{value.toLocaleString()}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-faint">{label}</p>
    </div>
  );
}