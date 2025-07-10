import { sanityClient } from '@/app/lib/sanity';

export default async function PortfolioItemPage({ params }: { params: { slug: string } }) {
  const item = await sanityClient.fetch(
    `*[_type == "portfolioItem" && slug.current == $slug][0]{
      title,
      fullVideo,
      description
    }`,
    { slug: params.slug }
  );

  if (!item) {
    return <p className="text-center py-20">Portfolio item not found.</p>;
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
