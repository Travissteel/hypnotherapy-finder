import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Search, CheckCircle, ArrowRight, Shield, Target, MapPin, Filter, Users, Zap } from 'lucide-react';

export const metadata = {
  title: 'Hypnotherapy Finder vs Psychology Today',
  description: 'Comparing Hypnotherapy Finder and Psychology Today for finding a hypnotherapist. See why a specialist directory can make search, filtering, and matching easier.',
  alternates: { canonical: 'https://hypnotherapy-finder.com/compare/hypnotherapy-finder-vs-psychology-today' },
  openGraph: {
    title: 'Hypnotherapy Finder vs Psychology Today | Best Way to Find a Hypnotherapist',
    description: 'Comparing Hypnotherapy Finder and Psychology Today for finding a hypnotherapist. See why a specialist directory can make search, filtering, and matching easier.',
    url: 'https://hypnotherapy-finder.com/compare/hypnotherapy-finder-vs-psychology-today',
    type: 'article',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Hypnotherapy Finder vs Psychology Today' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hypnotherapy Finder vs Psychology Today',
    description: 'Comparing Hypnotherapy Finder and Psychology Today for finding a hypnotherapist. See why a specialist directory can make search easier.',
  },
};

const comparisonRows = [
  {
    feature: 'Directory focus',
    hf: 'Hypnotherapy-only specialist directory — every listing is a hypnotherapy practitioner.',
    pt: 'Broad mental-health directory — hypnotherapy is one of many therapy categories.',
  },
  {
    feature: 'Best for',
    hf: 'People who already know they want hypnotherapy and want to compare practitioners quickly.',
    pt: 'People still exploring therapy options and open to multiple modalities.',
  },
  {
    feature: 'Specialty relevance',
    hf: 'Built around hypnotherapy-specific issues: anxiety, weight loss, quit smoking, sleep, and more.',
    pt: 'Includes hypnotherapy filters within a much wider mental-health taxonomy.',
  },
  {
    feature: 'Search intent match',
    hf: 'Purpose-built for hypnotherapy-specific searches — no filtering out unrelated results.',
    pt: 'Better suited to broad therapist discovery across multiple disciplines.',
  },
  {
    feature: 'Search filters',
    hf: 'Filter by specialty (14 options), session type (in-person or online), insurance acceptance, price range, and city — all in a persistent sidebar panel.',
    pt: 'Filter by therapy type and location. Insurance and session-type filters are available but not hypnotherapy-specific.',
  },
  {
    feature: 'Specialty options',
    hf: 'Anxiety & Stress, Weight Loss, Smoking Cessation, PTSD & Trauma, Phobias & Fears, Sleep Issues, Pain Management, Addiction Recovery, Confidence, Performance Anxiety, Public Speaking, Self-Esteem, Past Life Regression, and General Hypnotherapy.',
    pt: 'Hypnotherapy is one filter among a large set of general therapy modalities.',
  },
  {
    feature: 'Location coverage',
    hf: '31 US cities with dedicated hypnotherapy search pages and local practitioner profiles.',
    pt: 'Nationwide ZIP code-based search across all therapy types.',
  },
  {
    feature: 'Practitioner count',
    hf: '1,150+ vetted hypnotherapy practitioners in the directory.',
    pt: 'Thousands of general therapists — a smaller subset list hypnotherapy.',
  },
  {
    feature: 'Verification signals',
    hf: 'Practitioners go through a certification and credential review before being featured.',
    pt: 'General therapist directory model with self-reported credentials.',
  },
];

