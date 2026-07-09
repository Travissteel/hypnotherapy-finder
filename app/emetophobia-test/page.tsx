import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import EmetophobiaTest from './EmetophobiaTest';

export const metadata: Metadata = {
  title: 'Emetophobia Test — Do I Have Emetophobia?',
  description: 'Take our free emetophobia test to check for fear of vomiting. Answer 12 questions covering anxiety about nausea, others being sick, food avoidance, and daily impact.',
  keywords: 'emetophobia test, emetophobia quiz, do I have emetophobia, fear of vomiting test, emetophobia self assessment, fear of being sick quiz',
  alternates: { canonical: 'https://hypnotherapy-finder.com/emetophobia-test' },
  openGraph: {
    title: 'Emetophobia Test — Do I Have Emetophobia?',
    description: 'Check for emetophobia (fear of vomiting) with our free 12-question test. Anonymous results in 2 minutes.',
    url: 'https://hypnotherapy-finder.com/emetophobia-test',
    type: 'website',
  },
};

export default function EmetophobiaTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Emetophobia Test — Do I Have Emetophobia?
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 12 questions about your fear of vomiting and nausea to find out if you may have emetophobia — one of the most common, yet least talked-about phobias.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis. All responses are anonymous.
            </p>
          </div>
        </section>
        <EmetophobiaTest />
      </main>
      <Footer />
    </div>
  );
}
