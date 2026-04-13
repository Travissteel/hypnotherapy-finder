'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const phobias = [
  { id: 'spiders', label: 'Spiders or insects', name: 'Arachnophobia / Entomophobia' },
  { id: 'heights', label: 'Heights', name: 'Acrophobia' },
  { id: 'flying', label: 'Flying', name: 'Aviophobia' },
  { id: 'enclosed', label: 'Enclosed or small spaces', name: 'Claustrophobia' },
  { id: 'openspaces', label: 'Open spaces or crowds', name: 'Agoraphobia' },
  { id: 'social', label: 'Social situations / being judged', name: 'Social Phobia' },
  { id: 'blood', label: 'Blood, needles, or medical procedures', name: 'Haematophobia / Trypanophobia' },
  { id: 'vomiting', label: 'Vomiting or being sick', name: 'Emetophobia' },
  { id: 'deepwater', label: 'Deep water or the ocean', name: 'Thalassophobia' },
  { id: 'darkness', label: 'The dark or being alone at night', name: 'Nyctophobia' },
  { id: 'dogs', label: 'Dogs or other animals', name: 'Cynophobia / Zoophobia' },
  { id: 'storms', label: 'Storms, thunder or lightning', name: 'Astraphobia' },
  { id: 'driving', label: 'Driving or being a passenger in a vehicle', name: 'Amaxophobia' },
  { id: 'dentist', label: 'The dentist or dental procedures', name: 'Dentophobia' },
  { id: 'death', label: 'Death or dying', name: 'Thanatophobia' },
  { id: 'choking', label: 'Choking or swallowing', name: 'Phagophobia' },
];

const impactQuestions = [
  { id: 'avoid', text: 'Do you go out of your way to avoid situations, places, or things related to your fear?' },
  { id: 'anticipate', text: 'Do you feel intense anxiety just thinking about or anticipating your fear trigger?' },
  { id: 'physical', text: 'When exposed to your fear, do you experience physical symptoms like racing heart, sweating, shaking, or difficulty breathing?' },
  { id: 'disproportionate', text: 'Do you recognise that your fear is excessive or out of proportion, but feel unable to control it?' },
  { id: 'limit', text: 'Does your fear significantly limit your daily life, work, travel, or relationships?' },
];

const impactOptions = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Always', value: 4 },
];

type Stage = 'phobias' | 'impact' | 'result';

type Result = {
  headline: string;
  body: string;
  severity: 'low' | 'moderate' | 'high';
  identified: string[];
};

