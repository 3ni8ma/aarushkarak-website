import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setVisible(scrollTop > 300)
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const r = 18
  const circumference = 2 * Math.PI * r
  const offset = circumference - progress * circumference

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`scroll-top-btn ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      style={{ transition: 'opacity 0.3s, transform 0.3s' }}
    >
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
        <circle
          cx="22" cy="22" r={r}
          fill="none"
          stroke="rgb(var(--color-primary))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.1s ease' }}
        />
      </svg>
      <ArrowUp size={16} className="relative z-10" />
    </button>
  )
}
