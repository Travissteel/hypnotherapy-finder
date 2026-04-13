import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import AgoraphobiaTest from './AgoraphobiaTest';

export const metadata: Metadata = {
  title: 'Agoraphobia Test — Do I Have Agoraphobia? Free Quiz | Hypnotherapy Finder',
  description: 'Take our free agoraphobia test to check for symptoms of fear of public places, open spaces, and crowds. Answer 12 questions and get your personalised result in 2 minutes.',
  keywords: 'agoraphobia test, agoraphobia quiz, do I have agoraphobia, fear of open spaces test, fear of public places quiz, agoraphobia self assessment',
  alternates: { canonical: 'https://hypnotherapy-finder.com/agoraphobia-test' },
  openGraph: {
    title: 'Agoraphobia Test — Do I Have Agoraphobia?',
    description: 'Check for agoraphobia symptoms with our free 12-question test. Anonymous results in 2 minutes.',
    url: 'https://hypnotherapy-finder.com/agoraphobia-test',
    type: 'website',
  },
};

export default function AgoraphobiaTestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-emerald-100 via-teal-100 to-green-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-emerald-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-teal-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Agoraphobia Test — Do I Have Agoraphobia?</h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">Answer 12 questions about your anxiety in public spaces, open areas, and crowded environments to find out if you may have agoraphobia.</p>
            <p className="text-sm text-gray-500 mt-4">Not a clinical diagnosis. All responses are anonymous.</p>
          </div>
        </section>
        <AgoraphobiaTest />
      </main>
      <Footer />
    </div>
  );
}
