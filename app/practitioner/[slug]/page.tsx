import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import {
  MapPin, Phone, Globe, Mail, CheckCircle, Star, User, Award, Video,
  ChevronRight, ShieldCheck, Languages, DollarSign, BrainCircuit
} from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

function normalizeWebsiteUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `https://${trimmed}`;
}

interface PractitionerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { getAllPractitioners } = await import('@/lib/data/practitioners');
  const practitioners = getAllPractitioners();
  return practitioners.map((practitioner) => ({ slug: practitioner.slug }));
}

async function createSupabaseClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } }
  );
}

async function getPractitioner(slugOrId: string) {
  const supabase = await createSupabaseClient();
  const isUUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(slugOrId);

  if (isUUID) {
    const { data, error } = await supabase.from('practitioners').select('*').eq('id', slugOrId).maybeSingle();
    if (!error && data) return data;
  }

  const { data: dataBySlug, error: errorBySlug } = await supabase.from('practitioners').select('*').eq('slug', slugOrId).maybeSingle();
  if (!errorBySlug && dataBySlug) return dataBySlug;

  try {
    const { getPractitionerBySlug } = await import('@/lib/data/practitioners');
    const staticPractitioner = getPractitionerBySlug(slugOrId);
    if (staticPractitioner) {
      return { ...staticPractitioner, id: staticPractitioner.id, years_experience: (staticPractitioner as any).yearsExperience || null, address: (staticPractitioner as any).street || null, claim_status: 'unclaimed' };
    }
  } catch (e) {
    console.error('Error loading static data:', e);
  }
  return null;
}

export async function generateMetadata({ params }: PractitionerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const practitioner = await getPractitioner(slug);
  if (!practitioner) return { title: 'Practitioner Not Found' };

  const specialties = Array.isArray(practitioner.specialties) ? practitioner.specialties : [];
  let description = `Connect with ${practitioner.name}, a certified hypnotherapist in ${practitioner.city}, ${practitioner.state}. ${specialties.length > 0 ? `Specializing in ${specialties.slice(0, 3).join(', ')}.` : ''}`;
  if (description.length > 155) description = description.substring(0, 152) + '...';

  const ogTitle = `${practitioner.name} - Hypnotherapist in ${practitioner.city}, ${practitioner.state}`;
  const ogImage = practitioner.photo_url || 'https://hypnotherapy-finder.com/og-image.jpg';

  return {
    title: ogTitle, description,
    alternates: { canonical: `https://hypnotherapy-finder.com/practitioner/${slug}` },
    openGraph: { title: ogTitle, description, url: `https://hypnotherapy-finder.com/practitioner/${slug}`, siteName: 'Hypnotherapy Finder', images: [{ url: ogImage, width: 1200, height: 630, alt: practitioner.name }], type: 'profile' },
    twitter: { card: 'summary_large_image', title: ogTitle, description, images: [ogImage] },
  };
}

