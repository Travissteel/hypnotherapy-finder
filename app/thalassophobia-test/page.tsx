import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import ThalassophobiaTest from './ThalassophobiaTest';

export const metadata: Metadata = {
  title: 'Thalassophobia Test — Do I Have Thalassophobia? | Hypnotherapy Finder',
  description: 'Take our free thalassophobia test to find out if you have a fear of deep water. Answer 12 questions about your response to the ocean, lakes, and deep water. Free and anonymous.',
  keywords: 'thalassophobia test, thalassophobia quiz, do I have thalassophobia, fear of deep water test, fear of the ocean quiz, thalassophobia self assessment',
  alternates: { canonical: 'https://hypnotherapy-finder.com/thalassophobia-test' },
  openGraph: {
    title: 'Thalassophobia Test — Do I Have a Fear of Deep Water?',
    description: 'Check for thalassophobia symptoms with our free 12-question test. Anonymous results in under 2 minutes.',
    url: 'https://hypnotherapy-finder.com/thalassophobia-test',
    type: 'website',
  },
};

export default function ThalassophobiaTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Thalassophobia Test — Fear of Deep Water
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 12 questions to find out if you have thalassophobia — an intense fear of deep bodies of water, the ocean, or what lies beneath the surface.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis. All responses are anonymous.
            </p>
          </div>
        </section>
        <ThalassophobiaTest />
      </main>
      <Footer />
    </div>
  );
}
