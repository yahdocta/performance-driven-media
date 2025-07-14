// work/[slug]/page.tsx
// Dynamic portfolio item page. Fetches item data from Sanity and renders video and description.

import { sanityClient } from '@/app/lib/sanity';
import { notFound } from 'next/navigation';

// Props for dynamic route
interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Portfolio item type
interface PortfolioItem {
  title: string;
  fullVideo: string;
  description: string;
}

// Main PortfolioItemPage component
export default async function PortfolioItemPage({ params }: Props) {
  const { slug } = await params;

  // Fetch portfolio item data from Sanity CMS
  const item: PortfolioItem | null = await sanityClient.fetch(
    `*[_type == "portfolioItem" && slug.current == $slug][0]{
      title,
      fullVideo,
      description
    }`,
    { slug }
  );

  if (!item) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-20">
      {/* Video section */}
      {item.fullVideo && (
        <div className="mb-8 w-full" style={{ aspectRatio: '16/9' }}>
          <iframe
            src={`https://www.youtube.com/embed/${item.fullVideo}?modestbranding=1&rel=0`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded shadow-lg"
          />
        </div>
      )}
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 text-center">{item.title}</h1>
      {/* Description */}
      <p className="text-md text-gray-300">{item.description}</p>
    </main>
  );
}

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const items: { slug: { current: string } }[] = await sanityClient.fetch(
    `*[_type == "portfolioItem"]{ slug }`
  );

  return items.map(item => ({
    slug: item.slug.current,
  }));
}
