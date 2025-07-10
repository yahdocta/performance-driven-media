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
    notFound(); // renders Next.js 404 page
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-6 text-center">{item.title}</h1>

      {item.fullVideo && (
        <div className="mb-8 aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${item.fullVideo}`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded shadow"
          />
        </div>
      )}

      <p className="text-lg text-gray-700">{item.description}</p>
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
