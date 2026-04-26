import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { MapPin, Search, CheckCircle, Users, Star } from 'lucide-react';
import { getAllPractitioners, getAllCities } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Hypnotherapy Near Me | 1,150+ Practitioners',
  description: 'Find a qualified hypnotherapist near me. Search 1,150+ certified hypnotherapy professionals by location and specialty.',
  keywords: 'hypnotherapy near me, hypnotherapist near me, find a hypnotherapist, local hypnotherapy, certified hypnotherapist near me, hypnosis near me',
  alternates: { canonical: 'https://hypnotherapy-finder.com/hypnotherapy-near-me' },
  openGraph: { title: 'Hypnotherapy Near Me | 1,150+ Certified Hypnotherapists', description: 'Find a qualified hypnotherapist near you. Search 1,150+ verified practitioners by location and specialty.', url: 'https://hypnotherapy-finder.com/hypnotherapy-near-me', type: 'website', images: [{ url: '/hypnotherapy-near-me.png', width: 1200, height: 630, alt: 'Find certified hypnotherapists near me' }] },
  twitter: { card: 'summary_large_image', title: 'Hypnotherapy Near Me | 1,150+ Certified Hypnotherapists', description: 'Find a qualified hypnotherapist near you.', images: ['/hypnotherapy-near-me.png'] },
};

