import { sanityClient } from '@/app/lib/sanity';

export default async function HomePage() {
  const data = await sanityClient.fetch(`*[_type == "homepage"][0]{
    reelVideo {
      asset -> {
        url
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
      </section>
    </main>
  );
}
