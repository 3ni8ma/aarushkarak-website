import { useEffect, useRef } from 'react'

interface TrailParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const cursor = cursorRef.current
    const canvas = canvasRef.current
    if (!cursor || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let mouseX = -100
    let mouseY = -100
    let cursorX = -100
    let cursorY = -100
    let prevX = -100
    let prevY = -100

    const particles: TrailParticle[] = []
    const MAX_PARTICLES = 20

    function getPrimaryColor() {
      const val = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
      return val || '194 164 255'
    }

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    function onMove(e: MouseEvent) {
      prevX = mouseX
      prevY = mouseY
      mouseX = e.clientX
      mouseY = e.clientY

      const dx = mouseX - prevX
      const dy = mouseY - prevY
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        particles.push({
          x: mouseX,
          y: mouseY,
          vx: dx * 0.05,
          vy: dy * 0.05,
          life: 1,
          maxLife: 0.6 + Math.random() * 0.4,
          size: 3 + Math.random() * 4,
        })
        if (particles.length > MAX_PARTICLES) particles.shift()
      }
    }

    function onOver() {
      if (!cursor) return
      cursor.style.width = '32px'
      cursor.style.height = '32px'
      cursor.style.borderWidth = '1.5px'
    }

    function onOut() {
      if (!cursor) return
      cursor.style.width = '16px'
      cursor.style.height = '16px'
      cursor.style.borderWidth = '2px'
    }

    document.addEventListener('mousemove', onMove)
    const interactive = document.querySelectorAll('a, button, [data-cursor]')
    interactive.forEach(el => {
      el.addEventListener('mouseenter', onOver)
      el.addEventListener('mouseleave', onOut)
    })

    let lastTime = 0

    function animate(time: number) {
      if (!cursor || !canvas || !ctx) return
      const dt = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time

      cursorX += (mouseX - cursorX) * 0.12
      cursorY += (mouseY - cursorY) * 0.12
      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const rgb = getPrimaryColor()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life -= dt / p.maxLife
        p.x += p.vx * dt * 20
        p.y += p.vy * dt * 20
        p.vx *= 0.95
        p.vy *= 0.95
        p.size *= 0.98

        if (p.life <= 0 || p.size < 0.1) {
          particles.splice(i, 1)
          continue
        }

        const alpha = p.life * 0.3
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      interactive.forEach(el => {
        el.removeEventListener('mouseenter', onOver)
        el.removeEventListener('mouseleave', onOut)
      })
    }
  }, [])

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return null

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99999998]"
        aria-hidden="true"
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999999] rounded-full"
        style={{
          width: '16px',
          height: '16px',
          border: '2px solid rgb(var(--color-primary))',
          backgroundColor: 'transparent',
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s, border-width 0.2s',
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />
    </>
  )
}
