"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "OVERVIEW" },
  { id: "details", label: "DETAILS" },
  { id: "characters", label: "CHARACTERS" },
  { id: "staff", label: "STAFF" },
  { id: "reception", label: "RECEPTION" },
  { id: "history", label: "HISTORY" },
  { id: "legacy", label: "LEGACY" },
  { id: "videos", label: "VIDEOS" },
];

export function DetailTabs({
  onTabChange,
  activeTab = "overview",
}: {
  onTabChange?: (tab: string) => void;
  activeTab?: string;
}) {
  const [current, setCurrent] = useState(activeTab);

  const handleClick = (id: string) => {
    setCurrent(id);
    if (onTabChange) onTabChange(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="border-b border-[#25282C] bg-[#050607]">
      <div className="mx-auto flex max-w-[1720px] w-full overflow-x-auto no-scrollbar px-4 sm:px-8 lg:px-12">
        <nav className="flex gap-6 sm:gap-8" aria-label="Anime details tabs">
          {TABS.map((tab) => {
            const isActive = current === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleClick(tab.id)}
                className={cn(
                  "relative py-3.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors whitespace-nowrap cursor-pointer",
                  isActive ? "text-paper" : "text-[#666A70] hover:text-[#9A9A9A]"
                )}
              >
                {tab.label}
                {isActive ? (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-crimson-500 shadow-[0_0_8px_#ff3038]" />
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
