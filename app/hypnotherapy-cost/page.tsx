import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { DollarSign, MapPin, CheckCircle, Search, CreditCard } from 'lucide-react';

export const metadata = {
  title: 'How Much Does Hypnotherapy Cost? 2025 Prices & Insurance Coverage',
  description: 'Complete guide to hypnotherapy costs: average session prices, insurance coverage, payment options, and cost by condition. Find affordable hypnotherapy near you.',
  keywords: 'how much does hypnotherapy cost, hypnotherapy cost, hypnotherapy prices, hypnotherapy insurance coverage, how much is hypnotherapy',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/hypnotherapy-cost',
  },
};

export default function HypnotherapyCostPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does hypnotherapy cost per session?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hypnotherapy costs between $75 and $300 per session in the United States, with a national average of $150 per session. Prices vary based on location, practitioner credentials and experience, session length (typically 60-90 minutes), and specialty area. Major cities like New York, Los Angeles, and San Francisco charge $200-$300 per session, while smaller cities and rural areas typically charge $75-$150. Initial consultations often cost more ($150-$250) as they are longer and more comprehensive.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is hypnotherapy covered by insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Some insurance plans cover hypnotherapy when specific conditions are met: (1) the practitioner is a licensed healthcare professional (psychologist, physician, licensed clinical social worker), (2) hypnotherapy is used to treat a covered medical or mental health condition, (3) treatment is deemed medically necessary. Commonly covered conditions include chronic pain management, anxiety disorders, PTSD, smoking cessation, and IBS. Medicare may cover hypnotherapy in limited circumstances. Coverage varies significantly by insurance provider and plan.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many hypnotherapy sessions do I need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most people need 4-8 hypnotherapy sessions for optimal results, though this varies by condition and individual. Smoking cessation may only require 1-3 sessions for some people. Anxiety, weight loss, and phobias typically need 4-6 sessions. Chronic conditions like pain management or trauma may require 8-12+ sessions. Your hypnotherapist will create a treatment plan based on your specific needs. Total costs typically range from $300 for single-session smoking cessation to $1,200-$2,400 for comprehensive 8-session programs.',
        },
      },
    ],
  };

  const numBox: React.CSSProperties = { width: 36, height: 36, borderRadius: 10, background: 'oklch(0.72 0.12 185 / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 15, fontWeight: 700, color: 'var(--hf-accent)' };

  const rowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' };
  const lastRowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0' };

  return (
    <>
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="beforeInteractive"
      />

      <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1, paddingTop: 80 }}>

          {/* Hero */}
          <section style={{ background: 'var(--hf-bg-mid)', padding: '72px 24px 64px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', background: 'oklch(0.72 0.12 185 / 0.15)', color: 'var(--hf-accent)', fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                Pricing Guide
              </span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(26px, 5vw, 46px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                How Much Does Hypnotherapy Cost? Complete Pricing Guide
              </h1>
              <p style={{ fontSize: 18, color: 'var(--hf-fg-dim)', marginBottom: 36, maxWidth: 580, margin: '0 auto 36px' }}>
                Comprehensive breakdown of hypnotherapy costs, insurance coverage, payment options,
                and how to find affordable hypnotherapy near you.
              </p>
              <Link href="#pricing" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                View Pricing
              </Link>
            </div>
          </section>

          {/* Quick Answer */}
          <section style={{ padding: '48px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div className="glass-card" style={{ padding: '32px', borderLeft: '4px solid var(--hf-accent)' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'oklch(0.72 0.12 185 / 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <DollarSign style={{ width: 22, height: 22, color: 'var(--hf-accent)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 20 }}>
                      Quick Answer: Average Hypnotherapy Cost
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 4 }}>National Average</p>
                        <p style={{ fontSize: 36, fontWeight: 800, color: 'var(--hf-accent)', lineHeight: 1 }}>$150</p>
                        <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', marginTop: 4 }}>per session</p>
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 4 }}>Typical Range</p>
                        <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--hf-accent)', lineHeight: 1 }}>$75–$300</p>
                        <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', marginTop: 4 }}>depending on location &amp; experience</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Pricing */}
          <section id="pricing" style={{ padding: '72px 24px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', marginBottom: 40 }}>Hypnotherapy Cost Breakdown</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                <div className="glass-card" style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 20 }}>Cost by Location</h3>
                  <div>
                    {[
                      { label: 'Major Cities (NYC, LA, SF, Chicago)', sub: 'High cost of living areas', price: '$200–$300' },
                      { label: 'Medium Cities (Austin, Denver, Seattle)', sub: 'Moderate cost of living', price: '$125–$200' },
                    ].map((row, i) => (
                      <div key={i} style={rowStyle}>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)' }}>{row.label}</p>
                          <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>{row.sub}</p>
                        </div>
                        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--hf-accent)', whiteSpace: 'nowrap', marginLeft: 16 }}>{row.price}</span>
                      </div>
                    ))}
                    <div style={lastRowStyle}>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)' }}>Smaller Cities &amp; Rural Areas</p>
                        <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>Lower cost of living</p>
                      </div>
                      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--hf-accent)', whiteSpace: 'nowrap', marginLeft: 16 }}>$75–$150</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 20 }}>Cost by Practitioner Credentials</h3>
                  <div>
                    {[
                      { label: 'Licensed Psychologist/Physician', sub: 'Advanced degrees + hypnotherapy training', price: '$175–$300' },
                      { label: 'Licensed Therapist/Counselor', sub: "Master's degree + certification", price: '$125–$200' },
                    ].map((row, i) => (
                      <div key={i} style={rowStyle}>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)' }}>{row.label}</p>
                          <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>{row.sub}</p>
                        </div>
                        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--hf-accent)', whiteSpace: 'nowrap', marginLeft: 16 }}>{row.price}</span>
                      </div>
                    ))}
                    <div style={lastRowStyle}>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)' }}>Certified Hypnotherapist (CHt)</p>
                        <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>Hypnotherapy certification only</p>
                      </div>
                      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--hf-accent)', whiteSpace: 'nowrap', marginLeft: 16 }}>$75–$150</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 20 }}>Cost by Session Type</h3>
                  <div>
                    {[
                      { label: 'Initial Consultation', sub: '90-120 minutes, comprehensive assessment', price: '$150–$250' },
                      { label: 'Standard Session', sub: '60-75 minutes, ongoing treatment', price: '$100–$200' },
                      { label: 'Online/Virtual Session', sub: '60 minutes via video call', price: '$75–$150' },
                    ].map((row, i) => (
                      <div key={i} style={rowStyle}>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)' }}>{row.label}</p>
                          <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>{row.sub}</p>
                        </div>
                        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--hf-accent)', whiteSpace: 'nowrap', marginLeft: 16 }}>{row.price}</span>
                      </div>
                    ))}
                    <div style={lastRowStyle}>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)' }}>Group Session</p>
                        <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>Per person, 90 minutes</p>
                      </div>
                      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--hf-accent)', whiteSpace: 'nowrap', marginLeft: 16 }}>$30–$75</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 8 }}>Total Cost by Condition</h3>
                  <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', marginBottom: 20 }}>How much does hypnotherapy cost depends on how many sessions you need:</p>
                  <div>
                    {[
                      { label: 'Smoking Cessation', sub: '1-3 sessions typically', price: '$150–$600' },
                      { label: 'Phobias & Specific Fears', sub: '3-5 sessions typically', price: '$450–$1,000' },
                      { label: 'Anxiety, Weight Loss, Confidence', sub: '6-8 sessions typically', price: '$900–$1,600' },
                    ].map((row, i) => (
                      <div key={i} style={rowStyle}>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)' }}>{row.label}</p>
                          <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>{row.sub}</p>
                        </div>
                        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--hf-accent)', whiteSpace: 'nowrap', marginLeft: 16 }}>{row.price}</span>
                      </div>
                    ))}
                    <div style={lastRowStyle}>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)' }}>Chronic Pain, Trauma, IBS</p>
                        <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>8-12+ sessions typically</p>
                      </div>
                      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--hf-accent)', whiteSpace: 'nowrap', marginLeft: 16 }}>$1,200–$3,000+</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Insurance Coverage */}
          <section style={{ padding: '72px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', marginBottom: 32 }}>Is Hypnotherapy Covered by Insurance?</h2>

              <div className="glass-card" style={{ padding: '28px', marginBottom: 40 }}>
                <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 20 }}>
                  <strong style={{ color: 'var(--hf-fg)' }}>Is hypnotherapy covered by insurance?</strong> The answer depends on several factors. Some insurance plans do cover hypnotherapy, while others don't. Here's what you need to know:
                </p>

                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 14 }}>When Insurance Typically Covers Hypnotherapy:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {[
                    'Provided by a licensed healthcare professional (psychologist, physician, LCSW)',
                    'Used to treat a covered medical or mental health condition',
                    'Deemed medically necessary by your doctor',
                    'Pre-authorized by your insurance company (if required)',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <CheckCircle style={{ width: 16, height: 16, color: 'oklch(0.7 0.15 145)', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 14, color: 'var(--hf-fg-dim)' }}>{item}</span>
                    </div>
                  ))}
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 14 }}>Commonly Covered Conditions:</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
                  {['Chronic pain management', 'Anxiety disorders', 'PTSD and trauma', 'IBS and digestive disorders', 'Smoking cessation programs', 'Sleep disorders'].map((cond, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 14px', borderRadius: 8 }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--hf-fg-dim)' }}>• {cond}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 24 }}>How to Get Insurance Coverage</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { title: 'Contact Your Insurance Provider', body: 'Call the number on your insurance card and ask about coverage for "clinical hypnosis" or "hypnotherapy." Ask what conditions are covered and what credentials the provider needs.' },
                  { title: 'Find an In-Network Provider', body: 'Ask for a list of in-network hypnotherapists or licensed healthcare providers who practice clinical hypnosis. Out-of-network providers may require higher copays or may not be covered at all.' },
                  { title: 'Get a Referral if Required', body: 'Some plans require a referral from your primary care physician. Ask your doctor to refer you for hypnotherapy to treat your specific medical or mental health condition.' },
                  { title: 'Request Pre-Authorization', body: 'Many insurance plans require pre-authorization for hypnotherapy. Your hypnotherapist or their billing department can usually help with this process.' },
                  { title: 'Keep Detailed Records', body: 'Save all receipts, session notes, and documentation. Even if not covered initially, you may be able to submit for reimbursement. Some plans cover a percentage after you meet your deductible.' },
                ].map((step, i) => (
                  <div key={i} className="glass-card" style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={numBox}>{i + 1}</div>
                      <div>
                        <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 6 }}>{step.title}</h4>
                        <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>{step.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Payment Options */}
          <section style={{ padding: '72px 24px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--hf-fg)', marginBottom: 40 }}>Payment Options &amp; Ways to Save</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {[
                  { title: 'Package Deals', body: 'Many hypnotherapists offer discounted rates when you buy multiple sessions upfront. A 6-session package might save you 10-20% compared to paying per session.' },
                  { title: 'Sliding Scale Fees', body: 'Some practitioners offer sliding scale fees based on income. Ask if this option is available, especially if you\'re experiencing financial hardship.' },
                  { title: 'HSA/FSA Accounts', body: 'If hypnotherapy is medically necessary, you may be able to use Health Savings Account (HSA) or Flexible Spending Account (FSA) funds to pay for sessions.' },
                  { title: 'Payment Plans', body: 'Ask about payment plans that allow you to spread the cost over several months. Many practitioners work with services like CareCredit for healthcare financing.' },
                  { title: 'Online Sessions', body: 'Virtual hypnotherapy sessions often cost 20-40% less than in-person sessions and can be just as effective for many conditions.' },
                  { title: 'Group Sessions', body: 'Group hypnotherapy for issues like smoking cessation or weight loss costs significantly less per person ($30-$75) than individual sessions.' },
                ].map((item, i) => (
                  <div key={i} className="glass-card" style={{ padding: '24px' }}>
                    <CreditCard style={{ width: 22, height: 22, color: 'var(--hf-accent)', marginBottom: 12 }} />
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg, oklch(0.25 0.05 185), oklch(0.18 0.03 240))', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--hf-fg)', marginBottom: 16 }}>Find Affordable Hypnotherapy Near You</h2>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
                Compare prices, check insurance acceptance, and find qualified hypnotherapists in your area through our free directory.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/hypnotherapy-near-me" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <MapPin style={{ width: 16, height: 16 }} /> Find Hypnotherapists Near Me
                </Link>
                <Link href="/search" className="glass hf-glass-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Search Directory
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
