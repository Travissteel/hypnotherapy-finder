import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import HypnosisSuitabilityQuiz from './HypnosisSuitabilityQuiz';

export const metadata: Metadata = {
  title: 'Is Hypnosis Right for Me? Free Suitability Quiz',
  description: 'Take the free hypnosis suitability quiz to see whether hypnotherapy may fit your goals, expectations, comfort level, and support needs.',
  keywords: 'is hypnosis right for me, hypnosis suitability quiz, hypnotherapy quiz, am I a good candidate for hypnosis, should I try hypnotherapy',
  alternates: { canonical: 'https://hypnotherapy-finder.com/hypnosis-suitability-quiz' },
  openGraph: {
    title: 'Is Hypnosis Right for Me? Free Suitability Quiz',
    description: 'Answer 10 questions about your goals, expectations, and comfort level to see whether hypnotherapy may be a good fit.',
    url: 'https://hypnotherapy-finder.com/hypnosis-suitability-quiz',
    type: 'website',
  },
};

export default function HypnosisSuitabilityQuizPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Is Hypnosis Right for Me?
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 580, margin: '0 auto' }}>
              Answer 10 questions about your goals, expectations, comfort level, and readiness to see whether hypnotherapy may be a sensible next step.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis or treatment recommendation — for guidance only.
            </p>
          </div>
        </section>
        <HypnosisSuitabilityQuiz />
      </main>
      <Footer />
    </div>
  );
}
