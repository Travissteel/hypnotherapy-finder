import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Hypnotherapists | Hypnotherapy Finder',
  description: 'Search and find qualified hypnotherapists near you. Filter by specialty, location, session type, certifications, and more. Browse 1,150+ certified practitioners nationwide.',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/search',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
