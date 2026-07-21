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
      <div className="relative z-10">
        <HeroSection />

        <div className="divider" />

        <QuickStats />

        <div className="divider" />

        <section className="w-full px-6 lg:px-10 section-pad" aria-label="What I do">
          <div className="max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              <div className="lg:w-1/3 shrink-0">
                <ScrollReveal>
                  <span className="section-label">What I Do</span>
                  <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Technologies and disciplines I work with daily to build impactful digital experiences.
                  </p>
                </ScrollReveal>
              </div>
              <div className="flex-1 space-y-4">
                {items.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <ScrollReveal key={item.id} delay={i * 0.08}>
                      <div className="card">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#D5F74C', color: '#000' }}>
                            <Icon size={18} />
                          </div>
                          <h3 className="heading-md !text-base">{item.title}</h3>
                        </div>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map(t => (
                            <span key={t} className="tag">{t}</span>
                          ))}
                        </div>
                      </div>
                    </ScrollReveal>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <FeaturedPreview />

        <section className="w-full px-6 lg:px-10 section-pad-sm">
          <div className="flex justify-center">
            <Link to="/about" className="btn-outline">
              More about me <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
