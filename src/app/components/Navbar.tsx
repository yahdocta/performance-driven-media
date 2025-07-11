import Link from 'next/link';
import Image from 'next/image';
import { sanityClient } from '@/app/lib/sanity';

interface NavigationLink {
  label: string;
  url: string;
}

interface NavbarData {
  logoText: string;
  logo?: {
    asset: {
      url: string;
    };
  };
  navigationLinks: NavigationLink[];
}

export default async function Navbar() {
  const data: NavbarData = await sanityClient.fetch(`*[_type == "navbar"][0]{
    logoText,
    logo { asset -> { url } },
    navigationLinks
  }`);

  return (
    <nav className="bg-black/80 backdrop-blur-lg shadow-2xl sticky top-0 z-50 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {data.logo?.asset?.url ? (
            <Image
              src={data.logo.asset.url}
              alt={data.logoText || 'Logo'}
              width={200}
              height={200}
              className="object-contain h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
          ) : (
            <span className="text-2xl font-black text-white tracking-wide drop-shadow-lg group-hover:text-red-400 transition-colors duration-300">
              {data.logoText}
            </span>
          )}
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-1">
          {data.navigationLinks?.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-gray-300 hover:text-red-700 transition-all duration-300 font-semibold px-4 py-2 hover:scale-110"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
