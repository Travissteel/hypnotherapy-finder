import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { MapPin, Search, CheckCircle, Users, Star, Shield, Award } from 'lucide-react';
import { getAllPractitioners, getAllCities } from '@/lib/data/practitioners';

export const metadata = {
    title: 'Find a Hypnotherapist | Search 1,150+ Verified Practitioners',
    description: 'Find a hypnotherapist near you. Search our directory of 1,150+ certified hypnotherapy practitioners. Compare credentials, specialties, and contact hypnotherapists directly.',
    keywords: 'find a hypnotherapist, find hypnotherapist, hypnotherapist finder, search hypnotherapist, hypnotherapist directory, certified hypnotherapist',
    alternates: {
        canonical: 'https://hypnotherapy-finder.com/find-a-hypnotherapist',
    },
    openGraph: {
        title: 'Find a Hypnotherapist | Search 1,150+ Verified Practitioners',
        description: 'Find a hypnotherapist near you. Search our directory of 1,150+ certified hypnotherapy practitioners.',
        url: 'https://hypnotherapy-finder.com/find-a-hypnotherapist',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Find a Hypnotherapist | Search 1,150+ Verified Practitioners',
        description: 'Find a hypnotherapist near you. Search our directory of 1,150+ certified practitioners.',
    },
};

