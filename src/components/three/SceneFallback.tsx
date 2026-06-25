import { motion } from 'framer-motion'

const name = 'Aarush Karak'

export default function SceneFallback() {
  return (
    <div className="absolute inset-0 bg-dark flex flex-col items-center justify-center select-none" aria-hidden="true">
      <div className="absolute inset-0 bg-grain" />

      <div className="text-center">
        <motion.p
          className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-light/15 mb-6 sm:mb-8 font-mono"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Portfolio
        </motion.p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-light">
          {name.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 24, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.15 + i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: char === 'K' ? 'rgb(var(--color-primary))' : undefined }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="mx-auto mt-6 sm:mt-8 h-px w-12"
          style={{ backgroundColor: 'rgb(var(--color-primary))' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.4 }}
          transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
        />

        <motion.p
          className="text-xs sm:text-sm text-light/15 mt-5 sm:mt-6 font-mono tracking-wider"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
        >
          Software Developer
        </motion.p>
      </div>
    </div>
  )
}
