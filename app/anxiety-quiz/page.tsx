import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import AnxietyQuiz from './AnxietyQuiz';

export const metadata: Metadata = {
  title: 'Do I Have Anxiety? Free Anxiety Quiz | Hypnotherapy Finder',
  description: 'Take our free anxiety quiz to find out if you have anxiety. Answer 12 questions covering worry, physical symptoms, and daily impact. Get your result in under 2 minutes.',
  keywords: 'do i have anxiety quiz, anxiety quiz, anxiety test online, am I anxious, anxiety self assessment, anxiety symptoms quiz, hypnotherapy for anxiety',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/anxiety-quiz',
  },
  openGraph: {
    title: 'Do I Have Anxiety? Free Anxiety Quiz',
    description: 'Answer 12 questions to find out if you have anxiety and whether hypnotherapy could help. Free and anonymous.',
    url: 'https://hypnotherapy-finder.com/anxiety-quiz',
    type: 'website',
  },
};

export default function AnxietyQuizPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-teal-100 via-blue-100 to-indigo-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-teal-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-blue-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Do I Have Anxiety? Take the Free Quiz
            </h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Answer 12 questions about your worry patterns, physical symptoms, and daily life to find out if you may be experiencing anxiety.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Not a clinical diagnosis — for guidance only. If you are in crisis, please contact a mental health professional.
            </p>
          </div>
        </section>

        <AnxietyQuiz />
      </main>
      <Footer />
    </div>
  );
}