export default async function PractitionerPage({ params }: PractitionerPageProps) {
  const { slug } = await params;
  const practitioner = await getPractitioner(slug);
  if (!practitioner) notFound();

  const specialties = Array.isArray(practitioner.specialties) ? practitioner.specialties : [];
  const websiteUrl = normalizeWebsiteUrl(practitioner.website);

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'MedicalBusiness',
    name: practitioner.name,
    description: `Certified hypnotherapist specializing in ${specialties.join(', ')}`,
    address: { '@type': 'PostalAddress', streetAddress: practitioner.address, addressLocality: practitioner.city, addressRegion: practitioner.state, addressCountry: 'US' },
    ...(practitioner.phone && { telephone: practitioner.phone }),
    ...(websiteUrl && { url: websiteUrl }),
    medicalSpecialty: specialties,
  };

  const breadcrumbLinkStyle = { fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--hf-fg-dim)', textDecoration: 'none' };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Script id="schema-medical" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main style={{ flex: 1, paddingTop: 100 }}>
        <div style={{ maxWidth: 1020, margin: '0 auto', padding: '0 24px 80px' }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
            <Link href="/" style={breadcrumbLinkStyle}>Home</Link>
            <ChevronRight style={{ width: 10, height: 10, color: 'var(--hf-fg-dim)' }} />
            <Link href="/search" style={breadcrumbLinkStyle}>Find a Therapist</Link>
            <ChevronRight style={{ width: 10, height: 10, color: 'var(--hf-fg-dim)' }} />
            <Link href={`/search?location=${practitioner.city}`} style={breadcrumbLinkStyle}>{practitioner.city}</Link>
            <ChevronRight style={{ width: 10, height: 10, color: 'var(--hf-fg-dim)' }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--hf-accent)' }}>{practitioner.name}</span>
          </div>

          {/* Profile Hero */}
          <section className="glass-card" style={{ overflow: 'hidden', marginBottom: 32 }}>
            {/* Banner */}
            <div style={{ height: 160, background: 'linear-gradient(135deg, oklch(0.20 0.02 260) 0%, oklch(0.14 0.015 260) 100%)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: 300, height: 300, background: 'var(--hf-accent)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.08 }} />
              <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: 300, height: 300, background: 'oklch(0.72 0.12 285)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.07 }} />
            </div>

            {/* Profile Content */}
            <div style={{ padding: '0 32px 32px', marginTop: -64, position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
                  {/* Avatar */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{ width: 120, height: 120, borderRadius: 24, border: '4px solid var(--hf-bg)', background: 'var(--hf-bg-mid)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {practitioner.imageUrl ? (
                        <img alt={practitioner.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={practitioner.imageUrl} />
                      ) : (
                        <User style={{ width: 48, height: 48, color: 'var(--hf-fg-dim)' }} />
                      )}
                    </div>
                    {practitioner.acceptingNewClients && (
                      <div style={{ position: 'absolute', bottom: -4, right: -4, background: 'oklch(0.6 0.15 145)', padding: 6, borderRadius: '50%', border: '2px solid var(--hf-bg)' }}>
                        <ShieldCheck style={{ width: 14, height: 14, color: '#fff' }} />
                      </div>
                    )}
                  </div>

                  {/* Name & Details */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <h1 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: 'var(--hf-fg)', lineHeight: 1.2 }}>{practitioner.name}</h1>
                      {practitioner.verified === true && practitioner.claim_status === 'claimed' && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'oklch(0.72 0.12 185 / 0.12)', color: 'var(--hf-accent)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 9999 }}>
                          <CheckCircle style={{ width: 10, height: 10 }} />
                          Verified Professional
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 12 }}>
                      {practitioner.title || 'Clinical Hypnotherapist & Mindset Coach'}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--hf-fg-dim)' }}>
                        <MapPin style={{ width: 14, height: 14, color: 'var(--hf-accent)' }} /> {practitioner.city}, {practitioner.state}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--hf-fg-dim)' }}>
                        <Award style={{ width: 14, height: 14, color: 'var(--hf-accent)' }} /> {practitioner.years_experience || '10'}+ Years Exp.
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--hf-fg-dim)' }}>
                        <Star style={{ width: 14, height: 14, color: 'oklch(0.8 0.15 75)', fill: 'oklch(0.8 0.15 75)' }} /> 4.9 (82 reviews)
                      </span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {practitioner.phone && (
                      <a href={`tel:${practitioner.phone}`} className="glass hf-glass-hover" style={{ padding: '10px 20px', borderRadius: 12, color: 'var(--hf-fg)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                        Inquiry
                      </a>
                    )}
                    <button className="btn-gradient hf-btn-accent" style={{ padding: '10px 20px', borderRadius: 12, border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                      Book Consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Two Column Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 24, alignItems: 'flex-start' }}>
              {/* Left: Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* About */}
                <div className="glass-card" style={{ overflow: 'hidden' }}>
                  <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ padding: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 10 }}>
                      <User style={{ width: 16, height: 16, color: 'var(--hf-fg-dim)' }} />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-fg-dim)' }}>Introduction</span>
                  </div>
                  <div style={{ padding: '28px' }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16, lineHeight: 1.35 }}>Mastering the Mind for Sustainable Change</h2>
                    <div style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.75, fontWeight: 300 }}>
                      {practitioner.bio ? (
                        <p>{practitioner.bio}</p>
                      ) : (
                        <>
                          <p style={{ marginBottom: 12 }}>Welcome. I'm {practitioner.name}, a certified hypnotherapist dedicated to helping individuals unlock their potential and overcome personal challenges in {practitioner.city}. My practice is built on a deep fascination for the subconscious mind and its profound ability to influence our behaviors, emotions, and well-being.</p>
                          <p>I believe that every person holds the key to their own healing. My role is to provide a safe, supportive, and non-judgmental space where you can explore the depths of your mind, identify the root causes of your concerns, and create lasting, positive change.</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="glass-card" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <div style={{ padding: 8, background: 'oklch(0.72 0.12 185 / 0.12)', borderRadius: 10 }}>
                      <BrainCircuit style={{ width: 16, height: 16, color: 'var(--hf-accent)' }} />
                    </div>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--hf-fg)' }}>Clinical Specialties</h2>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                    {specialties.map((spec: string, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <CheckCircle style={{ width: 14, height: 14, color: 'var(--hf-accent)', flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)', fontWeight: 400 }}>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Claim CTA */}
                {practitioner.claim_status === 'unclaimed' && (
                  <div className="glass-card" style={{ padding: '36px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'var(--hf-accent)', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.08 }} />
                    <div style={{ position: 'relative' }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 10 }}>Are you {practitioner.name}?</h2>
                      <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.65, marginBottom: 24, maxWidth: 420, fontWeight: 300 }}>
                        Claim this listing to update your information, manage appointments, and connect with more clients.
                      </p>
                      <Link href={`/claim-listing?practitioner=${practitioner.id}`} rel="nofollow" className="btn-gradient hf-btn-accent" style={{ display: 'inline-block', padding: '12px 28px', borderRadius: 12, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                        Claim Profile Now
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Sidebar */}
              <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Practice Details */}
                <div className="glass-card" style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-fg-dim)', marginBottom: 20 }}>Practice Details</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
                    {[
                      { icon: Languages, label: 'Languages', value: 'English, Spanish' },
                      { icon: Video, label: 'Sessions', value: 'Virtual & In-Person' },
                      { icon: DollarSign, label: 'Rate', value: `$${practitioner.session_price || '150'} – $220` },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ padding: 7, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                            <Icon style={{ width: 13, height: 13, color: 'var(--hf-accent)' }} />
                          </div>
                          <span style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>{label}</span>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--hf-fg)' }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {practitioner.phone && (
                      <a href={`tel:${practitioner.phone}`} className="hf-link-hover" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--hf-fg-dim)', textDecoration: 'none', fontSize: 13 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Phone style={{ width: 13, height: 13 }} />
                        </div>
                        {practitioner.phone}
                      </a>
                    )}
                    {websiteUrl && (
                      <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="hf-link-hover" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--hf-fg-dim)', textDecoration: 'none', fontSize: 13 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Globe style={{ width: 13, height: 13 }} />
                        </div>
                        Official Website
                      </a>
                    )}
                    {practitioner.email && (
                      <a href={`mailto:${practitioner.email}`} className="hf-link-hover" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--hf-fg-dim)', textDecoration: 'none', fontSize: 13, overflow: 'hidden' }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Mail style={{ width: 13, height: 13 }} />
                        </div>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{practitioner.email}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Verified Badge */}
                {practitioner.verified === true && practitioner.claim_status === 'claimed' && (
                  <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
                    <h4 style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'oklch(0.7 0.15 145)', marginBottom: 16 }}>Verified Practitioner</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                      <a href={`https://hypnotherapy-finder.com/practitioner/${practitioner.slug}`}>
                        <img src={`/api/badge/${practitioner.slug}`} alt="Verified Practitioner - Hypnotherapy Finder" width={200} height={56} style={{ borderRadius: 8 }} />
                      </a>
                    </div>
                    <p style={{ fontSize: 11, color: 'oklch(0.7 0.15 145)', fontWeight: 300 }}>Identity and credentials verified by Hypnotherapy Finder</p>
                  </div>
                )}

                {/* Start Transformation CTA */}
                <div className="glass-card" style={{ padding: '28px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: 'var(--hf-accent)', borderRadius: '50%', filter: 'blur(50px)', opacity: 0.07 }} />
                  <div style={{ position: 'relative' }}>
                    <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8, lineHeight: 1.3 }}>Start Your Transformation</h4>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 20, fontWeight: 300 }}>Most clients see measurable change within 3–5 sessions. Discovery calls are recommended.</p>
                    <button className="btn-gradient hf-btn-accent" style={{ width: '100%', padding: '12px', borderRadius: 12, border: 'none', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                      Schedule Free Call
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
