import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useThemeColors } from '../../hooks/useThemeColors'
import SceneManager from '../three/SceneManager'

const isMobile = typeof window !== 'undefined' && (
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  window.innerWidth < 768
)

function ContactParticles() {
  const colors = useThemeColors()
  const pointsRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const count = isMobile ? 60 : 120

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

  useEffect(() => {
    function onMouse(e: MouseEvent) {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  const timeRef = useRef(0)
  const skipRef = useRef(0)

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    const mx = mouseRef.current.x * 0.3
    const my = mouseRef.current.y * 0.3
    timeRef.current += delta * 0.3

    skipRef.current = (skipRef.current + 1) % (isMobile ? 3 : 1)
    if (isMobile && skipRef.current !== 0) return

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = initialPositions[i3] + Math.sin(timeRef.current + i) * 0.1 + mx * 0.2
      pos[i3 + 1] = initialPositions[i3 + 1] + Math.cos(timeRef.current * 0.7 + i * 0.5) * 0.1 + my * 0.2
      pos[i3 + 2] = initialPositions[i3 + 2] + Math.sin(timeRef.current * 0.5 + i * 0.3) * 0.1
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
