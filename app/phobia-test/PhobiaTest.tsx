'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

const phobias = [
  { id: 'spiders', label: 'Spiders or insects', name: 'Arachnophobia / Entomophobia' },
  { id: 'heights', label: 'Heights', name: 'Acrophobia' },
  { id: 'flying', label: 'Flying', name: 'Aviophobia' },
  { id: 'enclosed', label: 'Enclosed or small spaces', name: 'Claustrophobia' },
  { id: 'openspaces', label: 'Open spaces or crowds', name: 'Agoraphobia' },
  { id: 'social', label: 'Social situations / being judged', name: 'Social Phobia' },
  { id: 'blood', label: 'Blood, needles, or medical procedures', name: 'Haematophobia / Trypanophobia' },
  { id: 'vomiting', label: 'Vomiting or being sick', name: 'Emetophobia' },
  { id: 'deepwater', label: 'Deep water or the ocean', name: 'Thalassophobia' },
  { id: 'darkness', label: 'The dark or being alone at night', name: 'Nyctophobia' },
  { id: 'dogs', label: 'Dogs or other animals', name: 'Cynophobia / Zoophobia' },
  { id: 'storms', label: 'Storms, thunder or lightning', name: 'Astraphobia' },
  { id: 'driving', label: 'Driving or being a passenger in a vehicle', name: 'Amaxophobia' },
  { id: 'dentist', label: 'The dentist or dental procedures', name: 'Dentophobia' },
  { id: 'death', label: 'Death or dying', name: 'Thanatophobia' },
  { id: 'choking', label: 'Choking or swallowing', name: 'Phagophobia' },
];

const impactQuestions = [
  { id: 'avoid', text: 'Do you go out of your way to avoid situations, places, or things related to your fear?' },
  { id: 'anticipate', text: 'Do you feel intense anxiety just thinking about or anticipating your fear trigger?' },
  { id: 'physical', text: 'When exposed to your fear, do you experience physical symptoms like racing heart, sweating, shaking, or difficulty breathing?' },
  { id: 'disproportionate', text: 'Do you recognise that your fear is excessive or out of proportion, but feel unable to control it?' },
  { id: 'limit', text: 'Does your fear significantly limit your daily life, work, travel, or relationships?' },
];

