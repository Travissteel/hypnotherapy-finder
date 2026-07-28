'use client';
import { ShareResult } from '@/components/quiz/ShareResult';
import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Fear of Mistakes', text: 'How often does the possibility of making a mistake feel larger than the actual task?' },
  { id: 2, category: 'Fear of Mistakes', text: 'How often do you replay small errors, awkward moments, or imperfect choices long after they happened?' },
  { id: 3, category: 'Over-Preparing', text: 'How often do you keep researching, editing, rehearsing, or checking because the work still does not feel ready?' },
  { id: 4, category: 'Over-Preparing', text: 'How often is “just one more pass” really a way to avoid being judged?' },
  { id: 5, category: 'Procrastination Loop', text: 'How often do high standards make it harder to start, finish, publish, send, or decide?' },
  { id: 6, category: 'Procrastination Loop', text: 'How often do you delay a task because doing it imperfectly feels worse than not doing it yet?' },
  { id: 7, category: 'Reassurance & Approval', text: 'How often do you need reassurance, extra feedback, or permission before trusting your own judgement?' },
  { id: 8, category: 'Reassurance & Approval', text: 'How often does criticism, even mild criticism, feel difficult to shake off?' },
  { id: 9, category: 'Self-Criticism', text: 'How often does your inner dialogue become harsh when you rest, slow down, or produce average work?' },
  { id: 10, category: 'Self-Criticism', text: 'How often do achievements feel briefly relieving rather than satisfying?' },
  { id: 11, category: 'Life Impact', text: 'How often does perfectionism affect sleep, relationships, work, study, health habits, creativity, or confidence?' },
  { id: 12, category: 'Life Impact', text: 'How often do standards that look “productive” from the outside feel exhausting or restrictive on the inside?' },
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

export default function PerfectionismQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 25) {
      setResult({ headline: 'Lower Perfectionism Pressure', body: 'Your answers suggest perfectionism may show up occasionally, but it may not be driving major avoidance or distress right now. A useful next step is noticing which standards genuinely improve your life and which ones only add friction.', severity: 'low' });
    } else if (pct < 55) {
      setResult({ headline: 'Moderate Perfectionism Pressure', body: 'Your answers suggest perfectionism may be affecting starting, finishing, receiving feedback, resting, or trusting your own judgement. Hypnotherapy may support some people by working with the automatic threat response underneath mistakes, visibility, and judgement. It should be practical, specific, and complementary.', severity: 'moderate' });
    } else {
      setResult({ headline: 'High Perfectionism Pressure', body: 'Your answers suggest perfectionism may be significantly affecting daily life, confidence, rest, work, relationships, or decision-making. Consider speaking with a qualified healthcare provider if this overlaps with panic, depression, trauma, compulsions, eating concerns, or self-harm thoughts. Hypnotherapy may support rehearsal, self-talk, and nervous-system regulation, but complex concerns deserve appropriate care.', severity: 'high' });
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
              <Link href="/blog/hypnotherapy-for-perfectionism-guide" className="glass hf-glass-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Read the Perfectionism Guide
              </Link>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
            <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>How Hypnotherapy May Support Perfectionism</h3>
            <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
              Perfectionism-focused hypnotherapy may use relaxation, imagery, suggestion, parts work, anchoring, and future rehearsal to support a calmer response to mistakes, feedback, visibility, and unfinished work. Hypnotherapy is a complementary approach. If you&apos;re experiencing significant symptoms, please consult a qualified healthcare provider.
            </p>
          </div>

          <ShareResult quizName="Perfectionism Quiz" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/perfectionism-quiz" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the quiz
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This quiz is for informational purposes only and does not constitute a diagnosis. If the pattern feels unmanageable, if you feel unsafe, or if it overlaps with self-harm thoughts, compulsions, trauma, or severe depression, contact a qualified healthcare provider or urgent crisis support.
      </p>
    </div>
  );
}
