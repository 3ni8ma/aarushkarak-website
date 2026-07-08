import { AnimatedCounter } from '../ui/AnimatedCounter'

export default function QuickStats() {
  return (
    <section id="stats" className="section-container pt-0">
      <div className="section-divider" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        <AnimatedCounter end={5000} suffix="+" label="Freelance Revenue" />
        <AnimatedCounter end={14} suffix="+" label="Technologies" sub="Frameworks & Libraries" />
        <AnimatedCounter end={6} suffix="" label="Years Building" sub="Since 2020" />
        <AnimatedCounter end={20} suffix="+" label="Projects Delivered" sub="Apps & Websites" />
      </div>
    </section>
  )
}
