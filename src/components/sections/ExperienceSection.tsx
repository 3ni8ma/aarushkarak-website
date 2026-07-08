import ScrollReveal from '../ui/ScrollReveal'

const experiences = [
  { role: 'Back End Developer', company: 'CommunityOne', period: 'Jun 2026 - Present', desc: 'Open-source civic data platforms with cloud-native backend systems.' },
  { role: 'Web Developer', company: 'Chingu', period: 'Jun 2026 - Present', desc: 'Agile Voyage cohort. Python, PostgreSQL, React/Node.js pipelines.' },
  { role: 'Application Developer', company: 'Hack Club', period: 'Jun 2025 - Present', desc: 'Full-stack apps with serverless reactive architecture.' },
  { role: 'Web Developer', company: 'Fiverr', period: 'Apr 2025 - Present', desc: '$5,000+ in freelance — 3D, AI, financial analytics.' },
  { role: 'Co-Founder & CEO', company: 'The Coder Bros', period: 'Jul 2023 - Present', desc: 'Student-led tech initiative. AI, web, spatial computing.' },
  { role: 'Maker Studio Teen Intern', company: 'Sci-Tech', period: 'Jun 2025 - Sep 2025', desc: '40+ hours in competitive STEM makerspace. Youngest accepted intern.' },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-container relative" aria-label="Experience timeline">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="lg:w-1/3 shrink-0">
          <ScrollReveal>
            <h2 className="section-heading mb-4">Experience</h2>
            <p className="leading-relaxed text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
              My professional journey so far.
            </p>
          </ScrollReveal>
        </div>
        <div className="flex-1">
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.company + exp.role} delay={i * 0.06}>
              <div className="flex gap-5 pb-8 last:pb-0">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ background: 'rgb(var(--color-primary))' }} />
                  {i < experiences.length - 1 && (
                    <div className="w-px flex-1 mt-2" style={{ background: 'var(--border-subtle)' }} />
                  )}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                    <h3 className="text-sm font-medium text-light">{exp.role}</h3>
                    <span className="text-xs" style={{ color: 'rgb(var(--color-primary))' }}>{exp.company}</span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{exp.period}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{exp.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
