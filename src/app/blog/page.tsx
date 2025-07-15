// blog/page.tsx
// Blog page for Performance Driven Media. Fetches blog data from Sanity and renders hero, stats, featured case study, articles, and CTA sections.

import { sanityClient } from '@/app/lib/sanity';
import Link from 'next/link';
import Image from 'next/image';

// Stat type
interface Stat {
  number: string;
  label: string;
}

// Stats section type
interface Stats {
  title: string;
  stat1: Stat;
  stat2: Stat;
  stat3: Stat;
}

// Featured case study type
interface FeaturedCaseStudy {
  title: string;
  subtitle: string;
  highlights: string[];
  ctaLabel: string;
  ctaLink: string;
}

// Blog post type
interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  category?: string;
  readTime?: string;
  mainImage?: {
    asset: {
      url: string;
    };
  };
  publishedAt?: string;
}

// Articles section type
interface ArticlesSection {
  title: string;
  subtitle: string;
}

// CTA section type
interface CTASection {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

// Blog page data structure
interface BlogPageData {
  heroTitle: string;
  heroSubtitle: string;
  stats: Stats;
  featuredCaseStudy: FeaturedCaseStudy;
  articlesSection: ArticlesSection;
  ctaSection: CTASection;
}

// Main BlogPage component
export default async function BlogPage() {
  // Fetch blog page data from Sanity CMS
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
      ctaSection {
        title,
        subtitle,
        buttonText,
        buttonLink
      }
    }`
  );

  // Fetch all blog posts from Sanity
  const blogPosts: BlogPost[] = await sanityClient.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      category,
      readTime,
      mainImage {
        asset -> {
          url
        }
      },
      publishedAt
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
      title: 'How Drill Doctor Sold 2 Million Units Through Long Form Infomercials',
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
          {/* Hero Title with gradient text */}
          <h1
            className="text-6xl md:text-7xl font-bold mb-6 leading-[1.2] pb-2 font-sans overflow-visible"
            style={{
              background: 'linear-gradient(to right, #fff, #fca5a5, #f87171)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
          >
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
          <Link href="/blog/how-drill-doctor-sold-2-million-units-through-long-form-infomercials" className="block group" tabIndex={0}>
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-8 md:p-12 relative overflow-hidden transition-shadow duration-300 group-hover:shadow-2xl group-hover:border-red-500 cursor-pointer">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500/10 rounded-full blur-xl"></div>
              
              <div className="relative">
                <div className="inline-block bg-red-500 text-black px-4 py-2 rounded text-sm font-bold mb-6">
                  FEATURED CASE STUDY
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight group-hover:text-red-400 transition-colors">
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
                
                <Link
                  href="/blog/how-drill-doctor-sold-2-million-units-through-long-form-infomercials"
                  className="inline-block bg-red-500 hover:bg-red-600 text-black px-8 py-4 text-lg font-bold transition-colors duration-300 mt-2"
                  tabIndex={-1}
                  onClick={e => e.stopPropagation()}
                >
                  {pageData.featuredCaseStudy.ctaLabel}
                </Link>
              </div>
            </div>
          </Link>
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
            {blogPosts.map((post) => (
              <article 
                key={post._id}
                className="bg-black border border-gray-800 p-6 hover:border-red-500 transition-colors duration-300 group"
              >
                {post.mainImage && (
                  <div className="mb-4">
                    <Image
                      src={post.mainImage.asset.url}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
                
                {post.category && (
                  <div className="inline-block bg-red-500/20 text-red-400 px-3 py-1 rounded text-sm font-medium mb-4">
                    {post.category}
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-red-400 transition-colors">
                  {post.title}
                </h3>
                
                {post.excerpt && (
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  {post.readTime && (
                    <span className="text-sm text-gray-500">
                      {post.readTime}
                    </span>
                  )}
                  
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="text-red-500 hover:text-red-400 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300"
                  >
                    Read More →
                  </Link>
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
