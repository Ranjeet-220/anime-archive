import type { EventKind } from "@/generated/prisma/client";

export interface AnimeHistoryStory {
  id: string;
  date: string;
  title: string;
  kind: EventKind;
  description: string | null;
  href?: string;
  source?: { name: string; href: string };
  eraId?: string | null;
}

const archiveCalendar = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

export function getArchiveHistoryDate(now: Date) {
  const parts = archiveCalendar.formatToParts(now);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);
  return new Date(Date.UTC(year, month - 1, day));
}

export const SOURCED_ANIME_HISTORY: readonly AnimeHistoryStory[] = [
  {
    id: "astro-boy-premiere",
    date: "1963-01-01",
    title: "Astro Boy debuts on Japanese television",
    kind: "PREMIERE",
    description: "Mushi Production’s adaptation of Osamu Tezuka’s manga began airing on Fuji TV. Its weekly half-hour format helped establish the model for Japanese TV anime.",
    href: "/anime/astro-boy",
    source: { name: "Tezuka Productions", href: "https://tezukaosamu.net/en/anime/30.html" },
  },
  {
    id: "spirited-away-oscar",
    date: "2003-03-23",
    title: "Spirited Away wins Best Animated Feature",
    kind: "AWARD",
    description: "Hayao Miyazaki’s film won the Animated Feature Film award at the 75th Academy Awards. It was the award’s second year.",
    href: "/anime/spirited-away",
    source: { name: "Academy Awards", href: "https://www.oscars.org/oscars/ceremonies/2003" },
  },
  {
    id: "shiny-colors-chapter-two-screening",
    date: "2023-11-24",
    title: "THE iDOLM@STER SHINY COLORS Chapter 2 opens in Japanese cinemas",
    kind: "RELEASE",
    description: "The second of three theatrical chapters brought episodes of the anime to Japanese cinemas ahead of its 2024 TV broadcast.",
    source: { name: "Bandai Namco", href: "https://idolmaster-official.jp/news/01_8681" },
  },
];
