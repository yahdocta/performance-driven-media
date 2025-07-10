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
    <nav className="bg-black/70 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {data.logo?.asset?.url ? (
            <Image
  src={data.logo.asset.url}
  alt={data.logoText || 'Logo'}
  width={200} // request a higher resolution from Next.js
  height={200}
  className="object-contain h-10 w-auto" // still displays at 40px height visually
  priority
/>
          ) : (
            <span className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg">
              {data.logoText}
            </span>
          )}
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-8">
          {data.navigationLinks?.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-gray-200 hover:text-red-400 transition-colors duration-200 font-medium px-2 py-1 hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
