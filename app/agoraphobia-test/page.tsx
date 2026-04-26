import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import AgoraphobiaTest from './AgoraphobiaTest';

export const metadata: Metadata = {
  title: 'Agoraphobia Test — Do I Have Agoraphobia? Free Quiz | Hypnotherapy Finder',
  description: 'Take our free agoraphobia test to check for symptoms of fear of public places, open spaces, and crowds. Answer 12 questions and get your personalised result in 2 minutes.',
  keywords: 'agoraphobia test, agoraphobia quiz, do I have agoraphobia, fear of open spaces test, fear of public places quiz, agoraphobia self assessment',
  alternates: { canonical: 'https://hypnotherapy-finder.com/agoraphobia-test' },
  openGraph: {
    title: 'Agoraphobia Test — Do I Have Agoraphobia?',
    description: 'Check for agoraphobia symptoms with our free 12-question test. Anonymous results in 2 minutes.',
    url: 'https://hypnotherapy-finder.com/agoraphobia-test',
    type: 'website',
  },
};

export default function AgoraphobiaTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Agoraphobia Test — Do I Have Agoraphobia?
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 12 questions about your anxiety in public spaces, open areas, and crowded environments to find out if you may have agoraphobia.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis. All responses are anonymous.
            </p>
          </div>
        </section>
        <AgoraphobiaTest />
      </main>
      <Footer />
    </div>
  );
}
