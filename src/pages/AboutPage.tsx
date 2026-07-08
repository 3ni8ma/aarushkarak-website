import { SEOHead } from '../components/seo/SEOHead'
import SceneLoader from '../components/three/SceneLoader'
import AboutSection from '../components/sections/AboutSection'
import WhatIDo from '../components/sections/WhatIDo'

export default function AboutPage() {
  return (
    <div className="relative">
      <SEOHead path="/about" title="About" description="Learn more about Aarush Karak — full-stack developer, spatial computing engineer, and founder of The Coder Bros." />
      <SceneLoader load={() => import('../components/sections/AboutScene')} />
      <div className="relative z-10 page-container">
        <AboutSection />
        <WhatIDo />
      </div>
    </div>
  )
}
