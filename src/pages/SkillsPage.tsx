import { SEOHead } from '../components/seo/SEOHead'
import SceneLoader from '../components/three/SceneLoader'
import SkillsSection from '../components/sections/SkillsSection'

export default function SkillsPage() {
  return (
    <div className="relative">
      <SEOHead path="/skills" title="Skills" description="Aarush Karak's skills, certifications, and honors — Python, JavaScript, React, Three.js, AI, and more." />
      <SceneLoader load={() => import('../components/sections/SkillsScene')} />
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        <img src="/images/bg/skills.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--overlay-from), var(--overlay-to))' }} />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>
      <div className="relative z-10 page-container">
        <SkillsSection />
      </div>
    </div>
  )
}