const faqs = [
  {
    q: 'Is Psychology Today good for finding a hypnotherapist?',
    a: "Psychology Today is a well-known therapist directory and it does include hypnotherapy practitioners. If you're still exploring therapy options broadly, it can be a useful starting point. However, because hypnotherapy is one of many categories on the platform, searches can return results across multiple therapy types, which means more filtering before you reach hypnotherapy-specific practitioners.",
  },
  {
    q: 'Why use a specialist hypnotherapy directory instead?',
    a: "A specialist directory like Hypnotherapy Finder is built specifically around hypnotherapy. Every profile is a hypnotherapy practitioner, so you're not filtering through unrelated results. It also allows issue-based browsing — searching by anxiety, weight loss, quit smoking, or other concerns — which makes it easier to find someone who specialises in exactly what you're dealing with.",
  },
  {
    q: 'What should I look for in a hypnotherapist profile?',
    a: 'Look for clear credentials and certifications, the specific issues they work with, their session format (in-person or online), location, and any client-facing information about their approach. A good profile should give you enough detail to feel confident reaching out — without requiring a phone call just to find out if they work with your concern.',
  },
  {
    q: 'How do I compare hypnotherapists online?',
    a: "Start by narrowing by issue — for example, anxiety or weight loss — and location. From there, compare credentials, years of experience, session type, and the clarity of their profile. A practitioner who can describe what they work with and how is usually easier to evaluate than one with a generic listing. Hypnotherapy Finder's search lets you filter by specialty and city to make this comparison faster.",
  },
  {
    q: 'Is Hypnotherapy Finder free to use?',
    a: "Yes. Searching for and browsing hypnotherapy practitioners on Hypnotherapy Finder is completely free. No account is required to search, view profiles, or contact a practitioner.",
  },
];

