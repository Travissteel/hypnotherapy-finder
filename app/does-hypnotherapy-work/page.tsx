import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
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
          text: 'Hypnotherapy works for some people and some conditions. Meta-analyses of controlled trials find that hypnosis reduces pain (Montgomery et al., 2000) and anxiety (Valentine et al., 2019) compared with control conditions. The 2021 American College of Gastroenterology guideline recommends gut-directed hypnotherapy among treatments for IBS, though it rates the evidence as low quality. For smoking cessation and weight loss the evidence is mixed. Results vary between individuals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does hypnotherapy work for weight loss?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The evidence is mixed. A 1995 meta-analysis in the Journal of Consulting and Clinical Psychology found that adding hypnosis to cognitive-behavioural weight-loss treatment improved outcomes, while a 1996 reanalysis found a smaller effect that was no longer statistically significant when one study was removed. Hypnotherapy is generally used alongside a structured eating and activity plan.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate of hypnotherapy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There is no single success rate, because results depend on the condition, the study and the person. In a 2000 meta-analysis of pain studies the average treated participant had greater relief than about 75% of controls (effect size 0.67); in a 2019 anxiety meta-analysis the average treated participant improved more than about 79% of controls (effect size 0.79); in a 2024 smoking trial, 12-month continuous abstinence was 15.0% with hypnotherapy and 15.6% with CBT. These are effect sizes and trial results, not guarantees of individual outcomes.',
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
      <JsonLd id="schema-faq" data={faqSchema} />
      <JsonLd id="schema-article" data={articleSchema} />

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
                      What the Evidence Says About Hypnotherapy
                    </h2>
                    <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 20 }}>
                      Controlled research finds benefits for some conditions, notably pain and anxiety, and weaker or mixed evidence for others such as smoking cessation and weight loss. Results vary between people. The American Psychological Association has a division (Division 30, the Society of Psychological Hypnosis) dedicated to the science and clinical use of hypnosis.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                      {[
                        { stat: 'd = 0.67', label: 'average pain-relief effect across 18 studies (Montgomery et al., 2000)' },
                        { stat: '0.79', label: 'average anxiety effect size vs controls across 17 trials (Valentine et al., 2019)' },
                        { stat: '15%', label: '12-month continuous abstinence with hypnotherapy in a 2024 smoking trial, similar to CBT' },
                        { stat: 'Low quality', label: 'evidence rating for gut-directed hypnotherapy in the 2021 ACG IBS guideline' },
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
                    badge: 'Moderate-to-Large Effect',
                    intro: 'Does hypnotherapy work for pain? Controlled research says it can help. A meta-analysis of 18 studies (laboratory and clinical) in the International Journal of Clinical and Experimental Hypnosis found a moderate-to-large pain-relieving effect (Montgomery et al., 2000).',
                    bullets: [
                      'Effect size d = 0.67: the average treated participant had greater pain relief than about 75% of control participants',
                      'Results vary between people, and hypnosis is a complement to medical pain care, not a replacement for it',
                    ],
                  },
                  {
                    topic: 'Anxiety and Stress',
                    badge: 'Better Than Controls',
                    intro: 'Does hypnotherapy work for anxiety? A 2019 meta-analysis found that hypnosis reduced anxiety more than control conditions (Valentine et al., 2019).',
                    bullets: [
                      '15 studies (17 trials): mean effect size of 0.79 at the end of treatment, so the average treated participant improved more than about 79% of control participants',
                      'Seven trials with the longest follow-up: mean effect size of 0.99',
                      'Hypnosis worked better when combined with other psychological interventions than when used alone',
                      'The analysis compared hypnosis with control conditions, not head-to-head with CBT, so it does not show hypnosis is as effective as CBT',
                    ],
                  },
                  {
                    topic: 'Weight Loss',
                    badge: 'Mixed Evidence',
                    intro: 'Does hypnotherapy work for weight loss? The evidence is mixed. A 1995 meta-analysis in the Journal of Consulting and Clinical Psychology found that adding hypnosis to cognitive-behavioural weight-loss treatment improved outcomes (Kirsch et al., 1995).',
                    bullets: [
                      'A 1996 reanalysis found a smaller effect that was no longer statistically significant once one study was removed (Allison & Faith, 1996)',
                      'Kirsch published a refined analysis that still favoured adding hypnosis, so researchers disagree about the size of the benefit',
                      'These studies compared CBT alone with CBT plus hypnosis, not hypnosis with diet and exercise alone',
                    ],
                  },
                  {
                    topic: 'Smoking Cessation',
                    badge: 'Evidence Is Mixed',
                    intro: 'Does hypnotherapy work to quit smoking? The research does not give a single answer. Some reviews are positive, a recent trial found results similar to cognitive-behavioural therapy, and a Cochrane review found insufficient evidence of an advantage over other support.',
                    bullets: [
                      '2025 systematic review: efficacy of hypnotherapy for smoking cessation is positive, but more biochemically verified studies are needed (Ekanayake & Elkins, 2025)',
                      '2024 randomised trial of 360 smokers: 12-month continuous abstinence of 15.0% with hypnotherapy vs 15.6% with CBT, not significantly different (Batra et al., 2024)',
                      '2019 Cochrane review of 14 studies: insufficient evidence that hypnotherapy helps people quit more than other behavioural support or quitting unassisted (Barnes et al., 2019)',
                    ],
                  },
                  {
                    topic: 'IBS and Digestive Issues',
                    badge: 'Recommended in ACG Guideline',
                    intro: 'Does hypnotherapy work for IBS? The 2021 American College of Gastroenterology guideline recommends gut-directed psychotherapies, including gut-directed hypnotherapy, for overall IBS symptoms, while rating the supporting evidence as low quality (Lacy et al., 2021).',
                    bullets: [
                      'A 2015 audit of 1,000 patients with refractory IBS at one UK hospital reported symptom improvement sustained for years (Miller et al., 2015)',
                      'An audit has no control group, so it cannot show how much of the improvement was due to hypnotherapy',
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

          {/* References */}
          <section style={{ padding: '40px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 12 }}>References</h2>
              <ul style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.7, paddingLeft: 18, margin: 0 }}>
                <li>Montgomery, G. H., DuHamel, K. N., &amp; Redd, W. H. (2000). A meta-analysis of hypnotically induced analgesia. <em>Int J Clin Exp Hypn</em>, 48(2), 138–153. <a href="https://pubmed.ncbi.nlm.nih.gov/10769981/" target="_blank" rel="noopener noreferrer" className="hf-link-hover" style={{ color: 'var(--hf-accent)' }}>PubMed</a></li>
                <li>Valentine, K. E., et al. (2019). The efficacy of hypnosis as a treatment for anxiety: a meta-analysis. <em>Int J Clin Exp Hypn</em>, 67(3), 336–363. <a href="https://doi.org/10.1080/00207144.2019.1613863" target="_blank" rel="noopener noreferrer" className="hf-link-hover" style={{ color: 'var(--hf-accent)' }}>doi:10.1080/00207144.2019.1613863</a></li>
                <li>Kirsch, I., Montgomery, G., &amp; Sapirstein, G. (1995). Hypnosis as an adjunct to cognitive-behavioral psychotherapy: a meta-analysis. <em>J Consult Clin Psychol</em>, 63(2), 214–220.</li>
                <li>Allison, D. B., &amp; Faith, M. S. (1996). Hypnosis as an adjunct to cognitive-behavioral psychotherapy for obesity: a meta-analytic reappraisal. <em>J Consult Clin Psychol</em>, 64(3), 513–516. <a href="https://pubmed.ncbi.nlm.nih.gov/8698944/" target="_blank" rel="noopener noreferrer" className="hf-link-hover" style={{ color: 'var(--hf-accent)' }}>PubMed</a></li>
                <li>Ekanayake, V., &amp; Elkins, G. R. (2025). Systematic review on hypnotherapy and smoking cessation. <em>Int J Clin Exp Hypn</em>, 73(1), 4–78. <a href="https://pubmed.ncbi.nlm.nih.gov/39773364/" target="_blank" rel="noopener noreferrer" className="hf-link-hover" style={{ color: 'var(--hf-accent)' }}>PubMed</a></li>
                <li>Batra, A., et al. (2024). Hypnotherapy compared to cognitive-behavioral therapy for smoking cessation in a randomized controlled trial. <em>Front Psychol</em>. <a href="https://doi.org/10.3389/fpsyg.2024.1330362" target="_blank" rel="noopener noreferrer" className="hf-link-hover" style={{ color: 'var(--hf-accent)' }}>doi:10.3389/fpsyg.2024.1330362</a></li>
                <li>Barnes, J., et al. (2019). Hypnotherapy for smoking cessation. <em>Cochrane Database Syst Rev</em>, CD001008. <a href="https://www.cochrane.org/evidence/CD001008" target="_blank" rel="noopener noreferrer" className="hf-link-hover" style={{ color: 'var(--hf-accent)' }}>Cochrane</a></li>
                <li>Lacy, B. E., et al. (2021). ACG clinical guideline: management of irritable bowel syndrome. <em>Am J Gastroenterol</em>, 116(1), 17–44.</li>
                <li>Miller, V., et al. (2015). Hypnotherapy for irritable bowel syndrome: an audit of one thousand adult patients. <em>Aliment Pharmacol Ther</em>, 41(9), 844–855.</li>
              </ul>
            </div>
          </section>

          {/* Medical Recognition */}
          <section style={{ padding: '72px 24px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', marginBottom: 16 }}>Professional Bodies and Guidelines</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 36 }}>
                Two examples of how professional bodies engage with clinical hypnosis. Neither is an endorsement of any individual hypnotherapist:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
                {[
                  { org: 'American Psychological Association (APA)', body: 'Division 30, the Society of Psychological Hypnosis, promotes the scientific study and clinical use of hypnosis by qualified professionals.' },
                  { org: 'American College of Gastroenterology', body: 'Its 2021 IBS guideline recommends gut-directed psychotherapies, including gut-directed hypnotherapy, and rates the supporting evidence as low quality (Lacy et al., 2021).' },
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
