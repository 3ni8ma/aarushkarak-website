import { AnimatedCounter } from '../ui/AnimatedCounter'

export default function QuickStats() {
  return (
    <section id="stats" className="section-container pt-0">
      <div className="section-divider" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-12" style={{ background: 'var(--border-subtle)' }}>
        <div className="py-10 px-6 text-center" style={{ background: 'var(--bg-primary)' }}>
          <AnimatedCounter end={5000} suffix="+" label="Freelance Revenue (USD)" />
        </div>
        <div className="py-10 px-6 text-center" style={{ background: 'var(--bg-primary)' }}>
          <AnimatedCounter end={14} suffix="+" label="Technologies" />
        </div>
        <div className="py-10 px-6 text-center" style={{ background: 'var(--bg-primary)' }}>
          <AnimatedCounter end={6} suffix="" label="Years Building" />
        </div>
        <div className="py-10 px-6 text-center" style={{ background: 'var(--bg-primary)' }}>
          <AnimatedCounter end={20} suffix="+" label="Projects Delivered" />
        </div>
      </div>
    </section>
  )
}
