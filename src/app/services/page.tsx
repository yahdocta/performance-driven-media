import { sanityClient } from '@/app/lib/sanity';
import Link from 'next/link';

interface ServicesPageData {
  headline: string;
  subhead: string;
  overviewSection: {
    title: string;
    description: string;
  };
  creativeDevelopment: {
    title: string;
    description: string;
    services: string[];
    cardTitle: string;
    cardDescription: string;
  };
  production: {
    title: string;
    description: string;
    services: string[];
    cardTitle: string;
    cardDescription: string;
  };
  postProduction: {
    title: string;
    description: string;
    services: string[];
    cardTitle: string;
    cardDescription: string;
  };
  ctaSection: {
    title: string;
    description: string;
    buttonLabel: string;
    buttonLink: string;
  };
}

export default async function ServicesPage() {
  const data: ServicesPageData = await sanityClient.fetch(
    `*[_type == "servicesPage"][0]{
      headline,
      subhead,
      overviewSection,
      creativeDevelopment,
      production,
      postProduction,
      ctaSection
    }`
  );

  // Fallback data in case Sanity data is missing or has old structure
  const fallbackData: ServicesPageData = {
    headline: data?.headline || 'Our Services',
    subhead: data?.subhead || 'Direct-response campaigns that drive measurable results through strategic creative and cinematic production',
    overviewSection: {
      title: data?.overviewSection?.title || 'Complete Production Pipeline',
      description: data?.overviewSection?.description || 'From concept to final delivery, we handle every aspect of your direct-response campaign with precision and creativity.',
    },
    creativeDevelopment: {
      title: data?.creativeDevelopment?.title || 'Creative Development',
      description: data?.creativeDevelopment?.description || 'Strategic creative development that transforms your message into compelling visual narratives designed to drive action.',
      services: data?.creativeDevelopment?.services || [
        'Strategic messaging development',
        'Creative concept development',
        'Storyboard creation',
        'Script writing and refinement',
        'Target audience analysis'
      ],
      cardTitle: data?.creativeDevelopment?.cardTitle || 'Strategic Creative',
      cardDescription: data?.creativeDevelopment?.cardDescription || 'We develop creative concepts that resonate with your target audience and drive measurable results through compelling storytelling and strategic messaging.',
    },
    production: {
      title: data?.production?.title || 'Production Excellence',
      description: data?.production?.description || 'Cinematic production services that bring your creative vision to life with professional quality and attention to detail.',
      services: data?.production?.services || [
        'Professional video production',
        'Cinematography and lighting',
        'Audio recording and mixing',
        'Location scouting and management',
        'Talent casting and direction'
      ],
      cardTitle: data?.production?.cardTitle || 'Cinematic Production',
      cardDescription: data?.production?.cardDescription || 'Professional production with state-of-the-art equipment and experienced crews to capture your vision with cinematic quality and precision.',
    },
    postProduction: {
      title: data?.postProduction?.title || 'Post-Production & Repurposing',
      description: data?.postProduction?.description || 'Expert editing, color grading, and content repurposing to maximize your campaign\'s reach and effectiveness across all platforms.',
      services: data?.postProduction?.services || [
        'Professional video editing',
        'Color grading and correction',
        'Motion graphics and animation',
        'Content repurposing for multiple platforms',
        'Final delivery and optimization'
      ],
      cardTitle: data?.postProduction?.cardTitle || 'Content Optimization',
      cardDescription: data?.postProduction?.cardDescription || 'Professional editing, color grading, and strategic repurposing to create multiple assets from your core content for maximum ROI.',
    },
    ctaSection: {
      title: data?.ctaSection?.title || 'Ready to Get Started?',
      description: data?.ctaSection?.description || 'Let\'s discuss your project and create a direct-response campaign that drives real results for your business.',
      buttonLabel: data?.ctaSection?.buttonLabel || 'Get Started',
      buttonLink: data?.ctaSection?.buttonLink || '/contact',
    },
  };

  // Use fallback data if original data is missing
  const pageData = data ? fallbackData : fallbackData;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-50"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-700/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Our
            <span className="block bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent animate-pulse">
              Services
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            {pageData.subhead}
          </p>

          {/* Floating stats */}
          <div className="flex justify-center space-x-8 md:space-x-16 mt-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-red-500 mb-2">100%</div>
              <div className="text-sm text-gray-400">Performance Driven</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-red-500 mb-2">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-red-500 mb-2">∞</div>
              <div className="text-sm text-gray-400">Possibilities</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-red-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-red-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-red-50 rounded-full opacity-50"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-black">
            Complete
            <span className="block bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Production Pipeline
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-16">
            {pageData.overviewSection.description}
          </p>

          {/* Process steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-black text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Creative</h3>
              <p className="text-gray-600">Strategic development and concept creation</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-black text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Production</h3>
              <p className="text-gray-600">Cinematic filming and professional execution</p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-black text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Delivery</h3>
              <p className="text-gray-600">Optimized editing and multi-platform delivery</p>
            </div>
          </div>

          {/* CTA button */}
          <div className="inline-block">
            <Link
              href={pageData.ctaSection.buttonLink}
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 border-2 border-red-600 hover:border-red-700"
            >
              {pageData.ctaSection.buttonLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Creative Development Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Creative
                <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  Development
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {pageData.creativeDevelopment.description}
              </p>
              <ul className="space-y-4">
                {pageData.creativeDevelopment.services.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-red-500 transition-colors duration-300">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{pageData.creativeDevelopment.cardTitle}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {pageData.creativeDevelopment.cardDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-700/50">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{pageData.production.cardTitle}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {pageData.production.cardDescription}
                </p>
              </div>
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
                Production
                <span className="block bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {pageData.production.description}
              </p>
              <ul className="space-y-4">
                {pageData.production.services.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-red-500 transition-colors duration-300">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 group-hover:text-black transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Production Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Post-Production
                <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  & Repurposing
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {pageData.postProduction.description}
              </p>
              <ul className="space-y-4">
                {pageData.postProduction.services.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3 group">
                    <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-red-500 transition-colors duration-300">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{pageData.postProduction.cardTitle}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {pageData.postProduction.cardDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-white">
            Ready to
            <span className="block bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
              Get Started?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
            {pageData.ctaSection.description}
          </p>
          <Link
            href={pageData.ctaSection.buttonLink}
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
          >
            {pageData.ctaSection.buttonLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
