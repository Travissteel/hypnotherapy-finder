import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import DepressionQuiz from './DepressionQuiz';

export const metadata: Metadata = {
  title: 'Free Depression Quiz: Low Mood Self-Check',
  description: 'Take a free depression quiz covering low mood, motivation, sleep, self-talk, and daily impact. Anonymous self-check with guidance in minutes.',
  keywords: 'depression quiz, depression test online, low mood quiz, am i depressed quiz, depression self check, hypnotherapy for depression',
  alternates: { canonical: 'https://hypnotherapy-finder.com/depression-quiz' },
  openGraph: {
    title: 'Free Depression Quiz: Low Mood Self-Check',
    description: 'Answer 12 questions about low mood, motivation, sleep, self-talk, and daily impact. Free, anonymous, and for guidance only.',
    url: 'https://hypnotherapy-finder.com/depression-quiz',
    type: 'website',
  },
};

export default function DepressionQuizPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 3 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Depression Quiz: Check Low Mood, Motivation, and Daily Impact
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 590, margin: '0 auto' }}>
              Answer 12 questions to reflect on mood, interest, energy, sleep, self-talk, and how much these patterns may be affecting everyday life.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              This is not a clinical diagnosis. If you feel unsafe, at risk of self-harm, or unable to function, contact emergency support or a qualified healthcare provider now.
            </p>
          </div>
        </section>
        <DepressionQuiz />
      </main>
      <Footer />
    </div>
  );
}
