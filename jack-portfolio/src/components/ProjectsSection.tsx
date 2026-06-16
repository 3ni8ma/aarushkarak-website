import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';
import FadeIn from './FadeIn';

const projects = [
  {
    num: '01',
    category: 'Client',
    name: 'Nextlevel Studio',
    col1img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    num: '02',
    category: 'Personal',
    name: 'Aura Brand Identity',
    col1img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    num: '03',
    category: 'Client',
    name: 'Solaris Digital',
    col1img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
];

function ProjectCard({ project, index, totalCards }: {
  project: typeof projects[0];
  index: number;
  totalCards: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const top = index * 28;

  return (
    <div ref={ref} className="sticky h-[85vh]" style={{ top: '24px', zIndex: 10 - index }}>
      <motion.div
        style={{ scale, top }}
        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-dark p-4 sm:p-6 md:p-8 h-full flex flex-col"
      >
        <div className="flex items-start justify-between mb-4 sm:mb-6 md:mb-8">
          <span className="text-dark font-black text-[clamp(3rem,10vw,140px)] leading-none hero-heading">
            {project.num}
          </span>
          <div className="text-right">
            <span className="block text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm mb-1">
              {project.category}
            </span>
            <h3 className="text-[#D7E2EA] font-medium uppercase tracking-wide text-base sm:text-lg md:text-xl">
              {project.name}
            </h3>
          </div>
          <LiveProjectButton className="hidden sm:inline-block ml-auto" />
        </div>

        <div className="flex-1 flex gap-2 sm:gap-3 md:gap-4 min-h-0">
          <div className="flex-[2] flex flex-col gap-2 sm:gap-3 md:gap-4">
            <img
              src={project.col1img1}
              alt=""
              loading="lazy"
              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.col1img2}
              alt=""
              loading="lazy"
              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          <div className="flex-[3]">
            <img
              src={project.col2img}
              alt=""
              loading="lazy"
              className="w-full h-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover"
            />
          </div>
        </div>

        <LiveProjectButton className="sm:hidden mt-4" />
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="bg-dark rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-10"
    >
      <FadeIn delay={0} y={40} duration={0.7}>
        <h2 className="hero-heading font-black uppercase tracking-tight leading-none text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
          Project
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.num}
            project={project}
            index={i}
            totalCards={projects.length}
          />
        ))}
      </div>
    </section>
  );
}
