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
    <section id="about" className="section-container relative" aria-label="About me">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="lg:w-1/3 shrink-0">
          <ScrollReveal>
            <h2 className="section-heading mb-4">About</h2>
            <p className="text-light/70 leading-relaxed text-sm max-w-xs">
              A quick overview of who I am and what drives my work.
            </p>
          </ScrollReveal>
        </div>
        <div className="flex-1 space-y-6">
          <ScrollReveal>
            <div className="card-minimal space-y-5">
              <p className="text-light/85 leading-relaxed text-base font-normal">
                I'm a Sophomore at John Fraser Secondary School and the Founder of{' '}
                <span className="text-light font-medium">The Coder Bros</span>, a student-led tech initiative.
                I work as an Application Developer at{' '}
                <span className="text-light font-medium">Hack Club</span>, a Maker Studio Teen Intern at{' '}
                <span className="text-light font-medium">Sci-Tech Discovery Center</span>, and serve as{' '}
                <span className="text-light font-medium">TSA Parliamentarian</span>.
              </p>
              <p className="text-light/85 leading-relaxed text-base font-normal">
                I build across the full stack — from AI-powered platforms and 3D spatial interfaces
                to financial analytics and gesture-controlled systems. I've delivered over $5,000 in
                freelance projects on Fiverr and contributed to open-source civic data platforms with CommunityOne.
              </p>
              <p className="text-light/85 leading-relaxed text-base font-normal">
                Recognized with <span className="text-light font-medium">1st Place at the TSA State Conference</span> for Video Game 3D Design,
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
                  <div className="card-minimal p-4 text-center">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: 'rgba(var(--color-primary), 0.1)' }}>
                      <Icon size={15} style={{ color: 'rgb(var(--color-primary))' }} />
                    </div>
                    <p className="text-[11px] text-light/70 mb-0.5">{item.label}</p>
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
