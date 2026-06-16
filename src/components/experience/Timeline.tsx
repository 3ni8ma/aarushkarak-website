import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { useTilt } from '../../hooks/useTilt'

const experiences = [
  { role: 'Back End Developer', company: 'CommunityOne', period: 'June 2026 - Present', desc: 'Collaborative development on open-source civic data platforms, centralizing public records and legislative datasets using cloud-native backend systems.' },
  { role: 'Web Developer', company: 'Chingu', period: 'June 2026 - Present', desc: 'Intensive 6-week Voyage cohort in a remote Agile team. Built automated backend pipelines with Python, relational databases with PostgreSQL, and frontends using React/Node.js.' },
  { role: 'Application Developer', company: 'Hack Club', period: 'June 2025 - Present', desc: 'Full-stack mobile/web application platforms utilizing serverless reactive architecture and low-latency database synchronization.' },
  { role: 'Web Developer', company: 'Fiverr', period: 'April 2025 - Present', desc: 'Delivered over $5,000 in high-value freelance client projects specializing in 3D environments, AI-driven applications, and financial analytics.' },
  { role: 'Co-Founder & CEO', company: 'The Coder Bros', period: 'July 2023 - Present', desc: 'Student-led tech initiative showcasing software projects focusing on AI, web development, and practical spatial computing.' },
  { role: 'Maker Studio Teen Intern', company: 'Sci-Tech Discovery Center', period: 'June 2025 - September 2025', desc: 'Completed 40+ hours in a competitive STEM makerspace program helping museum guests; recognized as the youngest accepted intern.' },
]

const companyLogos: Record<string, string> = {
  CommunityOne: '/images/logos/communityone.png',
  Chingu: '/images/logos/chingu.png',
  'Hack Club': '/images/logos/hackclub.svg',
  Fiverr: '/images/logos/fiverr.svg',
  'The Coder Bros': '/images/logos/the-coder-bros.svg',
  'Sci-Tech Discovery Center': '/images/logos/scitech.png',
}

function CompanyLogo({ company }: { company: string }) {
  const tiltRef = useTilt(8, 1.08)
  const src = companyLogos[company]
  if (!src) return null
  return (
    <div ref={tiltRef} className="inline-flex items-center gap-1.5">
      <img
        src={src}
        alt={company}
        className="w-8 h-8 rounded object-contain bg-white/10"
      />
      <span className="text-sm font-medium text-secondary/90">{company}</span>
    </div>
  )
}

export default function Timeline() {
  return (
    <section className="page-container relative overflow-hidden">
      <div className="absolute top-20 left-0 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>Experience</SectionHeading>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-secondary/40 to-transparent md:-translate-x-px" />
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company + exp.role}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className="glass rounded-3xl p-6 hover:bg-white/[0.06] transition-all duration-300">
                  <span className="text-xs font-semibold text-primary/70 uppercase tracking-widest">{exp.period}</span>
                  <h3 className="text-xl font-heading font-bold text-light mt-2">{exp.role}</h3>
                  <CompanyLogo company={exp.company} />
                  <p className="text-sm text-muted leading-relaxed mt-2">{exp.desc}</p>
                </div>
              </div>
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-dark -translate-x-2 md:-translate-x-2 mt-8 z-10 shadow-[0_0_16px_rgba(217,70,239,0.5)]" />
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
