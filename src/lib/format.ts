import type { AnimeFormat, AnimeStatus, Role, WatchStatus } from "@/generated/prisma/client";

export const FORMAT_LABELS: Record<AnimeFormat, string> = {
  TV: "TV Series",
  MOVIE: "Film",
  OVA: "OVA",
  ONA: "ONA",
  SPECIAL: "Special",
  WEB: "Web Series",
};

export const STATUS_LABELS: Record<AnimeStatus, string> = {
  FINISHED: "Finished",
  AIRING: "Airing",
  UPCOMING: "Upcoming",
  UNKNOWN: "Unknown",
};

export const WATCH_LABELS: Record<WatchStatus, string> = {
  PLANNED: "Planned",
  WATCHING: "Watching",
  COMPLETED: "Completed",
  ON_HOLD: "On Hold",
  DROPPED: "Dropped",
};

export const ROLE_LABELS: Record<Role, string> = {
  USER: "User",
  CONTRIBUTOR: "Contributor",
  EDITOR: "Editor",
  ADMIN: "Administrator",
};

export const CONTRIBUTION_TYPE_LABELS: Record<string, string> = {
  NEW_ANIME: "New anime",
  NEW_CREATOR: "New creator",
  NEW_STUDIO: "New studio",
  NEW_SOURCE: "New source",
  CORRECTION: "Correction",
  REPORT: "Report",
  OTHER: "Other",
};

export const CONTRIBUTION_STATUS_LABELS: Record<string, string> = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  VERIFIED: "Verified",
  PUBLISHED: "Published",
  REJECTED: "Rejected",
};

export const EVENT_KIND_LABELS: Record<string, string> = {
  PREMIERE: "Premiere",
  RELEASE: "Release",
  FOUNDING: "Founding",
  MILESTONE: "Milestone",
  INDUSTRY: "Industry",
  BIRTH: "Birth",
  DEATH: "Death",
  AWARD: "Award",
};

export function formatLabel(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ratingColor(score: number): string {
  if (score >= 8) return "text-ok";
  if (score >= 6) return "text-paper-2";
  if (score >= 4) return "text-warn";
  return "text-faint";
}

export function scoreToStars(score: number): string {
  const rounded = Math.round(score / 2);
  return "★".repeat(Math.min(5, Math.max(0, rounded)));
}