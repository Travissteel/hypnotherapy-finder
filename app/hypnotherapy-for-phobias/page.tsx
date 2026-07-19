import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Brain, CheckCircle, Clock, Compass, Search, Shield } from 'lucide-react';
import { getAllPractitioners } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Hypnotherapy for Phobias | Find Certified Practitioners',
  description: 'Hypnotherapy for phobias may support calmer responses to specific fears, avoidance loops, panic sensations, and trigger rehearsal. Find certified practitioners.',
  keywords: 'hypnotherapy for phobias, hypnosis for phobias, phobia hypnotherapy, fear hypnotherapist, specific phobia support',
  alternates: { canonical: 'https://hypnotherapy-finder.com/hypnotherapy-for-phobias' },
  openGraph: {
    title: 'Hypnotherapy for Phobias — Support for Specific Fears and Avoidance',
    description: 'Learn how hypnotherapy may support phobia patterns, what a session looks like, and how to find certified practitioners.',
    url: 'https://hypnotherapy-finder.com/hypnotherapy-for-phobias',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Hypnotherapy for Phobias' }],
  },
  twitter: { card: 'summary_large_image', title: 'Hypnotherapy for Phobias — Support for Specific Fears and Avoidance', description: 'How hypnotherapy may support specific fears, trigger rehearsal, and avoidance patterns.', images: ['/logo.png'] },
};

