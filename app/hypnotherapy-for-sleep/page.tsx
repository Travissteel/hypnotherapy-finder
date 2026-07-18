import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Moon, Brain, CheckCircle, Search, Shield, Clock } from 'lucide-react';
import { getAllPractitioners } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Hypnotherapy for Sleep | Find Insomnia Specialists',
  description: 'Hypnotherapy for sleep may help calm a racing mind, ease the anxiety around bedtime, and rebuild a healthier sleep pattern. Learn how it works and find certified practitioners.',
  keywords: 'hypnotherapy for sleep, hypnotherapy for insomnia, sleep hypnotherapy, hypnosis for sleep, hypnotherapy sleep problems, cant sleep hypnotherapy',
  alternates: { canonical: 'https://hypnotherapy-finder.com/hypnotherapy-for-sleep' },
  openGraph: {
    title: 'Hypnotherapy for Sleep — Calm the Mind, Rebuild the Pattern',
    description: 'How hypnotherapy for sleep and insomnia works, what a session looks like, and how to find certified practitioners.',
    url: 'https://hypnotherapy-finder.com/hypnotherapy-for-sleep',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Hypnotherapy for Sleep' }],
  },
  twitter: { card: 'summary_large_image', title: 'Hypnotherapy for Sleep — Calm the Mind, Rebuild the Pattern', description: 'How hypnotherapy for sleep and insomnia works, what a session looks like, and how to find certified practitioners.', images: ['/logo.png'] },
};

