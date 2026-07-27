'use client';
import { ShareResult } from '@/components/quiz/ShareResult';
import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Emotional Waves', text: 'How often do grief waves feel overwhelming, sudden, or hard to settle after they arrive?' },
  { id: 2, category: 'Emotional Waves', text: 'How often do sadness, anger, numbness, guilt, or longing feel difficult to make room for?' },
  { id: 3, category: 'Sleep & Body', text: 'How often has grief affected your sleep, appetite, energy, breathing, or physical tension?' },
  { id: 4, category: 'Sleep & Body', text: 'How often do certain times of day, dates, rooms, objects, songs, smells, or routines trigger a strong body response?' },
  { id: 5, category: 'Guilt & Rumination', text: 'How often do you replay what happened, what was said, what was not said, or what you wish had been different?' },
  { id: 6, category: 'Guilt & Rumination', text: 'How often do you feel caught between wanting relief and feeling guilty for wanting life to feel lighter?' },
  { id: 7, category: 'Connection', text: 'How often do you withdraw from people, avoid messages, or feel that others do not understand your grief?' },
  { id: 8, category: 'Connection', text: 'How often do you feel pressure to be “better”, “over it”, or more functional than you actually feel?' },
  { id: 9, category: 'Daily Functioning', text: 'How often does grief make work, family responsibilities, decisions, appointments, or daily routines harder to manage?' },
  { id: 10, category: 'Daily Functioning', text: 'How much do reminders of the loss shape where you go, what you avoid, or how safe daily life feels?' },
];

const options = [
  { label: 'Not at all', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Most days', value: 4 },
];

type Result = { headline: string; body: string; severity: 'low' | 'moderate' | 'high' };
const severityBorderColor = { low: 'oklch(0.7 0.15 145)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.65 0.2 20)' };
const severityTextColor = { low: 'oklch(0.7 0.15 145)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.65 0.2 20)' };

const SeverityIcon = ({ s }: { s: string }) => {
  if (s === 'low') return <CheckCircle style={{ width: 28, height: 28, color: severityTextColor.low, flexShrink: 0 }} />;
  if (s === 'moderate') return <Activity style={{ width: 28, height: 28, color: severityTextColor.moderate, flexShrink: 0 }} />;
  return <AlertTriangle style={{ width: 28, height: 28, color: severityTextColor.high, flexShrink: 0 }} />;
};

export default function GriefQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 25) {
      setResult({ headline: 'Lower Current Support Need', body: 'Your answers suggest grief is present, but the patterns selected may not be heavily disrupting daily life right now. That does not make the loss small. Support can still be useful, especially around sleep, anniversaries, reminders, or moments when grief suddenly gets louder.', severity: 'low' });
    } else if (pct < 55) {
      setResult({ headline: 'Moderate Grief Support Need', body: 'Your answers suggest grief may be affecting sleep, routines, connection, guilt, or emotional regulation. Hypnotherapy may support some people by creating a calmer state for triggers, imagery, memory cues, and self-compassion. It should be used as a complement to appropriate grief support, not a way to force yourself to move on.', severity: 'moderate' });
    } else {
      setResult({ headline: 'High Grief Support Need', body: 'Your answers suggest grief may be significantly affecting daily life, safety, connection, or functioning. Please consider speaking with a qualified healthcare provider, grief counsellor, or mental health professional, especially if the loss was traumatic or things feel unmanageable. Hypnotherapy may support sleep, triggers, and emotional flooding, but urgent risk needs appropriate care first.', severity: 'high' });
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
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '48px 16px' }}>
      {!result ? (
        <div style={{ background: 'var(--hf-bg-mid)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '32px' }}>
          <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
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
                    <span>Not at all</span><span>Most days</span>
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Link href="/find-a-hypnotherapist" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Find a Hypnotherapist <ChevronRight style={{ width: 16, height: 16 }} />
              </Link>
              <Link href="/blog/hypnotherapy-for-grief-guide" className="glass hf-glass-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Read the Grief Guide
              </Link>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
            <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>How Hypnotherapy May Support Grief</h3>
            <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
              Grief-focused hypnotherapy should not promise to remove grief or make someone “move on”. Responsible work may support sleep, emotional flooding, guilt, trigger responses, anniversary preparation, and calmer contact with memories. Hypnotherapy is a complementary approach. If you&apos;re experiencing significant symptoms, please consult a qualified healthcare provider.
            </p>
          </div>

          <ShareResult quizName="Grief Quiz" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/grief-quiz" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the quiz
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This quiz is for informational purposes only and does not constitute a diagnosis. If grief feels unbearable, if you feel unsafe, or if you are at risk of self-harm, contact a qualified healthcare provider or urgent crisis support.
      </p>
    </div>
  );
}
