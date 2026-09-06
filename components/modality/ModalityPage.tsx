import Link from 'next/link';
import Script from 'next/script';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PractitionerCard } from '@/components/search/PractitionerCard';
import { MapPin, Search, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import {
  type Modality,
  getModalities,
  getModalityPractitioners,
} from '@/lib/data/modalities';

const BASE = 'https://hypnotherapy-finder.com';

/** Shared metadata builder so each modality route stays a thin config wrapper. */
export function buildModalityMetadata(m: Modality): Metadata {
  const url = `${BASE}/${m.slug}`;
  return {
    title: { absolute: m.metaTitle },
    description: m.metaDescription,
    keywords: m.keywords,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: m.metaTitle,
      description: m.metaDescription,
      siteName: 'Hypnotherapy Finder',
      locale: 'en_US',
      type: 'website',
      images: [{ url: '/logo.png', width: 1200, height: 630, alt: m.title }],
    },
  };
}

export function ModalityPage({ modality }: { modality: Modality }) {
  const practitioners = getModalityPractitioners(modality);
  const others = getModalities().filter(x => x.slug !== modality.slug);

  // Group by city so "qhht los angeles" / "qhht in wisconsin" style queries have
  // matching on-page structure rather than one undifferentiated list.
  const byCity = new Map<string, typeof practitioners>();
  for (const p of practitioners) {
    const key = `${p.city}, ${p.state}`;
    if (!byCity.has(key)) byCity.set(key, []);
    byCity.get(key)!.push(p);
  }
  const cities = [...byCity.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: modality.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: modality.title, item: `${BASE}/${modality.slug}` },
    ],
  };

  const crumb = {
    fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase' as const, color: 'var(--hf-fg-dim)', textDecoration: 'none',
  };
  const h2 = { fontSize: 24, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 12 } as const;
  const body = { fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75 } as const;

  return (
    <>
      <Script id="schema-modality-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Script id="schema-modality-crumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1, paddingTop: 100 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 26, flexWrap: 'wrap' }}>
              <Link href="/" style={crumb}>Home</Link>
              <ChevronRight style={{ width: 10, height: 10, color: 'var(--hf-fg-dim)' }} />
              <span style={{ ...crumb, color: 'var(--hf-accent)' }}>{modality.title}</span>
            </div>
          </div>

          {/* Hero */}
          <section style={{ padding: '0 24px 40px' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <h1 style={{ fontSize: 40, fontWeight: 800, color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 18 }}>
                {modality.title}
              </h1>
              <p style={{ ...body, fontSize: 17, marginBottom: 22 }}>{modality.intro}</p>
              <p style={{ ...body, fontSize: 14, marginBottom: 24 }}>
                {practitioners.length} {practitioners.length === 1 ? 'practice' : 'practices'} across{' '}
                {cities.length} {cities.length === 1 ? 'city' : 'cities'}. Hypnotherapy Finder is a
                directory — we list profiles and contact details, and do not verify credentials,
                pricing or availability. Confirm those directly with the practitioner.
              </p>
              <Link
                href="/search"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px',
                  borderRadius: 12, background: 'var(--hf-accent)', color: '#04201f',
                  fontWeight: 700, fontSize: 14, textDecoration: 'none',
                }}
              >
                <Search size={15} /> Search by location
              </Link>
            </div>
          </section>

          {/* About the modality */}
          <section style={{ padding: '48px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={h2}>About {modality.shortLabel.toLowerCase()}</h2>
              {modality.about.map((para, i) => (
                <p key={i} style={{ ...body, marginBottom: 14 }}>{para}</p>
              ))}
            </div>
          </section>

          {/* Practitioners grouped by city */}
          <section style={{ padding: '48px 24px' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <h2 style={{ ...h2, marginBottom: 8 }}>Practices listing {modality.shortLabel.toLowerCase()}</h2>
              <p style={{ ...body, fontSize: 14, marginBottom: 32, maxWidth: 720 }}>
                These practices name this work in their own business listing. That is why they appear
                here — it is not a credential we have checked.
              </p>

              {cities.map(([city, list]) => (
                <div key={city} style={{ marginBottom: 40 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MapPin size={15} style={{ color: 'var(--hf-accent)' }} />
                    {city}
                    <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--hf-fg-dim)' }}>
                      ({list.length})
                    </span>
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                    {list.map(p => (
                      <PractitionerCard key={p.id} practitioner={p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section style={{ padding: '8px 24px 56px' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ ...h2, marginBottom: 20 }}>Frequently asked questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {modality.faq.map(f => (
                  <div key={f.q} className="glass-card" style={{ padding: 22 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>{f.q}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Other modalities */}
          <section style={{ padding: '0 24px 72px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', paddingTop: 44 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 22 }}>
                Other approaches
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                {others.map(o => (
                  <Link
                    key={o.slug}
                    href={`/${o.slug}`}
                    className="glass-card hf-card-hover"
                    style={{ padding: 20, textDecoration: 'none', display: 'block', textAlign: 'center' }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--hf-accent)', marginBottom: 5 }}>
                      {o.shortLabel}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>
                      {o.practitionerSlugs.length} practices
                    </div>
                  </Link>
                ))}
                <Link
                  href="/locations"
                  className="glass-card hf-card-hover"
                  style={{ padding: 20, textDecoration: 'none', display: 'block', textAlign: 'center' }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--hf-accent)', marginBottom: 5 }}>
                    Browse by city
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>All locations</div>
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
