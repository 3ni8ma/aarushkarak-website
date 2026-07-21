import { Float } from '@react-three/drei'
import { useThemeColors } from '../../hooks/useThemeColors'
import SceneManager from '../three/SceneManager'
import FloatingGeometry from '../three/FloatingGeometry'

export default function SkillsScene() {
  const colors = useThemeColors()

  return (
    <SceneManager cameraZ={9}>
      <Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.25}>
        <FloatingGeometry
          shape="icosahedron"
          position={[0, 0, -5]}
          color={colors.accent}
          size={0.4}
          speed={0.6}
          opacity={0.06}
        />
      </Float>
    </SceneManager>
  )
}
