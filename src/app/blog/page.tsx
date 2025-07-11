import { sanityClient } from '@/app/lib/sanity';

interface Stat {
  number: string;
  label: string;
}

interface Stats {
  title: string;
  stat1: Stat;
  stat2: Stat;
  stat3: Stat;
}

interface FeaturedCaseStudy {
  title: string;
  subtitle: string;
  highlights: string[];
  ctaLabel: string;
  ctaLink: string;
}

interface Article {
  title: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  link?: string;
}

interface ArticlesSection {
  title: string;
  subtitle: string;
}

interface CTASection {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface BlogPageData {
  heroTitle: string;
  heroSubtitle: string;
  stats: Stats;
  featuredCaseStudy: FeaturedCaseStudy;
  articlesSection: ArticlesSection;
  otherArticles: Article[];
  ctaSection: CTASection;
}

export default async function BlogPage() {
  const data: BlogPageData = await sanityClient.fetch(
    `*[_type == "blogPage"][0]{
      heroTitle,
      heroSubtitle,
      stats {
        title,
        stat1 { number, label },
        stat2 { number, label },
        stat3 { number, label }
      },
      featuredCaseStudy {
        title,
        subtitle,
        highlights,
        ctaLabel,
        ctaLink
      },
      articlesSection {
        title,
        subtitle
      },
      otherArticles[]{
        title,
        excerpt,
        category,
        readTime,
        link
      },
      ctaSection {
        title,
        subtitle,
        buttonText,
        buttonLink
      }
    }`
  );

  // Fallback data to prevent runtime errors
  const fallbackData: BlogPageData = {
    heroTitle: 'Insights & Results',
    heroSubtitle: 'Real strategies that drive real returns. Discover the tactics behind successful performance-driven media campaigns.',
    stats: {
      title: 'Proven Performance',
      stat1: { number: '2M+', label: 'Units Sold' },
      stat2: { number: '6 Years', label: 'ROI Tracked' },
      stat3: { number: '30 Min', label: 'Avg. Runtime' }
    },
    featuredCaseStudy: {
      title: 'How Drill Doctor Sold 2 Million Units Through Long‑Form Infomercials',
      subtitle: 'A deep dive into the strategy that revolutionized direct response television',
      highlights: [
        '30-minute demo-heavy infomercial',
        '2M+ units sold',
        '6 years of broadcast ROI',
        'Visual proof + product education = success'
      ],
      ctaLabel: 'Read Full Case Study',
      ctaLink: '#'
    },
    articlesSection: {
      title: 'Latest Insights',
      subtitle: 'Expert analysis and proven strategies from the front lines of performance-driven media.'
    },
    otherArticles: [
      {
        title: 'Why Long-Form Still Wins in 2025',
        excerpt: 'Despite the rise of short-form content, long-form infomercials continue to deliver superior conversion rates and ROI.',
        category: 'Strategy',
        readTime: '8 min read'
      },
      {
        title: 'Short vs. Long: Where Your Funnel Actually Converts',
        excerpt: 'Data-driven analysis of conversion rates across different content lengths and formats.',
        category: 'Analytics',
        readTime: '6 min read'
      },
      {
        title: 'Top Performing Infomercial Formats in 2024–2025',
        excerpt: 'The most effective formats, timing, and creative approaches for maximum viewer engagement.',
        category: 'Trends',
        readTime: '10 min read'
      }
    ],
    ctaSection: {
      title: 'Ready to See Real Results?',
      subtitle: 'Let\'s discuss how performance-driven media can transform your business.',
      buttonText: 'Start Your Campaign',
      buttonLink: '/contact'
    }
  };

  const pageData = data || fallbackData;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-700/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent">
            {pageData.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {pageData.heroSubtitle}
          </p>
          
          {/* Scroll Indicator */}
          <div className="mt-16 flex justify-center">
            <div className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-red-500 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23dc2626&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-red-400">
            {pageData.stats.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { stat: pageData.stats.stat1, delay: 0 },
              { stat: pageData.stats.stat2, delay: 200 },
              { stat: pageData.stats.stat3, delay: 400 }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="text-center group hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${item.delay}ms` }}
              >
                <div className="text-6xl md:text-7xl font-bold text-red-500 mb-4 group-hover:text-red-400 transition-colors">
                  {item.stat.number}
                </div>
                <div className="text-xl text-gray-300 font-medium">
                  {item.stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-8 md:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500/10 rounded-full blur-xl"></div>
            
            <div className="relative">
              <div className="inline-block bg-red-500 text-black px-4 py-2 rounded text-sm font-bold mb-6">
                FEATURED CASE STUDY
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {pageData.featuredCaseStudy.title}
              </h2>
              
              <p className="text-xl text-gray-300 mb-8">
                {pageData.featuredCaseStudy.subtitle}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  {pageData.featuredCaseStudy.highlights.slice(0, 2).map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {pageData.featuredCaseStudy.highlights.slice(2).map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {pageData.featuredCaseStudy.ctaLink && (
                <a
                  href={pageData.featuredCaseStudy.ctaLink}
                  className="inline-block bg-red-500 hover:bg-red-600 text-black px-8 py-4 text-lg font-bold transition-colors duration-300"
                >
                  {pageData.featuredCaseStudy.ctaLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {pageData.articlesSection.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {pageData.articlesSection.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.otherArticles.map((article, idx) => (
              <article 
                key={idx}
                className="bg-black border border-gray-800 p-6 hover:border-red-500 transition-colors duration-300 group"
              >
                {article.category && (
                  <div className="inline-block bg-red-500/20 text-red-400 px-3 py-1 rounded text-sm font-medium mb-4">
                    {article.category}
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-red-400 transition-colors">
                  {article.title}
                </h3>
                
                {article.excerpt && (
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  {article.readTime && (
                    <span className="text-sm text-gray-500">
                      {article.readTime}
                    </span>
                  )}
                  
                  {article.link && (
                    <a
                      href={article.link}
                      className="text-red-500 hover:text-red-400 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300"
                    >
                      Read More →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 to-red-800/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {pageData.ctaSection.title}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {pageData.ctaSection.subtitle}
          </p>
          
          {pageData.ctaSection.buttonLink && (
            <a
              href={pageData.ctaSection.buttonLink}
              className="inline-block bg-red-500 hover:bg-red-600 text-black px-8 py-4 text-lg font-bold transition-colors duration-300"
            >
              {pageData.ctaSection.buttonText}
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
