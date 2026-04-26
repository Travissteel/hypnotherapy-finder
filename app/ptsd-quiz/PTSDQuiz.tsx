'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Intrusive Symptoms', text: 'Do you experience unwanted, distressing memories of a traumatic event?' },
  { id: 2, category: 'Intrusive Symptoms', text: 'Do you have nightmares or upsetting dreams related to a traumatic experience?' },
  { id: 3, category: 'Intrusive Symptoms', text: 'Do you experience flashbacks — feeling as if a traumatic event is happening again?' },
  { id: 4, category: 'Avoidance', text: 'Do you avoid thoughts, feelings, or memories associated with a traumatic event?' },
  { id: 5, category: 'Avoidance', text: 'Do you avoid people, places, activities, or situations that remind you of a trauma?' },
  { id: 6, category: 'Mood & Thinking', text: 'Do you feel persistent negative beliefs about yourself, others, or the world (e.g. "I am broken", "nowhere is safe")?' },
  { id: 7, category: 'Mood & Thinking', text: 'Do you feel emotionally numb, detached from others, or unable to experience positive emotions?' },
  { id: 8, category: 'Mood & Thinking', text: 'Do you feel persistent guilt or shame related to a traumatic event?' },
  { id: 9, category: 'Hyperarousal', text: 'Do you feel constantly on edge, easily startled, or hyper-vigilant about potential danger?' },
  { id: 10, category: 'Hyperarousal', text: 'Do you have difficulty sleeping, concentrating, or controlling angry outbursts?' },
  { id: 11, category: 'Emotional Regulation', text: 'Do you experience intense, overwhelming emotions that feel difficult to control?' },
  { id: 12, category: 'Self-Perception', text: 'Do you have a persistent negative sense of self — feeling permanently damaged, worthless, or different from others?' },
  { id: 13, category: 'Relationships', text: 'Do you struggle to trust others or maintain close relationships due to past experiences?' },
];

const options = [
  { label: 'Not at all', value: 0 },
  { label: 'A little', value: 1 },
  { label: 'Moderately', value: 2 },
  { label: 'Quite a bit', value: 3 },
  { label: 'Extremely', value: 4 },
];

type Result = { headline: string; subline: string; isComplex: boolean; severity: 'low' | 'moderate' | 'high' };

const severityBorderColor = { low: 'oklch(0.7 0.15 145)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.65 0.2 20)' };
const severityTextColor = { low: 'oklch(0.7 0.15 145)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.65 0.2 20)' };

const SeverityIcon = ({ s }: { s: string }) => {
  if (s === 'low') return <CheckCircle style={{ width: 28, height: 28, color: severityTextColor.low, flexShrink: 0 }} />;
  if (s === 'moderate') return <Activity style={{ width: 28, height: 28, color: severityTextColor.moderate, flexShrink: 0 }} />;
  return <AlertTriangle style={{ width: 28, height: 28, color: severityTextColor.high, flexShrink: 0 }} />;
};

export default function PTSDQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const maxScore = questions.length * 4;
    const percentage = (total / maxScore) * 100;

    const complexScore = (answers[11] ?? 0) + (answers[12] ?? 0) + (answers[13] ?? 0);
    const isComplex = complexScore >= 6;

    if (percentage < 25) {
      setResult({ headline: 'Few or No Significant Symptoms', subline: 'Your responses suggest you are experiencing few symptoms associated with trauma. Everyone processes difficult events differently — if you are struggling, support is always available.', isComplex: false, severity: 'low' });
    } else if (percentage < 55) {
      setResult({
        headline: isComplex ? 'Possible Complex PTSD Symptoms' : 'Possible PTSD Symptoms',
        subline: isComplex
          ? 'Your responses suggest symptoms consistent with Complex PTSD (C-PTSD), which can develop after prolonged or repeated trauma. Hypnotherapy and trauma-focused therapy have helped many people with C-PTSD process their experiences and regain a sense of safety.'
          : 'Your responses suggest you may be experiencing symptoms associated with PTSD. These are common responses to trauma — you are not alone, and effective support is available. Hypnotherapy can be a powerful tool for trauma processing and recovery.',
        isComplex, severity: 'moderate',
      });
    } else {
      setResult({
        headline: isComplex ? 'Significant Complex PTSD Symptoms' : 'Significant PTSD Symptoms',
        subline: isComplex
          ? 'Your responses indicate significant symptoms consistent with Complex PTSD. C-PTSD can deeply affect daily life, relationships, and sense of self — but recovery is absolutely possible. Trauma-informed hypnotherapy has helped many people with C-PTSD rebuild safety, trust, and wellbeing.'
          : 'Your responses suggest significant trauma-related symptoms. Please know that PTSD is a normal response to abnormal events, and you deserve compassionate, professional support. Hypnotherapy is recognised as an effective approach for trauma recovery.',
        isComplex, severity: 'high',
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
                    <span>Not at all</span><span>Extremely</span>
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
            <p style={{ color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 20 }}>{result.subline}</p>
            {result.severity !== 'low' && (
              <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Find a Trauma-Informed Hypnotherapist <ChevronRight style={{ width: 16, height: 16 }} />
              </Link>
            )}
          </div>

          {result.isComplex && (
            <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid oklch(0.65 0.15 290)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>About Complex PTSD</h3>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                Complex PTSD (C-PTSD) typically develops after prolonged or repeated trauma, such as childhood abuse, domestic violence, or captivity. It shares core PTSD symptoms but also includes difficulties with emotional regulation, self-perception, and relationships. Trauma-informed hypnotherapy can work gently alongside other therapies to support recovery.
              </p>
            </div>
          )}

          {result.severity !== 'low' && (
            <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>How Hypnotherapy Can Help</h3>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                Hypnotherapy for trauma works by helping you access a relaxed state where distressing memories can be processed more safely. Techniques such as EMDR-informed hypnosis, ego state therapy, and parts work can reduce the emotional charge of traumatic memories and help rebuild a sense of safety and control.
              </p>
            </div>
          )}

          <ShareResult quizName="PTSD Quiz" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/ptsd-quiz" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the quiz
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This quiz is for informational purposes only and does not constitute a clinical diagnosis. If you are experiencing distressing symptoms, please reach out to a qualified mental health professional or call your local crisis line.
      </p>
    </div>
  );
}
