import React from 'react';
import Link from 'next/link';
import { MapPin, Globe, Phone, ArrowRight, Languages } from 'lucide-react';
import { Practitioner } from '@/lib/types/practitioner';
import { marketsInSpanish } from '@/lib/data/spanish';

/**
 * Spanish-language practitioner card.
 *
 * Deliberately NOT a translation of PractitionerCard. That component renders a
 * hardcoded five-star "4.9 / 5.0" rating on every listing and falls back to
 * "10+ yrs exp" via `yearsExperience ?? 10` — both are invented figures printed
 * against the names of real businesses. This card shows only fields that came
 * from the source record, and omits anything missing rather than defaulting it.
 *
 * The "se anuncia en español" badge is a claim about the practice's own
 * business name, which is self-evident. It is never a claim that a given
 * practitioner speaks Spanish — we have not verified that and do not assert it.
 */

interface PractitionerCardEsProps {
  practitioner: Practitioner;
}

function getInitials(name: string) {
  return name.split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

const HUE_MAP = [185, 285, 30, 220, 155, 45, 10, 260, 330];

export const PractitionerCardEs: React.FC<PractitionerCardEsProps> = ({ practitioner }) => {
  const specialties = Array.isArray(practitioner.specialties) ? practitioner.specialties : [];
  const initials = getInitials(practitioner.name);
  const hue = HUE_MAP[practitioner.name.charCodeAt(0) % HUE_MAP.length] ?? 185;
  const esBadge = marketsInSpanish(practitioner.slug);
  // Only the practitioner-supplied `session_types` is trustworthy. The camelCase
  // `sessionType` on scraped records is set on 1152/1152 — generated, not observed.
  const sessionTypes = practitioner.session_types ?? [];

  return (
    <div className="glass-card" style={{ padding: 26, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
        <div
          aria-hidden="true"
          style={{
            width: 46, height: 46, borderRadius: 12, flexShrink: 0,
            background: `oklch(0.72 0.12 ${hue} / 0.15)`, color: `oklch(0.82 0.12 ${hue})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, fontWeight: 700,
          }}
        >
          {initials}
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 4, lineHeight: 1.3 }}>
            {practitioner.name}
          </h3>
          <div style={{ fontSize: 12, color: 'var(--hf-fg-dim)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <MapPin size={12} /> {practitioner.city}, {practitioner.state}
          </div>
        </div>
      </div>

      {esBadge && (
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5, alignSelf: 'flex-start',
            fontSize: 10, fontWeight: 600, color: 'var(--hf-accent)',
            background: 'oklch(0.72 0.12 185 / 0.1)', border: '1px solid oklch(0.72 0.12 185 / 0.25)',
            borderRadius: 9999, padding: '3px 9px', marginBottom: 14,
          }}
        >
          <Languages size={11} /> Se anuncia en español
        </div>
      )}

      {specialties.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {specialties.slice(0, 3).map(s => (
            <span
              key={s}
              style={{
                fontSize: 11, color: 'var(--hf-fg-dim)', background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '3px 8px',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Only facts present in the source record — nothing is defaulted or invented. */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 11, color: 'var(--hf-fg-dim)', marginBottom: 18 }}>
        {sessionTypes.length > 0 && (
          <span>{sessionTypes.includes('online') ? 'Sesiones en línea' : 'Sesiones presenciales'}</span>
        )}
        {practitioner.phone && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Phone size={11} style={{ color: 'var(--hf-accent)' }} /> Teléfono disponible
          </span>
        )}
        {practitioner.website && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Globe size={11} style={{ color: 'var(--hf-accent)' }} /> Sitio web
          </span>
        )}
      </div>

      <Link
        href={`/practitioner/${practitioner.slug}`}
        style={{
          marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, fontWeight: 600, color: 'var(--hf-accent)', textDecoration: 'none',
        }}
      >
        Ver perfil <ArrowRight size={15} />
      </Link>
    </div>
  );
};
