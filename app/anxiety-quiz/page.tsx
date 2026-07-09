import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import AnxietyQuiz from './AnxietyQuiz';

export const metadata: Metadata = {
  title: 'Do I Have Anxiety? Free Anxiety Quiz',
  description: 'Take our free anxiety quiz to find out if you have anxiety. Answer 12 questions covering worry, physical symptoms, and daily impact. Get your result in under 2 minutes.',
  keywords: 'do i have anxiety quiz, anxiety quiz, anxiety test online, am I anxious, anxiety self assessment, anxiety symptoms quiz, hypnotherapy for anxiety',
  alternates: { canonical: 'https://hypnotherapy-finder.com/anxiety-quiz' },
  openGraph: {
    title: 'Do I Have Anxiety? Free Anxiety Quiz',
    description: 'Answer 12 questions to find out if you have anxiety and whether hypnotherapy could help. Free and anonymous.',
    url: 'https://hypnotherapy-finder.com/anxiety-quiz',
    type: 'website',
  },
};

export default function AnxietyQuizPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Do I Have Anxiety? Take the Free Quiz
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 12 questions about your worry patterns, physical symptoms, and daily life to find out if you may be experiencing anxiety.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis — for guidance only. If you are in crisis, please contact a mental health professional.
            </p>
          </div>
        </section>
        <AnxietyQuiz />
      </main>
      <Footer />
    </div>
  );
}
