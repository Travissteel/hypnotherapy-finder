import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import BurnoutQuiz from './BurnoutQuiz';

export const metadata: Metadata = {
  title: 'Burnout Quiz — Am I Burned Out? Free Test | Hypnotherapy Finder',
  description: 'Take our free burnout quiz to find out if you are experiencing burnout. Answer 13 questions covering emotional exhaustion, cynicism, and reduced effectiveness. Get your result in 2 minutes.',
  keywords: 'burnout quiz, burnout test, am I burned out, burnout self assessment, work burnout quiz, burnout symptoms test, job burnout quiz',
  alternates: { canonical: 'https://hypnotherapy-finder.com/burnout-quiz' },
  openGraph: {
    title: 'Burnout Quiz — Am I Burned Out? Free Test',
    description: 'Find out if you have burnout with our free 13-question quiz covering emotional exhaustion, cynicism, and effectiveness.',
    url: 'https://hypnotherapy-finder.com/burnout-quiz',
    type: 'website',
  },
};

export default function BurnoutQuizPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-amber-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-orange-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Burnout Quiz — Am I Burned Out?</h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">Answer 13 questions about emotional exhaustion, cynicism, and effectiveness to find out if you are experiencing burnout.</p>
            <p className="text-sm text-gray-500 mt-4">Not a clinical diagnosis. All responses are anonymous.</p>
          </div>
        </section>
        <BurnoutQuiz />
      </main>
      <Footer />
    </div>
  );
}
