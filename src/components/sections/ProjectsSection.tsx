import { ExternalLink } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const projects = [
  { title: 'HELIOS', desc: 'Browser-based AI operating system with hand-gesture navigation and a 3D spatial interface.', tags: ['Three.js', 'MediaPipe', 'React'], link: 'https://github.com/3ni8ma/HELIOS' },
  { title: 'Finance Hub', desc: 'Full-stack financial intelligence platform with live market monitoring and AI prediction.', tags: ['Python', 'PostgreSQL', 'React'], link: 'https://github.com/3ni8ma/Finance-Hub' },
  { title: 'Knowledge-Globe', desc: 'Interactive 3D encyclopedia visualizing interconnected data nodes across a spatial graph.', tags: ['Three.js', 'JavaScript', 'REST APIs'], link: 'https://github.com/3ni8ma/Knowledge-Globe' },
  { title: 'FixMate', desc: 'AI-powered home maintenance application with intelligent diagnostics and repair recommendations.', tags: ['AI', 'React', 'Node.js'], link: 'https://github.com/3ni8ma/Fixmate-App' },
]

export default function ProjectsSection() {
  return (
    <section className="section-container py-24 sm:py-32" aria-label="Projects">
      <ScrollReveal>
        <h2 className="section-heading mb-12">My Work</h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 0.08}>
            <article
              onClick={() => window.open(p.link, '_blank', 'noopener,noreferrer')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(p.link, '_blank', 'noopener,noreferrer') }}}
              role="link"
              tabIndex={0}
              aria-label={`${p.title} — ${p.desc}`}
              className="card-editorial cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-sans font-semibold text-light">{p.title}</h3>
                <ExternalLink size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }} />
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(t => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-sm bg-accent-subtle text-accent">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
