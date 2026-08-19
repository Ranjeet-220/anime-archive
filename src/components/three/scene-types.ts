import type { DeviceMode } from "@/lib/device-mode";
import type {
  EraDto,
  GenreDto,
  MuseumPersonDto,
  MuseumStudioDto,
} from "@/lib/types";

export type SceneMode = DeviceMode;

export interface SceneBaseProps {
  mode: SceneMode;
  mobile: boolean;
}

export interface EntranceSceneProps extends SceneBaseProps {
  onReady?: () => void;
}

export interface MuseumSceneProps extends SceneBaseProps {
  eras: EraDto[];
  activeRoom: number;
  onFocusRoom?: (index: number) => void;
}

export interface TimelineSceneProps extends SceneBaseProps {
  eras: EraDto[];
  studioSlugs: Record<string, string>;
  creatorSlugs: Record<string, string>;
  onSelectEra?: (era: EraDto | null) => void;
}

export interface HallOfLegendsSceneProps extends SceneBaseProps {
  people: MuseumPersonDto[];
}

export interface StudioArchiveSceneProps extends SceneBaseProps {
  studios: MuseumStudioDto[];
}

export interface GenreWorldSceneProps extends SceneBaseProps {
  genres: GenreDto[];
}

export const SCENE_FONT = "/fonts/SpaceGrotesk.ttf";

export const COLOR_CRIMSON = "#c8383f";
export const COLOR_CRIMSON_SOFT = "#e88a8f";
export const COLOR_CRIMSON_DEEP = "#7f2026";
export const COLOR_HOLO = "#5ac4d4";
export const COLOR_HOLO_SOFT = "#8fd9e4";
export const COLOR_PAPER = "#f1ece5";
export const COLOR_MUTED = "#a39c94";
export const COLOR_BG = "#07070a";
export const COLOR_BG_2 = "#0d0d12";

export const INTRO_SEEN_KEY = "aa_intro_seen";
export const MUSEUM_VIEW_KEY = "aa_museum_view";
export const TIMELINE_VIEW_KEY = "aa_timeline_view";

export type TwoDimensionalView = "3d" | "2d";
