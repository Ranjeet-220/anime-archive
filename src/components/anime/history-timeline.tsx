"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

export interface HistoryTimelineStep {
  label: string;
  year?: string | null;
  text: string;
}

export function HistoryTimeline({ steps }: { steps: HistoryTimelineStep[] }) {
  return (
    <ol className="relative space-y-7 pl-1">
      <span
        aria-hidden
        className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-crimson-500/60 via-crimson-500/30 to-transparent"
      />
      {steps.map((step, i) => (
        <motion.li
          key={`${step.label}-${i}`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut", delay: (i % 4) * 0.06 }}
          className="relative pl-9"
        >
          <span
            aria-hidden
            className="absolute left-0 top-1.5 h-[19px] w-[19px] rounded-full border-2 border-crimson-500 bg-ink shadow-[0_0_10px_rgba(200,56,63,0.35)]"
          />
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-sm uppercase tracking-[0.15em] text-paper">{step.label}</h3>
            {step.year ? <Badge tone="crimson">{step.year}</Badge> : null}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}
