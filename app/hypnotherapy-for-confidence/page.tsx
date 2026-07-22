import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Brain, CheckCircle, HeartPulse, Search, Shield, Clock } from 'lucide-react';
import { getAllPractitioners } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Hypnotherapy for Confidence | Find Certified Practitioners',
  description: 'Hypnotherapy for confidence may support self-belief, calmer performance, boundaries, and more useful inner dialogue. Learn what to expect and find practitioners.',
  keywords: 'hypnotherapy for confidence, hypnosis for confidence, confidence hypnotherapy, hypnotherapy for self confidence, confidence hypnotherapist',
  alternates: { canonical: 'https://hypnotherapy-finder.com/hypnotherapy-for-confidence' },
  openGraph: {
    title: 'Hypnotherapy for Confidence — Support Self-Belief and Calmer Action',
    description: 'How hypnotherapy may support confidence, self-talk, performance pressure, and practical next steps with a certified practitioner.',
    url: 'https://hypnotherapy-finder.com/hypnotherapy-for-confidence',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Hypnotherapy for Confidence' }],
  },
  twitter: { card: 'summary_large_image', title: 'Hypnotherapy for Confidence — Support Self-Belief and Calmer Action', description: 'How hypnotherapy may support confidence, self-talk, performance pressure, and practical next steps with a certified practitioner.', images: ['/logo.png'] },
};

