'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'Fear of Judgement',
    text: 'Do you fear being embarrassed, judged, or humiliated in social situations?',
  },
  {
    id: 2,
    category: 'Fear of Judgement',
    text: 'Do you worry excessively about what others think of you before, during, or after social interactions?',
  },
  {
    id: 3,
    category: 'Fear of Judgement',
    text: 'Do you replay conversations or social situations afterward, criticising how you came across?',
  },
  {
    id: 4,
    category: 'Avoidance',
    text: 'Do you avoid social situations such as parties, meetings, or group gatherings because they make you anxious?',
  },
  {
    id: 5,
    category: 'Avoidance',
    text: 'Do you avoid speaking up in groups, asking questions, or drawing attention to yourself?',
  },
  {
    id: 6,
    category: 'Avoidance',
    text: 'Do you turn down opportunities (work, social, personal) because of anxiety about how others will perceive you?',
  },
  {
    id: 7,
    category: 'Physical Symptoms',
    text: 'Do you experience blushing, sweating, trembling, or a racing heart in social situations?',
  },
  {
    id: 8,
    category: 'Physical Symptoms',
    text: 'Do you feel nauseous or have an upset stomach before or during social events?',
  },
  {
    id: 9,
    category: 'Performance Situations',
    text: 'Do you feel intense anxiety when speaking, presenting, or performing in front of others?',
  },
  {
    id: 10,
    category: 'Performance Situations',
    text: 'Do you struggle with eating, drinking, or writing in front of other people due to self-consciousness?',
  },
  {
    id: 11,
    category: 'Daily Life Impact',
    text: 'Does social anxiety limit your career, education, or relationships?',
  },
  {
    id: 12,
    category: 'Daily Life Impact',
    text: 'Do you feel significant distress about your social anxiety, even when you know your fears may be out of proportion?',
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

export default function SocialAnxietyTest() {
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

    if (pct < 25) {
      setResult({
        headline: 'Minimal Social Anxiety',
        body: 'Your responses suggest you experience little social anxiety. Feeling somewhat nervous in social situations is completely normal. If this changes, hypnotherapy is a gentle and effective tool for building social confidence.',
        severity: 'low',
      });
    } else if (pct < 55) {
      setResult({
        headline: 'Moderate Social Anxiety',
        body: 'Your responses suggest you experience moderate social anxiety that may be holding you back in certain areas of life. Hypnotherapy is highly effective for social anxiety — it works directly on the subconscious patterns that trigger self-consciousness, helping you feel calmer and more confident in social situations.',
        severity: 'moderate',
      });
    } else {
      setResult({
        headline: 'Significant Social Anxiety Disorder Symptoms',
        body: 'Your responses suggest significant symptoms of social anxiety disorder that are likely affecting your daily life, relationships, and opportunities. Social anxiety is one of the most treatable conditions — hypnotherapy, alongside other approaches, can help you break the cycle of avoidance and build genuine social confidence.',
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
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${(answered / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-5">{cat}</h2>
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
                            ? 'bg-pink-600 border-pink-600 text-white'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-pink-300'
                        }`}
                      >
                        <span className="text-base font-bold">{opt.value}</span>
                        <span className="text-center leading-tight hidden sm:block">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1 px-1 sm:hidden">
                    <span>Never</span>
                    <span>Always</span>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <Button
            type="button"
            onClick={calculate}
            disabled={!allAnswered}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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
              <Button asChild className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">
                  Find a Social Anxiety Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" />
                </Link>
              </Button>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="bg-pink-50 border-2 border-pink-100 p-6 rounded-2xl">
              <h3 className="font-bold text-pink-800 mb-2">How Hypnotherapy Helps Social Anxiety</h3>
              <p className="text-pink-900 text-sm leading-relaxed">
                Social anxiety is rooted in deeply held subconscious beliefs about yourself and how others see you. Hypnotherapy works directly at this level — helping to dissolve the automatic fear responses, reframe negative self-beliefs, and build genuine confidence that carries into real-world social situations. Many people notice significant improvement within just a few sessions.
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
        This test is for informational purposes only and does not constitute a clinical diagnosis of social anxiety disorder. If social anxiety is significantly affecting your life, please speak with a qualified healthcare professional.
      </p>
    </div>
  );
}
