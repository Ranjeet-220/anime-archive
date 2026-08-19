"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Box, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimelineExperience } from "@/components/three/timeline-experience";
import type { EraDto } from "@/lib/types";

type ViewTab = "timeline" | "world";

export interface HistoryComparisonProps {
  eras: EraDto[];
  studioSlugs: Record<string, string>;
  creatorSlugs: Record<string, string>;
  comparison: ReactNode;
}

const TABS: { id: ViewTab; label: string; icon: typeof Box }[] = [
  { id: "timeline", label: "3D Timeline", icon: Box },
  { id: "world", label: "World + Anime", icon: Globe },
];

export function HistoryComparison({
  eras,
  studioSlugs,
  creatorSlugs,
  comparison,
}: HistoryComparisonProps) {
  const [tab, setTab] = useState<ViewTab>("timeline");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Timeline comparison view"
        className="mb-8 flex items-center justify-center gap-1 rounded-lg border border-line bg-charcoal p-1"
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cn(
              "inline-flex items-center gap-2 rounded px-4 py-2 font-display text-[11px] uppercase tracking-[0.22em] transition-colors",
              tab === id
                ? "bg-crimson-500 text-paper"
                : "text-muted hover:text-paper"
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {tab === "timeline" ? (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <TimelineExperience
              eras={eras}
              studioSlugs={studioSlugs}
              creatorSlugs={creatorSlugs}
            />
          </motion.div>
        ) : (
          <motion.div
            key="world"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {comparison}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}