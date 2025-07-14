// Navbar.tsx
// Sticky navigation bar with logo and dynamic navigation links fetched from Sanity.

"use client"

import { useState, useEffect } from 'react';
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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState<NavbarData | null>(null);

  // Fetch navbar data from Sanity CMS on mount
  useEffect(() => {
    sanityClient.fetch(`*[_type == "navbar"][0]{
      logoText,
      logo { asset -> { url } },
      navigationLinks
    }`)
    .then((result) => {
      if (result) {
        setData(result);
      } else {
        // Fallback data if no navbar exists in Sanity
        setData({
          logoText: 'PDM',
          navigationLinks: [
            { label: 'Home', url: '/' },
            { label: 'About', url: '/about' },
            { label: 'Services', url: '/services' },
            { label: 'Work', url: '/work' },
            { label: 'Blog', url: '/blog' },
            { label: 'Contact', url: '/contact' }
          ]
        });
      }
    })
    .catch((error) => {
      console.error('Error fetching navbar data:', error);
      // Fallback data on error
      setData({
        logoText: 'PDM',
        navigationLinks: [
          { label: 'Home', url: '/' },
          { label: 'About', url: '/about' },
          { label: 'Services', url: '/services' },
          { label: 'Work', url: '/work' },
          { label: 'Blog', url: '/blog' },
          { label: 'Contact', url: '/contact' }
        ]
      });
    });
  }, []);

  if (!data) {
    return (
      <nav className="bg-black/80 backdrop-blur-lg shadow-2xl sticky top-0 z-50 border-b border-gray-800/50 relative">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 py-3 flex justify-between items-center w-full">
          <div className="text-white">Loading...</div>
        </div>
      </nav>
    );
  }

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

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex flex-wrap gap-1">
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

        {/* Mobile Hamburger Button */}
        <button
          className="sm:hidden text-gray-300 hover:text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-black/95 shadow-lg z-50">
          <div className="flex flex-col py-2">
            {data.navigationLinks?.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-gray-300 hover:text-red-700 transition-all duration-300 font-semibold px-6 py-3 border-b border-gray-800"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Decorative red stripe at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
    </nav>
  );
}
