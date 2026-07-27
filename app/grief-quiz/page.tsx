import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import GriefQuiz from './GriefQuiz';

export const metadata: Metadata = {
  title: 'Grief Quiz — Check Bereavement Support Needs',
  description: 'Take a free grief quiz covering sleep, emotional waves, guilt, triggers, connection, and daily functioning after loss. Anonymous guidance in under 3 minutes.',
  keywords: 'grief quiz, bereavement quiz, complicated grief quiz, grief self assessment, hypnotherapy for grief, grief support quiz',
  alternates: { canonical: 'https://hypnotherapy-finder.com/grief-quiz' },
  openGraph: {
    title: 'Grief Quiz — Check Bereavement Support Needs',
    description: 'Answer 10 questions about grief waves, sleep, guilt, triggers, connection, and daily functioning. Free, anonymous, and not a diagnosis.',
    url: 'https://hypnotherapy-finder.com/grief-quiz',
    type: 'website',
  },
};

export default function GriefQuizPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 3 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Grief Quiz — Check Bereavement Support Needs
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 600, margin: '0 auto' }}>
              Answer 10 questions about grief waves, sleep, guilt, reminders, connection, and daily functioning after loss.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16, lineHeight: 1.6 }}>
              This is not a clinical diagnosis. If you feel unsafe or at risk of harming yourself, contact urgent local crisis support now.
            </p>
          </div>
        </section>
        <GriefQuiz />
      </main>
      <Footer />
    </div>
  );
}
