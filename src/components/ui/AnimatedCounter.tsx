import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  end: number
  suffix?: string
  label: string
  sub?: string
  accent?: string
}

export default function AnimatedCounter({ end, suffix = '', label, sub, accent = 'from-primary to-secondary' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="glass rounded-3xl p-8 text-center relative overflow-hidden group hover:bg-white/[0.06] transition-all duration-300">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent} opacity-60`} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="text-4xl sm:text-5xl font-heading font-bold text-light block"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {inView ? end : 0}
        </motion.span>
        {suffix}
      </motion.span>
      <span className="text-sm text-pop-primary mt-2 block">{label}</span>
      {sub && <span className="text-xs text-pop-accent mt-1 block">{sub}</span>}
    </div>
  )
}
