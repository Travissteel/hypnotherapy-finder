import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Verified Practitioner Badge | Hypnotherapy Finder',
  description: 'Display your Hypnotherapy Finder verified badge on your website to build trust with potential clients and link back to your listing.',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/badge',
  },
};

const embedCode = (slug: string) =>
  `<a href="https://hypnotherapy-finder.com/practitioner/${slug}" target="_blank" rel="noopener">
  <img src="https://hypnotherapy-finder.com/badges/verified-practitioner.svg"
       alt="Verified on Hypnotherapy Finder"
       width="180" height="60" style="display:block;" />
</a>`;

export default function BadgePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-indigo-50 to-white py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/badges/verified-practitioner.svg"
                alt="Verified on Hypnotherapy Finder badge"
                width={180}
                height={60}
                unoptimized
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Verified Practitioner Badge
            </h1>
            <p className="text-xl text-gray-600">
              Display this badge on your website to show clients you're verified
              on Hypnotherapy Finder — and link directly to your profile.
            </p>
          </div>
        </section>

        {/* Why add the badge */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why add the badge?</h2>
            <ul className="space-y-4">
              {[
                'Builds instant trust — clients see you\'re part of a verified directory',
                'Links clients directly to your profile with reviews and full contact details',
                'Signals professional credibility alongside your certifications',
                'Takes less than 2 minutes to add to any website',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Embed code section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How to add it</h2>
            <p className="text-gray-600 mb-8">
              Copy the code below and paste it into your website where you'd like the badge to appear.
              Replace <code className="bg-gray-200 px-1 rounded text-sm font-mono">your-listing-slug</code> with
              your actual profile slug (visible in your{' '}
              <Link href="/dashboard" className="text-indigo-600 hover:underline">dashboard</Link>
              {' '}or at the end of your listing URL).
            </p>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Your embed code</span>
              </div>
              <pre className="bg-gray-900 text-green-400 text-sm rounded-lg p-4 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                {embedCode('your-listing-slug')}
              </pre>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
              <p className="text-sm text-indigo-800">
                <strong>Find your slug:</strong> Log into your{' '}
                <Link href="/dashboard" className="underline">dashboard</Link>{' '}
                — your personalised embed code with your slug pre-filled is waiting for you there.
                Or find your profile on the directory and copy the last part of the URL.
              </p>
            </div>
          </div>
        </section>

        {/* Placement tips */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Where to place it</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { place: 'Footer', desc: 'Visible on every page — most common placement' },
                { place: 'About page', desc: 'Alongside your other professional certifications' },
                { place: 'Contact page', desc: 'Where clients are deciding whether to reach out' },
              ].map(({ place, desc }) => (
                <div key={place} className="border rounded-lg p-5 text-center">
                  <p className="font-semibold text-gray-900 mb-1">{place}</p>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-indigo-600 text-white text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Not listed yet?</h2>
            <p className="text-indigo-100 mb-8 text-lg">
              Claim your free listing on Hypnotherapy Finder and start connecting
              with clients searching for practitioners near them.
            </p>
            <Link
              href="/practitioner-signup"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Claim Your Free Listing <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
