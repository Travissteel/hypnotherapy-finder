import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import HealthAnxietyTest from './HealthAnxietyTest';

export const metadata: Metadata = {
  title: 'Health Anxiety Test — Free Anonymous Self-Check',
  description: 'Take a free health anxiety test covering symptom checking, reassurance seeking, scan worry, body monitoring, and daily impact. Informational only.',
  keywords: 'health anxiety test, illness anxiety test, hypochondria test, health anxiety quiz, symptom anxiety test, body checking anxiety',
  alternates: { canonical: 'https://hypnotherapy-finder.com/health-anxiety-test' },
  openGraph: {
    title: 'Health Anxiety Test — Free Anonymous Self-Check',
    description: 'Check patterns around body monitoring, symptom worry, reassurance seeking, appointment anxiety, and daily disruption. Not a clinical diagnosis.',
    url: 'https://hypnotherapy-finder.com/health-anxiety-test',
    type: 'website',
  },
};

export default function HealthAnxietyTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 740, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Health Anxiety Test — Free Self-Check
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 610, margin: '0 auto' }}>
              Answer 12 questions about symptom worry, body scanning, reassurance loops, online searching, appointment anxiety, and daily impact.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis. If symptoms are new, severe, changing, or worrying, consult a qualified healthcare provider.
            </p>
          </div>
        </section>
        <HealthAnxietyTest />
      </main>
      <Footer />
    </div>
  );
}
