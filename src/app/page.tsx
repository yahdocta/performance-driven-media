// page.tsx
// Home page for Performance Driven Media. Fetches homepage data from Sanity and renders hero, intro, trusted by, and logo carousel sections.

import { sanityClient } from '@/app/lib/sanity';
import Link from 'next/link';
import LogoCarousel from './components/LogoCarousel';

// CTA button type
interface CTA {
  label: string;
  link: string;
}

// Logo type
interface Logo {
  asset: {
    url: string;
  };
  alt: string;
}

// Homepage data structure
interface HomePageData {
  reelVideo: {
    asset: {
      url: string;
    };
  };
  heroHeadline: string;
  primaryCTA: CTA;
  secondaryCTA: CTA;
  logoCarousel: {
    heading: string;
    logos: Logo[];
  };
}

// Main HomePage component
export default async function HomePage() {
  // Fetch homepage data from Sanity CMS
  const data: HomePageData = await sanityClient.fetch(`*[_type == "homepage"][0]{
    reelVideo { asset -> { url } },
    heroHeadline,
    primaryCTA,
    secondaryCTA,
    logoCarousel {
      heading,
      logos[] {
        asset -> { url },
        alt
      }
    }
  }`);

  // Fallback if no video is found
  if (!data || !data.reelVideo?.asset?.url) {
    return (
      <main className="text-center py-10">
        <h1 className="text-4xl font-bold">No background video found</h1>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section with background video and overlay */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          src={data.reelVideo.asset.url}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Enhanced Dark Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden z-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-700/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 translate-y-[-10%]">
          <h1
            className="text-white text-4xl md:text-6xl lg:text-7xl font-black mb-8 text-center tracking-tight animate-fadeInUp"
            style={{
              textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            {data.heroHeadline}
          </h1>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            {data.primaryCTA && (
              <Link
                href={data.primaryCTA.link}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 border-2 border-red-600 hover:border-red-700"
              >
                {data.primaryCTA.label}
              </Link>
            )}
            {data.secondaryCTA && (
              <Link
                href={data.secondaryCTA.link}
                className="px-8 py-4 bg-white/90 hover:bg-white text-black font-bold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-white/90 hover:border-white"
              >
                {data.secondaryCTA.label}
              </Link>
            )}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Statement Section */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-white py-20 px-4 md:px-0 flex justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-red-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-red-50 rounded-full opacity-50"></div>
        
        <div className="max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 animate-fadeInUp">
            Infomercials have
            <span className="block bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              evolved.
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Today, they&apos;re precision-built marketing tools that blend powerful storytelling with measurable response. At{' '}
            <span className="font-bold text-black">Performance Driven Media</span>, we craft campaigns that work just as hard as you do—designed to educate, inspire, and convert.
          </p>
        </div>
      </section>

      {/* Trusted by Industry Leaders Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-pattern-dots opacity-50"></div>
        
        <div className="relative z-10">
          <div className="text-center px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white animate-fadeInUp leading-tight">
              <span className="block mb-2">Trusted by</span>
              <span className="block text-red-500">
                Industry Leaders
              </span>
            </h2>
          </div>
        </div>
      </section>

      {/* Logo Carousel Section */}
      {data.logoCarousel && (
        <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-pattern-dots opacity-50"></div>
          
          <div className="relative z-10">
            <div className="py-8">
              <LogoCarousel logos={data.logoCarousel.logos} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
