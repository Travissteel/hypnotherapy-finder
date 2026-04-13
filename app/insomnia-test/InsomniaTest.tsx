'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'Falling & Staying Asleep',
    text: 'Do you have difficulty falling asleep at night, even when you feel tired?',
  },
  {
    id: 2,
    category: 'Falling & Staying Asleep',
    text: 'Do you wake up in the middle of the night and struggle to get back to sleep?',
  },
  {
    id: 3,
    category: 'Falling & Staying Asleep',
    text: 'Do you wake up earlier than you would like and find yourself unable to fall back asleep?',
  },
  {
    id: 4,
    category: 'Sleep Quality',
    text: 'Do you feel unrefreshed or still tired after a full night of sleep?',
  },
  {
    id: 5,
    category: 'Sleep Quality',
    text: 'Do you experience light or broken sleep rather than deep, restorative rest?',
  },
  {
    id: 6,
    category: 'Thoughts & Anxiety at Bedtime',
    text: 'Do you experience racing thoughts, worry, or mental activity that keeps you awake at night?',
  },
  {
    id: 7,
    category: 'Thoughts & Anxiety at Bedtime',
    text: 'Do you feel anxious or dread going to bed because you expect to struggle to sleep?',
  },
  {
    id: 8,
    category: 'Thoughts & Anxiety at Bedtime',
    text: 'Do you watch the clock, calculate how many hours of sleep you have left, or feel frustrated when you cannot sleep?',
  },
  {
    id: 9,
    category: 'Daytime Impact',
    text: 'Do you feel fatigued, drowsy, or low on energy during the day due to poor sleep?',
  },
  {
    id: 10,
    category: 'Daytime Impact',
    text: 'Has poor sleep affected your concentration, memory, or ability to perform at work or in daily tasks?',
  },
  {
    id: 11,
    category: 'Daytime Impact',
    text: 'Has poor sleep affected your mood, making you more irritable, anxious, or low?',
  },
  {
    id: 12,
    category: 'Duration & Pattern',
    text: 'Have you been experiencing sleep problems for more than a month?',
  },
  {
    id: 13,
    category: 'Duration & Pattern',
    text: 'Do your sleep problems occur most nights, rather than occasionally?',
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

export default function InsomniaTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 22) {
      setResult({
        headline: 'No Significant Insomnia',
        body: 'Your responses suggest you are not currently experiencing significant insomnia. Everyone has the occasional poor night — this is normal. If your sleep worsens, hypnotherapy is one of the most effective tools for improving sleep quality.',
        severity: 'low',
      });
    } else if (pct < 52) {
      setResult({
        headline: 'Moderate Insomnia',
        body: 'Your responses suggest you are experiencing moderate insomnia that is affecting your sleep quality and daytime functioning. Hypnotherapy is highly effective for insomnia — it works by calming the nervous system, quieting bedtime anxiety, and retraining your subconscious to associate bed with deep, restful sleep.',
        severity: 'moderate',
      });
    } else {
      setResult({
        headline: 'Severe Insomnia',
        body: 'Your responses suggest significant, chronic insomnia that is likely having a serious impact on your health, mood, and daily life. Chronic sleep deprivation is serious — please seek support. Hypnotherapy has strong evidence for treating insomnia and can help break the cycle of sleeplessness, anxiety, and exhaustion.',
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
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(answered / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-5">{cat}</h2>
              {questions.filter((q) => q.category === cat).map((q) => (
                <div key={q.id} className="mb-8">
                  <p className="text-gray-800 font-semibold mb-3 leading-relaxed">{q.text}</p>
                  <div className="grid grid-cols-5 gap-2">
                    {options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setAnswer(q.id, opt.value)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 text-xs font-medium transition-all ${
                          answers[q.id] === opt.value
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'
                        }`}
                      >
                        <span className="text-base font-bold">{opt.value}</span>
                        <span className="text-center leading-tight hidden sm:block">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1 px-1 sm:hidden">
                    <span>Never</span><span>Always</span>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <Button
            type="button"
            onClick={calculate}
            disabled={!allAnswered}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {allAnswered ? 'See My Results' : `Answer all questions to continue (${questions.length - answered} remaining)`}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className={`p-8 rounded-3xl border-2 shadow-xl ${bg(result.severity)}`}>
            <div className="flex items-start gap-4 mb-4">
              {icon(result.severity)}
              <h2 className={`text-2xl font-extrabold leading-tight ${color(result.severity)}`}>
                {result.headline}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">{result.body}</p>
            {result.severity !== 'low' && (
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">
                  Find a Sleep Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" />
                </Link>
              </Button>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="bg-indigo-50 border-2 border-indigo-100 p-6 rounded-2xl">
              <h3 className="font-bold text-indigo-800 mb-2">How Hypnotherapy Helps Insomnia</h3>
              <p className="text-indigo-900 text-sm leading-relaxed">
                Insomnia is often driven by an overactive mind and a conditioned anxiety around sleep — your brain learns to associate bed with wakefulness and worry rather than rest. Hypnotherapy works by deeply relaxing the nervous system, quieting anxious thought patterns, and using suggestion to retrain your subconscious to welcome and sustain deep sleep. Many people experience significant improvement within just a few sessions.
              </p>
            </div>
          )}

          <button
            onClick={() => { setAnswers({}); setResult(null); }}
            className="w-full text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 transition-colors"
          >
            Retake the test
          </button>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-8 px-4">
        This test is for informational purposes only. If sleep problems are severely affecting your health, please speak with a qualified healthcare professional.
      </p>
    </div>
  );
}
