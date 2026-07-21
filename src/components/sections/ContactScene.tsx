import { useThemeColors } from '../../hooks/useThemeColors'
import SceneManager from '../three/SceneManager'
import FloatingGeometry from '../three/FloatingGeometry'

export default function ContactScene() {
  const colors = useThemeColors()

  return (
    <SceneManager cameraZ={9}>
      <FloatingGeometry
        shape="octahedron"
        position={[0, 0, -5]}
        color={colors.primary}
        size={0.35}
        opacity={0.05}
      />
    </SceneManager>
  )
}
