import Link from 'next/link';
import { sanityClient } from '@/app/lib/sanity';

interface NavigationLink {
  label: string;
  url: string;
}

interface NavbarData {
  logoText: string;
  navigationLinks: NavigationLink[];
}

export default async function Navbar() {
  const data: NavbarData = await sanityClient.fetch(`*[_type == "navbar"][0]{
    logoText,
    navigationLinks
  }`);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-xl font-bold text-gray-800">{data.logoText}</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6">
          {data.navigationLinks?.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-gray-700 hover:text-red-500 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
