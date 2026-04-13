import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import AngerTest from './AngerTest';

export const metadata: Metadata = {
  title: 'Anger Test — Do I Have Anger Issues? Free Self-Assessment | Hypnotherapy Finder',
  description: 'Take our free anger test to find out if you have anger issues. Covers anger frequency, intensity, duration, suppression, hostility, and impact. Get your result in 2 minutes.',
  keywords: 'anger test, anger issues test, anger issues quiz, multidimensional anger test, do I have anger issues, anger self assessment, anger management test',
  alternates: { canonical: 'https://hypnotherapy-finder.com/anger-test' },
  openGraph: {
    title: 'Anger Test — Do I Have Anger Issues?',
    description: 'Check for anger issues across 6 dimensions including frequency, suppression, hostility, and life impact. Free and anonymous.',
    url: 'https://hypnotherapy-finder.com/anger-test',
    type: 'website',
  },
};

export default function AngerTestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-red-100 via-orange-100 to-amber-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-red-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-orange-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Anger Test — Do I Have Anger Issues?
            </h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Answer 14 questions across 6 dimensions of anger — including frequency, duration, suppression, hostility, and life impact — to get your personalised anger assessment.
            </p>
            <p className="text-sm text-gray-500 mt-4">Not a clinical diagnosis. All responses are anonymous.</p>
          </div>
        </section>
        <AngerTest />
      </main>
      <Footer />
    </div>
  );
}
