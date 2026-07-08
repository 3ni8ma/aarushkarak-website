import { Link } from 'react-router-dom'
import { SEOHead } from '../components/seo/SEOHead'
import { ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <SEOHead title="404 — Page Not Found" description="The page you're looking for doesn't exist." />
      <div className="relative z-10 text-center px-4">
        <div className="text-8xl sm:text-9xl font-bold mb-4 tracking-tighter" style={{ color: 'rgb(var(--color-primary))' }}>
          404
        </div>
        <p className="text-base font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Page not found</p>
        <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-all"
            style={{ backgroundColor: 'rgb(var(--color-primary))', color: '#fff' }}
          >
            <ArrowLeft size={13} /> Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
