// LogoCarousel.tsx
// This component displays a responsive, scrollable carousel of logos with navigation arrows.

'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

// Logo type definition
interface Logo {
  asset: {
    url: string;
  };
  alt: string;
}

// Props for the LogoCarousel component
interface LogoCarouselProps {
  logos: Logo[];
}

export default function LogoCarousel({ logos }: LogoCarouselProps) {
  // Current index of the first visible logo
  const [currentIndex, setCurrentIndex] = useState(0);
  // Number of logos to show per view, responsive to screen size
  const [logosPerView, setLogosPerView] = useState(5);

  // Adjust logosPerView based on window width
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

  // Reset carousel to start when logosPerView changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [logosPerView]);

  // Navigate to previous set of logos
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Navigate to next set of logos
  const handleNext = () => {
    const maxIndex = Math.max(0, logos.length - logosPerView);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  // If no logos, render nothing
  if (!logos || logos.length === 0) return null;

  // Calculate navigation limits
  const maxIndex = Math.max(0, logos.length - logosPerView);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <div className="flex items-center gap-4 px-4">
      {/* Left Arrow Button */}
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
      <div className="overflow-hidden w-full max-w-full h-56 sm:h-32 md:h-40 lg:h-48">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            // Move the logos horizontally based on currentIndex
            transform: `translateX(-${(currentIndex * 100) / logosPerView}%)`,
          }}
        >
          {logos.map((logo, idx) => (
            <div
              key={idx}
              // Responsive horizontal padding and width for each logo
              className="flex-shrink-0 flex items-center justify-center px-2 sm:px-6 md:px-10"
              style={{ width: `${100 / logosPerView}%` }}
            >
              <Image
                src={logo.asset.url}
                alt={logo.alt}
                width={1500}
                height={750}
                // Responsive height and width for logo images
                className="object-contain w-full h-56 sm:h-32 md:h-40 lg:h-48"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow Button */}
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