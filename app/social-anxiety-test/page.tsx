import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SocialAnxietyTest from './SocialAnxietyTest';

export const metadata: Metadata = {
  title: 'Social Anxiety Test — Free Online Self-Assessment | Hypnotherapy Finder',
  description: 'Take our free social anxiety test to check for social anxiety disorder symptoms. Answer 12 questions and find out if hypnotherapy could help you feel more confident.',
  keywords: 'social anxiety test, social anxiety disorder test, do I have social anxiety, social anxiety quiz, social anxiety self assessment, social phobia test',
  alternates: { canonical: 'https://hypnotherapy-finder.com/social-anxiety-test' },
  openGraph: {
    title: 'Social Anxiety Test — Free Online Self-Assessment',
    description: 'Check for social anxiety disorder symptoms with our free 12-question test. Get your result and find out if hypnotherapy could help.',
    url: 'https://hypnotherapy-finder.com/social-anxiety-test',
    type: 'website',
  },
};

export default function SocialAnxietyTestPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Free · Anonymous · 2 Minutes</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Social Anxiety Test — Do I Have Social Anxiety?
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Answer 12 questions about fear of judgement, avoidance, and physical symptoms to find out if you may have social anxiety disorder.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis — for guidance only. If social anxiety is severely affecting your life, please speak with a healthcare professional.
            </p>
          </div>
        </section>
        <SocialAnxietyTest />
      </main>
      <Footer />
    </div>
  );
}
