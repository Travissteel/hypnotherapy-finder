'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'Worry & Overthinking',
    text: 'How often do you find yourself worrying excessively about everyday things?',
  },
  {
    id: 2,
    category: 'Worry & Overthinking',
    text: 'Do you find it difficult to stop or control your worrying?',
  },
  {
    id: 3,
    category: 'Worry & Overthinking',
    text: 'Do you find yourself imagining worst-case scenarios, even when things are going well?',
  },
  {
    id: 4,
    category: 'Physical Symptoms',
    text: 'Do you experience physical symptoms of anxiety such as a racing heart, shortness of breath, or chest tightness?',
  },
  {
    id: 5,
    category: 'Physical Symptoms',
    text: 'Do you suffer from muscle tension, headaches, or stomach problems that seem linked to stress or worry?',
  },
  {
    id: 6,
    category: 'Physical Symptoms',
    text: 'Do you feel restless, on edge, or physically wound up?',
  },
  {
    id: 7,
    category: 'Daily Life Impact',
    text: 'Does anxiety make it difficult to concentrate or complete everyday tasks?',
  },
  {
    id: 8,
    category: 'Daily Life Impact',
    text: 'Do you avoid situations, places, or activities because they make you anxious?',
  },
  {
    id: 9,
    category: 'Daily Life Impact',
    text: 'Has anxiety affected your work, relationships, or quality of life?',
  },
  {
    id: 10,
    category: 'Sleep & Energy',
    text: 'Do you have difficulty falling asleep or staying asleep due to anxious thoughts?',
  },
  {
    id: 11,
    category: 'Sleep & Energy',
    text: 'Do you feel tired or fatigued even after a full night of sleep?',
  },
  {
    id: 12,
    category: 'Emotional Experience',
    text: 'Do you feel irritable or easily startled more often than you would like?',
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

export default function AnxietyQuiz() {
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
        headline: 'Minimal Anxiety',
        body: 'Your responses suggest you are experiencing few anxiety symptoms right now. Everyone feels anxious occasionally — if things change, support is available. Hypnotherapy can also be a great tool for building long-term calm and resilience.',
        severity: 'low',
      });
    } else if (pct < 55) {
      setResult({
        headline: 'Moderate Anxiety',
        body: 'Your responses suggest you are experiencing a noticeable level of anxiety that may be affecting your daily life. Hypnotherapy is widely used for anxiety — it works by calming the nervous system and helping you respond to triggers differently at a subconscious level.',
        severity: 'moderate',
      });
    } else {
      setResult({
        headline: 'High Anxiety',
        body: 'Your responses suggest significant anxiety symptoms that are likely impacting your day-to-day wellbeing. You are not alone — anxiety is one of the most common reasons people seek hypnotherapy, and it is highly effective. Connecting with a qualified hypnotherapist could make a real difference.',
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
                className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${(answered / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-teal-500 mb-5">{cat}</h2>
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
                            ? 'bg-teal-600 border-teal-600 text-white'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-teal-300'
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
            className="w-full bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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
              <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">
                  Find an Anxiety Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" />
                </Link>
              </Button>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="bg-teal-50 border-2 border-teal-100 p-6 rounded-2xl">
              <h3 className="font-bold text-teal-800 mb-2">How Hypnotherapy Helps Anxiety</h3>
              <p className="text-teal-900 text-sm leading-relaxed">
                Hypnotherapy for anxiety works by accessing the subconscious mind — where anxious patterns and automatic responses are stored. Techniques like cognitive hypnotherapy, relaxation induction, and suggestion therapy can help retrain your nervous system to respond to triggers with calm rather than panic.
              </p>
            </div>
          )}

          <ShareResult quizName="Anxiety Quiz" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/anxiety-quiz" />

          <button
            onClick={() => { setAnswers({}); setResult(null); }}
            className="w-full text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 transition-colors"
          >
            Retake the quiz
          </button>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-8 px-4">
        This quiz is for informational purposes only and does not constitute a clinical diagnosis. If anxiety is significantly affecting your life, please speak with a qualified healthcare professional.
      </p>
    </div>
  );
}
