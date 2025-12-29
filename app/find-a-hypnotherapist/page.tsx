import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Search by Location',
                    description: 'Enter your city or zip code to find hypnotherapists near you',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Filter by Specialty',
                    description: 'Choose from anxiety, weight loss, smoking cessation, and more',
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'Compare Practitioners',
                    description: 'Review credentials, experience, and specialties',
                },
                {
                    '@type': 'ListItem',
                    position: 4,
                    name: 'Contact Directly',
                    description: 'Reach out to schedule your consultation',
                },
            ],
        },
        provider: {
            '@type': 'Organization',
            name: 'Hypnotherapy Finder',
        },
    };

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'How do I find a hypnotherapist near me?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'To find a hypnotherapist, use our free directory search. Enter your location to browse certified practitioners in your area. You can filter by specialty, credentials, and session type (in-person or virtual) to find the perfect match.',
                },
            },
            {
                '@type': 'Question',
                name: 'What qualifications should a hypnotherapist have?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'When you find a hypnotherapist, look for certifications from recognized organizations like NGH (National Guild of Hypnotists), IACT (International Association of Counselors & Therapists), or ABH (American Board of Hypnotherapy). Experience in your specific concern area is also important.',
                },
            },
            {
                '@type': 'Question',
                name: 'How much does a hypnotherapist charge?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Hypnotherapist fees typically range from $75-$250 per session, with most charging $125-$175. Initial consultations may cost more. Many offer package deals for multiple sessions, and some accept insurance when provided by a licensed healthcare professional.',
                },
            },
        ],
    };

    return (
        <>
            <Script
                id="schema-webpage"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                strategy="beforeInteractive"
            />
            <Script
                id="schema-faq"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                strategy="beforeInteractive"
            />

            <div className="min-h-screen flex flex-col">
                <Header />

                <main className="flex-1 pt-20">
                    {/* Hero Section */}
                    <section className="bg-gradient-to-b from-teal-600 to-teal-700 text-white py-20">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto text-center">
                                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                    Find a Hypnotherapist
                                </h1>
                                <p className="text-xl mb-8 text-teal-100">
                                    Search {allPractitioners.length.toLocaleString()}+ certified hypnotherapists.
                                    Find a qualified hypnotherapist near you specializing in anxiety, weight loss,
                                    smoking cessation, and more.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                                        <Link href="/search">
                                            <Search className="h-5 w-5 mr-2" />
                                            Search Hypnotherapists Now
                                        </Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-teal-600">
                                        <Link href="/hypnotherapy-near-me">Find Hypnotherapy Near Me</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Stats Section */}
                    <section className="py-12 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                    <div>
                                        <div className="flex justify-center mb-3">
                                            <div className="p-4 bg-teal-100 rounded-full">
                                                <Users className="h-8 w-8 text-teal-600" />
                                            </div>
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-2">{allPractitioners.length.toLocaleString()}+</div>
                                        <p className="text-gray-600">Verified Hypnotherapists</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-center mb-3">
                                            <div className="p-4 bg-teal-100 rounded-full">
                                                <MapPin className="h-8 w-8 text-teal-600" />
                                            </div>
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-2">{cities.length}+</div>
                                        <p className="text-gray-600">Cities Covered</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-center mb-3">
                                            <div className="p-4 bg-teal-100 rounded-full">
                                                <Shield className="h-8 w-8 text-teal-600" />
                                            </div>
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
                                        <p className="text-gray-600">Free to Search</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How to Find Section */}
                    <section className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-3xl font-bold mb-4 text-center">How to Find a Hypnotherapist</h2>
                                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                                    Finding the right hypnotherapist is easy with our comprehensive directory.
                                    Follow these steps to find a qualified practitioner near you.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-teal-100 rounded-lg flex-shrink-0">
                                                    <Search className="h-6 w-6 text-teal-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-2">1. Search by Location</h3>
                                                    <p className="text-gray-700">
                                                        Enter your city or zip code to find hypnotherapists in your area.
                                                        Our directory covers {cities.length}+ cities across the United States.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-teal-100 rounded-lg flex-shrink-0">
                                                    <Star className="h-6 w-6 text-teal-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-2">2. Filter by Specialty</h3>
                                                    <p className="text-gray-700">
                                                        Find a hypnotherapist who specializes in your specific concern—anxiety,
                                                        weight loss, smoking cessation, phobias, or pain management.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-teal-100 rounded-lg flex-shrink-0">
                                                    <Award className="h-6 w-6 text-teal-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-2">3. Check Credentials</h3>
                                                    <p className="text-gray-700">
                                                        Review each hypnotherapist's certifications, experience, and specialties.
                                                        Look for NGH, IACT, or ABH certified practitioners.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-teal-100 rounded-lg flex-shrink-0">
                                                    <CheckCircle className="h-6 w-6 text-teal-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-2">4. Contact Directly</h3>
                                                    <p className="text-gray-700">
                                                        Once you find a hypnotherapist you like, contact them directly through
                                                        their profile to schedule an initial consultation.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Browse by City */}
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-3xl font-bold mb-4 text-center">Find a Hypnotherapist by City</h2>
                                <p className="text-center text-gray-600 mb-8">
                                    Browse certified hypnotherapists in major cities across the United States
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {topCities.map((city) => (
                                        <Link
                                            key={city.slug}
                                            href={`/location/${city.slug}`}
                                            className="p-4 border border-gray-200 rounded-lg hover:border-teal-500 hover:shadow-md transition text-center"
                                        >
                                            <MapPin className="h-5 w-5 text-teal-600 mx-auto mb-2" />
                                            <div className="font-semibold text-gray-900">{city.name}</div>
                                            <div className="text-sm text-gray-600">{city.practitionerCount} practitioners</div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="text-center mt-8">
                                    <Button asChild variant="outline" size="lg">
                                        <Link href="/locations">View All Locations →</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* What Hypnotherapists Treat */}
                    <section className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-3xl font-bold mb-8 text-center">What Can a Hypnotherapist Help With?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <h3 className="font-semibold text-lg mb-3">Mental Health & Wellness</h3>
                                            <ul className="space-y-2 text-gray-700">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                    <span>Anxiety and stress relief</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                    <span>Depression support</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                    <span>PTSD and trauma processing</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                    <span>Phobia treatment</span>
                                                </li>
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <h3 className="font-semibold text-lg mb-3">Behavioral Change</h3>
                                            <ul className="space-y-2 text-gray-700">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                    <span>Smoking cessation</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                    <span>Weight loss and healthy eating</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                    <span>Breaking bad habits</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                    <span>Sleep improvement</span>
                                                </li>
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                                <div className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <h3 className="font-semibold text-lg mb-2">How do I find a hypnotherapist near me?</h3>
                                            <p className="text-gray-700">
                                                Use our free search tool to find hypnotherapists in your area. Enter your location,
                                                filter by specialty, and browse profiles to find a qualified practitioner. All
                                                hypnotherapists in our directory are verified and certified.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <h3 className="font-semibold text-lg mb-2">What qualifications should I look for?</h3>
                                            <p className="text-gray-700">
                                                When you find a hypnotherapist, look for certifications from recognized organizations
                                                like NGH (National Guild of Hypnotists), IACT, or ABH. Consider their experience,
                                                specialties, and whether they've worked with your specific concern before.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <h3 className="font-semibold text-lg mb-2">How much does a hypnotherapist cost?</h3>
                                            <p className="text-gray-700">
                                                Hypnotherapy sessions typically cost $75-$250 per hour, with most practitioners
                                                charging $125-$175. Many offer package deals for multiple sessions. Some
                                                hypnotherapists accept insurance when they're also licensed healthcare providers.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-3xl font-bold mb-4">Ready to Find a Hypnotherapist?</h2>
                                <p className="text-xl mb-8 text-teal-100">
                                    Search our directory of {allPractitioners.length.toLocaleString()}+ certified practitioners
                                    and find the right hypnotherapist for you today.
                                </p>
                                <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-teal-50">
                                    <Link href="/search">
                                        <Search className="h-5 w-5 mr-2" />
                                        Find a Hypnotherapist Now
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
