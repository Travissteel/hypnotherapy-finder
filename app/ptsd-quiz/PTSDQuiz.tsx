'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  // Intrusive symptoms
  {
    id: 1,
    category: 'Intrusive Symptoms',
    text: 'Do you experience unwanted, distressing memories of a traumatic event?',
  },
  {
    id: 2,
    category: 'Intrusive Symptoms',
    text: 'Do you have nightmares or upsetting dreams related to a traumatic experience?',
  },
  {
    id: 3,
    category: 'Intrusive Symptoms',
    text: 'Do you experience flashbacks — feeling as if a traumatic event is happening again?',
  },
  // Avoidance
  {
    id: 4,
    category: 'Avoidance',
    text: 'Do you avoid thoughts, feelings, or memories associated with a traumatic event?',
  },
  {
    id: 5,
    category: 'Avoidance',
    text: 'Do you avoid people, places, activities, or situations that remind you of a trauma?',
  },
  // Negative mood & cognition
  {
    id: 6,
    category: 'Mood & Thinking',
    text: 'Do you feel persistent negative beliefs about yourself, others, or the world (e.g. "I am broken", "nowhere is safe")?',
  },
  {
    id: 7,
    category: 'Mood & Thinking',
    text: 'Do you feel emotionally numb, detached from others, or unable to experience positive emotions?',
  },
  {
    id: 8,
    category: 'Mood & Thinking',
    text: 'Do you feel persistent guilt or shame related to a traumatic event?',
  },
  // Hyperarousal
  {
    id: 9,
    category: 'Hyperarousal',
    text: 'Do you feel constantly on edge, easily startled, or hyper-vigilant about potential danger?',
  },
  {
    id: 10,
    category: 'Hyperarousal',
    text: 'Do you have difficulty sleeping, concentrating, or controlling angry outbursts?',
  },
  // Complex PTSD indicators
  {
    id: 11,
    category: 'Emotional Regulation',
    text: 'Do you experience intense, overwhelming emotions that feel difficult to control?',
  },
  {
    id: 12,
    category: 'Self-Perception',
    text: 'Do you have a persistent negative sense of self — feeling permanently damaged, worthless, or different from others?',
  },
  {
    id: 13,
    category: 'Relationships',
    text: 'Do you struggle to trust others or maintain close relationships due to past experiences?',
  },
];

const options = [
  { label: 'Not at all', value: 0 },
  { label: 'A little', value: 1 },
  { label: 'Moderately', value: 2 },
  { label: 'Quite a bit', value: 3 },
  { label: 'Extremely', value: 4 },
];

type Result = {
  headline: string;
  subline: string;
  isComplex: boolean;
  severity: 'low' | 'moderate' | 'high';
};

