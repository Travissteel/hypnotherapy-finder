import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claim Your Listing | Hypnotherapy Finder',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ClaimListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
