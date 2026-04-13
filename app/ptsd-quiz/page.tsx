import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import PTSDQuiz from './PTSDQuiz';

export const metadata: Metadata = {
  title: 'PTSD Quiz — Do I Have PTSD? Free Self-Assessment | Hypnotherapy Finder',
  description: 'Take our free PTSD quiz to check for symptoms of PTSD and Complex PTSD. Answer 13 questions and get a personalised result. Not a diagnosis — for guidance only.',
  keywords: 'ptsd quiz, do I have ptsd quiz, complex ptsd quiz, ptsd self assessment, ptsd test online, ptsd symptoms checklist, c-ptsd quiz',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/ptsd-quiz',
  },
  openGraph: {
    title: 'PTSD Quiz — Do I Have PTSD? Free Self-Assessment',
    description: 'Answer 13 questions to check for symptoms of PTSD and Complex PTSD. Free, anonymous, and takes under 3 minutes.',
    url: 'https://hypnotherapy-finder.com/ptsd-quiz',
    type: 'website',
  },
};

export default function PTSDQuizPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-purple-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-indigo-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 3 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Do I Have PTSD? Take the Free Quiz
            </h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              This self-assessment covers symptoms of both PTSD and Complex PTSD (C-PTSD). Answer honestly — there are no right or wrong answers.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              This quiz is not a clinical diagnosis. If you are in crisis, please contact a mental health professional immediately.
            </p>
          </div>
        </section>

        <PTSDQuiz />
      </main>
      <Footer />
    </div>
  );
}
