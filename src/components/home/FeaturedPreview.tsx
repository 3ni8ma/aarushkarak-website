import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { use3DTilt } from '../../hooks/use3DTilt'

const featured = [
  { title: 'HELIOS', desc: 'Browser-based AI OS with hand-gesture navigation and 3D spatial interface.', tags: ['Three.js', 'MediaPipe', 'React'], link: 'https://github.com/3ni8ma/HELIOS' },
  { title: 'Finance Hub', desc: 'Full-stack financial intelligence with live monitoring and AI prediction.', tags: ['Python', 'PostgreSQL', 'React'], link: 'https://github.com/3ni8ma/Finance-Hub' },
]

function FeaturedCard({ p, index }: { p: typeof featured[number]; index: number }) {
  const tilt = use3DTilt(4)

  return (
    <ScrollReveal delay={index * 0.1}>
      <article
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        onClick={() => window.open(p.link, '_blank', 'noopener,noreferrer')}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(p.link, '_blank', 'noopener,noreferrer') }}}
        role="link"
        tabIndex={0}
        aria-label={`${p.title} — ${p.desc}`}
        className="card-minimal group cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div style={{ transform: 'translateZ(20px)' }}>
          <div className="w-10 h-1 rounded-full mb-6" style={{ background: 'rgb(var(--color-primary))' }} />
          <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}

export default function FeaturedPreview() {
  return (
    <section className="w-full px-6 lg:px-10 page-container" aria-label="Featured projects">
      <div className="flex items-center justify-between mb-12">
        <h2 className="section-heading !mb-0">Featured Projects</h2>
        <Link to="/projects" className="btn-primary !py-2 !px-5 text-xs" style={{ background: 'transparent', borderColor: 'var(--border-subtle)' }}>
          View all <ArrowRight size={13} />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {featured.map((p, i) => (
          <FeaturedCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </section>
  )
}
