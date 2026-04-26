import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SelfEsteemTest from './SelfEsteemTest';

export const metadata: Metadata = {
  title: 'Self-Esteem Test — Do I Have Low Self-Esteem? Free Quiz | Hypnotherapy Finder',
  description: 'Take our free self-esteem test to find out if you have low self-esteem. Answer 12 questions covering self-worth, self-criticism, confidence, and shame. Get your result in 2 minutes.',
  keywords: 'self esteem test, self esteem quiz, low self esteem test, do I have low self esteem, self esteem self assessment, self worth quiz, confidence test',
  alternates: { canonical: 'https://hypnotherapy-finder.com/self-esteem-test' },
  openGraph: {
    title: 'Self-Esteem Test — Do I Have Low Self-Esteem?',
    description: 'Check your self-esteem across 5 dimensions including self-worth, self-criticism, confidence, and shame. Free and anonymous.',
    url: 'https://hypnotherapy-finder.com/self-esteem-test',
    type: 'website',
  },
};

export default function SelfEsteemTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Self-Esteem Test — Do I Have Low Self-Esteem?
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 12 questions across self-worth, self-criticism, confidence, and shame to find out where your self-esteem really stands.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical assessment. All responses are anonymous.
            </p>
          </div>
        </section>
        <SelfEsteemTest />
      </main>
      <Footer />
    </div>
  );
}
