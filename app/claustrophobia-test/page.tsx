import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ClaustrophobiaTest from './ClaustrophobiaTest';

export const metadata: Metadata = {
  title: 'Claustrophobia Test — Do I Have Claustrophobia? | Hypnotherapy Finder',
  description: 'Take our free claustrophobia test to check for fear of enclosed spaces. Answer 11 questions covering lifts, tunnels, crowds, and small rooms. Get your result in under 2 minutes.',
  keywords: 'claustrophobia test, claustrophobia quiz, do I have claustrophobia, fear of enclosed spaces test, fear of small spaces quiz, claustrophobia self assessment',
  alternates: { canonical: 'https://hypnotherapy-finder.com/claustrophobia-test' },
  openGraph: {
    title: 'Claustrophobia Test — Do I Have Claustrophobia?',
    description: 'Check for claustrophobia with our free 11-question test covering lifts, tunnels, and enclosed spaces.',
    url: 'https://hypnotherapy-finder.com/claustrophobia-test',
    type: 'website',
  },
};

export default function ClaustrophobiaTestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-slate-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-gray-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-slate-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Claustrophobia Test — Do I Have Claustrophobia?</h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">Answer 11 questions about your response to lifts, tunnels, small rooms, and crowded spaces to find out if you may have claustrophobia.</p>
            <p className="text-sm text-gray-500 mt-4">Not a clinical diagnosis. All responses are anonymous.</p>
          </div>
        </section>
        <ClaustrophobiaTest />
      </main>
      <Footer />
    </div>
  );
}