export default function PTSDQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;

  const setAnswer = (id: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const maxScore = questions.length * 4; // 52
    const percentage = (total / maxScore) * 100;

    // Complex PTSD indicators (Q11, Q12, Q13)
    const complexScore = (answers[11] ?? 0) + (answers[12] ?? 0) + (answers[13] ?? 0);
    const isComplex = complexScore >= 6; // avg 2+ on all three complex indicators

    if (percentage < 25) {
      setResult({
        headline: 'Few or No Significant Symptoms',
        subline:
          'Your responses suggest you are experiencing few symptoms associated with trauma. Everyone processes difficult events differently — if you are struggling, support is always available.',
        isComplex: false,
        severity: 'low',
      });
    } else if (percentage < 55) {
      setResult({
        headline: isComplex ? 'Possible Complex PTSD Symptoms' : 'Possible PTSD Symptoms',
        subline: isComplex
          ? 'Your responses suggest symptoms consistent with Complex PTSD (C-PTSD), which can develop after prolonged or repeated trauma. Hypnotherapy and trauma-focused therapy have helped many people with C-PTSD process their experiences and regain a sense of safety.'
          : 'Your responses suggest you may be experiencing symptoms associated with PTSD. These are common responses to trauma — you are not alone, and effective support is available. Hypnotherapy can be a powerful tool for trauma processing and recovery.',
        isComplex,
        severity: 'moderate',
      });
    } else {
      setResult({
        headline: isComplex ? 'Significant Complex PTSD Symptoms' : 'Significant PTSD Symptoms',
        subline: isComplex
          ? 'Your responses indicate significant symptoms consistent with Complex PTSD. C-PTSD can deeply affect daily life, relationships, and sense of self — but recovery is absolutely possible. Trauma-informed hypnotherapy has helped many people with C-PTSD rebuild safety, trust, and wellbeing.'
          : 'Your responses suggest significant trauma-related symptoms. Please know that PTSD is a normal response to abnormal events, and you deserve compassionate, professional support. Hypnotherapy is recognised as an effective approach for trauma recovery.',
        isComplex,
        severity: 'high',
      });
    }
  };

  const severityColor = (s: string) => {
    if (s === 'low') return 'text-green-700';
    if (s === 'moderate') return 'text-amber-600';
    return 'text-red-600';
  };

  const severityBg = (s: string) => {
    if (s === 'low') return 'bg-green-50 border-green-200';
    if (s === 'moderate') return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  const severityIcon = (s: string) => {
    if (s === 'low') return <CheckCircle className="h-7 w-7 text-green-600 flex-shrink-0" />;
    if (s === 'moderate') return <Activity className="h-7 w-7 text-amber-500 flex-shrink-0" />;
    return <AlertTriangle className="h-7 w-7 text-red-500 flex-shrink-0" />;
  };

  // Group questions by category for display
  const categories = [...new Set(questions.map((q) => q.category))];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      {!result ? (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium">{answered} of {questions.length} answered</p>
            <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full transition-all duration-300"
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
                    <span>Not at all</span>
                    <span>Extremely</span>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <Button
            type="button"
            onClick={calculate}
            disabled={!allAnswered}
            className="w-full bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {allAnswered ? 'See My Results' : `Answer all questions to continue (${questions.length - answered} remaining)`}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className={`p-8 rounded-3xl border-2 shadow-xl ${severityBg(result.severity)}`}>
            <div className="flex items-start gap-4 mb-4">
              {severityIcon(result.severity)}
              <h2 className={`text-2xl font-extrabold leading-tight ${severityColor(result.severity)}`}>
                {result.headline}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">{result.subline}</p>

            {result.severity !== 'low' && (
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">
                  Find a Trauma-Informed Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" />
                </Link>
              </Button>
            )}
          </div>

          {result.isComplex && (
            <div className="bg-purple-50 border-2 border-purple-200 p-6 rounded-2xl">
              <h3 className="font-bold text-purple-800 mb-2">About Complex PTSD</h3>
              <p className="text-purple-900 text-sm leading-relaxed">
                Complex PTSD (C-PTSD) typically develops after prolonged or repeated trauma, such as childhood abuse, domestic violence, or captivity. It shares core PTSD symptoms but also includes difficulties with emotional regulation, self-perception, and relationships. Trauma-informed hypnotherapy can work gently alongside other therapies to support recovery.
              </p>
            </div>
          )}

          <div className="bg-blue-50 border-2 border-blue-100 p-6 rounded-2xl">
            <h3 className="font-bold text-blue-800 mb-2">How Hypnotherapy Can Help</h3>
            <p className="text-blue-900 text-sm leading-relaxed">
              Hypnotherapy for trauma works by helping you access a relaxed state where distressing memories can be processed more safely. Techniques such as EMDR-informed hypnosis, ego state therapy, and parts work can reduce the emotional charge of traumatic memories and help rebuild a sense of safety and control.
            </p>
          </div>

          <button
            onClick={() => { setAnswers({}); setResult(null); }}
            className="w-full text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 transition-colors"
          >
            Retake the quiz
          </button>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-8 px-4">
        This quiz is for informational purposes only and does not constitute a clinical diagnosis. If you are experiencing distressing symptoms, please reach out to a qualified mental health professional or call your local crisis line.
      </p>
    </div>
  );
}
