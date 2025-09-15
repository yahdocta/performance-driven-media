// page.tsx
// Home page for Performance Driven Media. Fetches homepage data from Sanity and renders hero, intro, trusted by, and logo carousel sections.

import { sanityClient } from '@/app/lib/sanity';
import Link from 'next/link';
import LogoCarousel from './components/logo-carousel';
import HomeIntroSection from './components/HomeIntroSection';
import { generateMetadata as generateSEOMetadata } from './lib/seo';
import { Metadata } from 'next';

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
  introHeadline: string;
  introParagraph: string;
}

// Generate SEO metadata for the homepage
export async function generateMetadata(): Promise<Metadata> {
  // Fetch homepage data for dynamic metadata
  const data = await sanityClient.fetch(`*[_type == "homepage"][0]{
    heroHeadline,
    introHeadline,
    introParagraph
  }`);

  const title = data?.heroHeadline || 'Performance Driven Media - High-Converting Video Production';
  const description = data?.introParagraph || 'High-converting video production agency specializing in direct-response marketing, infomercials, and performance-driven content that drives measurable results.';

  return generateSEOMetadata({
    title,
    description,
    keywords: [
      'video production agency',
      'direct response marketing',
      'infomercial production',
      'commercial video production',
      'performance marketing videos',
      'conversion optimization',
      'video advertising agency',
      'marketing video production',
      'video content creation',
      'advertising video production'
    ],
    url: '/',
    type: 'website',
  });
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
    },
    introHeadline,
    introParagraph
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
          disablePictureInPicture
          className="absolute top-0 left-0 w-full h-full object-cover select-none"
        />

        {/* Removed dark overlay for cleaner video display */}

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden z-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-700/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <h1
            className="text-white text-4xl md:text-6xl lg:text-7xl font-black mb-8 text-center tracking-tight animate-fadeInUp"
            style={{
              textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            {data.heroHeadline}
          </h1>
        </div>

        {/* CTA Buttons - Positioned at bottom */}
        <div className="absolute bottom-56 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp justify-center" style={{ animationDelay: '0.3s' }}>
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
        </div>
      </section>

      {/* Intro Statement Section */}
      <HomeIntroSection introHeadline={data.introHeadline} introParagraph={data.introParagraph} />

      {/* Trusted by Industry Leaders Section */}
      <section className="py-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
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
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
              We&apos;ve had the privilege of working with some of the world&apos;s most innovative companies
            </p>
          </div>
        </div>
      </section>

      {/* Logo Carousel Section */}
      {data.logoCarousel && (
        <section className="py-1 bg-black relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-pattern-dots opacity-50"></div>
          <div className="relative z-10">
            <LogoCarousel logos={data.logoCarousel.logos} />
          </div>
        </section>
      )}
    </main>
  );
}
