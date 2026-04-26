import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Verified Practitioner Badge | Hypnotherapy Finder',
  description: 'Display your Hypnotherapy Finder verified badge on your website to build trust with potential clients and link back to your listing.',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/badge',
  },
};

const embedCode = (slug: string) =>
  `<a href="https://hypnotherapy-finder.com/practitioner/${slug}" target="_blank" rel="noopener">
  <img src="https://hypnotherapy-finder.com/badges/verified-practitioner.svg"
       alt="Verified on Hypnotherapy Finder"
       width="180" height="60" style="display:block;" />
</a>`;

const whyPoints = [
  'Builds instant trust — clients see you\'re part of a verified directory',
  'Links clients directly to your profile with reviews and full contact details',
  'Signals professional credibility alongside your certifications',
  'Takes less than 2 minutes to add to any website',
];

const placementTips = [
  { place: 'Footer', desc: 'Visible on every page — most common placement' },
  { place: 'About page', desc: 'Alongside your other professional certifications' },
  { place: 'Contact page', desc: 'Where clients are deciding whether to reach out' },
];

export default function BadgePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ background: 'linear-gradient(to bottom, oklch(0.22 0.06 185), var(--hf-bg))', padding: '64px 0' }}>
          <div style={{ maxWidth: 672, margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <Image
                src="/badges/verified-practitioner.svg"
                alt="Verified on Hypnotherapy Finder badge"
                width={180}
                height={60}
                unoptimized
              />
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 16, lineHeight: 1.2 }}>
              Your Verified Practitioner Badge
            </h1>
            <p style={{ fontSize: 18, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
              Display this badge on your website to show clients you're verified on Hypnotherapy Finder — and link directly to your profile.
            </p>
          </div>
        </section>

        {/* Why add the badge */}
        <section style={{ padding: '48px 0', background: 'var(--hf-bg-mid)' }}>
          <div style={{ maxWidth: 672, margin: '0 auto', padding: '0 16px' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 24 }}>Why add the badge?</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {whyPoints.map((point, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <CheckCircle style={{ width: 20, height: 20, color: 'var(--hf-accent)', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Embed code */}
        <section style={{ padding: '48px 0' }}>
          <div style={{ maxWidth: 672, margin: '0 auto', padding: '0 16px' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 8 }}>How to add it</h2>
            <p style={{ color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.7 }}>
              Copy the code below and paste it into your website where you'd like the badge to appear.
              Replace{' '}
              <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4, fontSize: 13, fontFamily: 'monospace', color: 'var(--hf-accent)' }}>your-listing-slug</code>
              {' '}with your actual profile slug (visible in your{' '}
              <Link href="/dashboard" style={{ color: 'var(--hf-accent)', textDecoration: 'underline' }}>dashboard</Link>
              {' '}or at the end of your listing URL).
            </p>

            <div style={{ marginBottom: 32 }}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-fg-dim)' }}>Your embed code</span>
              </div>
              <pre style={{ background: 'oklch(0.12 0 0)', border: '1px solid rgba(255,255,255,0.08)', color: 'oklch(0.75 0.15 145)', fontSize: 13, borderRadius: 12, padding: 16, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all', lineHeight: 1.6 }}>
                {embedCode('your-listing-slug')}
              </pre>
            </div>

            <div className="glass-card" style={{ padding: 20, borderLeft: '3px solid var(--hf-accent)' }}>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--hf-fg)' }}>Find your slug:</strong> Log into your{' '}
                <Link href="/dashboard" style={{ color: 'var(--hf-accent)', textDecoration: 'underline' }}>dashboard</Link>
                {' '}— your personalised embed code with your slug pre-filled is waiting for you there.
                Or find your profile on the directory and copy the last part of the URL.
              </p>
            </div>
          </div>
        </section>

        {/* Placement tips */}
        <section style={{ padding: '48px 0', background: 'var(--hf-bg-mid)' }}>
          <div style={{ maxWidth: 672, margin: '0 auto', padding: '0 16px' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 24 }}>Where to place it</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {placementTips.map(({ place, desc }) => (
                <div key={place} className="glass-card" style={{ padding: 20, textAlign: 'center' }}>
                  <p style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 6 }}>{place}</p>
                  <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.5 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '64px 0', background: 'linear-gradient(135deg, oklch(0.28 0.1 185 / 0.6), oklch(0.2 0.08 220 / 0.6))', textAlign: 'center' }}>
          <div style={{ maxWidth: 512, margin: '0 auto', padding: '0 16px' }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 16 }}>Not listed yet?</h2>
            <p style={{ color: 'var(--hf-fg-dim)', marginBottom: 32, fontSize: 17, lineHeight: 1.7 }}>
              Claim your free listing on Hypnotherapy Finder and start connecting with clients searching for practitioners near them.
            </p>
            <Link
              href="/practitioner-signup"
              className="btn-gradient hf-btn-accent"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 12, color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}
            >
              Claim Your Free Listing <ExternalLink style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
