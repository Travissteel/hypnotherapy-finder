'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'Emotional Exhaustion',
    text: 'Do you feel emotionally drained or depleted at the end of a working day?',
  },
  {
    id: 2,
    category: 'Emotional Exhaustion',
    text: 'Do you feel used up — like you have nothing left to give — by the end of the week?',
  },
  {
    id: 3,
    category: 'Emotional Exhaustion',
    text: 'Do you feel frustrated, irritable, or resentful about your work or responsibilities more than you used to?',
  },
  {
    id: 4,
    category: 'Detachment & Cynicism',
    text: 'Have you become more cynical or indifferent about your job, colleagues, or the people you serve?',
  },
  {
    id: 5,
    category: 'Detachment & Cynicism',
    text: 'Do you feel emotionally detached or numb when you used to feel engaged or passionate?',
  },
  {
    id: 6,
    category: 'Detachment & Cynicism',
    text: 'Do you find yourself going through the motions at work, just trying to get through the day?',
  },
  {
    id: 7,
    category: 'Reduced Effectiveness',
    text: 'Do you feel like your work quality or productivity has declined, even when you are putting in effort?',
  },
  {
    id: 8,
    category: 'Reduced Effectiveness',
    text: 'Do you feel like nothing you do at work makes a real difference or is appreciated?',
  },
  {
    id: 9,
    category: 'Reduced Effectiveness',
    text: 'Do you struggle to concentrate, make decisions, or stay motivated during work tasks?',
  },
  {
    id: 10,
    category: 'Physical Symptoms',
    text: 'Do you experience physical symptoms such as headaches, sleep problems, or frequent illness that may be linked to work stress?',
  },
  {
    id: 11,
    category: 'Physical Symptoms',
    text: 'Do you feel physically exhausted even after time off or a full night of sleep?',
  },
  {
    id: 12,
    category: 'Work-Life Balance',
    text: 'Has work stress begun to affect your personal relationships, hobbies, or life outside of work?',
  },
  {
    id: 13,
    category: 'Work-Life Balance',
    text: 'Do you feel unable to properly switch off from work, even during evenings or weekends?',
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

export default function BurnoutQuiz() {
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
      setResult({
        headline: 'Low Burnout Risk',
        body: 'Your responses suggest you are managing your workload relatively well right now. Keep an eye on the warning signs — burnout tends to creep up gradually. Hypnotherapy can be a great preventive tool for building resilience and stress management.',
        severity: 'low',
      });
    } else if (pct < 55) {
      setResult({
        headline: 'Moderate Burnout',
        body: 'Your responses suggest you are experiencing significant signs of burnout. This is your mind and body signalling that something needs to change. Hypnotherapy can help by addressing the deep-rooted stress patterns, rebuilding motivation, and helping you establish healthier boundaries.',
        severity: 'moderate',
      });
    } else {
      setResult({
        headline: 'Severe Burnout',
        body: 'Your responses suggest severe burnout that is significantly affecting your health, work, and personal life. Burnout at this level is serious — please do not ignore it. Hypnotherapy combined with lifestyle changes can be powerfully effective at helping you recover and reconnect with a sense of purpose.',
        severity: 'high',
      });
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
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300" style={{ width: `${(answered / questions.length) * 100}%` }} />
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-5">{cat}</h2>
              {questions.filter((q) => q.category === cat).map((q) => (
                <div key={q.id} className="mb-8">
                  <p className="text-gray-800 font-semibold mb-3 leading-relaxed">{q.text}</p>
                  <div className="grid grid-cols-5 gap-2">
                    {options.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setAnswer(q.id, opt.value)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 text-xs font-medium transition-all ${answers[q.id] === opt.value ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-amber-300'}`}>
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
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            {allAnswered ? 'See My Results' : `Answer all questions to continue (${questions.length - answered} remaining)`}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className={`p-8 rounded-3xl border-2 shadow-xl ${bg(result.severity)}`}>
            <div className="flex items-start gap-4 mb-4">{icon(result.severity)}
              <h2 className={`text-2xl font-extrabold leading-tight ${color(result.severity)}`}>{result.headline}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">{result.body}</p>
            {result.severity !== 'low' && (
              <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">Find a Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" /></Link>
              </Button>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="bg-amber-50 border-2 border-amber-100 p-6 rounded-2xl">
              <h3 className="font-bold text-amber-800 mb-2">How Hypnotherapy Helps Burnout</h3>
              <p className="text-amber-900 text-sm leading-relaxed">
                Burnout is not simply tiredness — it is a deep depletion of mental, emotional, and physical resources. Hypnotherapy helps by working directly with the subconscious patterns driving overwork, people-pleasing, and difficulty switching off. Techniques such as parts therapy, ego strengthening, and stress-response retraining can help you rebuild energy, restore motivation, and establish lasting boundaries.
              </p>
            </div>
          )}

          <button onClick={() => { setAnswers({}); setResult(null); }}
            className="w-full text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 transition-colors">
            Retake the quiz
          </button>
        </div>
      )}
      <p className="text-center text-xs text-gray-400 mt-8 px-4">
        This quiz is for informational purposes only. If burnout is severely affecting your health, please speak with a healthcare professional.
      </p>
    </div>
  );
}
