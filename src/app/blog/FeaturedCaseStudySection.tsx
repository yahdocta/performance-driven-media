"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Link from "next/link";

type FeaturedCaseStudyProps = {
  title: string;
  subtitle: string;
  highlights: string[];
  ctaLabel: string;
  ctaLink: string;
};

export default function FeaturedCaseStudySection({ title, subtitle, highlights, ctaLabel, ctaLink }: FeaturedCaseStudyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <Link href={ctaLink || '#'} className="block group" tabIndex={0}>
          <div
            ref={cardRef}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-8 md:p-12 relative overflow-hidden transition-shadow duration-300 group-hover:shadow-2xl group-hover:border-red-500 cursor-pointer"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500/10 rounded-full blur-xl"></div>
            <div className="relative">
              <div className="inline-block bg-red-500 text-black px-4 py-2 rounded text-sm font-bold mb-6">
                FEATURED CASE STUDY
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight group-hover:text-red-400 transition-colors">
                {title}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {subtitle}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  {highlights.slice(0, 2).map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {highlights.slice(2).map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="inline-block bg-red-500 hover:bg-red-600 text-black px-8 py-4 text-lg font-bold transition-colors duration-300 mt-2">
                {ctaLabel}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>

  );
} 