import { lazy, Suspense } from 'react'
import { SEOHead } from '../components/seo/SEOHead'
import SkillsSection from '../components/sections/SkillsSection'

const SkillsScene = lazy(() => import('../components/sections/SkillsScene'))

export default function SkillsPage() {
  return (
    <div className="relative">
      <SEOHead path="/skills" title="Skills" description="Aarush Karak's skills, certifications, and honors — Python, JavaScript, React, Three.js, AI, and more." />
      <Suspense fallback={null}>
        <SkillsScene />
      </Suspense>
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        <img src="/images/bg/skills.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/30 to-dark/95" />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>
      <div className="relative z-10 page-container">
        <SkillsSection />
      </div>
    </div>
  )
}
