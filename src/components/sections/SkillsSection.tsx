import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Award, ScrollText, ExternalLink } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const tabs = [
  { id: 'skills' as const, label: 'Skills', icon: Code },
  { id: 'certifications' as const, label: 'Certifications', icon: ScrollText },
  { id: 'honors' as const, label: 'Honors', icon: Award },
]

const skills = ['Python', 'JavaScript', 'HTML/CSS', 'Java', 'C++', 'Three.js', 'MediaPipe', 'REST APIs', 'Arduino IDE', 'Chatbot Design', 'SQL', 'PostgreSQL', 'React', 'Node.js']

const certifications = [
  { name: 'Build Your Own Chatbot', file: '/certificates/build-your-own-chatbot.pdf' },
  { name: 'Artificial Intelligence Fundamentals', file: '/certificates/ai-fundamentals.pdf' },
  { name: 'AI Fundamentals (Badge)', file: '/certificates/ai-fundamentals-badge.png', isBadge: true },
  { name: 'GitHub Professional Certificate', file: '/certificates/github-professional-certificate.pdf' },
  { name: 'Claude Code in Action', file: '/certificates/claude-code-in-action.pdf' },
  { name: 'AI Fluency: Framework & Foundations', file: '/certificates/ai-fluency-framework-foundations.pdf' },
  { name: 'Intro to Generative AI (Badge)', file: '/certificates/intro-to-gen-ai-badge.png', isBadge: true },
  { name: 'Advanced SQL' },
  { name: 'Intro to Machine Learning' },
] as const

const honors = [
  '1st Place - Video Game 3D Design (TSA State Conference 2026)',
  'TSA Parliamentarian',
  'Medal of Distinction - Electronic Keyboard',
  'Certificate of Distinction - SOF Math Olympiad',
  'Abacus Grand Master Certificate',
]

type TabId = 'skills' | 'certifications' | 'honors'

export default function SkillsSection() {
  const [active, setActive] = useState<TabId>('skills')

  return (
    <section id="skills" className="w-full px-6 lg:px-10 relative" aria-label="Skills and honors">
      <div className="max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/3 shrink-0">
            <ScrollReveal>
              <span className="tag">Skills</span>
              <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Technologies, certifications, and recognition.
              </p>
            </ScrollReveal>
          </div>
          <div className="flex-1">
            <ScrollReveal>
              <div className="card-minimal overflow-hidden !p-0">
                <div className="flex" role="tablist" aria-label="Skills, certifications, and awards">
                  {tabs.map(tab => {
                    const Icon = tab.icon
                    return (
                      <button key={tab.id} onClick={() => setActive(tab.id)}
                        role="tab"
                        aria-selected={active === tab.id}
                        aria-controls={`panel-${tab.id}`}
                        id={`tab-${tab.id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-4 text-xs font-medium transition-all duration-300 relative"
                        style={{
                          color: active === tab.id ? 'var(--text-primary)' : 'var(--text-muted)',
                          background: active === tab.id ? 'var(--bg-card-hover)' : 'transparent',
                        }}
                      >
                        <Icon size={14} aria-hidden="true" />
                        {tab.label}
                        {active === tab.id && (
                          <motion.div layoutId="skill-tab-line" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: 'rgb(var(--color-primary))' }} />
                        )}
                      </button>
                    )
                  })}
                </div>
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                      role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}
                    >
                      {active === 'skills' ? (
                        <div className="flex flex-wrap gap-2">
                          {skills.map((item) => (
                            <span key={item} className="tag">{item}</span>
                          ))}
                        </div>
                      ) : active === 'certifications' ? (
                        <ul className="space-y-3">
                          {certifications.map((cert) => (
                            <li key={cert.name} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'rgb(var(--color-primary))' }} aria-hidden="true" />
                              {'file' in cert ? (
                                <a href={cert.file} target="_blank" rel="noopener noreferrer" className="transition-colors inline-flex items-center gap-1.5 hover:text-primary" aria-label={`${cert.name} (opens in new tab)`}>
                                  {cert.name}
                                  <ExternalLink size={10} className="shrink-0 opacity-60" aria-hidden="true" />
                                </a>
                              ) : (
                                cert.name
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="space-y-3">
                          {honors.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: 'rgb(var(--color-primary))' }} aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
