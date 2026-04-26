import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Heart, Brain, CheckCircle, Search, Shield, Clock } from 'lucide-react';
import { getAllPractitioners } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Hypnotherapy for Anxiety | Find Specialists',
  description: 'Hypnotherapy for anxiety helps manage stress, panic attacks, and anxiety disorders. Find certified specialists.',
  keywords: 'hypnotherapy for anxiety, anxiety hypnotherapy, hypnosis for anxiety, anxiety treatment, hypnotherapy anxiety relief',
  alternates: { canonical: 'https://hypnotherapy-finder.com/hypnotherapy-for-anxiety' },
  openGraph: {
    title: 'Hypnotherapy for Anxiety - Natural Anxiety Relief',
    description: 'Learn how hypnotherapy can help with anxiety disorders. Find qualified practitioners specializing in anxiety treatment.',
    url: 'https://hypnotherapy-finder.com/hypnotherapy-for-anxiety',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Hypnotherapy for Anxiety' }],
  },
  twitter: { card: 'summary_large_image', title: 'Hypnotherapy for Anxiety - Natural Anxiety Relief', description: 'Learn how hypnotherapy can help with anxiety disorders. Find qualified practitioners specializing in anxiety treatment.', images: ['/logo.png'] },
};

export default async function HypnotherapyForAnxietyPage() {
  const allPractitioners = getAllPractitioners();
  const anxietySpecialists = allPractitioners.filter(p =>
    p.specialties.some(s => s.toLowerCase().includes('anxiety') || s.toLowerCase().includes('stress'))
  ).slice(0, 9);

  const jsonLd = { '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Hypnotherapy for Anxiety - Natural Relief & Treatment', description: 'Comprehensive guide to hypnotherapy for anxiety. Learn how hypnotherapy helps manage anxiety disorders, panic attacks, and chronic stress. Find certified anxiety hypnotherapists.', mainEntity: { '@type': 'MedicalCondition', name: 'Anxiety Disorders', possibleTreatment: { '@type': 'MedicalTherapy', name: 'Hypnotherapy for Anxiety', description: 'Evidence-based hypnotherapy techniques for treating anxiety disorders, panic attacks, and stress-related conditions.' } } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Does hypnotherapy work for anxiety?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, research shows hypnotherapy for anxiety is highly effective. Studies demonstrate that hypnotherapy helps reduce anxiety symptoms, manage panic attacks, and improve overall well-being. It works by addressing the subconscious patterns that contribute to anxiety.' } }, { '@type': 'Question', name: 'How many sessions of hypnotherapy for anxiety do I need?', acceptedAnswer: { '@type': 'Answer', text: 'Most people see improvement in 4-8 sessions of hypnotherapy for anxiety. The exact number depends on the severity of your anxiety and your individual response to treatment. Your hypnotherapist will create a personalized treatment plan.' } }, { '@type': 'Question', name: 'Is hypnotherapy for anxiety safe?', acceptedAnswer: { '@type': 'Answer', text: "Yes, hypnotherapy for anxiety is completely safe when conducted by a certified professional. It's a non-invasive, drug-free approach with no negative side effects. You remain in control throughout the session." } }, { '@type': 'Question', name: 'Can hypnotherapy for anxiety be combined with other treatments?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, hypnotherapy for anxiety works well alongside other treatments like medication, cognitive behavioral therapy (CBT), and lifestyle changes. Always consult with your healthcare providers about combining treatments.' } }] };

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
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Anxiety Relief</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Hypnotherapy for Anxiety — Natural, Evidence-Based Relief
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 32 }}>
                Struggling with anxiety? Hypnotherapy for anxiety offers a proven, drug-free approach to managing anxiety disorders, panic attacks, and chronic stress. Find certified anxiety hypnotherapists near you.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/search?specialty=anxiety" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find Anxiety Specialists
                </Link>
                <Link href="#how-it-works" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  How It Works
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          <section style={{ padding: '48px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ position: 'relative', width: '100%', height: 400, borderRadius: 16, overflow: 'hidden', background: 'var(--hf-bg-mid)' }}>
                <Image src="/hypnotherapy-for-anxiety.png" alt="Hypnotherapy for anxiety session showing therapist helping client with relaxation techniques for anxiety relief and stress management" fill className="object-cover" priority />
              </div>
            </div>
          </section>

          {/* What Is */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What is Hypnotherapy for Anxiety?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--hf-fg)' }}>Hypnotherapy for anxiety</strong> is a therapeutic approach that uses guided hypnosis to help individuals manage and overcome anxiety disorders. During hypnotherapy for anxiety sessions, a certified hypnotherapist guides you into a deeply relaxed state where your subconscious mind becomes more receptive to positive suggestions and behavioral changes.</p>
                <p style={{ marginBottom: 16 }}>Anxiety hypnotherapy works by addressing the root causes of anxiety at a subconscious level. Unlike traditional talk therapy that focuses on conscious thoughts, hypnotherapy for anxiety accesses deeper mental patterns that may be fueling anxious responses. This makes anxiety hypnotherapy particularly effective for individuals who haven't found relief through other methods.</p>
                <p>Research shows that hypnotherapy for anxiety can be highly effective. Studies published in the International Journal of Clinical and Experimental Hypnosis demonstrate that anxiety hypnotherapy significantly reduces symptoms in individuals with generalized anxiety disorder, social anxiety, and panic disorders. Many people experience lasting relief after just a few hypnotherapy for anxiety sessions.</p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 40 }}>Benefits of Hypnotherapy for Anxiety</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                {[
                  { icon: Shield, label: 'Drug-Free Treatment', desc: 'Anxiety hypnotherapy offers a natural alternative to medication with no side effects or dependency risks.' },
                  { icon: Brain, label: 'Addresses Root Causes', desc: 'Hypnotherapy for anxiety targets subconscious patterns rather than just managing surface symptoms.' },
                  { icon: Clock, label: 'Fast Results', desc: 'Many clients report significant improvement after just 3–6 hypnotherapy for anxiety sessions.' },
                  { icon: Heart, label: 'Lasting Relief', desc: 'Anxiety hypnotherapy creates long-term changes by rewiring subconscious anxiety triggers.' },
                  { icon: CheckCircle, label: 'Personalized Approach', desc: 'Each hypnotherapy for anxiety session is tailored to your specific triggers and concerns.' },
                  { icon: Shield, label: 'Complementary Treatment', desc: 'Anxiety hypnotherapy works well alongside other treatments like therapy or medication.' },
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

          {/* How It Works */}
          <section id="how-it-works" style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 32 }}>How Hypnotherapy for Anxiety Works</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { n: '1', title: 'Initial Consultation', body: "Your anxiety hypnotherapy journey begins with a consultation where your hypnotherapist learns about your specific anxiety symptoms, triggers, and goals. They'll explain how hypnotherapy for anxiety works and answer your questions." },
                  { n: '2', title: 'Induction and Relaxation', body: 'The hypnotherapist guides you into a state of deep relaxation through breathing exercises and verbal cues. This relaxed state is where anxiety hypnotherapy becomes most effective, as your mind becomes more open to positive change.' },
                  { n: '3', title: 'Therapeutic Suggestions', body: 'During hypnotherapy for anxiety, the practitioner introduces positive suggestions and visualizations designed to reduce anxiety responses. These may include relaxation anchors, confidence building, and reframing anxious thoughts into calm, rational perspectives.' },
                  { n: '4', title: 'Addressing Root Causes', body: 'Anxiety hypnotherapy often involves exploring past experiences or patterns that contribute to current anxiety. Your hypnotherapist helps you process these experiences in a safe, controlled environment, reducing their emotional charge.' },
                  { n: '5', title: 'Self-Hypnosis Training', body: 'Most hypnotherapy for anxiety programs include teaching you self-hypnosis techniques. These tools allow you to manage anxiety symptoms on your own between sessions and after treatment concludes, providing lasting benefits.' },
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

          {/* Types of Anxiety */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Types of Anxiety Treated with Hypnotherapy</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>Hypnotherapy for anxiety is effective for various anxiety disorders and anxiety-related conditions.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { title: 'Generalized Anxiety Disorder (GAD)', body: 'Hypnotherapy for anxiety helps those with GAD reduce constant worry and excessive anxiety about everyday situations. Anxiety hypnotherapy teaches your mind to respond more calmly to stressors.' },
                  { title: 'Social Anxiety Disorder', body: 'For social anxiety, hypnotherapy helps reduce fear of judgment and embarrassment in social situations. Anxiety hypnotherapy builds confidence and changes negative self-perceptions.' },
                  { title: 'Panic Disorder and Panic Attacks', body: 'Hypnotherapy for anxiety teaches techniques to prevent and manage panic attacks. Anxiety hypnotherapy helps break the cycle of fear that often perpetuates panic disorder.' },
                  { title: 'Performance Anxiety', body: "Whether it's public speaking, test anxiety, or stage fright, hypnotherapy for anxiety helps performers and professionals overcome situational anxiety and perform at their best." },
                  { title: 'Health Anxiety', body: 'Anxiety hypnotherapy addresses excessive worry about health and illness. Hypnotherapy for anxiety helps reframe health concerns and reduce compulsive health-checking behaviors.' },
                  { title: 'Specific Phobias', body: 'From fear of flying to fear of enclosed spaces, hypnotherapy for anxiety is highly effective for treating specific phobias by desensitizing triggers at a subconscious level.' },
                ].map((item) => (
                  <div key={item.title} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Practitioners */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find Hypnotherapists Specializing in Anxiety Treatment</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>Connect with certified hypnotherapists who specialize in anxiety hypnotherapy. Each practitioner has experience helping clients overcome anxiety disorders.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
                {anxietySpecialists.map((practitioner) => (
                  <div key={practitioner.id} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 6 }}>{practitioner.name}</h3>
                    {practitioner.credentials && <p style={{ fontSize: 12, color: 'var(--hf-accent)', marginBottom: 10 }}>{practitioner.credentials}</p>}
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
                <Link href="/search?specialty=anxiety" className="btn-gradient hf-btn-accent" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>View All Anxiety Specialists</Link>
              </div>
            </div>
          </section>

          {/* What to Expect */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 32 }}>What to Expect from Hypnotherapy for Anxiety</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { title: 'During Your First Session', body: 'Your first hypnotherapy for anxiety session typically lasts 60–90 minutes. The hypnotherapist will discuss your anxiety symptoms, medical history, and goals. They\'ll explain how anxiety hypnotherapy works and may begin with a gentle induction to help you experience the relaxed state.', bullets: ['You remain fully aware and in control throughout the session', 'Most people describe the experience as deeply relaxing', 'You can stop the session at any time if you feel uncomfortable'] },
                  { title: 'Timeline for Results', body: 'Many people notice improvements after their first hypnotherapy for anxiety session, though lasting change typically requires 4–8 sessions. The timeline varies based on:', bullets: ['Severity and duration of your anxiety', 'Your responsiveness to hypnotherapy', 'Whether you practice self-hypnosis between sessions', 'Consistency of your session schedule'] },
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

          {/* FAQ */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 32 }}>Frequently Asked Questions About Hypnotherapy for Anxiety</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { q: 'Is hypnotherapy for anxiety safe?', a: 'Yes, anxiety hypnotherapy is completely safe when conducted by a certified professional. You remain in control throughout the session and cannot be made to do anything against your will. Hypnotherapy for anxiety has no harmful side effects and is recognized by major medical organizations as a legitimate therapeutic approach.' },
                  { q: 'Can hypnotherapy for anxiety replace medication?', a: 'While anxiety hypnotherapy can be highly effective, you should never stop prescribed medication without consulting your doctor. Many people use hypnotherapy for anxiety alongside medication, and some are eventually able to reduce medication under medical supervision. Always work with both your hypnotherapist and doctor for the best results.' },
                  { q: 'How long does hypnotherapy for anxiety take to work?', a: 'Many people experience some relief after their first session of anxiety hypnotherapy, but lasting results typically require 4–8 sessions. Some individuals with severe or long-standing anxiety may benefit from ongoing sessions. Your hypnotherapist will create a personalized treatment plan based on your needs.' },
                  { q: "What if I can't be hypnotized?", a: 'Nearly everyone can benefit from hypnotherapy for anxiety. Hypnosis is a natural state that most people experience daily (like when absorbed in a book or movie). A skilled anxiety hypnotherapist can work with different levels of suggestibility. The key is finding a practitioner you trust and feel comfortable with.' },
                  { q: 'Does insurance cover hypnotherapy for anxiety?', a: 'Some insurance plans cover anxiety hypnotherapy when provided by a licensed healthcare professional. Coverage varies by provider and plan. Many hypnotherapists offer package deals or payment plans. Contact practitioners directly through our directory to ask about insurance acceptance and pricing.' },
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
                  { href: '/quit-smoking-hypnotherapy', title: 'Quit Smoking Hypnotherapy', desc: 'Break free from nicotine addiction with proven hypnotherapy techniques' },
                  { href: '/weight-loss-hypnotherapy', title: 'Weight Loss Hypnotherapy', desc: 'Address emotional eating and achieve sustainable weight management' },
                  { href: '/how-it-works', title: 'How Hypnotherapy Works', desc: 'Learn about the science and process behind hypnotherapy treatment' },
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Ready to Overcome Anxiety with Hypnotherapy?</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>Take the first step toward lasting anxiety relief. Find a certified hypnotherapist specializing in anxiety treatment near you today.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/search?specialty=anxiety" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find Anxiety Hypnotherapists
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
