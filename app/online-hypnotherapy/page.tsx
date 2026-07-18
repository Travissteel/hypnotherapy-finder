import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Monitor, Video, Globe, Brain, CheckCircle, Search, Shield, Clock } from 'lucide-react';
import { getAllPractitioners } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Online Hypnotherapy | Find Certified Virtual Practitioners',
  description: 'Online hypnotherapy lets you work with a certified hypnotherapist from home over secure video. Learn how it works, whether it is as effective as in-person, and find practitioners offering online sessions.',
  keywords: 'online hypnotherapy, virtual hypnotherapy, hypnotherapy online, remote hypnotherapy, hypnotherapy over video, online hypnosis',
  alternates: { canonical: 'https://hypnotherapy-finder.com/online-hypnotherapy' },
  openGraph: {
    title: 'Online Hypnotherapy — Certified Virtual Sessions from Home',
    description: 'How online hypnotherapy works, whether it is as effective as in-person, and how to find certified practitioners offering virtual sessions.',
    url: 'https://hypnotherapy-finder.com/online-hypnotherapy',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Online Hypnotherapy' }],
  },
  twitter: { card: 'summary_large_image', title: 'Online Hypnotherapy — Certified Virtual Sessions from Home', description: 'How online hypnotherapy works, whether it is as effective as in-person, and how to find certified practitioners offering virtual sessions.', images: ['/logo.png'] },
};

