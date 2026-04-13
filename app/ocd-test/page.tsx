import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import OCDTest from './OCDTest';

export const metadata: Metadata = {
  title: 'OCD Test — Do I Have OCD? Free Self-Assessment | Hypnotherapy Finder',
  description: 'Take our free OCD test to check for symptoms of obsessive-compulsive disorder, including Pure O. Answer 14 questions and get your personalised result in under 3 minutes.',
  keywords: 'ocd test, do I have ocd quiz, ocd self assessment, ocd symptoms test, pure o ocd test, obsessive compulsive disorder test, ocd quiz online',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/ocd-test',
  },
  openGraph: {
    title: 'OCD Test — Do I Have OCD? Free Self-Assessment',
    description: 'Check for OCD symptoms including Pure O with our free 14-question test. Anonymous results in under 3 minutes.',
    url: 'https://hypnotherapy-finder.com/ocd-test',
    type: 'website',
  },
};

export default function OCDTestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-orange-100 via-rose-100 to-pink-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-orange-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-rose-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 3 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              OCD Test — Do I Have OCD?
            </h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Answer 14 questions covering obsessions, compulsions, and the often-overlooked Pure O — to find out if you may have obsessive-compulsive disorder.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Not a clinical diagnosis. All responses are anonymous. If you are in distress, please contact a mental health professional.
            </p>
          </div>
        </section>

        <OCDTest />
      </main>
      <Footer />
    </div>
  );
}
