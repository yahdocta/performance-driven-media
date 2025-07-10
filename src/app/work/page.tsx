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
    <main className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-12">Our Work</h1>

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
                className="w-full rounded shadow"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
                <span>No clip available</span>
              </div>
            )}

            <Link
              href={`/work/${item.slug.current}`}
              className="block mt-4 text-lg text-red-500 hover:underline"
            >
              {item.title}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
