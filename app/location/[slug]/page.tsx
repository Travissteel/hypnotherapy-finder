import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PractitionerCard } from '@/components/search/PractitionerCard';
import { getAllCities, getCityBySlug, getPractitionersByCity } from '@/lib/data/practitioners';
import Link from 'next/link';
import Script from 'next/script';
import { MapPin } from 'lucide-react';

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

  let title = `Hypnotherapists in ${city.name}, ${city.state} | Find ${city.practitionerCount} Certified Practitioners`;
  if (slug === 'los-angeles') title = `Los Angeles Hypnotherapy | ${city.practitionerCount} Hypnotherapists & Hypnotists in LA`;
  else if (slug === 'chicago') title = `Chicago Hypnotherapy | ${city.practitionerCount} Hypnotherapists & Hypnotists in Chicago, IL`;
  else if (slug === 'austin') title = `Austin Hypnotherapy | ${city.practitionerCount} Hypnotherapists in Austin, TX | Anxiety Hypnosis & More`;
  else if (slug === 'fort-worth') title = `Clinical Hypnotherapy in Fort Worth, TX | Certified Hypnotherapists`;

  let description = `Find qualified hypnotherapists in ${city.name}, ${city.state}. Browse ${city.practitionerCount} certified practitioners specializing in anxiety, weight loss, smoking cessation, and more.`;
  if (slug === 'los-angeles') description = `Find the best hypnotherapy in Los Angeles. Browse ${city.practitionerCount} certified LA hypnotherapists and hypnotists specializing in anxiety, weight loss, smoking cessation. Santa Monica, Beverly Hills, Pasadena & more.`;
  else if (slug === 'chicago') description = `Find the best hypnotherapy in Chicago. Browse ${city.practitionerCount} certified Chicago hypnotherapists and hypnotists for anxiety, weight loss, quit smoking. Downtown, Lincoln Park, Oak Park & suburbs.`;
  else if (slug === 'austin') description = `Find hypnotherapy in Austin, TX. Browse ${city.practitionerCount} certified Austin hypnotherapists for anxiety hypnosis, clinical hypnotherapy, quit smoking, and weight loss. South Austin, Downtown, and surrounding areas.`;
  else if (slug === 'fort-worth') description = `Find the best clinical hypnotherapy in Fort Worth, TX. Browse ${city.practitionerCount} certified Fort Worth hypnotherapists and hypnotists specializing in anxiety, stress, habits, and clinical hypnosis sessions.`;

  const url = `https://hypnotherapy-finder.com/location/${slug}`;
  return {
    title, description,
    keywords: slug === 'los-angeles' ? 'hypnotherapy los angeles, los angeles hypnotherapy, hypnotherapist los angeles, hypnotists los angeles, LA hypnotherapy, hypnosis los angeles, hypnotherapist near me los angeles'
      : slug === 'chicago' ? 'hypnotherapy chicago, chicago hypnotherapy, hypnotherapist chicago, hypnotists chicago, chicago hypnosis, hypnotherapist near me chicago, quit smoking hypnosis chicago'
      : slug === 'austin' ? 'hypnotherapy austin, austin hypnotherapy, hypnotherapist austin, anxiety hypnosis austin, clinical hypnotherapy austin, hypnotherapy to quit smoking austin, south austin hypnotherapy, austin tx hypnosis'
      : slug === 'fort-worth' ? 'hypnotherapy fort worth, clinical hypnotherapist fort worth tx, clinical hypnotherapy sessions fort worth tx, hypnosis fort worth, fort worth tx hypnotherapy'
      : `hypnotherapy ${city.name}, hypnotherapist ${city.name}, ${city.name} hypnosis, hypnotherapy near me ${city.state}`,
    alternates: { canonical: url },
    openGraph: { url, title, description, siteName: 'Hypnotherapy Finder', locale: 'en_US', type: 'website' },
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
    description: `Directory of certified hypnotherapists in ${city.name}`,
    numberOfItems: practitioners.length,
    itemListElement: practitioners.slice(0, 10).map((p, index) => ({
      '@type': 'ListItem', position: index + 1,
      item: { '@type': 'MedicalBusiness', name: p.name, address: { '@type': 'PostalAddress', addressLocality: p.city, addressRegion: p.state, addressCountry: 'US' } },
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `How many hypnotherapists are in ${city.name}?`, acceptedAnswer: { '@type': 'Answer', text: `There are ${city.practitionerCount} certified hypnotherapists in ${city.name}, ${city.state} listed in our directory.` } },
      { '@type': 'Question', name: `What does hypnotherapy cost in ${city.name}?`, acceptedAnswer: { '@type': 'Answer', text: `Hypnotherapy in ${city.name}, ${city.state} typically costs between $100-$250 per session.` } },
      { '@type': 'Question', name: `How do I choose a hypnotherapist in ${city.name}?`, acceptedAnswer: { '@type': 'Answer', text: `When choosing a hypnotherapist in ${city.name}, look for proper certifications (CHt, NGH, IACT, or ABH), relevant experience, good reviews, and someone you feel comfortable with.` } },
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
    description: `Directory of ${city.practitionerCount} certified hypnotherapists in ${city.name}, ${city.state}`,
    address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: city.state, addressCountry: 'US' },
    areaServed: { '@type': 'City', name: city.name },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: practitioners.length, bestRating: '5', worstRating: '1' },
    url: `https://hypnotherapy-finder.com/location/${slug}`,
  };

  const cityHeading = slug === 'los-angeles' ? 'Los Angeles Hypnotherapy & Hypnotherapists'
    : slug === 'chicago' ? 'Chicago Hypnotherapy & Hypnotherapists'
    : slug === 'austin' ? 'Austin Hypnotherapy & Hypnotherapists'
    : slug === 'fort-worth' ? 'Clinical Hypnotherapy in Fort Worth, TX'
    : `Hypnotherapists in ${city.name}`;

  const citySubheading = slug === 'los-angeles' ? `Connect with ${city.practitionerCount} certified LA hypnotherapists and hypnotists in Los Angeles, California`
    : slug === 'chicago' ? `Connect with ${city.practitionerCount} certified Chicago hypnotherapists and hypnotists in Chicago, Illinois`
    : slug === 'austin' ? `Connect with ${city.practitionerCount} certified Austin hypnotherapists for anxiety hypnosis, clinical hypnotherapy, and habit change`
    : slug === 'fort-worth' ? `Connect with ${city.practitionerCount} certified Fort Worth hypnotherapists for clinical hypnosis sessions, anxiety, stress, and behavioral change`
    : `Connect with ${city.practitionerCount} certified hypnotherapy practitioners in ${city.name}, ${city.state}`;

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
                    <strong style={{ color: 'var(--hf-fg)', fontWeight: 600 }}>Looking for hypnotherapy in Los Angeles?</strong> Our directory features {city.practitionerCount} certified LA hypnotherapists and hypnotists across all Los Angeles neighborhoods including <strong style={{ color: 'var(--hf-fg)' }}>Santa Monica, Beverly Hills, Pasadena, West Hollywood, Burbank, Glendale, and Downtown LA</strong>. Whether you need help with anxiety, weight loss, smoking cessation, or stress management, find experienced practitioners ready to help.
                  </p>
                ) : slug === 'chicago' ? (
                  <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16, fontWeight: 300 }}>
                    <strong style={{ color: 'var(--hf-fg)', fontWeight: 600 }}>Looking for hypnotherapy in Chicago?</strong> Our directory features {city.practitionerCount} certified Chicago hypnotherapists and hypnotists across all Chicago neighborhoods including <strong style={{ color: 'var(--hf-fg)' }}>Downtown, Lincoln Park, Lakeview, Oak Park, Evanston, Naperville, and the greater Chicagoland area</strong>.
                  </p>
                ) : slug === 'austin' ? (
                  <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16, fontWeight: 300 }}>
                    <strong style={{ color: 'var(--hf-fg)', fontWeight: 600 }}>Looking for hypnotherapy in Austin?</strong> Our directory features {city.practitionerCount} certified Austin hypnotherapists specializing in <strong style={{ color: 'var(--hf-fg)' }}>anxiety hypnosis and clinical hypnotherapy in Austin</strong>. We list practitioners across South Austin, Downtown, North Austin, Round Rock, Cedar Park, and the surrounding areas. Whether you are looking for stop smoking hypnosis or stress management, locate certified professionals near you.
                  </p>
                ) : slug === 'fort-worth' ? (
                  <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16, fontWeight: 300 }}>
                    <strong style={{ color: 'var(--hf-fg)', fontWeight: 600 }}>Looking for clinical hypnotherapy in Fort Worth?</strong> Our directory features {city.practitionerCount} certified Fort Worth hypnotherapists offering professional clinical hypnosis sessions. Find qualified experts across <strong style={{ color: 'var(--hf-fg)' }}>Downtown Fort Worth, the Cultural District, Near Southside, Tanglewood, TCU area, and the greater Fort Worth-Arlington metroplex</strong>. Specialized hypnotherapists are available to assist with anxiety, stress relief, weight management, and smoking cessation.
                  </p>
                ) : (
                  <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 16, fontWeight: 300 }}>
                    <strong style={{ color: 'var(--hf-fg)', fontWeight: 600 }}>Looking for hypnotherapy in {city.name}?</strong> Our directory features {city.practitionerCount} certified hypnotherapists in the {city.name} area. Whether you're seeking help with anxiety, weight loss, smoking cessation, pain management, or other challenges, you'll find experienced practitioners ready to help.
                  </p>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, marginTop: 28 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 12 }}>What Can {city.name} Hypnotherapists Help With?</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {['Anxiety and stress management', 'Weight loss and healthy habits', 'Smoking cessation', 'Phobia treatment', 'Sleep disorders and insomnia', 'Chronic pain management', 'PTSD and trauma therapy', 'Confidence and performance'].map((item) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.5 }}>
                          <span style={{ color: 'var(--hf-accent)', flexShrink: 0 }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 12 }}>How to Choose a Hypnotherapist in {city.name}</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        ['Credentials:', 'Look for CHt certification from NGH, IACT, or ABH'],
                        ['Experience:', 'Ask about their experience treating your specific concern'],
                        ['Specialization:', 'Find practitioners who specialize in your area of need'],
                        ['Cost:', '$100–$250/session; packages often available'],
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
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)' }}>Browse {practitioners.length} certified hypnotherapists</p>
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
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', marginBottom: 20 }}>Take our scientifically-informed quick tests to evaluate your symptoms and see how clinical hypnotherapy can help.</p>
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
