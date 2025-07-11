import { sanityClient } from '@/app/lib/sanity';
import Image from 'next/image';

interface AboutPageData {
  headline: string;
  subhead: string;
  overview: string[];
  logoStyle?: {
    title: string;
    description: string;
    image?: {
      asset: { url: string };
    };
  };
}

export default async function AboutPage() {
  const data: AboutPageData = await sanityClient.fetch(
    `*[_type == "aboutPage"][0]{
      headline,
      subhead,
      overview,
      logoStyle {
        title,
        description,
        image { asset -> { url } }
      }
    }`
  );

  // Fallback data if no content exists in Sanity yet
  const fallbackData: AboutPageData = {
    headline: 'Your Story. Our Strategy. Limitless Possibilities.',
    subhead: 'Fusing Hollywood storytelling with performance-driven strategy.',
    overview: [
      'Experience in legal, health, consumer sectors',
      'Offices in [City], clients across U.S. & Canada',
      'Leadership from TV, DRTV, and digital ad backgrounds',
    ],
    logoStyle: {
      title: 'The Racing Stripe Mark',
      description: 'Symbol of motion and precision. Works in print, embroidery, animation.',
    },
  };

  const pageData = data || fallbackData;

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              <span className="block mb-2">{pageData.headline.split('.')[0]}</span>
              <span className="block mb-2 text-red-500">{pageData.headline.split('.')[1]}</span>
              <span className="block text-white">{pageData.headline.split('.')[2]}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {pageData.subhead}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              <span className="block">Who We <span className="text-red-500 relative">
                Are
                <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500"></div>
              </span></span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-1 gap-8">
            {pageData.overview.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{idx + 1}</span>
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Style Section */}
      {pageData.logoStyle && (
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                <span className="block mb-2">{pageData.logoStyle.title}</span>
              </h2>
              <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {pageData.logoStyle.description}
              </p>
            </div>
            
            {pageData.logoStyle.image?.asset?.url && (
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
                  <Image
                    src={pageData.logoStyle.image.asset.url}
                    alt="Racing Stripe Mark"
                    width={300}
                    height={90}
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
            Ready to Tell Your Story?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's create something extraordinary together. Your vision, our expertise, limitless possibilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 border-2 border-red-600 hover:border-red-700"
            >
              Get Started Today
            </a>
            <a 
              href="/work" 
              className="inline-block bg-transparent hover:bg-gray-100 text-black font-bold py-4 px-8 text-lg border-2 border-black hover:border-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </main>
  );
} 