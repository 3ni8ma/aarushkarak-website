import { ExternalLink } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";
import { use3DTilt } from "../../hooks/use3DTilt";

const projects = [
  {
    title: "HELIOS",
    desc: "Browser-based AI operating system with hand-gesture navigation and a 3D spatial interface.",
    tags: ["Three.js", "MediaPipe", "React"],
    color: "var(--color-primary)",
    link: "https://github.com/3ni8ma/HELIOS",
  },
  {
    title: "Finance Hub",
    desc: "Full-stack financial intelligence platform with live market monitoring and AI prediction.",
    tags: ["Python", "PostgreSQL", "React"],
    color: "var(--color-secondary)",
    link: "https://github.com/3ni8ma/Finance-Hub",
  },
  {
    title: "Knowledge-Globe",
    desc: "Interactive 3D encyclopedia visualizing interconnected data nodes across a spatial graph.",
    tags: ["Three.js", "JavaScript", "REST APIs"],
    color: "var(--color-accent)",
    link: "https://github.com/3ni8ma/Knowledge-Globe",
  },
  {
    title: "FixMate",
    desc: "AI-powered home maintenance application with intelligent diagnostics and repair recommendations.",
    tags: ["AI", "React", "Node.js"],
    color: "var(--color-primary)",
    link: "https://github.com/3ni8ma/Fixmate-App",
  },
];

function getTagStyle(color: string) {
  if (color === "var(--color-secondary)")
    return { bg: "rgba(168,124,255,0.08)", text: "rgb(168,124,255)" };
  if (color === "var(--color-accent)")
    return { bg: "rgba(34,211,238,0.08)", text: "rgb(34,211,238)" };
  return { bg: "rgba(194,164,255,0.08)", text: "rgb(194,164,255)" };
}

function ProjectCard({
  p,
  index,
}: {
  p: (typeof projects)[number];
  index: number;
}) {
  const tilt = use3DTilt(6);
  const tc = getTagStyle(p.color);

  return (
    <ScrollReveal delay={index * 0.1}>
      <article
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="card-minimal group cursor-pointer transition-all duration-300"
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => window.open(p.link, "_blank", "noopener,noreferrer")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.open(p.link, "_blank", "noopener,noreferrer");
          }
        }}
        role="link"
        tabIndex={0}
        aria-label={`${p.title} — ${p.desc}`}
      >
        <div
          className="flex items-start justify-between mb-4"
          style={{ transform: "translateZ(20px)" }}
        >
          <h3 className="text-xl font-sans font-medium text-light">
            {p.title}
          </h3>
          <ExternalLink
            size={16}
            className="text-muted group-hover:text-primary transition-colors mt-1 shrink-0"
          />
        </div>
        <p
          className="text-sm text-muted-light leading-relaxed mb-5"
          style={{ transform: "translateZ(15px)" }}
        >
          {p.desc}
        </p>
        <div
          className="flex flex-wrap gap-2"
          style={{ transform: "translateZ(10px)" }}
        >
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full"
              style={{ backgroundColor: tc.bg, color: tc.text }}
            >
              {t}
            </span>
          ))}
        </div>
      </article>
    </ScrollReveal>
  );
}

export default function ProjectsSection() {
  return (
    <section className="section-container py-24 sm:py-32" aria-label="Projects">
      <ScrollReveal>
        <h2 className="section-heading mb-12">My Work</h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
