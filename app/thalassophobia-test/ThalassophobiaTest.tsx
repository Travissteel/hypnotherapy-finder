'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'Fear of Deep Water',
    text: 'Do you feel intense fear or dread when thinking about deep ocean water, lakes, or other large bodies of water?',
  },
  {
    id: 2,
    category: 'Fear of Deep Water',
    text: 'Does looking at images or videos of deep, dark water trigger anxiety or discomfort?',
  },
  {
    id: 3,
    category: 'Fear of Deep Water',
    text: 'Do you feel frightened by the thought of what might be lurking beneath the surface of deep water?',
  },
  {
    id: 4,
    category: 'Fear of Deep Water',
    text: 'Does being unable to see the bottom of a body of water make you feel panicked or uneasy?',
  },
  {
    id: 5,
    category: 'Specific Triggers',
    text: 'Do you feel anxious when swimming in the sea, a lake, or a pool where the water is deep or murky?',
  },
  {
    id: 6,
    category: 'Specific Triggers',
    text: 'Do underwater images — such as sea creatures, shipwrecks, or vast ocean depths — cause significant anxiety?',
  },
  {
    id: 7,
    category: 'Specific Triggers',
    text: 'Do you feel uncomfortable or afraid on boats, near cliff edges over water, or when swimming far from shore?',
  },
  {
    id: 8,
    category: 'Physical Response',
    text: 'When confronted with deep water (or images of it), do you experience physical symptoms such as a racing heart, sweating, dizziness, or nausea?',
  },
  {
    id: 9,
    category: 'Physical Response',
    text: 'Have you ever had a panic attack related to deep water or thoughts about it?',
  },
  {
    id: 10,
    category: 'Avoidance & Impact',
    text: 'Do you actively avoid beaches, swimming, water sports, or holidays near large bodies of water because of this fear?',
  },
  {
    id: 11,
    category: 'Avoidance & Impact',
    text: 'Has your fear of deep water limited activities you would otherwise enjoy, or affected your relationships or travel plans?',
  },
  {
    id: 12,
    category: 'Avoidance & Impact',
    text: 'Do you recognise that your fear may be out of proportion to the actual danger, but feel unable to control it?',
  },
];

const options = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Always', value: 4 },
];

type Result = {
  headline: string;
  body: string;
  severity: 'low' | 'moderate' | 'high';
};

export default function ThalassophobiaTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;

  const setAnswer = (id: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const max = questions.length * 4; // 48
    const pct = (total / max) * 100;

    if (pct < 20) {
      setResult({
        headline: 'Minimal Thalassophobia Symptoms',
        body: 'Your responses suggest you have little or no thalassophobia. A slight wariness around deep water is completely natural and even adaptive. If your feelings change or increase, support is available.',
        severity: 'low',
      });
    } else if (pct < 50) {
      setResult({
        headline: 'Possible Thalassophobia',
        body: 'Your responses suggest you may have thalassophobia — a fear of deep water — that is causing noticeable anxiety and some avoidance. Hypnotherapy is highly effective for specific phobias like thalassophobia, helping to neutralise the fear response so you can feel comfortable around water again.',
        severity: 'moderate',
      });
    } else {
      setResult({
        headline: 'Likely Thalassophobia',
        body: 'Your responses suggest significant thalassophobia that is affecting your daily life, travel, or activities. You are not alone — fear of deep water is one of the most common phobias. Hypnotherapy works directly on the subconscious fear response and often produces life-changing results in just a few sessions.',
        severity: 'high',
      });
    }
  };

  const color = (s: string) => {
    if (s === 'low') return 'text-green-700';
    if (s === 'moderate') return 'text-amber-600';
    return 'text-red-600';
  };
  const bg = (s: string) => {
    if (s === 'low') return 'bg-green-50 border-green-200';
    if (s === 'moderate') return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };
  const icon = (s: string) => {
    if (s === 'low') return <CheckCircle className="h-7 w-7 text-green-600 flex-shrink-0" />;
    if (s === 'moderate') return <Activity className="h-7 w-7 text-amber-500 flex-shrink-0" />;
    return <AlertTriangle className="h-7 w-7 text-red-500 flex-shrink-0" />;
  };

  const categories = [...new Set(questions.map((q) => q.category))];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      {!result ? (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium">{answered} of {questions.length} answered</p>
            <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(answered / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-5">{cat}</h2>
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
                            ? 'bg-cyan-600 border-cyan-600 text-white'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-cyan-300'
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
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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
              <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">
                  Find a Phobia Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" />
                </Link>
              </Button>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="bg-cyan-50 border-2 border-cyan-100 p-6 rounded-2xl">
              <h3 className="font-bold text-cyan-800 mb-2">What is Thalassophobia?</h3>
              <p className="text-cyan-900 text-sm leading-relaxed">
                Thalassophobia is an intense fear of deep bodies of water — including oceans, lakes, and rivers. It often includes fear of what is unseen beneath the surface, the vastness of open water, or the feeling of being submerged. It is distinct from aquaphobia (fear of water in general) and is extremely common. Hypnotherapy addresses the root of the fear at the subconscious level, making it one of the most effective treatments available.
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
        This test is for informational purposes only and does not constitute a clinical diagnosis. If your fear of deep water is significantly affecting your life, please speak with a qualified professional.
      </p>
    </div>
  );
}
