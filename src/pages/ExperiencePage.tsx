import { SEOHead } from '../components/seo/SEOHead';
import Timeline from '../components/experience/Timeline'

export default function ExperiencePage() {
  return (
    <div className="relative">
      <SEOHead title="Experience" description="Work experience and professional timeline of Aarush Karak." path="/experience" />
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img src="/images/bg/experience.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/20 to-dark/90" />
        <div className="absolute inset-0 bg-grain" />
      </div>
      <div className="relative z-10">
        <Timeline />
      </div>
    </div>
  )
}
