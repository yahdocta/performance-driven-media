// Navbar.tsx
// Sticky navigation bar with logo and dynamic navigation links fetched from Sanity.

import Link from 'next/link';
import Image from 'next/image';
import { sanityClient } from '@/app/lib/sanity';

// Navigation link type
interface NavigationLink {
  label: string;
  url: string;
}

// Navbar data structure
interface NavbarData {
  logoText: string;
  logo?: {
    asset: {
      url: string;
    };
  };
  navigationLinks: NavigationLink[];
}

// Main Navbar component
export default async function Navbar() {
  // Fetch navbar data from Sanity CMS
  const data: NavbarData = await sanityClient.fetch(`*[_type == "navbar"][0]{
    logoText,
    logo { asset -> { url } },
    navigationLinks
  }`);

  return (
    <nav className="bg-black/80 backdrop-blur-lg shadow-2xl sticky top-0 z-50 border-b border-gray-800/50 relative">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-3 flex justify-between items-center w-full">
        {/* Logo (image or text fallback) */}
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
        <div className="flex flex-wrap gap-1">
          {data.navigationLinks?.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-gray-300 hover:text-red-700 transition-all duration-300 font-semibold px-2 sm:px-4 py-2 hover:scale-110"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Decorative red stripe at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
    </nav>
  );
}
