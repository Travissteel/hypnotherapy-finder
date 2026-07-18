import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Brain, CheckCircle, HeartPulse, Search, Shield, Clock } from 'lucide-react';
import { getAllPractitioners } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Hypnotherapy for Depression | Find Certified Practitioners',
  description: 'Hypnotherapy for depression may support mood, motivation, sleep, and negative self-talk alongside appropriate healthcare. Learn how it works and find certified practitioners.',
  keywords: 'hypnotherapy for depression, hypnosis for depression, hypnotherapy depression support, depression hypnotherapist, hypnotherapy low mood',
  alternates: { canonical: 'https://hypnotherapy-finder.com/hypnotherapy-for-depression' },
  openGraph: {
    title: 'Hypnotherapy for Depression — Support for Low Mood and Negative Self-Talk',
    description: 'How hypnotherapy may support depression alongside healthcare, what a session looks like, and how to find certified practitioners.',
    url: 'https://hypnotherapy-finder.com/hypnotherapy-for-depression',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Hypnotherapy for Depression' }],
  },
  twitter: { card: 'summary_large_image', title: 'Hypnotherapy for Depression — Support for Low Mood and Negative Self-Talk', description: 'How hypnotherapy may support depression alongside healthcare, what a session looks like, and how to find certified practitioners.', images: ['/logo.png'] },
};

