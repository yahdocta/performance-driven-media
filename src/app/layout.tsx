// layout.tsx
// Root layout for the Next.js app, includes global styles, metadata, and shared components.

import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { sanityClient } from './lib/sanity';

// Load Inter font from Google Fonts
const inter = Inter({ subsets: ['latin'] });

// Default site metadata
export const metadata = {
  title: 'Performance Driven Media',
  description: 'High-converting video production agency',
};

// Fetch favicon from Sanity CMS
async function getFavicon() {
  try {
    const data = await sanityClient.fetch(`*[_type == "homepage"][0]{
      favicon {
        asset -> {
          url
        }
      }
    }`);
    
    if (data?.favicon?.asset?.url) {
      console.log('✅ Favicon found in Sanity:', data.favicon.asset.url);
      return data.favicon.asset.url;
    } else {
      console.log('⚠️ No favicon found in Sanity, using fallback');
      return null;
    }
  } catch (error) {
    console.error('❌ Error fetching favicon from Sanity:', error);
    return null;
  }
}

// Root layout component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faviconUrl = await getFavicon();

  return (
    <html lang="en">
      <head>
        {/* Use favicon from Sanity if available, otherwise fallback */}
        {faviconUrl ? (
          <link rel="icon" type="image/png" href={`${faviconUrl}?v=${Date.now()}`} />
        ) : (
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        )}
      </head>
      <body className={inter.className}>
        {/* Shared Navbar at the top */}
        <Navbar />
        {/* Main page content */}
        {children}
        {/* Shared Footer at the bottom */}
        <Footer />
      </body>
    </html>
  );
}
