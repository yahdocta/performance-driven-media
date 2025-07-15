"use client"

import { useState } from 'react';
import Link from 'next/link';

interface NavigationLink {
  label: string;
  url: string;
}

interface MobileMenuProps {
  navigationLinks: NavigationLink[];
}

export default function MobileMenu({ navigationLinks }: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
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

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-black/95 shadow-lg z-50">
          <div className="flex flex-col items-center justify-center py-6 min-h-[200px]">
            {navigationLinks?.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-white hover:text-red-700 transition-all duration-300 font-bold text-lg px-6 py-4 text-center w-full"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
} 