import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

const tags = [
  'Software Developer',
  'Spatial Computing',
  'Full-Stack',
  'AI & ML',
  'Open Source',
]

const typewriterWords = [
  'Build. Create. Innovate.',
  'Crafting digital experiences.',
  'Code meets creativity.',
  'Ideas into reality.',
]

const stars = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  size: Math.random() * 2.5 + 0.5,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
  duration: Math.random() * 3 + 2,
  opacity: Math.random() * 0.5 + 0.2,
}))

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [complete, setComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [typewriterIndex, setTypewriterIndex] = useState(0)
  const [typewriterText, setTypewriterText] = useState('')
  const [typewriterPhase, setTypewriterPhase] = useState<'typing' | 'waiting' | 'deleting'>('typing')
  const [tagIndex, setTagIndex] = useState(0)
  const { setRevealStarted } = useTheme()
  const [burst, setBurst] = useState(false)
  const burstRef = useRef(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)

  useEffect(() => {
    burstRef.current = burst
  }, [burst])

  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex(i => (i + 1) % tags.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!loading) return
    const tick = () => {
      progressRef.current = Math.min(progressRef.current + Math.random() * 4 + 1, 100)
      setProgress(Math.round(progressRef.current))
      if (progressRef.current < 100) {
        requestAnimationFrame(tick)
      }
    }
    const timer = setTimeout(() => requestAnimationFrame(tick), 400)
    return () => clearTimeout(timer)
  }, [loading])

  useEffect(() => {
    if (!loading) return
    let timeout: ReturnType<typeof setTimeout>

    const currentWord = typewriterWords[typewriterIndex]

    if (typewriterPhase === 'typing') {
      if (typewriterText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setTypewriterText(currentWord.slice(0, typewriterText.length + 1))
        }, 40 + Math.random() * 30)
      } else {
        timeout = setTimeout(() => setTypewriterPhase('waiting'), 1800)
      }
    } else if (typewriterPhase === 'waiting') {
      timeout = setTimeout(() => setTypewriterPhase('deleting'), 200)
    } else if (typewriterPhase === 'deleting') {
      if (typewriterText.length > 0) {
        timeout = setTimeout(() => {
          setTypewriterText(typewriterText.slice(0, -1))
        }, 20 + Math.random() * 15)
      } else {
        setTypewriterIndex(i => (i + 1) % typewriterWords.length)
        setTypewriterPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [typewriterText, typewriterPhase, typewriterIndex, loading])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !loading) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles = stars.map(s => ({
      ...s,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      life: 1,
    }))

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function getPrimaryColor() {
      const val = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
      return val || '194 164 255'
    }

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const rgb = getPrimaryColor()

      particles.forEach(p => {
        if (burstRef.current) {
          const dx = p.x - 50
          const dy = p.y - 50
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          p.vx += (dx / dist) * 0.4
          p.vy += (dy / dist) * 0.4
          p.life -= 0.015
          p.size *= 0.997
        } else {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > 100) p.vx *= -1
          if (p.y < 0 || p.y > 100) p.vy *= -1
        }

        if (p.size < 0.05 || p.life <= 0) return

        const alpha = burstRef.current
          ? Math.max(0, p.life) * 0.4
          : p.opacity * (0.6 + 0.4 * Math.sin(Date.now() / 1000 * p.duration + p.delay))

        ctx.beginPath()
        ctx.arc(
          (p.x / 100) * canvas.width,
          (p.y / 100) * canvas.height,
          p.size,
          0,
          Math.PI * 2,
        )
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [loading])

  const handleClick = useCallback(() => {
    if (progress < 100) return
    setClicked(true)
    setBurst(true)
    setRevealStarted(true)
    setTimeout(() => {
      setComplete(true)
    }, 500)
    setTimeout(() => {
      setLoading(false)
    }, 1100)
  }, [progress, setRevealStarted])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#0b080c' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          />

          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(var(--color-primary), 0.15), transparent 70%)',
                animation: 'loadingOrbA 8s ease-in-out infinite',
              }}
            />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15"
              style={{
                background: 'radial-gradient(circle, rgba(var(--color-secondary), 0.12), transparent 70%)',
                animation: 'loadingOrbB 10s ease-in-out infinite',
              }}
            />
          </div>

          <div
            className={`loading-wrap ${clicked ? 'loading-clicked' : ''} ${complete ? 'loading-complete' : ''}`}
          >
            <div className="loading-hover" />

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="loading-content"
            >
              <div className="loading-content-in">
                <div className="loading-content2">
                  <div className="loading-container">
                    <span>AK</span>
                    <div className="loading-box" />
                    <div className="loading-ring" />
                    <div className="loading-ring loading-ring-reverse" />
                  </div>

                  <motion.div
                    className="loading-icon"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={complete ? { scale: 1, opacity: 1 } : {}}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ stroke: 'rgb(var(--color-primary))' }} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>
                </div>
              </div>

              <div className="loading-progress-track">
                <motion.div
                  className="loading-progress-bar"
                  style={{ width: `${progress}%` }}
                  layout
                />
              </div>

              <span className="loading-progress-text">{progress}%</span>
            </motion.div>

            <div className="loading-typewriter">
              <span className="loading-typewriter-text">{typewriterText}</span>
              <span className="loading-typewriter-cursor">|</span>
            </div>

            <div className="loading-tag-wrapper">
              <AnimatePresence mode="wait">
                <motion.span
                  key={tags[tagIndex]}
                  className="loading-tag"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {tags[tagIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.button
              ref={btnRef}
              onClick={handleClick}
              className={`loading-button ${progress >= 100 ? 'loading-button-ready' : ''}`}
              aria-label="Enter website"
              whileHover={progress >= 100 ? { scale: 1.05 } : {}}
              whileTap={progress >= 100 ? { scale: 0.97 } : {}}
            >
              <span>{progress >= 100 ? 'Enter the Verse' : 'Loading...'}</span>
              <div className="loading-hover" style={{ opacity: 0 }} />
            </motion.button>
          </div>

          <div className="fixed bottom-10 left-0 w-full overflow-hidden pointer-events-none">
            <div className="loading-marquee whitespace-nowrap text-[40px] sm:text-[60px] lg:text-[100px] font-semibold uppercase opacity-[0.04]">
              <span className="inline-block animate-marquee">
                Software Developer &mdash; Spatial Computing &mdash; Full-Stack &mdash; AI &mdash;
              </span>
              <span className="inline-block animate-marquee2">
                Software Developer &mdash; Spatial Computing &mdash; Full-Stack &mdash; AI &mdash;
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
