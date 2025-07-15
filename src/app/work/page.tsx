// work/page.tsx
// Work/portfolio page for Performance Driven Media. Fetches portfolio items and work page data from Sanity and renders hero, projects, industries, and why choose us sections.

// (Add comments to each section, interface, and major logic block throughout the file for clarity.)
import { sanityClient } from '@/app/lib/sanity';
import Link from 'next/link';

interface VideoClipAsset {
  asset: {
    url: string;
  };
}

interface PortfolioItem {
  title: string;
  slug: {
    current: string;
  };
  videoClip?: VideoClipAsset;
  _id: string;
}

interface Stat {
  number: string;
  label: string;
}

interface HeroStats {
  stat1: Stat;
  stat2: Stat;
  stat3: Stat;
}

interface ProjectsSection {
  title: string;
  subtitle: string;
  projectBadge: string;
  viewProjectText: string;
}

interface ClientsSection {
  title: string;
  description: string;
  industries: string[];
}

interface WhyChooseSection {
  title: string;
  description: string;
  ctaButton: string;
  ctaLink: string;
}

interface WorkPageData {
  heroTitle: string;
  heroSubtitle: string;
  heroStats: HeroStats;
  projectsSection: ProjectsSection;
  clientsSection: ClientsSection;
  whyChooseSection: WhyChooseSection;
}

export default async function WorkPage() {
  const items: PortfolioItem[] = await sanityClient.fetch(`*[_type == "portfolioItem" && !(_id in path("drafts.**"))] | order(_createdAt desc){
    _id,
    title,
    slug,
    videoClip {
      asset -> {
        url
      }
    }
  }`);

  const data: WorkPageData = await sanityClient.fetch(
    `*[_type == "workPage"][0]{
      heroTitle,
      heroSubtitle,
      heroStats {
        stat1 { number, label },
        stat2 { number, label },
        stat3 { number, label }
      },
      projectsSection {
        title,
        subtitle,
        projectBadge,
        viewProjectText
      },
      clientsSection {
        title,
        description,
        industries
      },
      whyChooseSection {
        title,
        description,
        ctaButton,
        ctaLink
      }
    }`
  );

  // Fallback data to prevent runtime errors
  const fallbackData: WorkPageData = {
    heroTitle: 'Our Work',
    heroSubtitle: 'Direct-response campaigns that drive measurable results through strategic creative and cinematic production',
    heroStats: {
      stat1: { number: '100+', label: 'Projects Delivered' },
      stat2: { number: '$50M+', label: 'Revenue Generated' },
      stat3: { number: '24/7', label: 'Support' }
    },
    projectsSection: {
      title: 'Featured Projects',
      subtitle: 'Explore our latest direct-response campaigns that drive real results for our clients',
      projectBadge: 'Direct Response',
      viewProjectText: 'View Project'
    },
    clientsSection: {
      title: 'Industries We Serve',
      description: 'We specialize in high-conversion verticals where education, emotion, and action intersect.',
      industries: [
        'Health & Wellness',
        'Legal Services & Mass Torts',
        'DIY & Household',
        'Home & Garden',
        'Education & Coaching',
        'Subscription & Tech',
        'Pet Products',
        'Beauty & Anti-Aging',
        'Plastic Surgery',
        'Auto Dealerships',
        'Real Estate Agencies',
        'Foreclosure Auctions'
      ]
    },
    whyChooseSection: {
      title: 'Why Choose Performance Driven Media?',
      description: 'We don\'t just produce content – we create direct-response campaigns engineered for measurable performance. From strategic creative development to cinematic production and optimized post, our team delivers video that sells, educates, and inspires action across every platform.',
      ctaButton: 'Start Your Project',
      ctaLink: '/contact'
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
            <span className="block mb-2">{pageData.heroTitle.split(' ')[0]}</span>
            <span className="block text-red-500 animate-pulse">
              {pageData.heroTitle.split(' ')[1]}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            {pageData.heroSubtitle}
          </p>

          {/* Floating stats */}
          <div className="flex justify-center space-x-8 md:space-x-16 mt-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            {[
              { stat: pageData.heroStats.stat1, delay: 0 },
              { stat: pageData.heroStats.stat2, delay: 200 },
              { stat: pageData.heroStats.stat3, delay: 400 }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-red-500 mb-2">{item.stat.number}</div>
                <div className="text-sm text-gray-400">{item.stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-red-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Work Grid Section */}
      <section className="py-20 px-4 bg-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
              <span className="block mb-2">{pageData.projectsSection.title.split(' ')[0]}</span>
              <span className="block text-red-500">
                {pageData.projectsSection.title.split(' ')[1]}
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {pageData.projectsSection.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <div 
                key={item._id} 
                className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 hover:border-red-600/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20 animate-fadeInUp"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Video Container */}
                <div className="relative overflow-hidden">
                  {item.videoClip?.asset?.url ? (
                    <video
                      src={item.videoClip.asset.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      disablePictureInPicture
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 select-none"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-600/50 flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                          </svg>
                        </div>
                        <span className="text-gray-400 text-sm">No preview available</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Project badge */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-bold">
                    {pageData.projectsSection.projectBadge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <Link
                    href={`/work/${item.slug.current}`}
                    className="block group"
                  >
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      <span className="text-sm">{pageData.projectsSection.viewProjectText}</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/30 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-circles"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="absolute top-10 right-10 w-20 h-20 bg-red-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-red-50 rounded-full opacity-50"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-black leading-tight">
            <span className="block mb-2">{pageData.clientsSection.title.split(' ')[0]}</span>
            <span className="block text-red-600">
              {pageData.clientsSection.title.split(' ')[1]} {pageData.clientsSection.title.split(' ')[2]}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mt-6 leading-relaxed max-w-3xl mx-auto mb-16">
            {pageData.clientsSection.description}
          </p>
          {/* Replaced industries grid with a button to services page */}
          <div className="flex justify-center">
            <Link
              href="/services"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-white leading-tight">
            <span className="block mb-2">{pageData.whyChooseSection.title.split(' ').slice(0, 2).join(' ')}</span>
            <span className="block text-red-500">
              {pageData.whyChooseSection.title.split(' ').slice(2).join(' ')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
            {pageData.whyChooseSection.description}
          </p>
          
          {/* CTA button */}
          <div className="inline-block">
            <Link
              href={pageData.whyChooseSection.ctaLink}
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
            >
              {pageData.whyChooseSection.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
