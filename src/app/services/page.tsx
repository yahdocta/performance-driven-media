// services/page.tsx
// Services page for Performance Driven Media. Fetches services, industries, and long-form benefits from Sanity and renders all sections.

import { sanityClient } from '@/app/lib/sanity';
import Link from 'next/link';
import IndustriesGrid from "./IndustriesGrid";
import { Clock3, BarChart3, BadgeDollarSign } from 'lucide-react';

interface Industry {
  name: string;
  whyItWorks: string;
  icon: string;
  ctaText: string;
  ctaLink: string;
}

interface ServicesSection {
  headline: string;
  subhead: string;
  creativeDevelopment: {
    title: string;
    services: string[];
  };
  production: {
    title: string;
    services: string[];
  };
  postProduction: {
    title: string;
    services: string[];
  };
  ctaButton: string;
  ctaLink: string;
}

interface IndustriesSection {
  header: string;
  subhead: string;
  industries: Industry[];
}

interface LongFormBenefit {
  title: string;
  description: string;
  icon: string;
}

interface LongFormSection {
  headline: string;
  subheadline: string;
  description: string;
  benefits: LongFormBenefit[];
  ctaText: string;
  ctaLink: string;
}

interface ServicesPageData {
  longFormSection: LongFormSection;
  servicesSection: ServicesSection;
  industriesSection: IndustriesSection;
}

// Fallback data
const fallbackData: ServicesPageData = {
  longFormSection: {
    headline: 'The Power of 30 Minutes',
    subheadline: '30 Minutes',
    description: 'Where most agencies fail, we excel. Our 30-minute long-form spots are engineered to hold attention, build trust, and drive conversions through strategic storytelling and proven direct-response principles.',
    benefits: [
      {
        title: 'Extended Engagement',
        description: '30 minutes of undivided attention allows us to build deep trust, address objections, and create emotional connections that short spots simply can\'t achieve.',
        icon: 'clock'
      },
      {
        title: 'Higher Conversion Rates',
        description: 'More time means more proof, more testimonials, more demonstrations, and more compelling reasons to buy—resulting in significantly higher conversion rates.',
        icon: 'chart'
      },
      {
        title: 'Proven ROI',
        description: 'Our 30-minute format has consistently delivered 3-5x higher ROI compared to traditional short-form campaigns across all verticals.',
        icon: 'lightning'
      }
    ],
    ctaText: 'Start Your 30-Minute Campaign',
    ctaLink: '/contact'
  },
  servicesSection: {
    headline: 'From Idea to Air—And Everywhere in Between',
    subhead: 'Strategy, production, and post—optimized for performance.',
    creativeDevelopment: {
      title: 'Creative Development',
      services: ['Concept ideation', 'Scriptwriting & messaging', 'Direct-response strategy']
    },
    production: {
      title: 'Production',
      services: ['On-location shoots', 'Multi-camera setups', 'Direction & casting']
    },
    postProduction: {
      title: 'Post-Production & Repurposing',
      services: ['Editing & pacing optimization', 'Cutdowns for social and digital', 'Landing page VSLs', 'Graphics & supers']
    },
    ctaButton: 'Download Services Guide',
    ctaLink: '/contact'
  },
  industriesSection: {
    header: 'From Broadcast to Scroll-Stopping Campaigns',
    subhead: 'We specialize in high-conversion verticals where education, emotion, and action intersect.',
    industries: [
      {
        name: 'Health & Wellness',
        whyItWorks: 'Health products thrive on education and emotional connection. Our campaigns build trust through expert testimonials and before/after results.',
        icon: 'health',
        ctaText: 'See Campaigns in This Category',
        ctaLink: '/work'
      },
      {
        name: 'Legal Services & Mass Torts',
        whyItWorks: 'Legal campaigns require authority and empathy. We create compelling narratives that educate viewers about their rights and options.',
        icon: 'legal',
        ctaText: 'See Campaigns in This Category',
        ctaLink: '/work'
      },
      {
        name: 'DIY & Household',
        whyItWorks: 'DIY products need demonstration and problem-solving. Our campaigns show real solutions to everyday household challenges.',
        icon: 'diy',
        ctaText: 'See Campaigns in This Category',
        ctaLink: '/work'
      },
      {
        name: 'Home & Garden',
        whyItWorks: 'Home improvement thrives on transformation. We showcase dramatic before/after results that inspire immediate action.',
        icon: 'home',
        ctaText: 'See Campaigns in This Category',
        ctaLink: '/work'
      },
      {
        name: 'Education & Coaching',
        whyItWorks: 'Educational content builds authority and trust. Our campaigns position experts as the solution to viewers\' challenges.',
        icon: 'education',
        ctaText: 'See Campaigns in This Category',
        ctaLink: '/work'
      },
      {
        name: 'Subscription & Tech',
        whyItWorks: 'Tech products need explanation and demonstration. We break down complex features into compelling benefits.',
        icon: 'tech',
        ctaText: 'See Campaigns in This Category',
        ctaLink: '/work'
      },
      {
        name: 'Pet Products',
        whyItWorks: 'Pet products connect through emotional bonds. Our campaigns showcase the love between pets and owners.',
        icon: 'pets',
        ctaText: 'See Campaigns in This Category',
        ctaLink: '/work'
      },
      {
        name: 'Beauty & Anti-Aging',
        whyItWorks: 'Beauty products sell transformation and confidence. We create aspirational content that drives immediate purchase decisions.',
        icon: 'beauty',
        ctaText: 'See Campaigns in This Category',
        ctaLink: '/work'
      },
      {
        name: 'Plastic Surgery',
        whyItWorks: 'Medical procedures require trust and expertise. Our campaigns build confidence through doctor testimonials and patient results.',
        icon: 'surgery',
        ctaText: 'See Campaigns in This Category',
        ctaLink: '/work'
      },
      {
        name: 'Auto Dealerships',
        whyItWorks: 'Auto sales need urgency and value. We create campaigns that highlight limited-time offers and exclusive deals.',
        icon: 'auto',
        ctaText: 'See Campaigns in This Category',
        ctaLink: '/work'
      },
      {
        name: 'Real Estate Agencies',
        whyItWorks: 'Real estate thrives on local expertise and market knowledge. We position agents as the go-to resource for buyers and sellers.',
        icon: 'realestate',
        ctaText: 'See Campaigns in This Category',
        ctaLink: '/work'
      },
      {
        name: 'Foreclosure Auctions',
        whyItWorks: 'Auctions create urgency and opportunity. We build excitement around limited inventory and exclusive access.',
        icon: 'auction',
        ctaText: 'See Campaigns in This Category',
        ctaLink: '/work'
      }
    ]
  }
};

