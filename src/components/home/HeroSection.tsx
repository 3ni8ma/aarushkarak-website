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
            <span className="inline-flex items-center gap-1.5 text-sm text-pop-accent mb-6 font-body tracking-wide">
              <MapPin size={14} /> Greater Toronto Area, Canada
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading font-bold text-light leading-[1.05] mb-6 tracking-tight text-glow-primary">
              Aarush <br className="sm:hidden" />
              <span className="gradient-text-shimmer">Karak</span>
            </h1>
            <div className="frosted p-6 md:p-8 lg:p-10 space-y-4">
              <p className="text-base sm:text-lg md:text-xl text-pop-primary max-w-2xl leading-relaxed font-normal">
                Sophomore @ John Fraser Secondary School &middot; Founder @ The Coder Bros
              </p>
              <p className="text-sm md:text-base text-pop-accent max-w-2xl leading-relaxed font-normal">
                Software Developer &middot; Maker Studio Intern @ Sci-Tech &middot; TSA Parliamentarian &middot; App Developer @ Hack Club
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                <Link to="/projects" className="px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary/80 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50">
                  View my work
                </Link>
                <Link to="/contact" className="px-8 py-3.5 rounded-full glass text-light font-semibold text-sm hover:bg-white/10 transition-all border border-white/10">
                  Get in touch
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://github.com/3ni8ma" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <defs>
                    <linearGradient id="github-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#D946EF" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#github-grad)" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/aarush-karak-260257321" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <defs>
                    <linearGradient id="linkedin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#D946EF" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#linkedin-grad)" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-pop-primary hover:text-primary transition-colors"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  )
}
