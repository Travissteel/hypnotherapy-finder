import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import PhobiaTest from './PhobiaTest';

export const metadata: Metadata = {
  title: 'Phobia Test — Do I Have a Phobia? Free Online Quiz | Hypnotherapy Finder',
  description: 'Take our free phobia test to find out if you have a phobia. Covers 16 common phobias including spiders, heights, flying, enclosed spaces, and more. Get your result in 2 minutes.',
  keywords: 'phobia test, phobia quiz, do I have a phobia, phobia self assessment, specific phobia test, list of phobias test, phobia symptoms quiz',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/phobia-test',
  },
  openGraph: {
    title: 'Phobia Test — Do I Have a Phobia? Free Online Quiz',
    description: 'Check for 16 common phobias with our free two-step phobia test. Anonymous results in under 2 minutes.',
    url: 'https://hypnotherapy-finder.com/phobia-test',
    type: 'website',
  },
};

export default function PhobiaTestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-violet-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-purple-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-violet-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Phobia Test — Do I Have a Phobia?
            </h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              This two-step test checks for 16 of the most common phobias and measures how much your fear is affecting your daily life.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Not a clinical diagnosis. All responses are anonymous.
            </p>
          </div>
        </section>

        <PhobiaTest />
      </main>
      <Footer />
    </div>
  );
}
