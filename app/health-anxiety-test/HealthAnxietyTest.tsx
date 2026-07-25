'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight, HeartHandshake } from 'lucide-react';
import { ShareResult } from '@/components/quiz/ShareResult';

const questions = [
  { id: 1, category: 'Body Monitoring', text: 'Do you scan your body for sensations, changes, lumps, pain, or signs that something might be wrong?' },
  { id: 2, category: 'Body Monitoring', text: 'When you notice a normal sensation, do you keep checking it until it feels more intense or harder to ignore?' },
  { id: 3, category: 'Body Monitoring', text: 'Do you find it difficult to accept uncertainty about physical sensations, even after a recent check or reassuring explanation?' },
  { id: 4, category: 'Reassurance Loops', text: 'Do you repeatedly ask family, friends, doctors, or online communities whether a symptom sounds serious?' },
  { id: 5, category: 'Reassurance Loops', text: 'Do you search symptoms online and feel briefly calmer, then more worried again soon after?' },
  { id: 6, category: 'Reassurance Loops', text: 'After medical reassurance, do doubts return quickly or shift to a different symptom?' },
  { id: 7, category: 'Avoidance & Appointments', text: 'Do you avoid medical appointments, test results, health articles, or body-related conversations because they spike anxiety?' },
  { id: 8, category: 'Avoidance & Appointments', text: 'Do you feel anxious before routine checks, scans, blood tests, dental visits, or screening appointments?' },
  { id: 9, category: 'Avoidance & Appointments', text: 'Do you change plans, work, exercise, travel, or food choices because of fear about possible illness?' },
  { id: 10, category: 'Thought Patterns', text: 'Does your mind jump from a symptom to worst-case explanations faster than you can slow it down?' },
  { id: 11, category: 'Thought Patterns', text: 'Do you replay health conversations, test wording, doctor comments, or small physical changes long after they happen?' },
  { id: 12, category: 'Daily Impact', text: 'Do health worries affect sleep, concentration, relationships, work, or your ability to relax most weeks?' },
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

export default function HealthAnxietyTest() {
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
        headline: 'Low Current Health-Anxiety Signals',
        body: 'Your responses suggest low current signs of health-anxiety patterns. That does not mean every worry is meaningless; new, severe, or changing physical symptoms should still be checked by a qualified healthcare provider. Use this result as a reminder to notice patterns early rather than waiting until checking loops grow.',
        severity: 'low',
      });
    } else if (pct < 58) {
      setResult({
        headline: 'Moderate Health-Anxiety Patterns',
        body: 'Your responses suggest body monitoring, symptom searching, reassurance seeking, or appointment anxiety may be taking up mental space. Hypnotherapy may support the automatic loop between sensation, threat imagery, checking, brief relief, and renewed doubt, while medical questions stay with qualified healthcare providers.',
        severity: 'moderate',
      });
    } else {
      setResult({
        headline: 'Strong Health-Anxiety Signals',
        body: 'Your responses suggest health worries may be seriously affecting daily life. Please consider speaking with a qualified healthcare provider or mental-health professional, especially if fear is driving repeated checking, avoidance, sleep loss, or distress. Hypnotherapy may be a complementary support for anxiety patterns, not a substitute for medical assessment.',
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
                <Link href="/hypnotherapy-for-anxiety" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, color: 'var(--hf-accent)', border: '1px solid rgba(255,255,255,0.12)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  Read About Anxiety Support <ChevronRight style={{ width: 16, height: 16 }} />
                </Link>
                <Link href="/blog/hypnotherapy-for-health-anxiety-guide" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, color: 'var(--hf-accent)', border: '1px solid rgba(255,255,255,0.12)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  Health Anxiety Guide <ChevronRight style={{ width: 16, height: 16 }} />
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
                Health anxiety often runs as an automatic loop: body sensation, threat image, checking, reassurance, brief relief, and renewed doubt. A hypnotherapist may use guided imagery, anchoring, suggestion, parts-informed language, and future rehearsal to support calmer responses to uncertainty, appointments, and body sensations.
              </p>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                Hypnotherapy is a complementary approach. If you&apos;re experiencing significant symptoms, please consult a qualified healthcare provider.
              </p>
            </div>
          )}

          <ShareResult quizName="Health Anxiety Test" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/health-anxiety-test" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the test
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This test is for informational purposes only and is not a diagnosis. New, severe, changing, or concerning physical symptoms should be discussed with a qualified healthcare provider. If you feel unsafe or unable to function, contact emergency services or a crisis service in your area.
      </p>
    </div>
  );
}
