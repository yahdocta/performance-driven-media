import { sanityClient } from '@/app/lib/sanity';
import Link from 'next/link';

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

interface ServicesPageData {
  servicesSection: ServicesSection;
  industriesSection: IndustriesSection;
}

// Icon component for industries
function IndustryIcon({ icon }: { icon: string }) {
  const icons: { [key: string]: React.ReactElement } = {
    health: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    legal: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    diy: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    home: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    education: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    tech: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    pets: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    beauty: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
      </svg>
    ),
    surgery: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    auto: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    realestate: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    auction: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
  };

  return icons[icon] || icons.health;
}

export default async function ServicesPage() {
  const data: ServicesPageData = await sanityClient.fetch(
    `*[_type == "servicesPage"][0]{
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

  // Fallback data
  const fallbackData: ServicesPageData = {
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

  const pageData = data || fallbackData;

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
            <span className="block mb-2">Our</span>
            <span className="block text-red-500 animate-pulse">
              Services
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            Direct-response campaigns that drive measurable results through strategic creative and cinematic production
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

      {/* Services Section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-red-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-red-50 rounded-full opacity-50"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-black leading-tight">
            <span className="block mb-2">{pageData.servicesSection.headline.split('—')[0]}</span>
            <span className="block text-red-600">
              {pageData.servicesSection.headline.split('—')[1]}
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-16">
            {pageData.servicesSection.subhead}
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


        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-white leading-tight">
              <span className="block mb-2">{pageData.industriesSection.header.split(' to ')[0]}</span>
              <span className="block text-red-500">
                {pageData.industriesSection.header.split(' to ')[1]}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {pageData.industriesSection.subhead}
            </p>
          </div>

                     {/* Industries Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
             {pageData.industriesSection.industries.map((industry, idx) => (
               <div 
                 key={idx}
                 className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 hover:scale-[1.02] animate-fadeInUp"
                 style={{ animationDelay: `${idx * 100}ms` }}
               >
                 <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                   <IndustryIcon icon={industry.icon} />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-4">{industry.name}</h3>
                 <p className="text-gray-300 leading-relaxed">
                   {industry.whyItWorks}
                 </p>
               </div>
             ))}
           </div>

           {/* CTA Button */}
           <div className="text-center">
             <div className="mb-6">
               <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                 Ready to See Results?
               </h3>
               <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                 Explore our portfolio of high-converting campaigns across all industries
               </p>
             </div>
             <Link
               href="/work"
               className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-12 py-5 text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 border-2 border-red-600 hover:border-red-700 group"
             >
               View Our Work
               <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
             </Link>
           </div>
        </div>
      </section>
    </>
  );
}
