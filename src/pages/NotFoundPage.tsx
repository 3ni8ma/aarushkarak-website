import { SEOHead } from '../components/seo/SEOHead';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page-container flex items-center justify-center">
      <SEOHead title="Not Found" description="Page not found." path="*" />
      <div className="text-center">
        <h1 className="text-8xl font-heading font-bold gradient-text-shimmer mb-4">404</h1>
        <p className="text-lg text-pop-secondary mb-8">This page doesn't exist.</p>
        <Link to="/" className="px-8 py-3.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary/80 transition-all shadow-lg shadow-primary/30">
          Go home
        </Link>
      </div>
    </div>
  )
}
