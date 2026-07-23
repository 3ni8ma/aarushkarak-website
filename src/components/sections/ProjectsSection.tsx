import { ExternalLink } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { use3DTilt } from '../../hooks/use3DTilt'

const projects = [
  { title: 'HELIOS', desc: 'Browser-based AI operating system with hand-gesture navigation and a 3D spatial interface.', tags: ['Three.js', 'MediaPipe', 'React'], link: 'https://github.com/3ni8ma/HELIOS' },
  { title: 'Finance Hub', desc: 'Full-stack financial intelligence platform with live market monitoring and AI prediction.', tags: ['Python', 'PostgreSQL', 'React'], link: 'https://github.com/3ni8ma/Finance-Hub' },
  { title: 'Knowledge-Globe', desc: 'Interactive 3D encyclopedia visualizing interconnected data nodes across a spatial graph.', tags: ['Three.js', 'JavaScript', 'REST APIs'], link: 'https://github.com/3ni8ma/Knowledge-Globe' },
  { title: 'FixMate', desc: 'AI-powered home maintenance application with intelligent diagnostics and repair recommendations.', tags: ['AI', 'React', 'Node.js'], link: 'https://github.com/3ni8ma/Fixmate-App' },
]

function ProjectCard({ p, index }: { p: typeof projects[number]; index: number }) {
  const tilt = use3DTilt(4)

  return (
    <ScrollReveal delay={index * 0.1}>
      <article
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="card-minimal group cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => window.open(p.link, '_blank', 'noopener,noreferrer')}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(p.link, '_blank', 'noopener,noreferrer') }}}
        role="link"
        tabIndex={0}
        aria-label={`${p.title} — ${p.desc}`}
      >
        <div style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-pop-primary text-base font-semibold">{p.title}</h3>
            <ExternalLink size={15} className="shrink-0 mt-1" style={{ color: 'var(--text-muted)' }} />
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
          <div className="flex flex-wrap gap-2">
            {p.tags.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}

export default function ProjectsSection() {
  return (
    <section className="w-full px-6 lg:px-10 page-container" aria-label="Projects">
      <div className="max-w-6xl">
        <ScrollReveal>
          <span className="tag">My Work</span>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
