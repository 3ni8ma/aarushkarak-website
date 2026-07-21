import { useThemeColors } from '../../hooks/useThemeColors'
import SceneManager from '../three/SceneManager'
import FloatingGeometry from '../three/FloatingGeometry'

export default function ExperienceScene() {
  const colors = useThemeColors()

  return (
    <SceneManager cameraZ={10}>
      <FloatingGeometry
        shape="dodecahedron"
        position={[0, 0, -6]}
        color={colors.primary}
        size={0.4}
        opacity={0.04}
      />
    </SceneManager>
  )
}
