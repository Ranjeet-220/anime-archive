"use client";

import { OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { truncate } from "@/lib/utils";
import type { EraDto } from "@/lib/types";
import {
  COLOR_BG,
  COLOR_CRIMSON,
  COLOR_CRIMSON_SOFT,
  COLOR_HOLO,
  COLOR_MUTED,
  COLOR_PAPER,
  type TimelineSceneProps,
} from "./scene-types";
import { CameraRig, ClickableBox, ClickableText, SceneText } from "./scene-bits";
import { EraEffects } from "./era-effects";
import { SceneCanvas } from "./scene-shell";

const X_PER_YEAR = 0.42;

/**
 * The floating timeline: era nodes stretched along a glowing line from the
 * 1910s to today. Selecting a node flies the camera over, revealing the
 * era's anime as floating cards plus studio and creator chips.
 */
export function TimelineScene({
  mode,
  mobile,
  eras,
  studioSlugs,
  creatorSlugs,
  onSelectEra,
}: TimelineSceneProps) {
  const router = useRouter();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const years = useMemo(() => {
    const ys = eras.map((e) => e.startYear);
    if (!ys.length) return { min: 1910, max: 2020, span: 110 };
    const min = Math.min(...ys);
    const max = Math.max(...ys);
    return { min, max, span: Math.max(max - min, 40) };
  }, [eras]);

  const xOf = (year: number) => (year - 1910) * X_PER_YEAR;
  const centerX = xOf((years.min + years.max) / 2);

  const selectedEra: EraDto | null = selected !== null ? eras[selected] ?? null : null;

  useEffect(() => {
    onSelectEra?.(selectedEra);
  }, [selected, selectedEra, onSelectEra]);

  return (
    <div className="relative h-full min-h-[560px] w-full">
      <SceneCanvas
        mode={mode}
        cameraPosition={[centerX, mobile ? 5.5 : 6, 14]}
      >
        <color attach="background" args={[COLOR_BG]} />
        <fog attach="fog" args={[COLOR_BG, 24, 60]} />

        <ambientLight intensity={mode === "IMMERSIVE" ? 0.45 : 0.3} />
        {selectedEra ? (
          <pointLight
            position={[xOf(selectedEra.startYear), 3.4, 2.5]}
            color={COLOR_CRIMSON}
            intensity={mode === "PERFORMANCE" ? 18 : 40}
            distance={16}
          />
        ) : null}

        {selected !== null ? (
          <CameraRig
            controlsRef={controlsRef}
            x={xOf(eras[selected].startYear)}
            y={mobile ? 4.6 : 4.0}
            z={10.5}
            lookX={xOf(eras[selected].startYear)}
            lookY={1.9}
            lookZ={0}
            trigger={selected}
            speed={4}
          />
        ) : null}

        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          minDistance={4}
          maxDistance={26}
          maxPolarAngle={1.45}
          minPolarAngle={0.2}
          target={[centerX, 1.9, 0]}
        />

        <TimelineRail minX={xOf(years.min) - 3} maxX={xOf(years.max) + 3} mode={mode} />

        {eras.map((era, i) => {
          const isSelected = i === selected;
          return (
            <EraNode
              key={era.id}
              mode={mode}
              mobile={mobile}
              era={era}
              x={xOf(era.startYear)}
              active={isSelected}
              onSelect={() => {
                setSelected((prev) => (prev === i ? null : i));
              }}
              onOpenEra={() => router.push(`/timeline/${era.slug}`)}
              onOpenAnime={(slug) => router.push(`/anime/${slug}`)}
              onOpenStudio={(slug) => router.push(`/studio/${slug}`)}
              onOpenCreator={(slug) => router.push(`/creator/${slug}`)}
              studioSlugs={studioSlugs}
              creatorSlugs={creatorSlugs}
            />
          );
        })}

        <SceneText
          position={[centerX, -0.9, 0]}
          fontSize={0.2}
          letterSpacing={0.4}
          color="#56565f"
          anchorX="center"
          anchorY="middle"
        >
          DRAG TO ORBIT · CLICK A NODE TO EXPLORE AN ERA
        </SceneText>

        <EraEffects mode={mode} eraSlug={selectedEra?.slug ?? null} />
      </SceneCanvas>
    </div>
  );
}

function TimelineRail({
  minX,
  maxX,
  mode,
}: {
  minX: number;
  maxX: number;
  mode: TimelineSceneProps["mode"];
}) {
  const width = maxX - minX;
  return (
    <group position={[(minX + maxX) / 2, 0.06, 0]}>
      <mesh>
        <boxGeometry args={[width, 0.06, 0.06]} />
        <meshBasicMaterial color={mode === "PERFORMANCE" ? "#33333d" : COLOR_CRIMSON} />
      </mesh>
      <mesh position={[0, 0.02, 0.05]}>
        <boxGeometry args={[width, 0.03, 0.03]} />
        <meshBasicMaterial color={mode === "PERFORMANCE" ? "#1c1c22" : COLOR_HOLO} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

interface EraNodeProps {
  mode: TimelineSceneProps["mode"];
  mobile: boolean;
  era: EraDto;
  x: number;
  active: boolean;
  onSelect: () => void;
  onOpenEra: () => void;
  onOpenAnime: (slug: string) => void;
  onOpenStudio: (slug: string) => void;
  onOpenCreator: (slug: string) => void;
  studioSlugs: Record<string, string>;
  creatorSlugs: Record<string, string>;
}

function EraNode({
  mode,
  mobile,
  era,
  x,
  active,
  onSelect,
  onOpenEra,
  onOpenAnime,
  onOpenStudio,
  onOpenCreator,
  studioSlugs,
  creatorSlugs,
}: EraNodeProps) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <group position={[x, 0, 0]}>
      <mesh
        ref={sphereRef}
        position={[0, 1.25, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
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
        <sphereGeometry args={[active ? 0.62 : 0.48, 24, 24]} />
        <meshStandardMaterial
          color={active ? COLOR_HOLO : COLOR_CRIMSON}
          emissive={active ? COLOR_HOLO : COLOR_CRIMSON}
          emissiveIntensity={mode === "PERFORMANCE" ? 0.5 : hovered ? 1.2 : 0.7}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      {active ? <PulseRing position={[0, 1.25, 0]} color={COLOR_HOLO} /> : null}
      <SceneText
        position={[0, 0.55, 0]}
        fontSize={mobile ? 0.34 : 0.28}
        letterSpacing={0.14}
        color={active ? COLOR_PAPER : COLOR_MUTED}
        anchorX="center"
        anchorY="middle"
      >
        {`${Math.floor(era.startYear / 10) * 10}s`}
      </SceneText>
      {active ? <EraDetail mobile={mobile} era={era} onOpenEra={onOpenEra} onOpenAnime={onOpenAnime} onOpenStudio={onOpenStudio} onOpenCreator={onOpenCreator} studioSlugs={studioSlugs} creatorSlugs={creatorSlugs} /> : null}
    </group>
  );
}

function PulseRing({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    let t = 0;
    let raf = 0;
    const tick = () => {
      t += 0.02;
      const s = 1 + t * 0.4;
      mesh.scale.setScalar(s);
      (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - t * 0.18);
      if (t < 5) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <mesh ref={ref} position={position}>
      <ringGeometry args={[0.7, 0.74, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} side={THREE.DoubleSide} />
    </mesh>
  );
}

interface EraDetailProps {
  mode: TimelineSceneProps["mode"];
  mobile: boolean;
  era: EraDto;
  onOpenEra: () => void;
  onOpenAnime: (slug: string) => void;
  onOpenStudio: (slug: string) => void;
  onOpenCreator: (slug: string) => void;
  studioSlugs: Record<string, string>;
  creatorSlugs: Record<string, string>;
}

function EraDetail({
  mobile,
  era,
  onOpenEra,
  onOpenAnime,
  onOpenStudio,
  onOpenCreator,
  studioSlugs,
  creatorSlugs,
}: Omit<EraDetailProps, "mode">) {
  const anime = (era.anime ?? []).slice(0, 8);
  const studios = useMemo(() => {
    const seen = new Set<string>();
    const out: { slug: string; name: string }[] = [];
    for (const a of era.anime ?? []) {
      if (!a.studio) continue;
      const slug = studioSlugs[a.studio];
      if (slug && !seen.has(slug)) {
        seen.add(slug);
        out.push({ slug, name: a.studio });
      }
    }
    return out.slice(0, 5);
  }, [era.anime, studioSlugs]);

  const creators = useMemo(() => {
    const seen = new Set<string>();
    const out: { slug: string; name: string }[] = [];
    for (const a of era.anime ?? []) {
      if (!a.director) continue;
      const slug = creatorSlugs[a.director];
      if (slug && !seen.has(slug)) {
        seen.add(slug);
        out.push({ slug, name: a.director });
      }
    }
    return out.slice(0, 4);
  }, [era.anime, creatorSlugs]);

  const cardFs = mobile ? 0.19 : 0.15;

  return (
    <group position={[0, 0, -2.4]}>
      <mesh position={[0, 1.9, 0]}>
        <planeGeometry args={[10.5, 4.6]} />
        <meshBasicMaterial
          color="#0c0c11"
          transparent
          opacity={0.92}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments position={[0, 1.9, 0.02]}>
        <edgesGeometry args={[new THREE.BoxGeometry(10.5, 4.6, 0.04)]} />
        <lineBasicMaterial color={COLOR_CRIMSON} transparent opacity={0.7} />
      </lineSegments>
      <SceneText
        position={[0, 3.5, 0.05]}
        fontSize={mobile ? 0.5 : 0.4}
        letterSpacing={0.2}
        color={COLOR_PAPER}
        anchorX="center"
        anchorY="middle"
      >
        {era.name}
      </SceneText>
      <SceneText
        position={[0, 2.95, 0.05]}
        fontSize={0.22}
        letterSpacing={0.16}
        color={COLOR_CRIMSON_SOFT}
        anchorX="center"
        anchorY="middle"
      >
        {era.period}
      </SceneText>
      <ClickableText
        label="OPEN ERA PAGE"
        position={[0, 0.35, 0.05]}
        fontSize={0.2}
        letterSpacing={0.22}
        onClick={onOpenEra}
      />

      {anime.map((a, idx) => {
        const n = anime.length;
        const aOff = (idx - (n - 1) / 2) * 1.6;
        return (
          <ClickableBox
            key={a.slug}
            position={[aOff, 2.15, 0.5]}
            size={[1.15, 1.5, 0.08]}
            color="#16161c"
            hoverColor="#24161a"
            onClick={() => onOpenAnime(a.slug)}
          >
            <SceneText
              position={[0, 0.24, 0.06]}
              fontSize={cardFs}
              color={COLOR_PAPER}
              maxWidth={1.05}
              anchorX="center"
              anchorY="middle"
              textAlign="center"
            >
              {truncate(a.title, mobile ? 14 : 20)}
            </SceneText>
            <SceneText
              position={[0, -0.4, 0.06]}
              fontSize={cardFs * 0.8}
              color={COLOR_MUTED}
              anchorX="center"
              anchorY="middle"
            >
              {a.year ? String(a.year) : ""}
            </SceneText>
          </ClickableBox>
        );
      })}

      {studios.length ? (
        <group position={[0, 0.1, 0.5]}>
          <SceneText
            position={[0, 0.18, 0]}
            fontSize={0.15}
            letterSpacing={0.2}
            color="#56565f"
            anchorX="center"
            anchorY="middle"
          >
            STUDIOS
          </SceneText>
          {studios.map((s, i) => (
            <Chip
              key={s.slug}
              label={s.name}
              position={[(i - (studios.length - 1) / 2) * 2.0, -0.32, 0]}
              color={COLOR_CRIMSON_SOFT}
              onClick={() => onOpenStudio(s.slug)}
            />
          ))}
        </group>
      ) : null}

      {creators.length ? (
        <group position={[0, -1.15, 0.5]}>
          <SceneText
            position={[0, 0.18, 0]}
            fontSize={0.15}
            letterSpacing={0.2}
            color="#56565f"
            anchorX="center"
            anchorY="middle"
          >
            CREATORS
          </SceneText>
          {creators.map((c, i) => (
            <Chip
              key={c.slug}
              label={c.name}
              position={[(i - (creators.length - 1) / 2) * 2.0, -0.32, 0]}
              color={COLOR_HOLO}
              onClick={() => onOpenCreator(c.slug)}
            />
          ))}
        </group>
      ) : null}
    </group>
  );
}

function Chip({
  label,
  position,
  color,
  onClick,
}: {
  label: string;
  position: [number, number, number];
  color: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
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
      <mesh>
        <boxGeometry args={[1.5, 0.34, 0.08]} />
        <meshStandardMaterial
          color={hovered ? "#24161a" : "#141418"}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.25}
          roughness={0.7}
        />
      </mesh>
      <SceneText
        position={[0, 0, 0.06]}
        fontSize={0.13}
        color={color}
        maxWidth={1.35}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      >
        {label}
      </SceneText>
    </group>
  );
}
