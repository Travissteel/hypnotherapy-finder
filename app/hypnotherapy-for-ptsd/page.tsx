import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Brain, CheckCircle, HeartPulse, Search, Shield, Clock } from 'lucide-react';
import { getAllPractitioners } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Hypnotherapy for PTSD | Find Certified Practitioners',
  description: 'Hypnotherapy for PTSD may support trauma-related anxiety, sleep, triggers, and nervous-system regulation alongside qualified mental health care.',
  keywords: 'hypnotherapy for PTSD, hypnosis for trauma, PTSD hypnotherapist, trauma hypnotherapy, hypnotherapy trauma support',
  alternates: { canonical: 'https://hypnotherapy-finder.com/hypnotherapy-for-ptsd' },
  openGraph: {
    title: 'Hypnotherapy for PTSD — Trauma-Informed Support for Triggers and Sleep',
    description: 'How hypnotherapy may support PTSD-related patterns alongside qualified care, what sessions look like, and how to find certified practitioners.',
    url: 'https://hypnotherapy-finder.com/hypnotherapy-for-ptsd',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Hypnotherapy for PTSD' }],
  },
  twitter: { card: 'summary_large_image', title: 'Hypnotherapy for PTSD — Support for Triggers and Sleep', description: 'How hypnotherapy may support PTSD-related patterns alongside qualified care and how to find certified practitioners.', images: ['/logo.png'] },
};

