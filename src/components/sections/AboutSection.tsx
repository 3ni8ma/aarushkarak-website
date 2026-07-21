import { MapPin, GraduationCap, Briefcase, Code } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const info = [
  { icon: MapPin, label: 'Location', value: 'Greater Toronto Area, Canada' },
  { icon: GraduationCap, label: 'Education', value: 'Sophomore @ John Fraser Secondary School' },
  { icon: Briefcase, label: 'Role', value: 'Founder @ The Coder Bros' },
  { icon: Code, label: 'Focus', value: 'Full-Stack & Spatial Computing' },
]

export default function AboutSection() {
  return (
    <section id="about" className="w-full px-6 lg:px-10 section-pad relative" aria-label="About me">
      <div className="max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/3 shrink-0">
            <ScrollReveal>
              <span className="section-label">About</span>
              <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                A quick overview of who I am and what drives my work.
              </p>
            </ScrollReveal>
          </div>
          <div className="flex-1 space-y-6">
            <ScrollReveal>
              <div className="card space-y-5">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  I'm a Sophomore at John Fraser Secondary School and the Founder of{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>The Coder Bros</strong>, a student-led tech initiative.
                  I work as an Application Developer at{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Hack Club</strong>, a Maker Studio Teen Intern at{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>Sci-Tech Discovery Center</strong>, and serve as{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>TSA Parliamentarian</strong>.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  I build across the full stack — from AI-powered platforms and 3D spatial interfaces
                  to financial analytics and gesture-controlled systems. I've delivered over $5,000 in
                  freelance projects on Fiverr and contributed to open-source civic data platforms with CommunityOne.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Recognized with <strong style={{ color: 'var(--text-primary)' }}>1st Place at the TSA State Conference</strong> for Video Game 3D Design,
                  a Medal of Distinction in Electronic Keyboard, and an Abacus Grand Master Certificate.
                  I'm passionate about blending code, design, and spatial computing to build the future.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {info.map((item, i) => {
                const Icon = item.icon
                return (
                  <ScrollReveal key={item.label} delay={i * 0.06}>
                    <div className="card !p-5 text-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: '#D5F74C', color: '#000' }}>
                        <Icon size={14} />
                      </div>
                      <p className="label-sm !text-[10px] mb-1">{item.label}</p>
                      <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
