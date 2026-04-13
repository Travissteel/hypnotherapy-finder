import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CodependencyQuiz from './CodependencyQuiz';

export const metadata: Metadata = {
  title: 'Codependency Quiz — Am I Codependent? Free Test | Hypnotherapy Finder',
  description: 'Take our free codependency quiz to find out if you are codependent. Answer 12 questions covering caretaking, control, loss of self, fear of abandonment, and resentment.',
  keywords: 'codependency quiz, codependency test, am I codependent, codependency self assessment, codependent relationship quiz, signs of codependency quiz',
  alternates: { canonical: 'https://hypnotherapy-finder.com/codependency-quiz' },
  openGraph: {
    title: 'Codependency Quiz — Am I Codependent?',
    description: 'Check for codependency across 5 dimensions including caretaking, loss of self, and fear of abandonment. Free and anonymous.',
    url: 'https://hypnotherapy-finder.com/codependency-quiz',
    type: 'website',
  },
};

export default function CodependencyQuizPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-sky-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-blue-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-sky-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Codependency Quiz — Am I Codependent?</h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">Answer 12 questions about caretaking, control, loss of self, and fear of abandonment to find out if you have codependent relationship patterns.</p>
            <p className="text-sm text-gray-500 mt-4">Not a clinical assessment. All responses are anonymous.</p>
          </div>
        </section>
        <CodependencyQuiz />
      </main>
      <Footer />
    </div>
  );
}
