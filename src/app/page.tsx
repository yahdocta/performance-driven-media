import { sanityClient } from '@/app/lib/sanity';
import Image from 'next/image';

export default async function HomePage() {
  const data = await sanityClient.fetch(`*[_type == "homepage"][0]{
    heroTitle,
    heroSubheadline,
    primaryCTA { text, url },
    secondaryCTA { text, url },
    introStatement,
    logoCarousel[]{
      asset->{
        url
      },
      alt
    }
  }`);

  if (!data) {
    return (
      <main className="text-center py-10">
        <h1 className="text-4xl font-bold">Homepage content not found</h1>
      </main>
    );
  }

  return (
    <main className="">
      {/* Hero Section */}
      <section className="relative w-full h-[720px] flex flex-col justify-center items-center text-center px-4 bg-black">
        <div className="absolute w-full h-full bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-white text-4xl md:text-5xl font-bold">{data.heroTitle}</h1>
          <p className="text-gray-300 text-xl mt-4">{data.heroSubheadline}</p>
          <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center">
            {data.primaryCTA && (
              <a
                href={data.primaryCTA.url}
                className="bg-red-500 text-white px-8 py-4 rounded"
              >
                {data.primaryCTA.text}
              </a>
            )}
            {data.secondaryCTA && (
              <a
                href={data.secondaryCTA.url}
                className="bg-gray-700 text-white px-8 py-4 rounded"
              >
                {data.secondaryCTA.text}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-lg md:text-xl text-gray-800">{data.introStatement}</p>
      </section>

      {/* Logo Carousel */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-6xl mx-auto flex overflow-x-auto gap-8 px-4">
          {data.logoCarousel?.map((logo: any, index: number) => (
            <div key={index} className="flex-shrink-0 grayscale hover:grayscale-0 transition duration-300">
              <Image
                src={logo.asset.url}
                alt={logo.alt || 'Client logo'}
                width={150}
                height={80}
                className="object-contain w-auto h-20"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
