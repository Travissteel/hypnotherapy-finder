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
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is claustrophobia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Claustrophobia is a situational phobia triggered by an irrational and intense fear of tight or crowded spaces. It can be triggered by things like elevators, small rooms, tunnels, or crowded areas.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are the common symptoms of claustrophobia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Physical symptoms of claustrophobia include sweating, trembling, rapid heartbeat, shortness of breath, hyperventilation, tightness in the chest, and feeling faint or lightheaded when in small or crowded spaces.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does this claustrophobia test work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our free self-assessment includes 11 questions that evaluate your response to common claustrophobic triggers like lifts, windowless rooms, MRI machines, and crowds. It provides an immediate risk score (Mild, Moderate, or Severe) to help you understand your situation.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can clinical hypnotherapy help with claustrophobia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, clinical hypnotherapy is highly effective for claustrophobia. A certified hypnotherapist can help reframe your subconscious reaction to enclosed spaces, desensitize triggers, and teach breathing and relaxation techniques to prevent panic attacks.'
        }
      }
    ]
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
