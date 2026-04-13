'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  {
    id: 1,
    category: 'Emotional Exhaustion',
    text: 'Do you feel emotionally exhausted by your caregiving responsibilities?',
  },
  {
    id: 2,
    category: 'Emotional Exhaustion',
    text: 'Do you feel resentful, frustrated, or angry about your caregiving role — even if you feel guilty for feeling that way?',
  },
  {
    id: 3,
    category: 'Emotional Exhaustion',
    text: 'Do you feel sad, hopeless, or like there is no end in sight?',
  },
  {
    id: 4,
    category: 'Neglecting Yourself',
    text: 'Do you neglect your own health, social life, or personal needs because of caregiving demands?',
  },
  {
    id: 5,
    category: 'Neglecting Yourself',
    text: 'Do you feel guilty when you take time for yourself, or feel like you should always be doing more?',
  },
  {
    id: 6,
    category: 'Neglecting Yourself',
    text: 'Have you stopped doing activities you used to enjoy because caregiving takes up all your time or energy?',
  },
  {
    id: 7,
    category: 'Isolation',
    text: 'Do you feel isolated or alone in your caregiving role — like others do not understand what you are going through?',
  },
  {
    id: 8,
    category: 'Isolation',
    text: 'Have your relationships with friends or family suffered because of the demands of caregiving?',
  },
  {
    id: 9,
    category: 'Physical Impact',
    text: 'Has caregiving affected your sleep, diet, or physical health?',
  },
  {
    id: 10,
    category: 'Physical Impact',
    text: 'Do you feel physically run down, frequently ill, or lacking energy even when you get rest?',
  },
  {
    id: 11,
    category: 'Feeling Trapped',
    text: 'Do you feel trapped in your caregiving role with no realistic way out or relief?',
  },
  {
    id: 12,
    category: 'Feeling Trapped',
    text: 'Do you sometimes have thoughts of walking away from your caregiving responsibilities, then feel tremendous guilt about it?',
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

export default function CaregiverBurnoutQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;

  const setAnswer = (id: number, value: number) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 25) {
      setResult({
        headline: 'Low Caregiver Burnout Risk',
        body: 'Your responses suggest you are currently managing your caregiving role without significant burnout. Caregiving is demanding work — keep prioritising your own needs and watch for early warning signs. Hypnotherapy can help build the resilience and inner calm that sustains long-term caregivers.',
        severity: 'low',
      });
    } else if (pct < 55) {
      setResult({
        headline: 'Moderate Caregiver Burnout',
        body: 'Your responses suggest you are experiencing significant caregiver burnout. This is extremely common among caregivers — and it is not a sign of weakness or failure. You cannot pour from an empty cup. Hypnotherapy can help you process the emotional weight of caregiving, reduce guilt, and rebuild your own sense of identity and wellbeing.',
        severity: 'moderate',
      });
    } else {
      setResult({
        headline: 'Severe Caregiver Burnout',
        body: 'Your responses suggest severe caregiver burnout. What you are experiencing is real, serious, and completely understandable given the demands you are under. Please reach out for support — for yourself as much as for the person you care for. Hypnotherapy can offer a compassionate space to process guilt, grief, resentment, and exhaustion.',
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
              <div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-300" style={{ width: `${(answered / questions.length) * 100}%` }} />
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-5">{cat}</h2>
              {questions.filter((q) => q.category === cat).map((q) => (
                <div key={q.id} className="mb-8">
                  <p className="text-gray-800 font-semibold mb-3 leading-relaxed">{q.text}</p>
                  <div className="grid grid-cols-5 gap-2">
                    {options.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setAnswer(q.id, opt.value)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 text-xs font-medium transition-all ${answers[q.id] === opt.value ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-rose-300'}`}>
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
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed">
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
              <Button asChild className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">Find a Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" /></Link>
              </Button>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="bg-rose-50 border-2 border-rose-100 p-6 rounded-2xl">
              <h3 className="font-bold text-rose-800 mb-2">You Deserve Support Too</h3>
              <p className="text-rose-900 text-sm leading-relaxed">
                Caregiver burnout is one of the most under-recognised forms of exhaustion. The guilt, grief, love, and resentment that come with caring for a loved one are complex and often go unspoken. Hypnotherapy offers a non-judgmental space to process these feelings, release guilt, and reconnect with your own needs — so you can continue caring for others without destroying yourself in the process.
              </p>
            </div>
          )}

          <ShareResult quizName="Caregiver Burnout Quiz" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/caregiver-burnout-quiz" />

          <button onClick={() => { setAnswers({}); setResult(null); }}
            className="w-full text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 transition-colors">
            Retake the quiz
          </button>
        </div>
      )}
      <p className="text-center text-xs text-gray-400 mt-8 px-4">
        This quiz is for informational purposes only. If you are in crisis or feeling overwhelmed, please reach out to a healthcare professional or caregiver support service.
      </p>
    </div>
  );
}
