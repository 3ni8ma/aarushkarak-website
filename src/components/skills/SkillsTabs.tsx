import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { Code, Award, ScrollText, ExternalLink } from 'lucide-react'

const tabs = [
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'certifications', label: 'Certifications', icon: ScrollText },
  { id: 'honors', label: 'Honors & Awards', icon: Award },
] as const

const skills = ['Python', 'JavaScript', 'HTML/CSS', 'Java', 'C++', 'Three.js', 'MediaPipe', 'REST APIs', 'Arduino IDE', 'Chatbot Design/Development', 'SQL', 'PostgreSQL', 'React', 'Node.js']

const certifications = [
  { name: 'Build Your Own Chatbot', file: '/certificates/build-your-own-chatbot.pdf' },
  { name: 'Artificial Intelligence Fundamentals', file: '/certificates/ai-fundamentals.pdf' },
  { name: 'Artificial Intelligence Fundamentals (Badge)', file: '/certificates/ai-fundamentals-badge.png', isBadge: true },
  { name: 'Career Essentials in GitHub Professional Certificate', file: '/certificates/github-professional-certificate.pdf' },
  { name: 'Claude Code in Action', file: '/certificates/claude-code-in-action.pdf' },
  { name: 'AI Fluency: Framework & Foundations', file: '/certificates/ai-fluency-framework-foundations.pdf' },
  { name: 'Introduction to Generative AI (Completion Badge)', file: '/certificates/intro-to-gen-ai-badge.png', isBadge: true },
  { name: 'Advanced SQL' },
  { name: 'Intro to Machine Learning' },
] as const

const honors = ['1st Place - Video Game 3D Design (TSA State Conference 2026)', 'TSA Parliamentarian', 'Medal of Distinction - Electronic Keyboard (Grades 1 & 2)', 'Certificate of Distinction - SOF International Mathematics Olympiad', 'Abacus Grand Master Certificate']

type TabId = 'skills' | 'certifications' | 'honors'
const colors = ['primary', 'secondary', 'accent', 'primary', 'secondary', 'accent', 'primary', 'secondary', 'accent', 'primary', 'secondary', 'accent', 'primary', 'secondary']

const tagColors: Record<string, string> = {
  primary: 'bg-primary/15 text-primary border-primary/25',
  secondary: 'bg-secondary/15 text-secondary border-secondary/25',
  accent: 'bg-accent/15 text-accent border-accent/25',
}

export default function SkillsTabs() {
  const [active, setActive] = useState<TabId>('skills')

  return (
    <section className="page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>Skills & Honors</SectionHeading>
        <div className="glass rounded-3xl overflow-hidden">
          <div className="flex border-b border-white/5">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button key={tab.id} onClick={() => setActive(tab.id as TabId)}
                  className={`flex-1 flex items-center justify-center gap-2 py-5 text-sm font-medium transition-all duration-300 relative ${
                    active === tab.id ? 'text-light bg-white/5' : 'text-muted hover:text-light'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                  {active === tab.id && <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent" />}
                </button>
              )
            })}
          </div>
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                {active === 'skills' ? (
                  <div className="flex flex-wrap gap-2.5">
                    {skills.map((item, i) => {
                      const c = colors[i % colors.length]
                      return (
                        <span key={item} className={`inline-block px-4 py-2 text-sm font-medium rounded-full border ${tagColors[c]}`}>
                          {item}
                        </span>
                      )
                    })}
                  </div>
                ) : active === 'certifications' ? (
                  <ul className="space-y-4">
                    {certifications.map((cert, i) => (
                      <li key={cert.name} className="flex items-start gap-3 text-sm text-pop-primary">
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${i % 3 === 0 ? 'bg-primary shadow-[0_0_8px_rgba(217,70,239,0.5)]' : i % 3 === 1 ? 'bg-secondary shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-accent shadow-[0_0_8px_rgba(34,211,238,0.5)]'}`} />
                        {'file' in cert ? (
                          <a href={cert.file} target="_blank" rel="noopener noreferrer" className="hover:text-light transition-colors inline-flex items-center gap-1.5">
                            {cert.file.endsWith('.png') && (
                              <img src={cert.file} alt={cert.name} className="w-5 h-5 rounded object-cover" />
                            )}
                            {cert.name}
                            <ExternalLink size={12} className="shrink-0 opacity-60" />
                          </a>
                        ) : (
                          cert.name
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-4">
                    {honors.map((item, i) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-pop-accent">
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${i % 3 === 0 ? 'bg-primary shadow-[0_0_8px_rgba(217,70,239,0.5)]' : i % 3 === 1 ? 'bg-secondary shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-accent shadow-[0_0_8px_rgba(34,211,238,0.5)]'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
