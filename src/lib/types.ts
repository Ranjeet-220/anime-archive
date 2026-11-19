// Compact DTOs shared between the 3D scenes and the 2D interface.

export interface MuseumAnimeDto {
  slug: string;
  title: string;
  japaneseTitle?: string | null;
  year: number | null;
  format: string;
  studio?: string | null;
  director?: string | null;
  synopsis?: string | null;
}

export interface EraDto {
  id: string;
  slug: string;
  name: string;
  period: string;
  startYear: number;
  endYear?: number | null;
  order: number;
  description?: string | null;
  animeCount: number;
  anime?: MuseumAnimeDto[];
}

export interface MuseumStudioDto {
  slug: string;
  name: string;
  japaneseName?: string | null;
  foundedYear?: number | null;
  history?: string | null;
  status?: string | null;
  animeCount: number;
  majorWorks: { slug: string; title: string; year: number | null }[];
}

export interface MuseumPersonDto {
  slug: string;
  name: string;
  japaneseName?: string | null;
  role?: string | null;
  bornYear?: number | null;
  diedYear?: number | null;
  biography?: string | null;
  majorWorks?: string | null;
  works: { slug: string; title: string; year: number | null }[];
}

export interface MuseumTimelineDto {
  eras: EraDto[];
}

export interface SearchResultDto {
  type: "anime" | "character" | "studio" | "creator" | "event";
  slug: string;
  title: string;
  subtitle?: string | null;
  year?: number | null;
  format?: string | null;
}

export interface ArchiveStatsDto {
  anime: number;
  studios: number;
  creators: number;
  movies: number;
  events: number;
  genres: number;
  characters: number;
}

export interface HistoryTimelineStep {
  label: string;
  year?: string | null;
  text: string;
}

export interface GenreDto {
  slug: string;
  name: string;
  japaneseName?: string | null;
  description?: string | null;
  animeCount: number;
}