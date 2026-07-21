import { AnimatedCounter } from '../ui/AnimatedCounter'

export default function QuickStats() {
  return (
    <section id="stats" className="w-full px-6 lg:px-10 section-pad">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedCounter end={5000} suffix="+" label="Freelance Revenue" />
        <AnimatedCounter end={14} suffix="+" label="Technologies" sub="Frameworks & Libraries" />
        <AnimatedCounter end={6} suffix="" label="Years Building" sub="Since 2020" />
        <AnimatedCounter end={20} suffix="+" label="Projects Delivered" sub="Apps & Websites" />
      </div>
    </section>
  )
}
