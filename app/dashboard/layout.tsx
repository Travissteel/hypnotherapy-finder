import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Hypnotherapy Finder',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
