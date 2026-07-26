'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';
import { ShareResult } from '@/components/quiz/ShareResult';

const questions = [
  { id: 1, category: 'Mood & Interest', text: 'How often have you felt low, flat, tearful, or emotionally heavy lately?' },
  { id: 2, category: 'Mood & Interest', text: 'How often have things you normally care about felt less interesting, less rewarding, or harder to start?' },
  { id: 3, category: 'Mood & Interest', text: 'How often do you feel detached from people, work, hobbies, or your usual sense of self?' },
  { id: 4, category: 'Energy & Motivation', text: 'How often does ordinary effort feel unusually heavy, even for simple tasks?' },
  { id: 5, category: 'Energy & Motivation', text: 'How often do you delay showering, replying, cleaning, cooking, or leaving the house because starting feels too hard?' },
  { id: 6, category: 'Sleep & Body', text: 'How often has your sleep changed — sleeping much more, sleeping much less, or waking unrefreshed?' },
  { id: 7, category: 'Sleep & Body', text: 'How often has appetite, body tension, heaviness, or physical restlessness changed alongside your mood?' },
  { id: 8, category: 'Thinking Patterns', text: 'How often do you get stuck in harsh self-talk, guilt, hopeless predictions, or the feeling that you are failing?' },
  { id: 9, category: 'Thinking Patterns', text: 'How often is it difficult to concentrate, make decisions, remember details, or follow through?' },
  { id: 10, category: 'Daily Impact', text: 'How often have mood or motivation patterns affected work, study, relationships, parenting, caregiving, or basic routines?' },
  { id: 11, category: 'Daily Impact', text: 'How often do you withdraw, cancel plans, avoid messages, or hide what is happening from other people?' },
  { id: 12, category: 'Safety & Support', text: 'How often have you felt that things are pointless, that people would be better off without you, or that you might not be safe?' },
];

const options = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Always', value: 4 },
];

type Result = { headline: string; body: string; severity: 'low' | 'moderate' | 'high'; urgent?: boolean };

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
  const categories = [...new Set(questions.map((q) => q.category))];

  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;
    const safetyScore = answers[12] ?? 0;

    if (safetyScore >= 3) {
      setResult({
        headline: 'Strong Support Recommended',
        body: 'Your answer about safety and hopelessness deserves real support, not just an online quiz result. Please contact a qualified healthcare provider, local crisis line, or emergency service if you may be at risk. Hypnotherapy may support emotional regulation for some people, but urgent safety concerns need qualified care first.',
        severity: 'high',
        urgent: true,
      });
    } else if (pct < 25) {
      setResult({
        headline: 'Low Current Impact',
        body: 'Your responses suggest low current impact from low mood patterns. That does not mean you should ignore changes, but it may indicate that your usual routines, relationships, and energy are mostly intact right now. If this shifts, early support can be easier than waiting until everything feels heavy.',
        severity: 'low',
      });
    } else if (pct < 55) {
      setResult({
        headline: 'Moderate Low-Mood Impact',
        body: 'Your responses suggest low mood, motivation, sleep, or self-talk may be affecting parts of daily life. Hypnotherapy may support some people by working with subconscious rumination loops, emotional rehearsal, rest cues, and self-critical inner dialogue — especially alongside practical support and healthcare guidance where needed.',
        severity: 'moderate',
      });
    } else {
      setResult({
        headline: 'High Low-Mood Impact',
        body: 'Your responses suggest mood and motivation patterns may be having a significant effect on daily life. Please consider speaking with a qualified healthcare provider, especially if this has lasted more than a couple of weeks or is affecting safety, work, sleep, eating, or relationships. Hypnotherapy can be explored as a complementary support, not a replacement for medical or mental-health care.',
        severity: 'high',
      });
    }
  };

  const optBtnStyle = (selected: boolean): React.CSSProperties => ({
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    padding: '10px 4px', borderRadius: 12, border: `2px solid ${selected ? 'var(--hf-accent)' : 'rgba(255,255,255,0.08)'}`,
    background: selected ? 'oklch(0.72 0.12 185 / 0.2)' : 'rgba(255,255,255,0.03)',
    color: selected ? 'var(--hf-fg)' : 'var(--hf-fg-dim)', fontSize: 11, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
  });

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 16px' }}>
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Link href="/hypnotherapy-for-depression" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Read About Hypnotherapy for Depression <ChevronRight style={{ width: 16, height: 16 }} />
              </Link>
              {!result.urgent && (
                <Link href="/find-a-hypnotherapist" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, color: 'var(--hf-accent)', fontWeight: 600, fontSize: 14, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}>
                  Find a Hypnotherapist <ChevronRight style={{ width: 16, height: 16 }} />
                </Link>
              )}
            </div>
          </div>

          <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
            <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>How Hypnotherapy May Support Low Mood Patterns</h3>
            <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
              Hypnotherapy is a complementary approach. A practitioner may use guided relaxation, imagery, suggestion, self-hypnosis, and future rehearsal to support calmer routines, kinder self-talk, sleep preparation, and less automatic rumination. If symptoms are significant, it should sit alongside care from a qualified healthcare provider.
            </p>
          </div>

          <ShareResult quizName="Depression Quiz" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/depression-quiz" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the quiz
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This quiz is for informational purposes only and does not constitute a clinical diagnosis. Hypnotherapy is a complementary approach. If you're experiencing significant symptoms, please consult a qualified healthcare provider.
      </p>
    </div>
  );
}
