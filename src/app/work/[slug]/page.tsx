import { sanityClient } from '@/app/lib/sanity';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

interface PortfolioItem {
  title: string;
  fullVideo: string;
  description: string;
}

export default async function PortfolioItemPage({ params }: Props) {
  const { slug } = await params;

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


      <h1 className="text-2xl font-bold mb-4 text-center">{item.title}</h1>

      <p className="text-md text-gray-300">{item.description}</p>
    </main>
  );
}

export async function generateStaticParams() {
  const items: { slug: { current: string } }[] = await sanityClient.fetch(
    `*[_type == "portfolioItem"]{ slug }`
  );

  return items.map(item => ({
    slug: item.slug.current,
  }));
}
