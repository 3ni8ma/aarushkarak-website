import { MapPin, GraduationCap, Briefcase, Code, ArrowRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'

const info = [
  { icon: MapPin, label: 'Location', value: 'Greater Toronto Area, Canada' },
  { icon: GraduationCap, label: 'Education', value: 'Sophomore @ John Fraser Secondary School' },
  { icon: Briefcase, label: 'Role', value: 'Founder @ The Coder Bros' },
  { icon: Code, label: 'Focus', value: 'Full-Stack & Spatial Computing' },
]

export default function AboutSection() {
  return (
    <section id="about" className="section-container relative" aria-label="About me">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="lg:w-1/3 shrink-0">
          <ScrollReveal>
            <h2 className="section-heading mb-4">About</h2>
            <p className="leading-relaxed text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
              A quick overview of who I am and what drives my work.
            </p>
          </ScrollReveal>
        </div>
        <div className="flex-1 space-y-8">
          <ScrollReveal>
            <div className="flex items-start gap-8 mb-8">
              <img
                src="/images/profile.jpg"
                alt="Aarush Karak"
                className="w-24 h-32 object-cover rounded-sm shrink-0 hidden sm:block"
                loading="lazy"
              />
              <div className="space-y-5">
                <p className="leading-relaxed text-base" style={{ color: 'var(--text-secondary)' }}>
                  I am a Sophomore at John Fraser Secondary School and the Founder of{' '}
                  <span className="text-light">The Coder Bros</span>, a student-led tech initiative.
                  I work as an Application Developer at{' '}
                  <span className="text-light">Hack Club</span>, a Maker Studio Teen Intern at{' '}
                  <span className="text-light">Sci-Tech Discovery Center</span>, and serve as{' '}
                  <span className="text-light">TSA Parliamentarian</span>.
                </p>
                <p className="leading-relaxed text-base" style={{ color: 'var(--text-secondary)' }}>
                  I build across the full stack — from AI-powered platforms and 3D spatial interfaces
                  to financial analytics and gesture-controlled systems. I have delivered over $5,000 in
                  freelance projects on Fiverr and contributed to open-source civic data platforms with CommunityOne.
                </p>
                <p className="leading-relaxed text-base" style={{ color: 'var(--text-secondary)' }}>
                  Recognized with <span className="text-light">1st Place at the TSA State Conference</span> for Video Game 3D Design,
                  a Medal of Distinction in Electronic Keyboard, and an Abacus Grand Master Certificate.
                </p>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: 'var(--border-subtle)' }}>
            {info.map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={item.label} delay={i * 0.06}>
                  <div className="py-6 px-4 text-center" style={{ background: 'var(--bg-primary)' }}>
                    <Icon size={16} style={{ color: 'rgb(var(--color-primary))' }} className="mx-auto mb-2" />
                    <p className="text-[11px] mb-0.5" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
                    <p className="text-xs font-medium text-light leading-tight">{item.value}</p>
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
