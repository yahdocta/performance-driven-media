"use client"

import { useEffect, useRef } from "react"

// Logo type definition for Sanity compatibility
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
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollWidth = scrollContainer.scrollWidth
    let scrollPosition = 0

    const scroll = () => {
      scrollPosition += 0.5
      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
    }

    const intervalId = setInterval(scroll, 16) // ~60fps

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Removed old description text, now shown above carousel on the page */}

        <div className="relative mt-0 mb-0">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10" />

          <div ref={scrollRef} className="flex gap-4 md:gap-6 overflow-hidden" style={{ scrollBehavior: "auto" }}>
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-56 h-32 md:w-64 md:h-40"
              >
                <img
                  src={logo.asset.url}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}

            {/* Duplicate set for infinite scroll */}
            {logos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-56 h-32 md:w-64 md:h-40"
              >
                <img
                  src={logo.asset.url}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
