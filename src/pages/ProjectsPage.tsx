import { SEOHead } from '../components/seo/SEOHead'
import SceneLoader from '../components/three/SceneLoader'
import ProjectsSection from '../components/sections/ProjectsSection'

export default function ProjectsPage() {
  return (
    <div className="relative">
      <SEOHead path="/projects" title="Projects" description="Aarush Karak's projects — HELIOS, Finance Hub, Knowledge-Globe, FixMate." />
      <SceneLoader load={() => import('../components/sections/SkillsScene')} />
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        <img src="/images/bg/projects.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/30 to-dark/95" />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>
      <div className="relative z-10 pt-20">
        <ProjectsSection />
      </div>
    </div>
  )
}
