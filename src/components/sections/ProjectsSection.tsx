import { useRef, useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { use3DTilt } from '../../hooks/use3DTilt'

const projects = [
  { title: 'HELIOS', desc: 'Browser-based AI operating system with hand-gesture navigation and a 3D spatial interface.', tags: ['Three.js', 'MediaPipe', 'React'], color: 'var(--color-primary)', link: 'https://github.com/3ni8ma/HELIOS' },
  { title: 'Finance Hub', desc: 'Full-stack financial intelligence platform with live market monitoring and AI prediction.', tags: ['Python', 'PostgreSQL', 'React'], color: 'var(--color-secondary)', link: 'https://github.com/3ni8ma/Finance-Hub' },
  { title: 'Knowledge-Globe', desc: 'Interactive 3D encyclopedia visualizing interconnected data nodes across a spatial graph.', tags: ['Three.js', 'JavaScript', 'REST APIs'], color: 'var(--color-accent)', link: 'https://github.com/3ni8ma/Knowledge-Globe' },
  { title: 'FixMate', desc: 'AI-powered home maintenance application with intelligent diagnostics and repair recommendations.', tags: ['AI', 'React', 'Node.js'], color: 'var(--color-primary)', link: 'https://github.com/3ni8ma/Fixmate-App' },
]

function getTagColor(color: string) {
  if (color === 'var(--color-secondary)') return { bg: 'rgba(168,124,255,0.08)', text: 'rgb(168,124,255)' }
  if (color === 'var(--color-accent)') return { bg: 'rgba(34,211,238,0.08)', text: 'rgb(34,211,238)' }
  return { bg: 'rgba(194,164,255,0.08)', text: 'rgb(194,164,255)' }
}

function ProjectCard({ p }: { p: typeof projects[number] }) {
  const tilt = use3DTilt(6)
  const tc = getTagColor(p.color)

  return (
    <article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="card-minimal shrink-0 w-[350px] sm:w-[400px] lg:w-[480px] group cursor-pointer transition-shadow duration-300"
      style={{ transition: 'box-shadow 0.3s ease, border-color 0.3s ease', transformStyle: 'preserve-3d' }}
      onClick={() => window.open(p.link, '_blank', 'noopener,noreferrer')}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(p.link, '_blank', 'noopener,noreferrer') }}}
      role="link"
      tabIndex={0}
      aria-label={`${p.title} — ${p.desc}`}
    >
      <div className="flex items-start justify-between mb-4" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-xl font-sans font-medium text-light">{p.title}</h3>
        <ExternalLink size={16} className="text-muted group-hover:text-primary transition-colors mt-1" />
      </div>
      <p className="text-sm text-muted-light leading-relaxed mb-5" style={{ transform: 'translateZ(15px)' }}>{p.desc}</p>
      <div className="flex flex-wrap gap-2" style={{ transform: 'translateZ(10px)' }}>
        {p.tags.map(t => (
          <span
            key={t}
            className="text-xs px-3 py-1 rounded-full"
            style={{ backgroundColor: tc.bg, color: tc.text }}
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const container = containerRef.current
      const track = trackRef.current
      if (!container || !track) return

      const windowH = window.innerHeight
      const scrolled = window.scrollY - container.offsetTop + windowH
      const maxScroll = container.scrollHeight - windowH + windowH
      const p = Math.max(0, Math.min(scrolled / (maxScroll || 1), 1))
      setProgress(p)

      const maxTranslate = track.scrollWidth - window.innerWidth
      if (maxTranslate > 0) {
        track.style.transform = `translateX(${-p * maxTranslate}px)`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative" style={{ height: '300vh' }} aria-label="Projects">
      <div
        ref={containerRef}
        className="sticky top-0 h-screen flex items-center overflow-hidden bg-section-gradient"
      >
        <div className="section-container w-full">
          <ScrollReveal>
            <h2 className="section-heading">My Work</h2>
          </ScrollReveal>
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform"
            style={{ perspective: '1200px', transition: 'transform 0.05s linear' }}
          >
            {projects.map(p => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1 items-center">
            <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${progress * 100}%`, backgroundColor: 'rgb(var(--color-primary))' }}
              />
            </div>
            <span className="text-xs text-muted-light ml-2 font-mono">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
