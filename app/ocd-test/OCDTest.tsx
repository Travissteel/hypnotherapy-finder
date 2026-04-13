'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  // Obsessions
  {
    id: 1,
    category: 'Intrusive Thoughts & Obsessions',
    text: 'Do you experience unwanted, repetitive thoughts, images, or urges that feel distressing or hard to control?',
  },
  {
    id: 2,
    category: 'Intrusive Thoughts & Obsessions',
    text: 'Do you have persistent fears about contamination, germs, or dirt — for example, worrying about touching certain objects or surfaces?',
  },
  {
    id: 3,
    category: 'Intrusive Thoughts & Obsessions',
    text: 'Do you experience intrusive thoughts about harming yourself or others, even though you would never act on them?',
  },
  {
    id: 4,
    category: 'Intrusive Thoughts & Obsessions',
    text: 'Do you have an intense need for things to feel "just right", perfectly symmetrical, or in a specific order?',
  },
  {
    id: 5,
    category: 'Intrusive Thoughts & Obsessions',
    text: 'Do you experience recurring doubts (e.g. "Did I lock the door?", "Did I hurt someone?") even when you know the answer is almost certainly no?',
  },
  // Compulsions
  {
    id: 6,
    category: 'Compulsions & Rituals',
    text: 'Do you perform repetitive behaviours (e.g. hand washing, checking, counting, arranging) to relieve anxiety or prevent something bad happening?',
  },
  {
    id: 7,
    category: 'Compulsions & Rituals',
    text: 'Do you engage in mental rituals such as repeating words, prayers, or phrases silently to neutralise an unwanted thought?',
  },
  {
    id: 8,
    category: 'Compulsions & Rituals',
    text: 'Do you seek reassurance from others repeatedly about the same worries, even when reassurance only relieves anxiety temporarily?',
  },
  {
    id: 9,
    category: 'Compulsions & Rituals',
    text: 'Do you avoid certain situations, objects, or people to prevent triggering obsessive thoughts or urges?',
  },
  // Time & impact
  {
    id: 10,
    category: 'Time & Daily Impact',
    text: 'Do obsessive thoughts or compulsive behaviours take up more than an hour of your day?',
  },
  {
    id: 11,
    category: 'Time & Daily Impact',
    text: 'Do your obsessions or compulsions significantly interfere with your work, studies, or daily responsibilities?',
  },
  {
    id: 12,
    category: 'Time & Daily Impact',
    text: 'Do obsessions or compulsions negatively affect your relationships or social life?',
  },
  // Pure O
  {
    id: 13,
    category: 'Pure O (Primarily Mental OCD)',
    text: 'Do you experience distressing intrusive thoughts but feel your compulsions are mostly mental rather than physical — making it hard to recognise them as OCD?',
  },
  {
    id: 14,
    category: 'Pure O (Primarily Mental OCD)',
    text: 'Do you spend significant time mentally analysing, arguing with, or trying to "figure out" intrusive thoughts to prove they don\'t mean anything bad about you?',
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
  isPureO: boolean;
};

export default function OCDTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;

  const setAnswer = (id: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const max = questions.length * 4; // 56
    const pct = (total / max) * 100;

    // Pure O indicator: high score on Q13/Q14 but lower on physical compulsions Q6
    const pureOScore = (answers[13] ?? 0) + (answers[14] ?? 0);
    const physicalCompulsion = answers[6] ?? 0;
    const isPureO = pureOScore >= 5 && physicalCompulsion <= 1;

    if (pct < 20) {
      setResult({
        headline: 'Few OCD Symptoms Detected',
        body: 'Your responses suggest you are experiencing few symptoms associated with OCD. Occasional intrusive thoughts are normal for everyone. If your symptoms increase or begin to affect your daily life, support is available.',
        severity: 'low',
        isPureO: false,
      });
    } else if (pct < 50) {
      setResult({
        headline: isPureO ? 'Possible Pure O (Primarily Obsessional OCD)' : 'Possible OCD Symptoms',
        body: isPureO
          ? 'Your responses suggest you may be experiencing "Pure O" — a form of OCD where compulsions are primarily mental rather than physical. This often goes unrecognised because there are no obvious rituals. Hypnotherapy can help by addressing the underlying anxiety and breaking the cycle of mental rumination.'
          : 'Your responses suggest you may be experiencing OCD symptoms that are affecting your life. OCD involves a cycle of obsessions and compulsions that can be exhausting to manage. Hypnotherapy is an effective complementary approach that targets the anxiety driving the OCD cycle.',
        severity: 'moderate',
        isPureO,
      });
    } else {
      setResult({
        headline: isPureO ? 'Significant Pure O Symptoms' : 'Significant OCD Symptoms',
        body: isPureO
          ? 'Your responses suggest significant symptoms of primarily obsessional OCD (Pure O). Mental compulsions like rumination, reassurance-seeking, and thought analysis can be just as exhausting as physical rituals. Hypnotherapy and ERP-informed approaches can help you break free from the cycle.'
          : 'Your responses suggest significant OCD symptoms that are likely having a major impact on your daily life. Please know that OCD is a recognised, treatable condition — you are not "crazy" and your thoughts do not define you. A qualified hypnotherapist experienced in OCD can help you regain control.',
        severity: 'high',
        isPureO,
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
                className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full transition-all duration-300"
                style={{ width: `${(answered / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-5">{cat}</h2>
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
                            ? 'bg-orange-500 border-orange-500 text-white'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-orange-300'
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
            className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {allAnswered
              ? 'See My Results'
              : `Answer all questions to continue (${questions.length - answered} remaining)`}
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
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">
                  Find an OCD Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" />
                </Link>
              </Button>
            )}
          </div>

          {result.isPureO && (
            <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-2xl">
              <h3 className="font-bold text-orange-800 mb-2">What is Pure O?</h3>
              <p className="text-orange-900 text-sm leading-relaxed">
                "Pure O" (Primarily Obsessional OCD) is a form of OCD where compulsions are mostly mental — ruminating, seeking reassurance, mentally reviewing events, or trying to "cancel out" thoughts. Because there are no obvious rituals, Pure O often goes undiagnosed for years. It is just as real as other forms of OCD, and equally treatable.
              </p>
            </div>
          )}

          {result.severity !== 'low' && (
            <div className="bg-rose-50 border-2 border-rose-100 p-6 rounded-2xl">
              <h3 className="font-bold text-rose-800 mb-2">How Hypnotherapy Helps OCD</h3>
              <p className="text-rose-900 text-sm leading-relaxed">
                Hypnotherapy for OCD works by reducing the underlying anxiety that fuels the obsession-compulsion cycle. Using techniques like cognitive hypnotherapy and ERP-informed suggestion, a hypnotherapist can help you respond to intrusive thoughts with calm rather than compulsion — weakening the cycle over time. Many people find it highly effective alongside other OCD treatments.
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
        This test is for informational purposes only and does not constitute a clinical diagnosis of OCD. If obsessive thoughts or compulsive behaviours are significantly affecting your life, please speak with a qualified mental health professional.
      </p>
    </div>
  );
}
