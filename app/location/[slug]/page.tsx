import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PractitionerCard } from '@/components/search/PractitionerCard';
import { getAllCities, getCityBySlug, getPractitionersByCity } from '@/lib/data/practitioners';
import Link from 'next/link';
import Script from 'next/script';
import { MapPin } from 'lucide-react';
import { stateAbbr } from '@/lib/seo';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cities = getAllCities();
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: 'Location Not Found' };

  let title = `Hypnotherapists in ${city.name}, ${stateAbbr(city.state)} | ${city.practitionerCount} Practitioner Profiles`;
  if (slug === 'los-angeles') title = `Los Angeles Hypnotherapy | ${city.practitionerCount} Hypnotherapists & Hypnotists in LA`;
  else if (slug === 'chicago') title = `Chicago Hypnotherapy | ${city.practitionerCount} Hypnotherapists & Hypnotists in Chicago, IL`;
  else if (slug === 'austin') title = `Austin Hypnotherapy | ${city.practitionerCount} Hypnotherapists in Austin, TX | Anxiety Hypnosis & More`;
  else if (slug === 'fort-worth') title = `Clinical Hypnotherapy in Fort Worth, TX | Hypnotherapist Directory`;

  let description = `Find hypnotherapists in ${city.name}, ${city.state}. Browse ${city.practitionerCount} practitioner profiles by location and contact details.`;
  if (slug === 'los-angeles') description = `Find hypnotherapy in Los Angeles. Browse ${city.practitionerCount} LA hypnotherapist profiles — Santa Monica to Pasadena.`;
  else if (slug === 'chicago') description = `Find hypnotherapy in Chicago. Browse ${city.practitionerCount} hypnotherapist profiles — Downtown, Lincoln Park & suburbs.`;
  else if (slug === 'austin') description = `Find hypnotherapy in Austin, TX. Browse ${city.practitionerCount} hypnotherapist profiles for anxiety hypnosis, quit smoking & weight loss — Downtown & South Austin.`;
  else if (slug === 'fort-worth') description = `Find clinical hypnotherapy in Fort Worth, TX. Browse ${city.practitionerCount} hypnotherapist profiles for anxiety, stress, habits & clinical hypnosis sessions.`;

  const url = `https://hypnotherapy-finder.com/location/${slug}`;
  return {
    // absolute: skip the "| Hypnotherapy Finder" template — location titles are keyword-tuned and already ~60 chars
    title: { absolute: title }, description,
    keywords: slug === 'los-angeles' ? 'hypnotherapy los angeles, los angeles hypnotherapy, hypnotherapist los angeles, hypnotists los angeles, LA hypnotherapy, hypnosis los angeles, hypnotherapist near me los angeles'
      : slug === 'chicago' ? 'hypnotherapy chicago, chicago hypnotherapy, hypnotherapist chicago, hypnotists chicago, chicago hypnosis, hypnotherapist near me chicago, quit smoking hypnosis chicago'
      : slug === 'austin' ? 'hypnotherapy austin, austin hypnotherapy, hypnotherapist austin, anxiety hypnosis austin, clinical hypnotherapy austin, hypnotherapy to quit smoking austin, south austin hypnotherapy, austin tx hypnosis'
      : slug === 'fort-worth' ? 'hypnotherapy fort worth, clinical hypnotherapist fort worth tx, clinical hypnotherapy sessions fort worth tx, hypnosis fort worth, fort worth tx hypnotherapy'
      : `hypnotherapy ${city.name}, hypnotherapist ${city.name}, ${city.name} hypnosis, hypnotherapy near me ${city.state}`,
    alternates: { canonical: url },
    openGraph: {
      url, title, description, siteName: 'Hypnotherapy Finder', locale: 'en_US', type: 'website',
      images: [{ url: '/logo.png', width: 1200, height: 630, alt: `Hypnotherapists in ${city.name}, ${city.state}` }],
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const practitioners = getPractitionersByCity(slug);

  const itemListSchema = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: `Hypnotherapists in ${city.name}, ${city.state}`,
    description: `Directory of hypnotherapist profiles in ${city.name}`,
    numberOfItems: practitioners.length,
    itemListElement: practitioners.slice(0, 10).map((p, index) => ({
      '@type': 'ListItem', position: index + 1,
      item: { '@type': 'MedicalBusiness', name: p.name, address: { '@type': 'PostalAddress', addressLocality: p.city, addressRegion: p.state, addressCountry: 'US' } },
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `How many hypnotherapists are in ${city.name}?`, acceptedAnswer: { '@type': 'Answer', text: `There are ${city.practitionerCount} hypnotherapist profiles in ${city.name}, ${city.state} listed in our directory.` } },
      { '@type': 'Question', name: `What does hypnotherapy cost in ${city.name}?`, acceptedAnswer: { '@type': 'Answer', text: `Hypnotherapy fees in ${city.name}, ${city.state} vary by practitioner, session format, and session length. Contact practitioners directly for current pricing.` } },
      { '@type': 'Question', name: `How do I choose a hypnotherapist in ${city.name}?`, acceptedAnswer: { '@type': 'Answer', text: `When choosing a hypnotherapist in ${city.name}, ask about certification, training background, experience with your concern, session format, and whether you feel comfortable with their approach.` } },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hypnotherapy-finder.com' },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://hypnotherapy-finder.com/locations' },
      { '@type': 'ListItem', position: 3, name: `${city.name}, ${city.state}`, item: `https://hypnotherapy-finder.com/location/${slug}` },
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org', '@type': 'LocalBusiness',
    '@id': `https://hypnotherapy-finder.com/location/${slug}#business`,
    name: `Hypnotherapy in ${city.name}`,
    description: `Directory of ${city.practitionerCount} hypnotherapist profiles in ${city.name}, ${city.state}`,
    address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: city.state, addressCountry: 'US' },
    areaServed: { '@type': 'City', name: city.name },
    url: `https://hypnotherapy-finder.com/location/${slug}`,
  };

  const cityHeading = slug === 'los-angeles' ? 'Los Angeles Hypnotherapy & Hypnotherapists'
    : slug === 'chicago' ? 'Chicago Hypnotherapy & Hypnotherapists'
    : slug === 'austin' ? 'Austin Hypnotherapy & Hypnotherapists'
    : slug === 'fort-worth' ? 'Clinical Hypnotherapy in Fort Worth, TX'
    : `Hypnotherapists in ${city.name}`;

  const citySubheading = slug === 'los-angeles' ? `Connect with ${city.practitionerCount} LA hypnotherapist and hypnotist profiles in Los Angeles, California`
    : slug === 'chicago' ? `Connect with ${city.practitionerCount} Chicago hypnotherapist and hypnotist profiles in Chicago, Illinois`
    : slug === 'austin' ? `Connect with ${city.practitionerCount} Austin hypnotherapist profiles for anxiety hypnosis, clinical hypnotherapy, and habit change`
    : slug === 'fort-worth' ? `Connect with ${city.practitionerCount} Fort Worth hypnotherapist profiles for clinical hypnosis sessions, anxiety, stress, and behavioral change`
    : `Connect with ${city.practitionerCount} hypnotherapy practitioner profiles in ${city.name}, ${city.state}`;

  const nearMeCannibalizationCities = new Set(['detroit', 'baltimore', 'columbus', 'charlotte', 'boston']);
  const certifiedNearMeCannibalizationCities = new Set(['detroit', 'columbus', 'atlanta']);

  return (
    <>
      <Script id="schema-itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} strategy="beforeInteractive" />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} strategy="beforeInteractive" />
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} strategy="beforeInteractive" />
      <Script id="schema-local-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} strategy="beforeInteractive" />

      <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1, paddingTop: 80 }}>
          {/* Header */}
          <section style={{ background: 'var(--hf-bg-mid)', padding: '56px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                <MapPin style={{ width: 18, height: 18, color: 'var(--hf-accent)' }} />
                <span style={{ fontSize: 14, color: 'var(--hf-accent)', fontWeight: 500 }}>{city.state}</span>
              </div>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 14 }}>{cityHeading}</h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>{citySubheading}</p>
            </div>
          </section>

          {/* SEO Content */}
          <section style={{ padding: '48px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <div className="glass-card" style={{ padding: '40px' }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>
                  {slug === 'los-angeles' ? 'Find the Best Hypnotherapy in Los Angeles, CA'
                    : slug === 'chicago' ? 'Find the Best Hypnotherapy in Chicago, IL'
                    : slug === 'austin' ? 'Find the Best Hypnotherapy in Austin, TX'
                    : slug === 'fort-worth' ? 'Find Clinical Hypnotherapy in Fort Worth, TX'
                    : `Find Qualified Hypnotherapists in ${city.name}, ${city.state}`}
                </h2>

                {slug === 'los-angeles' ? (
                  <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16, fontWeight: 300 }}>
                    <strong style={{ color: 'var(--hf-fg)', fontWeight: 600 }}>Looking for hypnotherapy in Los Angeles?</strong> Our directory features {city.practitionerCount} LA hypnotherapist and hypnotist profiles across Los Angeles neighbourhoods including <strong style={{ color: 'var(--hf-fg)' }}>Santa Monica, Beverly Hills, Pasadena, West Hollywood, Burbank, Glendale, and Downtown LA</strong>. Use profiles to compare location and contact details, then confirm services and credentials directly.
                  </p>
                ) : slug === 'chicago' ? (
                  <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16, fontWeight: 300 }}>
                    <strong style={{ color: 'var(--hf-fg)', fontWeight: 600 }}>Looking for hypnotherapy in Chicago?</strong> Our directory features {city.practitionerCount} Chicago hypnotherapist and hypnotist profiles across Chicago neighbourhoods including <strong style={{ color: 'var(--hf-fg)' }}>Downtown, Lincoln Park, Lakeview, Oak Park, Evanston, Naperville, and the greater Chicagoland area</strong>.
                  </p>
                ) : slug === 'austin' ? (
                  <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16, fontWeight: 300 }}>
                    <strong style={{ color: 'var(--hf-fg)', fontWeight: 600 }}>Looking for hypnotherapy in Austin?</strong> Our directory features {city.practitionerCount} Austin hypnotherapist profiles for <strong style={{ color: 'var(--hf-fg)' }}>anxiety hypnosis and clinical hypnotherapy in Austin</strong>. We list practitioners across South Austin, Downtown, North Austin, Round Rock, Cedar Park, and the surrounding areas. Whether you are looking for stop smoking hypnosis or stress management, locate profiles near you and confirm fit directly.
                  </p>
                ) : slug === 'fort-worth' ? (
                  <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16, fontWeight: 300 }}>
                    <strong style={{ color: 'var(--hf-fg)', fontWeight: 600 }}>Looking for clinical hypnotherapy in Fort Worth?</strong> Our directory features {city.practitionerCount} Fort Worth hypnotherapist profiles for clinical hypnosis sessions. Browse practitioners across <strong style={{ color: 'var(--hf-fg)' }}>Downtown Fort Worth, the Cultural District, Near Southside, Tanglewood, TCU area, and the greater Fort Worth-Arlington metroplex</strong>, then contact them directly to confirm training, services, pricing, and availability.
                  </p>
                ) : (
                  <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16, fontWeight: 300 }}>
                    <strong style={{ color: 'var(--hf-fg)', fontWeight: 600 }}>Looking for hypnotherapy in {city.name}?</strong> Our directory features {city.practitionerCount} hypnotherapist profiles in the {city.name} area. Whether you're researching support for anxiety, weight loss, smoking cessation, pain, or habit change, use the listings to create a shortlist and confirm details directly.
                  </p>
                )}

                {/*
                  Cannibalization fix. Search Console showed non-local, directory-intent
                  queries resolving to arbitrary city pages instead of the national
                  pages built for them — "hypnotherapist near me" ranked /location/detroit
                  at 9.5 and /location/baltimore at 11, while /hypnotherapy-near-me sat
                  at 36.6. Google was splitting the signal across ~30 city pages.
                  These links point the national terms at the pages that should own them,
                  using the query wording as anchor text.
                */}
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginTop: 20, fontWeight: 300 }}>
                  Not based in {city.name}? Search for a{' '}
                  <Link href="/hypnotherapy-near-me" className="hf-link-hover" style={{ color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 500 }}>hypnotherapist near me</Link>
                  {' '}nationwide, or{' '}
                  <Link href="/find-a-hypnotherapist" className="hf-link-hover" style={{ color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 500 }}>find a hypnotherapist</Link>
                  {' '}by concern and session type. You can also{' '}
                  <Link href="/locations" className="hf-link-hover" style={{ color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 500 }}>browse every city we cover</Link>.
                </p>

                {nearMeCannibalizationCities.has(slug) && (
                  <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.65, marginTop: 12, fontWeight: 300 }}>
                    If your search was <Link href="/hypnotherapy-near-me" className="hf-link-hover" style={{ color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 500 }}>hypnotherapist near me</Link>, use that national page to compare local profiles, ask credential questions, and avoid treating a city listing as the whole search.
                  </p>
                )}

                {certifiedNearMeCannibalizationCities.has(slug) && (
                  <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.65, marginTop: 12, fontWeight: 300 }}>
                    If your search was <Link href="/hypnotherapy-near-me" className="hf-link-hover" style={{ color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 500 }}>certified hypnotherapist near me</Link>, use that national checklist to verify certification, training, scope, fees, and availability directly instead of assuming those details from a city listing.
                  </p>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, marginTop: 28 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 12 }}>What Can {city.name} Hypnotherapists Help With?</h3>
                    {/* These were plain text. Location pages carry the bulk of the
                        site's impressions but linked out only to /locations and
                        /search, so no authority reached the specialty money pages.
                        Each concern now links to the page that should rank for it. */}
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        ['Anxiety and stress management', '/hypnotherapy-for-anxiety'],
                        ['Weight loss and healthy habits', '/weight-loss-hypnotherapy'],
                        ['Smoking cessation', '/quit-smoking-hypnotherapy'],
                        ['Phobia treatment', '/hypnotherapy-for-phobias'],
                        ['Sleep disorders and insomnia', '/hypnotherapy-for-sleep'],
                        ['Chronic pain management', '/hypnotherapy-for-pain'],
                        ['PTSD and trauma therapy', '/hypnotherapy-for-ptsd'],
                        ['Confidence and performance', '/hypnotherapy-for-confidence'],
                      ].map(([item, href]) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.5 }}>
                          <span style={{ color: 'var(--hf-accent)', flexShrink: 0 }}>✓</span>
                          <Link href={href} className="hf-link-hover" style={{ color: 'var(--hf-fg-dim)', textDecoration: 'none' }}>{item}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 12 }}>How to Choose a Hypnotherapist in {city.name}</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        ['Credentials:', 'Ask directly about certification, training, supervision, and professional memberships'],
                        ['Experience:', 'Ask about their experience supporting your specific concern'],
                        ['Approach:', 'Find out whether they use direct suggestion, Ericksonian work, regression, NLP, or another method'],
                        ['Cost:', 'Confirm current session fees, package options, and payment terms directly'],
                      ].map(([label, text]) => (
                        <li key={label} style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.5 }}>
                          <strong style={{ color: 'var(--hf-fg)' }}>{label}</strong> {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practitioners Grid */}
          <section style={{ padding: '48px 24px' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 4 }}>All Practitioners in {city.name}</h2>
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)' }}>Browse {practitioners.length} hypnotherapist profiles</p>
              </div>

              {practitioners.length === 0 ? (
                <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
                  <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 16 }}>No practitioners found in {city.name} yet.</p>
                  <Link href="/search" style={{ color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 500 }}>Search all locations →</Link>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                  {practitioners.map((practitioner) => (
                    <PractitionerCard key={practitioner.id} practitioner={practitioner} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Interactive Quizzes & Assessments */}
          <section style={{ padding: '0 24px 48px' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <div className="glass-card" style={{ padding: '32px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(var(--hf-accent-rgb), 0.05) 0%, rgba(0,0,0,0) 100%)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>Free Hypnotherapy Quizzes & Self-Assessments</h3>
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', marginBottom: 20 }}>Take quick self-reflection quizzes to organise what you may want to discuss with a practitioner or healthcare provider.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  {[
                    { href: '/caregiver-burnout-quiz', title: 'Caregiver Burnout Quiz', desc: 'Measure your caregiver fatigue levels' },
                    { href: '/claustrophobia-test', title: 'Claustrophobia Test', desc: 'Assess your fear of enclosed spaces' },
                    { href: '/anxiety-quiz', title: 'Anxiety & Stress Quiz', desc: 'Evaluate daily stress and anxiety' },
                    { href: '/agoraphobia-test', title: 'Agoraphobia Test', desc: 'Evaluate fear of open or crowded places' }
                  ].map((quiz) => (
                    <Link key={quiz.href} href={quiz.href} className="hf-card-hover" style={{ display: 'block', padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', textDecoration: 'none', textAlign: 'left' }}>
                      <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-accent)', marginBottom: 4 }}>{quiz.title}</h4>
                      <p style={{ fontSize: 11, color: 'var(--hf-fg-dim)' }}>{quiz.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Related Specialties */}
          <section style={{ padding: '0 24px 72px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', paddingTop: 48 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 24 }}>Explore Hypnotherapy Specialties</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
                {[
                  { href: '/hypnotherapy-for-anxiety', title: 'Anxiety Hypnotherapy', desc: 'Manage stress and panic attacks' },
                  { href: '/weight-loss-hypnotherapy', title: 'Weight Loss Hypnotherapy', desc: 'Sustainable weight management' },
                  { href: '/quit-smoking-hypnotherapy', title: 'Quit Smoking Hypnotherapy', desc: 'Break free from nicotine' },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="glass-card hf-card-hover" style={{ display: 'block', padding: '20px', textDecoration: 'none', textAlign: 'center' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-accent)', marginBottom: 6 }}>{link.title}</h3>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>{link.desc}</p>
                  </Link>
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link href="/locations" style={{ fontSize: 14, color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 500 }}>View all locations →</Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
