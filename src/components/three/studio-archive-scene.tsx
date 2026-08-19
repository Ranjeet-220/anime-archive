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
    const perRow = mobile ? 3 : 5;
    return studios.map((s, i) => ({
      studio: s,
      x: (i % perRow) - (perRow - 1) / 2,
      y: Math.floor(i / perRow),
    }));
  }, [studios, mobile]);

  const rows = Math.max(1, Math.ceil(studios.length / (mobile ? 3 : 5)));

  return (
    <div className="relative h-full min-h-[520px] w-full">
      <SceneCanvas mode={mode} cameraPosition={[0, 2.4 + rows * 1.1, 11.5 + rows * 0.8]}>
        <color attach="background" args={[COLOR_BG]} />
        <fog attach="fog" args={[COLOR_BG, 14, 38]} />

        <ambientLight intensity={mode === "IMMERSIVE" ? 0.5 : 0.35} />
        <pointLight
          position={[0, 5, 4]}
          color={COLOR_CRIMSON}
          intensity={mode === "PERFORMANCE" ? 16 : 32}
          distance={34}
        />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          minDistance={3}
          maxDistance={18}
          maxPolarAngle={1.45}
          minPolarAngle={0.2}
          target={[0, 1.6 + rows * 0.6, 0]}
        />

        <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[30, 22]} />
          <meshStandardMaterial color="#0d0d12" roughness={0.95} />
        </mesh>

        {slots.map(({ studio, x, y }) => (
          <StudioSlab
            key={studio.slug}
            mode={mode}
            mobile={mobile}
            studio={studio}
            position={[x * 3.4, 1.2 + y * 2.4, 0]}
            onOpen={() => router.push(`/studio/${studio.slug}`)}
          />
        ))}

        <SceneText
          position={[0, -0.8, 2]}
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
          <boxGeometry args={[mobile ? 2.9 : 2.6, 1.05, 0.14]} />
          <meshStandardMaterial
            color={hovered ? "#26202a" : "#1a1a20"}
            emissive={COLOR_CRIMSON}
            emissiveIntensity={mode === "PERFORMANCE" ? 0.12 : hovered ? 0.5 : 0.25}
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0.09]}>
          <boxGeometry args={[mobile ? 2.95 : 2.65, 0.06, 0.02]} />
          <meshBasicMaterial color={hovered ? COLOR_HOLO : "#33333d"} />
        </mesh>
        <SceneText
          position={[0, 0.26, 0.12]}
          fontSize={mobile ? 0.2 : 0.18}
          letterSpacing={0.08}
          color={COLOR_PAPER}
          maxWidth={2.5}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
        >
          {truncate(label, mobile ? 24 : 28)}
        </SceneText>
        <SceneText
          position={[0, -0.02, 0.12]}
          fontSize={0.13}
          letterSpacing={0.14}
          color={COLOR_MUTED}
          anchorX="center"
          anchorY="middle"
        >
          {studio.foundedYear ? `EST. ${studio.foundedYear}` : "EST. UNKNOWN"}
        </SceneText>
        <SceneText
          position={[0, -0.32, 0.12]}
          fontSize={0.13}
          letterSpacing={0.18}
          color={hovered ? COLOR_HOLO : "#56565f"}
          anchorX="center"
          anchorY="middle"
        >
          {`${studio.animeCount} WORKS`}
        </SceneText>
        <SceneText
          position={[0, -0.62, 0.12]}
          fontSize={0.14}
          letterSpacing={0.26}
          color={hovered ? "#e88a8f" : COLOR_CRIMSON}
          anchorX="center"
          anchorY="middle"
        >
          VIEW STUDIO
        </SceneText>
      </group>
    </group>
  );
}
