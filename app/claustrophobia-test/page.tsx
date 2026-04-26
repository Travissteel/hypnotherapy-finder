import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ClaustrophobiaTest from './ClaustrophobiaTest';

export const metadata: Metadata = {
  title: 'Claustrophobia Test — Do I Have Claustrophobia? | Hypnotherapy Finder',
  description: 'Take our free claustrophobia test to check for fear of enclosed spaces. Answer 11 questions covering lifts, tunnels, crowds, and small rooms. Get your result in under 2 minutes.',
  keywords: 'claustrophobia test, claustrophobia quiz, do I have claustrophobia, fear of enclosed spaces test, fear of small spaces quiz, claustrophobia self assessment',
  alternates: { canonical: 'https://hypnotherapy-finder.com/claustrophobia-test' },
  openGraph: {
    title: 'Claustrophobia Test — Do I Have Claustrophobia?',
    description: 'Check for claustrophobia with our free 11-question test covering lifts, tunnels, and enclosed spaces.',
    url: 'https://hypnotherapy-finder.com/claustrophobia-test',
    type: 'website',
  },
};

export default function ClaustrophobiaTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Claustrophobia Test — Do I Have Claustrophobia?
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 11 questions about your response to lifts, tunnels, small rooms, and crowded spaces to find out if you may have claustrophobia.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis. All responses are anonymous.
            </p>
          </div>
        </section>
        <ClaustrophobiaTest />
      </main>
      <Footer />
    </div>
  );
}
