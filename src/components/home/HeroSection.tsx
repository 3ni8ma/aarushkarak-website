import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown, MapPin } from 'lucide-react'
import { useTilt } from '../../hooks/useTilt'

const sparkles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  angle: (i / 8) * 360,
  delay: i * 0.3,
}))

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tiltRef = useTilt(12, 1.03)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
      })
    }

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      particles.forEach(p => {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        grad.addColorStop(0, 'rgba(217,70,239,0.25)')
        grad.addColorStop(1, 'rgba(217,70,239,0)')
        ctx.fillStyle = grad
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill()
      })
      ctx.strokeStyle = 'rgba(99,102,241,0.06)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 150) {
            ctx.globalAlpha = 1 - d / 150
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] animate-orb pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-secondary/20 blur-[100px] animate-orb pointer-events-none" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[140px] animate-orb pointer-events-none" style={{ animationDelay: '-5s' }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 justify-center"
        >
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-sm text-muted mb-6 font-body tracking-wide">
              <MapPin size={14} /> Greater Toronto Area, Canada
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading font-bold text-light leading-[1.05] mb-4 tracking-tight">
              Aarush <br className="sm:hidden" />
              <span className="gradient-text">Karak</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-3 font-light">
              Sophomore @ John Fraser Secondary School &middot; Founder @ The Coder Bros
            </p>
            <p className="text-sm md:text-base text-muted/50 max-w-2xl leading-relaxed mb-8 font-light">
              Software Developer &middot; Maker Studio Intern @ Sci-Tech &middot; TSA Parliamentarian &middot; App Developer @ Hack Club
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Link to="/projects" className="px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary/80 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50">
                View my work
              </Link>
              <Link to="/contact" className="px-8 py-3.5 rounded-full glass text-light font-semibold text-sm hover:bg-white/10 transition-all border border-white/10">
                Get in touch
              </Link>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://github.com/3ni8ma" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110">
                <img src="/images/logos/github.svg" alt="GitHub" className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/aarush-karak-260257321" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110">
                <img src="/images/logos/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div ref={tiltRef} className="shrink-0 hidden md:block" style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}>
            <div className="relative animate-glow-pulse">
              <div className="profile-glow animate-float-3d">
                <img
                  src="/images/profile.jpg"
                  alt="Aarush Karak"
                  className="w-48 lg:w-56 aspect-[3/4] object-cover"
                />
              </div>
              {sparkles.map(s => (
                <div
                  key={s.id}
                  className="absolute w-1.5 h-1.5 rounded-full bg-accent animate-sparkle pointer-events-none"
                  style={{
                    left: `${50 + 55 * Math.cos((s.angle * Math.PI) / 180)}%`,
                    top: `${50 + 55 * Math.sin((s.angle * Math.PI) / 180)}%`,
                    animationDelay: `${s.delay}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.2 }, y: { delay: 1.2, duration: 1.5, repeat: Infinity } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted hover:text-primary transition-colors"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  )
}
