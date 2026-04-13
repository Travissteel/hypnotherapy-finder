import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Activity, Brain, HeartPulse, Users2, Repeat2, Zap, Waves, Flame, Heart, TreePine, Box, Leaf, Moon, Angry, Smile, Star, Link2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Mental Health Quizzes & Tests | Hypnotherapy Finder',
  description: 'Free online mental health quizzes and phobia tests. Check for anxiety, stress, PTSD, OCD, burnout, social anxiety, and specific phobias. All anonymous, results in minutes.',
  keywords: 'free mental health quiz, anxiety quiz, stress test, ptsd quiz, ocd test, phobia test, burnout quiz, social anxiety test, free psychological tests online',
  alternates: { canonical: 'https://hypnotherapy-finder.com/free-quizzes' },
  openGraph: {
    title: 'Free Mental Health Quizzes & Tests',
    description: 'Take our free online mental health quizzes covering anxiety, stress, PTSD, OCD, burnout, phobias and more. All anonymous.',
    url: 'https://hypnotherapy-finder.com/free-quizzes',
    type: 'website',
  },
};

const quizzes = [
  {
    href: '/ocd-test',
    icon: Repeat2,
    gradient: 'from-orange-500 to-rose-500',
    border: 'border-orange-100 hover:border-orange-300',
    bg: 'from-orange-50 to-rose-50',
    accent: 'text-orange-600 group-hover:text-orange-800',
    title: 'OCD Test',
    desc: 'Check for obsessions, compulsions, and Pure O symptoms.',
    volume: '27k+ searches/month',
  },
  {
    href: '/social-anxiety-test',
    icon: Users2,
    gradient: 'from-pink-500 to-purple-500',
    border: 'border-pink-100 hover:border-pink-300',
    bg: 'from-pink-50 to-purple-50',
    accent: 'text-pink-600 group-hover:text-pink-800',
    title: 'Social Anxiety Test',
    desc: 'Do you have social anxiety disorder? Find out in 2 minutes.',
    volume: '5.7k searches/month',
  },
  {
    href: '/ptsd-quiz',
    icon: Brain,
    gradient: 'from-purple-500 to-indigo-500',
    border: 'border-purple-100 hover:border-purple-300',
    bg: 'from-purple-50 to-indigo-50',
    accent: 'text-purple-600 group-hover:text-purple-800',
    title: 'PTSD Quiz',
    desc: 'Check for PTSD and Complex PTSD symptoms.',
    volume: '4.1k searches/month',
  },
  {
    href: '/agoraphobia-test',
    icon: TreePine,
    gradient: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-100 hover:border-emerald-300',
    bg: 'from-emerald-50 to-teal-50',
    accent: 'text-emerald-600 group-hover:text-emerald-800',
    title: 'Agoraphobia Test',
    desc: 'Do you fear open spaces, crowds, or public places?',
    volume: '800 searches/month',
  },
  {
    href: '/anxiety-quiz',
    icon: HeartPulse,
    gradient: 'from-teal-500 to-blue-500',
    border: 'border-teal-100 hover:border-teal-300',
    bg: 'from-teal-50 to-blue-50',
    accent: 'text-teal-600 group-hover:text-teal-800',
    title: 'Anxiety Quiz',
    desc: 'Do you have anxiety? Find out with 12 questions.',
    volume: '2.2k searches/month',
  },
  {
    href: '/burnout-quiz',
    icon: Flame,
    gradient: 'from-amber-500 to-orange-500',
    border: 'border-amber-100 hover:border-amber-300',
    bg: 'from-amber-50 to-orange-50',
    accent: 'text-amber-600 group-hover:text-amber-800',
    title: 'Burnout Quiz',
    desc: 'Are you burned out? Check for exhaustion and cynicism.',
    volume: '1.2k searches/month',
  },
  {
    href: '/caregiver-burnout-quiz',
    icon: Heart,
    gradient: 'from-rose-500 to-pink-500',
    border: 'border-rose-100 hover:border-rose-300',
    bg: 'from-rose-50 to-pink-50',
    accent: 'text-rose-600 group-hover:text-rose-800',
    title: 'Caregiver Burnout Quiz',
    desc: 'Are you burned out from caring for a loved one?',
    volume: '900 searches/month',
  },
  {
    href: '/thalassophobia-test',
    icon: Waves,
    gradient: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-100 hover:border-cyan-300',
    bg: 'from-cyan-50 to-blue-50',
    accent: 'text-cyan-600 group-hover:text-cyan-800',
    title: 'Thalassophobia Test',
    desc: 'Fear of deep water or the ocean? Find out here.',
    volume: '2k searches/month',
  },
  {
    href: '/phobia-test',
    icon: Zap,
    gradient: 'from-violet-500 to-purple-600',
    border: 'border-violet-100 hover:border-violet-300',
    bg: 'from-violet-50 to-purple-50',
    accent: 'text-violet-600 group-hover:text-violet-800',
    title: 'Phobia Test',
    desc: 'Check 16 common phobias and rate their impact on your life.',
    volume: '2k searches/month',
  },
  {
    href: '/claustrophobia-test',
    icon: Box,
    gradient: 'from-slate-500 to-gray-600',
    border: 'border-slate-100 hover:border-slate-300',
    bg: 'from-slate-50 to-gray-50',
    accent: 'text-slate-600 group-hover:text-slate-800',
    title: 'Claustrophobia Test',
    desc: 'Fear of enclosed spaces, lifts, or tunnels?',
    volume: '150 searches/month',
  },
  {
    href: '/emetophobia-test',
    icon: Leaf,
    gradient: 'from-lime-500 to-green-600',
    border: 'border-lime-100 hover:border-lime-300',
    bg: 'from-lime-50 to-green-50',
    accent: 'text-lime-600 group-hover:text-lime-800',
    title: 'Emetophobia Test',
    desc: 'Fear of vomiting or nausea? Take the free test.',
    volume: '100 searches/month',
  },
  {
    href: '/anger-test',
    icon: Angry,
    gradient: 'from-red-500 to-orange-500',
    border: 'border-red-100 hover:border-red-300',
    bg: 'from-red-50 to-orange-50',
    accent: 'text-red-600 group-hover:text-red-800',
    title: 'Anger Test',
    desc: 'Do you have anger issues? Check across 6 dimensions including suppression and hostility.',
    volume: '7.2k searches/month',
  },
  {
    href: '/insomnia-test',
    icon: Moon,
    gradient: 'from-indigo-600 to-blue-700',
    border: 'border-indigo-100 hover:border-indigo-300',
    bg: 'from-indigo-50 to-blue-50',
    accent: 'text-indigo-600 group-hover:text-indigo-800',
    title: 'Insomnia Test',
    desc: 'Do you have insomnia? Check for sleep problems and their impact.',
    volume: '3.45k searches/month',
  },
  {
    href: '/self-esteem-test',
    icon: Star,
    gradient: 'from-yellow-500 to-amber-500',
    border: 'border-yellow-100 hover:border-yellow-300',
    bg: 'from-yellow-50 to-amber-50',
    accent: 'text-yellow-600 group-hover:text-yellow-800',
    title: 'Self-Esteem Test',
    desc: 'Do you have low self-esteem? Check across self-worth, criticism, and confidence.',
    volume: '1.45k searches/month',
  },
  {
    href: '/codependency-quiz',
    icon: Link2,
    gradient: 'from-sky-500 to-blue-500',
    border: 'border-sky-100 hover:border-sky-300',
    bg: 'from-sky-50 to-blue-50',
    accent: 'text-sky-600 group-hover:text-sky-800',
    title: 'Codependency Quiz',
    desc: 'Am I codependent? Check for caretaking, loss of self, and abandonment fears.',
    volume: '450 searches/month',
  },
  {
    href: '/people-pleaser-quiz',
    icon: Smile,
    gradient: 'from-fuchsia-500 to-pink-500',
    border: 'border-fuchsia-100 hover:border-fuchsia-300',
    bg: 'from-fuchsia-50 to-pink-50',
    accent: 'text-fuchsia-600 group-hover:text-fuchsia-800',
    title: 'People Pleaser Quiz',
    desc: 'Am I a people pleaser? Check for approval seeking and boundary issues.',
    volume: '150 searches/month',
  },
  {
    href: '/stress-level-calculator',
    icon: Activity,
    gradient: 'from-teal-500 to-cyan-500',
    border: 'border-teal-100 hover:border-teal-300',
    bg: 'from-teal-50 to-cyan-50',
    accent: 'text-teal-600 group-hover:text-teal-800',
    title: 'Stress Quiz',
    desc: 'How stressed are you? Get your personalised score.',
    volume: '520 searches/month',
  },
];

export default function FreeQuizzesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative pt-16 pb-12 overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-indigo-400 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-pink-400 rounded-full filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '3s' }}></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Free Mental Health Quizzes & Tests</h1>
            <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
              Free, anonymous self-assessments covering anxiety, phobias, burnout, PTSD, OCD, and more. All tools are for guidance only — not clinical diagnoses.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {quizzes.map((q) => (
                <Link key={q.href} href={q.href}
                  className={`group block p-7 bg-gradient-to-br ${q.bg} border-2 ${q.border} rounded-2xl hover:shadow-xl transition-all`}>
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${q.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <q.icon className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2">{q.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{q.desc}</p>
                  <span className={`font-semibold text-sm transition-colors ${q.accent}`}>Take the free test →</span>
                </Link>
              ))}
            </div>

            <div className="mt-16 bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-800 rounded-3xl p-10 text-center">
              <h2 className="text-3xl font-extrabold text-white mb-4">Found Something Worth Addressing?</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">Connect with a certified hypnotherapist who specialises in exactly what you are dealing with.</p>
              <Link href="/search"
                className="inline-block bg-white text-indigo-900 font-extrabold px-10 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg text-lg">
                Find a Hypnotherapist Near You →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
