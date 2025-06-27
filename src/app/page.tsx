import { sanityClient } from '@/app/lib/sanity';

export default async function HomePage() {
  const data = await sanityClient.fetch(`*[_type == "homepage"][0]{
    heroTitle,
    heroSubtitle
  }`);

  return (
    <main className="text-center py-10">
      <h1 className="text-4xl font-bold">{data.heroTitle}</h1>
      <p className="mt-4 text-lg">{data.heroSubtitle}</p>
    </main>
  );
}
