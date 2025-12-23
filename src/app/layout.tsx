import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import LoginSuccessToast from '@/components/shared/LoginSuccessToast';
import LogoutSuccessToast from '@/components/shared/LogoutSuccessToast';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://events-activities-frontend-alpha.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: 'EventsHub | Find People for Events & Activities',
    template: '%s | EventsHub',
  },

  description:
    'EventsHub helps you find like-minded people for events, sports, hobbies and activities near you. Join concerts, hikes, meetups and more — never attend alone again.',

  authors: [{ name: 'Repon' }],
  creator: 'Repon',
  publisher: 'Repon',

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://events-activities-frontend-alpha.vercel.app',
    siteName: 'EventsHub',
    title: 'EventsHub | Find People for Events & Activities',
    description:
      'Find companions for concerts, sports, hobbies and meetups. EventMate connects you with people who share your interests.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EventsHub - Events & Activities Platform',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'EventsHub | Find People for Events & Activities',
    description:
      'Join events, meet people and enjoy activities together. Never attend alone again.',
    images: ['/og-image.png'],
  },

  alternates: {
    canonical: 'https://events-activities-frontend-alpha.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position='bottom-right' richColors />
        <Suspense fallback={null}>
          <LoginSuccessToast />
          <LogoutSuccessToast />
        </Suspense>
      </body>
    </html>
  );
}
