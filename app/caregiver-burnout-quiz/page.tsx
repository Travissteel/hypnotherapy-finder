import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CaregiverBurnoutQuiz from './CaregiverBurnoutQuiz';

export const metadata: Metadata = {
  title: 'Caregiver Burnout Quiz — Free Self-Assessment | Hypnotherapy Finder',
  description: 'Take our free caregiver burnout quiz to find out if you are experiencing caregiver burnout. Answer 12 questions about exhaustion, guilt, isolation, and self-neglect. Anonymous and takes 2 minutes.',
  keywords: 'caregiver burnout quiz, caregiver burnout test, caregiver stress quiz, carer burnout assessment, caregiver exhaustion quiz, am I a burned out caregiver',
  alternates: { canonical: 'https://hypnotherapy-finder.com/caregiver-burnout-quiz' },
  openGraph: {
    title: 'Caregiver Burnout Quiz — Free Self-Assessment',
    description: 'Are you a burned out caregiver? Take our free 12-question quiz covering exhaustion, guilt, isolation, and self-neglect.',
    url: 'https://hypnotherapy-finder.com/caregiver-burnout-quiz',
    type: 'website',
  },
};

export default function CaregiverBurnoutQuizPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-red-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-rose-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-pink-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <p className="text-rose-600 font-bold uppercase tracking-widest text-sm mb-4">Free · Anonymous · 2 Minutes</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Caregiver Burnout Quiz</h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">Caring for a loved one is one of the hardest things a person can do. Answer 12 honest questions to find out if you are experiencing caregiver burnout.</p>
            <p className="text-sm text-gray-500 mt-4">Not a clinical diagnosis. Your responses are completely anonymous.</p>
          </div>
        </section>
        <CaregiverBurnoutQuiz />
      </main>
      <Footer />
    </div>
  );
}
