import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import AngerTest from './AngerTest';

export const metadata: Metadata = {
  title: 'Anger Test — Do I Have Anger Issues? Free Self-Assessment',
  description: 'Take our free anger test to find out if you have anger issues. Covers anger frequency, intensity, duration, suppression, hostility, and impact. Get your result in 2 minutes.',
  keywords: 'anger test, anger issues test, anger issues quiz, multidimensional anger test, do I have anger issues, anger self assessment, anger management test',
  alternates: { canonical: 'https://hypnotherapy-finder.com/anger-test' },
  openGraph: {
    title: 'Anger Test — Do I Have Anger Issues?',
    description: 'Check for anger issues across 6 dimensions including frequency, suppression, hostility, and life impact. Free and anonymous.',
    url: 'https://hypnotherapy-finder.com/anger-test',
    type: 'website',
  },
};

export default function AngerTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Anger Test — Do I Have Anger Issues?
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 14 questions across 6 dimensions of anger — including frequency, duration, suppression, hostility, and life impact — to get your personalised anger assessment.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis. All responses are anonymous.
            </p>
          </div>
        </section>
        <AngerTest />
      </main>
      <Footer />
    </div>
  );
}
