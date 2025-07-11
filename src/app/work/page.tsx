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
}

export default async function WorkPage() {
  const items: PortfolioItem[] = await sanityClient.fetch(`*[_type == "portfolioItem"]{
    title,
    slug,
    videoClip {
      asset -> {
        url
      }
    }
  }`);

  return (
    <>
      {/* Work Grid Section */}
      <main className="max-w-7xl mx-auto px-4 py-20 space-y-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="text-center">
              {item.videoClip?.asset?.url ? (
                <video
                  src={item.videoClip.asset.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full shadow"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
                  <span>No clip available</span>
                </div>
              )}

              <Link
                href={`/work/${item.slug.current}`}
                className="block mt-6 text-xl font-bold text-white hover:text-white transition"
              >
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Our Clients Section */}
<section className="bg-white py-20 px-4 md:px-0 text-center w-full">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-5xl md:text-7xl font-extrabold mb-8 text-black drop-shadow-lg">
      Our Clients
    </h2>
    <p className="text-lg md:text-xl text-gray-700 mt-6">
      We partner with leading brands, attorneys, healthcare innovators, and consumer companies to produce high-impact direct-response campaigns that drive real results.
    </p>
  </div>
</section>


      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-20 px-4 md:px-0 text-center w-full">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-5xl md:text-6xl font-black mb-6 text-black"
            style={{
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            Why Choose Performance Driven Media?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            We don’t just produce content – we create direct-response campaigns engineered for measurable performance. From strategic creative development to cinematic production and optimized post, our team delivers video that sells, educates, and inspires action across every platform.
          </p>
        </div>
      </section>
    </>
  );
}
