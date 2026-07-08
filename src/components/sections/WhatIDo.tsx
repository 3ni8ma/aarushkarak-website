import ScrollReveal from '../ui/ScrollReveal'
import { Cpu, Globe, Box, DollarSign } from 'lucide-react'

const items = [
  { id: 'ai', title: 'AI Developer', icon: Cpu, desc: 'Building intelligent systems with machine learning, deep learning, and natural language processing.', tags: ['Python', 'TensorFlow', 'LLMs', 'NLP'] },
  { id: 'fullstack', title: 'Full-Stack Developer', icon: Globe, desc: 'Modern web applications with React, TypeScript, Node.js, and PostgreSQL.', tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'] },
  { id: 'spatial', title: 'Spatial Computing', icon: Box, desc: '3D interfaces and gesture-controlled systems using Three.js, MediaPipe, and WebXR.', tags: ['Three.js', 'MediaPipe', 'WebXR'] },
  { id: 'freelance', title: 'Freelance & Leadership', icon: DollarSign, desc: 'Over $5,000 in freelance revenue on Fiverr. Founder of The Coder Bros.', tags: ['Fiverr', 'Leadership', 'Community'] },
]

export default function WhatIDo() {
  return (
    <section className="section-container" aria-label="What I do">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="lg:w-1/3 shrink-0">
          <ScrollReveal>
            <h2 className="section-heading mb-4">What I Do</h2>
            <p className="leading-relaxed text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Technologies and disciplines I work with daily to build impactful digital experiences.
            </p>
          </ScrollReveal>
        </div>
        <div className="flex-1 space-y-4">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <ScrollReveal key={item.id} delay={i * 0.08}>
                <div className="card-editorial">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={16} style={{ color: 'rgb(var(--color-primary))' }} />
                    <h3 className="text-sm font-medium text-light tracking-wide">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map(t => (
                      <span key={t} className="text-[11px] px-2.5 py-1 rounded-sm bg-accent-subtle text-accent">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
