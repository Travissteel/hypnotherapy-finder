import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import Script from 'next/script';

export const metadata = {
  title: 'Hypnotherapy FAQs | Common Questions About Hypnosis Answered',
  description: 'Get answers to common questions about hypnotherapy, including safety, effectiveness, what to expect, costs, and how to choose a hypnotherapist.',
  keywords: 'hypnotherapy questions, is hypnotherapy safe, how much does hypnotherapy cost, hypnosis FAQ',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/faq',
  },
  openGraph: {
    title: 'Hypnotherapy FAQs | Common Questions Answered',
    description: 'Get answers to common questions about hypnotherapy, including safety, effectiveness, what to expect, costs, and how to choose a hypnotherapist.',
    url: 'https://hypnotherapy-finder.com/faq',
    siteName: 'Hypnotherapy Finder',
    images: [{ url: 'https://hypnotherapy-finder.com/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hypnotherapy FAQs | Common Questions Answered',
    description: 'Get answers to common questions about hypnotherapy, including safety, effectiveness, what to expect, costs, and how to choose a hypnotherapist.',
    images: ['https://hypnotherapy-finder.com/og-image.jpg'],
  },
};

export default function FAQPage() {
  const faqs = [
    {
      category: 'Basics',
      questions: [
        { q: 'What is hypnotherapy?', a: 'Hypnotherapy is a therapeutic technique that uses guided relaxation and focused attention to achieve a heightened state of awareness (trance). In this state, you can focus your mind more effectively and become more open to suggestions that help you make positive changes in your thoughts, feelings, and behaviors.' },
        { q: 'Is hypnotherapy the same as stage hypnosis?', a: 'No. Stage hypnosis is entertainment, while clinical hypnotherapy is a serious therapeutic practice. In therapeutic hypnosis, you remain in control, cannot be made to do anything against your will, and work with a trained professional toward specific healing or behavioral goals.' },
        { q: 'Does hypnotherapy really work?', a: "Yes. Hundreds of peer-reviewed studies support hypnotherapy's effectiveness for various conditions including pain management, anxiety, IBS, smoking cessation, and more. Success rates vary by individual and condition, but many people experience significant benefits, often in just a few sessions." },
      ]
    },
    {
      category: 'Safety & Control',
      questions: [
        { q: 'Is hypnotherapy safe?', a: "Yes, hypnotherapy is very safe when conducted by a trained, certified professional. It's a natural state similar to deep relaxation or focused concentration. You remain aware throughout the session and cannot be \"stuck\" in hypnosis." },
        { q: 'Will I be unconscious or asleep?', a: 'No. You remain aware and conscious during hypnotherapy. You can hear everything, speak if needed, and remember the session. Many people describe it as feeling deeply relaxed while staying mentally alert and focused.' },
        { q: 'Can I be made to do things against my will?', a: 'Absolutely not. You maintain complete control during hypnotherapy and cannot be made to do, say, or reveal anything against your values or desires. You can reject any suggestion and can emerge from hypnosis at any time.' },
        { q: "What if I can't be hypnotized?", a: 'Most people can be hypnotized to some degree. Hypnosis is a natural state we all experience daily (like getting absorbed in a book or movie). About 95% of people can achieve sufficient depth for therapeutic work. Willingness and trust in your hypnotherapist are key factors.' },
      ]
    },
    {
      category: 'What to Expect',
      questions: [
        { q: 'What happens in a hypnotherapy session?', a: 'A typical session includes: (1) Discussion of your goals and concerns, (2) Explanation of the process, (3) Guided relaxation to enter hypnotic state, (4) Therapeutic work using techniques tailored to your needs, (5) Gentle return to full awareness, (6) Discussion of the session and next steps. Sessions typically last 60-90 minutes.' },
        { q: 'How many sessions will I need?', a: 'This varies by person and goal. Some people see results in 1-3 sessions (especially for smoking cessation or specific phobias). More complex issues like chronic anxiety or weight management might require 6-10 sessions. Your hypnotherapist will discuss a treatment plan based on your specific needs.' },
        { q: 'What does hypnosis feel like?', a: "Most people describe it as deeply relaxing and pleasant. You might feel: very calm and peaceful, heavy or light, warm and comfortable, mentally focused, or like you're in a dreamlike state while still aware. There's no single \"right\" way to experience hypnosis." },
        { q: 'Will I remember the session?', a: "Usually yes. Most people remember all or most of their session. Some people may have gaps in memory, similar to when you \"zone out\" during a long drive but that's normal and doesn't affect results." },
      ]
    },
    {
      category: 'Effectiveness & Results',
      questions: [
        { q: 'What can hypnotherapy help with?', a: 'Hypnotherapy is effective for many issues including: anxiety and stress, weight loss, smoking cessation, pain management, insomnia, phobias and fears, IBS and digestive issues, confidence and performance, PTSD and trauma, breaking unwanted habits, and much more. Consult with a hypnotherapist about your specific goals.' },
        { q: 'How quickly will I see results?', a: 'Results vary by individual and issue. Some people notice changes immediately after the first session. Others see gradual improvement over several sessions. Smoking cessation often shows results in 1-3 sessions, while chronic anxiety or pain management might take longer.' },
        { q: 'Is hypnotherapy a permanent solution?', a: 'Hypnotherapy creates lasting change by working with your subconscious mind to establish new patterns. Many people experience long-term or permanent results. However, like any therapy, maintaining results may require occasional "booster" sessions or practicing self-hypnosis techniques at home.' },
        { q: 'Can hypnotherapy replace medical treatment?', a: 'No. Hypnotherapy should complement, not replace, medical care. Always consult with your physician about medical conditions. Many doctors recommend hypnotherapy as an adjunct treatment for pain, anxiety, IBS, and other conditions.' },
      ]
    },
    {
      category: 'Choosing a Hypnotherapist',
      questions: [
        { q: 'How do I choose a qualified hypnotherapist?', a: 'Look for: (1) Certification from recognized organizations (NGH, IACT, AHA, etc.), (2) Adequate training hours (minimum 100, preferably 200+), (3) Specialization in your specific issue, (4) Good reviews and testimonials, (5) Professional liability insurance, (6) Someone you feel comfortable with. Schedule a consultation before committing.' },
        { q: 'What certifications should a hypnotherapist have?', a: 'Reputable certifications include: Certified Hypnotherapist (CHt) from NGH, IACT, or ACHE; Clinical Hypnotherapist credentials; or medical professionals (MD, DO, psychologist, dentist) with hypnosis training through ASCH or SCEH.' },
        { q: 'Should I see a medical professional or a certified hypnotherapist?', a: 'For medical conditions, seeing a licensed healthcare provider (physician, psychologist) trained in hypnosis is ideal. For non-medical issues like habits, confidence, or stress management, a certified hypnotherapist is appropriate. For medical issues, a certified hypnotherapist can work alongside your medical team.' },
        { q: 'Can hypnotherapy be done online?', a: 'Yes! Online hypnotherapy via video call is very effective and convenient. The hypnotic state is achieved through voice and guidance, not physical presence. Many practitioners offer virtual sessions, which can be just as effective as in-person for most issues.' },
      ]
    },
    {
      category: 'Cost & Insurance',
      questions: [
        { q: 'How much does hypnotherapy cost?', a: 'Costs vary by location and practitioner experience. Typical ranges: $75-$150 per hour for certified hypnotherapists, $150-$300+ per hour for clinical hypnotherapists or medical professionals. Initial sessions may cost more. Package deals for multiple sessions are often available.' },
        { q: 'Does insurance cover hypnotherapy?', a: 'Coverage varies. Some insurance plans cover hypnotherapy when performed by licensed healthcare providers (MD, DO, psychologist) for covered conditions like pain management or smoking cessation. Coverage by certified hypnotherapists (non-medical) is less common. Check with your insurance provider and ask about HSA/FSA eligibility.' },
        { q: 'Is hypnotherapy worth the cost?', a: 'Many people find hypnotherapy cost-effective because it often requires fewer sessions than traditional talk therapy to see results. For example, 3-5 sessions for smoking cessation ($450-$750) is typically less expensive than years of buying cigarettes, and the health benefits are invaluable.' },
      ]
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.flatMap((category) =>
      category.questions.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      }))
    ),
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <main style={{ flex: 1, paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'oklch(0.72 0.12 185 / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HelpCircle style={{ width: 32, height: 32, color: 'var(--hf-accent)' }} />
              </div>
            </div>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Knowledge Base</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--hf-fg)', marginBottom: 16, lineHeight: 1.15 }}>
              Frequently Asked Questions
            </h1>
            <p style={{ fontSize: 18, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>
              Everything you need to know about hypnotherapy
            </p>
          </div>
        </section>

        {/* FAQs by Category */}
        <section style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>
            {faqs.map((category, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ width: 3, height: 20, background: 'var(--hf-accent)', borderRadius: 2, flexShrink: 0 }} />
                  <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)' }}>
                    {category.category}
                  </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {category.questions.map((faq, qIdx) => (
                    <div key={qIdx} className="glass-card" style={{ padding: '24px 28px' }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 10, lineHeight: 1.4 }}>
                        {faq.q}
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, fontWeight: 300 }}>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '0 24px 80px' }}>
          <div className="glass-card" style={{ maxWidth: 800, margin: '0 auto', padding: '48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: 'var(--hf-accent)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.08 }} />
            <h2 className="font-serif-display" style={{ fontSize: 28, color: 'var(--hf-fg)', marginBottom: 12 }}>Still Have Questions?</h2>
            <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 32, maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.6 }}>
              The best way to learn more is to speak directly with a certified hypnotherapist in your area.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-block', padding: '13px 28px', borderRadius: 9999, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none', letterSpacing: '0.01em' }}>
                Find a Practitioner
              </Link>
              <Link href="/contact" className="glass hf-glass-hover" style={{ display: 'inline-block', padding: '13px 28px', borderRadius: 9999, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section style={{ padding: '0 24px 80px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 24, textAlign: 'center' }}>Learn More</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {[
                { href: '/how-it-works', title: 'How It Works', desc: 'Understand the process and what to expect' },
                { href: '/about', title: 'About Hypnotherapy', desc: 'History, science, and professional standards' },
                { href: '/locations', title: 'Find by Location', desc: 'Browse practitioners in 30+ cities' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="glass-card hf-card-hover" style={{ display: 'block', padding: '24px', textDecoration: 'none', textAlign: 'center' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 6 }}>{link.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.5 }}>{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
