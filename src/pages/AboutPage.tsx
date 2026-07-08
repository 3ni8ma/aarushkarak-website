import { SEOHead } from '../components/seo/SEOHead'
import SceneLoader from '../components/three/SceneLoader'
import AboutSection from '../components/sections/AboutSection'
import WhatIDo from '../components/sections/WhatIDo'

export default function AboutPage() {
  return (
    <div className="relative">
      <SEOHead path="/about" title="About" description="Learn more about Aarush Karak — full-stack developer, spatial computing engineer, and founder of The Coder Bros." />
      <SceneLoader load={() => import('../components/sections/AboutScene')} />
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        <img src="/images/bg/about.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--overlay-from), var(--overlay-to))' }} />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>
      <div className="relative z-10 page-container">
        <div className="ambient-glow ambient-glow-primary" style={{ width: '600px', height: '600px', top: '5%', right: '-10%' }} aria-hidden="true" />
        <div className="ambient-glow ambient-glow-accent" style={{ width: '400px', height: '400px', bottom: '10%', left: '-5%' }} aria-hidden="true" />
        <AboutSection />
        <WhatIDo />
      </div>
    </div>
  )
}
