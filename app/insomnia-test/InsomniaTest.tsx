'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Falling & Staying Asleep', text: 'Do you have difficulty falling asleep at night, even when you feel tired?' },
  { id: 2, category: 'Falling & Staying Asleep', text: 'Do you wake up in the middle of the night and struggle to get back to sleep?' },
  { id: 3, category: 'Falling & Staying Asleep', text: 'Do you wake up earlier than you would like and find yourself unable to fall back asleep?' },
  { id: 4, category: 'Sleep Quality', text: 'Do you feel unrefreshed or still tired after a full night of sleep?' },
  { id: 5, category: 'Sleep Quality', text: 'Do you experience light or broken sleep rather than deep, restorative rest?' },
  { id: 6, category: 'Thoughts & Anxiety at Bedtime', text: 'Do you experience racing thoughts, worry, or mental activity that keeps you awake at night?' },
  { id: 7, category: 'Thoughts & Anxiety at Bedtime', text: 'Do you feel anxious or dread going to bed because you expect to struggle to sleep?' },
  { id: 8, category: 'Thoughts & Anxiety at Bedtime', text: 'Do you watch the clock, calculate how many hours of sleep you have left, or feel frustrated when you cannot sleep?' },
  { id: 9, category: 'Daytime Impact', text: 'Do you feel fatigued, drowsy, or low on energy during the day due to poor sleep?' },
  { id: 10, category: 'Daytime Impact', text: 'Has poor sleep affected your concentration, memory, or ability to perform at work or in daily tasks?' },
  { id: 11, category: 'Daytime Impact', text: 'Has poor sleep affected your mood, making you more irritable, anxious, or low?' },
  { id: 12, category: 'Duration & Pattern', text: 'Have you been experiencing sleep problems for more than a month?' },
  { id: 13, category: 'Duration & Pattern', text: 'Do your sleep problems occur most nights, rather than occasionally?' },
];

const options = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Always', value: 4 },
];

type Result = { headline: string; body: string; severity: 'low' | 'moderate' | 'high' };

const severityBorderColor = { low: 'oklch(0.7 0.15 145)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.65 0.2 20)' };
const severityTextColor = { low: 'oklch(0.7 0.15 145)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.65 0.2 20)' };

const SeverityIcon = ({ s }: { s: string }) => {
  if (s === 'low') return <CheckCircle style={{ width: 28, height: 28, color: severityTextColor.low, flexShrink: 0 }} />;
  if (s === 'moderate') return <Activity style={{ width: 28, height: 28, color: severityTextColor.moderate, flexShrink: 0 }} />;
  return <AlertTriangle style={{ width: 28, height: 28, color: severityTextColor.high, flexShrink: 0 }} />;
};

export default function InsomniaTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 22) {
      setResult({ headline: 'No Significant Insomnia', body: 'Your responses suggest you are not currently experiencing significant insomnia. Everyone has the occasional poor night — this is normal. If your sleep worsens, hypnotherapy is one of the most effective tools for improving sleep quality.', severity: 'low' });
    } else if (pct < 52) {
      setResult({ headline: 'Moderate Insomnia', body: 'Your responses suggest you are experiencing moderate insomnia that is affecting your sleep quality and daytime functioning. Hypnotherapy is highly effective for insomnia — it works by calming the nervous system, quieting bedtime anxiety, and retraining your subconscious to associate bed with deep, restful sleep.', severity: 'moderate' });
    } else {
      setResult({ headline: 'Severe Insomnia', body: 'Your responses suggest significant, chronic insomnia that is likely having a serious impact on your health, mood, and daily life. Chronic sleep deprivation is serious — please seek support. Hypnotherapy has strong evidence for treating insomnia and can help break the cycle of sleeplessness, anxiety, and exhaustion.', severity: 'high' });
    }
  };

  const categories = [...new Set(questions.map((q) => q.category))];

  const optBtnStyle = (selected: boolean): React.CSSProperties => ({
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    padding: '10px 4px', borderRadius: 12, border: `2px solid ${selected ? 'var(--hf-accent)' : 'rgba(255,255,255,0.08)'}`,
    background: selected ? 'oklch(0.72 0.12 185 / 0.2)' : 'rgba(255,255,255,0.03)',
    color: selected ? 'var(--hf-fg)' : 'var(--hf-fg-dim)', fontSize: 11, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
  });

  return (
    <div style={{ maxWidth: 672, margin: '0 auto', padding: '48px 16px' }}>
      {!result ? (
        <div style={{ background: 'var(--hf-bg-mid)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '32px' }}>
          <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', fontWeight: 500 }}>{answered} of {questions.length} answered</p>
            <div style={{ width: 180, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 9999, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--hf-accent)', borderRadius: 9999, width: `${(answered / questions.length) * 100}%`, transition: 'width 0.3s' }} />
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat} style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 20 }}>{cat}</h2>
              {questions.filter((q) => q.category === cat).map((q) => (
                <div key={q.id} style={{ marginBottom: 28 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 12, lineHeight: 1.5 }}>{q.text}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                    {options.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setAnswer(q.id, opt.value)} style={optBtnStyle(answers[q.id] === opt.value)}>
                        <span style={{ fontSize: 15, fontWeight: 700 }}>{opt.value}</span>
                        <span style={{ textAlign: 'center', lineHeight: 1.2, display: 'none' }} className="sm:block">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--hf-fg-dim)', marginTop: 4, padding: '0 2px' }}>
                    <span>Never</span><span>Always</span>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <button type="button" onClick={calculate} disabled={!allAnswered} className={allAnswered ? 'btn-gradient hf-btn-accent' : ''} style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', color: allAnswered ? '#fff' : 'var(--hf-fg-dim)', background: allAnswered ? undefined : 'rgba(255,255,255,0.05)', fontWeight: 700, fontSize: 16, cursor: allAnswered ? 'pointer' : 'not-allowed', opacity: allAnswered ? 1 : 0.5 }}>
            {allAnswered ? 'See My Results' : `Answer all questions to continue (${questions.length - answered} remaining)`}
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="glass-card" style={{ padding: 32, borderLeft: `4px solid ${severityBorderColor[result.severity]}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
              <SeverityIcon s={result.severity} />
              <h2 style={{ fontSize: 24, fontWeight: 800, color: severityTextColor[result.severity], lineHeight: 1.2 }}>{result.headline}</h2>
            </div>
            <p style={{ color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 20 }}>{result.body}</p>
            {result.severity !== 'low' && (
              <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Find a Sleep Hypnotherapist <ChevronRight style={{ width: 16, height: 16 }} />
              </Link>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>How Hypnotherapy Helps Insomnia</h3>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                Insomnia is often driven by an overactive mind and a conditioned anxiety around sleep — your brain learns to associate bed with wakefulness and worry rather than rest. Hypnotherapy works by deeply relaxing the nervous system, quieting anxious thought patterns, and using suggestion to retrain your subconscious to welcome and sustain deep sleep. Many people experience significant improvement within just a few sessions.
              </p>
            </div>
          )}

          <ShareResult quizName="Insomnia Test" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/insomnia-test" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the test
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This test is for informational purposes only. If sleep problems are severely affecting your health, please speak with a qualified healthcare professional.
      </p>
    </div>
  );
}
