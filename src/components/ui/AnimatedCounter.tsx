import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

interface AnimatedCounterProps {
  end: number
  suffix?: string
  duration?: number
  label?: string
  sub?: string
  accent?: string
}

export function AnimatedCounter({ end, suffix = '', duration = 2000, label, sub, accent }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * end)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, end, duration])

  return (
    <div ref={ref} className="text-center">
      <span className={`text-3xl sm:text-4xl font-bold ${accent ? 'gradient-text' : 'text-white'}`}>
        {count}{suffix}
      </span>
      {label && <p className="text-sm text-light/70 mt-1">{label}</p>}
      {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
    </div>
  )
}
