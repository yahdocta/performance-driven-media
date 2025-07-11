'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logosPerView, setLogosPerView] = useState(5);

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

  // Reset to start when logosPerView changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [logosPerView]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, logos.length - logosPerView);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  if (!logos || logos.length === 0) return null;

  const maxIndex = Math.max(0, logos.length - logosPerView);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <div className="flex items-center gap-4 px-4">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className={`w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/25 flex-shrink-0 ${!canGoPrev ? 'opacity-40 cursor-not-allowed' : ''}`}
        aria-label="Previous logos"
        disabled={!canGoPrev}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Logos Container */}
      <div className="overflow-hidden w-full max-w-[120rem]">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / logosPerView}%)`,
          }}
        >
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center justify-center px-10"
              style={{ width: `${100 / logosPerView}%` }}
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
        className={`w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-red-500/25 flex-shrink-0 ${!canGoNext ? 'opacity-40 cursor-not-allowed' : ''}`}
        aria-label="Next logos"
        disabled={!canGoNext}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
} 