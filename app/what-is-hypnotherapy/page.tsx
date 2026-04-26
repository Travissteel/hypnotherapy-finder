import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Brain, CheckCircle, Search, BookOpen, Users } from 'lucide-react';

export const metadata = {
  title: 'What is Hypnotherapy? | Complete Guide',
  description: 'What is hypnotherapy and how does it work? Complete guide to clinical hypnosis, techniques, effectiveness, and costs. Evidence-based answers.',
  keywords: 'what is hypnotherapy, hypnosis therapy, clinical hypnosis, therapeutic hypnosis, hypnotherapy definition',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/what-is-hypnotherapy',
  },
  openGraph: {
    title: 'What is Hypnotherapy? | Complete Guide',
    description: 'What is hypnotherapy and how does it work? Learn everything about hypnotherapy, clinical hypnosis, and therapeutic hypnosis.',
    url: 'https://hypnotherapy-finder.com/what-is-hypnotherapy',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'What is Hypnotherapy' }],
  },
};

export default function WhatIsHypnotherapyPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is hypnotherapy?", "acceptedAnswer": { "@type": "Answer", "text": "Hypnotherapy is a form of complementary therapy that uses guided hypnosis to help individuals achieve a heightened state of focus and concentration. During hypnotherapy, a trained hypnotherapist guides the client into a relaxed, trance-like state where the subconscious mind becomes more receptive to positive suggestions and behavioral changes. Hypnotherapy is used to treat various conditions including anxiety, pain management, smoking cessation, weight loss, phobias, and stress-related disorders." } },
      { "@type": "Question", "name": "Does hypnotherapy work?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, hypnotherapy works for many people and conditions. Research shows hypnotherapy is effective for pain management, anxiety reduction, smoking cessation, weight loss, and IBS treatment. Studies published in peer-reviewed journals demonstrate that hypnotherapy produces measurable changes in brain activity and behavior. Success rates vary by individual and condition, but meta-analyses show hypnotherapy significantly outperforms placebo treatments. The American Psychological Association recognizes hypnotherapy as a valid therapeutic approach." } },
      { "@type": "Question", "name": "How much does hypnotherapy cost?", "acceptedAnswer": { "@type": "Answer", "text": "Hypnotherapy typically costs between $75 and $300 per session in the United States, with the national average around $150 per session. Prices vary based on location, practitioner experience, session length, and specialty. Major cities tend to have higher rates ($150-$300), while smaller areas may charge $75-$150. Some hypnotherapists offer package deals for multiple sessions at reduced rates. Insurance coverage varies - some plans cover hypnotherapy when provided by licensed healthcare professionals for specific conditions." } },
      { "@type": "Question", "name": "Is hypnotherapy covered by insurance?", "acceptedAnswer": { "@type": "Answer", "text": "Hypnotherapy insurance coverage depends on your insurance plan, the condition being treated, and the practitioner's credentials. Some insurance companies cover hypnotherapy when: (1) it's provided by a licensed healthcare professional such as a psychologist or physician, (2) it's used to treat a covered medical or mental health condition, and (3) it's deemed medically necessary. Common covered conditions include chronic pain, anxiety disorders, smoking cessation, and IBS. Medicare may cover hypnotherapy in specific circumstances. Always verify coverage with your insurance provider before starting treatment." } },
      { "@type": "Question", "name": "Does hypnotherapy work for weight loss?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, hypnotherapy can be effective for weight loss when combined with healthy eating and exercise. Research shows people who use hypnotherapy for weight loss lose more weight than those using diet and exercise alone. A meta-analysis in the Journal of Consulting and Clinical Psychology found hypnotherapy participants lost more weight than 90% of control subjects. Hypnotherapy works for weight loss by addressing emotional eating, reducing cravings, increasing motivation for exercise, and changing subconscious beliefs about food. Results are most effective when hypnotherapy is part of a comprehensive weight management program." } }
    ]
  };

  const cardStyle = { textAlign: 'center' as const, padding: '28px 20px' };
  const iconBg = { width: 56, height: 56, borderRadius: '50%', background: 'oklch(0.72 0.12 185 / 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' };
  const checkItem = { display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 };

  return (
    <>
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} strategy="beforeInteractive" />

      <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1, paddingTop: 80 }}>
          {/* Hero */}
          <section style={{ background: 'var(--hf-bg-mid)', padding: '72px 24px 64px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Complete Guide</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                What is Hypnotherapy? Your Complete Guide
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 32 }}>
                Discover everything about hypnotherapy: what it is, how it works, what it treats, costs, effectiveness, and how to find qualified practitioners.
              </p>
              <Link href="/hypnotherapy-near-me" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                <Search style={{ width: 16, height: 16 }} />
                Find a Hypnotherapist
              </Link>
            </div>
          </section>

          {/* Featured Image */}
          <section style={{ padding: '48px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ position: 'relative', width: '100%', height: 400, borderRadius: 16, overflow: 'hidden', background: 'var(--hf-bg-mid)' }}>
                <Image src="/what-is-hypnotherapy.png" alt="What is hypnotherapy explained with professional hypnotherapist conducting therapeutic session demonstrating clinical hypnotherapy techniques for anxiety, weight loss, and behavioral change" fill className="object-cover" priority />
              </div>
            </div>
          </section>

          {/* Definition */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What is Hypnotherapy? Definition and Overview</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>
                  <strong style={{ color: 'var(--hf-fg)' }}>Hypnotherapy</strong> is a form of complementary therapy that uses guided hypnosis to help individuals achieve specific therapeutic goals. During hypnotherapy sessions, a trained and certified hypnotherapist guides the client into a deeply relaxed, focused state of consciousness known as a hypnotic trance. In this state, the subconscious mind becomes more receptive to positive suggestions, making it easier to change unwanted behaviors, overcome fears, and address psychological or physical issues.
                </p>
                <p style={{ marginBottom: 16 }}>
                  What is hypnotherapy used for? Hypnotherapy is used to treat a wide range of conditions including: anxiety and stress, chronic pain, smoking addiction, weight management, phobias, sleep disorders, PTSD and trauma, IBS and digestive issues, confidence and performance issues, and many other behavioral and psychological concerns.
                </p>
                <p style={{ marginBottom: 32 }}>
                  It's important to understand what hypnotherapy is NOT. Hypnotherapy is not mind control, and you cannot be made to do anything against your will. You remain fully aware and in control throughout the session. Hypnotherapy is also not sleep — you are awake and alert, simply in a deeply focused and relaxed state similar to daydreaming or being absorbed in a good book.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                {[
                  { icon: Brain, label: 'Evidence-Based', desc: 'Recognized by major medical organizations with extensive research support' },
                  { icon: Users, label: 'Widely Used', desc: 'Millions of people worldwide use hypnotherapy for various health concerns' },
                  { icon: BookOpen, label: 'Long History', desc: 'Used therapeutically for over 200 years with modern clinical applications' },
                ].map((item) => (
                  <div key={item.label} className="glass-card" style={cardStyle}>
                    <div style={iconBg}><item.icon style={{ width: 24, height: 24, color: 'var(--hf-accent)' }} /></div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 8 }}>{item.label}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>How Does Hypnotherapy Work?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8, marginBottom: 24 }}>
                <p style={{ marginBottom: 16 }}>Understanding what hypnotherapy is requires knowing how hypnotherapy works. The process involves several key mechanisms that make it effective for behavioral and psychological change.</p>
              </div>
              {[
                { title: 'The Hypnotic State', body: 'During hypnotherapy, the brain enters an altered state of consciousness characterized by heightened focus and suggestibility. Brain imaging studies show that hypnosis creates distinct patterns of brain activity. The prefrontal cortex becomes less active, while areas associated with imagination and emotional processing become more active. This allows the hypnotherapist to work directly with the subconscious mind, where many automatic behaviors and emotional responses are stored.' },
                { title: 'Accessing the Subconscious Mind', body: "What is hypnotherapy's main advantage? It provides direct access to the subconscious mind. Your subconscious controls automatic behaviors, habits, and emotional reactions. While conscious willpower alone often fails to change deep-seated patterns, hypnotherapy bypasses conscious resistance and works with the subconscious to create lasting change." },
                { title: 'The Power of Suggestion', body: 'In the hypnotic state, positive suggestions become more readily accepted by the subconscious mind. These suggestions can help reframe negative thought patterns, reduce anxiety responses, eliminate cravings, increase motivation, and create new, healthier behavioral patterns. The hypnotherapist carefully crafts suggestions tailored to your specific goals and needs.' },
              ].map((item) => (
                <div key={item.title} className="glass-card" style={{ padding: '24px', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 12 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Scientific Evidence */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>Does Hypnotherapy Work? Scientific Evidence</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 24 }}>One of the most common questions about what hypnotherapy is: "Does hypnotherapy actually work?" The scientific evidence is clear: yes, hypnotherapy works for many conditions and many people.</p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 16 }}>Research-Proven Effectiveness</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Pain Management', body: 'A meta-analysis of 18 studies found hypnotherapy provides significant pain relief for 75% of clinical and experimental pain conditions. Hypnotherapy is particularly effective for chronic pain, surgical pain, and cancer pain.' },
                  { label: 'Anxiety', body: 'Multiple studies show hypnotherapy significantly reduces anxiety symptoms. A 2019 study found hypnotherapy as effective as cognitive behavioral therapy for anxiety disorders.' },
                  { label: 'Smoking Cessation', body: 'Research indicates hypnotherapy produces higher quit rates than unassisted quitting and is comparable to nicotine replacement therapy. Some studies show quit rates of 30-60% with hypnotherapy.' },
                  { label: 'IBS', body: 'The American College of Gastroenterology recognizes hypnotherapy as an effective treatment for IBS. Studies show 70-80% of IBS patients experience significant symptom improvement with gut-directed hypnotherapy.' },
                  { label: 'Weight Loss', body: 'Meta-analyses show hypnotherapy significantly enhances weight loss when combined with diet and exercise. Participants using hypnotherapy lose more weight and maintain losses better than those using diet alone.' },
                ].map((item) => (
                  <div key={item.label} style={checkItem}>
                    <CheckCircle style={{ width: 18, height: 18, color: 'oklch(0.7 0.15 145)', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}><strong style={{ color: 'var(--hf-fg)' }}>{item.label}:</strong> {item.body}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cost */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>How Much Does Hypnotherapy Cost?</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 24 }}>When considering what hypnotherapy is and whether to pursue it, cost is an important factor. How much does hypnotherapy cost varies based on several factors:</p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 16 }}>Average Hypnotherapy Costs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {[
                  { label: 'Per Session', body: '$75–$300, with a national average of $150 per session' },
                  { label: 'Initial Consultation', body: 'Often longer and may cost $150–$250' },
                  { label: 'Package Deals', body: 'Many practitioners offer 4–8 session packages at reduced per-session rates' },
                  { label: 'Online Sessions', body: 'Often $50–$100 less than in-person sessions' },
                ].map((item) => (
                  <div key={item.label} style={checkItem}>
                    <CheckCircle style={{ width: 18, height: 18, color: 'var(--hf-accent)', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}><strong style={{ color: 'var(--hf-fg)' }}>{item.label}:</strong> {item.body}</span>
                  </div>
                ))}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 12 }}>Is Hypnotherapy Covered by Insurance?</h3>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 12 }}>Insurance coverage for hypnotherapy varies. Some insurance plans cover hypnotherapy when provided by licensed healthcare professionals (psychologists, physicians, licensed clinical social workers) for specific medical or mental health conditions. Commonly covered conditions include chronic pain management, anxiety disorders, PTSD, smoking cessation programs, and IBS treatment.</p>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>To determine if hypnotherapy is covered by insurance for you, contact your insurance provider and ask about coverage for "clinical hypnosis" or "hypnotherapy." Get pre-authorization if required. Ensure your hypnotherapist is a licensed healthcare provider if insurance coverage is needed.</p>
            </div>
          </section>

          {/* What It Treats */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What Does Hypnotherapy Treat?</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>Understanding what hypnotherapy is includes knowing what conditions it can help treat. Hypnotherapy is used for a wide variety of physical, psychological, and behavioral issues:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
                {[
                  { title: 'Mental Health', items: ['Anxiety and panic disorders', 'Depression (as complementary treatment)', 'PTSD and trauma', 'Stress management', 'Phobias and fears', 'OCD symptoms'] },
                  { title: 'Behavioral Issues', items: ['Smoking cessation', 'Weight loss and management', 'Nail biting and other habits', 'Insomnia and sleep issues', 'Alcoholism support', 'Confidence building'] },
                  { title: 'Physical Health', items: ['Chronic pain management', 'IBS and digestive disorders', 'Migraines and headaches', 'Skin conditions (eczema, psoriasis)', 'Surgical recovery', 'Childbirth preparation'] },
                  { title: 'Performance', items: ['Public speaking anxiety', 'Sports performance', 'Test and exam anxiety', 'Creative blocks', 'Fear of flying', 'Relationship issues'] },
                ].map((group) => (
                  <div key={group.title} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-accent)', marginBottom: 12 }}>{group.title}</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {group.items.map((item) => (
                        <li key={item} style={{ fontSize: 13, color: 'var(--hf-fg-dim)', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Credentials */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>Hypnotherapy Training and Credentials</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 24 }}>When seeking to understand what hypnotherapy is, it's important to know about hypnotherapy training and professional credentials. Not all hypnotherapists have the same level of training or qualifications.</p>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 16 }}>Common Hypnotherapy Certifications</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {[
                  { label: 'CHt (Certified Hypnotherapist)', body: 'Basic certification requiring 100–200 hours of training from an accredited hypnotherapy school' },
                  { label: 'NGH (National Guild of Hypnotists)', body: 'Largest hypnotherapy organization offering various certification levels' },
                  { label: 'ABH (American Board of Hypnotherapy)', body: 'Professional certification with continuing education requirements' },
                  { label: 'IACT (International Association of Counselors & Therapists)', body: 'Recognized certification for hypnotherapy practitioners' },
                ].map((item) => (
                  <div key={item.label} style={checkItem}>
                    <CheckCircle style={{ width: 18, height: 18, color: 'var(--hf-accent)', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}><strong style={{ color: 'var(--hf-fg)' }}>{item.label}:</strong> {item.body}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>The most qualified hypnotherapists are often licensed healthcare providers (psychologists, physicians, licensed counselors) who have additional training in clinical hypnosis. These practitioners can integrate hypnotherapy with other evidence-based treatments and are more likely to be covered by insurance.</p>
            </div>
          </section>

          {/* Finding a Practitioner */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>Finding a Qualified Hypnotherapist</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 24 }}>Now that you understand what hypnotherapy is, finding the right practitioner is crucial for success. Here's what to look for:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
                {[
                  { label: 'Proper Credentials', body: 'Look for CHt certification at minimum, preferably from NGH, ABH, or IACT. Licensed healthcare providers with hypnotherapy training are ideal.' },
                  { label: 'Experience', body: "Ask how long they've practiced and how many clients they've treated for your specific concern." },
                  { label: 'Specialization', body: 'Some hypnotherapists specialize in specific areas like smoking cessation, weight loss, or trauma. Find one who specializes in your concern.' },
                  { label: 'Professional Approach', body: 'Legitimate hypnotherapists provide clear information about their training, methods, and success rates. Avoid anyone making unrealistic promises or guarantees.' },
                  { label: 'Good Rapport', body: 'You should feel comfortable with your hypnotherapist. Trust and comfort are essential for effective hypnotherapy.' },
                ].map((item) => (
                  <div key={item.label} style={checkItem}>
                    <CheckCircle style={{ width: 18, height: 18, color: 'oklch(0.7 0.15 145)', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}><strong style={{ color: 'var(--hf-fg)' }}>{item.label}:</strong> {item.body}</span>
                  </div>
                ))}
              </div>

              {/* CTA Card */}
              <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 12 }}>Ready to Try Hypnotherapy?</h3>
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', marginBottom: 24, lineHeight: 1.6 }}>
                  Now that you know what hypnotherapy is, how it works, and what it can treat, you can find qualified hypnotherapists in your area through our free directory.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                  <Link href="/hypnotherapy-near-me" className="btn-gradient hf-btn-accent" style={{ padding: '12px 24px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                    Find Hypnotherapists Near Me
                  </Link>
                  <Link href="/search" className="glass hf-glass-hover" style={{ padding: '12px 24px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                    Search by Specialty
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section style={{ padding: '48px 24px 72px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 24 }}>Related Hypnotherapy Resources</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                {[
                  { href: '/hypnotherapy-near-me', title: 'Find Hypnotherapists Near Me', desc: 'Search our directory of certified practitioners in your area' },
                  { href: '/how-it-works', title: 'How Hypnotherapy Works', desc: 'Understand the hypnotherapy process and what to expect' },
                  { href: '/hypnotherapy-cost', title: 'Hypnotherapy Cost Guide', desc: 'Learn about session costs and insurance coverage' },
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
