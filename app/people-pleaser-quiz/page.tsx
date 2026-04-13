import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import PeoplePleaserQuiz from './PeoplePleaserQuiz';

export const metadata: Metadata = {
  title: 'Am I a People Pleaser? Free Quiz | Hypnotherapy Finder',
  description: 'Take our free people pleaser quiz to find out if you are a people pleaser. Answer 12 questions about saying no, approval seeking, putting others first, and resentment.',
  keywords: 'am I a people pleaser quiz, people pleaser quiz, people pleaser test, people pleasing self assessment, do I people please, am I a people pleaser',
  alternates: { canonical: 'https://hypnotherapy-finder.com/people-pleaser-quiz' },
  openGraph: {
    title: 'Am I a People Pleaser? Free Quiz',
    description: 'Find out if you are a people pleaser with our free 12-question quiz covering boundaries, approval seeking, and resentment.',
    url: 'https://hypnotherapy-finder.com/people-pleaser-quiz',
    type: 'website',
  },
};

export default function PeoplePleaserQuizPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-fuchsia-100 via-pink-100 to-rose-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-fuchsia-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-pink-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-fuchsia-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Am I a People Pleaser? Free Quiz
            </h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Answer 12 questions about how you handle saying no, seeking approval, and putting others first to find out if you have people-pleasing tendencies.
            </p>
            <p className="text-sm text-gray-500 mt-4">Not a clinical assessment. All responses are anonymous.</p>
          </div>
        </section>
        <PeoplePleaserQuiz />
      </main>
      <Footer />
    </div>
  );
}
