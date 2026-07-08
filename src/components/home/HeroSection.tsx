import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero introduction">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.5 }}
      >
        <source src="/videos/hero-motion.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, rgba(9,9,9,0.3) 0%, rgba(9,9,9,0.6) 50%, rgba(9,9,9,0.9) 100%)'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs tracking-[0.25em] uppercase mb-6"
            style={{ color: 'var(--text-muted)' }}
          >
            Aarush Karak &mdash; Greater Toronto Area
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-sans font-bold text-light leading-[1.05] mb-6 tracking-tight"
          >
            Developer &amp;
            <br />
            <span style={{ color: 'rgb(var(--color-primary))' }}>Creator</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base max-w-xl leading-relaxed mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            Full-stack &amp; spatial computing engineer building across AI, 3D, and the modern web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/projects"
              className="px-6 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-200"
              style={{
                background: 'rgb(var(--color-primary))',
                color: '#fff',
              }}
            >
              View projects
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 text-xs tracking-[0.15em] uppercase font-medium text-light transition-all duration-200"
              style={{ border: '1px solid var(--border-subtle)' }}
            >
              Get in touch
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 4, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.5 }, y: { delay: 1, duration: 1.5, repeat: Infinity } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted hover:text-light transition-colors"
        aria-label="Scroll to statistics"
      >
        <ArrowDown size={18} />
      </motion.a>
    </section>
  )
}
