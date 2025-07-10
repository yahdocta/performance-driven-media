import './globals.css';
import Navbar from '@/app/components/Navbar';
import type { ReactNode } from 'react';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});


export const metadata = {
  title: 'Performance Driven Media',
  description: 'Where Storytelling Converts',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
