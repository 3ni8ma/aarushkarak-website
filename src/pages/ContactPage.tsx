import { SEOHead } from '../components/seo/SEOHead'
import SceneLoader from '../components/three/SceneLoader'
import ContactSection from '../components/contact/ContactSection'

export default function ContactPage() {
  return (
    <div className="relative">
      <SEOHead path="/contact" title="Contact" description="Get in touch with Aarush Karak for projects, collaborations, or opportunities." />
      <SceneLoader load={() => import('../components/sections/ContactScene')} />
      <div className="relative z-10 section-pad">
        <ContactSection />
      </div>
    </div>
  )
}
