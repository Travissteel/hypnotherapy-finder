import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import DepressionQuiz from './DepressionQuiz';

export const metadata: Metadata = {
  title: 'Depression Quiz — Free Anonymous Self-Check',
  description: 'Take a free depression quiz covering low mood, motivation, sleep, self-talk, and daily impact. Anonymous, informational, and not a diagnosis.',
  keywords: 'depression quiz, depression test, am I depressed quiz, depression self assessment, low mood quiz, depression symptoms quiz',
  alternates: { canonical: 'https://hypnotherapy-finder.com/depression-quiz' },
  openGraph: {
    title: 'Depression Quiz — Free Anonymous Self-Check',
    description: 'Check patterns around low mood, motivation, sleep, self-talk, and daily functioning. Informational only — not a clinical diagnosis.',
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
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Depression Quiz — Free Self-Check
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 590, margin: '0 auto' }}>
              Answer 12 questions about mood, motivation, sleep, self-talk, and daily functioning to reflect on whether low mood may be affecting your life.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis. If you feel at risk of harming yourself or someone else, seek urgent local support now.
            </p>
          </div>
        </section>
        <DepressionQuiz />
      </main>
      <Footer />
    </div>
  );
}
