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
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--overlay-from), var(--overlay-to))' }} />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>
      <div className="relative z-10 pt-20">
        <div className="ambient-glow ambient-glow-primary" style={{ width: '500px', height: '500px', top: '10%', right: '-5%' }} aria-hidden="true" />
        <div className="ambient-glow ambient-glow-secondary" style={{ width: '450px', height: '450px', bottom: '5%', left: '-8%' }} aria-hidden="true" />
        <ProjectsSection />
      </div>
    </div>
  )
}
