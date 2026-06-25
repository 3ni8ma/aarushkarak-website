import { type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'

interface SceneManagerProps {
  children: ReactNode
  cameraZ?: number
  dpr?: [number, number]
}

export default function SceneManager({
  children,
  cameraZ = 8,
  dpr = [1, 2],
}: SceneManagerProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, cameraZ], fov: 60 }}
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      className="absolute inset-0 pointer-events-none"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      {children}
    </Canvas>
  )
}
