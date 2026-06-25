import { lazy, Suspense } from 'react'
import { SEOHead } from '../components/seo/SEOHead'
import ExperienceSection from '../components/sections/ExperienceSection'

const ExperienceScene = lazy(() => import('../components/sections/ExperienceScene'))

export default function ExperiencePage() {
  return (
    <div className="relative">
      <SEOHead path="/experience" title="Experience" description="Aarush Karak's professional experience — CommunityOne, Chingu, Hack Club, Fiverr, The Coder Bros, and Sci-Tech." />
      <Suspense fallback={null}>
        <ExperienceScene />
      </Suspense>
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        <img src="/images/bg/experience.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/30 to-dark/95" />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>
      <div className="relative z-10 page-container">
        <ExperienceSection />
      </div>
    </div>
  )
}
