'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  // Frequency & Intensity
  {
    id: 1,
    category: 'Frequency & Intensity',
    text: 'How often do you experience anger or irritability in a typical week?',
  },
  {
    id: 2,
    category: 'Frequency & Intensity',
    text: 'When you get angry, how intense does it typically feel — does it feel out of proportion to the situation?',
  },
  {
    id: 3,
    category: 'Frequency & Intensity',
    text: 'Do small frustrations or minor inconveniences trigger a strong angry reaction in you?',
  },
  // Duration & Rumination
  {
    id: 4,
    category: 'Duration & Rumination',
    text: 'Once you are angry, does the feeling linger for hours or even days rather than passing quickly?',
  },
  {
    id: 5,
    category: 'Duration & Rumination',
    text: 'Do you replay situations that made you angry, re-experiencing the feelings repeatedly in your mind?',
  },
  {
    id: 6,
    category: 'Duration & Rumination',
    text: 'Do you hold onto grudges or find it difficult to let go of things that have angered you?',
  },
  // Expression (Anger-Out)
  {
    id: 7,
    category: 'How You Express Anger',
    text: 'Do you express anger in ways you later regret — such as shouting, saying hurtful things, or aggressive behaviour?',
  },
  {
    id: 8,
    category: 'How You Express Anger',
    text: 'Have others commented on or expressed concern about your temper or angry outbursts?',
  },
  // Suppression (Anger-In)
  {
    id: 9,
    category: 'How You Express Anger',
    text: 'Do you suppress your anger — keeping it inside — which then builds up until you eventually explode?',
  },
  // Hostility & Cynicism
  {
    id: 10,
    category: 'Hostility & Cynicism',
    text: 'Do you often feel that people are deliberately trying to annoy, disrespect, or take advantage of you?',
  },
  {
    id: 11,
    category: 'Hostility & Cynicism',
    text: 'Do you frequently feel a sense of injustice — that things are unfair, or that you are treated worse than others?',
  },
  // Physical
  {
    id: 12,
    category: 'Physical Response',
    text: 'When angry, do you experience strong physical symptoms such as a racing heart, flushed face, muscle tension, or shaking?',
  },
  // Impact
  {
    id: 13,
    category: 'Impact on Your Life',
    text: 'Has your anger caused problems in your relationships, at work, or in other areas of your life?',
  },
  {
    id: 14,
    category: 'Impact on Your Life',
    text: 'Do you feel that your anger is out of your control, or that you struggle to manage it effectively?',
  },
];

const options = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Always', value: 4 },
];

type Result = { headline: string; body: string; severity: 'low' | 'moderate' | 'high'; suppresser: boolean };

export default function AngerTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;
    // Anger-in (suppressor) pattern: high on Q9 but lower on Q7/Q8
    const suppresser = (answers[9] ?? 0) >= 3 && ((answers[7] ?? 0) + (answers[8] ?? 0)) <= 2;

    if (pct < 22) {
      setResult({ headline: 'Anger Is Well Managed', body: 'Your responses suggest you manage anger well. Everyone experiences anger — it is a natural emotion. You appear to have healthy ways of processing and expressing it. Hypnotherapy can be a great tool for maintaining emotional resilience.', severity: 'low', suppresser: false });
    } else if (pct < 52) {
      setResult({
        headline: suppresser ? 'Moderate Anger — Suppression Pattern' : 'Moderate Anger Issues',
        body: suppresser
          ? 'Your responses suggest you tend to suppress anger rather than express it — which can lead to build-up, resentment, and eventual blow-ups. Hypnotherapy can help you process anger safely and develop healthy ways to communicate it before it accumulates.'
          : 'Your responses suggest you experience anger issues that are affecting your relationships or daily life. Hypnotherapy is highly effective for anger management — working at the subconscious level to identify triggers, reduce reactivity, and build calmer, more considered responses.',
        severity: 'moderate',
        suppresser,
      });
    } else {
      setResult({
        headline: suppresser ? 'Significant Anger — Suppression Pattern' : 'Significant Anger Issues',
        body: suppresser
          ? 'Your responses suggest significant suppressed anger that is likely having a serious impact on your health and relationships. Chronic anger suppression is linked to anxiety, depression, and physical health problems. Hypnotherapy offers a safe space to process and release anger constructively.'
          : 'Your responses suggest significant anger issues that are likely causing real harm to your relationships, work, and wellbeing. Anger at this level is often rooted in deeper experiences — past hurt, unmet needs, or learned responses. Hypnotherapy addresses these roots directly, creating lasting change rather than surface-level coping.',
        severity: 'high',
        suppresser,
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
              <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-300" style={{ width: `${(answered / questions.length) * 100}%` }} />
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-5">{cat}</h2>
              {questions.filter((q) => q.category === cat).map((q) => (
                <div key={q.id} className="mb-8">
                  <p className="text-gray-800 font-semibold mb-3 leading-relaxed">{q.text}</p>
                  <div className="grid grid-cols-5 gap-2">
                    {options.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setAnswer(q.id, opt.value)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 text-xs font-medium transition-all ${answers[q.id] === opt.value ? 'bg-red-500 border-red-500 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-red-300'}`}>
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
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed">
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
              <Button asChild className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">Find an Anger Management Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" /></Link>
              </Button>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="bg-red-50 border-2 border-red-100 p-6 rounded-2xl">
              <h3 className="font-bold text-red-800 mb-2">How Hypnotherapy Helps Anger Issues</h3>
              <p className="text-red-900 text-sm leading-relaxed">
                Anger issues are rarely just about anger — they are often rooted in deeper feelings of hurt, fear, shame, or unmet needs. Hypnotherapy works at the subconscious level to identify and heal these roots, reduce the intensity of triggers, and install calmer automatic responses. Unlike surface-level coping strategies, hypnotherapy creates change that feels natural and lasting — not forced.
              </p>
            </div>
          )}

          <button onClick={() => { setAnswers({}); setResult(null); }} className="w-full text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 transition-colors">Retake the test</button>
        </div>
      )}
      <p className="text-center text-xs text-gray-400 mt-8 px-4">
        This test is for informational purposes only. If anger is causing harm to you or others, please seek support from a qualified professional.
      </p>
    </div>
  );
}
