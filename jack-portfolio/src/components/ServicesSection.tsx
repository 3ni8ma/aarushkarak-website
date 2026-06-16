import FadeIn from './FadeIn';

const services = [
  {
    num: '01',
    name: '3D Modeling',
    desc: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    num: '02',
    name: 'Rendering',
    desc: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    num: '03',
    name: 'Motion Design',
    desc: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    num: '04',
    name: 'Branding',
    desc: 'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.',
  },
  {
    num: '05',
    name: 'Web Design',
    desc: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <h2 className="text-dark font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
        Services
      </h2>

      <div className="max-w-5xl mx-auto">
        {services.map((svc, i) => (
          <FadeIn key={svc.num} delay={i * 0.1} y={20} duration={0.5}>
            <div className="flex items-start gap-6 sm:gap-10 md:gap-16 py-8 sm:py-10 md:py-12 border-b" style={{ borderColor: 'rgba(12,12,12,0.15)' }}>
              <span className="text-dark font-black shrink-0 text-[clamp(3rem,10vw,140px)] leading-none">
                {svc.num}
              </span>
              <div className="pt-2 sm:pt-3 md:pt-4">
                <h3 className="text-dark font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] leading-tight">
                  {svc.name}
                </h3>
                <p className="text-dark font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] mt-2" style={{ opacity: 0.6 }}>
                  {svc.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
