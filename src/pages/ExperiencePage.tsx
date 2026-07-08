import { SEOHead } from '../components/seo/SEOHead'
import SceneLoader from '../components/three/SceneLoader'
import ExperienceSection from '../components/sections/ExperienceSection'

export default function ExperiencePage() {
  return (
    <div className="relative">
      <SEOHead path="/experience" title="Experience" description="Aarush Karak's professional experience — CommunityOne, Chingu, Hack Club, Fiverr, The Coder Bros, and Sci-Tech." />
      <SceneLoader load={() => import('../components/sections/ExperienceScene')} />
      <div className="relative z-10 page-container">
        <ExperienceSection />
      </div>
    </div>
  )
}
