import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { revealStarted } = useTheme()
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const indicator = indicatorRef.current
    const nav = navRef.current
    if (!indicator || !nav) return

    const activeLink = nav.querySelector(`a[aria-current="page"]`) as HTMLAnchorElement | null
    if (activeLink) {
      indicator.style.left = `${activeLink.offsetLeft}px`
      indicator.style.width = `${activeLink.offsetWidth}px`
    }
  }, [pathname])

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: revealStarted ? 1 : 0 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/80 backdrop-blur-xl border-b border-white/[0.03]'
          : 'bg-transparent'
      }`} role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="group flex items-center gap-1 text-xl font-sans font-bold tracking-wide" aria-label="Home page">
            <span className="text-light">AK</span>
            <span className="text-pop-primary transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(var(--color-primary),0.5)]" style={{ color: 'rgb(var(--color-primary))' }}>.</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <div ref={navRef} className="relative flex items-center gap-1 px-1 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
              <span
                ref={indicatorRef}
                className="absolute top-1 bottom-1 rounded-full transition-all duration-400 ease-out pointer-events-none"
                style={{ backgroundColor: 'rgba(var(--color-primary), 0.1)', left: 0, width: 0 }}
              />
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase transition-all duration-200 rounded-full ${
                    pathname === l.to
                      ? 'text-light'
                      : 'text-muted/70 hover:text-light'
                  }`}
                  aria-current={pathname === l.to ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-3 pl-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              <ThemeToggle />
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-muted/70 hover:text-light transition-all duration-200 px-3 py-1.5 rounded-full hover:bg-white/5"
                aria-label="Resume (opens in new tab)"
              >
                <FileText size={12} />
                Resume
              </a>
            </div>
          </div>
          <button
            className="md:hidden p-2 text-light"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-dark/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-4 space-y-2">
            <div className="px-3 py-2">
              <ThemeToggle />
            </div>
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.to ? 'text-light bg-white/5' : 'text-muted hover:text-light'
                }`}
                aria-current={pathname === l.to ? 'page' : undefined}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-light transition-colors"
              aria-label="Resume (opens in new tab)"
            >
              <FileText size={14} />
              Resume
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  )
}
