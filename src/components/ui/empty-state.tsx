import { Archive, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  icon: Icon = Archive,
  action,
  className,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line-2 px-6 py-16 text-center",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line-2 bg-charcoal text-faint">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h2 className="font-display text-base text-paper">{title}</h2>
      {description ? <p className="max-w-sm text-sm text-muted">{description}</p> : null}
      {action}
    </div>
  );
}

export function LoadingGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-lg border border-line bg-charcoal">
          <div className="aspect-[3/4] bg-charcoal-2" />
          <div className="space-y-2 p-3">
            <div className="h-3 w-3/4 rounded bg-charcoal-2" />
            <div className="h-2 w-1/2 rounded bg-charcoal-2" />
          </div>
        </div>
      ))}
    </div>
  );
}