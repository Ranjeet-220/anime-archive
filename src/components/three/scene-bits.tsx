"use client";

import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { PointMaterial, Points, Text } from "@react-three/drei";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
  type RefObject,
} from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { SCENE_FONT, type SceneMode } from "./scene-types";

/**
 * Text with the Space Grotesk scene font. Latin only — Japanese text stays
 * in the 2D pages per project conventions.
 */
export function SceneText({
  children,
  ...props
}: Omit<ComponentProps<typeof Text>, "font">) {
  return (
    <Text font={SCENE_FONT} {...props}>
      {children}
    </Text>
  );
}

/**
 * Clickable 3D text label with pointer cursor + hover glow.
 */
export function ClickableText({
  label,
  position,
  color = "#5ac4d4",
  hoverColor = "#8fd9e4",
  fontSize = 0.22,
  letterSpacing = 0.1,
  onClick,
}: {
  label: string;
  position: [number, number, number];
  color?: string;
  hoverColor?: string;
  fontSize?: number;
  letterSpacing?: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);
  return (
    <SceneText
      position={position}
      fontSize={fontSize}
      letterSpacing={letterSpacing}
      color={hovered ? hoverColor : color}
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
      {label}
    </SceneText>
  );
}

function makeParticlePositions(count: number, x: number, y: number, z: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * x;
    arr[i * 3 + 1] = (Math.random() - 0.5) * y;
    arr[i * 3 + 2] = (Math.random() - 0.5) * z;
  }
  return arr;
}

// Deterministic cache so particle buffers are generated once per config
// (at module scope, never re-randomised on re-render).
const particleCache = new Map<string, Float32Array>();

function particlePositions(count: number, x: number, y: number, z: number): Float32Array {
  const key = `${count}:${x}:${y}:${z}`;
  let arr = particleCache.get(key);
  if (!arr) {
    arr = makeParticlePositions(count, x, y, z);
    particleCache.set(key, arr);
  }
  return arr;
}

/**
 * Static particle field rendered as a single Points object.
 * All allocation happens once via useMemo — nothing is allocated per frame.
 */
export function ParticleField({
  mode,
  x = 26,
  y = 14,
  z = 22,
  color = "#e88a8f",
  size = 0.045,
}: {
  mode: SceneMode;
  x?: number;
  y?: number;
  z?: number;
  color?: string;
  size?: number;
}) {
  const count = mode === "IMMERSIVE" ? 900 : mode === "BALANCED" ? 600 : 150;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(
    () => particlePositions(count, x, y, z),
    [count, x, y, z]
  );

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y += (mode === "PERFORMANCE" ? 0.01 : 0.025) * delta;
    ref.current.position.y = Math.sin(t * 0.3) * 0.25;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={mode === "PERFORMANCE" ? 0.5 : 0.75}
      />
    </Points>
  );
}

export interface CameraRigProps {
  controlsRef: RefObject<OrbitControlsImpl | null>;
  /** Camera goal position. */
  x: number;
  y: number;
  z: number;
  /** OrbitControls target goal. */
  lookX?: number;
  lookY?: number;
  lookZ?: number;
  /** Re-triggers the animation whenever it changes. */
  trigger?: number;
  speed?: number;
  threshold?: number;
}

/**
 * Smoothly lerps the camera (and OrbitControls target) toward a goal.
 * The animation restarts whenever `trigger` or a goal value changes,
 * so scenes can "fly" the camera by changing props.
 */
export function CameraRig({
  controlsRef,
  x,
  y,
  z,
  lookX,
  lookY,
  lookZ,
  trigger,
  speed = 5,
  threshold = 0.08,
}: CameraRigProps) {
  const { camera } = useThree();
  const animating = useRef(true);
  const goalPos = useRef(new THREE.Vector3(x, y, z));
  const goalLook = useRef(
    lookX !== undefined ? new THREE.Vector3(lookX, lookY ?? 0, lookZ ?? 0) : null
  );

  useEffect(() => {
    goalPos.current.set(x, y, z);
    if (lookX !== undefined && goalLook.current) {
      goalLook.current.set(lookX, lookY ?? 0, lookZ ?? 0);
    }
    animating.current = true;
  }, [x, y, z, lookX, lookY, lookZ, trigger]);

  useFrame((_, delta) => {
    if (!animating.current) return;
    const k = 1 - Math.exp(-speed * delta);
    camera.position.lerp(goalPos.current, k);
    const controls = controlsRef.current;
    if (controls && goalLook.current) {
      controls.target.lerp(goalLook.current, k);
      controls.update();
    }
    const arrived = camera.position.distanceTo(goalPos.current) < threshold;
    if (arrived) animating.current = false;
  });

  return null;
}

/**
 * Scales a group in from zero on mount — used for cinematic fade-ins.
 */
export function FadeInGroup({
  children,
  duration = 1.6,
  delay = 0,
  from = 0.55,
}: {
  children: ReactNode;
  duration?: number;
  delay?: number;
  from?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const delayLeft = useRef(delay);

  useFrame((_, delta) => {
    const group = ref.current;
    if (!group) return;
    if (delayLeft.current > 0) {
      delayLeft.current -= delta;
      return;
    }
    progress.current = Math.min(1, progress.current + delta / duration);
    const t = 1 - Math.pow(1 - progress.current, 3);
    group.scale.setScalar(from + (1 - from) * t);
  });

  return (
    <group ref={ref} scale={from}>
      {children}
    </group>
  );
}

export interface ClickableBoxProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  hoverColor?: string;
  onClick?: () => void;
  children?: ReactNode;
}

/**
 * A basic box that responds to pointer events (hover glow + cursor + click).
 */
export function ClickableBox({
  position,
  size,
  color = "#1a1a20",
  hoverColor = "#2a2a33",
  onClick,
  children,
}: ClickableBoxProps) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };
  const handleOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };
  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <group
      position={position}
      onClick={onClick ? handleClick : undefined}
      onPointerOver={onClick ? handleOver : undefined}
      onPointerOut={onClick ? handleOut : undefined}
    >
      <mesh scale={hovered ? 1.06 : 1}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={hovered ? hoverColor : color} roughness={0.8} metalness={0.1} />
      </mesh>
      {children}
    </group>
  );
}
