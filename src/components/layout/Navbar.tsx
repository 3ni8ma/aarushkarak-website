import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText } from 'lucide-react'
import Logo from '../brand/Logo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ borderBottom: '1px solid var(--nav-border)', background: 'var(--nav-bg)', backdropFilter: 'blur(12px)' }}
      role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${
                  pathname === l.to
                    ? 'text-light'
                    : 'text-muted hover:text-light'
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
              className="flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-muted hover:text-light transition-colors duration-200"
              aria-label="Resume (opens in new tab)"
            >
              <FileText size={11} />
              Resume
            </a>
          </div>
          <button
            className="md:hidden p-2 text-light"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
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
        <div className="md:hidden" style={{ borderTop: '1px solid var(--nav-border)', background: 'var(--nav-bg)' }}>
          <div className="px-6 py-4 space-y-3">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block text-xs tracking-[0.15em] uppercase transition-colors ${
                  pathname === l.to ? 'text-light' : 'text-muted hover:text-light'
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
              className="flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-muted hover:text-light transition-colors"
              aria-label="Resume (opens in new tab)"
            >
              <FileText size={11} />
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
