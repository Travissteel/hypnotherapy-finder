'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, CheckCircle, Star, Video, Award, ArrowRight } from 'lucide-react';
import { Practitioner } from '@/lib/types/practitioner';

interface PractitionerCardProps {
  practitioner: Practitioner;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const HUE_MAP = [185, 285, 30, 220, 155, 45, 10, 260, 330];

export const PractitionerCard: React.FC<PractitionerCardProps> = ({ practitioner }) => {
  const specialties = Array.isArray(practitioner.specialties) ? practitioner.specialties : [];
  const initials = getInitials(practitioner.name);
  const hue = HUE_MAP[practitioner.name.charCodeAt(0) % HUE_MAP.length] ?? 185;

  return (
    <div
      className="glass-card"
      style={{
        padding: '26px',
        cursor: 'pointer',
        transition: 'transform .2s, box-shadow .2s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.35)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.065)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      }}
    >
      {/* Avatar + name row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
        {practitioner.profile_photo_url ? (
          <img
            src={practitioner.profile_photo_url}
            alt={practitioner.name}
            style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />
        ) : (
          <div style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            flexShrink: 0,
            background: `radial-gradient(circle at 35% 35%, oklch(0.72 0.12 ${hue}), oklch(0.45 0.1 ${hue + 60}))`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 17,
            fontWeight: 600,
            color: '#fff',
          }}>
            {initials}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--hf-fg)', lineHeight: 1.2 }}>
              {practitioner.name}
            </span>
            {practitioner.verified && (
              <span style={{
                background: 'oklch(0.72 0.12 185 / 0.15)',
                borderRadius: 9999,
                padding: '2px 8px',
                fontSize: 10,
                color: 'var(--hf-accent)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                whiteSpace: 'nowrap',
              }}>
                <CheckCircle size={10} /> Verified
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: 'var(--hf-fg-dim)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <MapPin size={12} /> {practitioner.city}, {practitioner.state}
          </div>
        </div>

        {/* "Accepting ✓" removed: `acceptingNewClients` is set on 1152/1152 scraped
            records, so it was a generated flag, not observed availability. Whether a
            practice is taking new clients changes week to week and can only come from
            the practitioner. Restore this once claimed listings supply it. */}
      </div>

      {/* Ratings render only from reviews the practitioner has actually received.
          This used to be a hardcoded five-star "4.9 / 5.0" on every card, shown
          against the names of real businesses. `rating` is also unusable as a
          number in the scraped data — it holds free text like "Top Rated" and
          "Awarded Best Hypnotherapist LA 2024" — so it is type-checked here
          rather than trusted. Matches the gate on the practitioner detail page. */}
      {typeof practitioner.rating === 'number' && (practitioner.review_count ?? 0) > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
          <Star size={13} style={{ color: 'oklch(0.8 0.12 75)' }} fill="currentColor" />
          <span style={{ fontSize: 13, color: 'var(--hf-fg)', fontWeight: 600 }}>
            {practitioner.rating.toFixed(1)}
          </span>
          <span style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>
            ({practitioner.review_count} {practitioner.review_count === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      )}

      {/* Stats row. Every value here must be practitioner-supplied (snake_case).
          The camelCase equivalents on scraped records are enrichment output:
          `sessionType` is set on 1152/1152, and `sessionPrice` on 1098/1152 with
          214 distinct values — hypnotherapists do not publish hourly rates at a
          93% rate, so that figure was invented per business. */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {practitioner.session_types?.length ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--hf-fg-dim)' }}>
            <Video size={12} style={{ color: 'var(--hf-accent)' }} />
            {practitioner.session_types.includes('online') ? 'Online' : 'In-Person'}
          </div>
        ) : null}
        {/* Experience comes only from `years_experience`, which the practitioner
            supplies when claiming the listing. The previous `?? 10` invented a
            decade of experience for every unclaimed profile. */}
        {practitioner.years_experience ? (
          <>
            {practitioner.session_types?.length ? <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span> : null}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--hf-fg-dim)' }}>
              <Award size={12} style={{ color: 'var(--hf-accent)' }} />
              {practitioner.years_experience}+ yrs exp
            </div>
          </>
        ) : null}
      </div>

      {/* Specialties */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 18 }}>
        {specialties.slice(0, 3).map(s => (
          <span
            key={s}
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.5)',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 9999,
              padding: '3px 10px',
              fontWeight: 400,
            }}
          >
            {s}
          </span>
        ))}
        {specialties.length > 3 && (
          <span style={{
            fontSize: 11,
            color: 'var(--hf-accent)',
            background: 'oklch(0.72 0.12 185 / 0.1)',
            borderRadius: 9999,
            padding: '3px 10px',
          }}>
            +{specialties.length - 3} more
          </span>
        )}
      </div>

      {/* CTA */}
      <Link
        href={`/practitioner/${practitioner.slug}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          width: '100%',
          padding: '11px',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--hf-fg)',
          fontSize: 13,
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'background .2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
      >
        View Profile <ArrowRight size={15} />
      </Link>
    </div>
  );
};
