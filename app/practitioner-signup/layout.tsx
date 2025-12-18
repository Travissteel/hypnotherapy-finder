import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Your Hypnotherapy Practice | Hypnotherapy Finder',
  description: 'Join our directory of certified hypnotherapists. Reach more clients, grow your practice, and connect with people seeking hypnotherapy services.',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/practitioner-signup',
  },
  openGraph: {
    url: 'https://hypnotherapy-finder.com/practitioner-signup',
    title: 'List Your Hypnotherapy Practice | Hypnotherapy Finder',
    description: 'Join our directory of certified hypnotherapists. Reach more clients, grow your practice, and connect with people seeking hypnotherapy services.',
    siteName: 'Hypnotherapy Finder',
    locale: 'en_US',
    type: 'website',
  },
};

export default function PractitionerSignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
