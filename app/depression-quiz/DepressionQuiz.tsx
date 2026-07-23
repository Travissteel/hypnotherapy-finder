'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight, HeartHandshake } from 'lucide-react';
import { ShareResult } from '@/components/quiz/ShareResult';

const questions = [
  { id: 1, category: 'Mood & Interest', text: 'Have you felt low, flat, tearful, or emotionally heavy more often than usual?' },
  { id: 2, category: 'Mood & Interest', text: 'Have you lost interest in things that normally matter to you, even when there is time for them?' },
  { id: 3, category: 'Mood & Interest', text: 'Do ordinary tasks feel pointless, unusually hard, or not worth starting?' },
  { id: 4, category: 'Energy & Motivation', text: 'Have you felt physically drained or slowed down, even after resting?' },
  { id: 5, category: 'Energy & Motivation', text: 'Do you find yourself avoiding messages, chores, appointments, or social plans because they feel too much?' },
  { id: 6, category: 'Energy & Motivation', text: 'Do you struggle to begin basic routines such as getting ready, eating well, tidying, or leaving the house?' },
  { id: 7, category: 'Sleep & Body', text: 'Has your sleep changed noticeably, such as sleeping far more, waking often, or struggling to fall asleep?' },
  { id: 8, category: 'Sleep & Body', text: 'Has your appetite, body tension, or general sense of physical heaviness changed with your mood?' },
  { id: 9, category: 'Thoughts & Self-Talk', text: 'Do you replay mistakes, criticise yourself harshly, or feel like you are failing even when evidence is mixed?' },
  { id: 10, category: 'Thoughts & Self-Talk', text: 'Do you feel hopeless about things improving, even if part of you knows the situation may change?' },
  { id: 11, category: 'Daily Impact', text: 'Has low mood affected work, study, parenting, relationships, or basic responsibilities?' },
  { id: 12, category: 'Daily Impact', text: 'Have these patterns lasted most days for two weeks or longer?' },
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

export default function DepressionQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 25) {
      setResult({
        headline: 'Low Current Depression Signals',
        body: 'Your responses suggest low current signs of depression-related patterns. This does not rule out stress, grief, burnout, anxiety, or difficult life circumstances. If your mood changes, use this as a prompt to check in early rather than waiting until things feel unmanageable.',
        severity: 'low',
      });
    } else if (pct < 58) {
      setResult({
        headline: 'Moderate Low-Mood Patterns',
        body: 'Your responses suggest low mood may be affecting motivation, energy, self-talk, or daily functioning. Hypnotherapy may support practical patterns around rumination, sleep preparation, self-criticism, and small action steps, but it should sit alongside appropriate healthcare or mental-health support when symptoms are significant.',
        severity: 'moderate',
      });
    } else {
      setResult({
        headline: 'Strong Depression-Related Signals',
        body: 'Your responses suggest depression-related patterns may be having a serious impact on daily life. Please consider speaking with a qualified healthcare provider or mental-health professional. Hypnotherapy may be a complementary support for specific patterns such as rumination, sleep routines, and self-talk, but urgent or severe symptoms need appropriate clinical care.',
        severity: 'high',
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
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 16px' }}>
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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <Link href="/find-a-hypnotherapist" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  Find a Hypnotherapist <ChevronRight style={{ width: 16, height: 16 }} />
                </Link>
                <Link href="/hypnotherapy-for-depression" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, color: 'var(--hf-accent)', border: '1px solid rgba(255,255,255,0.12)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  Read About Depression Support <ChevronRight style={{ width: 16, height: 16 }} />
                </Link>
              </div>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <HeartHandshake style={{ width: 20, height: 20, color: 'var(--hf-accent)' }} />
                <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)' }}>Where Hypnotherapy May Fit</h3>
              </div>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 12 }}>
                Depression often includes automatic loops: rumination, shutdown, harsh self-talk, sleep disruption, and difficulty taking the next small step. A hypnotherapist may use guided imagery, suggestion, anchoring, parts-informed language, and future rehearsal to support calmer internal responses and practical routines.
              </p>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                Hypnotherapy is a complementary approach. If you&apos;re experiencing significant symptoms, please consult a qualified healthcare provider.
              </p>
            </div>
          )}

          <ShareResult quizName="Depression Quiz" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/depression-quiz" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the quiz
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This quiz is for informational purposes only and is not a diagnosis. If you feel unsafe, at risk of self-harm, or unable to function, contact emergency services or a crisis service in your area.
      </p>
    </div>
  );
}
