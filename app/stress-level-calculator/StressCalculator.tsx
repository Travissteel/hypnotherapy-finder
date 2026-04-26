'use client';
import { ShareResult } from '@/components/quiz/ShareResult';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, Activity } from 'lucide-react';

export default function StressCalculator() {
  const [events, setEvents] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [workHours, setWorkHours] = useState('');
  const [emotionalState, setEmotionalState] = useState('');
  const [socialSupport, setSocialSupport] = useState('');
  const [result, setResult] = useState<{ level: string; score: number; recommendation: string; cta: boolean } | null>(null);

  const symptomOptions = [
    { value: '0', label: 'None' },
    { value: '2', label: 'Headaches' },
    { value: '2', label: 'Tension' },
    { value: '3', label: 'Fatigue' },
    { value: '3', label: 'Irritability' },
  ];

  const toggleSymptom = (value: string, label: string) => {
    const key = `${value}:${label}`;
    setSymptoms((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  const calculateStress = () => {
    const eventsNum = parseInt(events) || 0;
    const symptomsScore = symptoms.reduce((total, s) => total + parseInt(s.split(':')[0]), 0);
    const workHoursNum = parseInt(workHours) || 0;
    const emotionalNum = parseInt(emotionalState) || 5;
    const socialNum = parseInt(socialSupport) || 5;

    const score =
      eventsNum * 2 +
      symptomsScore +
      (workHoursNum > 8 ? (workHoursNum - 8) * 3 : 0) +
      (10 - emotionalNum) +
      (10 - socialNum);

    if (score < 15) {
      setResult({
        level: 'Low Stress',
        score,
        recommendation:
          'Your stress levels are manageable. Continue practising self-care and maintaining healthy boundaries. Hypnotherapy can be a great preventive tool to build resilience.',
        cta: false,
      });
    } else if (score < 25) {
      setResult({
        level: 'Moderate Stress',
        score,
        recommendation:
          'You are experiencing noticeable stress. Relaxation techniques like hypnotherapy, meditation, and breathwork can make a significant difference. Consider speaking with a hypnotherapist to develop personalised coping strategies.',
        cta: true,
      });
    } else {
      setResult({
        level: 'High Stress',
        score,
        recommendation:
          'Your stress levels are elevated and may be affecting your health and wellbeing. Speaking with a qualified hypnotherapist can help you address the root causes and develop effective relief strategies.',
        cta: true,
      });
    }
  };

  const levelBorderColor = (level: string) => {
    if (level === 'Low Stress') return 'oklch(0.7 0.15 145)';
    if (level === 'Moderate Stress') return 'oklch(0.75 0.15 60)';
    return 'oklch(0.65 0.2 20)';
  };
  const levelTextColor = (level: string) => levelBorderColor(level);

  const LevelIcon = ({ level }: { level: string }) => {
    if (level === 'Low Stress') return <CheckCircle style={{ width: 28, height: 28, color: levelTextColor(level), flexShrink: 0 }} />;
    if (level === 'Moderate Stress') return <Activity style={{ width: 28, height: 28, color: levelTextColor(level), flexShrink: 0 }} />;
    return <AlertTriangle style={{ width: 28, height: 28, color: levelTextColor(level), flexShrink: 0 }} />;
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: '2px solid rgba(255,255,255,0.1)',
    borderRadius: 12, padding: '12px 16px', color: 'var(--hf-fg)', fontSize: 15, outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', color: 'var(--hf-fg)', fontWeight: 600, marginBottom: 8, fontSize: 15,
  };

  const pillStyle = (selected: boolean): React.CSSProperties => ({
    padding: '8px 16px', borderRadius: 9999,
    border: `2px solid ${selected ? 'var(--hf-accent)' : 'rgba(255,255,255,0.1)'}`,
    background: selected ? 'oklch(0.72 0.12 185 / 0.2)' : 'rgba(255,255,255,0.03)',
    color: selected ? 'var(--hf-fg)' : 'var(--hf-fg-dim)', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
  });

  return (
    <div style={{ maxWidth: 672, margin: '0 auto', padding: '48px 16px' }}>
      <div style={{ background: 'var(--hf-bg-mid)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '32px' }}>

        <div style={{ marginBottom: 32 }}>
          <label style={labelStyle}>1. How many stressful events have you experienced in the past month?</label>
          <input type="number" min="0" value={events} onChange={(e) => setEvents(e.target.value)} placeholder="e.g. 3" style={inputStyle} />
        </div>

        <div style={{ marginBottom: 32 }}>
          <label style={labelStyle}>2. Which physical symptoms are you currently experiencing?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {symptomOptions.map((opt) => {
              const key = `${opt.value}:${opt.label}`;
              const selected = symptoms.includes(key);
              return (
                <button key={key} type="button" onClick={() => toggleSymptom(opt.value, opt.label)} style={pillStyle(selected)}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <label style={labelStyle}>3. How many hours per day do you spend on work-related tasks?</label>
          <input type="number" min="0" max="24" value={workHours} onChange={(e) => setWorkHours(e.target.value)} placeholder="e.g. 9" style={inputStyle} />
        </div>

        <div style={{ marginBottom: 32 }}>
          <label style={labelStyle}>4. Rate your current emotional state (1 = very low, 10 = excellent)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>1</span>
            <input type="range" min="1" max="10" value={emotionalState || 5} onChange={(e) => setEmotionalState(e.target.value)} style={{ flex: 1, accentColor: 'var(--hf-accent)' }} />
            <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>10</span>
            <span style={{ width: 32, textAlign: 'center', fontWeight: 700, color: 'var(--hf-accent)', fontSize: 15 }}>{emotionalState || 5}</span>
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <label style={labelStyle}>5. Rate your level of social support (1 = very little, 10 = strong network)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>1</span>
            <input type="range" min="1" max="10" value={socialSupport || 5} onChange={(e) => setSocialSupport(e.target.value)} style={{ flex: 1, accentColor: 'var(--hf-accent)' }} />
            <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>10</span>
            <span style={{ width: 32, textAlign: 'center', fontWeight: 700, color: 'var(--hf-accent)', fontSize: 15 }}>{socialSupport || 5}</span>
          </div>
        </div>

        <button type="button" onClick={calculateStress} className="btn-gradient hf-btn-accent" style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
          Calculate My Stress Level
        </button>

        {result && (
          <div style={{ marginTop: 32 }}>
            <div className="glass-card" style={{ padding: 28, borderLeft: `4px solid ${levelBorderColor(result.level)}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 12 }}>
                <LevelIcon level={result.level} />
                <h2 style={{ fontSize: 24, fontWeight: 800, color: levelTextColor(result.level), lineHeight: 1.2 }}>{result.level}</h2>
              </div>
              <p style={{ color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: result.cta ? 20 : 0 }}>{result.recommendation}</p>
              {result.cta && (
                <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  Find a Hypnotherapist Near You →
                </Link>
              )}
              <div style={{ marginTop: 24 }}>
                <ShareResult quizName="Stress Level Calculator" resultHeadline={result.level} url="https://hypnotherapy-finder.com/stress-level-calculator" />
              </div>
            </div>
          </div>
        )}
      </div>

      <p style={{ textAlign: 'center', fontSize: 11, color: 'oklch(0.45 0 0)', marginTop: 32, lineHeight: 1.5 }}>
        This tool is for informational purposes only and is not a clinical diagnosis. If you are in distress, please contact a qualified healthcare professional.
      </p>
    </div>
  );
}
