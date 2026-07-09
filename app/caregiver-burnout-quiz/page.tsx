import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CaregiverBurnoutQuiz from './CaregiverBurnoutQuiz';

export const metadata: Metadata = {
  title: 'Caregiver Burnout Quiz — Free Self-Assessment',
  description: 'Take our free caregiver burnout quiz to find out if you are experiencing caregiver burnout. Answer 12 questions about exhaustion, guilt, isolation, and self-neglect. Anonymous and takes 2 minutes.',
  keywords: 'caregiver burnout quiz, caregiver burnout test, caregiver stress quiz, carer burnout assessment, caregiver exhaustion quiz, am I a burned out caregiver',
  alternates: { canonical: 'https://hypnotherapy-finder.com/caregiver-burnout-quiz' },
  openGraph: {
    title: 'Caregiver Burnout Quiz — Free Self-Assessment',
    description: 'Are you a burned out caregiver? Take our free 12-question quiz covering exhaustion, guilt, isolation, and self-neglect.',
    url: 'https://hypnotherapy-finder.com/caregiver-burnout-quiz',
    type: 'website',
  },
};

export default function CaregiverBurnoutQuizPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is caregiver burnout?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Caregiver burnout is a state of physical, emotional, and mental exhaustion. It can occur when caregivers do not get the support they need, leading to fatigue, anxiety, and depression.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are the signs of caregiver burnout?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Common signs include withdrawal from friends and family, loss of interest in activities, feeling blue or hopeless, changes in sleep patterns, getting sick more often, and feeling like you want to hurt yourself or the person you care for.'
        }
      },
      {
        '@type': 'Question',
        name: 'How is the caregiver burnout quiz scored?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our free assessment evaluates 12 areas of self-care, exhaustion, and emotional health. Your answers provide an immediate risk score (Low, Moderate, or High) to help you understand your current level of strain.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can hypnotherapy help with caregiver burnout?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, clinical hypnotherapy can help caregivers manage chronic stress, reduce anxiety, process feelings of guilt or resentment, and learn deep relaxation techniques to restore their emotional resilience.'
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
              Caregiver Burnout Quiz
            </h1>
            <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, maxWidth: 560, margin: '0 auto' }}>
              Caring for a loved one is one of the hardest things a person can do. Answer 12 honest questions to find out if you are experiencing caregiver burnout.
            </p>
            <p style={{ fontSize: 12, color: 'oklch(0.55 0 0)', marginTop: 16 }}>
              Not a clinical diagnosis. Your responses are completely anonymous.
            </p>
          </div>
        </section>
        <CaregiverBurnoutQuiz />
      </main>
      <Footer />
    </div>
  );
}
