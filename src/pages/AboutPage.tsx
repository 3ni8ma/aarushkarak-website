import { lazy, Suspense } from 'react'
import { SEOHead } from '../components/seo/SEOHead'
import AboutSection from '../components/sections/AboutSection'
import WhatIDo from '../components/sections/WhatIDo'

const ThreeBackground = lazy(() => import('../components/home/ThreeBackground'))

export default function AboutPage() {
  return (
    <div className="relative">
      <SEOHead path="/about" title="About" description="Learn more about Aarush Karak — full-stack developer, spatial computing engineer, and founder of The Coder Bros." />
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img src="/images/bg/about.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/30 to-dark/95" />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>
      <div className="relative z-10 page-container">
        <AboutSection />
        <WhatIDo />
      </div>
    </div>
  )
}
