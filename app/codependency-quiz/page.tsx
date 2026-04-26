import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CodependencyQuiz from './CodependencyQuiz';

export const metadata: Metadata = {
  title: 'Codependency Quiz — Am I Codependent? Free Test | Hypnotherapy Finder',
  description: 'Take our free codependency quiz to find out if you are codependent. Answer 12 questions covering caretaking, control, loss of self, fear of abandonment, and resentment.',
  keywords: 'codependency quiz, codependency test, am I codependent, codependency self assessment, codependent relationship quiz, signs of codependency quiz',
  alternates: { canonical: 'https://hypnotherapy-finder.com/codependency-quiz' },
  openGraph: {
    title: 'Codependency Quiz — Am I Codependent?',
    description: 'Check for codependency across 5 dimensions including caretaking, loss of self, and fear of abandonment. Free and anonymous.',
    url: 'https://hypnotherapy-finder.com/codependency-quiz',
    type: 'website',
  },
};

export default function CodependencyQuizPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Codependency Quiz — Am I Codependent?
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 12 questions about caretaking, control, loss of self, and fear of abandonment to find out if you have codependent relationship patterns.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical assessment. All responses are anonymous.
            </p>
          </div>
        </section>
        <CodependencyQuiz />
      </main>
      <Footer />
    </div>
  );
}
