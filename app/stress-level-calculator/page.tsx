import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import StressCalculator from './StressCalculator';

export const metadata: Metadata = {
  title: 'Free Stress Quiz — How Stressed Am I? | Hypnotherapy Finder',
  description: 'Take our free online stress quiz to find out how stressed you are. Get a personalised stress score in under 2 minutes and discover if hypnotherapy could help.',
  keywords: 'stress quiz, how stressed am I, stress level test, online stress test, stress score calculator, am I stressed quiz',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/stress-level-calculator',
  },
  openGraph: {
    title: 'Free Stress Quiz — How Stressed Am I?',
    description: 'Answer 5 quick questions to get your personalised stress score and find out if hypnotherapy could help.',
    url: 'https://hypnotherapy-finder.com/stress-level-calculator',
    type: 'website',
  },
};

export default function StressLevelCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-purple-100 via-blue-100 to-teal-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-purple-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-teal-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              How Stressed Am I? Free Stress Quiz
            </h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Answer 5 quick questions to get your personalised stress score and find out if hypnotherapy could help you feel calmer and more in control.
            </p>
          </div>
        </section>

        <StressCalculator />
      </main>
      <Footer />
    </div>
  );
}
