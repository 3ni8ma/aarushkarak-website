import { lazy, Suspense } from 'react'
import { SEOHead } from '../components/seo/SEOHead'
import ContactSection from '../components/contact/ContactSection'

const ContactScene = lazy(() => import('../components/sections/ContactScene'))

export default function ContactPage() {
  return (
    <div className="relative">
      <SEOHead path="/contact" title="Contact" description="Get in touch with Aarush Karak for projects, collaborations, or opportunities." />
      <Suspense fallback={null}>
        <ContactScene />
      </Suspense>
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        <img src="/images/bg/about.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/30 to-dark/95" />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>
      <div className="relative z-10 page-container">
        <ContactSection />
      </div>
    </div>
  )
}