export default function HypnotherapyFinderVsPsychologyTodayPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hypnotherapy-finder.com' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://hypnotherapy-finder.com/compare' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Hypnotherapy Finder vs Psychology Today',
        item: 'https://hypnotherapy-finder.com/compare/hypnotherapy-finder-vs-psychology-today',
      },
    ],
  };

  return (
    <>
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} strategy="beforeInteractive" />
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} strategy="beforeInteractive" />

      <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: 80 }}>

          {/* Breadcrumb */}
          <div style={{ padding: '14px 24px', background: 'var(--hf-bg-mid)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--hf-fg-dim)' }}>
              <Link href="/" style={{ color: 'var(--hf-fg-dim)', textDecoration: 'none' }}>Home</Link>
              <ArrowRight style={{ width: 12, height: 12 }} />
              <span>Compare</span>
              <ArrowRight style={{ width: 12, height: 12 }} />
              <span style={{ color: 'var(--hf-fg)' }}>Hypnotherapy Finder vs Psychology Today</span>
            </div>
          </div>

          {/* Hero */}
          <section style={{ background: 'var(--hf-bg-mid)', padding: '72px 24px 64px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>
                Directory Comparison
              </span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Hypnotherapy Finder vs Psychology Today
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.65, marginBottom: 12, maxWidth: 640, margin: '0 auto 12px' }}>
                Both directories can help you find a hypnotherapist — but they serve different search intent.
              </p>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.65, marginBottom: 40, maxWidth: 620, margin: '0 auto 40px' }}>
                Psychology Today is a large general therapist directory. Hypnotherapy Finder is built specifically for people who already know they want hypnotherapy and want a faster way to compare relevant practitioners.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link
                  href="/search"
                  className="btn-gradient hf-btn-accent"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
                >
                  <Search style={{ width: 16, height: 16 }} /> Find a Hypnotherapist
                </Link>
                <a
                  href="#compare"
                  className="glass hf-glass-hover"
                  style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}
                >
                  Compare the Differences
                </a>
              </div>
            </div>
          </section>

          {/* Quick Answer Block */}
          <section id="overview" style={{ padding: '48px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <div
                className="glass-card"
                style={{ padding: '28px 32px', borderLeft: '3px solid var(--hf-accent)', position: 'relative' }}
              >
                <span style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 12 }}>
                  Quick Answer
                </span>
                <p style={{ fontSize: 16, color: 'var(--hf-fg)', lineHeight: 1.7, margin: 0 }}>
                  If you are looking specifically for a hypnotherapist, Hypnotherapy Finder is usually the better fit because it is focused on hypnotherapy, issue-based matching, and specialist practitioner discovery. Psychology Today is more useful for people who are exploring therapy options more broadly.
                </p>
              </div>
            </div>
          </section>

          {/* In-page Nav */}
          <div style={{ padding: '0 24px 32px', background: 'var(--hf-bg)', position: 'sticky', top: 80, zIndex: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', overflowX: 'auto' }}>
              <div style={{ display: 'flex', gap: 8, paddingBottom: 2, minWidth: 'max-content' }}>
                {[
                  { href: '#overview', label: 'Overview' },
                  { href: '#compare', label: 'Compare' },
                  { href: '#best-for', label: 'Best For' },
                  { href: '#why-specialist', label: 'Why Specialist' },
                  { href: '#proof', label: 'What We Offer' },
                  { href: '#faq', label: 'FAQs' },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 500,
                      color: 'var(--hf-fg-dim)',
                      textDecoration: 'none',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.15s, background 0.15s',
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison intro */}
          <section style={{ padding: '64px 24px 40px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 20 }}>
                Which is better for finding a hypnotherapist?
              </h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16 }}>
                Psychology Today is one of the best-known therapist directories online, but it is designed for broad therapist discovery. Hypnotherapy Finder is designed specifically for people who want to find, compare, and contact hypnotherapists.
              </p>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16 }}>
                When someone is already looking for hypnotherapy, a specialist directory can make the process easier by reducing irrelevant results and making issue-based matching more obvious.
              </p>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75 }}>
                That does not make Psychology Today the wrong choice. It simply means the better directory depends on whether you are looking for a general therapist or a hypnotherapy-specific practitioner.
              </p>
            </div>
          </section>

          {/* Comparison Table */}
          <section id="compare" style={{ padding: '16px 24px 72px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 960, margin: '0 auto' }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8, textAlign: 'center' }}>
                Compare Hypnotherapy Finder and Psychology Today
              </h2>
              <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--hf-fg-dim)', marginBottom: 36 }}>
                A feature-by-feature look at how each directory approaches hypnotherapy search.
              </p>

              {/* Desktop table */}
              <div style={{ overflowX: 'auto', borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--hf-fg-dim)', background: 'oklch(0.11 0.01 260)', borderBottom: '1px solid rgba(255,255,255,0.08)', width: '22%' }}>
                        Feature
                      </th>
                      <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: 'var(--hf-accent)', background: 'oklch(0.72 0.12 185 / 0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', borderLeft: '1px solid rgba(255,255,255,0.06)', width: '39%' }}>
                        Hypnotherapy Finder
                      </th>
                      <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: 'var(--hf-fg)', background: 'oklch(0.11 0.01 260)', borderBottom: '1px solid rgba(255,255,255,0.08)', borderLeft: '1px solid rgba(255,255,255,0.06)', width: '39%' }}>
                        Psychology Today
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <tr key={row.feature} style={{ background: i % 2 === 0 ? 'var(--hf-bg)' : 'var(--hf-bg-mid)' }}>
                        <td style={{ padding: '16px 20px', fontSize: 12, fontWeight: 600, color: 'var(--hf-fg-dim)', borderBottom: '1px solid rgba(255,255,255,0.05)', textTransform: 'uppercase', letterSpacing: '0.06em', verticalAlign: 'top' }}>
                          {row.feature}
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: 14, color: 'var(--hf-fg)', lineHeight: 1.6, borderBottom: '1px solid rgba(255,255,255,0.05)', borderLeft: '1px solid rgba(255,255,255,0.05)', background: 'oklch(0.72 0.12 185 / 0.04)', verticalAlign: 'top' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                            <CheckCircle style={{ width: 15, height: 15, color: 'var(--hf-accent)', flexShrink: 0, marginTop: 2 }} />
                            <span>{row.hf}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6, borderBottom: '1px solid rgba(255,255,255,0.05)', borderLeft: '1px solid rgba(255,255,255,0.05)', verticalAlign: 'top' }}>
                          {row.pt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Best For Split */}
          <section id="best-for" style={{ padding: '72px 24px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 960, margin: '0 auto' }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 10 }}>
                Who each directory is best for
              </h2>
              <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--hf-fg-dim)', marginBottom: 48, maxWidth: 520, margin: '0 auto 48px' }}>
                The right choice depends on where you are in your decision-making process.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                {/* HF Card */}
                <div className="glass-card" style={{ padding: '32px 28px', borderTop: '3px solid var(--hf-accent)' }}>
                  <span style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 10 }}>
                    Best for Hypnotherapy Finder
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>
                    You already want hypnotherapy
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      'You specifically want hypnotherapy, not just any therapist.',
                      'You want to filter by specialty (14 options), session type, insurance, or price range.',
                      'You want to search by issue — anxiety, weight loss, quit smoking, phobias, sleep, or confidence.',
                      'You want to compare practitioners in a specific US city.',
                      'You prefer a specialist directory where every listing is relevant.',
                    ].map((point) => (
                      <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <CheckCircle style={{ width: 15, height: 15, color: 'var(--hf-accent)', flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.55 }}>{point}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 28 }}>
                    <Link
                      href="/search"
                      className="btn-gradient hf-btn-accent"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 9, color: '#fff', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}
                    >
                      <Search style={{ width: 14, height: 14 }} /> Find a Hypnotherapist
                    </Link>
                  </div>
                </div>

                {/* PT Card */}
                <div className="glass-card" style={{ padding: '32px 28px', borderTop: '3px solid rgba(255,255,255,0.15)' }}>
                  <span style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--hf-fg-dim)', marginBottom: 10 }}>
                    Best for Psychology Today
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>
                    You're still exploring therapy options
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      'You are open to multiple therapy types and have not yet settled on hypnotherapy.',
                      'You want to compare hypnotherapy alongside other modalities in one place.',
                      'You are starting a general therapist search rather than a hypnotherapy-specific one.',
                      'You want access to a very large pool of mental health professionals.',
                    ].map((point) => (
                      <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <div style={{ width: 15, height: 15, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.55 }}>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Specialist Directories */}
          <section id="why-specialist" style={{ padding: '72px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 10 }}>
                Why a specialist hypnotherapy directory can be easier to use
              </h2>
              <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--hf-fg-dim)', marginBottom: 48, maxWidth: 540, margin: '0 auto 48px' }}>
                The difference between a general marketplace and a specialist directory comes down to relevance and signal-to-noise.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                {[
                  {
                    icon: Filter,
                    title: 'Filters built for hypnotherapy',
                    body: 'Hypnotherapy Finder has 14 specialty filters (anxiety, weight loss, quit smoking, phobias, sleep, PTSD, and more), session type (in-person or online), insurance acceptance, and price range — all in a persistent sidebar. Every filter is calibrated to hypnotherapy, not general therapy.',
                  },
                  {
                    icon: Target,
                    title: 'Better issue-to-practitioner matching',
                    body: "Specialist directories can build search and filtering around one service category. That means browsing by 'anxiety' or 'weight loss' returns practitioners whose primary work is hypnotherapy for that issue.",
                  },
                  {
                    icon: Zap,
                    title: 'A faster path from search to contact',
                    body: "When results are relevant from the start, you spend less time filtering and more time evaluating the practitioners who actually fit. It's a shorter journey from search to shortlist to booking.",
                  },
                  {
                    icon: Shield,
                    title: 'Credential context that makes sense',
                    body: 'In a specialist directory, verification signals are calibrated to the specific discipline — hypnotherapy certifications and training credentials — rather than a generic professional listing.',
                  },
                  {
                    icon: Users,
                    title: 'More useful practitioner profiles',
                    body: "Profiles in a specialist directory can be structured around the things that matter most for hypnotherapy: specialties, session format, issues treated, and approach — not a generic therapist bio template.",
                  },
                  {
                    icon: MapPin,
                    title: 'Location search built for this modality',
                    body: 'With dedicated city pages across 31 US cities, location-based search surfaces hypnotherapists near you without needing to filter from a general pool.',
                  },
                ].map((item) => (
                  <div key={item.title} className="glass-card" style={{ padding: '28px 24px' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'oklch(0.72 0.12 185 / 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                      <item.icon style={{ width: 20, height: 20, color: 'var(--hf-accent)' }} />
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 10 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Proof / What HF Offers */}
          <section id="proof" style={{ padding: '72px 24px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 10 }}>
                What to look for when comparing hypnotherapists
              </h2>
              <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--hf-fg-dim)', marginBottom: 16, maxWidth: 560, margin: '0 auto 16px' }}>
                Whether you use Hypnotherapy Finder or another directory, here is what a useful practitioner profile should give you.
              </p>
              <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--hf-accent)', marginBottom: 48 }}>
                Hypnotherapy Finder includes all of the below for 1,150+ practitioners.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {[
                  { title: 'Clear hypnotherapy credentials', desc: 'Training certifications, associations, and years of practice — visible without needing to call.' },
                  { title: 'Searchable by specialty', desc: 'Filter across 14 hypnotherapy specialties — anxiety, weight loss, quit smoking, PTSD, phobias, sleep, performance, and more.' },
                  { title: 'Session type and insurance filters', desc: 'Narrow by in-person or online sessions, insurance acceptance, and price range before shortlisting.' },
                  { title: 'Issues and specialties on the profile', desc: "Specific areas listed clearly — not just 'hypnotherapy' as a category." },
                  { title: 'Session format', desc: 'Whether they offer in-person sessions, online hypnotherapy, or both.' },
                  { title: 'Location information', desc: 'City, state, and whether they work with clients outside their area via remote sessions.' },
                  { title: 'Direct contact pathway', desc: 'A clear way to reach out — without unnecessary barriers or account requirements.' },
                  { title: 'Enough detail to compare', desc: "Profile depth that lets you make a shortlist of two or three practitioners before making contact — not just a name and phone number." },
                ].map((item) => (
                  <div key={item.title} className="glass-card" style={{ padding: '22px 20px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <CheckCircle style={{ width: 18, height: 18, color: 'var(--hf-accent)', flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 6 }}>{item.title}</h3>
                      <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats band */}
          <section style={{ padding: '48px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 840, margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
                {[
                  { stat: '1,150+', label: 'Hypnotherapy practitioners' },
                  { stat: '31', label: 'US cities covered' },
                  { stat: '14', label: 'Specialty filter options' },
                  { stat: 'Free', label: 'To search and browse' },
                ].map((item) => (
                  <div key={item.label} className="glass-card" style={{ padding: '24px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-accent)', marginBottom: 6 }}>{item.stat}</div>
                    <div style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.4 }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mid CTA */}
          <section style={{ padding: '56px 24px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 12 }}>
                Ready to search for a hypnotherapist?
              </h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 28, lineHeight: 1.65 }}>
                Browse verified hypnotherapy practitioners. Search by issue, location, or specialty — no account required.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link
                  href="/search"
                  className="btn-gradient hf-btn-accent"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
                >
                  <Search style={{ width: 16, height: 16 }} /> Find a Hypnotherapist
                </Link>
                <Link
                  href="/hypnotherapy-near-me"
                  className="glass hf-glass-hover"
                  style={{ padding: '14px 22px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}
                >
                  Browse by Location
                </Link>
              </div>
            </div>
          </section>

          {/* Internal Links — specialties */}
          <section style={{ padding: '56px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 840, margin: '0 auto' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 24 }}>
                Search hypnotherapy by issue
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                {[
                  { href: '/hypnotherapy-for-anxiety', label: 'Anxiety Hypnotherapy', desc: 'Manage anxiety, panic attacks, and stress' },
                  { href: '/weight-loss-hypnotherapy', label: 'Weight Loss Hypnotherapy', desc: 'Address emotional eating and weight management' },
                  { href: '/quit-smoking-hypnotherapy', label: 'Quit Smoking Hypnotherapy', desc: 'Break nicotine habits for good' },
                  { href: '/search', label: 'Browse All Specialties', desc: 'Search across all hypnotherapy specialties' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="glass-card hf-card-hover"
                    style={{ display: 'block', padding: '18px 16px', textDecoration: 'none' }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-accent)', display: 'block', marginBottom: 4 }}>{link.label}</span>
                    <span style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.5 }}>{link.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" style={{ padding: '72px 24px', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8, textAlign: 'center' }}>
                Frequently asked questions
              </h2>
              <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--hf-fg-dim)', marginBottom: 40 }}>
                Common questions about finding a hypnotherapist online.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {faqs.map((faq) => (
                  <div key={faq.q} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 10 }}>{faq.q}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, oklch(0.25 0.05 185), oklch(0.18 0.03 240))', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 14 }}>
                Find a hypnotherapist today
              </h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.65 }}>
                Browse 1,150+ verified hypnotherapy practitioners across 31 US cities. Search by issue, location, or specialty — free, no account required.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link
                  href="/search"
                  className="btn-gradient hf-btn-accent"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 30px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}
                >
                  <Search style={{ width: 17, height: 17 }} /> Find a Hypnotherapist
                </Link>
                <Link
                  href="/hypnotherapy-for-anxiety"
                  className="glass hf-glass-hover"
                  style={{ padding: '15px 24px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}
                >
                  Anxiety Specialists
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
