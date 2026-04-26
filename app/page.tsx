import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchBar } from '@/components/home/SearchBar';
import { PractitionerCard } from '@/components/search/PractitionerCard';
import { HeroVideo } from '@/app/components/HeroVideo';
import { getFeaturedPractitioners, getAllCities } from '@/lib/data/practitioners';
import Link from 'next/link';
import Script from 'next/script';
import { MapPin, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Find a Certified Hypnotherapist Near You',
  description: 'Connect with qualified hypnotherapy practitioners specializing in anxiety, weight loss, smoking cessation, and more. Search 1,150+ verified hypnotherapists nationwide.',
  keywords: 'hypnotherapy near me, hypnotherapist, hypnosis therapy, anxiety treatment, weight loss hypnotherapy, quit smoking',
  alternates: { canonical: 'https://hypnotherapy-finder.com' },
  openGraph: {
    title: 'Find a Certified Hypnotherapist Near You | Hypnotherapy Finder',
    description: 'Connect with qualified hypnotherapy practitioners specializing in anxiety, weight loss, smoking cessation, and more. Search 1,150+ verified hypnotherapists nationwide.',
    url: 'https://hypnotherapy-finder.com',
    type: 'website',
    images: [{ url: '/therapy-session.png', width: 1200, height: 630, alt: 'Hypnotherapy Session' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find a Certified Hypnotherapist Near You',
    description: 'Connect with qualified hypnotherapy practitioners specializing in anxiety, weight loss, smoking cessation, and more.',
    images: ['/therapy-session.png'],
  },
};

const QUIZZES = [
  { title: 'OCD Test', desc: 'Check for obsessions, compulsions, and Pure O symptoms.', href: '/ocd-test', hue: 30 },
  { title: 'Social Anxiety Test', desc: 'Do you have social anxiety disorder? Find out in 2 minutes.', href: '/social-anxiety-test', hue: 285 },
  { title: 'PTSD Quiz', desc: 'Check for PTSD and Complex PTSD symptoms.', href: '/ptsd-quiz', hue: 185 },
  { title: 'See All 17 Free Quizzes', desc: 'Anger, insomnia, burnout, phobias, self-esteem, codependency and more.', href: '/free-quizzes', hue: 220 },
];

const HOW_IT_WORKS = [
  { n: '01', title: 'Search', desc: 'Enter your location and needs to browse certified hypnotherapists near you.' },
  { n: '02', title: 'Compare', desc: 'Review detailed profiles, verified credentials, and genuine client reviews.' },
  { n: '03', title: 'Connect', desc: 'Contact practitioners directly to schedule your first consultation.' },
];

const TRUST_PILLARS = [
  { title: 'Verified Credentials', desc: 'All practitioners are vetted with verified certifications from recognised hypnotherapy organisations.' },
  { title: 'Authentic Reviews', desc: 'Read genuine client experiences to find the perfect practitioner for your specific needs.' },
  { title: 'Expert Specialists', desc: 'From anxiety to weight loss, find practitioners specialised in your exact concerns.' },
];

export default function Home() {
  const featured = getFeaturedPractitioners();
  const cities = getAllCities().slice(0, 12);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hypnotherapy Finder',
    url: 'https://hypnotherapy-finder.com',
    logo: 'https://hypnotherapy-finder.com/logo.png',
    description: 'The leading directory for finding certified hypnotherapy practitioners.',
    sameAs: [
      'https://www.facebook.com/profile.php?id=61584471600142',
      'https://www.linkedin.com/company/hypnotherapy-finder',
      'https://www.instagram.com/hypnotherapyfinder',
      'https://x.com/Hypnofinder',
    ],
    contactPoint: { '@type': 'ContactPoint', contactType: 'Customer Service', url: 'https://hypnotherapy-finder.com/contact' },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Hypnotherapy Finder',
    url: 'https://hypnotherapy-finder.com',
    description: 'Find certified hypnotherapists near you.',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://hypnotherapy-finder.com/search?location={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <Script id="schema-org" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <Script id="schema-web" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--hf-bg)' }}>
        <Header />

        <main style={{ flex: 1 }}>

          {/* ── Hero ── */}
          <section style={{ position: 'relative', minHeight: '100vh', background: '#04040d', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <HeroVideo />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,4,13,0.5) 0%, rgba(4,4,13,0.2) 40%, rgba(4,4,13,0.65) 100%)', zIndex: 1 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 0%, rgba(4,4,13,0.5) 70%, rgba(4,4,13,0.82) 100%)', zIndex: 2 }} />

            <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', textAlign: 'center', transform: 'translateY(-6%)' }}>
              <h1
                className="font-serif-display fade-up delay-1"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#fff', marginBottom: 14, maxWidth: 700, textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}
              >
                Find Your Path to{' '}
                <em className="font-serif-italic" style={{ color: 'oklch(0.85 0.08 185)', fontStyle: 'italic' }}>Inner Calm</em>
              </h1>

              <p className="fade-up delay-2" style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', marginBottom: 40, maxWidth: 440, lineHeight: 1.65, fontWeight: 300 }}>
                Connect with certified, verified hypnotherapists. Start your journey towards a healthier, happier mind.
              </p>

              <div className="glass fade-up delay-3" style={{ borderRadius: 20, padding: 24, width: '100%', maxWidth: 580 }}>
                <SearchBar />
              </div>

              <div className="fade-up delay-4" style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
                {['1,150+ Certified', '31 Cities', '100% Verified', 'Online & In-Person'].map(t => (
                  <span key={t} className="glass" style={{ borderRadius: 9999, padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>{t}</span>
                ))}
              </div>

              <div className="fade-up delay-4" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18, justifyContent: 'center' }}>
                {[
                  ['Hypnotherapy Near Me', '/hypnotherapy-near-me'],
                  ['Anxiety Hypnotherapy', '/hypnotherapy-for-anxiety'],
                  ['Weight Loss', '/weight-loss-hypnotherapy'],
                  ['Quit Smoking', '/quit-smoking-hypnotherapy'],
                ].map(([label, href]) => (
                  <Link key={href} href={href} style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', textDecoration: 'underline', textUnderlineOffset: 3 }}>{label}</Link>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', paddingBottom: 32 }}>
              <div style={{ width: 1, height: 44, background: 'linear-gradient(to bottom, rgba(255,255,255,0.28), transparent)' }} />
            </div>
          </section>

          {/* ── How It Works ── */}
          <section style={{ padding: '100px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 14, fontWeight: 600 }}>How It Works</p>
                <h2 className="font-serif-display" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--hf-fg)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Your journey to <em className="font-serif-italic" style={{ fontStyle: 'italic' }}>wellness</em>, simplified
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                {HOW_IT_WORKS.map((step, i) => (
                  <div key={i} className="glass-card hf-glass-hover" style={{ padding: '36px 28px' }}>
                    <div style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--hf-accent)', fontWeight: 700, marginBottom: 20 }}>{step.n}</div>
                    <h3 className="font-serif-display" style={{ fontSize: '1.75rem', color: 'var(--hf-fg)', marginBottom: 12, letterSpacing: '-0.01em' }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, fontWeight: 300 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Featured Practitioners ── */}
          <section style={{ padding: '100px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 1040, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 12, fontWeight: 600 }}>Featured</p>
                  <h2 className="font-serif-display" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', color: 'var(--hf-fg)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    Top-rated <em className="font-serif-italic" style={{ fontStyle: 'italic' }}>practitioners</em>
                  </h2>
                </div>
                <Link
                  href="/search"
                  className="hf-accent-border-hover"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--hf-accent)', fontSize: 13, fontWeight: 500, textDecoration: 'none', padding: '10px 20px', border: '1px solid oklch(0.72 0.12 185 / 0.3)', borderRadius: 9999 }}
                >
                  View all <ArrowRight size={15} />
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {featured.map(practitioner => (
                  <PractitionerCard key={practitioner.id} practitioner={practitioner} />
                ))}
              </div>
            </div>
          </section>

          {/* ── Trust Pillars ── */}
          <section style={{ padding: '80px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 1040, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              {TRUST_PILLARS.map((p, i) => (
                <div key={i} style={{ padding: '32px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ width: 36, height: 2, background: 'var(--hf-accent)', marginBottom: 24, borderRadius: 2 }} />
                  <h3 style={{ fontSize: 16, fontWeight: 500, color: 'var(--hf-fg)', marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.7, fontWeight: 300 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Locations ── */}
          <section style={{ padding: '100px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 1040, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 56 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 14, fontWeight: 600 }}>Browse by Location</p>
                <h2 className="font-serif-display" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', color: 'var(--hf-fg)', letterSpacing: '-0.02em' }}>
                  Popular <em className="font-serif-italic" style={{ fontStyle: 'italic' }}>cities</em>
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
                {cities.map(city => (
                  <Link
                    key={city.slug}
                    href={`/location/${city.slug}`}
                    className="glass-card hf-card-hover"
                    style={{ padding: '20px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--hf-fg)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={13} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                      {city.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--hf-fg-dim)' }}>
                      {city.state} · {city.practitionerCount} practitioners
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 36 }}>
                <Link
                  href="/locations"
                  className="hf-accent-border-hover"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--hf-accent)', fontSize: 13, fontWeight: 500, textDecoration: 'none', padding: '10px 24px', border: '1px solid oklch(0.72 0.12 185 / 0.3)', borderRadius: 9999 }}
                >
                  View all locations <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>

          {/* ── Quizzes ── */}
          <section style={{ padding: '100px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 1040, margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 56 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 14, fontWeight: 600 }}>Free Tools</p>
                <h2 className="font-serif-display" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', color: 'var(--hf-fg)', letterSpacing: '-0.02em' }}>
                  Mental health <em className="font-serif-italic" style={{ fontStyle: 'italic' }}>self-assessments</em>
                </h2>
                <p style={{ marginTop: 14, fontSize: 15, color: 'var(--hf-fg-dim)', fontWeight: 300 }}>Anonymous quizzes to help you understand your wellbeing</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {QUIZZES.map((q, i) => (
                  <Link
                    key={i}
                    href={q.href}
                    className="glass-card hf-card-hover-3"
                    style={{ padding: '28px 22px', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
                  >
                    <div style={{ width: 28, height: 2, background: `oklch(0.72 0.12 ${q.hue})`, borderRadius: 2, marginBottom: 20 }} />
                    <h3 style={{ fontSize: 15, fontWeight: 500, color: 'var(--hf-fg)', marginBottom: 10 }}>{q.title}</h3>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.65, fontWeight: 300, flex: 1 }}>{q.desc}</p>
                    <div style={{ marginTop: 20, fontSize: 12, color: `oklch(0.72 0.12 ${q.hue})`, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                      Take free test <ArrowRight size={12} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section style={{ padding: '80px 24px 100px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <div className="glass-card" style={{ padding: 'clamp(40px, 6vw, 72px) clamp(28px, 6vw, 64px)', textAlign: 'center', position: 'relative', overflow: 'hidden', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'oklch(0.72 0.12 185 / 0.07)', filter: 'blur(60px)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h2 className="font-serif-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: 'var(--hf-fg)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 20 }}>
                    Ready to start your <em className="font-serif-italic" style={{ color: 'oklch(0.85 0.08 185)', fontStyle: 'italic' }}>journey?</em>
                  </h2>
                  <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', lineHeight: 1.7, fontWeight: 300, maxWidth: 480, margin: '0 auto 44px' }}>
                    Find qualified practitioners in your area and take the first step toward positive change.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <Link
                      href="/search"
                      className="hf-btn-accent"
                      style={{ padding: '14px 32px', borderRadius: 12, background: 'var(--hf-accent)', color: '#04040d', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                    >
                      Search Practitioners
                    </Link>
                    <Link
                      href="/practitioner-signup"
                      className="glass"
                      style={{ padding: '14px 32px', borderRadius: 12, color: 'var(--hf-fg)', fontSize: 14, fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                    >
                      For Practitioners
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
