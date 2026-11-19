"use client";

import { OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LinkButton } from "@/components/ui/button";
import { truncate } from "@/lib/utils";
import {
  COLOR_BG,
  COLOR_CRIMSON,
  COLOR_HOLO,
  COLOR_MUTED,
  COLOR_PAPER,
  type StudioArchiveSceneProps,
} from "./scene-types";
import { SceneText } from "./scene-bits";
import { SceneCanvas } from "./scene-shell";

/**
 * The Studio Archive: rows of floating slabs, one per studio, each showing
 * name, founding year and work count. Clicking a slab opens the studio.
 */
export function StudioArchiveScene({ mode, mobile, studios }: StudioArchiveSceneProps) {
  const router = useRouter();

  const slots = useMemo(() => {
    const perRow = mobile ? 2 : 4;
    return studios.map((s, i) => ({
      studio: s,
      x: (i % perRow) - (perRow - 1) / 2,
      y: Math.floor(i / perRow),
    }));
  }, [studios, mobile]);

  const rows = Math.max(1, Math.ceil(studios.length / (mobile ? 2 : 4)));

  return (
    <div className="relative h-full min-h-[520px] w-full">
      <SceneCanvas mode={mode} cameraPosition={[0, 2.0 + rows * 1.1, 9.5 + rows * 1.3]}>
        <color attach="background" args={[COLOR_BG]} />
        <fog attach="fog" args={[COLOR_BG, 16, 42]} />

        <ambientLight intensity={mode === "IMMERSIVE" ? 0.55 : 0.4} />
        <pointLight
          position={[0, 6, 5]}
          color={COLOR_CRIMSON}
          intensity={mode === "PERFORMANCE" ? 18 : 36}
          distance={40}
        />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          minDistance={4}
          maxDistance={25}
          maxPolarAngle={1.45}
          minPolarAngle={0.2}
          target={[0, 1.4 + rows * 0.75, 0]}
        />

        <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[40, 30]} />
          <meshStandardMaterial color="#0d0d12" roughness={0.95} />
        </mesh>

        {slots.map(({ studio, x, y }) => (
          <StudioSlab
            key={studio.slug}
            mode={mode}
            mobile={mobile}
            studio={studio}
            position={[x * 3.8, 1.4 + y * 2.8, 0]}
            onOpen={() => router.push(`/studio/${studio.slug}`)}
          />
        ))}

        <SceneText
          position={[0, -0.8, 2.5]}
          fontSize={0.18}
          letterSpacing={0.34}
          color="#56565f"
          anchorX="center"
          anchorY="middle"
        >
          DRAG TO ORBIT · CLICK A SLAB TO EXPLORE
        </SceneText>
      </SceneCanvas>

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <LinkButton href="/studios" variant="outline" size="sm">
          BROWSE ALL STUDIOS
        </LinkButton>
      </div>
    </div>
  );
}

function StudioSlab({
  mode,
  mobile,
  studio,
  position,
  onOpen,
}: {
  mode: StudioArchiveSceneProps["mode"];
  mobile: boolean;
  studio: StudioArchiveSceneProps["studios"][number];
  position: [number, number, number];
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const label = studio.name.toUpperCase();
  const slabWidth = mobile ? 2.8 : 3.0;
  const slabHeight = 1.4;

  return (
    <group position={position}>
      <group
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <mesh scale={hovered ? 1.03 : 1}>
          <boxGeometry args={[slabWidth, slabHeight, 0.15]} />
          <meshStandardMaterial
            color={hovered ? "#26202a" : "#1a1a20"}
            emissive={COLOR_CRIMSON}
            emissiveIntensity={mode === "PERFORMANCE" ? 0.12 : hovered ? 0.5 : 0.25}
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.16, 0.08]}>
          <boxGeometry args={[mobile ? 2.5 : 2.7, 0.02, 0.01]} />
          <meshBasicMaterial color={hovered ? COLOR_HOLO : "#33333d"} />
        </mesh>
        <SceneText
          position={[0, 0.4, 0.09]}
          fontSize={mobile ? 0.17 : 0.16}
          letterSpacing={0.06}
          color={COLOR_PAPER}
          maxWidth={mobile ? 2.5 : 2.7}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
        >
          {truncate(label, mobile ? 22 : 26)}
        </SceneText>
        <SceneText
          position={[0, -0.02, 0.09]}
          fontSize={0.12}
          letterSpacing={0.12}
          color={COLOR_MUTED}
          anchorX="center"
          anchorY="middle"
        >
          {studio.foundedYear ? `EST. ${studio.foundedYear}` : "EST. UNKNOWN"}
        </SceneText>
        <SceneText
          position={[0, -0.22, 0.09]}
          fontSize={0.12}
          letterSpacing={0.14}
          color={hovered ? COLOR_HOLO : "#8a8a98"}
          anchorX="center"
          anchorY="middle"
        >
          {`${studio.animeCount} WORKS`}
        </SceneText>
        <SceneText
          position={[0, -0.46, 0.09]}
          fontSize={0.11}
          letterSpacing={0.22}
          color={hovered ? "#ff858d" : COLOR_CRIMSON}
          anchorX="center"
          anchorY="middle"
        >
          VIEW STUDIO
        </SceneText>
      </group>
    </group>
  );
}
