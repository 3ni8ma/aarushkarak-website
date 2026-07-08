import { SEOHead } from '../components/seo/SEOHead'
import SceneLoader from '../components/three/SceneLoader'
import SkillsSection from '../components/sections/SkillsSection'

export default function SkillsPage() {
  return (
    <div className="relative">
      <SEOHead path="/skills" title="Skills" description="Aarush Karak's skills, certifications, and honors — Python, JavaScript, React, Three.js, AI, and more." />
      <SceneLoader load={() => import('../components/sections/SkillsScene')} />
      <div className="relative z-10 page-container">
        <SkillsSection />
      </div>
    </div>
  )
}
