'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Fear of Deep Water', text: 'Do you feel intense fear or dread when thinking about deep ocean water, lakes, or other large bodies of water?' },
  { id: 2, category: 'Fear of Deep Water', text: 'Does looking at images or videos of deep, dark water trigger anxiety or discomfort?' },
  { id: 3, category: 'Fear of Deep Water', text: 'Do you feel frightened by the thought of what might be lurking beneath the surface of deep water?' },
  { id: 4, category: 'Fear of Deep Water', text: 'Does being unable to see the bottom of a body of water make you feel panicked or uneasy?' },
  { id: 5, category: 'Specific Triggers', text: 'Do you feel anxious when swimming in the sea, a lake, or a pool where the water is deep or murky?' },
  { id: 6, category: 'Specific Triggers', text: 'Do underwater images — such as sea creatures, shipwrecks, or vast ocean depths — cause significant anxiety?' },
  { id: 7, category: 'Specific Triggers', text: 'Do you feel uncomfortable or afraid on boats, near cliff edges over water, or when swimming far from shore?' },
  { id: 8, category: 'Physical Response', text: 'When confronted with deep water (or images of it), do you experience physical symptoms such as a racing heart, sweating, dizziness, or nausea?' },
  { id: 9, category: 'Physical Response', text: 'Have you ever had a panic attack related to deep water or thoughts about it?' },
  { id: 10, category: 'Avoidance & Impact', text: 'Do you actively avoid beaches, swimming, water sports, or holidays near large bodies of water because of this fear?' },
  { id: 11, category: 'Avoidance & Impact', text: 'Has your fear of deep water limited activities you would otherwise enjoy, or affected your relationships or travel plans?' },
  { id: 12, category: 'Avoidance & Impact', text: 'Do you recognise that your fear may be out of proportion to the actual danger, but feel unable to control it?' },
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

export default function ThalassophobiaTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const max = questions.length * 4;
    const pct = (total / max) * 100;

    if (pct < 20) {
      setResult({ headline: 'Minimal Thalassophobia Symptoms', body: 'Your responses suggest you have little or no thalassophobia. A slight wariness around deep water is completely natural and even adaptive. If your feelings change or increase, support is available.', severity: 'low' });
    } else if (pct < 50) {
      setResult({ headline: 'Possible Thalassophobia', body: 'Your responses suggest you may have thalassophobia — a fear of deep water — that is causing noticeable anxiety and some avoidance. Hypnotherapy is highly effective for specific phobias like thalassophobia, helping to neutralise the fear response so you can feel comfortable around water again.', severity: 'moderate' });
    } else {
      setResult({ headline: 'Likely Thalassophobia', body: 'Your responses suggest significant thalassophobia that is affecting your daily life, travel, or activities. You are not alone — fear of deep water is one of the most common phobias. Hypnotherapy works directly on the subconscious fear response and often produces life-changing results in just a few sessions.', severity: 'high' });
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
                Find a Phobia Hypnotherapist <ChevronRight style={{ width: 16, height: 16 }} />
              </Link>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>What is Thalassophobia?</h3>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                Thalassophobia is an intense fear of deep bodies of water — including oceans, lakes, and rivers. It often includes fear of what is unseen beneath the surface, the vastness of open water, or the feeling of being submerged. It is distinct from aquaphobia (fear of water in general) and is extremely common. Hypnotherapy addresses the root of the fear at the subconscious level, making it one of the most effective treatments available.
              </p>
            </div>
          )}

          <ShareResult quizName="Thalassophobia Test" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/thalassophobia-test" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the test
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This test is for informational purposes only. If your fear of deep water is significantly affecting your life, please speak with a qualified professional.
      </p>
    </div>
  );
}
