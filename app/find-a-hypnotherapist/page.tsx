import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { MapPin, Search, CheckCircle, Users, Star, Shield, Award } from 'lucide-react';
import { getAllPractitioners, getAllCities } from '@/lib/data/practitioners';

export const metadata = {
    title: 'Hypnotherapists Directory | Find Hypnotherapists',
    description: 'Browse a US hypnotherapists directory with 1,150+ profiles. Compare location, focus areas, session format, and contact details before reaching out directly.',
    keywords: 'hypnotherapists, hypnotherapist directory, find a hypnotherapist, find hypnotherapist, hypnotherapist finder, search hypnotherapist',
    alternates: {
        canonical: 'https://hypnotherapy-finder.com/find-a-hypnotherapist',
    },
    openGraph: {
        title: 'Hypnotherapists Directory | Find Hypnotherapists',
        description: 'Browse a US hypnotherapists directory with 1,150+ profiles and compare practical details before contacting practitioners directly.',
        url: 'https://hypnotherapy-finder.com/find-a-hypnotherapist',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Hypnotherapists Directory | Find Hypnotherapists',
        description: 'Browse 1,150+ hypnotherapist profiles in a US hypnotherapists directory and compare practical details before contacting practitioners directly.',
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
        description: 'Directory to find hypnotherapist profiles near you. Search by location, focus area, and contact details, then confirm credentials directly.',
        mainEntity: {
            '@type': 'ItemList',
            name: 'Steps to Find a Hypnotherapist',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Search by Location', description: 'Enter your city or zip code to find hypnotherapists near you' },
                { '@type': 'ListItem', position: 2, name: 'Filter by Specialty', description: 'Choose from anxiety, weight loss, smoking cessation, and more' },
                { '@type': 'ListItem', position: 3, name: 'Compare Practitioners', description: 'Review listed details, focus areas, and contact information, then confirm credentials directly' },
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
                acceptedAnswer: { '@type': 'Answer', text: 'To find a hypnotherapist, use our free directory search. Enter your location to browse hypnotherapist profiles in your area. You can filter by focus area and session type, then confirm certification, training, fees, and availability directly with the practitioner before booking.' },
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
            {
                '@type': 'Question',
                name: 'What should a hypnotherapists directory show?',
                acceptedAnswer: { '@type': 'Answer', text: 'A hypnotherapists directory should help you compare location, focus areas, session format, website, phone number, and basic profile details. It should also make clear which details need to be confirmed directly, including certification, fees, insurance, availability, and professional scope.' },
            },
        ],
    };

    const howToSteps = [
        { icon: Search, title: '1. Search by Location', desc: `Enter your city or zip code to find hypnotherapists in your area. Our directory covers ${cities.length}+ cities across the United States.` },
        { icon: Star, title: '2. Filter by Specialty', desc: 'Find a hypnotherapist who specializes in your specific concern—anxiety, weight loss, smoking cessation, phobias, or pain management.' },
        { icon: Award, title: '3. Confirm Training', desc: 'Use each profile as a starting point. Ask the practitioner directly about certification, professional training, supervision, focus areas, and whether their approach fits your concern.' },
        { icon: CheckCircle, title: '4. Contact Directly', desc: 'Once you find a hypnotherapist you like, contact them directly through their profile to schedule an initial consultation.' },
    ];

    const treatmentAreas = [
        { title: 'Mental Health & Wellness', items: ['Anxiety and stress support', 'Depression support', 'PTSD and trauma-informed support', 'Phobia support'] },
        { title: 'Behavioral Change', items: ['Smoking cessation support', 'Weight loss and healthy eating support', 'Changing unwanted habits', 'Sleep improvement'] },
    ];

    const faqs = [
        { q: 'How do I find a hypnotherapist near me?', a: 'Use our free search tool to find hypnotherapists in your area. Enter your location, filter by focus area, and browse profiles to build a shortlist. Use each directory listing as a starting point, then confirm certification, training, scope, fees, and availability directly with the practitioner.' },
        { q: 'What qualifications should I look for?', a: 'When comparing hypnotherapists, ask directly about certifications from recognized organizations such as NGH (National Guild of Hypnotists), IACT, or ABH. Also ask about training background, supervision, professional scope, and whether they regularly support the concern you want help with.' },
        { q: 'How much does a hypnotherapist cost?', a: 'Hypnotherapy sessions typically cost $75-$250 per hour, with most practitioners charging $125-$175. Many offer package deals for multiple sessions. Some hypnotherapists accept insurance when they\'re also licensed healthcare providers.' },
    ];

    const comparisonQuestions = [
        { title: 'Training and scope', body: 'Ask where they trained, whether they hold current certification, whether they are also a licensed healthcare provider, and what types of concerns sit inside or outside their professional scope.' },
        { title: 'Concern fit', body: 'Ask how they usually work with your goal — anxiety support, smoking cessation, sleep, habits, confidence, phobias, pain-related stress, or another concern — without expecting a guaranteed outcome.' },
        { title: 'Session format', body: 'Confirm whether sessions are in person, online, or both; how long the first appointment lasts; whether recordings or between-session practice are used; and what preparation is helpful.' },
        { title: 'Fees and booking details', body: 'Ask about current session fees, packages, cancellation rules, insurance or HSA/FSA questions, availability, and whether an initial call is available before booking.' },
    ];

    const directorySignals = [
        { title: 'Use profiles as a shortlist, not a verdict', body: 'A directory can help you narrow the field quickly. It should not ask you to assume credentials, prices, insurance coverage, or availability from a listing alone.' },
        { title: 'Compare the practical details first', body: 'Start with location, phone number, website, category, session format, and stated focus areas. Those details tell you who is worth contacting before you spend time on consultation calls.' },
        { title: 'Then verify decision-making details directly', body: 'Before booking, ask each practitioner about current certification, training background, professional scope, fees, session length, and whether their approach fits the concern you want support with.' },
    ];

    const nationalDirectoryUseCases = [
        { title: 'You are comparing hypnotherapists across cities', body: 'Start here when you are not locked into one neighborhood yet. A national directory lets you compare nearby city pages, online options, and practitioner websites without treating one local page as the whole market.' },
        { title: 'You want practical contact details first', body: 'Use the directory to collect names, locations, websites, phone numbers, and stated categories before making calls. Then ask each practitioner to confirm current training, professional scope, fees, and availability directly.' },
        { title: 'You need a safer shortlist', body: 'For concerns such as anxiety, smoking cessation, sleep, habits, confidence, pain-related stress, or phobias, use profiles to find possible fit — then choose based on the answers you get from the practitioner, not assumptions from a listing.' },
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
                                Find Hypnotherapists
                            </h1>
                            <p style={{ fontSize: 18, color: 'var(--hf-fg-dim)', marginBottom: 32, lineHeight: 1.7, maxWidth: 640, margin: '0 auto 32px' }}>
                                Search {allPractitioners.length.toLocaleString()}+ hypnotherapist profiles in a US hypnotherapists directory. Compare location, focus areas, session format, and contact details before reaching out directly.
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
                                    { Icon: Users, value: `${allPractitioners.length.toLocaleString()}+`, label: 'Hypnotherapist Profiles' },
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
                                Use the directory to compare hypnotherapist profiles, then contact practitioners directly to confirm training, scope, session format, fees, and fit.
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

                    {/* Hypnotherapists Directory Guidance */}
                    <section style={{ padding: '64px 0', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <div style={{ maxWidth: 896, margin: '0 auto', padding: '0 16px' }}>
                            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Compare Hypnotherapists Before You Book</h2>
                            <p style={{ textAlign: 'center', color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 680, margin: '0 auto 40px', lineHeight: 1.7 }}>
                                A hypnotherapists directory should help you build a practical shortlist, not make claims the listing cannot verify. Use Hypnotherapy Finder to compare location, focus areas, website, phone number, and session format, then confirm the important details directly with the practitioner.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                                {[
                                    { title: 'Start with fit', body: 'Choose hypnotherapists who mention the concern you want support with, such as anxiety, smoking cessation, sleep, habits, confidence, pain, or phobias.' },
                                    { title: 'Verify credentials directly', body: 'Ask about certification, training organisation, professional scope, supervision, and whether they are also a licensed healthcare provider where that matters.' },
                                    { title: 'Check the session logistics', body: 'Confirm in-person or online availability, current fees, consultation process, package structure, and how many sessions they commonly suggest for your concern.' },
                                ].map((item) => (
                                    <div key={item.title} className="glass-card" style={{ padding: 24 }}>
                                        <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 10 }}>{item.title}</h3>
                                        <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.65 }}>{item.body}</p>
                                    </div>
                                ))}
                            </div>
                            <p style={{ color: 'var(--hf-fg-dim)', fontSize: 14, lineHeight: 1.7, marginTop: 28, textAlign: 'center' }}>
                                Hypnotherapy is a complementary approach. If you're experiencing significant symptoms, please consult a qualified healthcare provider.
                            </p>
                        </div>
                    </section>

                    {/* Directory Comparison Questions */}
                    <section style={{ padding: '64px 0' }}>
                        <div style={{ maxWidth: 896, margin: '0 auto', padding: '0 16px' }}>
                            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>How to Compare Hypnotherapists in a Directory</h2>
                            <p style={{ textAlign: 'center', color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 680, margin: '0 auto 40px', lineHeight: 1.7 }}>
                                The useful part of a hypnotherapists directory is not a generic ranking. It is having enough information to ask better questions before you book. Use each profile to build a shortlist, then verify these details directly.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                                {comparisonQuestions.map((item) => (
                                    <div key={item.title} className="glass-card" style={{ padding: 24 }}>
                                        <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 10 }}>{item.title}</h3>
                                        <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.65 }}>{item.body}</p>
                                    </div>
                                ))}
                            </div>
                            <p style={{ color: 'var(--hf-fg-dim)', fontSize: 14, lineHeight: 1.7, marginTop: 28, textAlign: 'center' }}>
                                A directory can show names, locations, phone numbers, websites, and categories. It cannot replace a direct conversation about qualifications, professional boundaries, fees, or whether the practitioner is the right fit for you.
                            </p>
                        </div>
                    </section>

                    {/* Hypnotherapists Directory Intent */}
                    <section style={{ padding: '64px 0' }}>
                        <div style={{ maxWidth: 896, margin: '0 auto', padding: '0 16px' }}>
                            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>What to Look for in a Hypnotherapists Directory</h2>
                            <p style={{ textAlign: 'center', color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 680, margin: '0 auto 40px', lineHeight: 1.7 }}>
                                If you searched for hypnotherapists in general, the goal is not to pick the first profile you see. The goal is to compare enough real-world details to build a sensible shortlist, then confirm anything important directly with the practitioner.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                                {directorySignals.map((item) => (
                                    <div key={item.title} className="glass-card" style={{ padding: 24 }}>
                                        <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 10 }}>{item.title}</h3>
                                        <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.65 }}>{item.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* National Hypnotherapists Directory Fit */}
                    <section style={{ padding: '64px 0', background: 'var(--hf-bg-mid)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <div style={{ maxWidth: 896, margin: '0 auto', padding: '0 16px' }}>
                            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>When to Use a National Hypnotherapists Directory</h2>
                            <p style={{ textAlign: 'center', color: 'var(--hf-fg-dim)', marginBottom: 40, maxWidth: 700, margin: '0 auto 40px', lineHeight: 1.7 }}>
                                If your search is simply “hypnotherapists,” a single city page is probably too narrow. This national directory is the better starting point: compare hypnotherapists across cities, then narrow by location, concern, session format, and direct contact details.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                                {nationalDirectoryUseCases.map((item) => (
                                    <div key={item.title} className="glass-card" style={{ padding: 24 }}>
                                        <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 10 }}>{item.title}</h3>
                                        <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.65 }}>{item.body}</p>
                                    </div>
                                ))}
                            </div>
                            <p style={{ color: 'var(--hf-fg-dim)', fontSize: 14, lineHeight: 1.7, marginTop: 28, textAlign: 'center' }}>
                                If you already know the city you want, jump to the location page. If you are still choosing between hypnotherapists, start with the national directory and build the shortlist there.
                            </p>
                        </div>
                    </section>

                    {/* Browse by City */}
                    <section style={{ padding: '64px 0', background: 'var(--hf-bg-mid)' }}>
                        <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 16px' }}>
                            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 16 }}>Find a Hypnotherapist by City</h2>
                            <p style={{ textAlign: 'center', color: 'var(--hf-fg-dim)', marginBottom: 32 }}>
                                Browse hypnotherapist profiles in major cities across the United States
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
                                Search our directory of {allPractitioners.length.toLocaleString()}+ hypnotherapist profiles and find the right practitioner shortlist for you today.
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