const impactOptions = [
  { label: 'Never', value: 0 },
  { label: 'Rarely', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Often', value: 3 },
  { label: 'Always', value: 4 },
];

type Stage = 'phobias' | 'impact' | 'result';
type Result = { headline: string; body: string; severity: 'low' | 'moderate' | 'high'; identified: string[] };

const severityBorderColor = { low: 'oklch(0.7 0.15 145)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.65 0.2 20)' };
const severityTextColor = { low: 'oklch(0.7 0.15 145)', moderate: 'oklch(0.75 0.15 60)', high: 'oklch(0.65 0.2 20)' };

const SeverityIcon = ({ s }: { s: string }) => {
  if (s === 'low') return <CheckCircle style={{ width: 28, height: 28, color: severityTextColor.low, flexShrink: 0 }} />;
  if (s === 'moderate') return <Activity style={{ width: 28, height: 28, color: severityTextColor.moderate, flexShrink: 0 }} />;
  return <AlertTriangle style={{ width: 28, height: 28, color: severityTextColor.high, flexShrink: 0 }} />;
};

export default function PhobiaTest() {
  const [stage, setStage] = useState<Stage>('phobias');
  const [selectedPhobias, setSelectedPhobias] = useState<string[]>([]);
  const [impactAnswers, setImpactAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const togglePhobia = (id: string) => {
    setSelectedPhobias((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const setImpact = (id: string, value: number) => {
    setImpactAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const allImpactAnswered = Object.keys(impactAnswers).length === impactQuestions.length;

  const calculate = () => {
    const impactTotal = Object.values(impactAnswers).reduce((sum, v) => sum + v, 0);
    const impactMax = impactQuestions.length * 4;
    const impactPct = (impactTotal / impactMax) * 100;
    const identified = selectedPhobias.map((id) => phobias.find((p) => p.id === id)?.name ?? id);

    if (selectedPhobias.length === 0 || impactPct < 25) {
      setResult({ headline: 'No Significant Phobia Detected', body: 'Your responses suggest you are not experiencing a clinical phobia right now. Many people have fears — the key difference with a phobia is that it causes significant distress and avoidance. If things change, hypnotherapy is one of the most effective treatments for phobias.', severity: 'low', identified });
    } else if (impactPct < 60) {
      setResult({ headline: 'Possible Phobia — Moderate Impact', body: 'Your responses suggest you may have a phobia that is causing noticeable distress and avoidance. Hypnotherapy is widely considered one of the most effective treatments for specific phobias — often producing lasting results in just a few sessions.', severity: 'moderate', identified });
    } else {
      setResult({ headline: 'Likely Phobia — Significant Impact', body: 'Your responses suggest a phobia that is significantly affecting your life. The good news: specific phobias have some of the highest treatment success rates of any anxiety condition. Hypnotherapy works by neutralising the fear response at the subconscious level — many people experience major relief within 1–3 sessions.', severity: 'high', identified });
    }
    setStage('result');
  };

  const optBtnStyle = (selected: boolean): React.CSSProperties => ({
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    padding: '10px 4px', borderRadius: 12, border: `2px solid ${selected ? 'var(--hf-accent)' : 'rgba(255,255,255,0.08)'}`,
    background: selected ? 'oklch(0.72 0.12 185 / 0.2)' : 'rgba(255,255,255,0.03)',
    color: selected ? 'var(--hf-fg)' : 'var(--hf-fg-dim)', fontSize: 11, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
  });

  const phobiaBtnStyle = (selected: boolean): React.CSSProperties => ({
    textAlign: 'left', padding: '12px 16px', borderRadius: 12,
    border: `2px solid ${selected ? 'var(--hf-accent)' : 'rgba(255,255,255,0.08)'}`,
    background: selected ? 'oklch(0.72 0.12 185 / 0.2)' : 'rgba(255,255,255,0.03)',
    color: selected ? 'var(--hf-fg)' : 'var(--hf-fg-dim)', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
  });

  return (
    <div style={{ maxWidth: 672, margin: '0 auto', padding: '48px 16px' }}>
      {stage === 'phobias' && (
        <div style={{ background: 'var(--hf-bg-mid)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '32px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>Step 1 of 2 — Select Your Fears</h2>
          <p style={{ color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>Select all situations, objects, or experiences that cause you significant fear or anxiety. You can select more than one.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 40 }}>
            {phobias.map((p) => (
              <button key={p.id} type="button" onClick={() => togglePhobia(p.id)} style={phobiaBtnStyle(selectedPhobias.includes(p.id))}>
                {p.label}
              </button>
            ))}
          </div>

          <button type="button" onClick={() => setStage('impact')} className="btn-gradient hf-btn-accent" style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Next: Rate the Impact →
          </button>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--hf-fg-dim)', marginTop: 12 }}>You can also continue with none selected</p>
        </div>
      )}

      {stage === 'impact' && (
        <div style={{ background: 'var(--hf-bg-mid)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '32px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>Step 2 of 2 — Rate the Impact</h2>
          <p style={{ color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>Answer these questions about how your fear{selectedPhobias.length > 0 ? 's affect' : ' affects'} your life.</p>

          <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', fontWeight: 500 }}>{Object.keys(impactAnswers).length} of {impactQuestions.length} answered</p>
            <div style={{ width: 180, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 9999, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--hf-accent)', borderRadius: 9999, width: `${(Object.keys(impactAnswers).length / impactQuestions.length) * 100}%`, transition: 'width 0.3s' }} />
            </div>
          </div>

          {impactQuestions.map((q) => (
            <div key={q.id} style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 12, lineHeight: 1.5 }}>{q.text}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                {impactOptions.map((opt) => (
                  <button key={opt.value} type="button" onClick={() => setImpact(q.id, opt.value)} style={optBtnStyle(impactAnswers[q.id] === opt.value)}>
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

          <button type="button" onClick={calculate} disabled={!allImpactAnswered} className={allImpactAnswered ? 'btn-gradient hf-btn-accent' : ''} style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', color: allImpactAnswered ? '#fff' : 'var(--hf-fg-dim)', background: allImpactAnswered ? undefined : 'rgba(255,255,255,0.05)', fontWeight: 700, fontSize: 16, cursor: allImpactAnswered ? 'pointer' : 'not-allowed', opacity: allImpactAnswered ? 1 : 0.5 }}>
            {allImpactAnswered ? 'See My Results' : `Answer all questions to continue (${impactQuestions.length - Object.keys(impactAnswers).length} remaining)`}
          </button>
        </div>
      )}

      {stage === 'result' && result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="glass-card" style={{ padding: 32, borderLeft: `4px solid ${severityBorderColor[result.severity]}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
              <SeverityIcon s={result.severity} />
              <h2 style={{ fontSize: 24, fontWeight: 800, color: severityTextColor[result.severity], lineHeight: 1.2 }}>{result.headline}</h2>
            </div>

            {result.identified.length > 0 && (
              <div style={{ marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {result.identified.map((name) => (
                  <span key={name} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--hf-fg-dim)', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 9999 }}>
                    {name}
                  </span>
                ))}
              </div>
            )}

            <p style={{ color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 20 }}>{result.body}</p>
            {result.severity !== 'low' && (
              <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Find a Phobia Hypnotherapist <ChevronRight style={{ width: 16, height: 16 }} />
              </Link>
            )}
          </div>

          {result.severity !== 'low' && (
            <div className="glass-card" style={{ padding: 24, borderLeft: '3px solid var(--hf-accent)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>Why Hypnotherapy Works So Well for Phobias</h3>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                Phobias are learned fear responses stored in the subconscious mind — which is exactly where hypnotherapy works. Techniques like the Rewind Technique, systematic desensitisation under hypnosis, and NLP-based approaches can rapidly neutralise the fear response. Many people experience dramatic improvement in as few as 1–3 sessions, making phobia treatment one of hypnotherapy's greatest strengths.
              </p>
            </div>
          )}

          <ShareResult quizName="Phobia Test" resultHeadline={result.headline} url="https://hypnotherapy-finder.com/phobia-test" />

          <button onClick={() => { setStage('phobias'); setSelectedPhobias([]); setImpactAnswers({}); setResult(null); }} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: '8px 0' }}>
            Retake the test
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This test is for informational purposes only and does not constitute a clinical diagnosis. If a phobia is significantly affecting your life, please speak with a qualified healthcare professional.
      </p>
    </div>
  );
}
