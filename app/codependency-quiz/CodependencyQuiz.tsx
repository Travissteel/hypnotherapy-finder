'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Excessive Caretaking', text: "Do you feel responsible for solving other people's problems, managing their emotions, or fixing their lives?" },
  { id: 2, category: 'Excessive Caretaking', text: 'Do you give help, advice, or support even when it has not been asked for — and feel anxious if you do not?' },
  { id: 3, category: 'Excessive Caretaking', text: 'Do you neglect your own needs in order to focus on caring for or worrying about someone else?' },
  { id: 4, category: 'Control & Enabling', text: "Do you find yourself making excuses for someone else's behaviour, covering for them, or protecting them from consequences?" },
  { id: 5, category: 'Control & Enabling', text: 'Do you try to control situations or people — not out of malice, but out of anxiety about what might happen if you do not?' },
  { id: 6, category: 'Loss of Self', text: 'Do you find it difficult to identify your own feelings, needs, or desires — separate from those of the person you are in a relationship with?' },
  { id: 7, category: 'Loss of Self', text: 'Does your mood, self-worth, or sense of stability depend heavily on how the other person in your life is feeling or behaving?' },
  { id: 8, category: 'Loss of Self', text: "Have you lost your own identity, interests, or friendships as a result of focusing on someone else's needs or problems?" },
  { id: 9, category: 'Fear of Abandonment', text: 'Do you tolerate disrespect, poor treatment, or unhealthy behaviour from others because you fear being alone or abandoned?' },
  { id: 10, category: 'Fear of Abandonment', text: 'Do you have an intense fear of rejection or conflict that causes you to avoid expressing your own needs or boundaries?' },
  { id: 11, category: 'Resentment & Exhaustion', text: 'Do you feel resentful, unappreciated, or exhausted — but continue to over-give because you do not know how to stop?' },
  { id: 12, category: 'Resentment & Exhaustion', text: 'Do you feel that relationships in your life are consistently one-sided, with you giving more than you receive?' },
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

export default function CodependencyQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 25) {
      setResult({ headline: 'Few Codependency Traits', body: 'Your responses suggest you have few codependency traits. You appear to maintain a reasonable balance between caring for others and maintaining your own identity and needs. Healthy relationships involve mutual give and take — and it sounds like you manage this well.', severity: 'low' });
    } else if (pct < 55) {
      setResult({ headline: 'Moderate Codependency Traits', body: 'Your responses suggest moderate codependency patterns that may be affecting your relationships and sense of self. Codependency often develops as a coping strategy in response to difficult early relationships — it is not a flaw, but a learned pattern. Hypnotherapy can help you identify the subconscious fears driving these behaviours and build a stronger, more independent sense of self.', severity: 'moderate' });
    } else {
      setResult({ headline: 'Significant Codependency Traits', body: 'Your responses suggest significant codependency that is likely causing exhaustion, resentment, and a loss of your own identity in relationships. Codependency at this level is serious — but it is also very treatable. Hypnotherapy works at the root level, addressing the fear of abandonment, low self-worth, and deeply held beliefs about love and safety that drive codependent behaviour.', severity: 'high' });
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
              <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>How Hypnotherapy Helps Codependency</h3>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                Codependency is rooted in deep subconscious beliefs about love, safety, and self-worth — often formed in early relationships. Hypnotherapy works directly at this level, using techniques such as inner child work, parts therapy, and boundary-building suggestion to update the beliefs that drive codependent patterns. The goal is not to make you care less about others, but to help you care for yourself equally — so your relationships can become genuinely mutual.
              </p>
            </div>
          )}

          <ShareResult quizName="Codependency Quiz" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/codependency-quiz" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the quiz
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This quiz is for informational purposes only and is not a clinical assessment.
      </p>
    </div>
  );
}
