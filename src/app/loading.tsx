import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2 className="h-6 w-6 animate-spin text-crimson-400" aria-hidden />
      <p className="font-display text-[11px] uppercase tracking-[0.34em] text-faint">
        Opening the archive…
      </p>
    </div>
  );
}
