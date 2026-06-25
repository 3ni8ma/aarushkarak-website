import { useRef, useMemo } from 'react'
import { type Group } from 'three'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

type ShapeType = 'torusKnot' | 'octahedron' | 'icosahedron' | 'dodecahedron'

interface FloatingGeometryProps {
  shape?: ShapeType
  position?: [number, number, number]
  color?: THREE.Color
  size?: number
  speed?: number
  rotationIntensity?: number
  floatIntensity?: number
  opacity?: number
  wireframe?: boolean
}

function createGeometry(shape: ShapeType) {
  switch (shape) {
    case 'torusKnot':
      return new THREE.TorusKnotGeometry(1, 0.35, 64, 8)
    case 'octahedron':
      return new THREE.OctahedronGeometry(1)
    case 'icosahedron':
      return new THREE.IcosahedronGeometry(1)
    case 'dodecahedron':
      return new THREE.DodecahedronGeometry(1)
  }
}

export default function FloatingGeometry({
  shape = 'torusKnot',
  position = [0, 0, 0],
  color,
  size = 0.4,
  speed = 1,
  rotationIntensity = 0.5,
  floatIntensity = 0.5,
  opacity = 0.6,
  wireframe = false,
}: FloatingGeometryProps) {
  const groupRef = useRef<Group>(null)

  const geometry = useMemo(() => createGeometry(shape), [shape])

  const matColor = color ?? new THREE.Color(1, 1, 1)

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
            wireframe={wireframe}
            metalness={0.2}
            roughness={0.3}
            envMapIntensity={0.5}
          />
        </mesh>
        <mesh geometry={geometry} scale={size * 1.02}>
          <meshBasicMaterial
            color={matColor}
            transparent
            opacity={0.08}
            wireframe
          />
        </mesh>
      </group>
    </Float>
  )
}