export default async function FindAHypnotherapistPage() {
    const allPractitioners = getAllPractitioners();
    const cities = getAllCities();
    const topCities = cities.slice(0, 8);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Find a Hypnotherapist',
        description: 'Directory to find a qualified hypnotherapist near you. Search by location, specialty, and credentials.',
        mainEntity: {
            '@type': 'ItemList',
            name: 'Steps to Find a Hypnotherapist',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Search by Location', description: 'Enter your city or zip code to find hypnotherapists near you' },
                { '@type': 'ListItem', position: 2, name: 'Filter by Specialty', description: 'Choose from anxiety, weight loss, smoking cessation, and more' },
                { '@type': 'ListItem', position: 3, name: 'Compare Practitioners', description: 'Review credentials, experience, and specialties' },
                { '@type': 'ListItem', position: 4, name: 'Contact Directly', description: 'Reach out to schedule your consultation' },
            ],
        },
        provider: { '@type': 'Organization', name: 'Hypnotherapy Finder' },
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'How do I find a hypnotherapist near me?',
                acceptedAnswer: { '@type': 'Answer', text: 'To find a hypnotherapist, use our free directory search. Enter your location to browse certified practitioners in your area. You can filter by specialty, credentials, and session type (in-person or virtual) to find the perfect match.' },
            },
            {
                '@type': 'Question',
                name: 'What qualifications should a hypnotherapist have?',
                acceptedAnswer: { '@type': 'Answer', text: 'When you find a hypnotherapist, look for certifications from recognized organizations like NGH (National Guild of Hypnotists), IACT (International Association of Counselors & Therapists), or ABH (American Board of Hypnotherapy). Experience in your specific concern area is also important.' },
            },
            {
                '@type': 'Question',
                name: 'How much does a hypnotherapist charge?',
                acceptedAnswer: { '@type': 'Answer', text: 'Hypnotherapist fees typically range from $75-$250 per session, with most charging $125-$175. Initial consultations may cost more. Many offer package deals for multiple sessions, and some accept insurance when provided by a licensed healthcare professional.' },
            },
        ],
    };

    const howToSteps = [
        { icon: Search, title: '1. Search by Location', desc: `Enter your city or zip code to find hypnotherapists in your area. Our directory covers ${cities.length}+ cities across the United States.` },
        { icon: Star, title: '2. Filter by Specialty', desc: 'Find a hypnotherapist who specializes in your specific concern—anxiety, weight loss, smoking cessation, phobias, or pain management.' },
        { icon: Award, title: '3. Check Credentials', desc: 'Review each hypnotherapist\'s certifications, experience, and specialties. Look for NGH, IACT, or ABH certified practitioners.' },
        { icon: CheckCircle, title: '4. Contact Directly', desc: 'Once you find a hypnotherapist you like, contact them directly through their profile to schedule an initial consultation.' },
    ];

    const treatmentAreas = [
        { title: 'Mental Health & Wellness', items: ['Anxiety and stress relief', 'Depression support', 'PTSD and trauma processing', 'Phobia treatment'] },
        { title: 'Behavioral Change', items: ['Smoking cessation', 'Weight loss and healthy eating', 'Breaking bad habits', 'Sleep improvement'] },
    ];

    const faqs = [
        { q: 'How do I find a hypnotherapist near me?', a: 'Use our free search tool to find hypnotherapists in your area. Enter your location, filter by specialty, and browse profiles to find a qualified practitioner. All hypnotherapists in our directory are verified and certified.' },
        { q: 'What qualifications should I look for?', a: 'When you find a hypnotherapist, look for certifications from recognized organizations like NGH (National Guild of Hypnotists), IACT, or ABH. Consider their experience, specialties, and whether they\'ve worked with your specific concern before.' },
        { q: 'How much does a hypnotherapist cost?', a: 'Hypnotherapy sessions typically cost $75-$250 per hour, with most practitioners charging $125-$175. Many offer package deals for multiple sessions. Some hypnotherapists accept insurance when they\'re also licensed healthcare providers.' },
    ];

    return (
        <>
            <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} strategy="beforeInteractive" />
            <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} strategy="beforeInteractive" />

            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header />

                <main style={{ flex: 1, paddingTop: 80 }}>
                    {/* Hero */}
                    <section style={{ background: 'linear-gradient(to bottom, oklch(0.22 0.06 185), var(--hf-bg))', padding: '80px 0' }}>
                        <div style={{ maxWidth: 896, margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
                            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 24, lineHeight: 1.15 }}>
                                Find a Hypnotherapist
                            </h1>
                            <p style={{ fontSize: 18, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.7, maxWidth: 640, margin: '0 auto 32px' }}>
                                Search {allPractitioners.length.toLocaleString()}+ certified hypnotherapists. Find a qualified practitioner near you specialising in anxiety, weight loss, smoking cessation, and more.
                            </p>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 12, color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                                    <Search style={{ width: 20, height: 20 }} />
                                    Search Hypnotherapists Now
                                </Link>
                                <Link href="/hypnotherapy-near-me" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', borderRadius: 12, border: '2px solid rgba(255,255,255,0.18)', color: 'var(--hf-fg)', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                                    Find Hypnotherapy Near Me
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Stats */}
                    <section style={{ padding: '64px 0', background: 'var(--hf-bg-mid)' }}>
                        <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, textAlign: 'center' }}>
                                {[
                                    { Icon: Users, value: `${allPractitioners.length.toLocaleString()}+`, label: 'Verified Hypnotherapists' },
                                    { Icon: MapPin, value: `${cities.length}+`, label: 'Cities Covered' },
                                    { Icon: Shield, value: '100%', label: 'Free to Search' },
                                ].map(({ Icon, value, label }) => (
                                    <div key={label}>
                                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                                            <div style={{ padding: 16, background: 'oklch(0.72 0.12 185 / 0.15)', borderRadius: 9999 }}>
                                                <Icon style={{ width: 32, height: 32, color: 'var(--hf-accent)' }} />
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 8 }}>{value}</div>
                                        <p style={{ color: 'var(--hf-fg-dim)', fontSize: 15 }}>{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* How to Find */}
                    <section style={{ padding: '64px 0' }}>
                        <div style={{ maxWidth: 896, margin: '0 auto', padding: '0 16px' }}>
                            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>How to Find a Hypnotherapist</h2>
                            <p style={{ textAlign: 'center', color: 'var(--hf-fg-dim)', marginBottom: 48, maxWidth: 520, margin: '0 auto 48px' }}>
                                Finding the right hypnotherapist is easy with our comprehensive directory. Follow these steps to find a qualified practitioner near you.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                                {howToSteps.map(({ icon: Icon, title, desc }) => (
                                    <div key={title} className="glass-card" style={{ padding: 24 }}>
                                        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                            <div style={{ padding: 12, background: 'oklch(0.72 0.12 185 / 0.15)', borderRadius: 12, flexShrink: 0 }}>
                                                <Icon style={{ width: 24, height: 24, color: 'var(--hf-accent)' }} />
                                            </div>
                                            <div>
                                                <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 8 }}>{title}</h3>
                                                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.65 }}>{desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Browse by City */}
                    <section style={{ padding: '64px 0', background: 'var(--hf-bg-mid)' }}>
                        <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 16px' }}>
                            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find a Hypnotherapist by City</h2>
                            <p style={{ textAlign: 'center', color: 'var(--hf-fg-dim)', marginBottom: 32 }}>
                                Browse certified hypnotherapists in major cities across the United States
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                                {topCities.map((city) => (
                                    <Link
                                        key={city.slug}
                                        href={`/location/${city.slug}`}
                                        className="glass-card"
                                        style={{ padding: 16, textAlign: 'center', textDecoration: 'none', display: 'block' }}
                                    >
                                        <MapPin style={{ width: 20, height: 20, color: 'var(--hf-accent)', margin: '0 auto 8px' }} />
                                        <div style={{ fontWeight: 600, color: 'var(--hf-fg)', fontSize: 15 }}>{city.name}</div>
                                        <div style={{ fontSize: 12, color: 'var(--hf-fg-dim)', marginTop: 2 }}>{city.practitionerCount} practitioners</div>
                                    </Link>
                                ))}
                            </div>
                            <div style={{ textAlign: 'center', marginTop: 32 }}>
                                <Link href="/locations" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 28px', borderRadius: 12, border: '2px solid rgba(255,255,255,0.12)', color: 'var(--hf-fg)', fontWeight: 600, textDecoration: 'none', fontSize: 15 }}>
                                    View All Locations →
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* What Hypnotherapists Treat */}
                    <section style={{ padding: '64px 0' }}>
                        <div style={{ maxWidth: 896, margin: '0 auto', padding: '0 16px' }}>
                            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 48 }}>What Can a Hypnotherapist Help With?</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                                {treatmentAreas.map(({ title, items }) => (
                                    <div key={title} className="glass-card" style={{ padding: 24 }}>
                                        <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 16 }}>{title}</h3>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                            {items.map((item) => (
                                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--hf-fg-dim)' }}>
                                                    <CheckCircle style={{ width: 16, height: 16, color: 'oklch(0.7 0.15 145)', flexShrink: 0 }} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section style={{ padding: '64px 0', background: 'var(--hf-bg-mid)' }}>
                        <div style={{ maxWidth: 896, margin: '0 auto', padding: '0 16px' }}>
                            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 48 }}>Frequently Asked Questions</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {faqs.map(({ q, a }) => (
                                    <div key={q} className="glass-card" style={{ padding: 24 }}>
                                        <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 10 }}>{q}</h3>
                                        <p style={{ color: 'var(--hf-fg-dim)', lineHeight: 1.7, fontSize: 14 }}>{a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, oklch(0.28 0.1 185 / 0.6), oklch(0.2 0.08 220 / 0.6))' }}>
                        <div style={{ maxWidth: 672, margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
                            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 16 }}>Ready to Find a Hypnotherapist?</h2>
                            <p style={{ fontSize: 18, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.7 }}>
                                Search our directory of {allPractitioners.length.toLocaleString()}+ certified practitioners and find the right hypnotherapist for you today.
                            </p>
                            <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 12, color: '#fff', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
                                <Search style={{ width: 20, height: 20 }} />
                                Find a Hypnotherapist Now
                            </Link>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