export default async function HypnotherapyForDepressionPage() {
  const allPractitioners = getAllPractitioners();
  const depressionSpecialists = allPractitioners.filter(p => {
    const specs = p.specialties.join(' ').toLowerCase();
    return specs.includes('depression') || specs.includes('mood') || specs.includes('anxiety') || specs.includes('stress') || specs.includes('self-esteem');
  });
  const featured = (depressionSpecialists.length >= 6 ? depressionSpecialists : allPractitioners).slice(0, 9);

  const jsonLd = { '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Hypnotherapy for Depression', description: 'Guide to hypnotherapy for depression: how it may support low mood, motivation, sleep, rumination, and negative self-talk alongside appropriate healthcare.', mainEntity: { '@type': 'MedicalCondition', name: 'Depression and Low Mood', possibleTreatment: { '@type': 'MedicalTherapy', name: 'Hypnotherapy for Depression Support', description: 'Hypnotherapy techniques that may support emotional regulation, motivation, sleep routines, and more helpful inner dialogue.' } } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: 'Can hypnotherapy help with depression?', acceptedAnswer: { '@type': 'Answer', text: 'Hypnotherapy may support some people with depression-related patterns such as rumination, low motivation, harsh self-talk, sleep disruption, and stress. It is a complementary approach and should be used alongside appropriate medical or psychological care, especially where symptoms are significant.' } },
    { '@type': 'Question', name: 'Is hypnotherapy a substitute for therapy or medication?', acceptedAnswer: { '@type': 'Answer', text: 'No. Hypnotherapy is not a substitute for prescribed medication, emergency support, psychotherapy, or advice from a qualified healthcare provider. It can be part of a wider support plan when your practitioner works within safe boundaries.' } },
    { '@type': 'Question', name: 'How many sessions are usually needed?', acceptedAnswer: { '@type': 'Answer', text: 'The timeframe varies. Some people use a short course of four to six sessions for a specific pattern such as sleep or self-talk, while longer-standing low mood may require more ongoing support and coordination with other care.' } },
    { '@type': 'Question', name: 'What happens in a depression-focused hypnotherapy session?', acceptedAnswer: { '@type': 'Answer', text: 'Sessions usually include a careful conversation about mood patterns, triggers, routines, and goals, followed by guided relaxation, imagery, suggestion, and rehearsal designed to support calmer thinking and small, realistic next steps.' } },
  ] };

  const iconBg = (hue = 185) => ({ width: 48, height: 48, borderRadius: '50%', background: `oklch(0.72 0.12 ${hue} / 0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' });
  const numBox = { width: 40, height: 40, borderRadius: 10, background: 'oklch(0.72 0.12 185 / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16, fontWeight: 700, color: 'var(--hf-accent)' };

  return (
    <>
      <Script id="schema-medical" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} strategy="beforeInteractive" />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} strategy="beforeInteractive" />

      <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: 80 }}>
          <section style={{ background: 'var(--hf-bg-mid)', padding: '72px 24px 64px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Low Mood &amp; Depression Support</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Hypnotherapy for Depression — Support the Patterns Around Low Mood
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 32 }}>
                Depression is not just a bad mood you can think your way out of. But the patterns around it — harsh self-talk, rumination, withdrawal, poor sleep, and the feeling that even small actions are too heavy — are places where hypnotherapy may offer useful support alongside proper care.
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What is Hypnotherapy for Depression?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--hf-fg)' }}>Hypnotherapy for depression</strong> uses guided relaxation, focused attention, imagery, and therapeutic suggestion to work with the mental and emotional habits that can gather around low mood. It does not diagnose depression, replace medical care, or promise an instant shift. The useful target is narrower and more practical: helping your mind rehearse different responses when old loops keep pulling you downward.</p>
                <p style={{ marginBottom: 16 }}>For some people, depression is tangled with anxiety, grief, burnout, trauma, chronic stress, pain, or sleep disruption. A responsible hypnotherapist will ask about those pieces, keep the work within scope, and encourage healthcare support where needed. The session is not about pretending everything is fine. It is about creating enough calm and distance from the loop that small, realistic choices become easier to access.</p>
                <p>Hypnotherapy is a complementary approach. If you&apos;re experiencing significant symptoms, please consult a qualified healthcare provider. If you feel at risk of harming yourself or cannot stay safe, seek urgent local crisis support now.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 920, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 40 }}>How Hypnotherapy May Support Depression-Related Patterns</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                {[
                  { icon: Brain, label: 'Softens Rumination Loops', desc: 'Guided imagery and suggestion can help interrupt repetitive inner arguments, worst-case rehearsal, and replaying the same painful thoughts.' },
                  { icon: HeartPulse, label: 'Supports Emotional Regulation', desc: 'Sessions focus on creating a calmer body state, which can make strong feelings less overwhelming and easier to work with.' },
                  { icon: Clock, label: 'Rebuilds Small Routines', desc: 'Hypnotherapy can rehearse realistic next steps around sleep, movement, meals, social contact, or daily structure without turning recovery into a performance.' },
                  { icon: Shield, label: 'Changes Harsh Self-Talk', desc: 'Work often targets the inner voice that says you are failing, behind, broken, or too far gone, replacing it with language that supports action.' },
                  { icon: CheckCircle, label: 'Future Rehearsal', desc: 'Practitioners may use mental rehearsal so your mind experiences doing one small helpful thing before you attempt it in daily life.' },
                  { icon: Brain, label: 'Works Alongside Care', desc: 'The safest use is complementary: hypnotherapy can support the psychological patterns while medical and mental health care handle clinical risk.' },
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>How Depression-Focused Hypnotherapy Works</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>The mechanism is not magic positivity. It is state change plus rehearsal: helping the nervous system settle, then using that steadier state to practise different internal responses.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { n: '1', title: 'Mapping the Pattern', body: 'The practitioner asks what low mood looks like in real life: sleep, appetite, isolation, shutdown, self-criticism, guilt, motivation, and the time of day things tend to feel worst. This keeps the work specific rather than generic.' },
                  { n: '2', title: 'Creating a Safer Internal State', body: 'Through breath, imagery, and focused attention, you are guided into a calmer state where the body is less braced. That makes it easier to approach difficult material without being flooded by it.' },
                  { n: '3', title: 'Working with the Inner Voice', body: 'Many sessions focus on the automatic commentary that appears before action: “why bother”, “I can’t”, “I always fail”. Suggestion and imagery help loosen those statements so they stop feeling like facts.' },
                  { n: '4', title: 'Rehearsing One Small Shift', body: 'Rather than demanding a complete life overhaul, the practitioner may guide mental rehearsal of one manageable action: sending a message, going outside, preparing for bed, or doing the next obvious task.' },
                  { n: '5', title: 'Between-Session Reinforcement', body: 'You may receive a self-hypnosis recording or short practice to repeat. Repetition matters because depression-related patterns often return automatically unless the new response is rehearsed.' },
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
                  { title: 'First Session', body: 'Expect a careful consultation before any hypnosis work. The practitioner should ask about mood history, current support, medication, sleep, risk, goals, and what you want help with. If your symptoms sound severe or unsafe, they should encourage appropriate healthcare support rather than trying to handle everything in-session.', bullets: ['You stay aware and in control throughout', 'The work should feel collaborative, not pressured', 'A responsible practitioner will be clear about scope and referral boundaries'] },
                  { title: 'Ongoing Sessions', body: 'Later sessions usually focus on one or two patterns at a time: rumination, sleep, self-talk, confidence to leave the house, or motivation for small routines. The trance work may include calming imagery, parts work, future pacing, and post-session practice.', bullets: ['Sessions often run 50–90 minutes', 'You may receive a recording for home practice', 'Progress is usually measured by small functional shifts, not dramatic promises'] },
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
                <p style={{ marginBottom: 16 }}>There is no honest fixed number. A narrow pattern such as sleep anxiety or harsh self-talk may be explored in a short course, often around <strong style={{ color: 'var(--hf-fg)' }}>four to six sessions</strong>. Longer-standing depression, trauma-linked low mood, severe withdrawal, or risk concerns need broader support and may not be suitable for hypnotherapy alone.</p>
                <p style={{ marginBottom: 16 }}>The practical marker is not whether every difficult feeling disappears. It is whether your system starts allowing small, useful actions again: sleeping a little more consistently, pausing before rumination takes over, answering a message, attending an appointment, or speaking to yourself with less contempt.</p>
                <p>If things are getting worse, if you feel unsafe, or if daily functioning is collapsing, pause the self-help search and contact a qualified healthcare provider or crisis service. Hypnotherapy can support recovery, but it should never delay urgent care.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find Hypnotherapists for Depression Support</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>Connect with certified hypnotherapists who work with mood, anxiety, stress, self-esteem, sleep, and emotional regulation. Ask about their experience, referral boundaries, and how they coordinate with wider care.</p>
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
                <p style={{ marginBottom: 16 }}>It may be worth exploring if your main goals are specific and practical: calming rumination, improving sleep routines, loosening self-criticism, building confidence for appointments or social contact, or supporting small daily actions. It is usually most useful when you can identify one pattern you want to work with first.</p>
                <p style={{ marginBottom: 16 }}>It is not the right standalone option if you are in crisis, feel unsafe, have thoughts of self-harm, are experiencing severe symptoms, or need medication review, diagnosis, or intensive mental health support. In those situations, healthcare comes first. A good hypnotherapist will respect that boundary.</p>
                <p>Before booking, ask the practitioner how they handle depression-related work, what qualifications they hold, when they refer out, and whether they are comfortable working alongside your doctor, psychologist, or therapist if you already have one.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 32 }}>Frequently Asked Questions About Hypnotherapy for Depression</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { q: 'Can hypnotherapy help with depression?', a: 'Hypnotherapy may support some people with depression-related patterns such as rumination, low motivation, harsh self-talk, sleep disruption, and stress. It is complementary and should sit alongside appropriate medical or psychological care where symptoms are significant.' },
                  { q: 'Is it a substitute for therapy or medication?', a: 'No. Do not stop medication or therapy because of hypnotherapy. If you take medication or have a diagnosis, speak with your healthcare provider about changes to your care plan.' },
                  { q: 'Will I lose control during hypnosis?', a: 'No. Hypnosis is a focused, relaxed state. You remain aware, can speak, and can stop at any point. Ethical practitioners explain the process clearly before starting.' },
                  { q: 'Can online hypnotherapy work for depression support?', a: 'Online sessions can work well for practical patterns such as self-talk, sleep routines, confidence, and rumination, provided there is a private space and you feel safe. If you are in crisis or at risk, urgent local support is more appropriate.' },
                  { q: 'What should I ask before booking?', a: 'Ask about qualifications, experience with depression-related work, referral boundaries, safeguarding, session structure, and whether they can work alongside your existing healthcare team.' },
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
                  { href: '/hypnotherapy-for-anxiety', title: 'Hypnotherapy for Anxiety', desc: 'Anxiety and low mood often overlap — learn how hypnotherapy may support anxiety patterns' },
                  { href: '/hypnotherapy-for-sleep', title: 'Hypnotherapy for Sleep', desc: 'Sleep disruption can make low mood harder to manage. See how sleep sessions work' },
                  { href: '/online-hypnotherapy', title: 'Online Hypnotherapy', desc: 'Work with a certified practitioner from home over secure video' },
                  { href: '/blog/hypnotherapy-for-depression-guide', title: 'Depression Guide', desc: 'A deeper blog guide on hypnotherapy and depression-related support' },
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
            <div style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Find Support That Stays Within Safe Boundaries</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>Search certified hypnotherapists and ask direct questions about depression-related experience, referral boundaries, and how sessions fit alongside your wider care.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/find-a-hypnotherapist" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find a Hypnotherapist
                </Link>
                <Link href="/hypnotherapy-for-sleep" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  Explore Sleep Support
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
