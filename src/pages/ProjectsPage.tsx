import { SEOHead } from '../components/seo/SEOHead';
import ProjectsGrid from '../components/projects/ProjectsGrid'

export default function ProjectsPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img src="/images/bg/projects.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/20 to-dark/90" />
        <div className="absolute inset-0 bg-grain" />
      </div>
      <div className="relative z-10">
        <ProjectsGrid />
      </div>
    </div>
  )
}
