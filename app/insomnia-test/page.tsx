import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import InsomniaTest from './InsomniaTest';

export const metadata: Metadata = {
  title: 'Insomnia Test — Do I Have Insomnia? Free Quiz | Hypnotherapy Finder',
  description: 'Take our free insomnia test to find out if you have insomnia. Answer 13 questions covering sleep onset, sleep quality, racing thoughts, and daytime impact. Results in 2 minutes.',
  keywords: 'insomnia test, insomnia quiz, do I have insomnia quiz, insomnia self assessment, sleep problems test, can\'t sleep quiz, chronic insomnia test',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/insomnia-test',
  },
  openGraph: {
    title: 'Insomnia Test — Do I Have Insomnia?',
    description: 'Check for insomnia symptoms with our free 13-question test covering sleep quality, bedtime anxiety, and daytime impact.',
    url: 'https://hypnotherapy-finder.com/insomnia-test',
    type: 'website',
  },
};

export default function InsomniaTestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-100 to-slate-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-indigo-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Insomnia Test — Do I Have Insomnia?
            </h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Answer 13 questions about your sleep patterns, bedtime anxiety, and daytime functioning to find out if you may be experiencing insomnia.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Not a clinical diagnosis. All responses are anonymous.
            </p>
          </div>
        </section>

        <InsomniaTest />
      </main>
      <Footer />
    </div>
  );
}
