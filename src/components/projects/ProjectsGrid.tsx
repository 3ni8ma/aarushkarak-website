import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import Tag from '../ui/Tag'
import { ExternalLink } from 'lucide-react'

const projects = [
  { title: 'HELIOS', desc: 'Browser-based AI operating system featuring hand-gesture navigation and a 3D spatial interface.', tags: ['Three.js', 'MediaPipe', 'React', 'REST APIs'], color: 'primary' },
  { title: 'Finance Hub', desc: 'Full-stack financial intelligence platform with live market monitoring and AI-driven prediction exploration.', tags: ['Python', 'PostgreSQL', 'React', 'Node.js'], color: 'secondary' },
  { title: 'Knowledge-Globe', desc: 'Interactive 3D encyclopedia visualizing interconnected data nodes across a spatial graph.', tags: ['Three.js', 'JavaScript', 'REST APIs'], color: 'accent' },
  { title: 'FixMate', desc: 'AI-powered home maintenance application with intelligent diagnostics and repair recommendations.', tags: ['AI', 'React', 'Chatbot Design', 'Node.js'], color: 'primary' },
]

export default function ProjectsGrid() {
  return (
    <section className="page-container relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>Projects</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-3xl p-8 group cursor-default relative overflow-hidden hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${p.color} to-${p.color} opacity-80`} style={{ background: p.color === 'primary' ? 'linear-gradient(90deg, #D946EF, #D946EF)' : p.color === 'secondary' ? 'linear-gradient(90deg, #6366F1, #6366F1)' : 'linear-gradient(90deg, #22D3EE, #22D3EE)' }} />
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${
                p.color === 'primary' ? 'from-primary/5 to-transparent' : p.color === 'secondary' ? 'from-secondary/5 to-transparent' : 'from-accent/5 to-transparent'
              }`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-heading font-bold text-light">{p.title}</h3>
                  <ExternalLink size={16} className="text-muted group-hover:text-primary transition-colors mt-1" />
                </div>
                <p className="text-sm text-muted leading-relaxed mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(t => <Tag key={t} color={p.color}>{t}</Tag>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
