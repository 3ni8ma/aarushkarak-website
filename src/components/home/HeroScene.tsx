import { useRef, useEffect, useMemo, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useThemeColors } from "../../hooks/useThemeColors";
import { useTheme } from "../../contexts/ThemeContext";
import SceneManager from "../three/SceneManager";
import FloatingGeometry from "../three/FloatingGeometry";

const isMobile =
  typeof window !== "undefined" &&
  ("ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth < 768);

function MouseTracker({ active = false }: { active?: boolean }) {
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    function onMouse(e: MouseEvent) {
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  useFrame(() => {
    if (!active) return;
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.03;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.03;
    if (groupRef.current) {
      groupRef.current.rotation.x = currentRef.current.y * 0.15;
      groupRef.current.rotation.y = currentRef.current.x * 0.2;
    }
  });

  return <group ref={groupRef} />;
}

function HeroParticles({ revealed = false }: { revealed?: boolean }) {
  const colors = useThemeColors();
  const count = isMobile ? 80 : 200;
  const materialRef = useRef<THREE.PointsMaterial>(null);

  useFrame(() => {
    if (!materialRef.current) return;
    const target = revealed ? 0.6 : 0;
    materialRef.current.opacity +=
      (target - materialRef.current.opacity) * 0.04;
  });

  const [positions, sizes, colorArray] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 3 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
      siz[i] = Math.random() * 3 + 0.5;

      const c = [colors.primary, colors.secondary, colors.accent][
        Math.floor(Math.random() * 3)
      ];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return [pos, siz, col];
  }, [count, colors]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
    return geo;
  }, [positions, sizes, colorArray]);

  const material = useMemo(() => {
    const m = new THREE.PointsMaterial({
      size: 0.08,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      sizeAttenuation: true,
    });
    return m;
  }, []);

  return <points geometry={geometry} material={material} />;
}

function RevealScale({ children }: { children: ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const scaleRef = useRef(0);

  const { revealStarted } = useTheme();

  useFrame(() => {
    const target = revealStarted ? 1 : 0;
    scaleRef.current += (target - scaleRef.current) * 0.04;
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleRef.current);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function HeroScene() {
  const colors = useThemeColors();
  const { revealStarted } = useTheme();

  const geometries = useMemo(() => {
    if (isMobile)
      return [
        {
          shape: "torusKnot" as const,
          pos: [-4.5, 2.5, -4] as [number, number, number],
          color: colors.primary,
          size: 0.5,
          opacity: 0.5,
        },
        {
          shape: "icosahedron" as const,
          pos: [5, -1.5, -3] as [number, number, number],
          color: colors.secondary,
          size: 0.4,
          opacity: 0.4,
        },
      ];
    return [
      {
        shape: "torusKnot" as const,
        pos: [-4.5, 2.5, -4] as [number, number, number],
        color: colors.primary,
        size: 0.5,
        opacity: 0.5,
      },
      {
        shape: "icosahedron" as const,
        pos: [5, -1.5, -3] as [number, number, number],
        color: colors.secondary,
        size: 0.4,
        opacity: 0.4,
      },
      {
        shape: "dodecahedron" as const,
        pos: [-3, -2.5, -6] as [number, number, number],
        color: colors.accent,
        size: 0.35,
        opacity: 0.35,
      },
      {
        shape: "octahedron" as const,
        pos: [4, 3, -5] as [number, number, number],
        color: colors.primary,
        size: 0.3,
        opacity: 0.45,
      },
      {
        shape: "torusKnot" as const,
        pos: [0, -3, -7] as [number, number, number],
        color: colors.accent,
        size: 0.45,
        opacity: 0.3,
      },
    ];
  }, [colors]);

  return (
    <SceneManager cameraZ={10}>
      <MouseTracker active={revealStarted} />
      <HeroParticles revealed={revealStarted} />
      <RevealScale>
        {geometries.map((g, i) => (
          <Float
            key={i}
            speed={0.4 + i * 0.1}
            rotationIntensity={0.2 + i * 0.05}
            floatIntensity={0.3 + i * 0.05}
          >
            <FloatingGeometry
              shape={g.shape}
              position={g.pos}
              color={g.color}
              size={g.size}
              speed={1}
              opacity={g.opacity}
            />
          </Float>
        ))}
      </RevealScale>
    </SceneManager>
  );
}
