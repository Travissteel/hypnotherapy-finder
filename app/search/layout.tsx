import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Hypnotherapists | Hypnotherapy Finder',
  description: 'Search for qualified hypnotherapists near you. Filter by specialty, location, session type, and more.',
  robots: {
    index: false,
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
