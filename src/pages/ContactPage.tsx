import { SEOHead } from '../components/seo/SEOHead'
import SceneLoader from '../components/three/SceneLoader'
import ContactSection from '../components/contact/ContactSection'

export default function ContactPage() {
  return (
    <div className="relative">
      <SEOHead path="/contact" title="Contact" description="Get in touch with Aarush Karak for projects, collaborations, or opportunities." />
      <SceneLoader load={() => import('../components/sections/ContactScene')} />
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        <img src="/images/bg/about.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--overlay-from), var(--overlay-to))' }} />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>
      <div className="relative z-10 page-container">
        <ContactSection />
      </div>
    </div>
  )
}
