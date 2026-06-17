import { motion } from 'framer-motion'

interface Props {
  children: string
  className?: string
}

export default function SectionHeading({ children, className = '' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`mb-16 ${className}`}
    >
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
        <span className="gradient-text-shimmer">{children}</span>
      </h2>
      <div className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-accent rounded-full mt-5" />
    </motion.div>
  )
}
