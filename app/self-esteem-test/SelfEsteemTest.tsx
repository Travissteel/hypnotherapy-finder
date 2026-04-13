'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'Self-Worth',
    text: 'Do you generally feel that you are a person of worth — equal to others?',
  },
  {
    id: 2,
    category: 'Self-Worth',
    text: 'Do you feel fundamentally good about yourself as a person, separate from your achievements or how others see you?',
  },
  {
    id: 3,
    category: 'Self-Worth',
    text: 'Do you feel that you deserve good things — love, success, happiness — in your life?',
  },
  {
    id: 4,
    category: 'Self-Criticism',
    text: 'Do you frequently criticise yourself harshly — in a way you would never speak to a friend?',
  },
  {
    id: 5,
    category: 'Self-Criticism',
    text: 'When you make a mistake, do you dwell on it and feel deeply ashamed or inadequate?',
  },
  {
    id: 6,
    category: 'Self-Criticism',
    text: 'Do you focus mainly on your flaws and weaknesses, while dismissing your strengths and achievements?',
  },
  {
    id: 7,
    category: 'Confidence & Assertiveness',
    text: 'Do you feel confident expressing your opinions, needs, or feelings — even when others might disagree?',
  },
  {
    id: 8,
    category: 'Confidence & Assertiveness',
    text: 'Do you feel comfortable setting boundaries and saying no without excessive guilt?',
  },
  {
    id: 9,
    category: 'Confidence & Assertiveness',
    text: 'Do you trust your own judgement and decisions, rather than constantly seeking external validation?',
  },
  {
    id: 10,
    category: 'Comparison & Shame',
    text: 'Do you frequently compare yourself unfavourably to others and come out feeling lesser or inadequate?',
  },
  {
    id: 11,
    category: 'Comparison & Shame',
    text: 'Do you feel a deep sense of shame about who you are — not just what you have done, but who you are as a person?',
  },
  {
    id: 12,
    category: 'Daily Life Impact',
    text: 'Has low self-esteem held you back from opportunities, relationships, or goals you would have otherwise pursued?',
  },
];

// Q1-3 and Q7-9 are positively worded — higher = better self-esteem, so we invert them
const INVERTED = new Set([1, 2, 3, 7, 8, 9]);

const options = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Always', value: 4 },
];

type Result = { headline: string; body: string; severity: 'low' | 'moderate' | 'high' };

export default function SelfEsteemTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.entries(answers).reduce((sum, [id, v]) => {
      // Invert positively-worded questions so high score = low self-esteem
      return sum + (INVERTED.has(Number(id)) ? 4 - v : v);
    }, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 25) {
      setResult({ headline: 'Healthy Self-Esteem', body: 'Your responses suggest you have a generally healthy level of self-esteem. You appear to have a stable sense of your own worth and are able to handle setbacks without excessive self-criticism. Keep nurturing this — hypnotherapy can be a great tool for deepening self-compassion and resilience.', severity: 'low' });
    } else if (pct < 55) {
      setResult({ headline: 'Moderate Low Self-Esteem', body: 'Your responses suggest you are experiencing low self-esteem that is affecting your confidence, relationships, or opportunities. Low self-esteem is often rooted in early experiences and deeply held subconscious beliefs about your worth. Hypnotherapy works directly at this level — helping to replace negative core beliefs with a genuine, stable sense of self-worth.', severity: 'moderate' });
    } else {
      setResult({ headline: 'Significant Low Self-Esteem', body: 'Your responses suggest significant low self-esteem that is likely having a major impact on your life, relationships, and potential. Please know — low self-esteem is not the truth about you, it is a learned pattern. Hypnotherapy is one of the most effective approaches for rebuilding self-esteem at its roots, creating change that feels authentic and lasting.', severity: 'high' });
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
              <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full transition-all duration-300" style={{ width: `${(answered / questions.length) * 100}%` }} />
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-yellow-600 mb-5">{cat}</h2>
              {questions.filter((q) => q.category === cat).map((q) => (
                <div key={q.id} className="mb-8">
                  <p className="text-gray-800 font-semibold mb-3 leading-relaxed">{q.text}</p>
                  <div className="grid grid-cols-5 gap-2">
                    {options.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setAnswer(q.id, opt.value)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 text-xs font-medium transition-all ${answers[q.id] === opt.value ? 'bg-yellow-500 border-yellow-500 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-yellow-300'}`}>
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
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed">
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
              <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">Find a Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" /></Link>
              </Button>
            )}
          </div>
          {result.severity !== 'low' && (
            <div className="bg-yellow-50 border-2 border-yellow-100 p-6 rounded-2xl">
              <h3 className="font-bold text-yellow-800 mb-2">How Hypnotherapy Builds Self-Esteem</h3>
              <p className="text-yellow-900 text-sm leading-relaxed">
                Low self-esteem is almost always rooted in deeply held subconscious beliefs formed in childhood — "I am not enough", "I am unlovable", "I must earn my worth." Hypnotherapy accesses these beliefs directly, gently updating them at the source. Techniques such as inner child work, ego strengthening, and positive suggestion create a genuine shift in how you see yourself — not a superficial affirmation, but a real change in your core sense of worth.
              </p>
            </div>
          )}
          <button onClick={() => { setAnswers({}); setResult(null); }} className="w-full text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 transition-colors">Retake the test</button>
        </div>
      )}
      <p className="text-center text-xs text-gray-400 mt-8 px-4">This test is for informational purposes only and is not a clinical assessment.</p>
    </div>
  );
}
