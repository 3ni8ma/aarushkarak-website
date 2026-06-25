import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText } from 'lucide-react'
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

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
    }`} role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-sans font-bold text-light tracking-wide" aria-label="Home page">
            AK<span style={{ color: 'rgb(var(--color-primary))' }}>.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-all duration-200 ${
                  pathname === l.to ? 'text-light' : 'text-muted hover:text-light'
                }`}
                aria-current={pathname === l.to ? 'page' : undefined}
              >
                {l.label}
              </Link>
            ))}
            <ThemeToggle />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-light transition-all duration-200"
              aria-label="Resume (opens in new tab)"
            >
              <FileText size={14} />
              Resume
            </a>
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
    </nav>
  )
}
