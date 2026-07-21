import { Link } from 'react-router-dom'
import { SEOHead } from '../components/seo/SEOHead'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <SEOHead title="404 — Page Not Found" description="The page you're looking for doesn't exist." />
      <div className="relative z-10 text-center px-6">
        <p className="label-sm mb-4">Error</p>
        <h1 className="heading-xl mb-4">404</h1>
        <p className="text-base font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Page not found</p>
        <p className="text-sm mb-10 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-accent">
          <Home size={14} /> Go Home
        </Link>
      </div>
    </div>
  )
}
