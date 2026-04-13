'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'Excessive Caretaking',
    text: 'Do you feel responsible for solving other people\'s problems, managing their emotions, or fixing their lives?',
  },
  {
    id: 2,
    category: 'Excessive Caretaking',
    text: 'Do you give help, advice, or support even when it has not been asked for — and feel anxious if you do not?',
  },
  {
    id: 3,
    category: 'Excessive Caretaking',
    text: 'Do you neglect your own needs in order to focus on caring for or worrying about someone else?',
  },
  {
    id: 4,
    category: 'Control & Enabling',
    text: 'Do you find yourself making excuses for someone else\'s behaviour, covering for them, or protecting them from consequences?',
  },
  {
    id: 5,
    category: 'Control & Enabling',
    text: 'Do you try to control situations or people — not out of malice, but out of anxiety about what might happen if you do not?',
  },
  {
    id: 6,
    category: 'Loss of Self',
    text: 'Do you find it difficult to identify your own feelings, needs, or desires — separate from those of the person you are in a relationship with?',
  },
  {
    id: 7,
    category: 'Loss of Self',
    text: 'Does your mood, self-worth, or sense of stability depend heavily on how the other person in your life is feeling or behaving?',
  },
  {
    id: 8,
    category: 'Loss of Self',
    text: 'Have you lost your own identity, interests, or friendships as a result of focusing on someone else\'s needs or problems?',
  },
  {
    id: 9,
    category: 'Fear of Abandonment',
    text: 'Do you tolerate disrespect, poor treatment, or unhealthy behaviour from others because you fear being alone or abandoned?',
  },
  {
    id: 10,
    category: 'Fear of Abandonment',
    text: 'Do you have an intense fear of rejection or conflict that causes you to avoid expressing your own needs or boundaries?',
  },
  {
    id: 11,
    category: 'Resentment & Exhaustion',
    text: 'Do you feel resentful, unappreciated, or exhausted — but continue to over-give because you do not know how to stop?',
  },
  {
    id: 12,
    category: 'Resentment & Exhaustion',
    text: 'Do you feel that relationships in your life are consistently one-sided, with you giving more than you receive?',
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

export default function CodependencyQuiz() {
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
      setResult({ headline: 'Few Codependency Traits', body: 'Your responses suggest you have few codependency traits. You appear to maintain a reasonable balance between caring for others and maintaining your own identity and needs. Healthy relationships involve mutual give and take — and it sounds like you manage this well.', severity: 'low' });
    } else if (pct < 55) {
      setResult({ headline: 'Moderate Codependency Traits', body: 'Your responses suggest moderate codependency patterns that may be affecting your relationships and sense of self. Codependency often develops as a coping strategy in response to difficult early relationships — it is not a flaw, but a learned pattern. Hypnotherapy can help you identify the subconscious fears driving these behaviours and build a stronger, more independent sense of self.', severity: 'moderate' });
    } else {
      setResult({ headline: 'Significant Codependency Traits', body: 'Your responses suggest significant codependency that is likely causing exhaustion, resentment, and a loss of your own identity in relationships. Codependency at this level is serious — but it is also very treatable. Hypnotherapy works at the root level, addressing the fear of abandonment, low self-worth, and deeply held beliefs about love and safety that drive codependent behaviour.', severity: 'high' });
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
              <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full transition-all duration-300" style={{ width: `${(answered / questions.length) * 100}%` }} />
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-5">{cat}</h2>
              {questions.filter((q) => q.category === cat).map((q) => (
                <div key={q.id} className="mb-8">
                  <p className="text-gray-800 font-semibold mb-3 leading-relaxed">{q.text}</p>
                  <div className="grid grid-cols-5 gap-2">
                    {options.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setAnswer(q.id, opt.value)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 text-xs font-medium transition-all ${answers[q.id] === opt.value ? 'bg-sky-500 border-sky-500 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-sky-300'}`}>
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
            className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed">
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
              <Button asChild className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">Find a Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" /></Link>
              </Button>
            )}
          </div>
          {result.severity !== 'low' && (
            <div className="bg-sky-50 border-2 border-sky-100 p-6 rounded-2xl">
              <h3 className="font-bold text-sky-800 mb-2">How Hypnotherapy Helps Codependency</h3>
              <p className="text-sky-900 text-sm leading-relaxed">
                Codependency is rooted in deep subconscious beliefs about love, safety, and self-worth — often formed in early relationships. Hypnotherapy works directly at this level, using techniques such as inner child work, parts therapy, and boundary-building suggestion to update the beliefs that drive codependent patterns. The goal is not to make you care less about others, but to help you care for yourself equally — so your relationships can become genuinely mutual.
              </p>
            </div>
          )}
          <button onClick={() => { setAnswers({}); setResult(null); }} className="w-full text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 transition-colors">Retake the quiz</button>
        </div>
      )}
      <p className="text-center text-xs text-gray-400 mt-8 px-4">This quiz is for informational purposes only and is not a clinical assessment.</p>
    </div>
  );
}
