'use client';

import Link from 'next/link';

function IconGlobe() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}
function IconInsta() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.012 2.25H8.08l4.261 5.635 5.903-5.635Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

const FOOTER_COLS = [
  {
    title: 'Directory',
    links: [
      ['Find a Therapist', '/search'],
      ['Popular Locations', '/locations'],
      ['Free Quizzes', '/free-quizzes'],
      ['For Practitioners', '/practitioner-signup'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['What is Hypnotherapy?', '/what-is-hypnotherapy'],
      ['Find a Hypnotherapist', '/find-a-hypnotherapist'],
      ['How it Works', '/how-it-works'],
      ['Blog', '/blog'],
      ['FAQ', '/faq'],
      ['About', '/about'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Privacy Policy', '/privacy'],
      ['Terms of Service', '/terms'],
      ['Contact Us', '/contact'],
    ],
  },
];

export function Footer() {
  return (
    <footer style={{ background: 'var(--hf-bg)', padding: '60px 24px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap', gap: 32 }}>
          {/* Brand */}
          <div>
            <div className="font-serif-display" style={{ fontSize: 20, color: 'var(--hf-fg)', marginBottom: 10 }}>
              Hypnotherapy Finder
            </div>
            <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', maxWidth: 230, lineHeight: 1.65, fontWeight: 300 }}>
              The leading directory for finding certified hypnotherapy practitioners nationwide.
            </p>
          </div>

          {/* Columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 14, fontWeight: 600 }}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {col.links.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    style={{ fontSize: 13, color: 'var(--hf-fg-dim)', textDecoration: 'none', fontWeight: 300, transition: 'color .15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--hf-fg)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--hf-fg-dim)')}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', fontWeight: 300 }}>
            © {new Date().getFullYear()} Hypnotherapy Finder. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { Icon: IconInsta, href: 'https://www.instagram.com/hypnotherapyfinder', label: 'Instagram' },
              { Icon: IconX, href: 'https://x.com/Hypnofinder', label: 'X (Twitter)' },
              { Icon: IconFacebook, href: 'https://www.facebook.com/profile.php?id=61584471600142', label: 'Facebook' },
              { Icon: IconGlobe, href: 'https://hypnotherapy-finder.com', label: 'Website' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="glass"
                style={{
                  borderRadius: '50%',
                  width: 34,
                  height: 34,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  transition: 'color .15s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--hf-fg)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
