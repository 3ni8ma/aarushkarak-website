import { useRef, useMemo } from "react";
import { type Group } from "three";
import { Float } from "@react-three/drei";
import * as THREE from "three";

type ShapeType = "torusKnot" | "octahedron" | "icosahedron" | "dodecahedron";

interface FloatingGeometryProps {
  shape?: ShapeType;
  position?: [number, number, number];
  color?: THREE.Color;
  size?: number;
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  opacity?: number;
}

const isMobile =
  typeof window !== "undefined" &&
  ("ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth < 768);

function createGeometry(shape: ShapeType) {
  switch (shape) {
    case "torusKnot":
      return new THREE.TorusKnotGeometry(
        1,
        0.35,
        isMobile ? 24 : 32,
        isMobile ? 4 : 6,
      );
    case "octahedron":
      return new THREE.OctahedronGeometry(1);
    case "icosahedron":
      return new THREE.IcosahedronGeometry(1);
    case "dodecahedron":
      return new THREE.DodecahedronGeometry(1);
  }
}

export default function FloatingGeometry({
  shape = "torusKnot",
  position = [0, 0, 0],
  color,
  size = 0.4,
  speed = 1,
  rotationIntensity = 0.5,
  floatIntensity = 0.5,
  opacity = 0.6,
}: FloatingGeometryProps) {
  const groupRef = useRef<Group>(null);

  const geometry = useMemo(() => createGeometry(shape), [shape]);

  const matColor = color ?? new THREE.Color(1, 1, 1);

  return (
    <Float
      speed={speed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
    >
      <group ref={groupRef} position={position}>
        <mesh geometry={geometry} scale={size}>
          <meshPhysicalMaterial
            color={matColor}
            transparent
            opacity={opacity}
            metalness={0.1}
            roughness={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}
