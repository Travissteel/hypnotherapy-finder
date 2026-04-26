import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import BurnoutQuiz from './BurnoutQuiz';

export const metadata: Metadata = {
  title: 'Burnout Quiz — Am I Burned Out? Free Test | Hypnotherapy Finder',
  description: 'Take our free burnout quiz to find out if you are experiencing burnout. Answer 13 questions covering emotional exhaustion, cynicism, and reduced effectiveness. Get your result in 2 minutes.',
  keywords: 'burnout quiz, burnout test, am I burned out, burnout self assessment, work burnout quiz, burnout symptoms test, job burnout quiz',
  alternates: { canonical: 'https://hypnotherapy-finder.com/burnout-quiz' },
  openGraph: {
    title: 'Burnout Quiz — Am I Burned Out? Free Test',
    description: 'Find out if you have burnout with our free 13-question quiz covering emotional exhaustion, cynicism, and effectiveness.',
    url: 'https://hypnotherapy-finder.com/burnout-quiz',
    type: 'website',
  },
};

export default function BurnoutQuizPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Burnout Quiz — Am I Burned Out?
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 13 questions about emotional exhaustion, cynicism, and effectiveness to find out if you are experiencing burnout.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis. All responses are anonymous.
            </p>
          </div>
        </section>
        <BurnoutQuiz />
      </main>
      <Footer />
    </div>
  );
}
