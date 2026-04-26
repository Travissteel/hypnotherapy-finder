import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Brain, Clock, Heart, Shield, Sparkles, Target } from 'lucide-react';

export const metadata = {
  title: 'How Hypnotherapy Works | Science Guide',
  description: 'Learn how hypnotherapy works, what to expect in a session, and how it helps with anxiety, weight loss, smoking cessation, and more.',
  keywords: 'how does hypnotherapy work, what is hypnotherapy, hypnosis therapy, clinical hypnotherapy',
  alternates: { canonical: 'https://hypnotherapy-finder.com/how-it-works' },
  openGraph: {
    title: 'How Hypnotherapy Works - Complete Guide',
    description: 'Understand the science behind hypnotherapy and what happens during a session.',
    url: 'https://hypnotherapy-finder.com/how-it-works',
    type: 'article',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'How Hypnotherapy Works' }],
  },
};

export default function HowItWorksPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How Hypnotherapy Works',
    description: 'Step-by-step explanation of how hypnotherapy works.',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Initial Consultation', text: 'Your hypnotherapist discusses your goals, medical history, and explains the hypnotherapy process.' },
      { '@type': 'HowToStep', position: 2, name: 'Induction Phase', text: 'Through guided relaxation techniques, your hypnotherapist helps you enter a focused, relaxed state.' },
      { '@type': 'HowToStep', position: 3, name: 'Therapeutic Suggestion', text: 'In this receptive state, your hypnotherapist uses specific suggestions and imagery to help address your concerns.' },
      { '@type': 'HowToStep', position: 4, name: 'Emergence and Discussion', text: 'Your hypnotherapist gently guides you back to full alertness and you discuss your experience.' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How does hypnotherapy work?', acceptedAnswer: { '@type': 'Answer', text: 'Hypnotherapy works by guiding you into a deeply relaxed, focused state where your subconscious mind becomes more receptive to positive suggestions.' } },
      { '@type': 'Question', name: 'What happens during a hypnotherapy session?', acceptedAnswer: { '@type': 'Answer', text: 'A typical hypnotherapy session lasts 60-90 minutes. Your hypnotherapist starts with a discussion of your goals, then guides you into a relaxed state.' } },
      { '@type': 'Question', name: 'Is hypnotherapy scientifically proven?', acceptedAnswer: { '@type': 'Answer', text: "Yes, research supports hypnotherapy's effectiveness for various conditions." } },
      { '@type': 'Question', name: 'Will I be in control during hypnotherapy?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, you remain in complete control during hypnotherapy.' } },
    ],
  };

  const scienceCards = [
    { icon: Brain, title: 'Brain Activity', desc: 'Brain imaging shows hypnosis creates unique patterns of activity, particularly in areas controlling attention, emotion, and body awareness.' },
    { icon: Target, title: 'Neuroplasticity', desc: "Hypnotherapy leverages your brain's ability to rewire itself, creating new neural pathways that support healthier thoughts and behaviors." },
    { icon: Heart, title: 'Mind-Body Connection', desc: 'Research shows hypnosis can influence physical processes like pain perception, immune function, and stress response.' },
    { icon: Shield, title: 'Evidence-Based', desc: 'Hundreds of peer-reviewed studies support the effectiveness of hypnotherapy for various conditions and goals.' },
  ];

  const steps = [
    { n: '01', title: 'Initial Consultation', time: '15–30 min', desc: "Your hypnotherapist will discuss your goals, medical history, and what you hope to achieve. They'll explain the process and answer any questions." },
    { n: '02', title: 'Induction', time: '5–10 min', desc: "You'll be guided into a relaxed, focused state through breathing exercises, visualization, or progressive relaxation. You remain fully aware and in control." },
    { n: '03', title: 'Therapeutic Work', time: '20–40 min', desc: 'Your hypnotherapist uses various techniques tailored to your goals: positive suggestions, visualization, regression, or other evidence-based methods.' },
    { n: '04', title: 'Emergence', time: '5 min', desc: "You're gently guided back to full alertness. Most people feel relaxed, refreshed, and energized after a session." },
    { n: '05', title: 'Discussion & Plan', time: '5–10 min', desc: 'Your hypnotherapist discusses the session, provides self-hypnosis techniques you can practice at home, and plans next steps if needed.' },
  ];

  return (
    <>
      <Script id="schema-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} strategy="beforeInteractive" />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} strategy="beforeInteractive" />

      <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1, paddingTop: 80 }}>
          {/* Hero */}
          <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 56px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Science Guide</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
                How Hypnotherapy Works
              </h1>
              <p style={{ fontSize: 18, color: 'var(--hf-fg-dim)', lineHeight: 1.65 }}>
                Understanding the science, process, and benefits of clinical hypnotherapy
              </p>
            </div>
          </section>

          {/* What is Hypnotherapy */}
          <section style={{ padding: '64px 24px' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What is Hypnotherapy?</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16, fontWeight: 300 }}>
                Hypnotherapy is a therapeutic technique that uses guided relaxation, intense concentration, and focused attention to achieve a heightened state of awareness, often called a trance. This natural state allows you to focus your mind in a way that makes you more open to suggestions and positive change.
              </p>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 24, fontWeight: 300 }}>
                Unlike stage hypnosis (which is entertainment), clinical hypnotherapy is a recognized therapeutic approach used by trained professionals to help people overcome challenges, change unwanted behaviors, and improve their wellbeing.
              </p>
              <div className="glass-card" style={{ padding: '24px 28px', borderLeft: '3px solid var(--hf-accent)' }}>
                <p style={{ fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 8 }}>Important to Know:</p>
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, fontWeight: 300 }}>
                  You are always in control during hypnotherapy. You cannot be made to do anything against your will or values. You remain aware and can choose to accept or reject any suggestions given.
                </p>
              </div>
            </div>
          </section>

          {/* The Science */}
          <section style={{ padding: '0 24px 64px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', paddingTop: 64 }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 40 }}>The Science Behind Hypnotherapy</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                {scienceCards.map((card) => (
                  <div key={card.title} className="glass-card" style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{ padding: 10, background: 'oklch(0.72 0.12 185 / 0.12)', borderRadius: 12, flexShrink: 0 }}>
                        <card.icon style={{ width: 22, height: 22, color: 'var(--hf-accent)' }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 8 }}>{card.title}</h3>
                        <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.65, fontWeight: 300 }}>{card.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The Process */}
          <section style={{ padding: '64px 24px' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 40 }}>What to Expect in a Session</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {steps.map((step) => (
                  <div key={step.n} className="glass-card" style={{ padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', background: 'oklch(0.72 0.12 185 / 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--hf-accent)', fontVariantNumeric: 'tabular-nums' }}>{step.n}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--hf-fg)' }}>{step.title}</h3>
                        <span style={{ fontSize: 11, color: 'var(--hf-accent)', background: 'oklch(0.72 0.12 185 / 0.1)', padding: '2px 8px', borderRadius: 9999 }}>{step.time}</span>
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.65, fontWeight: 300 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass-card" style={{ padding: '20px 24px', marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--hf-fg-dim)' }}>
                  <Clock style={{ width: 16, height: 16, color: 'var(--hf-accent)' }} />
                  <strong style={{ color: 'var(--hf-fg)', fontWeight: 600 }}>Session length:</strong> 60–90 minutes
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--hf-fg-dim)' }}>
                  <Sparkles style={{ width: 16, height: 16, color: 'var(--hf-accent)' }} />
                  <strong style={{ color: 'var(--hf-fg)', fontWeight: 600 }}>Sessions needed:</strong> 1–10 depending on goals
                </span>
              </div>
            </div>
          </section>

          {/* What Can It Help With */}
          <section style={{ padding: '0 24px 64px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ maxWidth: 760, margin: '0 auto', paddingTop: 64 }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 40 }}>What Can Hypnotherapy Help With?</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                {[
                  { title: 'Common Uses', items: ['Anxiety and stress management', 'Weight loss and healthy eating habits', 'Smoking cessation', 'Phobias and fears', 'Insomnia and sleep disorders', 'Pain management'] },
                  { title: 'Also Helps With', items: ['PTSD and trauma recovery', 'Confidence and self-esteem', 'Sports and performance enhancement', 'Breaking unwanted habits', 'Irritable bowel syndrome (IBS)', 'Childbirth preparation'] },
                ].map((col) => (
                  <div key={col.title} className="glass-card" style={{ padding: '28px' }}>
                    <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>{col.title}</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {col.items.map((item) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.5 }}>
                          <span style={{ color: 'var(--hf-accent)', flexShrink: 0, marginTop: 2 }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '64px 24px 80px' }}>
            <div className="glass-card" style={{ maxWidth: 700, margin: '0 auto', padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -80, right: -80, width: 240, height: 240, background: 'var(--hf-accent)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.07 }} />
              <h2 className="font-serif-display" style={{ fontSize: 30, color: 'var(--hf-fg)', marginBottom: 12 }}>Ready to Experience Hypnotherapy?</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>
                Find a certified hypnotherapist in your area and take the first step toward positive change.
              </p>
              <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-block', padding: '14px 36px', borderRadius: 9999, color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                Find a Practitioner
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
