import Link from 'next/link';
import { getCitiesByInventory } from '@/lib/data/practitioners';

/**
 * Reciprocal link back down from a specialty pillar page to its top cities by
 * practitioner count. Location pages already link up to the 8 pillar pages;
 * this closes the loop so authority flows both ways instead of only up.
 */
export function TopCitiesLinks({ specialtyLabel }: { specialtyLabel: string }) {
  const topCities = getCitiesByInventory().slice(0, 8);
  if (topCities.length === 0) return null;

  return (
    <section style={{ padding: '0 24px 64px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>
          Find {specialtyLabel} Hypnotherapists Near You
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
          {topCities.map((city) => (
            <Link
              key={city.slug}
              href={`/location/${city.slug}`}
              className="glass hf-glass-hover"
              style={{ padding: '8px 16px', borderRadius: 9999, color: 'var(--hf-fg-dim)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}
            >
              {city.name}, {city.state}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
