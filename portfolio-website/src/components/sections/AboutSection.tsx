import React from 'react';
import { FadeIn } from '../utilities/FadeIn';
import { AnimatedText } from '../utilities/AnimatedText';
import { ContactButton } from '../ui/ContactButton';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="min-h-screen bg-dark-bg relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute z-0 top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]">
        <img src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=300&auto=format&fit=crop" alt="Computational Sphere Node" className="w-full h-auto select-none pointer-events-none rounded-full" />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute z-0 bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]">
        <img src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=300&auto=format&fit=crop" alt="Abstract Math Wireframe" className="w-full h-auto select-none pointer-events-none rounded-2xl" />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute z-0 top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]">
        <img src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=300&auto=format&fit=crop" alt="Digital Framework Structural Asset" className="w-full h-auto select-none pointer-events-none rounded-2xl" />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute z-0 bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop" alt="Fluid Glassmorphism Geometry" className="w-full h-auto select-none pointer-events-none rounded-2xl" />
      </FadeIn>

      <div className="flex flex-col items-center text-center z-10 gap-10 sm:gap-14 md:gap-16 w-full max-w-4xl">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            About me
          </h2>
        </FadeIn>

        <div className="w-full flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text="With more than five years of experience in technical projects, i focus on computer science, full-stack development, and spatial computing. As the founder of The Coder Bros and an application developer for Hack Club, i truly enjoy building systems that aim to stand out and solve complex challenges. Let's build something incredible together!"
            className="text-text-light font-medium text-center leading-relaxed max-w-[560px] tracking-wide"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />

          <FadeIn delay={0.2} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
