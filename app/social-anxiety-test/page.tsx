import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SocialAnxietyTest from './SocialAnxietyTest';

export const metadata: Metadata = {
  title: 'Social Anxiety Test — Free Online Self-Assessment | Hypnotherapy Finder',
  description: 'Take our free social anxiety test to check for social anxiety disorder symptoms. Answer 12 questions and find out if hypnotherapy could help you feel more confident.',
  keywords: 'social anxiety test, social anxiety disorder test, do I have social anxiety, social anxiety quiz, social anxiety self assessment, social phobia test',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/social-anxiety-test',
  },
  openGraph: {
    title: 'Social Anxiety Test — Free Online Self-Assessment',
    description: 'Check for social anxiety disorder symptoms with our free 12-question test. Get your result and find out if hypnotherapy could help.',
    url: 'https://hypnotherapy-finder.com/social-anxiety-test',
    type: 'website',
  },
};

export default function SocialAnxietyTestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-pink-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-purple-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-pink-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Social Anxiety Test — Do I Have Social Anxiety?
            </h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Answer 12 questions about fear of judgement, avoidance, and physical symptoms to find out if you may have social anxiety disorder.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Not a clinical diagnosis — for guidance only. If social anxiety is severely affecting your life, please speak with a healthcare professional.
            </p>
          </div>
        </section>

        <SocialAnxietyTest />
      </main>
      <Footer />
    </div>
  );
}