export default async function HypnotherapyForConfidencePage() {
  const allPractitioners = getAllPractitioners();
  const confidenceSpecialists = allPractitioners.filter(p => {
    const specs = p.specialties.join(' ').toLowerCase();
    return specs.includes('confidence') || specs.includes('self-esteem') || specs.includes('performance') || specs.includes('anxiety') || specs.includes('stress');
  });
  const featured = (confidenceSpecialists.length >= 6 ? confidenceSpecialists : allPractitioners).slice(0, 9);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Hypnotherapy for Confidence',
    description: 'Guide to hypnotherapy for confidence: how sessions may support self-belief, performance nerves, boundaries, inner dialogue, and practical action.',
    mainEntity: {
      '@type': 'Service',
      name: 'Hypnotherapy for Confidence',
      serviceType: 'Hypnotherapy',
      description: 'Complementary hypnotherapy support for confidence, self-belief, performance pressure, and unhelpful inner dialogue.',
      areaServed: 'United States',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Can hypnotherapy help with confidence?', acceptedAnswer: { '@type': 'Answer', text: 'Hypnotherapy may help some people work with the automatic patterns around confidence, including harsh self-talk, anticipation, avoidance, and body tension. It is best used as a complementary approach focused on practical change rather than instant personality transformation.' } },
      { '@type': 'Question', name: 'How many confidence hypnotherapy sessions are usually needed?', acceptedAnswer: { '@type': 'Answer', text: 'Many confidence-focused goals are explored over three to six sessions, although the timeframe depends on the situation, the history behind the pattern, and whether anxiety, trauma, depression, or other concerns are also present.' } },
      { '@type': 'Question', name: 'What happens in a confidence hypnotherapy session?', acceptedAnswer: { '@type': 'Answer', text: 'A session usually maps the situations where confidence drops, then uses guided relaxation, imagery, suggestion, anchoring, and future rehearsal so the mind can practise a steadier response before real-life moments.' } },
      { '@type': 'Question', name: 'Is confidence hypnotherapy the same as self-esteem work?', acceptedAnswer: { '@type': 'Answer', text: 'They overlap, but they are not identical. Confidence often focuses on doing something specific, while self-esteem focuses more on the internal relationship with yourself. A good practitioner will clarify which pattern matters most.' } },
    ],
  };

  const iconBg = (hue = 185) => ({ width: 48, height: 48, borderRadius: '50%', background: `oklch(0.72 0.12 ${hue} / 0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' });
  const numBox = { width: 40, height: 40, borderRadius: 10, background: 'oklch(0.72 0.12 185 / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16, fontWeight: 700, color: 'var(--hf-accent)' };

  return (
    <>
      <Script id="schema-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} strategy="beforeInteractive" />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} strategy="beforeInteractive" />

      <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: 80 }}>
          <section style={{ background: 'var(--hf-bg-mid)', padding: '72px 24px 64px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 740, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Confidence &amp; Self-Belief</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Hypnotherapy for Confidence — Support the Part of You That Freezes
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 32 }}>
                Confidence problems rarely arrive as one neat thought. They show up as overthinking before a meeting, shrinking in a room, saying yes when you mean no, or rehearsing failure before you begin. Hypnotherapy may support the automatic patterns that keep those moments feeling bigger than they need to be.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/find-a-hypnotherapist" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find a Hypnotherapist
                </Link>
                <Link href="#how-it-works" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  How It Works
                </Link>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What is Hypnotherapy for Confidence?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--hf-fg)' }}>Hypnotherapy for confidence</strong> uses guided relaxation, focused attention, therapeutic suggestion, imagery, and future rehearsal to work with the internal habits that can make capable people feel small. The target is not becoming loud, fearless, or permanently upbeat. The useful target is more specific: feeling steadier when you need to speak, decide, ask, perform, set a boundary, or take the next step.</p>
                <p style={{ marginBottom: 16 }}>Confidence can be affected by anxiety, low self-esteem, perfectionism, people-pleasing, past criticism, workplace pressure, relationship patterns, or repeated avoidance. A responsible practitioner will not reduce everything to “just believe in yourself.” They will map where confidence drops, what your body does, what your mind predicts, and what response you want to rehearse instead.</p>
                <p>Hypnotherapy is a complementary approach. If you&apos;re experiencing significant symptoms, please consult a qualified healthcare provider.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 920, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 40 }}>Confidence Patterns Hypnotherapy May Support</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                {[
                  { icon: Brain, label: 'Harsh Inner Dialogue', desc: 'Sessions may work with the automatic voice that predicts embarrassment, rejection, failure, or not being good enough before anything has happened.' },
                  { icon: HeartPulse, label: 'Body-Based Bracing', desc: 'Hypnosis often begins by helping the body settle, because confidence is difficult to access when your system is already preparing for threat.' },
                  { icon: Shield, label: 'Boundary Practice', desc: 'Future pacing can help you mentally rehearse saying no, asking for time, stating a preference, or staying grounded during pushback.' },
                  { icon: Clock, label: 'Performance Preparation', desc: 'Practitioners may use imagery and anchoring before presentations, interviews, sales calls, auditions, exams, or difficult conversations.' },
                  { icon: CheckCircle, label: 'Avoidance Loops', desc: 'Hypnotherapy can support the shift from avoiding the confidence moment to approaching it in smaller, calmer, more realistic steps.' },
                  { icon: Brain, label: 'Self-Esteem Overlap', desc: 'When the issue is deeper self-worth rather than one situation, sessions may focus on the inner relationship rather than a single performance.' },
                ].map((item) => (
                  <div key={item.label} className="glass-card" style={{ padding: '28px 20px', textAlign: 'center' }}>
                    <div style={iconBg()}><item.icon style={{ width: 22, height: 22, color: 'var(--hf-accent)' }} /></div>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 8 }}>{item.label}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="how-it-works" style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>How Confidence-Focused Hypnotherapy Works</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>The mechanism is state change plus rehearsal. A calmer nervous system gives the mind a better learning state; suggestion and imagery then let you practise the response you want before you need it in real life.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { n: '1', title: 'Map the Confidence Moment', body: 'The practitioner asks where confidence disappears: meetings, dating, public speaking, interviews, sales calls, boundaries, money conversations, driving, social events, or being seen. This keeps the work precise.' },
                  { n: '2', title: 'Identify the Automatic Prediction', body: 'Most confidence blocks have a prediction under them: “I will sound stupid”, “they will reject me”, “I will freeze”, “I do not deserve to ask”. Hypnotherapy works with the feeling-tone of that prediction, not just the sentence.' },
                  { n: '3', title: 'Create a Settled State', body: 'Guided relaxation, breath, imagery, and focused attention help shift the body out of bracing. The goal is not sleep. It is a focused state where a different response can be rehearsed.' },
                  { n: '4', title: 'Use Suggestion, Anchoring, and Imagery', body: 'The practitioner may use direct suggestion, Ericksonian language, parts work, or confidence anchoring so your mind links the situation with steadier posture, clearer speech, and more useful self-talk.' },
                  { n: '5', title: 'Future Pace the Real Situation', body: 'You mentally rehearse the meeting, call, boundary, presentation, or first step while staying regulated. This helps the situation feel less unfamiliar when it happens outside the session.' },
                ].map((step) => (
                  <div key={step.n} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={numBox}>{step.n}</div>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 8 }}>{step.title}</h3>
                      <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 32 }}>What Does a Session Look Like?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { title: 'First Session', body: 'Expect a practical consultation before any hypnosis work. The practitioner should ask where confidence drops, what you avoid, what you want to do differently, and whether anxiety, trauma, depression, or medical concerns need additional support.', bullets: ['You stay aware and in control throughout', 'The work should be specific to real situations', 'A responsible practitioner will explain scope and referral boundaries'] },
                  { title: 'Ongoing Sessions', body: 'Later sessions may focus on one situation at a time: asking for a raise, speaking in a meeting, showing up on camera, setting a boundary, dating, driving somewhere new, or taking action after procrastination. You may receive a recording or short self-hypnosis exercise for repetition between sessions.', bullets: ['Sessions often run 50–90 minutes', 'Progress is usually measured by real-world behaviour', 'The aim is steadier action, not forced extroversion'] },
                ].map((item) => (
                  <div key={item.title} className="glass-card" style={{ padding: '28px', borderLeft: '3px solid var(--hf-accent)' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 12 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 16 }}>{item.body}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {item.bullets.map((b) => (
                        <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <CheckCircle style={{ width: 16, height: 16, color: 'var(--hf-accent)', flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.5 }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>How Long Does It Take?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>Confidence work is often practical and focused. A narrow goal such as speaking up in meetings, making phone calls, preparing for interviews, or setting a boundary may be explored in a short course of around <strong style={{ color: 'var(--hf-fg)' }}>three to six sessions</strong>.</p>
                <p style={{ marginBottom: 16 }}>If the confidence pattern is tied to panic, trauma, depression, bullying, long-term shame, or severe social avoidance, progress may need more time and broader support. That does not mean hypnotherapy is useless; it means the practitioner should work carefully and avoid pretending a complex pattern is just a motivation problem.</p>
                <p>The practical marker is whether you are able to approach the situation with more choice: a little less avoidance, a steadier body, clearer language, and less post-event punishment afterward.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find Hypnotherapists for Confidence Support</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 620, margin: '0 auto 40px' }}>Connect with certified hypnotherapists who work with confidence, self-esteem, anxiety, stress, performance pressure, and habit change. Ask how they structure confidence work and what they expect between sessions.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
                {featured.map((practitioner) => (
                  <div key={practitioner.id} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 6 }}>{practitioner.name}</h3>
                    {practitioner.credentials && practitioner.credentials.length > 0 && <p style={{ fontSize: 12, color: 'var(--hf-accent)', marginBottom: 10 }}>{Array.isArray(practitioner.credentials) ? practitioner.credentials.join(', ') : practitioner.credentials}</p>}
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', marginBottom: 12 }}>{practitioner.city}, {practitioner.state}</p>
                    {practitioner.specialties.length > 0 && (
                      <div style={{ marginBottom: 16 }}>
                        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--hf-fg-dim)', marginBottom: 6, textTransform: 'uppercase' }}>Specialties</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {practitioner.specialties.slice(0, 3).map((s, i) => (
                            <span key={i} style={{ fontSize: 11, background: 'rgba(255,255,255,0.06)', color: 'var(--hf-fg-dim)', padding: '2px 8px', borderRadius: 6 }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <Link href={`/practitioner/${practitioner.slug}`} className="btn-gradient hf-btn-accent" style={{ display: 'block', textAlign: 'center', padding: '9px', borderRadius: 8, color: '#fff', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>View Profile</Link>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link href="/find-a-hypnotherapist" className="btn-gradient hf-btn-accent" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Find a Hypnotherapist</Link>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Is Hypnotherapy Right for Me?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>It may be worth exploring if the confidence issue is specific enough to name: speaking up, being visible, making calls, asking for money, dating, setting boundaries, presenting, attending interviews, or taking action when fear of judgement appears.</p>
                <p style={{ marginBottom: 16 }}>It may not be the right standalone option if the pattern is connected to severe anxiety, self-harm thoughts, trauma symptoms, major depression, unsafe relationships, workplace harassment, or urgent mental health concerns. In those cases, healthcare, crisis, legal, or workplace support may need to come first.</p>
                <p>Before booking, ask the practitioner what confidence issues they commonly support, whether they use future rehearsal or self-hypnosis, how they measure progress, and when they would refer you to another professional.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 32 }}>Frequently Asked Questions About Hypnotherapy for Confidence</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { q: 'Can hypnotherapy help with confidence?', a: 'Hypnotherapy may help some people work with automatic confidence patterns such as body tension, negative self-talk, avoidance, over-rehearsal, and fear of judgement. It should be practical and situation-specific.' },
                  { q: 'Is confidence hypnotherapy only for public speaking?', a: 'No. Public speaking is common, but confidence work can also focus on dating, interviews, workplace visibility, asking for money, setting boundaries, sales calls, exams, auditions, or returning after a setback.' },
                  { q: 'Will hypnosis make me a different personality?', a: 'No. Ethical hypnotherapy does not try to turn quiet people into someone else. The aim is usually to help you access steadier choices in situations that currently trigger shrinking, freezing, or avoidance.' },
                  { q: 'Can online hypnotherapy support confidence?', a: 'Online sessions can be a good fit for many confidence goals, especially when the trigger involves calls, video meetings, preparation, self-talk, or rehearsing real conversations from home.' },
                  { q: 'What should I ask before booking?', a: 'Ask about qualifications, experience with confidence and self-esteem work, session structure, whether recordings are provided, what happens between sessions, and how the practitioner handles issues outside their scope.' },
                ].map((item) => (
                  <div key={item.q} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 10 }}>{item.q}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ padding: '48px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 24 }}>Related Hypnotherapy Resources</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                {[
                  { href: '/hypnotherapy-for-anxiety', title: 'Hypnotherapy for Anxiety', desc: 'Confidence blocks often overlap with anxiety and threat rehearsal' },
                  { href: '/hypnotherapy-for-depression', title: 'Hypnotherapy for Depression', desc: 'Learn how hypnotherapy may support low mood and self-talk patterns' },
                  { href: '/hypnotherapy-for-sleep', title: 'Hypnotherapy for Sleep', desc: 'Sleep disruption can make confidence and emotional regulation harder' },
                  { href: '/blog/hypnotherapy-for-low-self-esteem-guide', title: 'Low Self-Esteem Guide', desc: 'A deeper guide to self-worth, comparison, and harsh inner dialogue' },
                ].map((link) => (
                  <a key={link.href} href={link.href} className="glass-card hf-card-hover" style={{ display: 'block', padding: '20px', textDecoration: 'none' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-accent)', marginBottom: 6 }}>{link.title}</h3>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.5, margin: 0 }}>{link.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg, oklch(0.25 0.05 185), oklch(0.18 0.03 240))', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Find Confidence Support That Stays Practical</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>Search certified hypnotherapists and ask direct questions about confidence work, self-esteem support, future rehearsal, and how sessions connect to real-world action.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/find-a-hypnotherapist" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find a Hypnotherapist
                </Link>
                <Link href="/hypnotherapy-for-anxiety" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  Explore Anxiety Support
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
