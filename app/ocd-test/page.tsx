import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import OCDTest from './OCDTest';

export const metadata: Metadata = {
  title: 'OCD Test — Do I Have OCD? Free Self-Assessment',
  description: 'Take our free OCD test to check for symptoms of obsessive-compulsive disorder, including Pure O. Answer 14 questions and get your personalised result in under 3 minutes.',
  keywords: 'ocd test, do I have ocd quiz, do i have ocd test, ocd self assessment, ocd symptoms test, pure o ocd test, obsessive compulsive disorder test, ocd quiz online',
  alternates: { canonical: 'https://hypnotherapy-finder.com/ocd-test' },
  openGraph: {
    title: 'OCD Test — Do I Have OCD? Free Self-Assessment',
    description: 'Check for OCD symptoms including Pure O with our free 14-question test. Anonymous results in under 3 minutes.',
    url: 'https://hypnotherapy-finder.com/ocd-test',
    type: 'website',
  },
};

export default function OCDTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 3 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              OCD Test — Do I Have OCD?
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 14 questions covering obsessions, compulsions, and the often-overlooked Pure O — to find out if you may have obsessive-compulsive disorder.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis. All responses are anonymous. If you are in distress, please contact a mental health professional.
            </p>
          </div>
        </section>
        <OCDTest />
      </main>
      <Footer />
    </div>
  );
}
