import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Award, ScrollText, ExternalLink } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const tabs = [
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'certifications', label: 'Certifications', icon: ScrollText },
  { id: 'honors', label: 'Honors', icon: Award },
] as const

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
    <section id="skills" className="section-container relative" aria-label="Skills and honors">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="lg:w-1/3 shrink-0">
          <ScrollReveal>
            <h2 className="section-heading mb-4">Skills</h2>
            <p className="leading-relaxed text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Technologies, certifications, and recognition.
            </p>
          </ScrollReveal>
        </div>
        <div className="flex-1">
          <ScrollReveal>
            <div className="card-editorial p-0 overflow-hidden">
              <div className="flex border-b" style={{ borderColor: 'var(--border-subtle)' }} role="tablist" aria-label="Skills, certifications, and awards">
                {tabs.map(tab => {
                  const Icon = tab.icon
                  return (
                    <button key={tab.id} onClick={() => setActive(tab.id as TabId)}
                      role="tab"
                      aria-selected={active === tab.id}
                      aria-controls={`panel-${tab.id}`}
                      id={`tab-${tab.id}`}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs tracking-wide uppercase transition-all duration-200 relative ${
                        active === tab.id ? 'text-light' : 'text-muted hover:text-light'
                      }`}
                    >
                      <Icon size={13} aria-hidden="true" />
                      {tab.label}
                      {active === tab.id && (
                        <motion.div layoutId="skill-tab-line" className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'rgb(var(--color-primary))' }} />
                      )}
                    </button>
                  )
                })}
              </div>
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                    role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}
                  >
                    {active === 'skills' ? (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((item) => (
                          <span key={item} className="inline-block px-2.5 py-1 text-[11px] font-medium rounded-sm bg-accent-subtle text-accent">
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : active === 'certifications' ? (
                      <ul className="space-y-2.5">
                        {certifications.map((cert) => (
                          <li key={cert.name} className="flex items-start gap-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                            <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: 'rgb(var(--color-primary))' }} aria-hidden="true" />
                            {'file' in cert ? (
                              <a href={cert.file} target="_blank" rel="noopener noreferrer" className="hover:text-light transition-colors inline-flex items-center gap-1.5" aria-label={`${cert.name} (opens in new tab)`}>
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
                      <ul className="space-y-2.5">
                        {honors.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                            <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: 'rgb(var(--color-primary))' }} aria-hidden="true" />
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
    </section>
  )
}
