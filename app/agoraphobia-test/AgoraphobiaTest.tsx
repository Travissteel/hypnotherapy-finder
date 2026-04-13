'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Fear of Public Situations', text: 'Do you feel intense anxiety in open public spaces such as shopping centres, markets, or car parks?' },
  { id: 2, category: 'Fear of Public Situations', text: 'Do you fear using public transport such as buses, trains, or the underground?' },
  { id: 3, category: 'Fear of Public Situations', text: 'Do you feel anxious in crowds or queues where you might feel trapped or unable to escape easily?' },
  { id: 4, category: 'Fear of Public Situations', text: 'Do you feel uncomfortable in enclosed public spaces such as cinemas, restaurants, or waiting rooms?' },
  { id: 5, category: 'Fear of Leaving Home', text: 'Do you feel anxious or reluctant to leave your home, particularly alone?' },
  { id: 6, category: 'Fear of Leaving Home', text: 'Do you feel safer at home and find it difficult to venture beyond familiar, close surroundings?' },
  { id: 7, category: 'Fear of Leaving Home', text: 'Has your "safe zone" — the area where you feel comfortable — been getting smaller over time?' },
  { id: 8, category: 'Physical & Panic Symptoms', text: 'Do you experience panic attacks or intense physical symptoms (racing heart, dizziness, sweating) in triggering situations?' },
  { id: 9, category: 'Physical & Panic Symptoms', text: 'Do you fear having a panic attack in public, particularly in a place where help might not be available?' },
  { id: 10, category: 'Avoidance & Impact', text: 'Do you avoid situations, travel, or social events because of anxiety about being in public places?' },
  { id: 11, category: 'Avoidance & Impact', text: 'Has your fear of public places affected your work, relationships, or independence?' },
  { id: 12, category: 'Avoidance & Impact', text: 'Do you rely on a companion to feel safe enough to go to places that cause anxiety?' },
];

const options = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Always', value: 4 },
];

type Result = { headline: string; body: string; severity: 'low' | 'moderate' | 'high' };

export default function AgoraphobiaTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 22) {
      setResult({ headline: 'Minimal Agoraphobia Symptoms', body: 'Your responses suggest you are experiencing few agoraphobia symptoms. Mild discomfort in crowded or open spaces is common. If your feelings intensify or begin to limit your life, support is available.', severity: 'low' });
    } else if (pct < 52) {
      setResult({ headline: 'Possible Agoraphobia', body: 'Your responses suggest you may be experiencing agoraphobia symptoms that are affecting your daily life. Hypnotherapy is highly effective for agoraphobia — working with the anxiety and avoidance patterns at a subconscious level to help you reclaim your freedom and confidence in public spaces.', severity: 'moderate' });
    } else {
      setResult({ headline: 'Significant Agoraphobia Symptoms', body: 'Your responses suggest significant agoraphobia that is likely having a major impact on your independence and quality of life. You are not alone — agoraphobia is more common than most people realise. Hypnotherapy can help you gradually and safely expand your comfort zone and break the cycle of avoidance.', severity: 'high' });
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
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-300" style={{ width: `${(answered / questions.length) * 100}%` }} />
            </div>
          </div>
          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-5">{cat}</h2>
              {questions.filter((q) => q.category === cat).map((q) => (
                <div key={q.id} className="mb-8">
                  <p className="text-gray-800 font-semibold mb-3 leading-relaxed">{q.text}</p>
                  <div className="grid grid-cols-5 gap-2">
                    {options.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setAnswer(q.id, opt.value)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 text-xs font-medium transition-all ${answers[q.id] === opt.value ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'}`}>
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
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed">
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
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">Find a Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" /></Link>
              </Button>
            )}
          </div>
          {result.severity !== 'low' && (
            <div className="bg-emerald-50 border-2 border-emerald-100 p-6 rounded-2xl">
              <h3 className="font-bold text-emerald-800 mb-2">How Hypnotherapy Helps Agoraphobia</h3>
              <p className="text-emerald-900 text-sm leading-relaxed">Agoraphobia is maintained by a cycle of anxiety and avoidance — the more you avoid, the more threatening the world feels. Hypnotherapy helps break this cycle by calming the fear response at its root, using gradual exposure techniques under hypnosis, and rebuilding your confidence in your ability to cope. Many people experience significant improvement within a handful of sessions.</p>
            </div>
          )}
          <ShareResult quizName="Agoraphobia Test" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/agoraphobia-test" />

          <button onClick={() => { setAnswers({}); setResult(null); }} className="w-full text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 transition-colors">Retake the test</button>
        </div>
      )}
      <p className="text-center text-xs text-gray-400 mt-8 px-4">This test is for informational purposes only and does not constitute a clinical diagnosis. If agoraphobia is significantly affecting your life, please speak with a qualified professional.</p>
    </div>
  );
}
