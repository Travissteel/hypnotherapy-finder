import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Hypnotherapists',
  description: 'Search 1,150+ certified hypnotherapists near you. Filter by specialty, location, session type, insurance and more to find the right practitioner.',
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
