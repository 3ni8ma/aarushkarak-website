import { SEOHead } from '../components/seo/SEOHead';
import HeroSection from '../components/home/HeroSection'
import QuickStats from '../components/home/QuickStats'
import FeaturedPreview from '../components/home/FeaturedPreview'
import ThreeBackground from '../components/home/ThreeBackground'

export default function HomePage() {
  return (
    <div className="relative">
      <SEOHead path="/" />
      <ThreeBackground />
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img src="/images/bg/home.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/20 to-dark/90" />
        <div className="absolute inset-0 bg-grain" />
      </div>
      <div className="relative z-10">
        <HeroSection />
        <QuickStats />
        <FeaturedPreview />
      </div>
    </div>
  )
}
