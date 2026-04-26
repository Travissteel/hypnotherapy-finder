'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const questions = [
  { id: 1, category: 'Intrusive Thoughts & Obsessions', text: 'Do you experience unwanted, repetitive thoughts, images, or urges that feel distressing or hard to control?' },
  { id: 2, category: 'Intrusive Thoughts & Obsessions', text: 'Do you have persistent fears about contamination, germs, or dirt — for example, worrying about touching certain objects or surfaces?' },
  { id: 3, category: 'Intrusive Thoughts & Obsessions', text: 'Do you experience intrusive thoughts about harming yourself or others, even though you would never act on them?' },
  { id: 4, category: 'Intrusive Thoughts & Obsessions', text: 'Do you have an intense need for things to feel "just right", perfectly symmetrical, or in a specific order?' },
  { id: 5, category: 'Intrusive Thoughts & Obsessions', text: 'Do you experience recurring doubts (e.g. "Did I lock the door?", "Did I hurt someone?") even when you know the answer is almost certainly no?' },
  { id: 6, category: 'Compulsions & Rituals', text: 'Do you perform repetitive behaviours (e.g. hand washing, checking, counting, arranging) to relieve anxiety or prevent something bad happening?' },
  { id: 7, category: 'Compulsions & Rituals', text: 'Do you engage in mental rituals such as repeating words, prayers, or phrases silently to neutralise an unwanted thought?' },
  { id: 8, category: 'Compulsions & Rituals', text: 'Do you seek reassurance from others repeatedly about the same worries, even when reassurance only relieves anxiety temporarily?' },
  { id: 9, category: 'Compulsions & Rituals', text: 'Do you avoid certain situations, objects, or people to prevent triggering obsessive thoughts or urges?' },
  { id: 10, category: 'Time & Daily Impact', text: 'Do obsessive thoughts or compulsive behaviours take up more than an hour of your day?' },
  { id: 11, category: 'Time & Daily Impact', text: 'Do your obsessions or compulsions significantly interfere with your work, studies, or daily responsibilities?' },
  { id: 12, category: 'Time & Daily Impact', text: 'Do obsessions or compulsions negatively affect your relationships or social life?' },
  { id: 13, category: 'Pure O (Primarily Mental OCD)', text: 'Do you experience distressing intrusive thoughts but feel your compulsions are mostly mental rather than physical — making it hard to recognise them as OCD?' },
  { id: 14, category: 'Pure O (Primarily Mental OCD)', text: "Do you spend significant time mentally analysing, arguing with, or trying to \"figure out\" intrusive thoughts to prove they don't mean anything bad about you?" },
];

const options = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Always', value: 4 },
];

type Result = { headline: string; body: string; severity: 'low' | 'moderate' | 'high'; isPureO: boolean };

const severityBorderColor = { low: 'oklch(0.7 0.15 145)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.65 0.2 20)' };
const severityTextColor = { low: 'oklch(0.7 0.15 145)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.65 0.2 20)' };

const SeverityIcon = ({ s }: { s: string }) => {
  if (s === 'low') return <CheckCircle style={{ width: 28, height: 28, color: severityTextColor.low, flexShrink: 0 }} />;
  if (s === 'moderate') return <Activity style={{ width: 28, height: 28, color: severityTextColor.moderate, flexShrink: 0 }} />;
  return <AlertTriangle style={{ width: 28, height: 28, color: severityTextColor.high, flexShrink: 0 }} />;
};

export default function OCDTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const answered = Object.keys(answers).length;
  const allAnswered = answered === questions.length;
  const setAnswer = (id: number, value: number) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const max = questions.length * 4;
    const pct = (total / max) * 100;

    const pureOScore = (answers[13] ?? 0) + (answers[14] ?? 0);
    const physicalCompulsion = answers[6] ?? 0;
    const isPureO = pureOScore >= 5 && physicalCompulsion <= 1;

    if (pct < 20) {
      setResult({ headline: 'Few OCD Symptoms Detected', body: 'Your responses suggest you are experiencing few symptoms associated with OCD. Occasional intrusive thoughts are normal for everyone. If your symptoms increase or begin to affect your daily life, support is available.', severity: 'low', isPureO: false });
    } else if (pct < 50) {
      setResult({
        headline: isPureO ? 'Possible Pure O (Primarily Obsessional OCD)' : 'Possible OCD Symptoms',
        body: isPureO
          ? 'Your responses suggest you may be experiencing "Pure O" — a form of OCD where compulsions are primarily mental rather than physical. This often goes unrecognised because there are no obvious rituals. Hypnotherapy can help by addressing the underlying anxiety and breaking the cycle of mental rumination.'
          : 'Your responses suggest you may be experiencing OCD symptoms that are affecting your life. OCD involves a cycle of obsessions and compulsions that can be exhausting to manage. Hypnotherapy is an effective complementary approach that targets the anxiety driving the OCD cycle.',
        severity: 'moderate', isPureO,
      });
    } else {
      setResult({
        headline: isPureO ? 'Significant Pure O Symptoms' : 'Significant OCD Symptoms',
        body: isPureO
          ? 'Your responses suggest significant symptoms of primarily obsessional OCD (Pure O). Mental compulsions like rumination, reassurance-seeking, and thought analysis can be just as exhausting as physical rituals. Hypnotherapy and ERP-informed approaches can help you break free from the cycle.'
          : 'Your responses suggest significant OCD symptoms that are likely having a major impact on your daily life. Please know that OCD is a recognised, treatable condition — you are not "crazy" and your thoughts do not define you. A qualified hypnotherapist experienced in OCD can help you regain control.',
        severity: 'high', isPureO,
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
                Find an OCD Hypnotherapist <ChevronRight style={{ width: 16, height: 16 }} />
              </Link>
            )}
          </div>

          {result.isPureO && (
            <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid oklch(0.7 0.15 60)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>What is Pure O?</h3>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                "Pure O" (Primarily Obsessional OCD) is a form of OCD where compulsions are mostly mental — ruminating, seeking reassurance, mentally reviewing events, or trying to "cancel out" thoughts. Because there are no obvious rituals, Pure O often goes undiagnosed for years. It is just as real as other forms of OCD, and equally treatable.
              </p>
            </div>
          )}

          {result.severity !== 'low' && (
            <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>How Hypnotherapy Helps OCD</h3>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                Hypnotherapy for OCD works by reducing the underlying anxiety that fuels the obsession-compulsion cycle. Using techniques like cognitive hypnotherapy and ERP-informed suggestion, a hypnotherapist can help you respond to intrusive thoughts with calm rather than compulsion — weakening the cycle over time. Many people find it highly effective alongside other OCD treatments.
              </p>
            </div>
          )}

          <ShareResult quizName="OCD Test" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/ocd-test" />

          <button onClick={() => { setAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the test
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This test is for informational purposes only and does not constitute a clinical diagnosis of OCD. If obsessive thoughts or compulsive behaviours are significantly affecting your life, please speak with a qualified mental health professional.
      </p>
    </div>
  );
}
