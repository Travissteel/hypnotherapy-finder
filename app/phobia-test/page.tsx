import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import PhobiaTest from './PhobiaTest';

export const metadata: Metadata = {
  title: 'Phobia Test — Do I Have a Phobia? Free Online Quiz',
  description: 'Take our free phobia test to find out if you have a phobia. Covers 16 common phobias including spiders, heights, flying, enclosed spaces, and more. Get your result in 2 minutes.',
  keywords: 'phobia test, phobia quiz, do I have a phobia, phobia self assessment, specific phobia test, list of phobias test, phobia symptoms quiz',
  alternates: { canonical: 'https://hypnotherapy-finder.com/phobia-test' },
  openGraph: {
    title: 'Phobia Test — Do I Have a Phobia? Free Online Quiz',
    description: 'Check for 16 common phobias with our free two-step phobia test. Anonymous results in under 2 minutes.',
    url: 'https://hypnotherapy-finder.com/phobia-test',
    type: 'website',
  },
};

export default function PhobiaTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Phobia Test — Do I Have a Phobia?
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              This two-step test checks for 16 of the most common phobias and measures how much your fear is affecting your daily life.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis. All responses are anonymous.
            </p>
          </div>
        </section>
        <PhobiaTest />
      </main>
      <Footer />
    </div>
  );
}
