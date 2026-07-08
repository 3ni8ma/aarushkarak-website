import { Link } from 'react-router-dom'
import { SEOHead } from '../components/seo/SEOHead'
import SceneLoader from '../components/three/SceneLoader'
import HeroSection from '../components/home/HeroSection'
import QuickStats from '../components/home/QuickStats'
import FeaturedPreview from '../components/home/FeaturedPreview'
import ScrollReveal from '../components/ui/ScrollReveal'
import { ArrowRight, Cpu, Globe, Box, DollarSign } from 'lucide-react'

const items = [
  { id: 'ai', title: 'AI Developer', icon: Cpu, desc: 'Building intelligent systems with machine learning, deep learning, and natural language processing.', tags: ['Python', 'TensorFlow', 'LLMs', 'NLP'] },
  { id: 'fullstack', title: 'Full-Stack Developer', icon: Globe, desc: 'Modern web applications with React, TypeScript, Node.js, and PostgreSQL.', tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'] },
  { id: 'spatial', title: 'Spatial Computing', icon: Box, desc: '3D interfaces and gesture-controlled systems using Three.js, MediaPipe, and WebXR.', tags: ['Three.js', 'MediaPipe', 'WebXR'] },
  { id: 'freelance', title: 'Freelance & Leadership', icon: DollarSign, desc: 'Over $5,000 in freelance revenue on Fiverr. Founder of The Coder Bros.', tags: ['Fiverr', 'Leadership', 'Community'] },
]

export default function HomePage() {
  return (
    <div className="relative">
      <SEOHead path="/" />
      <SceneLoader load={() => import('../components/home/HeroScene')} />
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        <img src="/images/bg/home.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--overlay-from), var(--overlay-to))' }} />
        <div className="absolute inset-0 bg-grain" />
      </div>
      <div className="relative z-10">
        <HeroSection />
        <QuickStats />

        <section className="section-container" aria-label="What I do">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-1/3 shrink-0">
              <ScrollReveal>
                <h2 className="section-heading mb-4">What I Do</h2>
                <p className="leading-relaxed text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
                  Technologies and disciplines I work with daily to build impactful digital experiences.
                </p>
              </ScrollReveal>
            </div>
            <div className="flex-1 space-y-4">
              {items.map((item, i) => {
                const Icon = item.icon
                return (
                  <ScrollReveal key={item.id} delay={i * 0.08}>
                    <div className="card-minimal">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(var(--color-primary), 0.1)' }}>
                          <Icon size={18} style={{ color: 'rgb(var(--color-primary))' }} />
                        </div>
                        <h3 className="text-base font-medium text-light">{item.title}</h3>
                      </div>
                      <p className="text-sm text-light/85 leading-relaxed mb-3">{item.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(t => (
                          <span key={t} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(var(--color-primary), 0.08)', color: 'rgb(var(--color-primary))' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>

        <FeaturedPreview />

        <section className="section-container">
          <div className="flex justify-center">
            <Link to="/about" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all border" style={{ borderColor: 'rgba(var(--color-primary), 0.3)', color: 'rgb(var(--color-primary))' }}>
              More about me <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
