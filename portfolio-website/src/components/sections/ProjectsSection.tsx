import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveProjectButton } from '../ui/LiveProjectButton';

interface Project {
  id: string;
  name: string;
  category: string;
  img1: string;
  img2: string;
  img3: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "01",
    name: "Project HELIOS",
    category: "Spatial AI OS",
    img1: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    img2: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
    img3: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "02",
    name: "Knowledge-Globe",
    category: "3D Interactive Encyclopedia",
    img1: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    img2: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=600&auto=format&fit=crop",
    img3: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "03",
    name: "Finance Hub",
    category: "Full-Stack Intelligence",
    img1: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    img2: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
    img3: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop"
  }
];

interface CardProps {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: any;
}

const ProjectCard: React.FC<CardProps> = ({ project, index, total, scrollYProgress }) => {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const cardScale = useTransform(scrollYProgress, [index / total, 1], [1, targetScale]);

  return (
    <div className="h-[85vh] flex items-center justify-center sticky top-24 md:top-32 w-full">
      <motion.div
        style={{
          scale: cardScale,
          top: `${index * 28}px`
        }}
        className="w-full bg-dark-bg border-2 border-text-light rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 flex flex-col justify-between h-full shadow-[0_24px_60px_rgba(0,0,0,0.8)]"
      >
        <div className="flex flex-row items-center justify-between border-b border-[#D7E2EA]/10 pb-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hero-heading font-black text-4xl sm:text-5xl md:text-6xl leading-none">
              {project.id}
            </span>
            <div className="flex flex-col">
              <span className="text-text-light font-medium uppercase text-base sm:text-xl md:text-2xl">
                {project.name}
              </span>
              <span className="text-text-light/50 font-light uppercase text-xs sm:text-sm">
                {project.category}
              </span>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        <div className="grid grid-cols-10 gap-3 sm:gap-4 md:gap-5 flex-1 mt-4 items-stretch overflow-hidden">
          <div className="col-span-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-between">
            <img
              src={project.img1}
              alt={`${project.name} asset viewport view`}
              className="w-full object-cover rounded-[20px] sm:rounded-[30px] md:rounded-[40px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.img2}
              alt={`${project.name} asset perspective`}
              className="w-full object-cover rounded-[20px] sm:rounded-[30px] md:rounded-[40px] flex-1"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>

          <div className="col-span-6 h-full">
            <img
              src={project.img3}
              alt={`${project.name} context scene render`}
              className="w-full h-full object-cover rounded-[20px] sm:rounded-[30px] md:rounded-[40px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-dark-bg rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30 px-5 sm:px-8 md:px-10 pb-20"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="w-full text-center pt-20 mb-6">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            Projects
          </h2>
        </div>

        <div className="w-full flex flex-col gap-0 items-center">
          {PROJECTS_DATA.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              total={PROJECTS_DATA.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
