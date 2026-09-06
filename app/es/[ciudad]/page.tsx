import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PractitionerCardEs } from '@/components/search/PractitionerCardEs';
import { MapPin, Search, ChevronRight, Languages } from 'lucide-react';
import {
  getSpanishCities,
  getSpanishCityBySlug,
  getSpanishCityPractitioners,
} from '@/lib/data/spanish';

interface EsCityPageProps {
  params: Promise<{ ciudad: string }>;
}

export async function generateStaticParams() {
  return getSpanishCities().map(c => ({ ciudad: c.slug }));
}

export async function generateMetadata({ params }: EsCityPageProps): Promise<Metadata> {
  const { ciudad } = await params;
  const city = getSpanishCityBySlug(ciudad);
  if (!city) return { title: 'Ciudad no encontrada' };

  const { total, enEspanol } = getSpanishCityPractitioners(city.slug);
  const url = `https://hypnotherapy-finder.com/es/${city.slug}`;

  const title = `Hipnosis en ${city.nombre}, ${city.estadoAbbr} | ${total} Hipnoterapeutas`;
  const description =
    `Hipnoterapia en ${city.nombre}, ${city.estado}. Consulta ${total} perfiles de hipnoterapeutas, ` +
    `incluidos ${enEspanol.length} consultorios que se anuncian en español, y contáctalos directamente.`;

  return {
    title: { absolute: title },
    description,
    keywords: `hipnosis ${city.nombre.toLowerCase()}, hipnoterapia ${city.nombre.toLowerCase()}, hipnoterapeuta en ${city.nombre.toLowerCase()}, hipnosis en español ${city.nombre.toLowerCase()}, terapia de hipnosis ${city.nombre.toLowerCase()}, hipnoterapia cerca de mi`,
    alternates: {
      canonical: url,
      // Pairs with the English city page so Google can serve the right language.
      languages: {
        'en-US': `https://hypnotherapy-finder.com/location/${city.slug}`,
        'es-US': url,
      },
    },
    openGraph: {
      url,
      title,
      description,
      siteName: 'Hypnotherapy Finder',
      locale: 'es_US',
      type: 'website',
      images: [{ url: '/logo.png', width: 1200, height: 630, alt: `Hipnoterapia en ${city.nombre}` }],
    },
  };
}

