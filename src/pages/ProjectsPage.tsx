import { SEOHead } from '../components/seo/SEOHead'
import SceneLoader from '../components/three/SceneLoader'
import ProjectsSection from '../components/sections/ProjectsSection'

export default function ProjectsPage() {
  return (
    <div className="relative">
      <SEOHead path="/projects" title="Projects" description="Aarush Karak's projects — HELIOS, Finance Hub, Knowledge-Globe, FixMate." />
      <SceneLoader load={() => import('../components/sections/SkillsScene')} />
      <div className="relative z-10 page-container">
        <ProjectsSection />
      </div>
    </div>
  )
}
