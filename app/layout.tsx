import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';

import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar';

const font = localFont({
  src: [
    {
      path: './fonts/Gabarito-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Gabarito-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Gabarito-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Gabarito-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Gabarito-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/Gabarito-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'QuillSights',
  description:
    'QuillSights is your pdf companion, where you can chat with your pdf',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn('min-h-screen antialiased grainy', font.className)}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
