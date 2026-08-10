import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { MapPin, Search, CheckCircle, Users, Star } from 'lucide-react';
import { getAllPractitioners, getAllCities } from '@/lib/data/practitioners';

export const metadata = {
  title: 'How to Find a Certified Hypnotherapist Near Me',
  description: 'Looking for a certified hypnotherapist near me? Search 1,150+ profiles, compare basics, and ask practitioners directly about credentials.',
  keywords: 'hypnotherapy near me, hypnotherapist near me, find a hypnotherapist, local hypnotherapy, certified hypnotherapist near me, hypnosis near me',
  alternates: { canonical: 'https://hypnotherapy-finder.com/hypnotherapy-near-me' },
  openGraph: { title: 'How to Find a Certified Hypnotherapist Near Me', description: 'Search hypnotherapy practitioner profiles by location, concern, and session type, then verify credentials directly.', url: 'https://hypnotherapy-finder.com/hypnotherapy-near-me', type: 'website', images: [{ url: '/hypnotherapy-near-me.png', width: 1200, height: 630, alt: 'Find hypnotherapists near me' }] },
  twitter: { card: 'summary_large_image', title: 'How to Find a Certified Hypnotherapist Near Me', description: 'Search hypnotherapy practitioner profiles near you, then confirm credentials directly.', images: ['/hypnotherapy-near-me.png'] },
};

