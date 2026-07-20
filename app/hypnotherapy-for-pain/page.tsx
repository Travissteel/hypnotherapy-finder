import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Brain, CheckCircle, HeartPulse, Search, Shield, Clock } from 'lucide-react';
import { getAllPractitioners } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Hypnotherapy for Pain | Find Certified Practitioners',
  description: 'Hypnotherapy for pain may support comfort, stress response, sleep, and coping alongside healthcare. Learn how sessions work and find certified practitioners.',
  keywords: 'hypnotherapy for pain, hypnosis for chronic pain, pain hypnotherapist, hypnotherapy pain support, hypnosis pain management',
  alternates: { canonical: 'https://hypnotherapy-finder.com/hypnotherapy-for-pain' },
  openGraph: {
    title: 'Hypnotherapy for Pain — Support for Comfort, Coping, and Stress Response',
    description: 'How hypnotherapy may support pain-related patterns alongside healthcare, what sessions look like, and how to find certified practitioners.',
    url: 'https://hypnotherapy-finder.com/hypnotherapy-for-pain',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Hypnotherapy for Pain' }],
  },
  twitter: { card: 'summary_large_image', title: 'Hypnotherapy for Pain — Support for Comfort and Coping', description: 'How hypnotherapy may support pain-related patterns alongside healthcare, what sessions look like, and how to find certified practitioners.', images: ['/logo.png'] },
};

