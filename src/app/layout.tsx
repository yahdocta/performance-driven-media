import './globals.css';
import Navbar from '@/app/components/Navbar';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Performance Driven Media',
  description: 'Where Storytelling Converts',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
