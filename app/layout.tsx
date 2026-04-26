import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/lib/contexts/AuthContext';

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hypnotherapy-finder.com'),
  title: {
    default: 'Find a Certified Hypnotherapist Near You | Hypnotherapy Finder',
    template: '%s | Hypnotherapy Finder'
  },
  description: 'Connect with qualified hypnotherapy practitioners specializing in anxiety, weight loss, smoking cessation, and more. Search 1,150+ verified hypnotherapists nationwide.',
  keywords: ['hypnotherapy', 'hypnotherapist', 'hypnosis therapy', 'anxiety treatment', 'weight loss hypnotherapy', 'quit smoking', 'certified hypnotherapist'],
  authors: [{ name: 'Hypnotherapy Finder' }],
  creator: 'Hypnotherapy Finder',
  publisher: 'Hypnotherapy Finder',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Hypnotherapy Finder',
    title: 'Find a Certified Hypnotherapist Near You | Hypnotherapy Finder',
    description: 'Connect with qualified hypnotherapy practitioners specializing in anxiety, weight loss, smoking cessation, and more. Search 1,150+ verified hypnotherapists nationwide.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Hypnotherapy Finder - Find Certified Hypnotherapists',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find a Certified Hypnotherapist Near You | Hypnotherapy Finder',
    description: 'Connect with qualified hypnotherapy practitioners specializing in anxiety, weight loss, smoking cessation, and more.',
    site: '@Hypnofinder',
    creator: '@Hypnofinder',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://hypnotherapy-finder.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="hf3Bguy0ovGEzuCoUnDQMw" async></script>
      </head>
      <body
        className={`${dmSans.variable} ${instrumentSerif.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
