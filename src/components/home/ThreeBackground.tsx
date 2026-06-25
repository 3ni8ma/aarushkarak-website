import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../contexts/ThemeContext'

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('webgl2')
      if (!gl) { setSupported(false); return }
    } catch {
      setSupported(false)
      return
    }

    let renderer: THREE.WebGLRenderer
    let animId: number

    function getColors() {
      const cs = getComputedStyle(document.documentElement)
      const p = cs.getPropertyValue('--color-primary').trim().split(' ').map(Number)
      const s = cs.getPropertyValue('--color-secondary').trim().split(' ').map(Number)
      const a = cs.getPropertyValue('--color-accent').trim().split(' ').map(Number)
      return {
        primary: new THREE.Color(p[0] / 255, p[1] / 255, p[2] / 255),
        secondary: new THREE.Color(s[0] / 255, s[1] / 255, s[2] / 255),
        accent: new THREE.Color(a[0] / 255, a[1] / 255, a[2] / 255),
      }
    }

    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch {
      setSupported(false)
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
    camera.position.z = 35

    const count = 1500
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 5 + Math.random() * 25
      positions[i3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = r * Math.cos(phi)
      sizes[i] = Math.random() * 2 + 0.5
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: 0.15,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: false,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    function onMouseMove(e: MouseEvent) {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      if (w === 0 || h === 0) return
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    function animate() {
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05
      points.rotation.x += (targetY * 0.2 - points.rotation.x) * 0.02
      points.rotation.y += (targetX * 0.3 - points.rotation.y) * 0.02

      const cols = getColors()
      const avg = new THREE.Color().addColors(cols.primary, cols.secondary).add(cols.accent).multiplyScalar(1 / 3)
      material.color.copy(avg)

      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [theme])

  if (!supported) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
