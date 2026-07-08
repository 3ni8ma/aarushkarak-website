import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeColors } from "../../hooks/useThemeColors";
import SceneManager from "../three/SceneManager";
import FloatingGeometry from "../three/FloatingGeometry";

const experiences = [
  {
    role: "Back End Developer",
    company: "CommunityOne",
    period: "Jun 2026 - Present",
  },
  { role: "Web Developer", company: "Chingu", period: "Jun 2026 - Present" },
  {
    role: "Application Developer",
    company: "Hack Club",
    period: "Jun 2025 - Present",
  },
  { role: "Web Developer", company: "Fiverr", period: "Apr 2025 - Present" },
  {
    role: "Co-Founder & CEO",
    company: "The Coder Bros",
    period: "Jul 2023 - Present",
  },
  {
    role: "Maker Studio Teen Intern",
    company: "Sci-Tech",
    period: "Jun 2025 - Sep 2025",
  },
];

function TimelinePath() {
  const colors = useThemeColors();

  const geometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 30; i++) {
      const t = (i / 29) * Math.PI * 0.5 - 0.1;
      const r = 5 - t * 1.5;
      const x = Math.sin(t) * r;
      const z = -Math.cos(t) * r - 1;
      const y = Math.sin(t * 3) * 0.3;
      pts.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 32, 0.02, 3, false);
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: colors.primary,
        transparent: true,
        opacity: 0.15,
      }),
    [colors],
  );

  return <mesh geometry={geometry} material={material} />;
}

function ExperienceNode({
  index,
  total,
  color,
}: {
  index: number;
  total: number;
  color: THREE.Color;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef(0);

  const angle = (index / total) * Math.PI * 0.5 - 0.1;
  const radius = 5 - (index / total) * 1.5;
  const x = Math.sin(angle) * radius;
  const z = -Math.cos(angle) * radius - 1;
  const y = Math.sin(angle * 3) * 0.3;

  useFrame((_, delta) => {
    pulseRef.current += delta * 0.8;
    if (meshRef.current) {
      const s = 1 + Math.sin(pulseRef.current) * 0.08;
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <group position={[x, y, z]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.18, 0.22, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function SceneContent() {
  const colors = useThemeColors();
  const groupRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    function onScroll() {
      const section = document.getElementById("experience");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const scrolled = window.innerHeight - rect.top;
      progressRef.current = Math.max(0, Math.min(scrolled / total, 1));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const targetRot = progressRef.current * 0.8 - 0.2;
      groupRef.current.rotation.y +=
        (targetRot - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <TimelinePath />
      {experiences.map((_, i) => {
        const c = [colors.primary, colors.secondary, colors.accent][i % 3];
        return (
          <ExperienceNode
            key={i}
            index={i}
            total={experiences.length}
            color={c}
          />
        );
      })}
      {Array.from({ length: 2 }).map((_, i) => {
        const c = [colors.primary, colors.secondary][i];
        return (
          <FloatingGeometry
            key={`bg-${i}`}
            shape="dodecahedron"
            position={[(-1 + i * 2) * 2.5, 1 - i * 1.5, -6 - i * 2]}
            color={c}
            size={0.25}
            speed={0.3 + i * 0.1}
            opacity={0.2}
          />
        );
      })}
    </group>
  );
}

export default function ExperienceScene() {
  return (
    <SceneManager cameraZ={7}>
      <SceneContent />
    </SceneManager>
  );
}