export default async function HypnotherapyForPTSDPage() {
  const allPractitioners = getAllPractitioners();
  const ptsdSpecialists = allPractitioners.filter(p => {
    const specs = p.specialties.join(' ').toLowerCase();
    return specs.includes('ptsd') || specs.includes('trauma') || specs.includes('anxiety') || specs.includes('stress') || specs.includes('sleep');
  });
  const featured = (ptsdSpecialists.length >= 6 ? ptsdSpecialists : allPractitioners).slice(0, 9);

  const jsonLd = { '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Hypnotherapy for PTSD', description: 'Guide to hypnotherapy for PTSD-related support: how it may support triggers, sleep, anxiety, body activation, and grounding alongside qualified mental health care.', mainEntity: { '@type': 'MedicalCondition', name: 'Post-Traumatic Stress Disorder', possibleTreatment: { '@type': 'MedicalTherapy', name: 'Hypnotherapy for PTSD Support', description: 'Trauma-informed hypnotherapy techniques that may support grounding, nervous-system settling, trigger rehearsal, sleep routines, and calmer responses.' } } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: 'Can hypnotherapy help with PTSD?', acceptedAnswer: { '@type': 'Answer', text: 'Hypnotherapy may help some people with PTSD-related patterns such as body activation, sleep disruption, trigger anticipation, avoidance, and grounding. It is complementary and should sit alongside qualified mental health care, especially where symptoms are significant or trauma is recent.' } },
    { '@type': 'Question', name: 'Is hypnotherapy safe for trauma work?', acceptedAnswer: { '@type': 'Answer', text: 'Safety depends on practitioner training, pacing, consent, and scope. Trauma-informed sessions should focus on stabilization, control, grounding, and referral boundaries. The work should not force memory retrieval or overwhelm the client.' } },
    { '@type': 'Question', name: 'How many sessions are usually needed?', acceptedAnswer: { '@type': 'Answer', text: 'The timeframe varies. Some people explore a short course for sleep, grounding, or a specific trigger, while complex trauma histories usually require a broader care plan with qualified mental health support.' } },
    { '@type': 'Question', name: 'What happens in a PTSD-focused hypnotherapy session?', acceptedAnswer: { '@type': 'Answer', text: 'Sessions usually begin with a careful conversation about safety, current support, triggers, goals, and consent, followed by guided grounding, relaxation, imagery, suggestion, and future rehearsal for calmer responses.' } },
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
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Trauma &amp; PTSD Support</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Hypnotherapy for PTSD — Support the Nervous System Around Triggers
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 32 }}>
                Trauma is not a mindset problem. PTSD-related patterns can involve body alarms, intrusive memories, avoidance, sleep disruption, and a sense of danger that arrives before logic can catch up. Hypnotherapy may support grounding and regulation when it is used carefully alongside qualified care.
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What is Hypnotherapy for PTSD?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--hf-fg)' }}>Hypnotherapy for PTSD</strong> uses focused attention, guided relaxation, imagery, suggestion, anchoring, and future rehearsal to support the patterns that can gather around trauma. The goal is not to dig for memories, override emotions, or make someone relive what happened. The useful target is stabilization: helping the body practise a safer response when cues, places, sounds, sensations, or memories set off the alarm system.</p>
                <p style={{ marginBottom: 16 }}>A trauma-informed practitioner should work slowly, explain every step, ask for consent, and keep control with the client. For PTSD-related work, the safest early focus is often sleep preparation, grounding, trigger anticipation, startle response, appointment anxiety, or the fear that calm will disappear. Deep trauma processing belongs with appropriately qualified mental health professionals.</p>
                <p>Hypnotherapy is a complementary approach. If you&apos;re experiencing significant symptoms, please consult a qualified healthcare provider. If you feel at risk of harming yourself, cannot stay safe, are experiencing severe dissociation, or are overwhelmed by traumatic memories, seek urgent mental health support.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 920, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 40 }}>How Hypnotherapy May Support PTSD-Related Patterns</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                {[
                  { icon: Shield, label: 'Builds Grounding Cues', desc: 'Anchors, sensory cues, and calm-state rehearsal can help the body practise returning to the present when old alarm signals appear.' },
                  { icon: HeartPulse, label: 'Settles Body Activation', desc: 'Sessions may focus on breath, muscle release, imagery, and pacing so the nervous system has less need to stay braced for danger.' },
                  { icon: Brain, label: 'Reframes Trigger Anticipation', desc: 'Future rehearsal can help the mind practise meeting a specific cue with preparation instead of automatic avoidance or panic.' },
                  { icon: Clock, label: 'Supports Sleep Routines', desc: 'Many PTSD-related patterns intensify at night. Hypnotherapy can rehearse pre-sleep safety cues, settling rituals, and calmer transitions.' },
                  { icon: CheckCircle, label: 'Protects Client Choice', desc: 'Trauma-informed work should move at the client&apos;s pace, with clear consent, no pressure, and no forced memory retrieval.' },
                  { icon: Brain, label: 'Works Alongside Care', desc: 'The safest frame is complementary: hypnotherapy supports response patterns while qualified healthcare manages diagnosis, risk, and trauma care.' },
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>How PTSD-Focused Hypnotherapy Works</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>The mechanism is not “forgetting” or forcing trauma out of the mind. It is state change, attention training, and safe rehearsal: helping the body experience more choice before, during, and after activation.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { n: '1', title: 'Mapping Safety and Scope', body: 'The practitioner asks about current support, triggers, sleep, dissociation, crisis risk, medication, therapy, and goals. They should be clear about what hypnotherapy can support and when specialist mental health care is needed.' },
                  { n: '2', title: 'Creating a Grounded State', body: 'Early work often uses breath, orienting, sensory detail, and imagery to practise feeling present. This is not about going deep quickly. It is about building a reliable way back.' },
                  { n: '3', title: 'Working with Specific Cues', body: 'Instead of opening the whole trauma story, the session may focus on one cue: a sound, time of day, route, medical appointment, workplace situation, or sleep transition that currently feels loaded.' },
                  { n: '4', title: 'Rehearsing a Different Response', body: 'Future pacing lets the mind practise encountering that cue with grounding, choice, boundaries, and support already in place. The point is steadier response, not denial.' },
                  { n: '5', title: 'Between-Session Practice', body: 'You may receive a recording, anchor, or brief self-hypnosis practice. Repetition matters because trauma-related responses can fire automatically unless safer pathways are rehearsed.' },
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
                  { title: 'First Session', body: 'Expect a careful consultation before any hypnosis work. The practitioner should ask about current healthcare support, therapy history where relevant, major triggers, dissociation, sleep, safety, and what would make the session feel manageable. You should not be pressured to describe traumatic details.', bullets: ['You stay aware and in control throughout', 'Consent and pacing should be explicit', 'A responsible practitioner will explain referral boundaries before deep work'] },
                  { title: 'Ongoing Sessions', body: 'Later sessions usually focus on one practical pattern at a time: night-time hypervigilance, a workplace cue, driving a particular route, medical appointments, startle response, or rebuilding confidence after avoidance. The trance work may include grounding imagery, parts-informed language, anchoring, resource building, and future rehearsal.', bullets: ['Sessions often run 50–90 minutes', 'Home practice should be optional and clearly explained', 'Progress is usually measured by steadiness, sleep, recovery time, and daily function'] },
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
                <p style={{ marginBottom: 16 }}>There is no honest fixed number. A narrow goal such as sleep preparation, appointment anxiety, or one specific trigger may be explored in a short course, often around <strong style={{ color: 'var(--hf-fg)' }}>four to six sessions</strong>. Complex trauma, multiple traumatic events, dissociation, panic, severe avoidance, or safety concerns usually require broader support.</p>
                <p style={{ marginBottom: 16 }}>The practical marker is not whether every memory or body response disappears. It is whether your system has more choice: shorter recovery time after activation, steadier sleep routines, fewer avoidance spirals, more reliable grounding, or a calmer way to approach a specific situation.</p>
                <p>If symptoms are escalating, daily functioning is collapsing, or safety is uncertain, qualified healthcare support comes first. Hypnotherapy can support regulation and rehearsal, but it should never delay urgent mental health care.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find Hypnotherapists for PTSD Support</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 640, margin: '0 auto 40px' }}>Connect with certified hypnotherapists who work with trauma-related anxiety, sleep, stress, grounding, and emotional regulation. Ask about trauma-informed training, referral boundaries, consent, and how they coordinate with wider care.</p>
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
                <p style={{ marginBottom: 16 }}>It may be worth exploring if your main goals are specific and practical: safer sleep routines, grounding after triggers, calmer preparation for appointments, less avoidance around one situation, or more confidence using coping skills from therapy. It is usually most useful when the practitioner can focus on one pattern at a time.</p>
                <p style={{ marginBottom: 16 }}>It is not the right standalone option if you are in crisis, feel unsafe, are experiencing severe dissociation, have recent trauma with high instability, or need specialist trauma therapy, medication advice, diagnosis, or emergency care. In those situations, healthcare comes first. A good hypnotherapist will respect that boundary.</p>
                <p>Before booking, ask the practitioner what trauma-informed training they have, whether they work within a stabilization-first model, how they handle consent, when they refer out, whether they coordinate with therapists or doctors, and whether they avoid forced memory work.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 32 }}>Frequently Asked Questions About Hypnotherapy for PTSD</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { q: 'Can hypnotherapy help with PTSD?', a: 'Hypnotherapy may support some people with PTSD-related sleep disruption, body activation, trigger anticipation, avoidance, and grounding. It should sit alongside qualified mental health care where symptoms are significant.' },
                  { q: 'Will hypnotherapy make me relive trauma?', a: 'It should not. Trauma-informed hypnotherapy should not force memory retrieval or pressure you to describe traumatic details. Early work should focus on stabilization, consent, and control.' },
                  { q: 'Is online hypnotherapy appropriate for PTSD support?', a: 'Online sessions can work for grounding, sleep routines, and trigger rehearsal if you feel safe at home and have appropriate support. If you are in crisis or at risk, urgent local care is more appropriate.' },
                  { q: 'Can hypnotherapy replace trauma therapy?', a: 'No. Hypnotherapy is complementary. It should not replace trauma-focused therapy, medication advice, crisis support, or care from a qualified healthcare provider.' },
                  { q: 'What should I ask before booking?', a: 'Ask about trauma-informed training, consent, stabilization, referral boundaries, crisis procedures, and whether the practitioner is comfortable coordinating with your existing healthcare team.' },
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
                  { href: '/ptsd-quiz', title: 'PTSD Quiz', desc: 'Reflect on trauma-related patterns and when extra support may be worth considering' },
                  { href: '/hypnotherapy-for-anxiety', title: 'Hypnotherapy for Anxiety', desc: 'Many trauma-related patterns overlap with anxiety and body activation' },
                  { href: '/hypnotherapy-for-sleep', title: 'Hypnotherapy for Sleep', desc: 'Sleep routines are often a practical first target for trauma-related support' },
                  { href: '/online-hypnotherapy', title: 'Online Hypnotherapy', desc: 'Explore when remote sessions may be appropriate and when local care matters more' },
                ].map((link) => (
                  <a key={link.href} href={link.href} className="glass-card hf-card-hover" style={{ display: 'block', padding: '20px', textDecoration: 'none' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-accent)', marginBottom: 6 }}>{link.title}</h3>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.5, margin: 0 }}>{link.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
