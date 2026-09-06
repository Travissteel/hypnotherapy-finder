import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MapPin, Search, MessageCircle, ShieldCheck } from 'lucide-react';
import { getCitiesByInventory } from '@/lib/data/practitioners';
import { getSpanishCities, SPANISH_MARKETING_SLUGS } from '@/lib/data/spanish';

const URL = 'https://hypnotherapy-finder.com/es';

export const metadata: Metadata = {
  title: { absolute: 'Hipnoterapia en Español | Directorio de Hipnoterapeutas en EE. UU.' },
  description:
    'Directorio de hipnoterapeutas en Estados Unidos. Busca por ciudad, revisa consultorios que se anuncian en español y contacta directamente para confirmar idioma, formación y precios.',
  keywords:
    'hipnoterapia en español, hipnosis en español, hipnoterapeuta cerca de mi, hipnosis cerca de mi, terapia de hipnosis, hipnoterapia estados unidos, hipnosis houston, hipnosis dallas, hipnosis chicago',
  alternates: {
    canonical: URL,
    languages: {
      'en-US': 'https://hypnotherapy-finder.com/find-a-hypnotherapist',
      'es-US': URL,
    },
  },
  openGraph: {
    url: URL,
    title: 'Hipnoterapia en Español | Directorio de Hipnoterapeutas',
    description:
      'Busca hipnoterapeutas por ciudad en Estados Unidos y contacta directamente para confirmar idioma, formación y precios.',
    siteName: 'Hypnotherapy Finder',
    locale: 'es_US',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Hipnoterapia en Español' }],
  },
};

const FAQ = [
  {
    q: '¿Qué es la hipnoterapia?',
    a: 'La hipnoterapia es un enfoque complementario en el que se usa un estado de atención enfocada y relajación para trabajar hábitos, respuestas de estrés o patrones de pensamiento. No sustituye la atención médica ni psicológica. Si tienes síntomas significativos, consulta a un profesional de la salud.',
  },
  {
    q: '¿Cómo encuentro un hipnoterapeuta que hable español?',
    a: 'Este directorio no verifica los idiomas que habla cada profesional, así que la forma fiable es preguntar directamente. En cada página de ciudad señalamos primero los consultorios cuyo propio nombre comercial está en español, que suele ser una buena señal de que atienden en español, y después puedes contactar a cualquier profesional del listado para confirmarlo.',
  },
  {
    q: '¿Verifican las credenciales de los profesionales?',
    a: 'No. Hypnotherapy Finder publica perfiles y datos de contacto, pero no verifica certificaciones, formación, precios, seguros ni disponibilidad. Pregunta directamente a cada profesional sobre su formación, supervisión y experiencia antes de reservar.',
  },
  {
    q: '¿Cuánto cuesta una sesión de hipnoterapia?',
    a: 'Los precios varían según el profesional, la ciudad, el formato y la duración de la sesión. Contacta directamente al consultorio para conocer sus tarifas actuales y si ofrecen paquetes o primera consulta gratuita.',
  },
  {
    q: '¿Funciona la hipnoterapia en línea?',
    a: 'Muchas personas usan sesiones en línea sin problema cuando cuentan con un espacio privado, una conexión estable y un profesional cuyo estilo funcione bien a distancia. Pregunta al consultorio si ofrece sesiones virtuales.',
  },
];

