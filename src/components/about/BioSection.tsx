import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { MapPin, GraduationCap, Briefcase, Code } from 'lucide-react'

export default function BioSection() {
  const info = [
    { icon: MapPin, label: 'Location', value: 'Greater Toronto Area, Canada', accent: 'from-primary to-secondary', logo: undefined },
    {
      icon: GraduationCap,
      label: 'Education',
      value: 'Sophomore @ John Fraser Secondary School',
      accent: 'from-secondary to-accent',
      logo: '/images/logos/john-fraser-ss.png',
    },
    {
      icon: Briefcase,
      label: 'Role',
      value: 'Founder @ The Coder Bros',
      accent: 'from-accent to-primary',
      logo: '/images/logos/the-coder-bros.svg',
    },
    { icon: Code, label: 'Focus', value: 'Full-Stack & Spatial Computing', accent: 'from-primary to-accent', logo: undefined },
  ]
  return (
    <section className="page-container relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>About Me</SectionHeading>
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-muted leading-relaxed text-base sm:text-lg"
            >
              I'm a Sophomore at John Fraser Secondary School and the Founder of{' '}
              <span className="text-light font-medium">The Coder Bros</span>, a student-led tech initiative. 
              I work as an Application Developer at{' '}
              <span className="text-light font-medium">Hack Club</span>, a Maker Studio Teen Intern at{' '}
              <span className="text-light font-medium">Sci-Tech Discovery Center</span>, and serve as{' '}
              <span className="text-light font-medium">TSA Parliamentarian</span>.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted leading-relaxed text-base sm:text-lg"
            >
              I build across the full stack — from AI-powered platforms and 3D spatial interfaces 
              to financial analytics and gesture-controlled systems. I've delivered over $5,000 in 
              freelance projects on Fiverr and contributed to open-source civic data platforms with CommunityOne.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted leading-relaxed text-base sm:text-lg"
            >
              Recognized with <span className="text-light font-medium">1st Place at the TSA State Conference</span> for Video Game 3D Design, 
              a Medal of Distinction in Electronic Keyboard, and an Abacus Grand Master Certificate. 
              I'm passionate about blending code, design, and spatial computing to build the future.
            </motion.p>
          </div>
          <div className="lg:col-span-2 space-y-5">
            {info.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <item.icon className="text-primary" size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted/60 mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium text-light flex items-center gap-2">
                    {item.logo && (
                      <img src={item.logo} alt="" className="w-5 h-5 rounded object-contain shrink-0" />
                    )}
                    <span className="truncate">{item.value}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
