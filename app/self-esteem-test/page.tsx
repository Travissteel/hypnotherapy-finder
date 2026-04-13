import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SelfEsteemTest from './SelfEsteemTest';

export const metadata: Metadata = {
  title: 'Self-Esteem Test — Do I Have Low Self-Esteem? Free Quiz | Hypnotherapy Finder',
  description: 'Take our free self-esteem test to find out if you have low self-esteem. Answer 12 questions covering self-worth, self-criticism, confidence, and shame. Get your result in 2 minutes.',
  keywords: 'self esteem test, self esteem quiz, low self esteem test, do I have low self esteem, self esteem self assessment, self worth quiz, confidence test',
  alternates: { canonical: 'https://hypnotherapy-finder.com/self-esteem-test' },
  openGraph: {
    title: 'Self-Esteem Test — Do I Have Low Self-Esteem?',
    description: 'Check your self-esteem across 5 dimensions including self-worth, self-criticism, confidence, and shame. Free and anonymous.',
    url: 'https://hypnotherapy-finder.com/self-esteem-test',
    type: 'website',
  },
};

export default function SelfEsteemTestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-yellow-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-amber-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Self-Esteem Test — Do I Have Low Self-Esteem?</h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">Answer 12 questions across self-worth, self-criticism, confidence, and shame to find out where your self-esteem really stands.</p>
            <p className="text-sm text-gray-500 mt-4">Not a clinical assessment. All responses are anonymous.</p>
          </div>
        </section>
        <SelfEsteemTest />
      </main>
      <Footer />
    </div>
  );
}