export default async function EsCityPage({ params }: EsCityPageProps) {
  const { ciudad } = await params;
  const city = getSpanishCityBySlug(ciudad);
  if (!city) notFound();

  const { enEspanol, resto, total } = getSpanishCityPractitioners(city.slug);

  const faq = [
    {
      q: `¿Hay hipnoterapeutas que hablen español en ${city.nombre}?`,
      a: `En ${city.nombre} hay ${enEspanol.length} ${enEspanol.length === 1 ? 'consultorio que se anuncia' : 'consultorios que se anuncian'} en español, es decir, cuyo propio nombre comercial está en español. No verificamos qué idiomas habla cada profesional, así que confirma siempre directamente con el consultorio antes de reservar.`,
    },
    {
      q: `¿Cuántos hipnoterapeutas hay listados en ${city.nombre}?`,
      a: `Este directorio tiene ${total} perfiles de hipnoterapeutas registrados en ${city.nombre}, ${city.estado}. Puedes verlos todos en esta página o filtrarlos con el buscador por especialidad y formato de sesión.`,
    },
    {
      q: '¿Qué debo preguntar antes de reservar una sesión?',
      a: 'Pregunta por su formación y certificación, cuántos años lleva ejerciendo, si tiene experiencia con tu tema concreto, el precio por sesión, la duración, si ofrece sesiones en línea y en qué idioma atiende. Hypnotherapy Finder no verifica ninguno de esos datos.',
    },
    {
      q: `¿Puedo hacer sesiones en línea desde ${city.nombre}?`,
      a: 'Muchos consultorios ofrecen sesiones virtuales. Si te funciona mejor a distancia, pregunta al profesional si trabaja en línea y qué necesitas de tu parte (espacio privado y conexión estable).',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'es-US',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://hypnotherapy-finder.com/' },
      { '@type': 'ListItem', position: 2, name: 'Español', item: 'https://hypnotherapy-finder.com/es' },
      { '@type': 'ListItem', position: 3, name: city.nombre, item: `https://hypnotherapy-finder.com/es/${city.slug}` },
    ],
  };

  const crumb = {
    fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase' as const, color: 'var(--hf-fg-dim)', textDecoration: 'none',
  };
  const h2 = { fontSize: 22, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 6 } as const;

  return (
    <>
      <Script id="schema-es-city-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Script id="schema-es-city-crumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* See app/es/page.tsx for why lang is declared here rather than on <html>. */}
      <div lang="es" style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1, paddingTop: 100 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 26, flexWrap: 'wrap' }}>
              <Link href="/" style={crumb}>Inicio</Link>
              <ChevronRight style={{ width: 10, height: 10, color: 'var(--hf-fg-dim)' }} />
              <Link href="/es" style={crumb}>Español</Link>
              <ChevronRight style={{ width: 10, height: 10, color: 'var(--hf-fg-dim)' }} />
              <span style={{ ...crumb, color: 'var(--hf-accent)' }}>{city.nombre}</span>
            </div>
          </div>

          {/* Hero */}
          <section style={{ padding: '0 24px 40px' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <h1 style={{ fontSize: 40, fontWeight: 800, color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 18 }}>
                Hipnoterapia en {city.nombre}, {city.estadoAbbr}
              </h1>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 22 }}>
                {city.intro}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link
                  href={`/search?location=${encodeURIComponent(city.nombre)}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px',
                    borderRadius: 12, background: 'var(--hf-accent)', color: '#04201f',
                    fontWeight: 700, fontSize: 14, textDecoration: 'none',
                  }}
                >
                  <Search size={15} /> Buscar en {city.nombre}
                </Link>
                <Link
                  href={`/location/${city.slug}`}
                  hrefLang="en"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px',
                    borderRadius: 12, border: '2px solid rgba(255,255,255,0.12)',
                    color: 'var(--hf-fg)', fontWeight: 600, fontSize: 14, textDecoration: 'none',
                  }}
                >
                  View in English
                </Link>
              </div>
            </div>
          </section>

          {/* Spanish-marketing practices */}
          {enEspanol.length > 0 && (
            <section style={{ padding: '40px 24px', background: 'var(--hf-bg-mid)' }}>
              <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ marginBottom: 20 }}>
                  <h2 style={{ ...h2, display: 'flex', alignItems: 'center', gap: 9 }}>
                    <Languages size={20} style={{ color: 'var(--hf-accent)' }} />
                    Consultorios que se anuncian en español
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, maxWidth: 700 }}>
                    {enEspanol.length === 1
                      ? 'Este consultorio usa un nombre comercial en español, lo que suele indicar que atiende en español.'
                      : `Estos ${enEspanol.length} consultorios usan un nombre comercial en español, lo que suele indicar que atienden en español.`}{' '}
                    No lo hemos verificado — confírmalo directamente con ellos antes de reservar.
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                  {enEspanol.map(p => (
                    <PractitionerCardEs key={p.id} practitioner={p} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Full city listing */}
          <section style={{ padding: '48px 24px' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 24 }}>
                <h2 style={h2}>Todos los hipnoterapeutas en {city.nombre}</h2>
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, maxWidth: 700 }}>
                  {total} perfiles registrados en {city.nombre}. Cualquiera de ellos puede atender en
                  español aunque su nombre comercial esté en inglés: la forma de saberlo es preguntar
                  directamente usando los datos de contacto de su perfil.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {resto.map(p => (
                  <PractitionerCardEs key={p.id} practitioner={p} />
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ padding: '8px 24px 56px' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ ...h2, marginBottom: 20 }}>Preguntas frecuentes sobre hipnoterapia en {city.nombre}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {faq.map(f => (
                  <div key={f.q} className="glass-card" style={{ padding: 22 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>{f.q}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Other Spanish cities */}
          <section style={{ padding: '0 24px 72px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', paddingTop: 44 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 22 }}>
                Hipnoterapia en otras ciudades
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
                {getSpanishCities()
                  .filter(c => c.slug !== city.slug)
                  .map(c => (
                    <Link
                      key={c.slug}
                      href={`/es/${c.slug}`}
                      className="glass-card hf-card-hover"
                      style={{ padding: 16, textAlign: 'center', textDecoration: 'none', display: 'block' }}
                    >
                      <MapPin size={15} style={{ color: 'var(--hf-accent)', margin: '0 auto 6px' }} />
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)' }}>{c.nombre}</div>
                    </Link>
                  ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link href="/es" style={{ fontSize: 14, color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 600 }}>
                  Ver toda la información en español →
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
