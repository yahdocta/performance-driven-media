'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface Logo {
  asset: {
    url: string;
  };
  alt: string;
}

interface LogoCarouselProps {
  logos: Logo[];
}

export default function LogoCarousel({ logos }: LogoCarouselProps) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [logosPerView, setLogosPerView] = useState(5);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setLogosPerView(2);
      else if (window.innerWidth < 1024) setLogosPerView(3);
      else if (window.innerWidth < 1280) setLogosPerView(4);
      else setLogosPerView(5);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Start in the middle of the logos array
  useEffect(() => {
    if (logos && logos.length > 0) {
      const middleIndex = Math.floor((logos.length - logosPerView) / 2);
      setScrollIndex(Math.max(0, middleIndex));
    }
  }, [logos, logosPerView]);

  const handlePrev = () => {
    setScrollIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setScrollIndex((prev) =>
      Math.min(prev + 1, logos.length - logosPerView)
    );
  };

  if (!logos || logos.length === 0) return null;

  return (
    <div className="flex items-center gap-4 px-4">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className={`w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/25 flex-shrink-0 ${scrollIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
        aria-label="Previous logos"
        disabled={scrollIndex === 0}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Logos Row */}
      <div className="overflow-hidden w-full max-w-[120rem]">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${scrollIndex * (100 / logosPerView)}%)`,
            width: `${(logos.length / logosPerView) * 100}%`,
          }}
        >
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center justify-center px-10"
              style={{ width: `${100 / logos.length}%` }}
            >
              <Image
                src={logo.asset.url}
                alt={logo.alt}
                width={1500}
                height={750}
                className="object-contain w-auto h-24 md:h-32 lg:h-40"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className={`w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/25 flex-shrink-0 ${scrollIndex >= logos.length - logosPerView ? 'opacity-40 cursor-not-allowed' : ''}`}
        aria-label="Next logos"
        disabled={scrollIndex >= logos.length - logosPerView}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
} 