export default async function HypnotherapyForPainPage() {
  const allPractitioners = getAllPractitioners();
  const painSpecialists = allPractitioners.filter(p => {
    const specs = p.specialties.join(' ').toLowerCase();
    return specs.includes('pain') || specs.includes('chronic') || specs.includes('stress') || specs.includes('anxiety') || specs.includes('sleep');
  });
  const featured = (painSpecialists.length >= 6 ? painSpecialists : allPractitioners).slice(0, 9);

  const jsonLd = { '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Hypnotherapy for Pain', description: 'Guide to hypnotherapy for pain: how it may support comfort, stress response, sleep, coping, and pain-related fear alongside appropriate healthcare.', mainEntity: { '@type': 'MedicalCondition', name: 'Pain and Chronic Pain', possibleTreatment: { '@type': 'MedicalTherapy', name: 'Hypnotherapy for Pain Support', description: 'Hypnotherapy techniques that may support relaxation, attention shifting, coping imagery, sleep routines, and stress response around pain.' } } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: 'Can hypnotherapy help with pain?', acceptedAnswer: { '@type': 'Answer', text: 'Hypnotherapy may help some people with pain-related patterns such as tension, fear of flare-ups, sleep disruption, stress response, and coping. It is a complementary approach and should be used alongside appropriate medical care, especially for new, severe, or changing pain.' } },
    { '@type': 'Question', name: 'Is hypnotherapy a substitute for medical care?', acceptedAnswer: { '@type': 'Answer', text: 'No. Hypnotherapy should not replace diagnosis, medication advice, physical therapy, surgery decisions, or care from qualified healthcare providers. A responsible practitioner will encourage medical assessment for unexplained, worsening, or severe pain.' } },
    { '@type': 'Question', name: 'How many sessions are usually needed?', acceptedAnswer: { '@type': 'Answer', text: 'The timeframe varies. Some people explore a short course of four to six sessions for a specific pain-related pattern, while complex or long-standing pain may require a broader support plan and coordination with healthcare providers.' } },
    { '@type': 'Question', name: 'What happens in a pain-focused hypnotherapy session?', acceptedAnswer: { '@type': 'Answer', text: 'Sessions usually include a careful conversation about pain triggers, medical support, daily routines, stress, sleep, and goals, followed by guided relaxation, imagery, suggestion, and rehearsal for comfort, pacing, and calmer responses.' } },
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
            <div style={{ maxWidth: 740, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Pain &amp; Chronic Pain Support</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Hypnotherapy for Pain — Support the Patterns Around Discomfort
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 32 }}>
                Pain is real. It is not “all in your head.” But the nervous system, attention, fear, muscle tension, sleep, and stress can all shape how pain is experienced. Hypnotherapy may support those surrounding patterns while proper healthcare handles the medical side.
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What is Hypnotherapy for Pain?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--hf-fg)' }}>Hypnotherapy for pain</strong> uses guided relaxation, focused attention, imagery, and therapeutic suggestion to work with the way the mind and body respond to discomfort. The goal is not to deny pain or override medical advice. The useful target is the loop around pain: bracing, scanning, fear of movement, poor sleep, and the sense that every sensation means danger.</p>
                <p style={{ marginBottom: 16 }}>Many people looking for hypnosis for pain are dealing with chronic pain, flare-up anxiety, tension headaches, jaw clenching, back pain, IBS-related discomfort, post-injury fear, or pain that gets louder under stress. A responsible hypnotherapist will ask about medical assessment, current care, medications, red flags, and what your doctor or specialist has already advised.</p>
                <p>Hypnotherapy is a complementary approach. If you&apos;re experiencing significant symptoms, please consult a qualified healthcare provider. If pain is sudden, severe, unexplained, spreading, associated with weakness, fever, chest symptoms, neurological changes, or follows an injury, seek medical help promptly.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 920, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 40 }}>How Hypnotherapy May Support Pain-Related Patterns</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                {[
                  { icon: Brain, label: 'Shifts Attention', desc: 'Focused imagery can help the mind practise moving attention away from constant body scanning and toward steadier internal anchors.' },
                  { icon: HeartPulse, label: 'Calms the Stress Response', desc: 'Pain and stress can amplify one another. Sessions often focus on helping the body settle so discomfort feels less threatening.' },
                  { icon: Shield, label: 'Reduces Protective Bracing', desc: 'Guided relaxation may support awareness of jaw, shoulder, abdomen, pelvic, or back tension that builds around pain.' },
                  { icon: Clock, label: 'Supports Sleep Routines', desc: 'Pain often disrupts sleep, and poor sleep can make coping harder. Hypnotherapy can rehearse pre-sleep settling and comfort cues.' },
                  { icon: CheckCircle, label: 'Builds Pacing Confidence', desc: 'Future rehearsal can help you practise moving, resting, and pacing without swinging between overdoing it and complete avoidance.' },
                  { icon: Brain, label: 'Works Alongside Healthcare', desc: 'The safest frame is complementary: medical care investigates and manages the condition while hypnotherapy supports response patterns.' },
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>How Pain-Focused Hypnotherapy Works</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>The mechanism is not mind-over-matter theatre. It is state change, attention training, and rehearsal: helping the nervous system move from alarm to steadiness, then practising a different response to sensation.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { n: '1', title: 'Mapping the Pain Loop', body: 'The practitioner asks when pain feels worse, what triggers fear, where the body braces, what sleep is like, what medical care is in place, and which daily activities have become loaded with anticipation.' },
                  { n: '2', title: 'Settling the Body State', body: 'Through breath, imagery, progressive relaxation, or Ericksonian suggestion, you are guided into a steadier state where the nervous system has less need to sound the alarm.' },
                  { n: '3', title: 'Changing the Sensory Metaphor', body: 'Some practitioners use imagery such as volume dials, warmth, cooling, distance, shape, colour, or movement to help the brain relate to sensation with more flexibility.' },
                  { n: '4', title: 'Rehearsing Pacing and Movement', body: 'Future pacing may guide you through walking, sitting, driving, sleeping, returning to work, or attending appointments with less bracing and more realistic pacing.' },
                  { n: '5', title: 'Between-Session Practice', body: 'You may receive a recording or short self-hypnosis practice. Repetition matters because pain-related fear and scanning often return automatically unless the new response is rehearsed.' },
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
                  { title: 'First Session', body: 'Expect a careful consultation before any hypnosis work. The practitioner should ask about your diagnosis or medical investigations where relevant, current healthcare team, medication, pain triggers, sleep, activity limits, and what you want to be different day to day.', bullets: ['You stay aware and in control throughout', 'No ethical practitioner should ask you to ignore medical advice', 'The work should focus on comfort, coping, pacing, and response patterns'] },
                  { title: 'Ongoing Sessions', body: 'Later sessions usually focus on one or two patterns at a time: sleep, flare-up fear, movement confidence, appointment anxiety, muscle tension, or stress-driven amplification. The trance work may include comfort imagery, parts work, anchoring, future pacing, and self-hypnosis practice.', bullets: ['Sessions often run 50–90 minutes', 'You may receive a recording for home practice', 'Progress is usually measured by function and coping, not dramatic claims'] },
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
                <p style={{ marginBottom: 16 }}>There is no honest fixed number. A narrow goal such as pre-sleep comfort practice, appointment anxiety, or flare-up fear may be explored in a short course, often around <strong style={{ color: 'var(--hf-fg)' }}>four to six sessions</strong>. Complex, severe, or long-standing pain usually needs wider support and should not be handled by hypnotherapy alone.</p>
                <p style={{ marginBottom: 16 }}>The practical marker is not whether every sensation disappears. It is whether the system starts responding differently: less bracing, better pacing, calmer sleep preparation, fewer fear spirals, more confidence following your healthcare plan, or an easier time returning to safe daily activities.</p>
                <p>If pain is worsening, unexplained, or affecting major function, healthcare comes first. Hypnotherapy can support coping and nervous-system regulation, but it should never delay appropriate medical assessment.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find Hypnotherapists for Pain Support</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 620, margin: '0 auto 40px' }}>Connect with certified hypnotherapists who work with pain-related stress, sleep, anxiety, tension, and coping. Ask about their scope, referral boundaries, and how they coordinate with medical care.</p>
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
                <p style={{ marginBottom: 16 }}>It may be worth exploring if your main goals are specific and practical: calmer responses to flare-ups, less fear around safe movement, better sleep preparation, fewer body-scanning loops, or more confidence pacing daily activities. It is usually most useful when you can identify one pattern you want to work with first.</p>
                <p style={{ marginBottom: 16 }}>It is not the right standalone option if pain is new, severe, worsening, unexplained, linked with neurological symptoms, or not yet assessed by a qualified healthcare provider. In those situations, medical care comes first. A good hypnotherapist will respect that boundary.</p>
                <p>Before booking, ask the practitioner how they handle pain-related work, what qualifications they hold, when they refer out, whether they require medical clearance for certain situations, and whether they are comfortable working alongside your doctor, physical therapist, psychologist, or specialist.</p>
              </div>
            </div>
          </section>

          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 32 }}>Frequently Asked Questions About Hypnotherapy for Pain</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { q: 'Can hypnotherapy help with chronic pain?', a: 'Hypnotherapy may help some people with pain-related stress, body scanning, bracing, flare-up fear, and sleep disruption. It is complementary and should sit alongside appropriate medical care, especially where symptoms are significant or changing.' },
                  { q: 'Can hypnotherapy replace medication or physical therapy?', a: 'No. Do not stop medication, physical therapy, specialist care, or other healthcare advice because of hypnotherapy. Use it as a support for comfort, coping, and response patterns, not as a replacement for clinical care.' },
                  { q: 'Will I lose control during hypnosis?', a: 'No. Hypnosis is a focused, relaxed state. You remain aware, can speak, and can stop at any point. Ethical practitioners explain the process clearly before starting.' },
                  { q: 'Can online hypnotherapy work for pain support?', a: 'Online sessions can work well for practical patterns such as sleep routines, relaxation practice, flare-up fear, and stress response, provided there is a private space and appropriate medical support where needed.' },
                  { q: 'What should I ask before booking?', a: 'Ask about qualifications, pain-related experience, referral boundaries, whether they work with chronic pain clients, how they handle medical red flags, and what home practice is usually involved.' },
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
                  { href: '/hypnotherapy-for-anxiety', title: 'Hypnotherapy for Anxiety', desc: 'Pain and anxiety often overlap — learn how hypnotherapy may support anxious response patterns' },
                  { href: '/hypnotherapy-for-sleep', title: 'Hypnotherapy for Sleep', desc: 'Sleep disruption can make pain harder to cope with. See how sleep-focused sessions work' },
                  { href: '/online-hypnotherapy', title: 'Online Hypnotherapy', desc: 'Work with a certified practitioner from home over secure video' },
                  { href: '/blog/hypnotherapy-for-chronic-pain-guide', title: 'Chronic Pain Guide', desc: 'Read the deeper blog guide on hypnotherapy and chronic pain support' },
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
