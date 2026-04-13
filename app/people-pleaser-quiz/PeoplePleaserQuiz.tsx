'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'Saying No',
    text: 'Do you find it very difficult to say no to requests, even when you are already overwhelmed?',
  },
  {
    id: 2,
    category: 'Saying No',
    text: 'Do you agree to things you do not want to do in order to avoid conflict or disappointing others?',
  },
  {
    id: 3,
    category: 'Saying No',
    text: 'Do you feel guilty or anxious after saying no to someone, even when the request was unreasonable?',
  },
  {
    id: 4,
    category: 'Approval Seeking',
    text: 'Do you feel anxious or unsettled when you sense that someone is unhappy with you?',
  },
  {
    id: 5,
    category: 'Approval Seeking',
    text: 'Do you change your opinions or behaviour depending on who you are with, in order to fit in or be liked?',
  },
  {
    id: 6,
    category: 'Approval Seeking',
    text: 'Do you seek frequent reassurance or validation from others that you have done the right thing?',
  },
  {
    id: 7,
    category: 'Putting Others First',
    text: 'Do you consistently prioritise other people\'s needs over your own, even to your own detriment?',
  },
  {
    id: 8,
    category: 'Putting Others First',
    text: 'Do you feel responsible for managing other people\'s feelings or making sure everyone around you is happy?',
  },
  {
    id: 9,
    category: 'Putting Others First',
    text: 'Do you apologise excessively — even for things that are not your fault?',
  },
  {
    id: 10,
    category: 'Resentment & Burnout',
    text: 'Do you feel resentful or taken advantage of, but continue to say yes anyway?',
  },
  {
    id: 11,
    category: 'Resentment & Burnout',
    text: 'Do you feel exhausted by always trying to keep others happy while suppressing your own needs?',
  },
  {
    id: 12,
    category: 'Identity & Boundaries',
    text: 'Do you struggle to identify what you actually want, feel, or need — separate from what others expect of you?',
  },
];

const options = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Always', value: 4 },
];

type Result = { headline: string; body: string; severity: 'low' | 'moderate' | 'high' };

export default function PeoplePleaserQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 25) {
      setResult({ headline: 'Not a Significant People Pleaser', body: 'Your responses suggest you have a healthy balance between caring for others and honouring your own needs. You are able to say no and maintain boundaries without excessive guilt. This is a real strength.', severity: 'low' });
    } else if (pct < 55) {
      setResult({ headline: 'Moderate People Pleasing Tendencies', body: 'Your responses suggest you have notable people-pleasing tendencies that may be causing you stress, resentment, or a loss of sense of self. This is extremely common — and often rooted in childhood patterns of seeking approval or avoiding conflict. Hypnotherapy can help you identify the subconscious beliefs driving this behaviour and build genuine confidence in your own needs and boundaries.', severity: 'moderate' });
    } else {
      setResult({ headline: 'Strong People Pleaser', body: 'Your responses suggest strong people-pleasing patterns that are likely causing significant exhaustion, resentment, and disconnection from your own identity. People pleasing is not a personality trait — it is often a learned coping strategy rooted in fear of rejection or conflict. Hypnotherapy works at the subconscious level to heal these roots and help you show up authentically — for yourself and others.', severity: 'high' });
    }
  };

  const color = (s: string) => s === 'low' ? 'text-green-700' : s === 'moderate' ? 'text-amber-600' : 'text-red-600';
  const bg = (s: string) => s === 'low' ? 'bg-green-50 border-green-200' : s === 'moderate' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';
  const icon = (s: string) => s === 'low'
    ? <CheckCircle className="h-7 w-7 text-green-600 flex-shrink-0" />
    : s === 'moderate'
    ? <Activity className="h-7 w-7 text-amber-500 flex-shrink-0" />
    : <AlertTriangle className="h-7 w-7 text-red-500 flex-shrink-0" />;

  const categories = [...new Set(questions.map((q) => q.category))];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      {!result ? (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium">{answered} of {questions.length} answered</p>
            <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full transition-all duration-300" style={{ width: `${(answered / questions.length) * 100}%` }} />
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-fuchsia-500 mb-5">{cat}</h2>
              {questions.filter((q) => q.category === cat).map((q) => (
                <div key={q.id} className="mb-8">
                  <p className="text-gray-800 font-semibold mb-3 leading-relaxed">{q.text}</p>
                  <div className="grid grid-cols-5 gap-2">
                    {options.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setAnswer(q.id, opt.value)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 text-xs font-medium transition-all ${answers[q.id] === opt.value ? 'bg-fuchsia-600 border-fuchsia-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-fuchsia-300'}`}>
                        <span className="text-base font-bold">{opt.value}</span>
                        <span className="text-center leading-tight hidden sm:block">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1 px-1 sm:hidden"><span>Never</span><span>Always</span></div>
                </div>
              ))}
            </div>
          ))}

          <Button type="button" onClick={calculate} disabled={!allAnswered}
            className="w-full bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            {allAnswered ? 'See My Results' : `Answer all questions to continue (${questions.length - answered} remaining)`}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className={`p-8 rounded-3xl border-2 shadow-xl ${bg(result.severity)}`}>
            <div className="flex items-start gap-4 mb-4">
              {icon(result.severity)}
              <h2 className={`text-2xl font-extrabold leading-tight ${color(result.severity)}`}>{result.headline}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">{result.body}</p>
            {result.severity !== 'low' && (
              <Button asChild className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">Find a Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" /></Link>
              </Button>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="bg-fuchsia-50 border-2 border-fuchsia-100 p-6 rounded-2xl">
              <h3 className="font-bold text-fuchsia-800 mb-2">How Hypnotherapy Helps People Pleasers</h3>
              <p className="text-fuchsia-900 text-sm leading-relaxed">
                People pleasing is almost always rooted in deep subconscious beliefs — about worthiness, safety, and belonging. Hypnotherapy helps by accessing these roots directly and updating the beliefs that drive automatic people-pleasing behaviour. Techniques such as inner child work, parts therapy, and ego strengthening can help you build a solid sense of self — so that caring for others comes from a place of genuine choice rather than fear.
              </p>
            </div>
          )}

          <ShareResult quizName="People Pleaser Quiz" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/people-pleaser-quiz" />

          <button onClick={() => { setAnswers({}); setResult(null); }} className="w-full text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 transition-colors">Retake the quiz</button>
        </div>
      )}
      <p className="text-center text-xs text-gray-400 mt-8 px-4">
        This quiz is for informational purposes only and is not a clinical assessment.
      </p>
    </div>
  );
}
