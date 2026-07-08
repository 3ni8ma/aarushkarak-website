import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeColors } from "../../hooks/useThemeColors";
import SceneManager from "../three/SceneManager";

const skills = [
  "Python",
  "JavaScript",
  "HTML/CSS",
  "Java",
  "C++",
  "Three.js",
  "MediaPipe",
  "REST APIs",
  "Arduino IDE",
  "Chatbot Design",
  "SQL",
  "PostgreSQL",
  "React",
  "Node.js",
];

function SkillParticles() {
  const colors = useThemeColors();
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [positions, colorArray] = useMemo(() => {
    const pos = new Float32Array(skills.length * 3);
    const col = new Float32Array(skills.length * 3);
    skills.forEach((_, i) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const c = [colors.primary, colors.secondary, colors.accent][i % 3];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    });
    return [pos, col];
  }, [colors]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
    return geo;
  }, [positions, colorArray]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.15,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
        sizeAttenuation: true,
      }),
    [],
  );

  useEffect(() => {
    function onMouse(e: MouseEvent) {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      const tx = mouseRef.current.x * 0.1;
      const ty = mouseRef.current.y * 0.1;
      pointsRef.current.rotation.x +=
        (ty - pointsRef.current.rotation.x) * 0.02;
      pointsRef.current.rotation.y +=
        (tx - pointsRef.current.rotation.y) * 0.02 + 0.002;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

export default function SkillsScene() {
  return (
    <SceneManager cameraZ={7}>
      <SkillParticles />
    </SceneManager>
  );
}
