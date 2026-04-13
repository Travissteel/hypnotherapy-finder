'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Fear of Vomiting', text: 'Do you have an intense fear of vomiting yourself, even when you are not actually feeling ill?' },
  { id: 2, category: 'Fear of Vomiting', text: 'Do you feel extreme anxiety or panic when you feel nauseous, even slightly?' },
  { id: 3, category: 'Fear of Vomiting', text: 'Does the thought of vomiting cause significantly more distress for you than for most people?' },
  { id: 4, category: 'Fear of Others Being Sick', text: 'Do you have an intense fear of seeing or hearing others vomit?' },
  { id: 5, category: 'Fear of Others Being Sick', text: 'Do you feel anxious being around people who you think might be unwell or who have recently been sick?' },
  { id: 6, category: 'Food & Eating Anxiety', text: 'Do you restrict what you eat — avoiding certain foods, restaurants, or eating situations — out of fear of getting sick?' },
  { id: 7, category: 'Food & Eating Anxiety', text: 'Do you check expiry dates, preparation methods, or food hygiene excessively due to fear of food poisoning or illness?' },
  { id: 8, category: 'Avoidance Behaviours', text: 'Do you avoid going out, social events, or travel out of fear that you or someone else might be sick?' },
  { id: 9, category: 'Avoidance Behaviours', text: 'Do you avoid alcohol, certain medications, or activities like fairground rides because of the risk of nausea?' },
  { id: 10, category: 'Daily Life Impact', text: 'Does emetophobia affect your diet, weight, or relationship with food significantly?' },
  { id: 11, category: 'Daily Life Impact', text: 'Has your fear of vomiting affected your relationships, work, travel, or quality of life?' },
  { id: 12, category: 'Daily Life Impact', text: 'Do you recognise that your fear may be excessive but feel unable to control your response to it?' },
];

const options = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Always', value: 4 },
];

type Result = { headline: string; body: string; severity: 'low' | 'moderate' | 'high' };

export default function EmetophobiaTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 22) {
      setResult({ headline: 'Minimal Emetophobia Symptoms', body: 'Your responses suggest little or no emetophobia. Most people dislike being sick — that is entirely normal. If your anxiety around vomiting increases, effective support is available.', severity: 'low' });
    } else if (pct < 52) {
      setResult({ headline: 'Possible Emetophobia', body: 'Your responses suggest you may have emetophobia that is causing real distress and impacting your daily life, eating habits, or social activities. Emetophobia is more common than most people realise — and hypnotherapy is one of the most effective treatments, working directly on the subconscious fear response.', severity: 'moderate' });
    } else {
      setResult({ headline: 'Significant Emetophobia', body: 'Your responses suggest significant emetophobia that is likely having a major impact on your life, diet, relationships, and freedom. Emetophobia can be deeply isolating — but recovery is absolutely possible. Hypnotherapy has helped many people with severe emetophobia reclaim a normal relationship with food and daily life.', severity: 'high' });
    }
  };

  const color = (s: string) => s === 'low' ? 'text-green-700' : s === 'moderate' ? 'text-amber-600' : 'text-red-600';
  const bg = (s: string) => s === 'low' ? 'bg-green-50 border-green-200' : s === 'moderate' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';
  const icon = (s: string) => s === 'low' ? <CheckCircle className="h-7 w-7 text-green-600 flex-shrink-0" /> : s === 'moderate' ? <Activity className="h-7 w-7 text-amber-500 flex-shrink-0" /> : <AlertTriangle className="h-7 w-7 text-red-500 flex-shrink-0" />;
  const categories = [...new Set(questions.map((q) => q.category))];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      {!result ? (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium">{answered} of {questions.length} answered</p>
            <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-lime-500 to-green-600 rounded-full transition-all duration-300" style={{ width: `${(answered / questions.length) * 100}%` }} />
            </div>
          </div>
          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-lime-600 mb-5">{cat}</h2>
              {questions.filter((q) => q.category === cat).map((q) => (
                <div key={q.id} className="mb-8">
                  <p className="text-gray-800 font-semibold mb-3 leading-relaxed">{q.text}</p>
                  <div className="grid grid-cols-5 gap-2">
                    {options.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setAnswer(q.id, opt.value)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 text-xs font-medium transition-all ${answers[q.id] === opt.value ? 'bg-lime-600 border-lime-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-lime-400'}`}>
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
            className="w-full bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed">
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
              <Button asChild className="bg-lime-600 hover:bg-lime-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">Find a Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" /></Link>
              </Button>
            )}
          </div>
          {result.severity !== 'low' && (
            <div className="bg-lime-50 border-2 border-lime-200 p-6 rounded-2xl">
              <h3 className="font-bold text-lime-800 mb-2">Why Hypnotherapy Works for Emetophobia</h3>
              <p className="text-lime-900 text-sm leading-relaxed">Emetophobia is often deeply rooted in an early experience that the subconscious has over-generalised into a broad fear of vomiting. Hypnotherapy works by revisiting and reprocessing these roots safely, desensitising the fear response, and helping you develop a calm, rational response to nausea. Many emetophobia sufferers report that hypnotherapy gave them back their freedom around food and social situations.</p>
            </div>
          )}
          <ShareResult quizName="Emetophobia Test" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/emetophobia-test" />

          <button onClick={() => { setAnswers({}); setResult(null); }} className="w-full text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 transition-colors">Retake the test</button>
        </div>
      )}
      <p className="text-center text-xs text-gray-400 mt-8 px-4">This test is for informational purposes only. If emetophobia is significantly affecting your eating or daily life, please speak with a qualified professional.</p>
    </div>
  );
}
