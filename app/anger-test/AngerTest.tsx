'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Frequency & Intensity', text: 'How often do you experience anger or irritability in a typical week?' },
  { id: 2, category: 'Frequency & Intensity', text: 'When you get angry, how intense does it typically feel — does it feel out of proportion to the situation?' },
  { id: 3, category: 'Frequency & Intensity', text: 'Do small frustrations or minor inconveniences trigger a strong angry reaction in you?' },
  { id: 4, category: 'Duration & Rumination', text: 'Once you are angry, does the feeling linger for hours or even days rather than passing quickly?' },
  { id: 5, category: 'Duration & Rumination', text: 'Do you replay situations that made you angry, re-experiencing the feelings repeatedly in your mind?' },
  { id: 6, category: 'Duration & Rumination', text: 'Do you hold onto grudges or find it difficult to let go of things that have angered you?' },
  { id: 7, category: 'How You Express Anger', text: 'Do you express anger in ways you later regret — such as shouting, saying hurtful things, or aggressive behaviour?' },
  { id: 8, category: 'How You Express Anger', text: 'Have others commented on or expressed concern about your temper or angry outbursts?' },
  { id: 9, category: 'How You Express Anger', text: 'Do you suppress your anger — keeping it inside — which then builds up until you eventually explode?' },
  { id: 10, category: 'Hostility & Cynicism', text: 'Do you often feel that people are deliberately trying to annoy, disrespect, or take advantage of you?' },
  { id: 11, category: 'Hostility & Cynicism', text: 'Do you frequently feel a sense of injustice — that things are unfair, or that you are treated worse than others?' },
  { id: 12, category: 'Physical Response', text: 'When angry, do you experience strong physical symptoms such as a racing heart, flushed face, muscle tension, or shaking?' },
  { id: 13, category: 'Impact on Your Life', text: 'Has your anger caused problems in your relationships, at work, or in other areas of your life?' },
  { id: 14, category: 'Impact on Your Life', text: 'Do you feel that your anger is out of your control, or that you struggle to manage it effectively?' },
];

const options = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Always', value: 4 },
];

type Result = { headline: string; body: string; severity: 'low' | 'moderate' | 'high'; suppresser: boolean };

const severityBorderColor = { low: 'oklch(0.7 0.15 145)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.65 0.2 20)' };
const severityTextColor = { low: 'oklch(0.7 0.15 145)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.65 0.2 20)' };

const SeverityIcon = ({ s }: { s: string }) => {
  if (s === 'low') return <CheckCircle style={{ width: 28, height: 28, color: severityTextColor.low, flexShrink: 0 }} />;
  if (s === 'moderate') return <Activity style={{ width: 28, height: 28, color: severityTextColor.moderate, flexShrink: 0 }} />;
  return <AlertTriangle style={{ width: 28, height: 28, color: severityTextColor.high, flexShrink: 0 }} />;
};

export default function AngerTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;
    const suppresser = (answers[9] ?? 0) >= 3 && ((answers[7] ?? 0) + (answers[8] ?? 0)) <= 2;

    if (pct < 22) {
      setResult({ headline: 'Anger Is Well Managed', body: 'Your responses suggest you manage anger well. Everyone experiences anger — it is a natural emotion. You appear to have healthy ways of processing and expressing it. Hypnotherapy can be a great tool for maintaining emotional resilience.', severity: 'low', suppresser: false });
    } else if (pct < 52) {
      setResult({
        headline: suppresser ? 'Moderate Anger — Suppression Pattern' : 'Moderate Anger Issues',
        body: suppresser
          ? 'Your responses suggest you tend to suppress anger rather than express it — which can lead to build-up, resentment, and eventual blow-ups. Hypnotherapy can help you process anger safely and develop healthy ways to communicate it before it accumulates.'
          : 'Your responses suggest you experience anger issues that are affecting your relationships or daily life. Hypnotherapy is highly effective for anger management — working at the subconscious level to identify triggers, reduce reactivity, and build calmer, more considered responses.',
        severity: 'moderate', suppresser,
      });
    } else {
      setResult({
        headline: suppresser ? 'Significant Anger — Suppression Pattern' : 'Significant Anger Issues',
        body: suppresser
          ? 'Your responses suggest significant suppressed anger that is likely having a serious impact on your health and relationships. Chronic anger suppression is linked to anxiety, depression, and physical health problems. Hypnotherapy offers a safe space to process and release anger constructively.'
          : 'Your responses suggest significant anger issues that are likely causing real harm to your relationships, work, and wellbeing. Anger at this level is often rooted in deeper experiences — past hurt, unmet needs, or learned responses. Hypnotherapy addresses these roots directly, creating lasting change rather than surface-level coping.',
        severity: 'high', suppresser,
      });
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
                Find an Anger Management Hypnotherapist <ChevronRight style={{ width: 16, height: 16 }} />
              </Link>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>How Hypnotherapy Helps Anger Issues</h3>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                Anger issues are rarely just about anger — they are often rooted in deeper feelings of hurt, fear, shame, or unmet needs. Hypnotherapy works at the subconscious level to identify and heal these roots, reduce the intensity of triggers, and install calmer automatic responses. Unlike surface-level coping strategies, hypnotherapy creates change that feels natural and lasting — not forced.
              </p>
            </div>
          )}

          <ShareResult quizName="Anger Test" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/anger-test" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the test
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This test is for informational purposes only. If anger is causing harm to you or others, please seek support from a qualified professional.
      </p>
    </div>
  );
}
