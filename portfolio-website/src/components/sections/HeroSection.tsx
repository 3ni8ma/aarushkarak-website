import React from 'react';
import { FadeIn } from '../utilities/FadeIn';
import { Magnet } from '../utilities/Magnet';
import { ContactButton } from '../ui/ContactButton';

export const HeroSection: React.FC = () => {
  return (
    <section className="h-screen w-full flex flex-col justify-between overflow-x-clip bg-dark-bg relative">
      <FadeIn delay={0} y={-20} className="w-full px-6 md:px-10 pt-6 md:pt-8 flex justify-between items-center z-20">
        <span className="text-text-light font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">Aarush Karak</span>
        <nav className="flex gap-6 sm:gap-10">
          {["About", "Price", "Projects", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-text-light font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
            >
              {link}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="w-full overflow-hidden mt-6 sm:mt-4 md:-mt-5 z-20 pointer-events-none">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m aarush
          </h1>
        </FadeIn>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 z-10 bottom-0 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
              alt="Aarush Karak Portrait"
              className="w-full h-auto object-contain pointer-events-auto select-none rounded-[40px]"
            />
          </Magnet>
        </FadeIn>
      </div>

      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-text-light font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};
