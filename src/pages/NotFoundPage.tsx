import { Link } from 'react-router-dom'
import { SEOHead } from '../components/seo/SEOHead'
import { Home } from 'lucide-react'

const glitchText = '404'

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <SEOHead title="404 — Page Not Found" description="The page you're looking for doesn't exist." />
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        <img src="/images/bg/about.jpg" alt="" className="w-full h-full object-cover" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--overlay-from), var(--overlay-to))' }} />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>
      <div className="relative z-10 text-center px-4">
        <div className="text-8xl sm:text-9xl font-bold mb-4 tracking-tighter" style={{ color: 'rgb(var(--color-primary))', textShadow: '0 0 40px rgba(var(--color-primary), 0.2)' }}>
          {glitchText}
        </div>
        <p className="text-lg sm:text-xl font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Page not found</p>
        <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all"
            style={{ backgroundColor: 'rgb(var(--color-primary))', color: '#fff' }}
          >
            <Home size={14} /> Go Home
          </Link>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Press <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ backgroundColor: 'rgba(var(--color-primary), 0.1)', color: 'rgb(var(--color-primary))' }}>Ctrl+`</kbd> for terminal
          </span>
        </div>
      </div>
    </div>
  )
}
