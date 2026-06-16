import React from 'react';
import { FadeIn } from '../utilities/FadeIn';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
}

const SERVICES_DATA: ServiceItem[] = [
  { id: "01", name: "Full-Stack Development", description: "Building clean, interactive web experiences and robust architectures using modern architectures, Python, and JavaScript frameworks." },
  { id: "02", name: "3D Spatial Computing", description: "Creating interactive 3D visualizations, gesture-controlled navigation layers, and real-time data node graphs using tools like Three.js and MediaPipe." },
  { id: "03", name: "AI & Machine Learning", description: "Integrating intelligent contextual components, automated reasoning agents, and custom machine learning data models into production workflows." },
  { id: "04", name: "Technical Branding", description: "Developing aesthetic identities and high-end digital design representations built on premium, sleek minimalism." },
  { id: "05", name: "Web Interface Design", description: "Designing conversion-focused layouts with critical focus on advanced responsive engineering, sleek fluid typography, and precise viewport tracking." }
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="price" className="bg-white text-dark-bg rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <FadeIn delay={0} y={30} className="w-full text-center mb-16 sm:mb-20 md:mb-28">
          <h2 className="text-dark-bg font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            Services
          </h2>
        </FadeIn>

        <div className="w-full flex flex-col">
          {SERVICES_DATA.map((service, index) => (
            <FadeIn
              key={service.id}
              delay={index * 0.1}
              y={40}
              className="w-full border-b border-black/15 py-8 sm:py-10 md:py-12 flex flex-row items-start justify-between group"
            >
              <div className="w-1/3">
                <span className="font-black text-dark-bg leading-none block" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
                  {service.id}
                </span>
              </div>
              <div className="w-2/3 flex flex-col gap-2 pl-4">
                <h3 className="font-medium uppercase text-dark-bg leading-tight" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                  {service.name}
                </h3>
                <p className="font-light leading-relaxed text-dark-bg max-w-2xl opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
