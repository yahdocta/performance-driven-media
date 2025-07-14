// Footer.tsx
// Footer component with logo, CTA, contact info, and legal links. Data is fetched from Sanity.

import { sanityClient } from '@/app/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

// Footer data structure
interface FooterData {
  logo?: {
    asset: {
      url: string;
    };
  };
  headline: string;
  ctaLabel: string;
  ctaLink: string;
  getInTouchTitle: string;
  getInTouchSubtitle: string;
  getInTouchDescription: string;
  contactInfoTitle: string;
  phoneNumber: string;
  emailAddress: string;
  privacyPolicyLink: string;
  termsOfServiceLink: string;
  copyrightText: string;
}

// Main Footer component
export default async function Footer() {
  // Fetch footer data from Sanity CMS
  const data: FooterData = await sanityClient.fetch(`*[_type == "footer"][0]{
    logo { asset -> { url } },
    headline,
    ctaLabel,
    ctaLink,
    getInTouchTitle,
    getInTouchSubtitle,
    getInTouchDescription,
    contactInfoTitle,
    phoneNumber,
    emailAddress,
    privacyPolicyLink,
    termsOfServiceLink,
    copyrightText
  }`);

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Main footer content */}
        <div className="text-center mb-8">
          {/* Logo (image or fallback text) */}
          <div className="mb-6">
            {data.logo?.asset?.url ? (
              <Image
                src={data.logo.asset.url}
                alt="Performance Driven Media Logo"
                width={240}
                height={60}
                className="h-16 w-auto object-contain mx-auto"
              />
            ) : (
              <div className="h-16 flex items-center justify-center">
                <span className="text-xl font-black text-red-500">PDM</span>
              </div>
            )}
          </div>

          {/* Headline */}
          <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">
            {data.headline}
          </h2>

          {/* CTA Button */}
          <div className="mb-6">
            <Link
              href={data.ctaLink}
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 text-base shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 border-2 border-red-600 hover:border-red-700"
            >
              {data.ctaLabel}
            </Link>
          </div>
        </div>

        {/* Contact and info section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-3 text-red-400">{data.getInTouchTitle}</h3>
            <p className="text-gray-300 mb-2 text-sm">{data.getInTouchSubtitle}</p>
            <p className="text-gray-300 text-sm">{data.getInTouchDescription}</p>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold mb-3 text-red-400">{data.contactInfoTitle}</h3>
            <p className="text-gray-300 mb-2 text-sm">Phone: {data.phoneNumber}</p>
            <p className="text-gray-300 text-sm">Email: {data.emailAddress}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-6"></div>

        {/* Bottom section: copyright and legal links */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <p className="text-xs text-gray-400">{data.copyrightText}</p>
          <div className="flex space-x-6 text-xs">
            <Link href={data.privacyPolicyLink} className="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href={data.termsOfServiceLink} className="text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
