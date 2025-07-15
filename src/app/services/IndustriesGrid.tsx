"use client";
import { useEffect, useRef } from "react";
import type { JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { Gavel, HeartPulse, Home, GraduationCap, Wrench, MonitorSmartphone, PawPrint, Sparkle, Scissors, Car, Building2, Hammer } from 'lucide-react';

interface Industry {
  name: string;
  whyItWorks: string;
  icon: string;
  ctaText: string;
  ctaLink: string;
}

interface IndustriesGridProps {
  industries: Industry[];
  header?: string;
  subhead?: string;
}

function IndustryIcon({ icon }: { icon: string }) {
  const icons: { [key: string]: React.ReactElement } = {
    health: <HeartPulse size={72} color="#fff" strokeWidth={1.5} />,
    legal: <Gavel size={72} color="#fff" strokeWidth={1.5} />,
    diy: <Wrench size={72} color="#fff" strokeWidth={1.5} />,
    home: <Home size={72} color="#fff" strokeWidth={1.5} />,
    education: <GraduationCap size={72} color="#fff" strokeWidth={1.5} />,
    tech: <MonitorSmartphone size={72} color="#fff" strokeWidth={1.5} />,
    pets: <PawPrint size={72} color="#fff" strokeWidth={1.5} />,
    beauty: <Sparkle size={72} color="#fff" strokeWidth={1.5} />,
    surgery: <Scissors size={72} color="#fff" strokeWidth={1.5} />,
    auto: <Car size={72} color="#fff" strokeWidth={1.5} />,
    realestate: <Building2 size={72} color="#fff" strokeWidth={1.5} />,
    auction: <Hammer size={72} color="#fff" strokeWidth={1.5} />,
  };
  return icons[icon] || <Sparkle size={72} color="#fff" strokeWidth={1.5} />;
}

// Define a color palette for each industry
const industryGradients: { [key: string]: string } = {
  health: 'from-green-400 via-green-600 to-emerald-700',
  legal: 'from-yellow-400 via-yellow-600 to-amber-700',
  diy: 'from-blue-400 via-blue-600 to-indigo-700',
  home: 'from-orange-400 via-orange-600 to-amber-700',
  education: 'from-cyan-400 via-cyan-600 to-blue-700',
  tech: 'from-purple-400 via-purple-600 to-indigo-700',
  pets: 'from-pink-400 via-pink-600 to-rose-700',
  beauty: 'from-fuchsia-400 via-fuchsia-600 to-pink-700',
  surgery: 'from-red-400 via-red-600 to-rose-700',
  auto: 'from-gray-400 via-gray-600 to-gray-800',
  realestate: 'from-lime-400 via-lime-600 to-green-700',
  auction: 'from-teal-400 via-teal-600 to-cyan-700',
};

export default function IndustriesGrid({ industries, header, subhead }: IndustriesGridProps) {
  const industryGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".industry-card");
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: industryGridRef.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: true,
        },
      }
    );
    return () => ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
  }, [industries]);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dots opacity-50"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        {header && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              {(() => {
                // Highlight 'Result-Driven Campaigns' or 'Results-Driven Campaigns' anywhere in the header
                const phraseRegex = /(Results?-Driven Campaigns)/i;
                const parts = header.split(phraseRegex);
                return (
                  <span className="block font-extrabold tracking-tight">
                    {parts.map((part, idx) =>
                      phraseRegex.test(part) ? (
                        <span
                          key={idx}
                          className="bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg"
                        >
                          {part}
                        </span>
                      ) : (
                        <span key={idx} className="text-sky-300 drop-shadow-xl">
                          {part}
                        </span>
                      )
                    )}
                  </span>
                );
              })()}
            </h2>
            {subhead && (
              <p className="text-xl md:text-2xl font-semibold text-white/90 max-w-3xl mx-auto leading-relaxed mt-4 tracking-wide drop-shadow-md">
                {subhead}
              </p>
            )}
          </div>
        )}
        <div ref={industryGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {industries.map((industry, idx) => (
            <div
              key={idx}
              className={`industry-card group relative p-10 rounded-3xl shadow-2xl transition-all duration-400 transform hover:scale-105 hover:shadow-2xl hover:z-10 bg-gradient-to-br ${industryGradients[industry.icon] || 'from-gray-700 via-gray-800 to-gray-900'}`}
              style={{ minHeight: 320 }}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="mb-6 flex items-center justify-center">
                  <span className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                    <IndustryIcon icon={industry.icon} />
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 text-center drop-shadow-lg tracking-tight">
                  {industry.name}
                </h3>
                <p className="text-base md:text-lg text-white/90 text-center leading-relaxed font-medium drop-shadow-md">
                  {industry.whyItWorks}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 