export default async function OnlineHypnotherapyPage() {
  const allPractitioners = getAllPractitioners();
  const onlineSpecialists = allPractitioners.filter(p => {
    const sessions = [...(p.session_types || []), p.sessionType || ''].join(' ').toLowerCase();
    const specs = p.specialties.join(' ').toLowerCase();
    return sessions.includes('online') || sessions.includes('virtual') || sessions.includes('both') || sessions.includes('hybrid') || specs.includes('online');
  });
  const featured = (onlineSpecialists.length >= 6 ? onlineSpecialists : allPractitioners).slice(0, 9);

  const jsonLd = { '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Online Hypnotherapy — Certified Virtual Sessions', description: 'Guide to online hypnotherapy: how virtual sessions work, whether they are as effective as in-person, what you need to prepare, and how to find certified practitioners offering online hypnotherapy.', mainEntity: { '@type': 'MedicalTherapy', name: 'Online Hypnotherapy', description: 'Hypnotherapy delivered remotely over secure video conferencing by a certified practitioner.' } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: 'Is online hypnotherapy as effective as in-person?', acceptedAnswer: { '@type': 'Answer', text: 'For most people and most goals, online hypnotherapy can be as effective as in-person work. Hypnotherapy relies on your attention and the practitioner’s voice guiding you into a focused, relaxed state — both of which carry well over video. Many people find being in their own home makes it easier to relax. In-person may suit those without a private, quiet space or with limited internet.' } },
    { '@type': 'Question', name: 'What do I need for an online hypnotherapy session?', acceptedAnswer: { '@type': 'Answer', text: 'A quiet, private room where you won’t be interrupted, a stable internet connection, headphones for clearer audio, and a comfortable chair or place to recline. Most practitioners use secure video platforms such as Zoom. Your practitioner will send a link and any preparation notes before the session.' } },
    { '@type': 'Question', name: 'Can you be hypnotized over video?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Hypnosis is a natural, self-directed state of focused attention — the practitioner guides you into it with their voice, which works whether they are in the room or on a screen. You remain aware and in control throughout, exactly as you would in person.' } },
    { '@type': 'Question', name: 'Is online hypnotherapy safe and private?', acceptedAnswer: { '@type': 'Answer', text: 'Reputable practitioners use encrypted, confidential video platforms and follow the same professional and ethical standards as in-person work. Ask any practitioner how they protect your privacy and which platform they use before booking.' } },
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
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Virtual Sessions</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Online Hypnotherapy — Work with a Certified Practitioner from Home
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 32 }}>
                Online hypnotherapy connects you with a certified hypnotherapist over secure video, so you can do the work from a quiet room in your own home. For most goals it can be just as effective as sitting in a clinic — and often easier to fit into real life.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/search?session=online" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find Online Hypnotherapists
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What is Online Hypnotherapy?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--hf-fg)' }}>Online hypnotherapy</strong> is hypnotherapy delivered remotely — you and the practitioner meet over a secure video call rather than in a treatment room. The session itself is the same: the hypnotherapist talks with you about your goal, then guides you with their voice into a focused, relaxed state where you work on the patterns you want to change.</p>
                <p style={{ marginBottom: 16 }}>The reason it translates so well to video is that hypnotherapy was never really about the room. It works through your attention and the practitioner&apos;s guidance — and both carry cleanly down a video connection, especially with headphones. Many people find that being in a familiar, private space at home helps them relax more easily than a clinic ever did.</p>
                <p>Online hypnotherapy has grown quickly because it removes the practical barriers that stop people starting: travel time, finding a specialist locally, fitting appointments around work or caring responsibilities. It also opens up practitioners who specialise in your specific concern, even if they practise on the other side of the country.</p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 40 }}>Why People Choose Online Hypnotherapy</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                {[
                  { icon: Globe, label: 'Access Any Specialist', desc: 'You are no longer limited to who practises nearby — you can work with a hypnotherapist who specialises in your specific concern, wherever they are.' },
                  { icon: Clock, label: 'Fits Real Life', desc: 'No commute means sessions slot around work, childcare, and travel far more easily, which makes it simpler to stay consistent.' },
                  { icon: Shield, label: 'Comfort of Home', desc: 'Being in your own quiet, private space can make it easier to settle and relax — the state hypnotherapy depends on.' },
                  { icon: Monitor, label: 'Same Professional Standards', desc: 'A certified online practitioner follows the same ethical and confidentiality standards as an in-person one, over an encrypted platform.' },
                  { icon: Video, label: 'Easy Follow-Up', desc: 'Recordings, self-hypnosis audio, and quick check-ins between sessions are simple to share when you are already working online.' },
                  { icon: Brain, label: 'Lower Barrier to Start', desc: 'Removing travel and waiting rooms helps many people take the first step they had been putting off.' },
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>How an Online Hypnotherapy Session Works</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>The mechanism is identical to in-person work — only the delivery changes. Here is what actually happens on the call.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { n: '1', title: 'Set-Up and Consultation', body: 'The session opens like any other: you talk through what you want to work on and what you would like to be different. Your practitioner checks your space is private and that your audio is clear, and explains how the video session will run.' },
                  { n: '2', title: 'Settling and Induction', body: 'You get comfortable — reclined or seated — usually with headphones. The practitioner uses their voice, guided breathing, and gentle focus cues to help you ease into a relaxed, absorbed state. This is the same induction they would use in the room; the screen does not change how it feels.' },
                  { n: '3', title: 'The Therapeutic Work', body: 'In that focused state, the practitioner offers suggestions, imagery, and reframing aimed at the pattern you came to change — whether that is an anxious response, a habit, or a sleep problem. You stay aware and can speak or stop at any point.' },
                  { n: '4', title: 'Re-Alerting and Debrief', body: 'The practitioner brings you gently back to full alertness and you talk through how it felt. This is a good moment to raise anything that came up so it can shape the next session.' },
                  { n: '5', title: 'Between-Session Tools', body: 'Because everything is already digital, it is easy for the practitioner to share a self-hypnosis recording or short exercises to reinforce the work until you next meet.' },
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

          {/* What you need / setup */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>What You Need for a Good Online Session</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>A little preparation makes online hypnotherapy feel just as immersive as being in the room.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { title: 'A private, quiet room', body: 'Somewhere you won’t be interrupted for the length of the session. Tell others in the house you’ll be unavailable, and silence notifications.' },
                  { title: 'Headphones', body: 'Headphones keep the practitioner’s voice clear and close, which helps you focus and blocks out background noise. This is the single biggest quality upgrade.' },
                  { title: 'A stable connection', body: 'A reliable internet connection avoids drop-outs mid-session. If Wi-Fi is patchy, sitting near the router or using a wired connection helps.' },
                  { title: 'A comfortable position', body: 'A supportive chair or a place to recline where you can let your body relax without falling asleep. Have water nearby.' },
                ].map((item) => (
                  <div key={item.title} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <CheckCircle style={{ width: 20, height: 20, color: 'var(--hf-accent)', flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 6 }}>{item.title}</h3>
                      <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How long does it take */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>How Long Does Online Hypnotherapy Take?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>Individual sessions usually run <strong style={{ color: 'var(--hf-fg)' }}>50 to 90 minutes</strong>, with the first session often longer to allow time for a proper consultation. The overall course depends on what you are working on.</p>
                <p style={{ marginBottom: 16 }}>Focused, single-issue goals — such as a specific fear or a habit like smoking — may need only a handful of sessions. Longer-standing patterns tied to anxiety, sleep, or confidence typically unfold over several sessions as new responses have a chance to settle. Many practitioners suggest weekly or fortnightly sessions to keep momentum without rushing.</p>
                <p>Because online scheduling is flexible, it can be easier to keep a steady rhythm — and consistency tends to matter more than the exact number of sessions.</p>
              </div>
            </div>
          </section>

          {/* Practitioners */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find Hypnotherapists Offering Online Sessions</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>Connect with certified hypnotherapists who work with clients over secure video. Because location is no barrier online, you can choose by specialty and fit rather than postcode.</p>
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Is Online Hypnotherapy Right for You?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>Online hypnotherapy suits most people who are comfortable with video calls and have a private space to use. It can be a particularly good fit if you live somewhere without a local specialist, have a busy or unpredictable schedule, or simply relax more easily at home.</p>
                <p style={{ marginBottom: 16 }}>In-person may suit you better if you don&apos;t have a quiet, uninterrupted room, your internet is unreliable, or you know you focus best away from home. Some people also prefer the ritual of travelling to a dedicated space.</p>
                <p>If you&apos;re unsure, many practitioners offer a short introductory call so you can see how video feels before committing. Hypnotherapy is a complementary approach — it works best alongside, not instead of, appropriate medical or psychological care. If you&apos;re experiencing significant symptoms, please consult a qualified healthcare provider.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 32 }}>Frequently Asked Questions About Online Hypnotherapy</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { q: 'Is online hypnotherapy as effective as in-person?', a: 'For most people and most goals, online hypnotherapy can be as effective as in-person work. Hypnotherapy relies on your attention and the practitioner’s voice guiding you into a focused, relaxed state — both of which carry well over video. Many people find being in their own home makes it easier to relax. In-person may suit those without a private, quiet space or with limited internet.' },
                  { q: 'What do I need for an online hypnotherapy session?', a: 'A quiet, private room where you won’t be interrupted, a stable internet connection, headphones for clearer audio, and a comfortable chair or place to recline. Most practitioners use secure video platforms such as Zoom. Your practitioner will send a link and any preparation notes before the session.' },
                  { q: 'Can you really be hypnotized over video?', a: 'Yes. Hypnosis is a natural, self-directed state of focused attention — the practitioner guides you into it with their voice, which works whether they are in the room or on a screen. You remain aware and in control throughout, exactly as you would in person.' },
                  { q: 'Is it private and secure?', a: 'Reputable practitioners use encrypted, confidential video platforms and follow the same professional and ethical standards as in-person work. It is reasonable to ask any practitioner how they protect your privacy and which platform they use before booking.' },
                  { q: 'What if I fall asleep or lose the connection?', a: 'Practitioners are used to both. If the connection drops, you simply rejoin — you cannot get "stuck". And if you drift toward sleep, the practitioner’s voice gently keeps you in the working state; many people are surprised how aware they remain.' },
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
                  { href: '/hypnotherapy-for-anxiety', title: 'Hypnotherapy for Anxiety', desc: 'A common reason people seek online sessions — how hypnotherapy supports anxiety' },
                  { href: '/what-is-hypnotherapy', title: 'What Is Hypnotherapy?', desc: 'The science and process behind hypnotherapy, in the room or online' },
                  { href: '/hypnotherapy-cost', title: 'Hypnotherapy Cost', desc: 'What sessions typically cost, including online pricing' },
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Ready to Try Online Hypnotherapy?</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>Find a certified hypnotherapist offering secure online sessions and book a consultation from wherever you are.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/find-a-hypnotherapist" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find Online Hypnotherapists
                </Link>
                <Link href="/hypnotherapy-cost" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  See Session Costs
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
