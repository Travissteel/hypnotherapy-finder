import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import InsomniaTest from './InsomniaTest';

export const metadata: Metadata = {
  title: 'Insomnia Test — Do I Have Insomnia? Free Quiz | Hypnotherapy Finder',
  description: 'Take our free insomnia test to find out if you have insomnia. Answer 13 questions covering sleep onset, sleep quality, racing thoughts, and daytime impact. Results in 2 minutes.',
  keywords: "insomnia test, insomnia quiz, do I have insomnia quiz, insomnia self assessment, sleep problems test, can't sleep quiz, chronic insomnia test",
  alternates: { canonical: 'https://hypnotherapy-finder.com/insomnia-test' },
  openGraph: {
    title: 'Insomnia Test — Do I Have Insomnia?',
    description: 'Check for insomnia symptoms with our free 13-question test covering sleep quality, bedtime anxiety, and daytime impact.',
    url: 'https://hypnotherapy-finder.com/insomnia-test',
    type: 'website',
  },
};

export default function InsomniaTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Insomnia Test — Do I Have Insomnia?
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 13 questions about your sleep patterns, bedtime anxiety, and daytime functioning to find out if you may be experiencing insomnia.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis. All responses are anonymous.
            </p>
          </div>
        </section>
        <InsomniaTest />
      </main>
      <Footer />
    </div>
  );
}