export default function EspanolPage() {
  const spanishCities = getSpanishCities();
  const allCities = getCitiesByInventory();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'es-US',
    mainEntity: FAQ.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const pageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    inLanguage: 'es-US',
    name: 'Hipnoterapia en Español',
    description:
      'Directorio de hipnoterapeutas en Estados Unidos, con consultorios que se anuncian en español.',
    url: URL,
  };

  const sectionPad = { padding: '56px 24px' };
  const h2 = { fontSize: 26, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 12 } as const;
  const lead = { fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75 } as const;

  return (
    <>
      <Script id="schema-es-page" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <Script id="schema-es-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* The root layout hardcodes <html lang="en"> and only a root layout may render
          <html> in the App Router. Reading a middleware header there would force every
          one of the site's 1,300+ static pages into dynamic rendering, so the language
          is declared on the content wrapper instead and paired with hreflang alternates
          in metadata, which is what Google actually uses for language targeting. */}
      <div lang="es" style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1, paddingTop: 100 }}>
          {/* Hero */}
          <section style={{ padding: '24px 24px 8px' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <h1 style={{ fontSize: 42, fontWeight: 800, color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Hipnoterapia en Español
              </h1>
              <p style={{ ...lead, fontSize: 17, marginBottom: 18 }}>
                Encuentra hipnoterapeutas en Estados Unidos y contáctalos directamente. Este directorio
                reúne perfiles y datos de contacto de consultorios de hipnoterapia por ciudad, e indica
                cuáles se anuncian en español para que puedas empezar por ahí.
              </p>
              <p style={{ ...lead, fontSize: 14 }}>
                Somos un directorio, no una clínica. No verificamos certificaciones, precios ni idiomas:
                esa confirmación la haces tú directamente con cada profesional. Abajo te explicamos qué
                preguntar.
              </p>
            </div>
          </section>

          {/* Search + how to find */}
          <section style={sectionPad}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <h2 style={h2}>Cómo buscar un hipnoterapeuta cerca de ti</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 24, marginBottom: 28 }}>
                {[
                  { Icon: Search, t: '1. Usa el buscador', d: 'Escribe tu ciudad o código postal para filtrar los perfiles del directorio por ubicación, especialidad y formato de sesión.' },
                  { Icon: MapPin, t: '2. Abre tu ciudad', d: 'Cada ciudad tiene su propia página con el listado completo de consultorios registrados allí.' },
                  { Icon: MessageCircle, t: '3. Pregunta por el idioma', d: 'Contacta al consultorio y confirma si atienden en español, además de formación, precio y disponibilidad.' },
                  { Icon: ShieldCheck, t: '4. Verifica antes de reservar', d: 'Pregunta por certificación, formación y supervisión. Nosotros no verificamos esos datos por ti.' },
                ].map(({ Icon, t, d }) => (
                  <div key={t} className="glass-card" style={{ padding: 20 }}>
                    <Icon size={20} style={{ color: 'var(--hf-accent)', marginBottom: 10 }} />
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 6 }}>{t}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>{d}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link
                  href="/search"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px',
                    borderRadius: 12, background: 'var(--hf-accent)', color: '#04201f',
                    fontWeight: 700, fontSize: 15, textDecoration: 'none',
                  }}
                >
                  <Search size={16} /> Buscar hipnoterapeutas
                </Link>
                <Link
                  href="/locations"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px',
                    borderRadius: 12, border: '2px solid rgba(255,255,255,0.12)',
                    color: 'var(--hf-fg)', fontWeight: 600, fontSize: 15, textDecoration: 'none',
                  }}
                >
                  <MapPin size={16} /> Ver todas las ciudades
                </Link>
              </div>
            </div>
          </section>

          {/* Spanish city pages */}
          <section style={{ ...sectionPad, background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={h2}>Ciudades con consultorios que se anuncian en español</h2>
              <p style={{ ...lead, marginBottom: 28 }}>
                Estas {spanishCities.length} ciudades tienen al menos un consultorio cuyo nombre comercial
                está en español. Cada página muestra primero esos consultorios y después el listado completo
                de la ciudad.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14 }}>
                {spanishCities.map(city => (
                  <Link
                    key={city.slug}
                    href={`/es/${city.slug}`}
                    className="glass-card hf-card-hover"
                    style={{ padding: 20, textDecoration: 'none', display: 'block' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                      <MapPin size={14} style={{ color: 'var(--hf-accent)', flexShrink: 0 }} />
                      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)' }}>{city.nombre}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>
                      Hipnoterapia en {city.nombre}, {city.estadoAbbr}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* All cities — every hub linked, so nothing is orphaned */}
          <section style={sectionPad}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={h2}>Todas las ciudades del directorio</h2>
              <p style={{ ...lead, marginBottom: 28 }}>
                El directorio cubre {allCities.length} ciudades en Estados Unidos. Estas páginas están en
                inglés, pero listan los datos de contacto de cada consultorio para que puedas preguntar
                directamente si atienden en español.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                {allCities.map(city => (
                  <Link
                    key={city.slug}
                    href={`/location/${city.slug}`}
                    className="glass-card hf-card-hover"
                    style={{ padding: 15, textAlign: 'center', textDecoration: 'none', display: 'block' }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)' }}>{city.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--hf-fg-dim)', marginTop: 3 }}>
                      {city.practitionerCount} consultorios
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* What it helps with */}
          <section style={{ ...sectionPad, background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={h2}>¿Para qué se usa la hipnoterapia?</h2>
              <p style={{ ...lead, marginBottom: 24 }}>
                Las personas suelen buscar hipnoterapia para trabajar hábitos y respuestas de estrés. Es un
                enfoque complementario: no sustituye el tratamiento médico ni psicológico, y si tienes
                síntomas importantes lo primero es hablar con un profesional de la salud.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                {[
                  ['Ansiedad y estrés', 'Manejo de la respuesta al estrés y la tensión diaria.'],
                  ['Dejar de fumar', 'Acompañamiento para dejar el tabaco.'],
                  ['Control de peso', 'Trabajo sobre hábitos alimenticios.'],
                  ['Sueño', 'Rutinas y patrones de descanso.'],
                  ['Confianza', 'Autoestima y seguridad personal.'],
                  ['Fobias', 'Miedos específicos y respuestas de evitación.'],
                ].map(([t, d]) => (
                  <div key={t} className="glass-card" style={{ padding: 18 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--hf-accent)', marginBottom: 5 }}>{t}</h3>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={sectionPad}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
              <h2 style={{ ...h2, marginBottom: 24 }}>Preguntas frecuentes</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {FAQ.map(f => (
                  <div key={f.q} className="glass-card" style={{ padding: 22 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>{f.q}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7 }}>{f.a}</p>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginTop: 28 }}>
                ¿Eres hipnoterapeuta y atiendes en español?{' '}
                <Link href="/practitioner-signup" style={{ color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 600 }}>
                  Publica tu perfil en el directorio
                </Link>
                . Actualmente hay {SPANISH_MARKETING_SLUGS.size} consultorios que se anuncian en español.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
