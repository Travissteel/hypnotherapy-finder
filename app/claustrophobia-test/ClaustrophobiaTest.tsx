'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Enclosed Spaces', text: 'Do you feel intense anxiety or panic in small, enclosed spaces such as lifts, cupboards, or small rooms?' },
  { id: 2, category: 'Enclosed Spaces', text: 'Do you feel anxious in spaces with low ceilings or rooms without windows?' },
  { id: 3, category: 'Enclosed Spaces', text: 'Do you feel anxious in MRI machines, scanning equipment, or other confined medical environments?' },
  { id: 4, category: 'Feeling Trapped', text: 'Do you feel intense discomfort when you cannot easily reach an exit or feel that you could be trapped?' },
  { id: 5, category: 'Feeling Trapped', text: 'Do you feel anxious in crowded places such as packed trains, lifts, or busy corridors where movement is restricted?' },
  { id: 6, category: 'Feeling Trapped', text: 'Do you avoid middle seats on planes, trains, or in theatres because you feel trapped between people?' },
  { id: 7, category: 'Physical Response', text: 'When in enclosed spaces, do you experience a racing heart, shortness of breath, sweating, or dizziness?' },
  { id: 8, category: 'Physical Response', text: 'Do you feel an overwhelming urge to escape or get out of enclosed situations as quickly as possible?' },
  { id: 9, category: 'Avoidance & Impact', text: 'Do you avoid lifts, tunnels, underground trains, or small rooms in your daily life because of this fear?' },
  { id: 10, category: 'Avoidance & Impact', text: 'Has your fear of enclosed spaces affected your travel plans, career, or daily routine?' },
  { id: 11, category: 'Avoidance & Impact', text: 'Do you prefer to take stairs, wait for a less crowded lift, or walk longer routes to avoid enclosed spaces?' },
];

const options = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Always', value: 4 },
];

type Result = { headline: string; body: string; severity: 'low' | 'moderate' | 'high' };

export default function ClaustrophobiaTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 22) {
      setResult({ headline: 'Minimal Claustrophobia Symptoms', body: 'Your responses suggest little or no claustrophobia. Mild discomfort in very tight spaces is normal. If this changes, hypnotherapy is one of the most effective treatments for claustrophobia.', severity: 'low' });
    } else if (pct < 52) {
      setResult({ headline: 'Possible Claustrophobia', body: 'Your responses suggest you may have claustrophobia that is causing noticeable anxiety and avoidance. Hypnotherapy is highly effective for this — directly targeting the fear response your mind has learned to associate with enclosed spaces.', severity: 'moderate' });
    } else {
      setResult({ headline: 'Significant Claustrophobia', body: 'Your responses suggest significant claustrophobia that is affecting your daily life. Whether it impacts your work, travel, or medical care, claustrophobia is very treatable. Hypnotherapy can help neutralise the fear response, often with lasting results in just a few sessions.', severity: 'high' });
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
              <div className="h-full bg-gradient-to-r from-slate-500 to-gray-600 rounded-full transition-all duration-300" style={{ width: `${(answered / questions.length) * 100}%` }} />
            </div>
          </div>
          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-5">{cat}</h2>
              {questions.filter((q) => q.category === cat).map((q) => (
                <div key={q.id} className="mb-8">
                  <p className="text-gray-800 font-semibold mb-3 leading-relaxed">{q.text}</p>
                  <div className="grid grid-cols-5 gap-2">
                    {options.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setAnswer(q.id, opt.value)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 text-xs font-medium transition-all ${answers[q.id] === opt.value ? 'bg-slate-600 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-slate-400'}`}>
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
            className="w-full bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed">
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
              <Button asChild className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">Find a Phobia Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" /></Link>
              </Button>
            )}
          </div>
          {result.severity !== 'low' && (
            <div className="bg-slate-50 border-2 border-slate-200 p-6 rounded-2xl">
              <h3 className="font-bold text-slate-800 mb-2">How Hypnotherapy Helps Claustrophobia</h3>
              <p className="text-slate-700 text-sm leading-relaxed">Claustrophobia is a learned fear response — your subconscious has associated small spaces with danger. Hypnotherapy works at this subconscious level using techniques like the Rewind Technique and systematic desensitisation to deactivate the fear trigger. Many people find they can comfortably use lifts, undergo MRI scans, or travel on the underground after just a few sessions.</p>
            </div>
          )}
          <ShareResult quizName="Claustrophobia Test" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/claustrophobia-test" />

          <button onClick={() => { setAnswers({}); setResult(null); }} className="w-full text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 transition-colors">Retake the test</button>
        </div>
      )}
      <p className="text-center text-xs text-gray-400 mt-8 px-4">This test is for informational purposes only. If claustrophobia is affecting your daily life, please speak with a qualified professional.</p>
    </div>
  );
}
