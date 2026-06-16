import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import GlassCard from '../ui/GlassCard'

const featured = [
  { title: 'HELIOS', desc: 'Browser-based AI OS with hand-gesture navigation and 3D spatial interface.', tags: ['Three.js', 'MediaPipe', 'React'], color: 'primary' },
  { title: 'Finance Hub', desc: 'Full-stack financial intelligence with live monitoring and AI prediction.', tags: ['Python', 'PostgreSQL', 'React'], color: 'secondary' },
]

export default function FeaturedPreview() {
  return (
    <section className="section-container pt-0">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-light">Featured <span className="gradient-text">Projects</span></h2>
        <Link to="/projects" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5">
          View all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {featured.map((p, i) => (
          <GlassCard key={p.title} delay={i * 0.1}>
            <div className={`h-1 w-16 rounded-full bg-${p.color} mb-5`} style={{ background: p.color === 'primary' ? '#D946EF' : '#6366F1' }} />
            <h3 className="text-xl font-heading font-bold text-light mb-2">{p.title}</h3>
            <p className="text-sm text-muted leading-relaxed mb-5">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map(t => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-muted border border-white/10">{t}</span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
