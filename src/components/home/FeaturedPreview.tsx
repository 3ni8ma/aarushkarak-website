import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

const featured = [
  {
    title: "HELIOS",
    desc: "Browser-based AI OS with hand-gesture navigation and 3D spatial interface.",
    tags: ["Three.js", "MediaPipe", "React"],
    link: "https://github.com/3ni8ma/HELIOS",
  },
  {
    title: "Finance Hub",
    desc: "Full-stack financial intelligence with live monitoring and AI prediction.",
    tags: ["Python", "PostgreSQL", "React"],
    link: "https://github.com/3ni8ma/Finance-Hub",
  },
];

export default function FeaturedPreview() {
  return (
    <section className="section-container pt-0" aria-label="Featured projects">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl sm:text-4xl font-sans font-bold text-light">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <Link
          to="/projects"
          className="text-sm transition-colors flex items-center gap-1.5"
          style={{ color: "rgb(var(--color-primary))" }}
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {featured.map((p) => (
          <ScrollReveal key={p.title}>
            <article
              onClick={() =>
                window.open(p.link, "_blank", "noopener,noreferrer")
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  window.open(p.link, "_blank", "noopener,noreferrer");
                }
              }}
              role="link"
              tabIndex={0}
              aria-label={`${p.title} — ${p.desc}`}
              className="glass rounded-3xl p-8 group relative overflow-hidden hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
            >
              <div
                className="h-1 w-16 rounded-full mb-5"
                style={{ backgroundColor: "rgb(var(--color-primary))" }}
              />
              <h3 className="text-xl font-sans font-bold text-light mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-pop-secondary leading-relaxed mb-5">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1.5 rounded-full border"
                    style={{
                      borderColor: "rgba(var(--color-primary), 0.2)",
                      backgroundColor: "rgba(var(--color-primary), 0.08)",
                      color: "rgb(var(--color-primary))",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