export default async function ServicesPage() {
  const data: ServicesPageData = await sanityClient.fetch(
    `*[_type == "servicesPage"][0]{
      longFormSection {
        headline,
        subheadline,
        description,
        benefits[] {
          title,
          description,
          icon
        },
        ctaText,
        ctaLink
      },
      servicesSection {
        headline,
        subhead,
        creativeDevelopment {
          title,
          services
        },
        production {
          title,
          services
        },
        postProduction {
          title,
          services
        },
        ctaButton,
        ctaLink
      },
      industriesSection {
        header,
        subhead,
        industries[] {
          name,
          whyItWorks,
          icon,
          ctaText,
          ctaLink
        }
      }
    }`
  );
  const pageData = data || fallbackData;

  return (
    <>
      {/* Long-Form Expertise Section */}
      <section className="min-h-[90vh] flex items-center py-20 px-4 bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-white leading-tight">
              <span className="block mb-2">{pageData.longFormSection.headline.split(' of ')[0]} of</span>
              <span className="block text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-yellow-200 via-red-300 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl font-extrabold relative" style={{ 
                animation: 'pulseLight 3s ease-in-out infinite',
                filter: 'brightness(1)'
              }}>
                {pageData.longFormSection.subheadline}
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-red-100 max-w-4xl mx-auto leading-relaxed">
              {pageData.longFormSection.description}
            </p>
          </div>

          {/* Long-form benefits grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pageData.longFormSection.benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
                <div className="flex items-center justify-center mx-auto mb-6">
                  {benefit.icon === 'clock' && <Clock3 size={40} strokeWidth={1.5} className="text-white" />}
                  {benefit.icon === 'chart' && <BarChart3 size={40} strokeWidth={1.5} className="text-white" />}
                  {benefit.icon === 'lightning' && <BadgeDollarSign size={40} strokeWidth={1.5} className="text-white" />}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-red-100 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA for long-form */}
          <div className="text-center">
            <Link
              href={pageData.longFormSection.ctaLink}
              className="inline-flex items-center bg-white hover:bg-red-50 text-red-800 px-12 py-5 text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-white hover:border-red-50 group"
            >
              {pageData.longFormSection.ctaText}
              <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-red-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-red-50 rounded-full opacity-50"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-black leading-tight">
            <span className="block mb-2">From 30-Second Spots</span>
            <span className="block text-red-600">to 30-Minute Epics</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-16">
            While we specialize in high-converting long-form content, we&apos;re masters of all formats—from quick social media hits to comprehensive educational campaigns.
          </p>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Creative Development */}
            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">{pageData.servicesSection.creativeDevelopment.title}</h3>
              <ul className="space-y-3 text-left">
                {pageData.servicesSection.creativeDevelopment.services.map((service, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0 mt-2"></div>
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Production */}
            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">{pageData.servicesSection.production.title}</h3>
              <ul className="space-y-3 text-left">
                {pageData.servicesSection.production.services.map((service, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0 mt-2"></div>
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Post-Production */}
            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">{pageData.servicesSection.postProduction.title}</h3>
              <ul className="space-y-3 text-left">
                {pageData.servicesSection.postProduction.services.map((service, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0 mt-2"></div>
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content Formats Section */}
          <div className="mt-20">
            <h3 className="text-3xl md:text-4xl font-black text-black mb-12 text-center">
              <span className="block mb-2">Content Formats</span>
              <span className="block text-red-600 text-2xl md:text-3xl">We Do It All</span>
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Long-Form (Featured) */}
              <div className="group bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 border-2 border-red-600 hover:border-red-500 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">30-Minute Long-Form</h4>
                <p className="text-red-100 text-sm leading-relaxed">
                  Our specialty. High-converting educational and demonstration content that builds trust and drives sales.
                </p>
                <div className="mt-3">
                  <span className="inline-block bg-white/20 text-white text-xs px-2 py-1 rounded-full">Our Expertise</span>
                </div>
              </div>

              {/* Short-Form */}
              <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-black mb-2">15-60 Second Spots</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Quick-hitting social media content, TV spots, and digital ads that grab attention and drive action.
                </p>
              </div>

              {/* Mid-Form */}
              <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-black mb-2">2-5 Minute Mid-Form</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Perfect for product demos, testimonials, and educational content that needs more depth than short-form.
                </p>
              </div>

              {/* VSLs */}
              <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-black mb-2">Video Sales Letters</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Landing page VSLs, webinar replays, and sales presentations optimized for conversion.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Industries Section */}
      <IndustriesGrid
        industries={pageData.industriesSection.industries}
        header={pageData.industriesSection.header}
        subhead={pageData.industriesSection.subhead}
      />
    </>
  );
}
