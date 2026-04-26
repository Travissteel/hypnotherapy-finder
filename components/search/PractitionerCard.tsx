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

        {practitioner.acceptingNewClients && (
          <span style={{
            fontSize: 10,
            color: 'var(--hf-accent)',
            background: 'oklch(0.72 0.12 185 / 0.1)',
            padding: '3px 8px',
            borderRadius: 9999,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            Accepting ✓
          </span>
        )}
      </div>

      {/* Stars */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
        <div style={{ display: 'flex', gap: 2, color: 'oklch(0.8 0.12 75)' }}>
          {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} size={13} fill={i <= 5 ? 'currentColor' : 'none'} />
          ))}
        </div>
        <span style={{ fontSize: 13, color: 'var(--hf-fg)', fontWeight: 600 }}>4.9</span>
        <span style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>/ 5.0</span>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--hf-fg-dim)' }}>
          <Video size={12} style={{ color: 'var(--hf-accent)' }} />
          {practitioner.session_types?.includes('online') || practitioner.sessionType === 'virtual' || practitioner.sessionType === 'both' ? 'Online' : 'In-Person'}
        </div>
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--hf-fg-dim)' }}>
          <Award size={12} style={{ color: 'var(--hf-accent)' }} />
          {practitioner.yearsExperience ?? 10}+ yrs exp
        </div>
        {practitioner.sessionPrice && (
          <>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
            <div style={{ fontSize: 11, color: 'var(--hf-fg-dim)' }}>
              ${practitioner.sessionPrice}/hr
            </div>
          </>
        )}
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
