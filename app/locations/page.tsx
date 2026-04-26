import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAllCities } from '@/lib/data/practitioners';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export const metadata = {
  title: 'Hypnotherapy Locations | Find Practitioners in Your City',
  description: 'Browse hypnotherapists by location across the United States. Find certified practitioners in over 50 cities nationwide.',
  alternates: { canonical: 'https://hypnotherapy-finder.com/locations' },
};

export default function LocationsPage() {
  const cities = getAllCities();

  const citiesByState = cities.reduce((acc, city) => {
    if (!acc[city.state]) acc[city.state] = [];
    acc[city.state].push(city);
    return acc;
  }, {} as Record<string, typeof cities>);

  const states = Object.keys(citiesByState).sort();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ background: 'var(--hf-bg-mid)', padding: '64px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Directory</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(30px, 5vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 16 }}>
              Browse by Location
            </h1>
            <p style={{ fontSize: 18, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>
              Find certified hypnotherapists in {cities.length} cities across the United States
            </p>
          </div>
        </section>

        {/* Cities by State */}
        <section style={{ padding: '48px 24px 80px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>
            {states.map((state) => (
              <div key={state}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ width: 3, height: 18, background: 'var(--hf-accent)', borderRadius: 2, flexShrink: 0 }} />
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)' }}>{state}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                  {citiesByState[state].map((city) => (
                    <Link
                      key={city.slug}
                      href={`/location/${city.slug}`}
                      className="glass-card hf-card-hover"
                      style={{ display: 'block', padding: '16px 20px', textDecoration: 'none' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <MapPin style={{ width: 16, height: 16, color: 'var(--hf-accent)', flexShrink: 0, marginTop: 2 }} />
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 2 }}>{city.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>
                            {city.practitionerCount} practitioner{city.practitionerCount !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
