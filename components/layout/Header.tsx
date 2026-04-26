'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '20px 24px' }}>
      {/* Pill nav */}
      <nav
        className="glass"
        style={{
          borderRadius: 9999,
          padding: '14px 28px',
          maxWidth: 1020,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'var(--hf-fg)' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <Image src="/logo.png" alt="Hypnotherapy Finder" width={40} height={40} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span className="font-serif-display" style={{ fontSize: 19, letterSpacing: '-0.01em', color: 'var(--hf-fg)' }}>
            Hypnotherapy Finder
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 28 }}>
          {[
            ['Find a Therapist', '/search'],
            ['How it Works', '/how-it-works'],
            ['Resources', '/what-is-hypnotherapy'],
            ['Blog', '/blog'],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              style={{ color: 'rgba(255,255,255,0.62)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color .2s', letterSpacing: '0.01em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.62)')}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/practitioner-signup"
            className="glass"
            style={{
              borderRadius: 9999,
              padding: '9px 22px',
              color: 'var(--hf-accent)',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'background .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--hf-glass-bg)')}
          >
            For Practitioners
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--hf-fg)', cursor: 'pointer', padding: 4 }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="glass md:hidden"
          style={{
            maxWidth: 980,
            margin: '8px auto 0',
            borderRadius: 20,
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {[
            ['Find a Therapist', '/search'],
            ['How it Works', '/how-it-works'],
            ['Resources', '/what-is-hypnotherapy'],
            ['Blog', '/blog'],
            ['About', '/about'],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: 15,
                fontWeight: 400,
                textDecoration: 'none',
                padding: '10px 4px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/practitioner-signup"
            onClick={() => setMobileOpen(false)}
            style={{
              color: 'var(--hf-accent)',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              padding: '10px 4px',
            }}
          >
            For Practitioners →
          </Link>
        </div>
      )}
    </header>
  );
}
