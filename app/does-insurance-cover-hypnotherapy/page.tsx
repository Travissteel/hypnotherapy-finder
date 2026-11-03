import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { MapPin, Search } from 'lucide-react';

export const metadata = {
  title: 'Does Insurance Cover Hypnotherapy? Medicare & HSA/FSA',
  description: 'Does insurance cover hypnotherapy? Plain-English guide to private insurance, Medicare, Medicaid and HSA/FSA funds, plus what to ask your insurer and your practitioner before booking.',
  keywords: 'does insurance cover hypnotherapy, hypnotherapy insurance, does medicare cover hypnotherapy, does medicaid cover hypnotherapy, is hypnotherapy covered by insurance, hypnotherapy hsa fsa, hypnotherapist that accepts insurance',
  alternates: { canonical: 'https://hypnotherapy-finder.com/does-insurance-cover-hypnotherapy' },
  openGraph: {
    title: 'Does Insurance Cover Hypnotherapy? Medicare & HSA/FSA',
    description: 'What private insurance, Medicare, Medicaid and HSA/FSA accounts may and may not cover for hypnotherapy, and the questions to ask before you book.',
    url: 'https://hypnotherapy-finder.com/does-insurance-cover-hypnotherapy',
    type: 'article',
  },
};

const faqs = [
  {
    q: 'Does insurance cover hypnotherapy?',
    a: 'Sometimes, but often not. Coverage depends on your plan, on who provides the service (for example a licensed psychologist or physician rather than a non-licensed hypnotherapist), and on whether the session is billed as treatment for a covered condition. Many people end up paying out of pocket. Call your insurer and ask before booking.',
  },
  {
    q: 'Does Medicare cover hypnotherapy?',
    a: 'Medicare generally does not cover hypnotherapy as a standalone service. If a Medicare-enrolled provider such as a licensed mental health professional uses hypnosis as part of a covered treatment, how that is billed and covered can vary. Check with Medicare or your plan and with the provider before booking.',
  },
  {
    q: 'Does Medicaid cover hypnotherapy?',
    a: 'Medicaid rules differ by state, and hypnotherapy is not commonly listed as a covered service. Your state Medicaid office or managed care plan can tell you whether any hypnosis-related services are covered and which providers qualify.',
  },
  {
    q: 'Can I use HSA or FSA funds for hypnotherapy?',
    a: 'Possibly. HSA and FSA funds are generally limited to medical care for a specific condition rather than general wellness, and the plan administrator decides what qualifies. A letter from a physician explaining medical need is often requested. Ask your administrator before you pay, and keep receipts.',
  },
  {
    q: 'Can I find a hypnotherapist who accepts insurance?',
    a: 'Some licensed healthcare professionals who use hypnosis do bill insurance, while most independent hypnotherapists are paid directly by the client. Hypnotherapy Finder does not verify insurance acceptance, so ask each practitioner directly whether they bill insurance, which plans they accept, and whether they can provide a receipt you can submit yourself.',
  },
  {
    q: 'What if my insurance will not cover hypnotherapy?',
    a: 'Ask about package pricing, payment plans or sliding-scale rates, and compare options in your area. See our hypnotherapy cost guide for typical price ranges.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const coverage = [
  { title: 'Private insurance', body: 'Coverage varies widely by plan. It is more likely when a licensed healthcare professional, such as a psychologist, physician or licensed counselor, uses hypnosis as part of treating a covered condition. Sessions with a non-licensed hypnotherapist are less commonly covered. Plans may also require pre-authorization or a diagnosis code.' },
  { title: 'Medicare', body: 'Hypnotherapy is generally not covered as a standalone service. If a Medicare-enrolled provider uses hypnosis within a covered treatment, billing and coverage can differ, so confirm with Medicare or your plan and the provider before booking.' },
  { title: 'Medicaid', body: 'Rules are set state by state and hypnotherapy is not commonly a listed benefit. Contact your state Medicaid office or managed care plan to ask whether any hypnosis-related services are covered.' },
  { title: 'HSA and FSA', body: 'These accounts are generally meant for medical care of a specific condition rather than general wellness. Whether hypnotherapy qualifies is up to your plan administrator, and a physician letter explaining medical need is often requested. Ask before paying, and keep itemised receipts.' },
];

const askInsurer = [
  'Is hypnotherapy or clinical hypnosis a covered benefit under my plan?',
  'Does coverage depend on the provider’s license type (for example psychologist, physician or counselor)?',
  'Is a referral, diagnosis code or pre-authorization required?',
  'Are there session limits, a deductible or a copay?',
  'Is the provider in network, and what happens if they are out of network?',
];

const askPractitioner = [
  'Do you bill insurance directly, or do clients pay you and submit a claim themselves?',
  'What is your license or professional background, and what services do you bill under?',
  'Can you provide an itemised receipt with dates and service descriptions?',
  'What is the fee per session, and do you offer packages or payment plans?',
  'Can you provide documentation if my HSA or FSA administrator asks for it?',
];

const card: React.CSSProperties = { padding: '22px' };
const h3: React.CSSProperties = { fontSize: 15, fontWeight: 700, color: 'var(--hf-accent)', marginBottom: 8 };
const p: React.CSSProperties = { fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.65, margin: 0 };
const link: React.CSSProperties = { color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 500 };

export default function DoesInsuranceCoverHypnotherapyPage() {
  return (
    <>
      <JsonLd id="schema-faq" data={faqSchema} />

      <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: 80 }}>

          {/* Hero */}
          <section style={{ background: 'var(--hf-bg-mid)', padding: '72px 24px 64px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Insurance Guide</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 46px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Does Insurance Cover Hypnotherapy?
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>
                Sometimes, but often not. Whether <strong style={{ color: 'var(--hf-fg)' }}>insurance covers hypnotherapy</strong> depends on your plan, who provides the session, and what it is billed for. Here is how private insurance, Medicare, Medicaid and HSA/FSA accounts usually treat it, and the questions that get you a real answer.
              </p>
            </div>
          </section>

          {/* Short answer */}
          <section style={{ padding: '56px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>The Short Answer</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16 }}>
                Most independent hypnotherapists are paid directly by the client, and most insurance plans do not list hypnotherapy as a standard benefit. Coverage is more realistic when a licensed healthcare professional uses hypnosis as part of treating a covered condition. Even then, plans differ, so the only reliable answer comes from your insurer.
              </p>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, margin: 0 }}>
                This page is general information, not insurance, tax or medical advice. Plans and rules change, so confirm details with your insurer, plan administrator or the practitioner.
              </p>
            </div>
          </section>

          {/* Coverage by type */}
          <section style={{ padding: '56px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>Insurance, Medicare, Medicaid and HSA/FSA: What to Expect</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
                {coverage.map((item) => (
                  <div key={item.title} className="glass-card" style={card}>
                    <h3 style={h3}>{item.title}</h3>
                    <p style={p}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Questions */}
          <section style={{ padding: '56px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>Questions to Ask Before You Book</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
                <div className="glass-card" style={card}>
                  <h3 style={h3}>Ask your insurer</h3>
                  <ul style={{ ...p, paddingLeft: 18 }}>
                    {askInsurer.map((q) => <li key={q} style={{ marginBottom: 8 }}>{q}</li>)}
                  </ul>
                </div>
                <div className="glass-card" style={card}>
                  <h3 style={h3}>Ask the practitioner</h3>
                  <ul style={{ ...p, paddingLeft: 18 }}>
                    {askPractitioner.map((q) => <li key={q} style={{ marginBottom: 8 }}>{q}</li>)}
                  </ul>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginTop: 22, marginBottom: 0 }}>
                Hypnotherapy Finder lists practitioner profiles and contact details. It does not verify insurance acceptance, pricing, credentials or availability, so confirm each of these with the practitioner directly.
              </p>
            </div>
          </section>

          {/* If not covered */}
          <section style={{ padding: '56px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>If Insurance Will Not Cover It</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16 }}>
                Many people pay out of pocket. Ask about package pricing, payment plans or sliding-scale rates, and consider online sessions, which can widen your options. See the <Link href="/hypnotherapy-cost" className="hf-link-hover" style={link}>hypnotherapy cost guide</Link> for typical price ranges, or <Link href="/online-hypnotherapy" className="hf-link-hover" style={link}>online hypnotherapy</Link> if you want to compare virtual sessions.
              </p>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, margin: 0 }}>
                Hypnotherapy is a complementary approach. If you are dealing with significant symptoms, speak with a qualified healthcare provider, who can also tell you what your plan covers.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ padding: '56px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 28 }}>Hypnotherapy Insurance FAQ</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {faqs.map((f) => (
                  <div key={f.q} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 10 }}>{f.q}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg, oklch(0.25 0.05 185), oklch(0.18 0.03 240))', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
              <h2 className="font-serif-display" style={{ fontSize: 'clamp(24px, 4vw, 34px)', color: 'var(--hf-fg)', marginBottom: 16 }}>Find a Hypnotherapist and Ask About Payment</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>
                Browse practitioner profiles, then contact them directly to ask about fees, insurance and receipts.
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
