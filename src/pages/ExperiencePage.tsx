import { SEOHead } from "../components/seo/SEOHead";
import SceneLoader from "../components/three/SceneLoader";
import ExperienceSection from "../components/sections/ExperienceSection";

export default function ExperiencePage() {
  return (
    <div className="relative">
      <SEOHead
        path="/experience"
        title="Experience"
        description="Aarush Karak's professional experience — CommunityOne, Chingu, Hack Club, Fiverr, The Coder Bros, and Sci-Tech."
      />
      <SceneLoader
        load={() => import("../components/sections/ExperienceScene")}
      />
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        <img
          src="/images/bg/experience.jpg"
          alt=""
          className="w-full h-full object-cover animate-ken-burns"
          loading="lazy"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--overlay-from), var(--overlay-to))",
          }}
        />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>
      <div className="relative z-10 page-container">
        <div
          className="ambient-glow ambient-glow-primary"
          style={{ width: "550px", height: "550px", top: "2%", left: "-8%" }}
          aria-hidden="true"
        />
        <div
          className="ambient-glow ambient-glow-accent"
          style={{
            width: "350px",
            height: "350px",
            bottom: "15%",
            right: "-5%",
          }}
          aria-hidden="true"
        />
        <ExperienceSection />
      </div>
    </div>
  );
}
