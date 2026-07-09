import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Hypnotherapy Finder. We\'re here to help you find the right hypnotherapist or answer questions about our directory.',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/contact',
  },
  openGraph: {
    url: 'https://hypnotherapy-finder.com/contact',
    title: 'Contact Us | Hypnotherapy Finder',
    description: 'Get in touch with Hypnotherapy Finder. We\'re here to help you find the right hypnotherapist or answer questions about our directory.',
    siteName: 'Hypnotherapy Finder',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
