import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useThemeColors } from '../../hooks/useThemeColors'
import SceneManager from '../three/SceneManager'

function ContactParticles() {
  const colors = useThemeColors()
  const pointsRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const count = 200

  const [positions, colorArray] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 16
      pos[i3 + 1] = (Math.random() - 0.5) * 10
      pos[i3 + 2] = (Math.random() - 0.5) * 8 - 2
      const c = [colors.primary, colors.secondary, colors.accent][Math.floor(Math.random() * 3)]
      col[i3] = c.r
      col[i3 + 1] = c.g
      col[i3 + 2] = c.b
    }
    return [pos, col]
  }, [colors])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))
    return geo
  }, [positions, colorArray])

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.06,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
    sizeAttenuation: true,
  }), [])

  const initialPositions = useMemo(() => new Float32Array(positions), [positions])
  const timeRef = useRef(0)

  useMemo(() => {
    function onMouse(e: MouseEvent) {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    const mx = mouseRef.current.x * 0.3
    const my = mouseRef.current.y * 0.3
    timeRef.current += delta * 0.3

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const ox = initialPositions[i3]
      const oy = initialPositions[i3 + 1]
      const oz = initialPositions[i3 + 2]
      pos[i3] = ox + Math.sin(timeRef.current + i) * 0.1 + mx * 0.2
      pos[i3 + 1] = oy + Math.cos(timeRef.current * 0.7 + i * 0.5) * 0.1 + my * 0.2
      pos[i3 + 2] = oz + Math.sin(timeRef.current * 0.5 + i * 0.3) * 0.1
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}

export default function ContactScene() {
  return (
    <SceneManager cameraZ={6}>
      <ContactParticles />
    </SceneManager>
  )
}
