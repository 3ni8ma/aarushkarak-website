import { SEOHead } from '../components/seo/SEOHead';
import ContactSection from '../components/contact/ContactSection'

export default function ContactPage() {
  return (
    <>
      <SEOHead title="Contact" description="Get in touch with Aarush Karak for freelance, collaboration, or opportunities." path="/contact" />
      <ContactSection />
    </>
  )
}
