import ScrollReveal from '../ui/ScrollReveal'

const experiences = [
  { role: 'Back End Developer', company: 'CommunityOne', period: 'Jun 2026 - Present', desc: 'Open-source civic data platforms with cloud-native backend systems.' },
  { role: 'Web Developer', company: 'Chingu', period: 'Jun 2026 - Present', desc: 'Agile Voyage cohort. Python, PostgreSQL, React/Node.js pipelines.' },
  { role: 'Application Developer', company: 'Hack Club', period: 'Jun 2025 - Present', desc: 'Full-stack apps with serverless reactive architecture.' },
  { role: 'Web Developer', company: 'Fiverr', period: 'Apr 2025 - Present', desc: '$5,000+ in freelance — 3D, AI, financial analytics.' },
  { role: 'Co-Founder & CEO', company: 'The Coder Bros', period: 'Jul 2023 - Present', desc: 'Student-led tech initiative. AI, web, spatial computing.' },
  { role: 'Maker Studio Teen Intern', company: 'Sci-Tech', period: 'Jun 2025 - Sep 2025', desc: '40+ hours in competitive STEM makerspace. Youngest accepted intern.' },
]

const companyLogos: Record<string, string> = {
  CommunityOne: '/images/logos/communityone.png',
  Chingu: '/images/logos/chingu.png',
  'Hack Club': '/images/logos/hackclub.svg',
  Fiverr: '/images/logos/fiverr.svg',
  'The Coder Bros': '/images/logos/the-coder-bros.png',
  'Sci-Tech': '/images/logos/scitech.png',
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full px-6 lg:px-10 relative" aria-label="Experience timeline">
      <div className="max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/3 shrink-0">
            <ScrollReveal>
              <span className="tag">Experience</span>
              <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                My professional journey so far.
              </p>
            </ScrollReveal>
          </div>
          <div className="flex-1 space-y-3">
            {experiences.map((exp, i) => {
              const logo = companyLogos[exp.company]
              return (
                <ScrollReveal key={exp.company + exp.role} delay={i * 0.06}>
                  <div className="card-minimal flex items-start gap-5">
                    {logo && (
                      <img
                        src={logo}
                        alt=""
                        className="w-10 h-10 rounded-full object-contain shrink-0 mt-0.5"
                        style={{ background: 'var(--bg-card)' }}
                        loading="lazy"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                        <h3 className="text-pop-primary text-base font-semibold">{exp.role}</h3>
                        <span className="text-xs font-medium" style={{ color: 'rgb(var(--color-primary))' }}>{exp.company}</span>
                      </div>
                      <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>{exp.period}</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{exp.desc}</p>
                    </div>
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
