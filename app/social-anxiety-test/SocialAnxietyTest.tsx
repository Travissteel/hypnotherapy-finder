'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Fear of Judgement', text: 'Do you fear being embarrassed, judged, or humiliated in social situations?' },
  { id: 2, category: 'Fear of Judgement', text: 'Do you worry excessively about what others think of you before, during, or after social interactions?' },
  { id: 3, category: 'Fear of Judgement', text: 'Do you replay conversations or social situations afterward, criticising how you came across?' },
  { id: 4, category: 'Avoidance', text: 'Do you avoid social situations such as parties, meetings, or group gatherings because they make you anxious?' },
  { id: 5, category: 'Avoidance', text: 'Do you avoid speaking up in groups, asking questions, or drawing attention to yourself?' },
  { id: 6, category: 'Avoidance', text: 'Do you turn down opportunities (work, social, personal) because of anxiety about how others will perceive you?' },
  { id: 7, category: 'Physical Symptoms', text: 'Do you experience blushing, sweating, trembling, or a racing heart in social situations?' },
  { id: 8, category: 'Physical Symptoms', text: 'Do you feel nauseous or have an upset stomach before or during social events?' },
  { id: 9, category: 'Performance Situations', text: 'Do you feel intense anxiety when speaking, presenting, or performing in front of others?' },
  { id: 10, category: 'Performance Situations', text: 'Do you struggle with eating, drinking, or writing in front of other people due to self-consciousness?' },
  { id: 11, category: 'Daily Life Impact', text: 'Does social anxiety limit your career, education, or relationships?' },
  { id: 12, category: 'Daily Life Impact', text: 'Do you feel significant distress about your social anxiety, even when you know your fears may be out of proportion?' },
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

export default function SocialAnxietyTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const max = questions.length * 4;
    const pct = (total / max) * 100;

    if (pct < 25) {
      setResult({ headline: 'Minimal Social Anxiety', body: 'Your responses suggest you experience little social anxiety. Feeling somewhat nervous in social situations is completely normal. If this changes, hypnotherapy is a gentle and effective tool for building social confidence.', severity: 'low' });
    } else if (pct < 55) {
      setResult({ headline: 'Moderate Social Anxiety', body: 'Your responses suggest you experience moderate social anxiety that may be holding you back in certain areas of life. Hypnotherapy is highly effective for social anxiety — it works directly on the subconscious patterns that trigger self-consciousness, helping you feel calmer and more confident in social situations.', severity: 'moderate' });
    } else {
      setResult({ headline: 'Significant Social Anxiety Disorder Symptoms', body: 'Your responses suggest significant symptoms of social anxiety disorder that are likely affecting your daily life, relationships, and opportunities. Social anxiety is one of the most treatable conditions — hypnotherapy, alongside other approaches, can help you break the cycle of avoidance and build genuine social confidence.', severity: 'high' });
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
                Find a Social Anxiety Hypnotherapist <ChevronRight style={{ width: 16, height: 16 }} />
              </Link>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>How Hypnotherapy Helps Social Anxiety</h3>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                Social anxiety is rooted in deeply held subconscious beliefs about yourself and how others see you. Hypnotherapy works directly at this level — helping to dissolve the automatic fear responses, reframe negative self-beliefs, and build genuine confidence that carries into real-world social situations. Many people notice significant improvement within just a few sessions.
              </p>
            </div>
          )}

          <ShareResult quizName="Social Anxiety Test" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/social-anxiety-test" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the test
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This test is for informational purposes only and does not constitute a clinical diagnosis of social anxiety disorder. If social anxiety is significantly affecting your life, please speak with a qualified healthcare professional.
      </p>
    </div>
  );
}
