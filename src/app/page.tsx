import { sanityClient } from '@/app/lib/sanity';
import Image from 'next/image';

interface CTA {
  label: string;
  link: string;
}

interface Logo {
  asset: {
    url: string;
  };
  alt: string;
}

interface HomePageData {
  reelVideo: {
    asset: {
      url: string;
    };
  };
  heroHeadline: string;
  primaryCTA: CTA;
  secondaryCTA: CTA;
  logoCarousel: {
    heading: string;
    logos: Logo[];
  };
}

export default async function HomePage() {
  const data: HomePageData = await sanityClient.fetch(`*[_type == "homepage"][0]{
    reelVideo { asset -> { url } },
    heroHeadline,
    primaryCTA,
    secondaryCTA,
    logoCarousel {
      heading,
      logos[] {
        asset -> { url },
        alt
      }
    }
  }`);

  if (!data || !data.reelVideo?.asset?.url) {
    return (
      <main className="text-center py-10">
        <h1 className="text-4xl font-bold">No background video found</h1>
      </main>
    );
  }

  return (
    <main>
      <section className="relative w-full h-screen overflow-hidden">
  {/* Background Video */}
  <video
    src={data.reelVideo.asset.url}
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    className="absolute top-0 left-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40 z-10"></div>

  {/* Overlay Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 translate-y-[-10%]">
    <h1
      className="text-white text-4xl md:text-6xl font-bold mb-8 text-center"
      style={{
        textShadow: '2px 2px 10px rgba(0,0,0,0.8)',
      }}
    >
      {data.heroHeadline}
    </h1>
    <div className="flex gap-4 mt-2">
      {data.primaryCTA && (
        <a
          href={data.primaryCTA.link}
          className="px-8 py-3 bg-red-700 hover:bg-red-800 text-white font-semibold shadow transition rounded-none"
        >
          {data.primaryCTA.label}
        </a>
      )}
      {data.secondaryCTA && (
        <a
          href={data.secondaryCTA.link}
          className="px-8 py-3 bg-white text-black font-semibold shadow hover:bg-gray-200 transition rounded-none"
        >
          {data.secondaryCTA.label}
        </a>
      )}
    </div>
  </div>
</section>


      {/* Intro Statement Section */}
      <section className="w-full bg-slate-100 py-16 px-4 md:px-0 flex justify-center">
        <div className="max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Infomercials have evolved.
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Today, they’re precision-built marketing tools that blend
            <br />
            powerful storytelling with measurable response. At{' '}
            <span className="font-semibold text-black">Performance Driven Media</span>, we craft
            campaigns that work just as hard as you do—designed to educate, inspire, and convert.
          </p>
        </div>
      </section>

      {/* Logo Carousel Section */}
      {data.logoCarousel && (
        <section className="py-32 bg-neutral-50 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 px-4 text-gray-800">
            {data.logoCarousel.heading}
          </h2>
          <div className="flex overflow-x-auto gap-20 px-4 justify-center">
            {data.logoCarousel.logos?.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 transition-transform duration-300 transform hover:-translate-y-2 hover:scale-101"
                style={{ paddingTop: '1.0rem' }}
              >
                <Image
                  src={logo.asset.url}
                  alt={logo.alt}
                  width={300}
                  height={150}
                  className="object-contain w-auto h-48"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
