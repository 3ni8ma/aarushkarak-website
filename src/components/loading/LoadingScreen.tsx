import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [complete, setComplete] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const btn: HTMLButtonElement = btnRef.current!
    function onMove(e: MouseEvent) {
      const rect = btn.getBoundingClientRect()
      btn.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
      btn.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    }
    btn.addEventListener('mousemove', onMove)
    return () => btn.removeEventListener('mousemove', onMove)
  }, [])

  function handleClick() {
    setClicked(true)
    setTimeout(() => {
      setComplete(true)
      setTimeout(() => setLoading(false), 600)
    }, 800)
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[999999] flex items-center justify-center"
          style={{ backgroundColor: '#0b080c' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            ref={wrapRef}
            className={`loading-wrap ${clicked ? 'loading-clicked' : ''} ${complete ? 'loading-complete' : ''}`}
          >
            <div className="loading-hover" />
            <div className="loading-content">
              <div className="loading-content-in">
                <div className="loading-content2">
                  <div className="loading-container">
                    <span>ENTER</span>
                    <div className="loading-box" />
                  </div>
                  <motion.div
                    className="loading-icon"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={complete ? { scale: 1, opacity: 1 } : {}}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(194,164,255)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
            <button
              ref={btnRef}
              onClick={handleClick}
              className="loading-button"
              aria-label="Enter website"
            >
              <span>Explore</span>
              <div className="loading-hover" style={{ opacity: 0 }} />
            </button>
          </div>
          <div className="fixed bottom-10 left-0 w-full overflow-hidden pointer-events-none">
            <div className="loading-marquee whitespace-nowrap text-[40px] sm:text-[60px] lg:text-[100px] font-semibold uppercase opacity-20">
              <span className="inline-block animate-marquee">
                Software Developer &mdash; Spatial Computing &mdash; Full-Stack &mdash; AI &mdash;
              </span>
              <span className="inline-block animate-marquee2">
                Software Developer &mdash; Spatial Computing &mdash; Full-Stack &mdash; AI &mdash;
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
