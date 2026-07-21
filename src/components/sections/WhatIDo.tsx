import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Cpu, Globe, Box, DollarSign } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const items = [
  {
    id: 'ai',
    title: 'AI Developer',
    icon: Cpu,
    desc: 'Building intelligent systems with machine learning, deep learning, and natural language processing. I create AI agents and chatbots that solve real problems.',
    tags: ['Python', 'TensorFlow', 'LLMs', 'NLP'],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    icon: Globe,
    desc: 'Modern web applications with React, TypeScript, Node.js, and PostgreSQL. From concept to deployment, I build scalable full-stack solutions.',
    tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    id: 'spatial',
    title: 'Spatial Computing',
    icon: Box,
    desc: '3D interfaces and gesture-controlled systems using Three.js, MediaPipe, and WebXR. Pushing the boundaries of how we interact with software.',
    tags: ['Three.js', 'MediaPipe', 'WebXR'],
  },
  {
    id: 'freelance',
    title: 'Freelance & Leadership',
    icon: DollarSign,
    desc: 'Over $5,000 in freelance revenue on Fiverr. Founder of The Coder Bros, a student-led tech initiative showcasing AI and web projects.',
    tags: ['Fiverr', 'Leadership', 'Community'],
  },
]

export default function WhatIDo() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="w-full px-6 lg:px-10 section-pad" aria-label="What I do">
      <div className="max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/3 shrink-0">
            <ScrollReveal>
              <span className="section-label">What I Do</span>
              <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Technologies and disciplines I work with daily to build impactful digital experiences.
              </p>
            </ScrollReveal>
          </div>
          <div className="flex-1 space-y-3">
            {items.map((item, i) => {
              const Icon = item.icon
              const isOpen = active === item.id
              return (
                <ScrollReveal key={item.id} delay={i * 0.08}>
                  <div
                    onClick={() => setActive(isOpen ? null : item.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(isOpen ? null : item.id) }}}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    className="card cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#D5F74C', color: '#000' }}>
                          <Icon size={18} />
                        </div>
                        <h3 className="heading-md !text-base">{item.title}</h3>
                      </div>
                      <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2">
                        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map(t => (
                            <span key={t} className="tag">{t}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
