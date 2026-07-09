import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import StressCalculator from './StressCalculator';

export const metadata: Metadata = {
  title: 'Free Stress Quiz — How Stressed Am I?',
  description: 'Take our free online stress quiz to find out how stressed you are. Get a personalised stress score in under 2 minutes and discover if hypnotherapy could help.',
  keywords: 'stress quiz, how stressed am I, stress level test, online stress test, stress score calculator, am I stressed quiz',
  alternates: { canonical: 'https://hypnotherapy-finder.com/stress-level-calculator' },
  openGraph: {
    title: 'Free Stress Quiz — How Stressed Am I?',
    description: 'Answer 5 quick questions to get your personalised stress score and find out if hypnotherapy could help.',
    url: 'https://hypnotherapy-finder.com/stress-level-calculator',
    type: 'website',
  },
};

export default function StressLevelCalculatorPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              How Stressed Am I? Free Stress Quiz
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 5 quick questions to get your personalised stress score and find out if hypnotherapy could help you feel calmer and more in control.
            </p>
          </div>
        </section>
        <StressCalculator />
      </main>
      <Footer />
    </div>
  );
}