export default function PhobiaTest() {
  const [stage, setStage] = useState<Stage>('phobias');
  const [selectedPhobias, setSelectedPhobias] = useState<string[]>([]);
  const [impactAnswers, setImpactAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const togglePhobia = (id: string) => {
    setSelectedPhobias((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const setImpact = (id: string, value: number) => {
    setImpactAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const allImpactAnswered = Object.keys(impactAnswers).length === impactQuestions.length;

  const calculate = () => {
    const impactTotal = Object.values(impactAnswers).reduce((sum, v) => sum + v, 0);
    const impactMax = impactQuestions.length * 4; // 20
    const impactPct = (impactTotal / impactMax) * 100;

    const identified = selectedPhobias.map(
      (id) => phobias.find((p) => p.id === id)?.name ?? id
    );

    if (selectedPhobias.length === 0 || impactPct < 25) {
      setResult({
        headline: 'No Significant Phobia Detected',
        body: 'Your responses suggest you are not experiencing a clinical phobia right now. Many people have fears — the key difference with a phobia is that it causes significant distress and avoidance. If things change, hypnotherapy is one of the most effective treatments for phobias.',
        severity: 'low',
        identified,
      });
    } else if (impactPct < 60) {
      setResult({
        headline: 'Possible Phobia — Moderate Impact',
        body: `Your responses suggest you may have a phobia that is causing noticeable distress and avoidance. Hypnotherapy is widely considered one of the most effective treatments for specific phobias — often producing lasting results in just a few sessions.`,
        severity: 'moderate',
        identified,
      });
    } else {
      setResult({
        headline: 'Likely Phobia — Significant Impact',
        body: `Your responses suggest a phobia that is significantly affecting your life. The good news: specific phobias have some of the highest treatment success rates of any anxiety condition. Hypnotherapy works by neutralising the fear response at the subconscious level — many people experience major relief within 1–3 sessions.`,
        severity: 'high',
        identified,
      });
    }
    setStage('result');
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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      {stage === 'phobias' && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Step 1 of 2 — Select Your Fears</h2>
          <p className="text-gray-600 mb-8">Select all situations, objects, or experiences that cause you significant fear or anxiety. You can select more than one.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {phobias.map((p) => {
              const selected = selectedPhobias.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => togglePhobia(p.id)}
                  className={`text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                    selected
                      ? 'bg-violet-600 border-violet-600 text-white'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-violet-300'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          <Button
            type="button"
            onClick={() => setStage('impact')}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all"
          >
            Next: Rate the Impact →
          </Button>
          <p className="text-center text-sm text-gray-400 mt-3">You can also continue with none selected</p>
        </div>
      )}

      {stage === 'impact' && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Step 2 of 2 — Rate the Impact</h2>
          <p className="text-gray-600 mb-8">Answer these questions about how your fear{selectedPhobias.length > 0 ? 's affect' : ' affects'} your life.</p>

          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium">{Object.keys(impactAnswers).length} of {impactQuestions.length} answered</p>
            <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${(Object.keys(impactAnswers).length / impactQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {impactQuestions.map((q) => (
            <div key={q.id} className="mb-8">
              <p className="text-gray-800 font-semibold mb-3 leading-relaxed">{q.text}</p>
              <div className="grid grid-cols-5 gap-2">
                {impactOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setImpact(q.id, opt.value)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 text-xs font-medium transition-all ${
                      impactAnswers[q.id] === opt.value
                        ? 'bg-violet-600 border-violet-600 text-white'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-violet-300'
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

          <Button
            type="button"
            onClick={calculate}
            disabled={!allImpactAnswered}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {allImpactAnswered ? 'See My Results' : `Answer all questions to continue (${impactQuestions.length - Object.keys(impactAnswers).length} remaining)`}
          </Button>
        </div>
      )}

      {stage === 'result' && result && (
        <div className="space-y-6">
          <div className={`p-8 rounded-3xl border-2 shadow-xl ${bg(result.severity)}`}>
            <div className="flex items-start gap-4 mb-4">
              {icon(result.severity)}
              <h2 className={`text-2xl font-extrabold leading-tight ${color(result.severity)}`}>
                {result.headline}
              </h2>
            </div>

            {result.identified.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {result.identified.map((name) => (
                  <span key={name} className="bg-white/70 border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-700 leading-relaxed mb-6">{result.body}</p>
            {result.severity !== 'low' && (
              <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">
                <Link href="/search">
                  Find a Phobia Hypnotherapist <ChevronRight className="h-4 w-4 ml-1 inline" />
                </Link>
              </Button>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="bg-violet-50 border-2 border-violet-100 p-6 rounded-2xl">
              <h3 className="font-bold text-violet-800 mb-2">Why Hypnotherapy Works So Well for Phobias</h3>
              <p className="text-violet-900 text-sm leading-relaxed">
                Phobias are learned fear responses stored in the subconscious mind — which is exactly where hypnotherapy works. Techniques like the Rewind Technique, systematic desensitisation under hypnosis, and NLP-based approaches can rapidly neutralise the fear response. Many people experience dramatic improvement in as few as 1–3 sessions, making phobia treatment one of hypnotherapy's greatest strengths.
              </p>
            </div>
          )}

          <button
            onClick={() => { setStage('phobias'); setSelectedPhobias([]); setImpactAnswers({}); setResult(null); }}
            className="w-full text-gray-500 hover:text-gray-700 text-sm underline underline-offset-2 transition-colors"
          >
            Retake the test
          </button>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-8 px-4">
        This test is for informational purposes only and does not constitute a clinical diagnosis. If a phobia is significantly affecting your life, please speak with a qualified healthcare professional.
      </p>
    </div>
  );
}
