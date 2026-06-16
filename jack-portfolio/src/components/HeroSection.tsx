import ContactButton from './ContactButton';
import Magnet from './Magnet';
import FadeIn from './FadeIn';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden overflow-x-clip">
      <FadeIn delay={0} y={-20} duration={0.7}>
        <nav className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
          <a href="#about" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
            About
          </a>
          <a href="#price" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
            Price
          </a>
          <a href="#projects" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
            Projects
          </a>
          <a href="#contact" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
            Contact
          </a>
        </nav>
      </FadeIn>

      <div className="flex-1 flex flex-col justify-center relative overflow-hidden">
        <FadeIn delay={0.15} y={40} duration={0.7}>
          <div className="overflow-hidden">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
              Hi, i&apos;m jack
            </h1>
          </div>
        </FadeIn>
      </div>

      <div className="flex items-end justify-between pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn delay={0.35} y={20} duration={0.7} className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)]">
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} duration={0.7}>
          <ContactButton />
        </FadeIn>
      </div>

      <Magnet padding={150} strength={3} className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <FadeIn delay={0.6} y={30} duration={0.7}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Jack portrait"
            className="w-full h-auto"
          />
        </FadeIn>
      </Magnet>
    </section>
  );
}
