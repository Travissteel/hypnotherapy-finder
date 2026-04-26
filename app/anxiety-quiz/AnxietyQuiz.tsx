'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Worry & Overthinking', text: 'How often do you find yourself worrying excessively about everyday things?' },
  { id: 2, category: 'Worry & Overthinking', text: 'Do you find it difficult to stop or control your worrying?' },
  { id: 3, category: 'Worry & Overthinking', text: 'Do you find yourself imagining worst-case scenarios, even when things are going well?' },
  { id: 4, category: 'Physical Symptoms', text: 'Do you experience physical symptoms of anxiety such as a racing heart, shortness of breath, or chest tightness?' },
  { id: 5, category: 'Physical Symptoms', text: 'Do you suffer from muscle tension, headaches, or stomach problems that seem linked to stress or worry?' },
  { id: 6, category: 'Physical Symptoms', text: 'Do you feel restless, on edge, or physically wound up?' },
  { id: 7, category: 'Daily Life Impact', text: 'Does anxiety make it difficult to concentrate or complete everyday tasks?' },
  { id: 8, category: 'Daily Life Impact', text: 'Do you avoid situations, places, or activities because they make you anxious?' },
  { id: 9, category: 'Daily Life Impact', text: 'Has anxiety affected your work, relationships, or quality of life?' },
  { id: 10, category: 'Sleep & Energy', text: 'Do you have difficulty falling asleep or staying asleep due to anxious thoughts?' },
  { id: 11, category: 'Sleep & Energy', text: 'Do you feel tired or fatigued even after a full night of sleep?' },
  { id: 12, category: 'Emotional Experience', text: 'Do you feel irritable or easily startled more often than you would like?' },
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

export default function AnxietyQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;

  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;
    if (pct < 25) setResult({ headline: 'Minimal Anxiety', body: 'Your responses suggest you are experiencing few anxiety symptoms right now. Everyone feels anxious occasionally — if things change, support is available. Hypnotherapy can also be a great tool for building long-term calm and resilience.', severity: 'low' });
    else if (pct < 55) setResult({ headline: 'Moderate Anxiety', body: 'Your responses suggest you are experiencing a noticeable level of anxiety that may be affecting your daily life. Hypnotherapy is widely used for anxiety — it works by calming the nervous system and helping you respond to triggers differently at a subconscious level.', severity: 'moderate' });
    else setResult({ headline: 'High Anxiety', body: 'Your responses suggest significant anxiety symptoms that are likely impacting your day-to-day wellbeing. You are not alone — anxiety is one of the most common reasons people seek hypnotherapy, and it is highly effective. Connecting with a qualified hypnotherapist could make a real difference.', severity: 'high' });
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
                Find an Anxiety Hypnotherapist <ChevronRight style={{ width: 16, height: 16 }} />
              </Link>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>How Hypnotherapy Helps Anxiety</h3>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                Hypnotherapy for anxiety works by accessing the subconscious mind — where anxious patterns and automatic responses are stored. Techniques like cognitive hypnotherapy, relaxation induction, and suggestion therapy can help retrain your nervous system to respond to triggers with calm rather than panic.
              </p>
            </div>
          )}

          <ShareResult quizName="Anxiety Quiz" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/anxiety-quiz" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the quiz
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This quiz is for informational purposes only and does not constitute a clinical diagnosis. If anxiety is significantly affecting your life, please speak with a qualified healthcare professional.
      </p>
    </div>
  );
}
