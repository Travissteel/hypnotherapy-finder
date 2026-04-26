import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Scale, Target, CheckCircle, Search, TrendingDown, Brain } from 'lucide-react';
import { getAllPractitioners } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Weight Loss Hypnotherapy | Find Specialists',
  description: 'Weight loss hypnotherapy helps you achieve lasting results. Find certified specialists in weight management.',
  keywords: 'weight loss hypnotherapy, hypnosis for weight loss, weight management hypnotherapy, lose weight with hypnosis, hypnotherapy diet',
  alternates: { canonical: 'https://hypnotherapy-finder.com/weight-loss-hypnotherapy' },
  openGraph: { title: 'Weight Loss Hypnotherapy - Natural Weight Management', description: 'Achieve your weight loss goals with hypnotherapy. Find qualified practitioners specializing in weight management.', url: 'https://hypnotherapy-finder.com/weight-loss-hypnotherapy', type: 'website', images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Weight Loss Hypnotherapy' }] },
  twitter: { card: 'summary_large_image', title: 'Weight Loss Hypnotherapy - Natural Weight Management', description: 'Achieve your weight loss goals with hypnotherapy.', images: ['/logo.png'] },
};

export default async function WeightLossHypnotherapyPage() {
  const allPractitioners = getAllPractitioners();
  const weightLossSpecialists = allPractitioners.filter(p =>
    p.specialties.some(s => s.toLowerCase().includes('weight'))
  ).slice(0, 9);

  const jsonLd = { '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Weight Loss Hypnotherapy - Natural Weight Management Solutions', description: 'Comprehensive guide to weight loss hypnotherapy.', mainEntity: { '@type': 'MedicalCondition', name: 'Weight Management', possibleTreatment: { '@type': 'MedicalTherapy', name: 'Weight Loss Hypnotherapy', description: 'Evidence-based hypnotherapy techniques for sustainable weight loss.' } } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Does weight loss hypnotherapy really work?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, research shows weight loss hypnotherapy is effective for sustainable weight management. Studies demonstrate that hypnotherapy helps modify eating behaviors, reduce emotional eating, increase motivation for exercise, and support long-term weight maintenance.' } }, { '@type': 'Question', name: 'How many sessions of weight loss hypnotherapy will I need?', acceptedAnswer: { '@type': 'Answer', text: 'Most people see results with 4-10 sessions of weight loss hypnotherapy. The exact number depends on your weight loss goals, eating patterns, and individual response.' } }, { '@type': 'Question', name: 'What does weight loss hypnotherapy involve?', acceptedAnswer: { '@type': 'Answer', text: 'Weight loss hypnotherapy involves guided relaxation and focused concentration to access your subconscious mind. Sessions typically address emotional eating triggers, portion control, food choices, motivation for exercise, and positive self-image.' } }, { '@type': 'Question', name: 'Can weight loss hypnotherapy help with emotional eating?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, weight loss hypnotherapy is particularly effective for emotional eating. It helps identify and address the underlying emotional triggers that lead to overeating, such as stress, anxiety, boredom, or past trauma.' } }, { '@type': 'Question', name: 'Is weight loss hypnotherapy safe?', acceptedAnswer: { '@type': 'Answer', text: "Yes, weight loss hypnotherapy is completely safe when conducted by a certified professional. It's a natural, drug-free approach with no side effects." } }] };

  const iconBg = { width: 48, height: 48, borderRadius: '50%', background: 'oklch(0.72 0.12 185 / 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' };
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
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Weight Management</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Weight Loss Hypnotherapy — Achieve Your Goals Naturally
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 32 }}>
                Struggling with weight loss? Weight loss hypnotherapy offers a proven approach to changing eating habits, increasing motivation, and achieving lasting results. Find certified weight loss hypnotherapists near you.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/search?specialty=weight" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find Weight Loss Specialists
                </Link>
                <Link href="#how-it-works" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>How It Works</Link>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          <section style={{ padding: '48px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ position: 'relative', width: '100%', height: 400, borderRadius: 16, overflow: 'hidden', background: 'var(--hf-bg-mid)' }}>
                <Image src="/weight-loss-hypnotherapy.png" alt="Weight loss hypnotherapy session with certified hypnotherapist helping client overcome emotional eating and achieve sustainable weight management goals" fill className="object-cover" priority />
              </div>
            </div>
          </section>

          {/* What Is */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What is Weight Loss Hypnotherapy?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--hf-fg)' }}>Weight loss hypnotherapy</strong> is a therapeutic approach that uses hypnosis to help individuals achieve and maintain a healthy weight. Unlike fad diets or temporary solutions, weight loss hypnotherapy addresses the psychological and emotional factors that influence eating behaviors and weight management.</p>
                <p style={{ marginBottom: 16 }}>During weight loss hypnotherapy sessions, a certified hypnotherapist guides you into a relaxed, focused state where your subconscious mind becomes more receptive to positive suggestions about food, exercise, and self-image. This makes weight loss hypnotherapy particularly effective for lasting change rather than quick fixes.</p>
                <p>Research supports the effectiveness of weight loss hypnotherapy. A meta-analysis published in the Journal of Consulting and Clinical Psychology found that participants who used hypnosis for weight loss lost more weight than 90% of those not using hypnosis. Studies show weight loss hypnotherapy helps people lose weight and keep it off long-term by changing fundamental beliefs and behaviors around food and eating.</p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 40 }}>Benefits of Weight Loss Hypnotherapy</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                {[
                  { icon: Brain, label: 'Changes Root Behaviors', desc: 'Weight loss hypnotherapy targets subconscious eating patterns, emotional eating triggers, and limiting beliefs about weight loss.' },
                  { icon: Target, label: 'Sustainable Results', desc: 'Unlike crash diets, weight loss hypnotherapy creates lasting behavioral changes for long-term weight management.' },
                  { icon: Scale, label: 'No Restrictive Diets', desc: "Weight loss hypnotherapy helps you develop a healthier relationship with food naturally, without strict dieting." },
                  { icon: TrendingDown, label: 'Reduces Cravings', desc: 'Hypnosis for weight loss can significantly reduce cravings for unhealthy foods and emotional eating urges.' },
                  { icon: CheckCircle, label: 'Boosts Motivation', desc: 'Weight loss hypnotherapy increases motivation for exercise and healthy eating through positive reinforcement.' },
                  { icon: Brain, label: 'Addresses Emotional Eating', desc: 'Identify and overcome emotional eating patterns that sabotage weight loss efforts.' },
                ].map((item) => (
                  <div key={item.label} className="glass-card" style={{ padding: '28px 20px', textAlign: 'center' }}>
                    <div style={iconBg}><item.icon style={{ width: 22, height: 22, color: 'var(--hf-accent)' }} /></div>
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 32 }}>How Weight Loss Hypnotherapy Works</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { n: '1', title: 'Initial Assessment', body: 'Your weight loss hypnotherapy journey begins with understanding your relationship with food, identifying triggers for overeating, and setting realistic weight loss goals. The hypnotherapist learns about your eating patterns, previous diet attempts, and emotional connections to food.' },
                  { n: '2', title: 'Relaxation and Hypnotic Induction', body: 'The hypnotherapist guides you into a deeply relaxed state. In this state, your subconscious mind is more open to positive suggestions about weight loss, healthy eating, and exercise. This is where weight loss hypnotherapy becomes most effective.' },
                  { n: '3', title: 'Positive Suggestions and Visualization', body: 'During weight loss hypnotherapy sessions, you receive positive suggestions about healthy eating, portion control, and exercise. Visualization techniques help you imagine yourself at your ideal weight, reinforcing your weight loss goals and building confidence.' },
                  { n: '4', title: 'Addressing Emotional Eating', body: 'Weight loss hypnotherapy identifies emotional triggers that lead to overeating. Through hypnosis, you learn new coping mechanisms for stress, boredom, or sadness that don\'t involve food. This breaks the cycle of emotional eating.' },
                  { n: '5', title: 'Building New Habits', body: 'Hypnosis for weight loss reinforces positive behaviors like choosing nutritious foods, eating mindfully, stopping when full, and enjoying regular exercise. These suggestions help your subconscious mind support your weight loss goals automatically.' },
                  { n: '6', title: 'Self-Hypnosis for Ongoing Support', body: 'Most weight loss hypnotherapy programs teach self-hypnosis techniques. This allows you to reinforce positive suggestions daily, manage cravings, and stay motivated throughout your weight loss journey and beyond.' },
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

          {/* What It Helps With */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What Weight Loss Hypnotherapy Can Help With</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>Weight loss hypnotherapy addresses multiple aspects of weight management, making it a comprehensive approach to achieving and maintaining a healthy weight.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
                {[
                  { title: 'Emotional and Stress Eating', desc: 'Weight loss hypnotherapy is highly effective for emotional eating. If you eat in response to stress, anxiety, boredom, or sadness, hypnosis can help you develop healthier coping mechanisms.', bullets: ['Identify emotional eating triggers', 'Break the stress-food connection', 'Learn alternative stress management'] },
                  { title: 'Food Cravings and Binge Eating', desc: 'Hypnosis for weight loss can reduce or eliminate cravings for specific foods, especially sugary and high-fat options. Weight loss hypnotherapy also helps control binge eating episodes.', bullets: ['Reduce sugar and junk food cravings', 'Control portion sizes naturally', 'Stop binge eating patterns'] },
                  { title: 'Lack of Motivation for Exercise', desc: 'Weight loss hypnotherapy can increase your motivation to exercise and help you enjoy physical activity. Positive suggestions make exercise feel less like a chore and more like self-care.', bullets: ['Build enthusiasm for exercise', 'Create consistent workout habits', 'Enjoy movement and activity'] },
                  { title: 'Poor Self-Image and Confidence', desc: 'Weight loss hypnotherapy addresses negative self-talk and poor body image. Improving your self-image can be crucial for weight loss success and maintaining healthy behaviors.', bullets: ['Build positive self-image', 'Overcome self-sabotaging thoughts', 'Increase self-confidence'] },
                  { title: 'Mindless Eating Habits', desc: 'Hypnosis for weight loss promotes mindful eating — being present and aware while eating. This helps you recognize true hunger, enjoy food more, and stop when satisfied.', bullets: ['Eat slowly and mindfully', 'Recognize fullness signals', 'Stop eating when satisfied'] },
                  { title: 'Weight Loss Plateaus', desc: 'Weight loss hypnotherapy can help you overcome plateaus by renewing motivation, adjusting mental blocks, and reinforcing commitment to your weight loss goals.', bullets: ['Overcome mental barriers', 'Renew weight loss motivation', 'Break through plateaus'] },
                ].map((item) => (
                  <div key={item.title} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 10 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 12 }}>{item.desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {item.bullets.map((b) => (
                        <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <CheckCircle style={{ width: 12, height: 12, color: 'oklch(0.7 0.15 145)', flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Practitioners */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find Weight Loss Hypnotherapy Specialists Near You</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>Connect with certified hypnotherapists who specialize in weight loss and weight management.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
                {weightLossSpecialists.map((practitioner) => (
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
                <Link href="/search?specialty=weight" className="btn-gradient hf-btn-accent" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>View All Weight Loss Specialists</Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 32 }}>Frequently Asked Questions About Weight Loss Hypnotherapy</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { q: 'Does weight loss hypnotherapy really work?', a: 'Yes, research shows weight loss hypnotherapy can be highly effective. Studies indicate that people who use hypnosis for weight loss lose more weight and maintain weight loss better than those using traditional dieting alone. The key is working with a qualified hypnotherapist and being committed to making lifestyle changes.' },
                  { q: 'How much weight can I lose with hypnotherapy?', a: 'Weight loss varies by individual and depends on many factors including starting weight, diet, exercise, and consistency with hypnotherapy sessions. Weight loss hypnotherapy is not a magic solution but rather a tool to support healthy lifestyle changes. Most people lose weight gradually and sustainably — 1–2 pounds per week is considered healthy.' },
                  { q: 'How many sessions of weight loss hypnotherapy do I need?', a: 'Most weight loss hypnotherapy programs involve 4–8 initial sessions, followed by maintenance sessions as needed. Some people benefit from ongoing monthly sessions to reinforce positive behaviors. Your hypnotherapist will create a personalized plan based on your weight loss goals and progress.' },
                  { q: 'Can hypnosis for weight loss help with emotional eating?', a: "Absolutely. Weight loss hypnotherapy is particularly effective for emotional eating because it addresses the subconscious emotional triggers that drive eating behaviors. Hypnosis helps you develop new coping mechanisms for stress, anxiety, and other emotions that don't involve food." },
                  { q: 'Do I still need to diet and exercise?', a: "Yes. Weight loss hypnotherapy is not a replacement for healthy eating and exercise — it's a tool that makes these lifestyle changes easier to adopt and maintain. Hypnosis helps change your mindset, reduce cravings, increase motivation, and break unhealthy patterns, supporting your weight loss efforts rather than replacing them." },
                  { q: 'Is weight loss hypnotherapy safe?', a: "Weight loss hypnotherapy is completely safe when conducted by a certified professional. It has no side effects and doesn't involve medication or surgery. You remain in control throughout the session and can't be made to do anything against your will. Always consult with your doctor before starting any weight loss program." },
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
          <section style={{ padding: '48px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 24 }}>Related Hypnotherapy Resources</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                {[
                  { href: '/hypnotherapy-for-anxiety', title: 'Hypnotherapy for Anxiety', desc: 'Reduce stress and manage anxiety with evidence-based hypnotherapy' },
                  { href: '/quit-smoking-hypnotherapy', title: 'Quit Smoking Hypnotherapy', desc: 'Break free from nicotine addiction with proven techniques' },
                  { href: '/hypnotherapy-near-me', title: 'Find Hypnotherapists Near You', desc: 'Search certified practitioners in your local area' },
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Ready to Achieve Your Weight Loss Goals?</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>Find a certified weight loss hypnotherapist near you and start your journey to a healthier, happier you. Natural, lasting weight loss starts in your mind.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/search?specialty=weight" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find Weight Loss Hypnotherapists
                </Link>
                <Link href="/hypnotherapy-near-me" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>Browse All Hypnotherapists</Link>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
