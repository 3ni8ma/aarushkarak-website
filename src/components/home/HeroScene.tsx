import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useThemeColors } from '../../hooks/useThemeColors'
import SceneManager from '../three/SceneManager'
import FloatingGeometry from '../three/FloatingGeometry'

const isMobile = typeof window !== 'undefined' && (
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  window.innerWidth < 768
)

function RevealScale() {
  const groupRef = useRef<THREE.Group>(null)
  const scaleRef = useRef(0)

  useFrame(() => {
    const target = 1
    scaleRef.current += (target - scaleRef.current) * 0.04
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleRef.current)
    }
  })

  return <group ref={groupRef} />
}

export default function HeroScene() {
  const colors = useThemeColors()

  const geometries = useMemo(() => {
    if (isMobile) return [
      { shape: 'icosahedron' as const, pos: [0, 0, -5] as [number, number, number], color: colors.primary, size: 0.6, opacity: 0.08 },
    ]
    return [
      { shape: 'torusKnot' as const, pos: [-6, 3.5, -5] as [number, number, number], color: colors.primary, size: 0.5, opacity: 0.06 },
      { shape: 'icosahedron' as const, pos: [6, -2, -4] as [number, number, number], color: colors.secondary, size: 0.4, opacity: 0.05 },
      { shape: 'dodecahedron' as const, pos: [-4, -3, -7] as [number, number, number], color: colors.accent, size: 0.35, opacity: 0.04 },
      { shape: 'octahedron' as const, pos: [5, 4, -6] as [number, number, number], color: colors.primary, size: 0.3, opacity: 0.05 },
    ]
  }, [colors])

  return (
    <SceneManager cameraZ={10}>
      <RevealScale />
      {!isMobile && (
        <>
          {geometries.map((g, i) => (
            <Float key={i} speed={0.3 + i * 0.08} rotationIntensity={0.1 + i * 0.03} floatIntensity={0.2 + i * 0.04}>
              <FloatingGeometry shape={g.shape} position={g.pos} color={g.color} size={g.size} speed={1} opacity={g.opacity} />
            </Float>
          ))}
        </>
      )}
    </SceneManager>
  )
}
