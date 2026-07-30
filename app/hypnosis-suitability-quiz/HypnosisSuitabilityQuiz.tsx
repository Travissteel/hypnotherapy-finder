'use client';

import { ShareResult } from '@/components/quiz/ShareResult';
import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Goal Clarity', text: 'Is there a specific pattern you want help with, such as anxiety, sleep, confidence, smoking, habits, pain support, or phobias?' },
  { id: 2, category: 'Goal Clarity', text: 'Can you describe what would look different in daily life if the sessions were useful for you?' },
  { id: 3, category: 'Expectations', text: 'Are you open to hypnotherapy as a collaborative process rather than expecting to be controlled, unconscious, or magically fixed?' },
  { id: 4, category: 'Expectations', text: 'Are you comfortable with the idea that results vary, and that several sessions may be more realistic than one dramatic breakthrough?' },
  { id: 5, category: 'Comfort & Focus', text: 'Can you usually follow guided relaxation, visualisation, breathing, meditation, or focused-attention exercises for a few minutes?' },
  { id: 6, category: 'Comfort & Focus', text: 'Would you feel reasonably safe closing your eyes, relaxing, or focusing inward with a qualified practitioner?' },
  { id: 7, category: 'Readiness', text: 'Are you willing to practise small between-session exercises, such as listening to an audio recording, rehearsing a calmer response, or noticing triggers?' },
  { id: 8, category: 'Readiness', text: 'Are you seeking support because you want change, not only because someone else is pressuring you?' },
  { id: 9, category: 'Support Needs', text: 'If your concern involves severe symptoms, trauma, medication questions, self-harm thoughts, or medical issues, are you willing to involve an appropriate healthcare provider?' },
  { id: 10, category: 'Fit', text: 'Would you prefer a structured, practical session style that works with imagination, suggestion, habit rehearsal, and subconscious pattern change?' },
];

const options = [
  { label: 'No', value: 0 },
  { label: 'Not sure', value: 1 },
  { label: 'Somewhat', value: 2 },
  { label: 'Mostly', value: 3 },
  { label: 'Yes', value: 4 },
];

type Result = { headline: string; body: string; severity: 'low' | 'moderate' | 'high' };

const severityBorderColor = { low: 'oklch(0.65 0.2 20)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.7 0.15 145)' };
const severityTextColor = { low: 'oklch(0.65 0.2 20)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.7 0.15 145)' };

const SeverityIcon = ({ s }: { s: string }) => {
  if (s === 'high') return <CheckCircle style={{ width: 28, height: 28, color: severityTextColor.high, flexShrink: 0 }} />;
  if (s === 'moderate') return <Activity style={{ width: 28, height: 28, color: severityTextColor.moderate, flexShrink: 0 }} />;
  return <AlertTriangle style={{ width: 28, height: 28, color: severityTextColor.low, flexShrink: 0 }} />;
};

export default function HypnosisSuitabilityQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const categories = [...new Set(questions.map((q) => q.category))];
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, value) => sum + value, 0);
    const pct = (total / (questions.length * 4)) * 100;

    if (pct < 45) {
      setResult({
        headline: 'Hypnotherapy May Not Be the First Step Yet',
        body: 'Your answers suggest you may need more clarity, safety, or professional support before hypnotherapy is the best fit. That does not mean hypnosis is off the table. It may mean starting with a clear goal, reading about how hypnotherapy works, or speaking with a healthcare provider if symptoms are significant.',
        severity: 'low',
      });
    } else if (pct < 75) {
      setResult({
        headline: 'Hypnotherapy Could Be Worth Exploring',
        body: 'Your answers suggest a reasonable fit, especially if you choose a practitioner who explains the process clearly and works at your pace. Hypnotherapy may help when the goal is specific, the sessions feel collaborative, and you are willing to practise new responses outside the appointment.',
        severity: 'moderate',
      });
    } else {
      setResult({
        headline: 'You Look Like a Strong Candidate for Hypnotherapy',
        body: 'Your answers suggest the main ingredients that often make hypnotherapy productive are present: a clear goal, realistic expectations, willingness to engage with guided focus, and readiness to practise between sessions. The next step is finding a qualified practitioner who specialises in the area you want to work on.',
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
                    <span>No</span><span>Yes</span>
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
              <Link href="/what-is-hypnotherapy" style={{ display: 'inline-flex', alignItems: 'center', padding: '10px 18px', borderRadius: 10, color: 'var(--hf-fg)', border: '1px solid rgba(255,255,255,0.12)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Learn How It Works
              </Link>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
            <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>What Makes Someone a Good Fit?</h3>
            <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 12 }}>
              Hypnotherapy tends to fit best when there is a clear target, realistic expectations, and enough comfort with guided attention to practise new responses. Common methods include Ericksonian hypnotherapy, ego strengthening, habit rehearsal, imagery work, and post-hypnotic suggestion.
            </p>
            <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
              Hypnotherapy is a complementary approach. If you're experiencing significant symptoms, please consult a qualified healthcare provider. You can also compare options on our <Link href="/does-hypnotherapy-work" style={{ color: 'var(--hf-accent)' }}>does hypnotherapy work</Link>, <Link href="/online-hypnotherapy" style={{ color: 'var(--hf-accent)' }}>online hypnotherapy</Link>, and <Link href="/hypnotherapy-for-anxiety" style={{ color: 'var(--hf-accent)' }}>hypnotherapy for anxiety</Link> guides.
            </p>
          </div>

          <ShareResult quizName="Hypnosis Suitability Quiz" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/hypnosis-suitability-quiz" />

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