export default async function HypnotherapyForSleepPage() {
  const allPractitioners = getAllPractitioners();
  const sleepSpecialists = allPractitioners.filter(p => {
    const specs = p.specialties.join(' ').toLowerCase();
    return specs.includes('sleep') || specs.includes('insomnia') || specs.includes('anxiety') || specs.includes('stress');
  });
  const featured = (sleepSpecialists.length >= 6 ? sleepSpecialists : allPractitioners).slice(0, 9);

  const jsonLd = { '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Hypnotherapy for Sleep and Insomnia', description: 'Guide to hypnotherapy for sleep: how it may help with insomnia and a racing mind at night, what a session looks like, realistic timeframes, and how to find certified practitioners.', mainEntity: { '@type': 'MedicalCondition', name: 'Insomnia and Sleep Difficulties', possibleTreatment: { '@type': 'MedicalTherapy', name: 'Hypnotherapy for Sleep', description: 'Hypnotherapy techniques that may support relaxation, reduce bedtime anxiety, and help rebuild healthier sleep patterns.' } } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: 'Can hypnotherapy help with insomnia?', acceptedAnswer: { '@type': 'Answer', text: 'Many people find hypnotherapy can support better sleep, especially when insomnia is driven by a racing mind, stress, or anxiety about not sleeping. It works by helping you relax deeply and by easing the mental patterns that keep you alert at bedtime. It is a complementary approach and not a substitute for medical care if a sleep disorder is suspected.' } },
    { '@type': 'Question', name: 'How many sessions of sleep hypnotherapy do I need?', acceptedAnswer: { '@type': 'Answer', text: 'It varies. Some people notice they settle more easily within a few sessions, while longer-standing sleep problems may take a course of several. Practitioners often teach self-hypnosis so you can use the techniques yourself at bedtime, which supports lasting change.' } },
    { '@type': 'Question', name: 'Is hypnotherapy for sleep safe?', acceptedAnswer: { '@type': 'Answer', text: 'Hypnotherapy is a non-invasive, drug-free approach and is generally considered safe when delivered by a certified practitioner. You remain aware and in control throughout. If you have a diagnosed sleep disorder such as sleep apnea, speak with your doctor, as hypnotherapy addresses the mental and behavioural side of sleep rather than physical causes.' } },
    { '@type': 'Question', name: 'What if my mind races the moment I lie down?', acceptedAnswer: { '@type': 'Answer', text: 'A racing mind at bedtime is one of the most common reasons people try sleep hypnotherapy. Sessions focus on quietening that mental activity, breaking the link between bed and worry, and giving you a repeatable way to wind down.' } },
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

          {/* Hero */}
          <section style={{ background: 'var(--hf-bg-mid)', padding: '72px 24px 64px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Sleep &amp; Insomnia</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Hypnotherapy for Sleep — Quiet the Mind, Rebuild the Pattern
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 32 }}>
                When the lights go off and your mind switches on, sleep can feel impossible. Hypnotherapy for sleep works with the anxious, racing patterns that keep you awake — helping you relax, break the worry-about-not-sleeping loop, and rebuild a healthier bedtime rhythm.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/search?specialty=sleep" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find Sleep Specialists
                </Link>
                <Link href="#how-it-works" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  How It Works
                </Link>
              </div>
            </div>
          </section>

          {/* What Is */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What is Hypnotherapy for Sleep?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--hf-fg)' }}>Hypnotherapy for sleep</strong> uses guided relaxation and focused suggestion to address the mental and behavioural patterns that get in the way of rest. For a large share of people with insomnia, the problem isn&apos;t that the body can&apos;t sleep — it&apos;s that the mind won&apos;t stop. Hypnotherapy works directly with that.</p>
                <p style={{ marginBottom: 16 }}>A common driver of poor sleep is a self-feeding loop: you can&apos;t sleep, so you start worrying about not sleeping, which raises your alertness, which makes sleep even less likely. Hypnotherapy for sleep helps interrupt that cycle — calming the nervous system and gently loosening the association between lying in bed and feeling wired.</p>
                <p>Some research suggests hypnotherapy and hypnosis-based relaxation may help people fall asleep faster and spend more time in deeper sleep, particularly where stress and anxiety are involved. It is best thought of as a way to retrain your wind-down, not an instant switch.</p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 40 }}>How Hypnotherapy May Support Better Sleep</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                {[
                  { icon: Brain, label: 'Quiets a Racing Mind', desc: 'Sessions target the mental chatter and problem-solving that flare up the moment your head hits the pillow.' },
                  { icon: Shield, label: 'Eases Bedtime Anxiety', desc: 'By loosening the fear of another bad night, hypnotherapy can break the worry-about-sleep loop that keeps you alert.' },
                  { icon: Moon, label: 'Rebuilds Wind-Down', desc: 'You learn a repeatable relaxation routine that signals your body it is safe to switch off.' },
                  { icon: Clock, label: 'Drug-Free Approach', desc: 'A non-medication option that many people use alongside good sleep habits rather than sleeping pills.' },
                  { icon: CheckCircle, label: 'Self-Hypnosis Tools', desc: 'Most practitioners teach techniques you can use yourself at bedtime, so progress continues between sessions.' },
                  { icon: Shield, label: 'Addresses the Cause', desc: 'Rather than masking symptoms, it works on the stress and thought patterns feeding the sleeplessness.' },
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

          {/* How It Works — mechanism */}
          <section id="how-it-works" style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>How Sleep Hypnotherapy Works</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>The specific mechanism for sleep is about lowering arousal and re-teaching your mind and body how to let go at night.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { n: '1', title: 'Understanding Your Sleep Pattern', body: 'The practitioner explores what your nights actually look like — trouble falling asleep, waking in the small hours, a wired-but-tired feeling — and what tends to be running through your mind. This shapes the approach, because 3am wakeups and can’t-switch-off are worked with differently.' },
                  { n: '2', title: 'Deep Relaxation', body: 'You are guided into a calm, focused state that lowers physical and mental arousal — the opposite of the fight-or-flight edge that keeps insomnia going. Your body gets a felt reminder of what winding down feels like.' },
                  { n: '3', title: 'Reframing the Bed–Worry Link', body: 'Suggestions and imagery help decouple your bed from the anxiety of not sleeping, so lying down stops triggering alertness and starts signalling rest instead.' },
                  { n: '4', title: 'Calming the Racing Mind', body: 'Techniques such as mental "offloading", imagery, and pacing help settle the problem-solving and rumination that spike at night, giving your mind somewhere to go other than tomorrow’s to-do list.' },
                  { n: '5', title: 'Self-Hypnosis for Bedtime', body: 'You are taught a short routine to use on your own each night. This is often the part that makes the change stick, because it puts the wind-down back under your control.' },
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

          {/* What a session looks like */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 32 }}>What Does a Sleep Hypnotherapy Session Look Like?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { title: 'Your First Session', body: 'The first session usually runs 60–90 minutes. Expect a proper conversation about your sleep history, stress levels, bedtime routine, and what you have already tried. The practitioner then guides you through an initial relaxation so you can feel the state you will be working in.', bullets: ['You stay aware and in control the whole time', 'Most people find it deeply calming — a taste of the wind-down itself', 'Nothing happens against your will; you can pause at any point'] },
                  { title: 'Ongoing Sessions', body: 'Later sessions build on the relaxation with targeted suggestion and imagery for your specific pattern, plus refining the self-hypnosis routine you use at home. Many practitioners share a recording to listen to at bedtime between sessions.', bullets: ['Focus shifts to your specific sleep pattern', 'You practise the bedtime routine and report back on what shifts', 'Good sleep habits (light, screens, caffeine) are woven in alongside'] },
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

          {/* How long does it take */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>How Long Does It Take to Work?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>There&apos;s no fixed timeline, and honest practitioners won&apos;t promise one. Some people notice they settle more easily within the <strong style={{ color: 'var(--hf-fg)' }}>first few sessions</strong>, especially when stress is the main driver. Longer-standing insomnia, or sleep problems tangled up with anxiety, usually take a fuller course as the new patterns bed in.</p>
                <p style={{ marginBottom: 16 }}>Because the goal is to retrain a habit, consistency matters more than intensity. Using the self-hypnosis routine nightly between sessions tends to be what turns a good session into a lasting change.</p>
                <p>If your sleep doesn&apos;t improve, or you suspect a physical cause such as sleep apnea, restless legs, or a medication side effect, it&apos;s worth revisiting your doctor — hypnotherapy works on the mind-and-habit side of sleep, not physical sleep disorders.</p>
              </div>
            </div>
          </section>

          {/* Practitioners */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find Hypnotherapists for Sleep and Insomnia</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>Connect with certified hypnotherapists experienced with sleep, stress, and anxiety. Many offer online sessions, so you can start from home.</p>
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

          {/* Is it right for me */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Is Hypnotherapy for Sleep Right for You?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>Hypnotherapy tends to help most when your sleeplessness is driven by a busy mind, stress, or anxiety about sleep itself — the classic can&apos;t-switch-off or wake-at-3am-and-spiral pattern. If that sounds familiar, it may be a good fit, especially if you would rather not rely on medication.</p>
                <p style={{ marginBottom: 16 }}>It is less suited as a standalone answer where a physical sleep disorder is likely — persistent loud snoring and daytime exhaustion (possible sleep apnea), restless legs, or sleep disrupted by pain or medication all warrant a medical assessment first. Hypnotherapy can still play a supporting role alongside that care.</p>
                <p>Hypnotherapy is a complementary approach. If you&apos;re experiencing significant symptoms, or ongoing sleep loss is affecting your health or mood, please consult a qualified healthcare provider.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 32 }}>Frequently Asked Questions About Hypnotherapy for Sleep</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { q: 'Can hypnotherapy help with insomnia?', a: 'Many people find hypnotherapy can support better sleep, especially when insomnia is driven by a racing mind, stress, or anxiety about not sleeping. It works by helping you relax deeply and by easing the mental patterns that keep you alert at bedtime. It is a complementary approach and not a substitute for medical care if a sleep disorder is suspected.' },
                  { q: 'How many sessions will I need?', a: 'It varies. Some people notice they settle more easily within a few sessions, while longer-standing sleep problems may take a course of several. Practitioners often teach self-hypnosis so you can use the techniques yourself at bedtime, which supports lasting change.' },
                  { q: 'Is it safe?', a: 'Hypnotherapy is a non-invasive, drug-free approach and is generally considered safe when delivered by a certified practitioner. You remain aware and in control throughout. If you have a diagnosed sleep disorder such as sleep apnea, speak with your doctor, as hypnotherapy addresses the mental and behavioural side of sleep rather than physical causes.' },
                  { q: 'What if my mind races the moment I lie down?', a: 'A racing mind at bedtime is one of the most common reasons people try sleep hypnotherapy. Sessions focus on quietening that mental activity, breaking the link between bed and worry, and giving you a repeatable way to wind down.' },
                  { q: 'Can I do sleep hypnotherapy online?', a: 'Yes — sleep work translates well to video, and doing it from your own bedroom can even help. Many practitioners in our directory offer secure online sessions. See our online hypnotherapy guide for how it works.' },
                ].map((item) => (
                  <div key={item.q} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 10 }}>{item.q}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section style={{ padding: '48px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 24 }}>Related Hypnotherapy Resources</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                {[
                  { href: '/hypnotherapy-for-anxiety', title: 'Hypnotherapy for Anxiety', desc: 'Anxiety and sleep often go together — how hypnotherapy supports anxiety' },
                  { href: '/online-hypnotherapy', title: 'Online Hypnotherapy', desc: 'Do sleep sessions from your own bedroom over secure video' },
                  { href: '/hypnotherapy-cost', title: 'Hypnotherapy Cost', desc: 'What sessions typically cost and how packages work' },
                ].map((link) => (
                  <a key={link.href} href={link.href} className="glass-card hf-card-hover" style={{ display: 'block', padding: '20px', textDecoration: 'none' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-accent)', marginBottom: 6 }}>{link.title}</h3>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.5, margin: 0 }}>{link.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg, oklch(0.25 0.05 185), oklch(0.18 0.03 240))', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Ready for Better Sleep?</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>Find a certified hypnotherapist experienced with sleep and insomnia, and take the first step toward calmer nights.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/find-a-hypnotherapist" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find Sleep Hypnotherapists
                </Link>
                <Link href="/hypnotherapy-near-me" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  Browse All Hypnotherapists
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