export default async function HypnotherapyNearMePage() {
  const allPractitioners = getAllPractitioners();
  const cities = getAllCities();
  const featuredPractitioners = allPractitioners.filter(p => p.featured).slice(0, 6);
  const popularCities = cities.slice(0, 12);

  const jsonLd = { '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Hypnotherapy Near Me - Find Local Hypnotherapists', description: 'Comprehensive directory to find hypnotherapy near me.', mainEntity: { '@type': 'ItemList', name: 'How to Find Hypnotherapy Near Me', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Search by Location', description: 'Enter your city or zip code to find hypnotherapy near me' }, { '@type': 'ListItem', position: 2, name: 'Filter by Specialty', description: 'Choose from anxiety, weight loss, smoking cessation, and more' }, { '@type': 'ListItem', position: 3, name: 'Review Credentials', description: 'All hypnotherapists are verified and certified' }, { '@type': 'ListItem', position: 4, name: 'Contact Directly', description: 'Reach out to schedule your first consultation' }] }, provider: { '@type': 'Organization', name: 'Hypnotherapy Finder' } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'How do I find hypnotherapy near me?', acceptedAnswer: { '@type': 'Answer', text: 'To find hypnotherapy near me, use our search tool by entering your city or zip code. We have over 1,150 certified hypnotherapists across 31 major cities.' } }, { '@type': 'Question', name: 'What should I look for in hypnotherapy near me?', acceptedAnswer: { '@type': 'Answer', text: 'When searching for hypnotherapy near me, look for certified practitioners with credentials like NGH, IACT, or ABH certification.' } }, { '@type': 'Question', name: 'How much does hypnotherapy near me cost?', acceptedAnswer: { '@type': 'Answer', text: 'Hypnotherapy near me typically costs between $75-$300 per session, with most practitioners charging $125-$200.' } }, { '@type': 'Question', name: 'Is virtual hypnotherapy as effective as in-person?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, virtual hypnotherapy can be just as effective as in-person sessions.' } }] };

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
                Find Hypnotherapy Near Me &amp; Connect with Local Hypnotherapists
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 32 }}>
                Looking for a hypnotherapist near me? Search 1,150+ certified hypnotherapy professionals in your area. Find verified practitioners specializing in anxiety, weight loss, smoking cessation, and more.
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
                <Image src="/hypnotherapy-near-me.png" alt="Find certified hypnotherapists near me with comprehensive directory showing local practitioners specializing in anxiety, weight loss, and smoking cessation hypnotherapy" fill className="object-cover" priority />
              </div>
            </div>
          </section>

          {/* Stats */}
          <section style={{ padding: '56px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, textAlign: 'center' }}>
                {[
                  { icon: Users, value: `${allPractitioners.length.toLocaleString()}+`, label: 'Verified Hypnotherapists' },
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
                <p style={{ marginBottom: 16 }}>When you search for <strong style={{ color: 'var(--hf-fg)' }}>hypnotherapy near me</strong>, you're looking for qualified hypnotherapists practicing in your local area. Hypnotherapy near me searches help you find certified professionals who can provide in-person or virtual hypnotherapy services tailored to your specific needs.</p>
                <p style={{ marginBottom: 16 }}>Finding a local hypnotherapist offers several advantages. Local hypnotherapy practitioners understand your community, can offer flexible scheduling for in-person sessions, and are often more accessible for ongoing treatment. Many people searching for hypnotherapy near me want the personal connection that comes with face-to-face sessions.</p>
                <p>Our hypnotherapy directory makes it easy to find hypnotherapists near you. Whether you're looking for hypnotherapy for anxiety, weight loss hypnotherapy, smoking cessation, or other specialized services, you can filter by location and specialty to find the perfect match.</p>
              </div>
            </div>
          </section>

          {/* How to Find */}
          <section id="how-to-find" style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 32 }}>How to Find the Best Hypnotherapist Near Me</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { n: '1', title: 'Check Credentials and Certifications', body: 'When searching for hypnotherapy near me, verify that practitioners hold proper certifications from recognized organizations like NGH (National Guild of Hypnotists), IACT (International Association of Counselors & Therapists), or ABH (American Board of Hypnotherapy). Our directory displays all certifications for each hypnotherapist.' },
                  { n: '2', title: 'Review Their Specialties', body: "Different hypnotherapists near you may specialize in different areas. Some focus on anxiety and stress relief, while others specialize in weight loss, smoking cessation, phobias, or pain management. Use our search filters to find hypnotherapy professionals who specialize in your specific concern." },
                  { n: '3', title: 'Consider Location and Availability', body: 'Finding hypnotherapy near me means considering practical factors like distance, parking, and appointment availability. Many hypnotherapists also offer online sessions, which can be just as effective for certain concerns. Check each practitioner\'s profile to see if they offer virtual hypnotherapy sessions.' },
                  { n: '4', title: 'Read Reviews and Experience', body: "Years of experience matter when choosing a hypnotherapist near you. Our directory shows how long each practitioner has been practicing. More experienced hypnotherapists have worked with a wider variety of cases and developed refined techniques." },
                  { n: '5', title: 'Schedule a Consultation', body: 'Most hypnotherapists near you offer initial consultations. Use this opportunity to discuss your goals, ask about their approach, and determine if you feel comfortable with them. The therapeutic relationship is crucial for successful hypnotherapy outcomes.' },
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
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Featured Hypnotherapists Near You</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>Browse certified hypnotherapy practitioners in your area. Each profile includes credentials, specialties, and contact information.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
                {featuredPractitioners.map((practitioner) => (
                  <div key={practitioner.id} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 6 }}>{practitioner.name}</h3>
                    {practitioner.credentials && <p style={{ fontSize: 12, color: 'var(--hf-accent)', marginBottom: 8 }}>{practitioner.credentials}</p>}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                      <MapPin style={{ width: 12, height: 12, color: 'var(--hf-fg-dim)' }} />
                      <span style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>{practitioner.city}, {practitioner.state}</span>
                    </div>
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
                <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>View All Hypnotherapists Near Me</Link>
              </div>
            </div>
          </section>

          {/* Popular Cities */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find Hypnotherapy in Popular Cities</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40 }}>Looking for hypnotherapy near me in a specific city? Browse our location pages to find certified hypnotherapists in major cities across the United States.</p>
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
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>When you find a qualified hypnotherapist near you, they can help address a wide range of concerns. Hypnotherapy has been shown to be effective for many conditions, both mental and physical.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
                {[
                  { title: 'Mental Health & Wellness', items: [['Anxiety and Stress', 'Find hypnotherapy for anxiety near me to learn relaxation techniques'], ['Depression', 'Complement traditional treatments with hypnotherapy'], ['PTSD and Trauma', 'Process traumatic experiences safely'], ['Phobias and Fears', 'Overcome specific fears and phobias']] },
                  { title: 'Behavioral Change', items: [['Smoking Cessation', 'Quit smoking with hypnotherapy near me'], ['Weight Loss', 'Achieve healthy eating habits and weight management'], ['Breaking Bad Habits', 'Eliminate unwanted behaviors'], ['Sleep Issues', 'Improve sleep quality and overcome insomnia']] },
                  { title: 'Pain Management', items: [['Chronic Pain', 'Manage pain through hypnotic techniques'], ['Migraines and Headaches', 'Reduce frequency and intensity'], ['IBS and Digestive Issues', 'Manage symptoms effectively']] },
                  { title: 'Performance Enhancement', items: [['Sports Performance', 'Improve focus and mental game'], ['Public Speaking', 'Overcome stage fright and anxiety'], ['Confidence Building', 'Boost self-esteem and confidence']] },
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
                  { q: 'How do I find a qualified hypnotherapist near me?', a: 'Use our free directory to search for certified hypnotherapists in your area. Filter by city, specialty, and credentials. Look for practitioners certified by recognized organizations like NGH, IACT, or ABH. Read their profiles, check their experience, and contact them directly to schedule a consultation.' },
                  { q: 'How much does hypnotherapy near me cost?', a: 'Hypnotherapy costs vary by location, practitioner experience, and session length. Most sessions range from $75 to $200 per hour. Many hypnotherapists offer package deals for multiple sessions. Contact practitioners directly through our directory to inquire about their rates and payment options.' },
                  { q: 'Is online hypnotherapy as effective as in-person?', a: 'Research shows that online hypnotherapy can be just as effective as in-person sessions for many concerns. The key is having a quiet, comfortable space and a stable internet connection. Many people find online sessions more convenient and accessible.' },
                  { q: 'How many sessions will I need?', a: 'The number of sessions varies depending on your goals and the issue being addressed. Some concerns like smoking cessation may only require 1–3 sessions, while ongoing issues like anxiety management might benefit from 6–10 sessions or more. Your hypnotherapist will discuss a treatment plan during your initial consultation.' },
                  { q: 'What should I look for when choosing a hypnotherapist near me?', a: "Look for proper certifications, relevant experience in your area of concern, and someone you feel comfortable with. Check their specialties, years in practice, and approach to treatment. Most importantly, trust your instincts — the therapeutic relationship is crucial for successful outcomes." },
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
                  { href: '/hypnotherapy-for-anxiety', title: 'Hypnotherapy for Anxiety', desc: 'Discover how hypnotherapy helps reduce anxiety and stress' },
                  { href: '/does-hypnotherapy-work', title: 'Does Hypnotherapy Work?', desc: 'Scientific evidence and research on hypnotherapy effectiveness' },
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
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>Search our free directory of certified hypnotherapy professionals. Find the right hypnotherapist near you today and take the first step toward positive change.</p>
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
