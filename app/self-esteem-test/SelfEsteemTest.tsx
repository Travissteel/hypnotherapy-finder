'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Self-Worth', text: 'Do you generally feel that you are a person of worth — equal to others?' },
  { id: 2, category: 'Self-Worth', text: 'Do you feel fundamentally good about yourself as a person, separate from your achievements or how others see you?' },
  { id: 3, category: 'Self-Worth', text: 'Do you feel that you deserve good things — love, success, happiness — in your life?' },
  { id: 4, category: 'Self-Criticism', text: 'Do you frequently criticise yourself harshly — in a way you would never speak to a friend?' },
  { id: 5, category: 'Self-Criticism', text: 'When you make a mistake, do you dwell on it and feel deeply ashamed or inadequate?' },
  { id: 6, category: 'Self-Criticism', text: 'Do you focus mainly on your flaws and weaknesses, while dismissing your strengths and achievements?' },
  { id: 7, category: 'Confidence & Assertiveness', text: 'Do you feel confident expressing your opinions, needs, or feelings — even when others might disagree?' },
  { id: 8, category: 'Confidence & Assertiveness', text: 'Do you feel comfortable setting boundaries and saying no without excessive guilt?' },
  { id: 9, category: 'Confidence & Assertiveness', text: 'Do you trust your own judgement and decisions, rather than constantly seeking external validation?' },
  { id: 10, category: 'Comparison & Shame', text: 'Do you frequently compare yourself unfavourably to others and come out feeling lesser or inadequate?' },
  { id: 11, category: 'Comparison & Shame', text: 'Do you feel a deep sense of shame about who you are — not just what you have done, but who you are as a person?' },
  { id: 12, category: 'Daily Life Impact', text: 'Has low self-esteem held you back from opportunities, relationships, or goals you would have otherwise pursued?' },
];

// Q1-3 and Q7-9 are positively worded — higher = better self-esteem, so we invert them
const INVERTED = new Set([1, 2, 3, 7, 8, 9]);

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

export default function SelfEsteemTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.entries(answers).reduce((sum, [id, v]) => {
      return sum + (INVERTED.has(Number(id)) ? 4 - v : v);
    }, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 25) {
      setResult({ headline: 'Healthy Self-Esteem', body: 'Your responses suggest you have a generally healthy level of self-esteem. You appear to have a stable sense of your own worth and are able to handle setbacks without excessive self-criticism. Keep nurturing this — hypnotherapy can be a great tool for deepening self-compassion and resilience.', severity: 'low' });
    } else if (pct < 55) {
      setResult({ headline: 'Moderate Low Self-Esteem', body: 'Your responses suggest you are experiencing low self-esteem that is affecting your confidence, relationships, or opportunities. Low self-esteem is often rooted in early experiences and deeply held subconscious beliefs about your worth. Hypnotherapy works directly at this level — helping to replace negative core beliefs with a genuine, stable sense of self-worth.', severity: 'moderate' });
    } else {
      setResult({ headline: 'Significant Low Self-Esteem', body: 'Your responses suggest significant low self-esteem that is likely having a major impact on your life, relationships, and potential. Please know — low self-esteem is not the truth about you, it is a learned pattern. Hypnotherapy is one of the most effective approaches for rebuilding self-esteem at its roots, creating change that feels authentic and lasting.', severity: 'high' });
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
                Find a Hypnotherapist <ChevronRight style={{ width: 16, height: 16 }} />
              </Link>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>How Hypnotherapy Builds Self-Esteem</h3>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                Low self-esteem is almost always rooted in deeply held subconscious beliefs formed in childhood — "I am not enough", "I am unlovable", "I must earn my worth." Hypnotherapy accesses these beliefs directly, gently updating them at the source. Techniques such as inner child work, ego strengthening, and positive suggestion create a genuine shift in how you see yourself — not a superficial affirmation, but a real change in your core sense of worth.
              </p>
            </div>
          )}

          <ShareResult quizName="Self-Esteem Test" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/self-esteem-test" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the test
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This test is for informational purposes only and is not a clinical assessment.
      </p>
    </div>
  );
}
