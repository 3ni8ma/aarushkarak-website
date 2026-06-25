import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#D946EF') },
    uColor2: { value: new THREE.Color('#6366F1') },
    uColor3: { value: new THREE.Color('#22D3EE') },
  }), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 30

    const count = 2000
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 15 + Math.random() * 15
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
      sizes[i] = Math.random() * 3 + 1
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        attribute float size;
        uniform float uTime;
        varying float vAlpha;
        void main() {
          vec3 pos = position;
          float angle = uTime * 0.1;
          float c = cos(angle);
          float s = sin(angle);
          mat3 rot = mat3(c, 0, s, 0, 1, 0, -s, 0, c);
          pos = rot * pos;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = 0.3 + 0.7 * (1.0 - abs(pos.y) / 30.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying float vAlpha;
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
          vec3 color = mix(mix(uColor1, uColor2, gl_PointCoord.x), uColor3, gl_PointCoord.y);
          gl_FragColor = vec4(color, alpha * 0.35);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
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
    window.addEventListener('mousemove', onMouseMove)

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    let clock = new THREE.Clock()

    function animate() {
      uniforms.uTime.value += 0.005

      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05
      points.rotation.x += (targetY * 0.2 - points.rotation.x) * 0.02
      points.rotation.y += (targetX * 0.3 - points.rotation.y) * 0.02

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [uniforms])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
