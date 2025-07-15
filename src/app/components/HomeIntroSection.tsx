"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type HomeIntroSectionProps = {
  introHeadline: string;
  introParagraph: string;
};

export default function HomeIntroSection({ introHeadline, introParagraph }: HomeIntroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        paraRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.1,
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

  // Split headline for gradient if needed (as in original)
  const headlineLines = introHeadline?.split('\n');

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-gray-50 to-white py-20 px-4 md:px-0 flex justify-center relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      <div className="absolute top-10 right-10 w-20 h-20 bg-red-100 rounded-full opacity-50"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-red-50 rounded-full opacity-50"></div>
      <div className="max-w-4xl text-center relative z-10">
        <h2
          ref={headlineRef}
          className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6"
        >
          {headlineLines?.[0]}
          {headlineLines?.[1] && (
            <span className="block bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              {headlineLines[1]}
            </span>
          )}
        </h2>
        <p
          ref={paraRef}
          className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
        >
          {introParagraph?.split('Performance Driven Media').length > 1
            ? <>{introParagraph.split('Performance Driven Media')[0]}<span className="font-bold text-black">Performance Driven Media</span>{introParagraph.split('Performance Driven Media')[1]}</>
            : introParagraph}
        </p>
      </div>
    </section>
  );
} 