export default async function HypnotherapyNearMePage() {
  const allPractitioners = getAllPractitioners();
  const cities = getAllCities();
  const featuredPractitioners = allPractitioners.filter(p => p.featured).slice(0, 6);
  const popularCities = cities.slice(0, 12);

  const jsonLd = { '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Certified Hypnotherapist Near Me - Local Hypnotherapy Directory', description: 'Directory to help people search for hypnotherapy near me.', mainEntity: { '@type': 'ItemList', name: 'How to Find Hypnotherapy Near Me', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Search by Location', description: 'Enter your city or zip code to find hypnotherapy near me' }, { '@type': 'ListItem', position: 2, name: 'Compare Relevant Services', description: 'Look for practitioners whose listed services match your concern' }, { '@type': 'ListItem', position: 3, name: 'Ask About Training', description: 'Contact practitioners directly to ask about certification, training, supervision, and approach' }, { '@type': 'ListItem', position: 4, name: 'Contact Directly', description: 'Reach out to discuss fit, session format, and next steps' }] }, provider: { '@type': 'Organization', name: 'Hypnotherapy Finder' } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'How do I find a certified hypnotherapist near me?', acceptedAnswer: { '@type': 'Answer', text: 'Use the directory to search hypnotherapy practitioner profiles by city, location, concern, and session type. Then contact practitioners directly to ask about their certification, training, and fit for your goals.' } }, { '@type': 'Question', name: 'What should I look for in hypnotherapy near me?', acceptedAnswer: { '@type': 'Answer', text: 'When searching for hypnotherapy near me, ask about certification, training background, supervision, relevant experience, session format, and whether their approach fits your concern.' } }, { '@type': 'Question', name: 'How much does hypnotherapy near me cost?', acceptedAnswer: { '@type': 'Answer', text: 'Hypnotherapy fees vary by practitioner, location, format, and session length. Contact practitioners directly for current pricing and package information.' } }, { '@type': 'Question', name: 'Is virtual hypnotherapy useful compared with in-person?', acceptedAnswer: { '@type': 'Answer', text: 'Many people use virtual hypnotherapy successfully when they have a private space, a stable connection, and a practitioner whose style suits online sessions.' } }] };

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
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Find Local Practitioners</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                How to Find a Certified Hypnotherapist Near Me
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 32 }}>
                Looking for a certified hypnotherapist near me? Search 1,150+ hypnotherapy practitioner profiles in your area, compare listed services and contact details, then ask each practitioner directly about certification, training, scope, fees, and availability.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Search Hypnotherapists Near Me
                </Link>
                <Link href="#how-to-find" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  How to Find the Right Hypnotherapist
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          <section style={{ padding: '48px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ position: 'relative', width: '100%', height: 400, borderRadius: 16, overflow: 'hidden', background: 'var(--hf-bg-mid)' }}>
                <Image src="/hypnotherapy-near-me.png" alt="Find hypnotherapists near me with a directory showing local practitioner profiles for anxiety, weight loss, and smoking cessation hypnotherapy" fill className="object-cover" priority />
              </div>
            </div>
          </section>

          {/* Stats */}
          <section style={{ padding: '56px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, textAlign: 'center' }}>
                {[
                  { icon: Users, value: `${allPractitioners.length.toLocaleString()}+`, label: 'Listed Hypnotherapy Profiles' },
                  { icon: MapPin, value: `${cities.length}+`, label: 'Cities Across the US' },
                  { icon: Star, value: '100%', label: 'Free to Use' },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'oklch(0.72 0.12 185 / 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                      <s.icon style={{ width: 24, height: 24, color: 'var(--hf-accent)' }} />
                    </div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 6 }}>{s.value}</div>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What It Means */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What Does "Hypnotherapy Near Me" Mean?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>When you search for <strong style={{ color: 'var(--hf-fg)' }}>hypnotherapy near me</strong>, you're usually looking for a local practitioner you can compare before booking. A directory helps you narrow the search by city, contact details, website, and the type of support you want to discuss.</p>
                <p style={{ marginBottom: 16 }}>Finding a local hypnotherapist can make practical questions easier: travel time, in-person session options, neighbourhood access, and whether online sessions are available if you prefer not to commute. Many people searching for hypnotherapy near me want a short list they can contact directly, not another generic wellness article.</p>
                <p>Our hypnotherapy directory makes it easier to find hypnotherapists near you. Whether you're researching hypnotherapy for anxiety, weight loss hypnotherapy, smoking cessation, or other support, use each profile as a starting point and confirm certification, scope, fees, and availability with the practitioner directly.</p>
              </div>
            </div>
          </section>

          {/* Certified Search Intent */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 880, margin: '0 auto' }}>
              <div className="glass-card" style={{ padding: '36px' }}>
                <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>How to Find a Certified Hypnotherapist Near Me</h2>
                <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 18 }}>
                  Search results often make every practitioner sound interchangeable. They are not. If your real question is <strong style={{ color: 'var(--hf-fg)' }}>how to find a certified hypnotherapist near me</strong>, use this page to build a shortlist, then verify the details directly before booking.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
                  {[
                    { title: 'Confirm credentials directly', body: 'Ask where they trained, what certification they hold, whether they belong to any professional associations, and how they stay within scope.' },
                    { title: 'Match method to your concern', body: 'Ask whether they use direct suggestion, Ericksonian hypnotherapy, parts work, regression-informed work, NLP, or another approach — and why that fits your goal.' },
                    { title: 'Check practical fit', body: 'Compare location, online session options, first-contact process, and whether they can explain session structure clearly before you book.' },
                  ].map((item) => (
                    <div key={item.title} style={{ padding: '20px', borderRadius: 12, background: 'rgba(255,255,255,0.03)' }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>{item.title}</h3>
                      <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginTop: 18, marginBottom: 0 }}>
                  Hypnotherapy Finder lists practitioner profiles and contact details. It does not verify credentials, pricing, insurance, experience, or availability, so the safest next step is always a direct conversation with the practitioner.
                </p>
              </div>
            </div>
          </section>

          {/* How to Find */}
          <section id="how-to-find" style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 32 }}>How to Find the Best Hypnotherapist Near Me</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { n: '1', title: 'Ask About Credentials and Certification', body: 'When searching for a certified hypnotherapist near me, ask each practitioner directly about their certification, training organisation, continuing education, supervision, and professional boundaries. The directory is a discovery tool, not a credential-verification service.' },
                  { n: '2', title: 'Match Their Services to Your Concern', body: "Different hypnotherapists near you may focus on different concerns. Some work with anxiety and stress, while others focus on habit change, smoking cessation, phobias, sleep, or confidence. Use the profile details to create a shortlist, then confirm the fit directly." },
                  { n: '3', title: 'Consider Location and Session Format', body: 'Finding hypnotherapy near me means checking practical factors like travel time, parking, online session options, accessibility, and whether the practitioner works in the way you prefer. Confirm current availability before making plans.' },
                  { n: '4', title: 'Check Their Website and Questions to Ask', body: "A useful practitioner website should explain their approach, training background, session process, boundaries, and contact process. If anything is unclear, ask before booking rather than assuming." },
                  { n: '5', title: 'Use the First Contact to Test Fit', body: 'Your first call or message is a chance to discuss your goals, ask how they work, and decide whether you feel comfortable. Hypnotherapy is collaborative, so fit matters as much as distance.' },
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

          {/* Featured Practitioners */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Featured Hypnotherapist Profiles Near You</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>Browse hypnotherapy practitioner profiles in your area. Use each profile to compare location and contact details, then confirm training, certification, services, and availability directly.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
                {featuredPractitioners.map((practitioner) => (
                  <div key={practitioner.id} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 6 }}>{practitioner.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                      <MapPin style={{ width: 12, height: 12, color: 'var(--hf-fg-dim)' }} />
                      <span style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>{practitioner.city}, {practitioner.state}</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.5, marginBottom: 16 }}>Open the profile for contact details and website information. Confirm credentials and current services directly with the practitioner.</p>
                    <Link href={`/practitioner/${practitioner.slug}`} className="btn-gradient hf-btn-accent" style={{ display: 'block', textAlign: 'center', padding: '9px', borderRadius: 8, color: '#fff', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>View Profile</Link>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>View All Hypnotherapists Near Me</Link>
              </div>
            </div>
          </section>

          {/* Popular Cities */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find Hypnotherapy in Popular Cities</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40 }}>Looking for hypnotherapy near me in a specific city? Browse our location pages to find hypnotherapist profiles in major cities across the United States.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                {popularCities.map((city) => (
                  <Link key={city.slug} href={`/location/${city.slug}`} className="glass-card hf-card-hover" style={{ display: 'block', padding: '16px', textAlign: 'center', textDecoration: 'none' }}>
                    <MapPin style={{ width: 16, height: 16, color: 'var(--hf-accent)', margin: '0 auto 8px' }} />
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 4 }}>{city.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>{city.practitionerCount} practitioners</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* What Helps */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What Can Hypnotherapy Near Me Help With?</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>When you find a hypnotherapist near you, the next step is to ask whether their approach fits the concern you want support with. Hypnotherapy is a complementary approach. If you're experiencing significant symptoms, please consult a qualified healthcare provider.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
                {[
                  { title: 'Mental Health & Wellness', items: [['Anxiety and Stress', 'Ask about support for nervous-system regulation and coping rehearsal'], ['Low Mood', 'Use hypnotherapy only as a complement to appropriate healthcare'], ['Trauma History', 'Ask about trauma-informed training and referral boundaries'], ['Phobias and Fears', 'Discuss graded rehearsal and safety-focused imagery']] },
                  { title: 'Behavioral Change', items: [['Smoking Cessation', 'Ask about stop-smoking hypnotherapy near me and follow-up structure'], ['Weight Loss', 'Discuss habit loops, cravings, and realistic behaviour change'], ['Unwanted Habits', 'Map triggers, automatic responses, and replacement behaviours'], ['Sleep Issues', 'Ask about pre-sleep cues and relaxation practice']] },
                  { title: 'Pain Support', items: [['Chronic Pain', 'Discuss complementary support alongside medical care'], ['Headaches', 'Ask whether stress, tension, and relaxation work are in scope'], ['Digestive Issues', 'Ask about gut-directed hypnotherapy and medical referral boundaries']] },
                  { title: 'Performance Enhancement', items: [['Sports Performance', 'Rehearse focus, confidence, and pressure moments'], ['Public Speaking', 'Practice calm preparation and stage imagery'], ['Confidence Building', 'Work on self-talk, future pacing, and situation rehearsal']] },
                ].map((group) => (
                  <div key={group.title} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-accent)', marginBottom: 14 }}>{group.title}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {group.items.map(([label, desc]) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <CheckCircle style={{ width: 14, height: 14, color: 'oklch(0.7 0.15 145)', flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.5 }}><strong style={{ color: 'var(--hf-fg)' }}>{label}:</strong> {desc}</span>
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 32 }}>Frequently Asked Questions About Hypnotherapy Near Me</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { q: 'How do I find a certified hypnotherapist near me?', a: 'Use the free directory to search hypnotherapist profiles in your area, then contact practitioners directly to confirm certification, training, supervision, scope, fees, and whether they work with your concern.' },
                  { q: 'How much does hypnotherapy near me cost?', a: 'Hypnotherapy costs vary by location, session length, format, and practitioner. Contact practitioners directly through the directory for current rates and package information.' },
                  { q: 'Is online hypnotherapy useful compared with in-person?', a: 'Many people prefer online sessions for convenience, while others prefer the structure of in-person appointments. Ask each practitioner how they run online sessions and what setup they recommend.' },
                  { q: 'How many sessions will I need?', a: 'The number of sessions depends on your goals, history, and the practitioner’s approach. Ask about the expected process, review points, and when they would recommend medical or mental-health support instead.' },
                  { q: 'What should I look for when choosing a hypnotherapist near me?', a: "Look for clear training information, sensible boundaries, relevant experience, transparent communication, and someone you feel comfortable speaking with. Do not assume credentials, price, or availability from a directory profile — confirm directly." },
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
                  { href: '/what-is-hypnotherapy', title: 'What is Hypnotherapy?', desc: 'Learn everything about hypnotherapy and how it works' },
                  { href: '/hypnotherapy-for-anxiety', title: 'Hypnotherapy for Anxiety', desc: 'Learn how hypnotherapy may support anxiety and stress work' },
                  { href: '/does-hypnotherapy-work', title: 'Does Hypnotherapy Work?', desc: 'Research context, limits, and realistic expectations for hypnotherapy' },
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Ready to Find Your Hypnotherapist?</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>Search our free directory of hypnotherapy practitioner profiles. Find hypnotherapists near you, compare the basics, and contact them directly to confirm fit.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find Hypnotherapists Near Me
                </Link>
                <Link href="/how-it-works" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  Learn About Hypnotherapy
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
