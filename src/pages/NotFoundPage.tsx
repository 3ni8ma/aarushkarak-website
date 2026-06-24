import { Link } from 'react-router-dom'
import { SEOHead } from '../components/seo/SEOHead'

export default function NotFoundPage() {
  return (
    <div className="relative">
      <SEOHead title="404 — Page Not Found" path="/404" />
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img src="/images/bg/home.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/20 to-dark/90" />
        <div className="absolute inset-0 bg-grain" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-8xl font-bold gradient-text-shimmer mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">Page not found</p>
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
