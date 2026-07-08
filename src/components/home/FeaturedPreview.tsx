import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const featured = [
  { title: 'HELIOS', desc: 'Browser-based AI OS with hand-gesture navigation and 3D spatial interface.', tags: ['Three.js', 'MediaPipe', 'React'], link: 'https://github.com/3ni8ma/HELIOS' },
  { title: 'Finance Hub', desc: 'Full-stack financial intelligence with live monitoring and AI prediction.', tags: ['Python', 'PostgreSQL', 'React'], link: 'https://github.com/3ni8ma/Finance-Hub' },
]

export default function FeaturedPreview() {
  return (
    <section className="section-container pt-0" aria-label="Featured projects">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-sans font-light text-light">Featured Projects</h2>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Selected work I am proud of</p>
        </div>
        <Link to="/projects" className="text-xs tracking-[0.15em] uppercase transition-colors flex items-center gap-1.5 shrink-0" style={{ color: 'rgb(var(--color-primary))' }}>
          View all <ArrowRight size={12} />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {featured.map((p) => (
          <ScrollReveal key={p.title}>
            <article
              onClick={() => window.open(p.link, '_blank', 'noopener,noreferrer')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(p.link, '_blank', 'noopener,noreferrer') }}}
              role="link"
              tabIndex={0}
              aria-label={`${p.title} — ${p.desc}`}
              className="card-editorial cursor-pointer"
            >
              <h3 className="text-xl font-sans font-semibold text-light mb-2">{p.title}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(t => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-sm bg-accent-subtle text-accent tracking-wide">
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
