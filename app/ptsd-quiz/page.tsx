import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import PTSDQuiz from './PTSDQuiz';

export const metadata: Metadata = {
  title: 'PTSD Quiz — Do I Have PTSD? Free Self-Assessment',
  description: 'Take our free PTSD quiz to check for symptoms of PTSD and Complex PTSD. Answer 13 questions and get a personalised result. Not a diagnosis — for guidance only.',
  keywords: 'ptsd quiz, do I have ptsd quiz, complex ptsd quiz, ptsd self assessment, ptsd test online, ptsd symptoms checklist, c-ptsd quiz',
  alternates: { canonical: 'https://hypnotherapy-finder.com/ptsd-quiz' },
  openGraph: {
    title: 'PTSD Quiz — Do I Have PTSD? Free Self-Assessment',
    description: 'Answer 13 questions to check for symptoms of PTSD and Complex PTSD. Free, anonymous, and takes under 3 minutes.',
    url: 'https://hypnotherapy-finder.com/ptsd-quiz',
    type: 'website',
  },
};

export default function PTSDQuizPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 3 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Do I Have PTSD? Take the Free Quiz
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              This self-assessment covers symptoms of both PTSD and Complex PTSD (C-PTSD). Answer honestly — there are no right or wrong answers.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              This quiz is not a clinical diagnosis. If you are in crisis, please contact a mental health professional immediately.
            </p>
          </div>
        </section>
        <PTSDQuiz />
      </main>
      <Footer />
    </div>
  );
}
