import SkillsTabs from '../components/skills/SkillsTabs'

export default function SkillsPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img src="/images/bg/skills.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/20 to-dark/90" />
        <div className="absolute inset-0 bg-grain" />
      </div>
      <div className="relative z-10">
        <SkillsTabs />
      </div>
    </div>
  )
}
