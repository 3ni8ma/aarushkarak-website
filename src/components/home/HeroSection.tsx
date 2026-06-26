import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown, MapPin } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const sparkles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  angle: (i / 8) * 360,
  delay: i * 0.3,
}))

export default function HeroSection() {
  const { revealStarted } = useTheme()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero introduction">
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-20 animate-orb pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(var(--color-primary), 0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full opacity-20 animate-orb pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(var(--color-secondary), 0.15) 0%, transparent 70%)', filter: 'blur(50px)', animationDelay: '-3s' }} aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 animate-orb pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(var(--color-accent), 0.1) 0%, transparent 70%)', filter: 'blur(80px)', animationDelay: '-5s' }} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 justify-center">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={revealStarted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05, duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm mb-4 tracking-[2px] uppercase text-pop-accent">
                <MapPin size={12} /> Greater Toronto Area, Canada
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={revealStarted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-sans font-bold text-light leading-[1.05] mb-6 tracking-tight">
                Aarush <br className="sm:hidden" />
                <span className="gradient-text-shimmer">Karak</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={revealStarted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="frosted p-6 sm:p-8 lg:p-10 space-y-5">
                <p className="text-base sm:text-lg md:text-xl text-light/90 max-w-2xl leading-relaxed font-medium">
                  Sophomore &middot; Founder &middot; Developer
                </p>
                <p className="text-sm sm:text-base text-pop-secondary max-w-2xl leading-relaxed">
                  Full-stack &amp; spatial computing engineer &mdash; building across AI, 3D, and the modern web.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
                  <Link to="/projects" className="px-7 py-3 rounded-full text-white font-semibold text-sm hover:opacity-80 transition-all shadow-lg" style={{ backgroundColor: 'rgb(var(--color-primary))', boxShadow: '0 0 24px rgba(var(--color-primary), 0.25)' }}>
                    View my work
                  </Link>
                  <Link to="/contact" className="px-7 py-3 rounded-full text-sm font-semibold text-light hover:bg-white/10 transition-all border border-white/10">
                    Get in touch
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealStarted ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-center md:justify-start gap-3 mt-6" role="list" aria-label="Social links">
                <a href="https://github.com/3ni8ma" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110" aria-label="GitHub profile">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" aria-hidden="true" fill="rgb(var(--color-primary))">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/aarush-karak-260257321" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110" aria-label="LinkedIn profile">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" aria-hidden="true" fill="rgb(var(--color-primary))">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={revealStarted ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 hidden md:block"
            style={{ perspective: '800px' }}
          >
            <div className="relative animate-glow-pulse" style={{ willChange: 'transform' }}>
              <div className="profile-glow animate-float-3d">
                <img
                  src="/images/profile.jpg"
                  alt="Aarush Karak — Software Developer"
                  className="w-48 lg:w-56 aspect-[3/4] object-cover"
                  loading="eager"
                />
              </div>
              {sparkles.map(s => (
                <div
                  key={s.id}
                  className="absolute w-1.5 h-1.5 rounded-full animate-sparkle pointer-events-none"
                  style={{
                    backgroundColor: 'rgb(var(--color-accent))',
                    left: `${50 + 55 * Math.cos((s.angle * Math.PI) / 180)}%`,
                    top: `${50 + 55 * Math.sin((s.angle * Math.PI) / 180)}%`,
                    animationDelay: `${s.delay}s`,
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={revealStarted ? { opacity: 1, y: [0, 6, 0] } : {}}
        transition={{ opacity: { delay: 0.9, duration: 0.5 }, y: { delay: 0.9, duration: 1.5, repeat: Infinity } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-pop-primary hover:text-primary transition-colors"
        aria-label="Scroll to statistics"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  )
}
