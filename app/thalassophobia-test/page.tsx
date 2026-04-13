import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ThalassophobiaTest from './ThalassophobiaTest';

export const metadata: Metadata = {
  title: 'Thalassophobia Test — Do I Have Thalassophobia? | Hypnotherapy Finder',
  description: 'Take our free thalassophobia test to find out if you have a fear of deep water. Answer 12 questions about your response to the ocean, lakes, and deep water. Free and anonymous.',
  keywords: 'thalassophobia test, thalassophobia quiz, do I have thalassophobia, fear of deep water test, fear of the ocean quiz, thalassophobia self assessment',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/thalassophobia-test',
  },
  openGraph: {
    title: 'Thalassophobia Test — Do I Have a Fear of Deep Water?',
    description: 'Check for thalassophobia symptoms with our free 12-question test. Anonymous results in under 2 minutes.',
    url: 'https://hypnotherapy-finder.com/thalassophobia-test',
    type: 'website',
  },
};

export default function ThalassophobiaTestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-cyan-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-cyan-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Thalassophobia Test — Fear of Deep Water
            </h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Answer 12 questions to find out if you have thalassophobia — an intense fear of deep bodies of water, the ocean, or what lies beneath the surface.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Not a clinical diagnosis. All responses are anonymous.
            </p>
          </div>
        </section>

        <ThalassophobiaTest />
      </main>
      <Footer />
    </div>
  );
}
