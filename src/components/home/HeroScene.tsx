import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { useThemeColors } from '../../hooks/useThemeColors'
import SceneManager from '../three/SceneManager'
import FloatingGeometry from '../three/FloatingGeometry'

function MouseTracker() {
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.03
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.03
    if (groupRef.current) {
      groupRef.current.rotation.x = currentRef.current.y * 0.15
      groupRef.current.rotation.y = currentRef.current.x * 0.2
    }
  })

  useMemo(() => {
    function onMouse(e: MouseEvent) {
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      targetRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  return <group ref={groupRef} />
}

function HeroParticles({ count = 300 }: { count?: number }) {
  const colors = useThemeColors()

  const [positions, sizes, colorArray] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 3 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = radius * Math.cos(phi)
      siz[i] = Math.random() * 3 + 0.5

      const c = [colors.primary, colors.secondary, colors.accent][Math.floor(Math.random() * 3)]
      col[i3] = c.r
      col[i3 + 1] = c.g
      col[i3 + 2] = c.b
    }
    return [pos, siz, col]
  }, [count, colors])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))
    return geo
  }, [positions, sizes, colorArray])

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.08,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
    sizeAttenuation: true,
  }), [])

  return <points geometry={geometry} material={material} />
}

export default function HeroScene() {
  const colors = useThemeColors()

  return (
    <SceneManager cameraZ={10}>
      <MouseTracker />
      <HeroParticles count={400} />

      <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <FloatingGeometry
          shape="torusKnot"
          position={[-4.5, 2.5, -4]}
          color={colors.primary}
          size={0.5}
          speed={1.2}
          opacity={0.5}
        />
      </Float>

      <Float speed={0.7} rotationIntensity={0.4} floatIntensity={0.3}>
        <FloatingGeometry
          shape="icosahedron"
          position={[5, -1.5, -3]}
          color={colors.secondary}
          size={0.4}
          speed={0.8}
          opacity={0.4}
        />
      </Float>

      <Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.5}>
        <FloatingGeometry
          shape="dodecahedron"
          position={[-3, -2.5, -6]}
          color={colors.accent}
          size={0.35}
          speed={1.5}
          opacity={0.35}
        />
      </Float>

      <Float speed={0.6} rotationIntensity={0.35} floatIntensity={0.4}>
        <FloatingGeometry
          shape="octahedron"
          position={[4, 3, -5]}
          color={colors.primary}
          size={0.3}
          speed={0.9}
          opacity={0.45}
        />
      </Float>

      <Float speed={0.3} rotationIntensity={0.25} floatIntensity={0.35}>
        <FloatingGeometry
          shape="torusKnot"
          position={[0, -3, -7]}
          color={colors.accent}
          size={0.45}
          speed={1.1}
          opacity={0.3}
        />
      </Float>
    </SceneManager>
  )
}
