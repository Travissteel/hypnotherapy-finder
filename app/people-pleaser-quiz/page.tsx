import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import PeoplePleaserQuiz from './PeoplePleaserQuiz';

export const metadata: Metadata = {
  title: 'Am I a People Pleaser? Free Quiz',
  description: 'Take our free people pleaser quiz to find out if you are a people pleaser. Answer 12 questions about saying no, approval seeking, putting others first, and resentment.',
  keywords: 'am I a people pleaser quiz, people pleaser quiz, people pleaser test, people pleasing self assessment, do I people please, am I a people pleaser',
  alternates: { canonical: 'https://hypnotherapy-finder.com/people-pleaser-quiz' },
  openGraph: {
    title: 'Am I a People Pleaser? Free Quiz',
    description: 'Find out if you are a people pleaser with our free 12-question quiz covering boundaries, approval seeking, and resentment.',
    url: 'https://hypnotherapy-finder.com/people-pleaser-quiz',
    type: 'website',
  },
};

export default function PeoplePleaserQuizPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Am I a People Pleaser? Free Quiz
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 12 questions about how you handle saying no, seeking approval, and putting others first to find out if you have people-pleasing tendencies.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical assessment. All responses are anonymous.
            </p>
          </div>
        </section>
        <PeoplePleaserQuiz />
      </main>
      <Footer />
    </div>
  );
}