export default async function HypnotherapyForPhobiasPage() {
  const allPractitioners = getAllPractitioners();
  const phobiaSpecialists = allPractitioners.filter(p => {
    const specs = p.specialties.join(' ').toLowerCase();
    return specs.includes('phobia') || specs.includes('fear') || specs.includes('anxiety') || specs.includes('panic') || specs.includes('stress');
  });
  const featured = (phobiaSpecialists.length >= 6 ? phobiaSpecialists : allPractitioners).slice(0, 9);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Hypnotherapy for Phobias',
    description: 'Guide to hypnotherapy for phobias: how it may support specific fear responses, avoidance loops, trigger rehearsal, and calmer coping strategies alongside appropriate healthcare.',
    mainEntity: { '@type': 'MedicalCondition', name: 'Specific Phobias and Fear Responses' },
  };

  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: 'Can hypnotherapy help with phobias?', acceptedAnswer: { '@type': 'Answer', text: 'Hypnotherapy may help some people work with specific fear patterns, anticipatory anxiety, panic sensations, and avoidance habits. It is complementary and should not replace care from a qualified healthcare provider where symptoms are significant.' } },
    { '@type': 'Question', name: 'What happens in a phobia hypnotherapy session?', acceptedAnswer: { '@type': 'Answer', text: 'A practitioner will usually map the trigger, the body response, the avoidance pattern, and any safety behaviours before using guided relaxation, imagery, suggestion, anchoring, and future rehearsal.' } },
    { '@type': 'Question', name: 'How many sessions are usually needed for a phobia?', acceptedAnswer: { '@type': 'Answer', text: 'A focused fear may be explored in a short course of three to six sessions. Complex phobias, trauma-linked fears, panic disorder, or multiple avoidance patterns may require longer support or referral.' } },
    { '@type': 'Question', name: 'Is online hypnotherapy suitable for phobias?', acceptedAnswer: { '@type': 'Answer', text: 'Online sessions can suit many phobia patterns when the work involves rehearsal, imagery, confidence building, and preparation. In-person support may be preferable for complex exposure planning or severe avoidance.' } },
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
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Specific Fear Support</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Hypnotherapy for Phobias — Support for Specific Fears and Avoidance Loops
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 32 }}>
                A phobia is rarely just “being scared.” It is the anticipation, the body surge, the escape plan, the route change, the cancelled appointment, and the private negotiation that starts before the trigger even appears. Hypnotherapy may support the patterns around that loop.
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What is Hypnotherapy for Phobias?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--hf-fg)' }}>Hypnotherapy for phobias</strong> uses guided relaxation, focused attention, therapeutic suggestion, and mental rehearsal to work with the automatic response that happens around a specific fear. The aim is not to argue with the fear at a conscious level. Most people already know the fear is larger than the actual danger. The useful work is helping the nervous system respond differently.</p>
                <p style={{ marginBottom: 16 }}>Sessions may focus on fear of flying, needles, dental appointments, dogs, heights, enclosed spaces, vomiting, storms, escalators, bridges, tunnels, or other specific triggers. The practitioner should ask exactly where the fear sequence begins: seeing an image, booking an appointment, approaching the place, hearing a sound, feeling trapped, or imagining embarrassment if panic shows.</p>
                <p>Hypnotherapy is a complementary approach. If you&apos;re experiencing significant symptoms, please consult a qualified healthcare provider. If a fear is linked to trauma, fainting, medical risk, severe panic, or major daily restriction, wider clinical support may be the safer first step.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 920, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 40 }}>How Hypnotherapy May Support Phobia Patterns</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                {[
                  { icon: Brain, label: 'Interrupts Anticipatory Fear', desc: 'Work often begins before the trigger itself: the mental movie, dread, scanning, and body bracing that can start hours or weeks ahead.' },
                  { icon: Shield, label: 'Builds a Calmer Body Cue', desc: 'Anchoring and guided relaxation can help create a practised signal for steadier breathing, grounded attention, and less urgency to escape.' },
                  { icon: Compass, label: 'Rehearses the Trigger Safely', desc: 'Future pacing lets the mind practise approaching the feared situation in steps while staying within a controlled internal experience.' },
                  { icon: CheckCircle, label: 'Works with Safety Behaviours', desc: 'Sessions can explore checking, avoidance, reassurance, route changes, companion dependence, and other habits that keep the fear loop rehearsed.' },
                  { icon: Clock, label: 'Targets Specific Moments', desc: 'The work is most useful when it names the exact sticking point: booking the flight, stepping into the lift, sitting in the dentist chair, or hearing thunder.' },
                  { icon: Brain, label: 'Uses Imagery and Suggestion', desc: 'Ericksonian language, parts work, imagery, and self-hypnosis may be used to support a different felt response to the same trigger.' },
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>How Phobia-Focused Hypnotherapy Works</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>The mechanism is state change plus trigger rehearsal: settle the body first, then practise a new response to the feared situation while the mind is more receptive.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { n: '1', title: 'Map the Fear Sequence', body: 'The practitioner asks what starts the loop, where it peaks, what you avoid, what safety behaviours appear, and what a realistic goal would look like. “Never feel fear again” is not the target. “Book the appointment and stay regulated enough to attend” is.' },
                  { n: '2', title: 'Create a Stable Internal Base', body: 'Using breath, voice, imagery, and focused attention, the session builds a calmer state. This gives the nervous system a different reference point before the trigger is mentally rehearsed.' },
                  { n: '3', title: 'Reframe the Trigger Pattern', body: 'Suggestion may target old meanings attached to the trigger: trapped, unsafe, contaminated, judged, unable to cope, or certain to panic. The practitioner helps loosen those meanings without forcing exposure too quickly.' },
                  { n: '4', title: 'Rehearse in Graduated Steps', body: 'The mind may practise seeing the object, approaching the place, staying for a short period, asking for support, or completing the specific task. This is mental rehearsal, not a demand to rush into real-world exposure unprepared.' },
                  { n: '5', title: 'Build Between-Session Practice', body: 'Many practitioners provide self-hypnosis, a short recording, or grounding practice so the calmer response is repeated. Repetition matters because avoidance has usually had years of rehearsal.' },
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
                  { title: 'First Session', body: 'Expect a detailed consultation before hypnosis begins. A good practitioner will ask about the trigger, avoidance, panic sensations, medical history, trauma links, previous support, and what would count as progress. They should explain scope clearly and avoid pressuring you into anything that feels unsafe.', bullets: ['You remain aware and in control throughout', 'The fear is approached in imagination first, not forced', 'Referral boundaries should be discussed when symptoms are severe'] },
                  { title: 'Ongoing Sessions', body: 'Later sessions may use anchoring, future pacing, imaginal rehearsal, parts work, confidence building, or self-hypnosis. For example, a flying phobia session may rehearse booking, packing, airport queues, boarding, take-off sounds, and sitting through body sensations without escalating the fear loop.', bullets: ['Sessions often run 50–90 minutes', 'Specific phobias may use a short focused course', 'Complex fears need slower pacing and sometimes wider care'] },
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
                <p style={{ marginBottom: 16 }}>A narrow, well-defined fear may be explored in a short course, often around <strong style={{ color: 'var(--hf-fg)' }}>three to six sessions</strong>. Examples include preparing for a flight, a dental appointment, a blood test, or using an elevator again. The more specific the target, the easier it is to design focused rehearsal.</p>
                <p style={{ marginBottom: 16 }}>Longer timelines are normal when the fear is linked to trauma, panic disorder, several triggers, medical risk, dissociation, or years of severe avoidance. In those cases, hypnotherapy may still support regulation and rehearsal, but it should sit inside a broader support plan.</p>
                <p>The practical marker is not instant bravery. It is whether the fear sequence becomes less automatic: fewer cancelled plans, shorter recovery time, more confidence approaching the trigger, and a clearer ability to pause before escape takes over.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find Hypnotherapists for Phobia Support</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 620, margin: '0 auto 40px' }}>Connect with certified hypnotherapists who work with fear, anxiety, panic, confidence, and avoidance patterns. Ask how they pace phobia work, when they refer out, and whether they offer self-hypnosis practice between sessions.</p>
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
                <p style={{ marginBottom: 16 }}>It may be worth exploring if the fear is specific, you can name the situations you avoid, and your goal is practical: take a flight, attend an appointment, use an elevator, drive over a bridge, or reduce the panic surge around a known trigger.</p>
                <p style={{ marginBottom: 16 }}>It is not the right standalone option if the fear is connected to unresolved trauma, frequent panic attacks, fainting, neurological symptoms, severe restriction, self-harm thoughts, or a medical situation that needs clinical advice. In those cases, healthcare support comes first.</p>
                <p>Before booking, ask the practitioner which phobias they work with, how they pace trigger rehearsal, whether they use recordings or self-hypnosis, what qualifications they hold, and when they would recommend additional care.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 32 }}>Frequently Asked Questions About Hypnotherapy for Phobias</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { q: 'Can hypnotherapy help with phobias?', a: 'Hypnotherapy may help some people work with specific fear patterns, anticipatory anxiety, panic sensations, and avoidance habits. It should be used as a complementary approach, especially where symptoms are significant.' },
                  { q: 'Will I be forced to face the fear immediately?', a: 'No ethical practitioner should force exposure. Phobia-focused work usually begins with consultation, calming skills, imagery, and graduated mental rehearsal before any real-world steps are considered.' },
                  { q: 'Which phobias can hypnotherapy support?', a: 'People often seek support for fear of flying, needles, dogs, dental work, vomiting, heights, enclosed spaces, storms, escalators, bridges, tunnels, public transport, and medical appointments. The key is mapping the exact fear loop.' },
                  { q: 'Can online hypnotherapy work for phobias?', a: 'Online sessions can suit rehearsal-based phobia work, especially when the trigger does not require the practitioner to be physically present. Severe avoidance, trauma-linked fears, or complex exposure planning may need local clinical support.' },
                  { q: 'What should I ask before booking?', a: 'Ask about qualifications, experience with your specific fear, pacing, referral boundaries, self-hypnosis recordings, session length, fees, and what progress usually looks like for your situation.' },
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
                  { href: '/phobia-test', title: 'Phobia Test', desc: 'Explore how specific fears may be affecting daily choices and avoidance patterns' },
                  { href: '/hypnotherapy-for-anxiety', title: 'Hypnotherapy for Anxiety', desc: 'Many phobias overlap with anxiety and panic sensations' },
                  { href: '/online-hypnotherapy', title: 'Online Hypnotherapy', desc: 'Learn when remote sessions make sense for fear rehearsal and self-hypnosis' },
                  { href: '/blog/hypnotherapy-for-fear-of-flying', title: 'Fear of Flying Guide', desc: 'A focused guide for flight anxiety, airports, take-off, and travel preparation' },
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Find Phobia Support That Moves at a Safe Pace</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>Search certified hypnotherapists and ask direct questions about specific fear experience, trigger rehearsal, referral boundaries, and between-session practice.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/find-a-hypnotherapist" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find a Hypnotherapist
                </Link>
                <Link href="/phobia-test" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  Take the Phobia Test
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
