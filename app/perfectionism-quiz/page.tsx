import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import PerfectionismQuiz from './PerfectionismQuiz';

export const metadata: Metadata = {
  title: 'Perfectionism Quiz: Free Self-Check',
  description: 'Take a free perfectionism quiz covering over-preparing, fear of mistakes, procrastination, reassurance loops, and self-criticism. Anonymous guidance only.',
  keywords: 'perfectionism quiz, perfectionism test, am i a perfectionist quiz, perfectionist test, fear of mistakes quiz, hypnotherapy for perfectionism',
  alternates: { canonical: 'https://hypnotherapy-finder.com/perfectionism-quiz' },
  openGraph: {
    title: 'Perfectionism Quiz: Free Self-Check',
    description: 'Check patterns around over-preparing, fear of mistakes, procrastination, reassurance seeking, and harsh self-talk. Free and anonymous.',
    url: 'https://hypnotherapy-finder.com/perfectionism-quiz',
    type: 'website',
  },
};

export default function PerfectionismQuizPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 740, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 3 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Perfectionism Quiz: Check Fear of Mistakes, Over-Preparing, and Self-Criticism
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 620, margin: '0 auto' }}>
              Answer 12 questions to reflect on high standards, avoidance, reassurance loops, procrastination, and the pressure to get everything exactly right.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              This is not a clinical diagnosis. If perfectionism is linked with panic, depression, trauma, compulsions, or self-harm thoughts, speak with a qualified healthcare provider.
            </p>
          </div>
        </section>
        <PerfectionismQuiz />
      </main>
      <Footer />
    </div>
  );
}
