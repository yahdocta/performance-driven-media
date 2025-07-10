import { sanityClient } from '@/app/lib/sanity';
import Image from 'next/image';

interface FooterData {
  logo?: {
    asset: {
      url: string;
    };
  };
  headline: string;
  ctaLabel: string;
  ctaLink: string;
  copyrightText: string;
}

export default async function Footer() {
  const data: FooterData = await sanityClient.fetch(`*[_type == "footer"][0]{
    logo { asset -> { url } },
    headline,
    ctaLabel,
    ctaLink,
    copyrightText
  }`);

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-6">
        <div>
          {data.logo?.asset?.url ? (
            <Image
              src={data.logo.asset.url}
              alt="Performance Driven Media Logo"
              width={220}   // increased width
              height={60}   // increased height
              className="h-16 mb-4 object-contain" // adjusted h-16 for ~64px height
            />
          ) : (
            <p className="text-gray-400">Logo not available</p>
          )}
        </div>
        <p className="text-lg font-semibold">{data.headline}</p>
        <a
          href={data.ctaLink}
          className="inline-block bg-red-700 hover:bg-red-800 hover:scale-105 text-white font-bold py-3 px-8 shadow-lg transition duration-200 rounded-none"
        >
          {data.ctaLabel}
        </a>
        <hr className="w-full border-gray-700 my-6" />
        <p className="text-sm text-gray-400">{data.copyrightText}</p>
      </div>
    </footer>
  );
}
