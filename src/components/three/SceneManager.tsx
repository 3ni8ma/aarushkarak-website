import { type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'

const isMobile = typeof window !== 'undefined' && (
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  (navigator as any).hardwareConcurrency <= 4 ||
  window.innerWidth < 768
)

interface SceneManagerProps {
  children: ReactNode
  cameraZ?: number
}

export default function SceneManager({
  children,
  cameraZ = 8,
}: SceneManagerProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, cameraZ], fov: 60 }}
      dpr={isMobile ? [1, 1] : [1, 1.5]}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
      }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      frameloop="always"
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      {children}
    </Canvas>
  )
}
