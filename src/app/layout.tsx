import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CommandBar } from '@/components/CommandBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OmniTrack',
  description: 'Your Business, Simplified.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CommandBar />
        {children}
      </body>
    </html>
  );
}

