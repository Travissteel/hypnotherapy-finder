import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import EmetophobiaTest from './EmetophobiaTest';

export const metadata: Metadata = {
  title: 'Emetophobia Test — Do I Have Emetophobia? | Hypnotherapy Finder',
  description: 'Take our free emetophobia test to check for fear of vomiting. Answer 12 questions covering anxiety about nausea, others being sick, food avoidance, and daily impact.',
  keywords: 'emetophobia test, emetophobia quiz, do I have emetophobia, fear of vomiting test, emetophobia self assessment, fear of being sick quiz',
  alternates: { canonical: 'https://hypnotherapy-finder.com/emetophobia-test' },
  openGraph: {
    title: 'Emetophobia Test — Do I Have Emetophobia?',
    description: 'Check for emetophobia (fear of vomiting) with our free 12-question test. Anonymous results in 2 minutes.',
    url: 'https://hypnotherapy-finder.com/emetophobia-test',
    type: 'website',
  },
};

export default function EmetophobiaTestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-lime-100 via-green-100 to-emerald-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-lime-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-green-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-lime-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Emetophobia Test — Do I Have Emetophobia?</h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">Answer 12 questions about your fear of vomiting and nausea to find out if you may have emetophobia — one of the most common, yet least talked-about phobias.</p>
            <p className="text-sm text-gray-500 mt-4">Not a clinical diagnosis. All responses are anonymous.</p>
          </div>
        </section>
        <EmetophobiaTest />
      </main>
      <Footer />
    </div>
  );
}
