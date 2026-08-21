import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { MapPin, Search, CheckCircle, Users, Star } from 'lucide-react';
import { getAllPractitioners, getAllCities } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Hypnotherapist Near Me | Search Local Profiles',
  description: 'Searching hypnotherapist near me? Compare 1,150+ local profiles, shortlist nearby options, then confirm training, fees and fit directly.',
  keywords: 'hypnotherapist near me, hypnotherapy near me, local hypnotherapist near me, certified hypnotherapist near me, hypnosis therapy near me',
  alternates: { canonical: 'https://hypnotherapy-finder.com/hypnotherapy-near-me' },
  openGraph: { title: 'Hypnotherapist Near Me | Search Local Profiles', description: 'Search hypnotherapy practitioner profiles near you, compare basics, then verify credentials directly.', url: 'https://hypnotherapy-finder.com/hypnotherapy-near-me', type: 'website', images: [{ url: '/hypnotherapy-near-me.png', width: 1200, height: 630, alt: 'Find hypnotherapists near me' }] },
  twitter: { card: 'summary_large_image', title: 'Hypnotherapist Near Me | Search Local Profiles', description: 'Search hypnotherapy practitioner profiles near you, then confirm credentials directly.', images: ['/hypnotherapy-near-me.png'] },
};

export default async function HypnotherapyNearMePage() {
  const allPractitioners = getAllPractitioners();
  const cities = getAllCities();
  const featuredPractitioners = allPractitioners.filter(p => p.featured).slice(0, 6);
  const popularCities = cities.slice(0, 12);

  const jsonLd = { '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Certified Hypnotherapist Near Me - Local Hypnotherapy Directory', description: 'Directory to help people search for hypnotherapy near me.', mainEntity: { '@type': 'ItemList', name: 'How to Find Hypnotherapy Near Me', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Search by Location', description: 'Enter your city or zip code to find hypnotherapy near me' }, { '@type': 'ListItem', position: 2, name: 'Compare Relevant Services', description: 'Look for practitioners whose listed services match your concern' }, { '@type': 'ListItem', position: 3, name: 'Ask About Training', description: 'Contact practitioners directly to ask about certification, training, supervision, and approach' }, { '@type': 'ListItem', position: 4, name: 'Contact Directly', description: 'Reach out to discuss fit, session format, and next steps' }] }, provider: { '@type': 'Organization', name: 'Hypnotherapy Finder' } };
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'How do I find a certified hypnotherapist near me?', acceptedAnswer: { '@type': 'Answer', text: 'Use the directory to search hypnotherapy practitioner profiles by city, location, concern, and session type. Then contact practitioners directly to ask about their certification, training, and fit for your goals.' } }, { '@type': 'Question', name: 'What should I look for in hypnotherapy near me?', acceptedAnswer: { '@type': 'Answer', text: 'When searching for hypnotherapy near me, ask about certification, training background, supervision, relevant experience, session format, and whether their approach fits your concern.' } }, { '@type': 'Question', name: 'How much does hypnotherapy near me cost?', acceptedAnswer: { '@type': 'Answer', text: 'Hypnotherapy fees vary by practitioner, location, format, and session length. Contact practitioners directly for current pricing and package information.' } }, { '@type': 'Question', name: 'Are all listed hypnotherapists certified?', acceptedAnswer: { '@type': 'Answer', text: 'Hypnotherapy Finder lists practitioner profiles and contact details, but does not verify credentials, pricing, insurance, experience, or availability. Ask each practitioner directly about certification, training, scope, and professional memberships before booking.' } }, { '@type': 'Question', name: 'Is virtual hypnotherapy useful compared with in-person?', acceptedAnswer: { '@type': 'Answer', text: 'Many people use virtual hypnotherapy successfully when they have a private space, a stable connection, and a practitioner whose style suits online sessions.' } }] };

  const numBox = { width: 40, height: 40, borderRadius: 10, background: 'oklch(0.72 0.12 185 / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16, fontWeight: 700, color: 'var(--hf-accent)' };
  const certifiedSearchCities = [
    { href: '/location/detroit', city: 'Detroit', note: 'Use the Detroit page for local profiles, then come back here for the national certification checklist.' },
    { href: '/location/columbus', city: 'Columbus', note: 'Compare Columbus profiles locally, then verify training, scope, pricing, and availability directly.' },
    { href: '/location/atlanta', city: 'Atlanta', note: 'Browse Atlanta profiles if the search is local, but do not treat a directory listing as credential proof.' },
  ];

  const nearMeSignalCities = [
    { href: '/location/detroit', city: 'Detroit', cue: 'Detroit can help if the search is local, but the broader “near me” checklist belongs here.' },
    { href: '/location/baltimore', city: 'Baltimore', cue: 'Baltimore profiles are useful after you know the city; this page explains the first screening pass.' },
    { href: '/location/columbus', city: 'Columbus', cue: 'Columbus listings can narrow distance, but they do not replace credential and fit questions.' },
    { href: '/location/charlotte', city: 'Charlotte', cue: 'Charlotte is a city shortlist. Use this page when the search is still “near me,” not city-specific.' },
    { href: '/location/boston', city: 'Boston', cue: 'Boston profiles should support local comparison, while this page owns the national near-me process.' },
  ];

  const comparisonChecklist = [
    { title: 'Start with a local radius', body: 'Search nearby profiles first so the shortlist is practical. Distance matters for in-person sessions, but it should not be the only filter.' },
    { title: 'Confirm the contact path', body: 'Open the practitioner website or phone details and check how they prefer to be contacted. Do not assume a profile means current availability.' },
    { title: 'Ask the certification question', body: 'Ask which certification or training they completed, what it covered, and whether they belong to any professional organisation.' },
    { title: 'Match the work to your goal', body: 'Explain whether you are asking about anxiety, smoking cessation, sleep, phobias, habits, confidence, or another concern, then ask how they would approach it.' },
    { title: 'Check boundaries', body: 'A safe practitioner can explain what hypnotherapy may support and when medical or mental-health care is the better next step.' },
    { title: 'Compare practical fit', body: 'Before booking, confirm fees, session format, location, online options, package structure, and cancellation terms directly with the practitioner.' },
  ];

  const nearMeMistakes = [
    { title: 'Treating “near me” as proof of quality', body: 'A nearby practitioner may be convenient, but distance does not verify certification, training, scope, pricing, or fit. Use proximity to build the first shortlist, then verify the important details directly.' },
    { title: 'Stopping at the first city page', body: 'A Detroit, Baltimore, Columbus, Charlotte, or Boston listing can be useful once the city is clear. A broad hypnotherapist near me search needs a comparison process first, not just one local page.' },
    { title: 'Assuming the directory has checked credentials', body: 'Hypnotherapy Finder helps people discover practitioner profiles and contact details. It is not a credential-verification service, so certification and professional boundaries should be confirmed before booking.' },
    { title: 'Ignoring online session options', body: 'If in-person choices are thin in your area, ask whether online hypnotherapy is appropriate for your goal, privacy setup, and comfort level. Many people compare both before deciding.' },
  ];

  return (
    <>
      <Script id="schema-medical" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} strategy="beforeInteractive" />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} strategy="beforeInteractive" />

      <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: 80 }}>

          {/* Hero */}
          <section style={{ background: 'var(--hf-bg-mid)', padding: '72px 24px 64px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Find Local Practitioners</span>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                Hypnotherapist Near Me: How to Search Without Guessing
              </h1>
              <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 32 }}>
                Searching <strong style={{ color: 'var(--hf-fg)' }}>hypnotherapist near me</strong>? Use Hypnotherapy Finder to search 1,150+ hypnotherapy practitioner profiles in your area, compare listed services and contact details, then ask each practitioner directly about certification, training, scope, fees, and availability before booking.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Search Hypnotherapists Near Me
                </Link>
                <Link href="#how-to-find" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  How to Find the Right Hypnotherapist
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          <section style={{ padding: '48px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ position: 'relative', width: '100%', height: 400, borderRadius: 16, overflow: 'hidden', background: 'var(--hf-bg-mid)' }}>
                <Image src="/hypnotherapy-near-me.png" alt="Find hypnotherapists near me with a directory showing local practitioner profiles for anxiety, weight loss, and smoking cessation hypnotherapy" fill className="object-cover" priority />
              </div>
            </div>
          </section>

          {/* Stats */}
          <section style={{ padding: '56px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, textAlign: 'center' }}>
                {[
                  { icon: Users, value: `${allPractitioners.length.toLocaleString()}+`, label: 'Listed Hypnotherapy Profiles' },
                  { icon: MapPin, value: `${cities.length}+`, label: 'Cities Across the US' },
                  { icon: Star, value: '100%', label: 'Free to Use' },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'oklch(0.72 0.12 185 / 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                      <s.icon style={{ width: 24, height: 24, color: 'var(--hf-accent)' }} />
                    </div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 6 }}>{s.value}</div>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* What It Means */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What Does "Hypnotherapy Near Me" Mean?</h2>
              <div style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>When you search for <strong style={{ color: 'var(--hf-fg)' }}>hypnotherapy near me</strong>, you're usually looking for a local practitioner you can compare before booking. A directory helps you narrow the search by city, contact details, website, and the type of support you want to discuss.</p>
                <p style={{ marginBottom: 16 }}>Finding a local hypnotherapist can make practical questions easier: travel time, in-person session options, neighbourhood access, and whether online sessions are available if you prefer not to commute. Many people searching for hypnotherapy near me want a short list they can contact directly, not another generic wellness article.</p>
                <p>Our hypnotherapy directory makes it easier to find hypnotherapists near you. Whether you're researching hypnotherapy for anxiety, weight loss hypnotherapy, smoking cessation, or other support, use each profile as a starting point and confirm certification, scope, fees, and availability with the practitioner directly.</p>
              </div>
            </div>
          </section>

          {/* Near Me Search Intent */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 880, margin: '0 auto' }}>
              <div className="glass-card" style={{ padding: '36px' }}>
                <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Hypnotherapist Near Me: When to Use the National Page Instead of a City Page</h2>
                <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 18 }}>
                  A search for <strong style={{ color: 'var(--hf-fg)' }}>hypnotherapist near me</strong> is usually not asking for a single city article. It is asking for a safe way to move from “who is nearby?” to “who should I contact first?” City pages help once you know the location. This page should own the broader search because it explains the comparison process before you start booking calls.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
                  {nearMeSignalCities.map((item) => (
                    <Link key={item.href} href={item.href} className="glass-card hf-card-hover" style={{ display: 'block', padding: '20px', textDecoration: 'none' }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-accent)', marginBottom: 8 }}>{item.city} local profiles</h3>
                      <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>{item.cue}</p>
                    </Link>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginTop: 18, marginBottom: 0 }}>
                  Use local pages for geography. Use this <strong style={{ color: 'var(--hf-fg)' }}>hypnotherapist near me</strong> page for the shortlist logic: check location, confirm contact details, ask about certification and training directly, compare session format, and only then decide who is worth contacting.
                </p>
              </div>
            </div>
          </section>

          {/* Certified Search Intent */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 880, margin: '0 auto' }}>
              <div className="glass-card" style={{ padding: '36px' }}>
                <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>How to Find a Certified Hypnotherapist Near Me</h2>
                <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 18 }}>
                  Search results often make every practitioner sound interchangeable. They are not. If your real question is <strong style={{ color: 'var(--hf-fg)' }}>how to find a certified hypnotherapist near me</strong>, use this page to build a shortlist, then verify the details directly before booking.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
                  {[
                    { title: 'Confirm credentials directly', body: 'Ask where they trained, what certification they hold, whether they belong to any professional associations, and how they stay within scope.' },
                    { title: 'Match method to your concern', body: 'Ask whether they use direct suggestion, Ericksonian hypnotherapy, parts work, regression-informed work, NLP, or another approach — and why that fits your goal.' },
                    { title: 'Check practical fit', body: 'Compare location, online session options, first-contact process, and whether they can explain session structure clearly before you book.' },
                  ].map((item) => (
                    <div key={item.title} style={{ padding: '20px', borderRadius: 12, background: 'rgba(255,255,255,0.03)' }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>{item.title}</h3>
                      <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginTop: 18, marginBottom: 0 }}>
                  Hypnotherapy Finder lists practitioner profiles and contact details. It does not verify credentials, pricing, insurance, experience, or availability, so the safest next step is always a direct conversation with the practitioner.
                </p>
              </div>
            </div>
          </section>

          {/* Search Path */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 880, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Certified Hypnotherapist Near Me: The Search Path That Avoids Bad Assumptions</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 22 }}>
                The phrase <strong style={{ color: 'var(--hf-fg)' }}>certified hypnotherapist near me</strong> combines two separate jobs. “Near me” means finding local options. “Certified” means confirming training, scope, and professional boundaries. A directory can help with the first job; the second requires direct questions before you book.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 18 }}>
                {[
                  { step: '1', title: 'Search the local area', body: 'Start with city or ZIP-level options so the shortlist is practical. Open profiles for name, address, phone, website, and category.' },
                  { step: '2', title: 'Separate listing from credential', body: 'Do not assume the word “certified” from a directory profile. Ask the practitioner which certification they hold and what training it involved.' },
                  { step: '3', title: 'Check fit for the concern', body: 'Ask whether they work with your goal — anxiety, smoking cessation, sleep, phobias, habits, or confidence — and when they would refer to healthcare support.' },
                  { step: '4', title: 'Confirm the booking details', body: 'Fees, insurance, session format, availability, and package structure can change. Confirm them directly instead of relying on old web listings.' },
                ].map((item) => (
                  <div key={item.step} className="glass-card" style={{ padding: '22px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={numBox}>{item.step}</div>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>{item.title}</h3>
                      <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Certification Checklist */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 880, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Certified Hypnotherapist Near Me: What to Verify Before Booking</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 24 }}>
                A search for <strong style={{ color: 'var(--hf-fg)' }}>certified hypnotherapist near me</strong> is really a search for confidence. The directory can help you find local names, websites, phone numbers, and service categories. Certification itself should be confirmed with the practitioner, because training standards, professional memberships, supervision, and legal scope vary by location.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
                {[
                  { title: 'Ask for the certification name', body: 'Request the full training organisation or credential name, not just “certified.” A credible practitioner should be able to explain where they trained and what that credential covers.' },
                  { title: 'Check scope and referral boundaries', body: 'Ask when they would refer you to a physician, psychologist, psychiatrist, or another licensed healthcare provider. Clear boundaries are a strength, not a red flag.' },
                  { title: 'Match training to your concern', body: 'If you are asking about anxiety, smoking cessation, phobias, sleep, pain support, or trauma history, ask how their training applies to that concern and what they do not work with.' },
                  { title: 'Confirm the practical details', body: 'Before booking, confirm session format, location, online options, fees, package structure, cancellation policy, and availability directly with the practitioner.' },
                ].map((item) => (
                  <div key={item.title} className="glass-card" style={{ padding: '22px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, padding: '24px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 12 }}>Use the directory first, then verify the word “certified”</h3>
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 14 }}>
                  City pages can help when you already know where you want to search. This page is the better starting point when the query is broader: <strong style={{ color: 'var(--hf-fg)' }}>certified hypnotherapist near me</strong>, <strong style={{ color: 'var(--hf-fg)' }}>hypnotherapist near me</strong>, or <strong style={{ color: 'var(--hf-fg)' }}>hypnosis therapy near me</strong>. It keeps the task in the right order: find local profiles, compare the basics, then verify training directly.
                </p>
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, margin: 0 }}>
                  Treat “near me” as a location filter, not a quality signal. The closest practitioner is not automatically the right fit, and the word “certified” should never be assumed from a directory listing alone.
                </p>
              </div>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginTop: 24, marginBottom: 0 }}>
                If you are experiencing significant symptoms, hypnotherapy should be treated as a complementary approach. Speak with a qualified healthcare provider about medical or mental-health concerns, and use hypnotherapy as part of a wider support plan when appropriate.
              </p>
            </div>
          </section>

          {/* Near Me Qualification Matrix */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 880, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Certified Hypnotherapist Near Me: Questions That Actually Sort the Shortlist</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 22 }}>
                The fastest way to waste a “near me” search is to compare profiles by distance alone. Use the local listing to find names, websites, and phone numbers, then ask the questions that a search result cannot answer for you.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
                {[
                  { title: 'Certification and training', body: '“Which certification or training program did you complete, and what did it cover?” Good answers are specific. Vague claims should slow you down.' },
                  { title: 'Scope and referral boundaries', body: '“What do you work with, and when would you refer me to a licensed healthcare provider?” Clear limits are safer than big promises.' },
                  { title: 'Method and session structure', body: '“Do you use direct suggestion, Ericksonian hypnotherapy, parts work, regression-informed work, NLP, or another approach?” Ask how a first session is usually structured.' },
                  { title: 'Practical booking details', body: '“Do you offer in-person or online sessions, what are current fees, and what availability do you have?” Confirm these directly because directory records can lag.' },
                ].map((item) => (
                  <div key={item.title} className="glass-card" style={{ padding: '22px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-accent)', marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginTop: 22, marginBottom: 0 }}>
                This is why the national <strong style={{ color: 'var(--hf-fg)' }}>certified hypnotherapist near me</strong> page should own broad “near me” searches. City pages are useful when the city matters; this page is useful when the real job is comparing local options without assuming credentials from a listing.
              </p>
            </div>
          </section>

          {/* Near Me Mistakes */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Hypnotherapist Near Me: Common Search Mistakes</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 24 }}>
                Search Console shows broad <strong style={{ color: 'var(--hf-fg)' }}>hypnotherapist near me</strong> searches can land on city pages even when the person has not chosen a city yet. Use this page when the job is comparing local options safely; use a city page only after geography is the deciding filter.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
                {nearMeMistakes.map((item) => (
                  <div key={item.title} className="glass-card" style={{ padding: '22px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-accent)', marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Comparison Framework */}
          <section id="near-me-comparison" style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Hypnotherapist Near Me: The Comparison Framework</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 24 }}>
                The best use of a <strong style={{ color: 'var(--hf-fg)' }}>hypnotherapist near me</strong> search is not to pick the first nearby result. It is to build a shortlist, remove bad assumptions, and contact the practitioners who look relevant enough to verify directly.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
                {comparisonChecklist.map((item) => (
                  <div key={item.title} className="glass-card" style={{ padding: '22px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-accent)', marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, padding: '24px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 12 }}>Use city pages as supporting pages, not the whole decision</h3>
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 14 }}>
                  Detroit, Baltimore, Columbus, Charlotte, and Boston pages are useful once you know the city. This page is the better match when the search is broad — <strong style={{ color: 'var(--hf-fg)' }}>hypnotherapist near me</strong> — because it explains how to compare local options across the directory before you book.
                </p>
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, margin: 0 }}>
                  Start with the <Link href="/search" className="hf-link-hover" style={{ color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 500 }}>search tool</Link>, browse <Link href="/locations" className="hf-link-hover" style={{ color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 500 }}>city pages</Link> only when geography matters, and use the broader <Link href="/find-a-hypnotherapist" className="hf-link-hover" style={{ color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 500 }}>hypnotherapist directory</Link> when you want to compare by concern and session type.
                </p>
              </div>
            </div>
          </section>

          {/* How to Find */}
          <section id="how-to-find" style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 32 }}>How to Find the Best Hypnotherapist Near Me</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { n: '1', title: 'Ask About Credentials and Certification', body: 'When searching for a certified hypnotherapist near me, ask each practitioner directly about their certification, training organisation, continuing education, supervision, and professional boundaries. The directory is a discovery tool, not a credential-verification service.' },
                  { n: '2', title: 'Match Their Services to Your Concern', body: "Different hypnotherapists near you may focus on different concerns. Some work with anxiety and stress, while others focus on habit change, smoking cessation, phobias, sleep, or confidence. Use the profile details to create a shortlist, then confirm the fit directly." },
                  { n: '3', title: 'Consider Location and Session Format', body: 'Finding hypnotherapy near me means checking practical factors like travel time, parking, online session options, accessibility, and whether the practitioner works in the way you prefer. Confirm current availability before making plans.' },
                  { n: '4', title: 'Check Their Website and Questions to Ask', body: "A useful practitioner website should explain their approach, training background, session process, boundaries, and contact process. If anything is unclear, ask before booking rather than assuming." },
                  { n: '5', title: 'Use the First Contact to Test Fit', body: 'Your first call or message is a chance to discuss your goals, ask how they work, and decide whether you feel comfortable. Hypnotherapy is collaborative, so fit matters as much as distance.' },
                ].map((step) => (
                  <div key={step.n} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={numBox}>{step.n}</div>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 8 }}>{step.title}</h3>
                      <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Practitioners */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Featured Hypnotherapist Profiles Near You</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>Browse hypnotherapy practitioner profiles in your area. Use each profile to compare location and contact details, then confirm training, certification, services, and availability directly.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
                {featuredPractitioners.map((practitioner) => (
                  <div key={practitioner.id} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 6 }}>{practitioner.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                      <MapPin style={{ width: 12, height: 12, color: 'var(--hf-fg-dim)' }} />
                      <span style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>{practitioner.city}, {practitioner.state}</span>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.5, marginBottom: 16 }}>Open the profile for contact details and website information. Confirm credentials and current services directly with the practitioner.</p>
                    <Link href={`/practitioner/${practitioner.slug}`} className="btn-gradient hf-btn-accent" style={{ display: 'block', textAlign: 'center', padding: '9px', borderRadius: 8, color: '#fff', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>View Profile</Link>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>View All Hypnotherapists Near Me</Link>
              </div>
            </div>
          </section>

          {/* Popular Cities */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find Hypnotherapy in Popular Cities</h2>
              <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--hf-fg-dim)', marginBottom: 40 }}>Looking for hypnotherapy near me in a specific city? Browse our location pages to find hypnotherapist profiles in major cities across the United States.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                {popularCities.map((city) => (
                  <Link key={city.slug} href={`/location/${city.slug}`} className="glass-card hf-card-hover" style={{ display: 'block', padding: '16px', textAlign: 'center', textDecoration: 'none' }}>
                    <MapPin style={{ width: 16, height: 16, color: 'var(--hf-accent)', margin: '0 auto 8px' }} />
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 4 }}>{city.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>{city.practitionerCount} practitioners</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* What Helps */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>What Can Hypnotherapy Near Me Help With?</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 32 }}>When you find a hypnotherapist near you, the next step is to ask whether their approach fits the concern you want support with. Hypnotherapy is a complementary approach. If you're experiencing significant symptoms, please consult a qualified healthcare provider.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
                {[
                  { title: 'Mental Health & Wellness', items: [['Anxiety and Stress', 'Ask about support for nervous-system regulation and coping rehearsal'], ['Low Mood', 'Use hypnotherapy only as a complement to appropriate healthcare'], ['Trauma History', 'Ask about trauma-informed training and referral boundaries'], ['Phobias and Fears', 'Discuss graded rehearsal and safety-focused imagery']] },
                  { title: 'Behavioral Change', items: [['Smoking Cessation', 'Ask about stop-smoking hypnotherapy near me and follow-up structure'], ['Weight Loss', 'Discuss habit loops, cravings, and realistic behaviour change'], ['Unwanted Habits', 'Map triggers, automatic responses, and replacement behaviours'], ['Sleep Issues', 'Ask about pre-sleep cues and relaxation practice']] },
                  { title: 'Pain Support', items: [['Chronic Pain', 'Discuss complementary support alongside medical care'], ['Headaches', 'Ask whether stress, tension, and relaxation work are in scope'], ['Digestive Issues', 'Ask about gut-directed hypnotherapy and medical referral boundaries']] },
                  { title: 'Performance Enhancement', items: [['Sports Performance', 'Rehearse focus, confidence, and pressure moments'], ['Public Speaking', 'Practice calm preparation and stage imagery'], ['Confidence Building', 'Work on self-talk, future pacing, and situation rehearsal']] },
                ].map((group) => (
                  <div key={group.title} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-accent)', marginBottom: 14 }}>{group.title}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {group.items.map(([label, desc]) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <CheckCircle style={{ width: 14, height: 14, color: 'oklch(0.7 0.15 145)', flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.5 }}><strong style={{ color: 'var(--hf-fg)' }}>{label}:</strong> {desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Local vs Certified Search Intent */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 880, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 18 }}>Certified Hypnotherapist Near Me: Local Search Without Guesswork</h2>
              <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.75, marginBottom: 18 }}>
                Search engines often send “certified hypnotherapist near me” queries to individual city pages because the query has local intent. That can be useful if you are already searching in Detroit, Columbus, Atlanta, or another listed city — but the safer starting point is a national directory page that explains how to compare local profiles without assuming credentials from a listing.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, marginBottom: 22 }}>
                {certifiedSearchCities.map((item) => (
                  <Link key={item.href} href={item.href} className="glass-card hf-card-hover" style={{ display: 'block', padding: '22px', textDecoration: 'none' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-accent)', marginBottom: 8 }}>Certified hypnotherapist near me in {item.city}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.65, margin: 0 }}>{item.note}</p>
                  </Link>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
                {[
                  { title: 'Start with location', body: 'Search by city or area first so you are comparing practitioners who are actually practical to contact. Then narrow by the concern you want to discuss.' },
                  { title: 'Verify certification yourself', body: 'A profile can show name, location, phone, website, and category. It cannot prove training quality. Ask the practitioner for the certification name, training organisation, and scope directly.' },
                  { title: 'Compare fit, not just distance', body: 'The nearest practitioner is not automatically the right one. Ask how they structure sessions, whether they work online, and how they handle referral boundaries when healthcare support is more appropriate.' },
                ].map((item) => (
                  <div key={item.title} className="glass-card" style={{ padding: '22px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginTop: 20, marginBottom: 0 }}>
                If you are comparing city pages first, use them as local entry points, then return here for the broader checklist on how to find a certified hypnotherapist near me safely and what to ask before booking.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ padding: '64px 24px', background: 'var(--hf-bg-mid)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 32 }}>Frequently Asked Questions About Hypnotherapy Near Me</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { q: 'How do I find a certified hypnotherapist near me?', a: 'Use the free directory to search hypnotherapist profiles in your area, then contact practitioners directly to confirm certification, training, supervision, scope, fees, and whether they work with your concern.' },
                  { q: 'How much does hypnotherapy near me cost?', a: 'Hypnotherapy costs vary by location, session length, format, and practitioner. Contact practitioners directly through the directory for current rates and package information.' },
                  { q: 'Is online hypnotherapy useful compared with in-person?', a: 'Many people prefer online sessions for convenience, while others prefer the structure of in-person appointments. Ask each practitioner how they run online sessions and what setup they recommend.' },
                  { q: 'How many sessions will I need?', a: 'The number of sessions depends on your goals, history, and the practitioner’s approach. Ask about the expected process, review points, and when they would recommend medical or mental-health support instead.' },
                  { q: 'Are all listed hypnotherapists certified?', a: 'No directory profile should be treated as proof of certification. Hypnotherapy Finder helps you find names, locations, phone numbers, websites, and service categories; certification, training, insurance, fees, experience, and availability should be confirmed directly with the practitioner.' },
                  { q: 'What should I look for when choosing a hypnotherapist near me?', a: "Look for clear training information, sensible boundaries, relevant experience, transparent communication, and someone you feel comfortable speaking with. Do not assume credentials, price, or availability from a directory profile — confirm directly." },
                ].map((item) => (
                  <div key={item.q} className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 10 }}>{item.q}</h3>
                    <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section style={{ padding: '48px 24px', background: 'var(--hf-bg)' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 24 }}>Related Hypnotherapy Resources</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                {[
                  { href: '/what-is-hypnotherapy', title: 'What is Hypnotherapy?', desc: 'Learn everything about hypnotherapy and how it works' },
                  { href: '/hypnotherapy-for-anxiety', title: 'Hypnotherapy for Anxiety', desc: 'Learn how hypnotherapy may support anxiety and stress work' },
                  { href: '/does-hypnotherapy-work', title: 'Does Hypnotherapy Work?', desc: 'Research context, limits, and realistic expectations for hypnotherapy' },
                ].map((link) => (
                  <a key={link.href} href={link.href} className="glass-card hf-card-hover" style={{ display: 'block', padding: '20px', textDecoration: 'none' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-accent)', marginBottom: 6 }}>{link.title}</h3>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.5, margin: 0 }}>{link.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg, oklch(0.25 0.05 185), oklch(0.18 0.03 240))', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Ready to Find Your Hypnotherapist?</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.6 }}>Search our free directory of hypnotherapy practitioner profiles. Find hypnotherapists near you, compare the basics, and contact them directly to confirm fit.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Search style={{ width: 16, height: 16 }} /> Find Hypnotherapists Near Me
                </Link>
                <Link href="/how-it-works" className="glass hf-glass-hover" style={{ padding: '14px 28px', borderRadius: 10, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                  Learn About Hypnotherapy
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
