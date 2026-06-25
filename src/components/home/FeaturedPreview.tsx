import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const featured = [
  { title: 'HELIOS', desc: 'Browser-based AI OS with hand-gesture navigation and 3D spatial interface.', tags: ['Three.js', 'MediaPipe', 'React'], link: 'https://github.com/3ni8ma/HELIOS' },
  { title: 'Finance Hub', desc: 'Full-stack financial intelligence with live monitoring and AI prediction.', tags: ['Python', 'PostgreSQL', 'React'], link: 'https://github.com/3ni8ma/Finance-Hub' },
]

export default function FeaturedPreview() {
  return (
    <section className="section-container pt-0" aria-label="Featured projects">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-light">Featured <span className="gradient-text">Projects</span></h2>
        <Link to="/projects" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5">
          View all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
          {featured.map((p, i) => (
            <article key={p.title}>
              <div
                onClick={() => window.open(p.link, '_blank', 'noopener,noreferrer')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.open(p.link, '_blank', 'noopener,noreferrer') }}}
                role="link"
                tabIndex={0}
                aria-label={`${p.title} — ${p.desc}`}
                className={`glass rounded-3xl p-8 group relative overflow-hidden hover:bg-white/[0.06] transition-all duration-300 cursor-pointer`}
                style={{ willChange: 'transform' }}
              >
                <div className="h-1 w-16 rounded-full mb-5" style={{ background: '#D946EF' }} />
                <h3 className="text-xl font-heading font-bold text-light mb-2">{p.title}</h3>
                <p className="text-sm text-pop-secondary leading-relaxed mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-pop-primary border border-white/10">{t}</span>
                  ))}
                </div>
              </div>
            </article>
        ))}
      </div>
    </section>
  )
}
