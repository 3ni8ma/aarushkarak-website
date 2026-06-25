import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, FileText } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass border-b border-white/5' : 'bg-transparent'
    }`} role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-heading font-bold text-light tracking-wide" aria-label="Home page">
            AK<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
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
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-all duration-200 ${
                  pathname === l.to ? 'text-primary' : 'text-muted hover:text-light'
                }`}
                aria-current={pathname === l.to ? 'page' : undefined}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <button
            className="md:hidden p-2 text-light"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden glass border-t border-white/5">
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
                  pathname === l.to ? 'text-primary bg-primary/10' : 'text-muted hover:text-light'
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
