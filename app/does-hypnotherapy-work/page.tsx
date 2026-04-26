import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { CheckCircle, XCircle, Brain, TrendingUp, Search } from 'lucide-react';

export const metadata = {
  title: 'Does Hypnotherapy Work? | Evidence',
  description: 'Does hypnotherapy really work? Scientific evidence, success rates, and effectiveness for anxiety, weight loss, smoking, and pain management.',
  keywords: 'does hypnotherapy work, hypnotherapy effectiveness, hypnotherapy success rate, clinical hypnosis research',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/does-hypnotherapy-work',
  },
  openGraph: {
    title: 'Does Hypnotherapy Work? Scientific Evidence & Success Rates',
    description: 'Does hypnotherapy really work? Comprehensive review of scientific evidence, success rates, and effectiveness.',
    url: 'https://hypnotherapy-finder.com/does-hypnotherapy-work',
    type: 'article',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Does Hypnotherapy Work - Scientific Evidence' }],
  },
};

export default function DoesHypnotherapyWorkPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does hypnotherapy really work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, hypnotherapy works for many conditions when practiced by qualified professionals. Extensive scientific research demonstrates hypnotherapy\'s effectiveness for pain management (75% of patients show improvement), anxiety reduction (comparable to CBT), smoking cessation (30-60% quit rates), IBS (70-80% symptom improvement), and weight loss (enhanced results when combined with diet/exercise). The American Psychological Association, American Medical Association, and British Medical Association all recognize clinical hypnosis as a legitimate therapeutic approach.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does hypnotherapy work for weight loss?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, hypnotherapy works for weight loss and has been proven effective in multiple scientific studies. A meta-analysis in the Journal of Consulting and Clinical Psychology found that people using hypnotherapy lost more weight than 90% of control group subjects. Research shows hypnotherapy enhances weight loss by reducing emotional eating, decreasing food cravings, increasing exercise motivation, and changing subconscious beliefs about food.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate of hypnotherapy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hypnotherapy success rates vary by condition but are generally high compared to other treatments. Research shows: Pain management 75% effectiveness, Smoking cessation 30-60% quit rates (vs 5-7% cold turkey), IBS 70-80% symptom improvement, Anxiety 60-80% significant reduction, Weight loss 90th percentile compared to diet alone, Phobias 70-85% improvement, Insomnia 60-75% better sleep quality.',
        },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Does Hypnotherapy Work? Scientific Evidence & Success Rates',
    description: 'Comprehensive review of scientific research on hypnotherapy effectiveness, success rates, and evidence-based applications.',
    author: { '@type': 'Organization', name: 'Hypnotherapy Finder' },
    publisher: { '@type': 'Organization', name: 'Hypnotherapy Finder' },
    datePublished: '2025-01-15',
    dateModified: '2025-01-15',
  };

  return (
    <>
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} strategy="beforeInteractive" />
      <Script id="schema-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} strategy="beforeInteractive" />

      <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1, paddingTop: 80 }}>

          {/* Hero */}
          <section style={{ background: 'var(--hf-bg-mid)', padding: '72px 24px 64px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', background: 'oklch(0.72 0.12 185 / 0.15)', color: 'var(--hf-accent)', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                Scientific Evidence
              </span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 5vw, 46px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Does Hypnotherapy Work? Scientific Evidence &amp; Research
              </h1>
              <p style={{ fontSize: 18, color: 'var(--hf-fg-dim)', marginBottom: 36, maxWidth: 580, margin: '0 auto 36px' }}>
                Comprehensive review of clinical research, success rates, and evidence-based applications
                of hypnotherapy for various conditions.
              </p>
              <Link href="#evidence" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                View the Evidence
              </Link>
            </div>
          </section>

          {/* Quick Answer */}
          <section style={{ padding: '48px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div className="glass-card" style={{ padding: '32px', borderLeft: '4px solid oklch(0.7 0.15 145)' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <CheckCircle style={{ width: 32, height: 32, color: 'oklch(0.7 0.15 145)', flexShrink: 0, marginTop: 4 }} />
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 12 }}>
                      Yes, Hypnotherapy Works — Here's the Evidence
                    </h2>
                    <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 20 }}>
                      Extensive scientific research confirms that hypnotherapy is an effective treatment for many conditions when practiced by qualified professionals. Major medical organizations including the American Psychological Association and American Medical Association recognize clinical hypnosis as a legitimate therapeutic approach.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                      {[
                        { stat: '75%', label: 'effectiveness for pain management' },
                        { stat: '30–60%', label: 'smoking cessation success' },
                        { stat: '70–80%', label: 'IBS symptom improvement' },
                        { stat: '90th pct.', label: 'weight loss results' },
                      ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <TrendingUp style={{ width: 16, height: 16, color: 'oklch(0.7 0.15 145)', flexShrink: 0 }} />
                          <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}><strong style={{ color: 'var(--hf-fg)' }}>{item.stat}</strong> {item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Evidence Section */}
          <section id="evidence" style={{ padding: '72px 24px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', marginBottom: 40 }}>Scientific Evidence: Does Hypnotherapy Work?</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  {
                    topic: 'Pain Management',
                    badge: '75% Effectiveness Rate',
                    intro: 'Does hypnotherapy work for pain? Extensive research confirms yes. A comprehensive meta-analysis of 18 studies published in the International Journal of Clinical and Experimental Hypnosis found that hypnotherapy provides substantial pain relief for approximately 75% of both clinical and experimental pain conditions.',
                    bullets: [
                      'Chronic pain: 60-80% of patients report significant reduction in pain intensity',
                      'Cancer pain: Hypnotherapy reduces pain by 50% on average (Journal of Pain)',
                      'Surgical pain: Patients using hypnotherapy require 50% less pain medication post-surgery',
                      'Migraines: 70% reduction in frequency and severity with regular hypnotherapy',
                    ],
                  },
                  {
                    topic: 'Anxiety and Stress',
                    badge: '60–80% Improvement Rate',
                    intro: 'Does hypnotherapy work for anxiety? Yes, with results comparable to cognitive behavioral therapy (CBT). A 2019 systematic review found hypnotherapy produces significant anxiety reduction across multiple anxiety disorders.',
                    bullets: [
                      'Generalized anxiety: 70% of patients show clinically significant improvement',
                      'Social anxiety: Hypnotherapy as effective as CBT in head-to-head studies',
                      'Test anxiety: 80% reduction in anxiety symptoms (American Journal of Clinical Hypnosis)',
                      'Performance anxiety: Significant improvement in 75% of cases',
                    ],
                  },
                  {
                    topic: 'Weight Loss',
                    badge: '90th Percentile Results',
                    intro: 'Does hypnotherapy work for weight loss? Research strongly supports yes. A landmark meta-analysis in the Journal of Consulting and Clinical Psychology found that people using hypnotherapy for weight loss lost more weight than 90% of those not using hypnosis.',
                    bullets: [
                      'Average 6-8 pounds more weight lost compared to diet/exercise alone',
                      'Better long-term maintenance: 85% maintain weight loss at 18 months',
                      'Reduced emotional eating in 75% of participants',
                      'Significant decrease in food cravings reported by 80% of users',
                    ],
                  },
                  {
                    topic: 'Smoking Cessation',
                    badge: '30–60% Quit Rate',
                    intro: 'Does hypnotherapy work to quit smoking? Yes, with quit rates significantly higher than unassisted quitting. Meta-analyses show hypnotherapy produces quit rates of 30-60% compared to just 5-7% for cold turkey attempts.',
                    bullets: [
                      'Single-session hypnotherapy: 25-35% still smoke-free at 6 months',
                      'Multi-session programs: 45-60% quit rates at 12 months',
                      'Comparable or better results than nicotine replacement therapy',
                      'Reduced withdrawal symptoms reported by 70% of quitters',
                    ],
                  },
                  {
                    topic: 'IBS and Digestive Issues',
                    badge: '70–80% Symptom Improvement',
                    intro: 'Does hypnotherapy work for IBS? Absolutely. Gut-directed hypnotherapy is so well-proven that the American College of Gastroenterology includes it in official IBS treatment guidelines.',
                    bullets: [
                      '70-80% of IBS patients achieve significant, lasting symptom relief',
                      'Benefits maintained for up to 5 years after treatment (long-term studies)',
                      'More effective than standard medical care alone',
                      'Reduces pain, bloating, and bowel dysfunction',
                    ],
                  },
                ].map((card, i) => (
                  <div key={i} className="glass-card" style={{ padding: '28px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'oklch(0.72 0.12 185 / 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Brain style={{ width: 20, height: 20, color: 'var(--hf-accent)' }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 8 }}>{card.topic}</h3>
                        <span style={{ display: 'inline-block', background: 'oklch(0.7 0.15 145 / 0.15)', color: 'oklch(0.7 0.15 145)', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>{card.badge}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 16 }}>
                      <strong style={{ color: 'var(--hf-fg)' }}>{card.intro.split('?')[0]}?</strong>{card.intro.slice(card.intro.indexOf('?') + 1)}
                    </p>
                    <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 10 }}>Key Research Findings:</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {card.bullets.map((b, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <CheckCircle style={{ width: 14, height: 14, color: 'oklch(0.7 0.15 145)', flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* When Doesn't It Work */}
          <section style={{ padding: '72px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', marginBottom: 16 }}>When Does Hypnotherapy NOT Work?</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>
                While research shows hypnotherapy works for many conditions, it's important to understand when it may be less effective or inappropriate:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { title: 'Low Suggestibility', body: 'About 10-15% of people have low hypnotic suggestibility and may not respond well to hypnotherapy. However, skilled practitioners can often work with different suggestibility levels.' },
                  { title: 'Lack of Motivation', body: 'Hypnotherapy works best when the client genuinely wants to change. Being pressured into hypnotherapy by others typically produces poor results.' },
                  { title: 'Severe Mental Illness', body: 'Hypnotherapy is not recommended as primary treatment for severe mental illnesses like schizophrenia, bipolar disorder, or psychosis. It should only be used as complementary treatment under medical supervision.' },
                  { title: 'Unqualified Practitioners', body: 'Hypnotherapy effectiveness depends heavily on practitioner skill and training. Working with unqualified or poorly trained practitioners produces inferior results.' },
                ].map((item, i) => (
                  <div key={i} className="glass-card" style={{ padding: '20px 24px', borderLeft: '3px solid oklch(0.7 0.15 60)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <XCircle style={{ width: 20, height: 20, color: 'oklch(0.7 0.15 60)', flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 6 }}>{item.title}</h3>
                        <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>{item.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Medical Recognition */}
          <section style={{ padding: '72px 24px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', marginBottom: 16 }}>Medical and Professional Recognition</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 36 }}>
                Does hypnotherapy work according to medical authorities? Major healthcare organizations recognize hypnotherapy as a legitimate therapeutic approach:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
                {[
                  { org: 'American Psychological Association (APA)', body: 'Division 30 (Society of Psychological Hypnosis) promotes clinical hypnosis as an evidence-based practice supported by scientific research.' },
                  { org: 'American Medical Association', body: 'Endorsed hypnotherapy in 1958 for medical and dental purposes, recognizing its therapeutic value when practiced by qualified professionals.' },
                  { org: 'British Medical Association', body: 'Recognizes hypnotherapy as a valid medical treatment with proven applications in pain management and psychotherapy.' },
                  { org: 'American College of Gastroenterology', body: 'Includes gut-directed hypnotherapy in official IBS treatment guidelines based on strong evidence of effectiveness.' },
                ].map((item, i) => (
                  <div key={i} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 10 }}>{item.org}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg, oklch(0.25 0.05 185), oklch(0.18 0.03 240))', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--hf-fg)', marginBottom: 16 }}>Ready to Experience How Hypnotherapy Works?</h2>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
                Find qualified, certified hypnotherapists in your area and see the evidence-based results for yourself.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/hypnotherapy-near-me" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find Hypnotherapists Near Me
                </Link>
                <Link href="/search" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  Search by Specialty
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
