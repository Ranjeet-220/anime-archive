"use client";

import dynamic from "next/dynamic";
import { SceneGate, SceneUnavailable, SceneLoading } from "./scene-shell";
import type { MuseumPersonDto, MuseumStudioDto, GenreDto } from "@/lib/types";

const HallOfLegendsCanvas = dynamic(
  () => import("./hall-of-legends-scene").then((m) => m.HallOfLegendsScene),
  {
    ssr: false,
    loading: () => <SceneLoading label="Entering the Hall of Legends…" />,
  }
);

const StudioArchiveCanvas = dynamic(
  () => import("./studio-archive-scene").then((m) => m.StudioArchiveScene),
  {
    ssr: false,
    loading: () => <SceneLoading label="Opening the Studio Archive…" />,
  }
);

const GenreWorldCanvas = dynamic(
  () => import("./genre-world-scene").then((m) => m.GenreWorldScene),
  {
    ssr: false,
    loading: () => <SceneLoading label="Mapping the Genre World…" />,
  }
);

/**
 * 3D section for the creator archive: a gallery of pedestals, one per
 * director, each leading to the creator's profile page.
 */
export function HallOfLegendsSection({ people }: { people: MuseumPersonDto[] }) {
  return (
    <SceneGate
      label="Entering the Hall of Legends…"
      fallback={
        <SceneUnavailable
          title="Hall of Legends unavailable"
          description="The interactive gallery needs WebGL or reduced-motion support to be off. The full creator archive is listed below."
          actionLabel="Browse creators"
          actionHref="#creators"
        />
      }
    >
      {({ mode, mobile }) => (
        <HallOfLegendsCanvas mode={mode} mobile={mobile} people={people} />
      )}
    </SceneGate>
  );
}

/**
 * 3D section for the studio archive: pedestals for each studio,
 * leading to studio profile pages.
 */
export function StudioArchiveSection({ studios }: { studios: MuseumStudioDto[] }) {
  return (
    <SceneGate
      label="Opening the Studio Archive…"
      fallback={
        <SceneUnavailable
          title="Studio Archive unavailable"
          description="The interactive 3D archive needs WebGL or reduced-motion support to be off. The full studio list is below."
          actionLabel="Browse studios"
          actionHref="#studios"
        />
      }
    >
      {({ mode, mobile }) => (
        <StudioArchiveCanvas mode={mode} mobile={mobile} studios={studios} />
      )}
    </SceneGate>
  );
}

/**
 * 3D section for the genre index: a constellation of genre markers,
 * leading to genre pages.
 */
export function GenreWorldSection({ genres }: { genres: GenreDto[] }) {
  return (
    <SceneGate
      label="Mapping the Genre World…"
      fallback={
        <SceneUnavailable
          title="Genre World unavailable"
          description="The interactive genre map needs WebGL or reduced-motion support to be off. The full genre index is below."
          actionLabel="Browse genres"
          actionHref="#genres"
        />
      }
    >
      {({ mode, mobile }) => (
        <GenreWorldCanvas mode={mode} mobile={mobile} genres={genres} />
      )}
    </SceneGate>
  );
}