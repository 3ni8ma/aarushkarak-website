import { Float } from '@react-three/drei'
import { useThemeColors } from '../../hooks/useThemeColors'
import SceneManager from '../three/SceneManager'
import FloatingGeometry from '../three/FloatingGeometry'

export default function AboutScene() {
  const colors = useThemeColors()

  return (
    <SceneManager cameraZ={9}>
      <Float speed={0.3} rotationIntensity={0.15} floatIntensity={0.2}>
        <FloatingGeometry
          shape="torusKnot"
          position={[-3, 1.5, -4]}
          color={colors.primary}
          size={0.35}
          speed={0.8}
          opacity={0.06}
        />
      </Float>
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.25}>
        <FloatingGeometry
          shape="octahedron"
          position={[3.5, -1, -3]}
          color={colors.accent}
          size={0.3}
          speed={1.2}
          opacity={0.05}
        />
      </Float>
    </SceneManager>
  )
}
