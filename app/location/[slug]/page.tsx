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
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    return {
      title: 'Location Not Found',
    };
  }

  return {
    title: `Hypnotherapists in ${city.name}, ${city.state} | Find Certified Practitioners Near You`,
    description: `Find qualified hypnotherapists in ${city.name}, ${city.state}. Browse ${city.practitionerCount} certified practitioners specializing in anxiety, weight loss, smoking cessation, and more.`,
    keywords: `hypnotherapy ${city.name}, hypnotherapist ${city.name}, ${city.name} hypnosis, hypnotherapy near me ${city.state}`,
    alternates: {
      canonical: `https://hypnotherapy-finder.com/location/${slug}`,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
    notFound();
  }

  const practitioners = getPractitionersByCity(slug);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Hypnotherapists in ${city.name}, ${city.state}`,
    description: `Directory of certified hypnotherapists in ${city.name}`,
    numberOfItems: practitioners.length,
    itemListElement: practitioners.slice(0, 10).map((p, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'MedicalBusiness',
        name: p.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: p.city,
          addressRegion: p.state,
          addressCountry: 'US',
        },
      },
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How many hypnotherapists are in ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `There are ${city.practitionerCount} certified hypnotherapists in ${city.name}, ${city.state} listed in our directory. These practitioners specialize in various areas including anxiety treatment, weight loss, smoking cessation, pain management, and more. You can browse all ${city.name} hypnotherapists on this page.`,
        },
      },
      {
        '@type': 'Question',
        name: `What does hypnotherapy cost in ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Hypnotherapy in ${city.name}, ${city.state} typically costs between $100-$250 per session, depending on the practitioner's experience, credentials, and specialty. Initial consultations may cost more. Many ${city.name} hypnotherapists offer package deals for multiple sessions at reduced rates. Contact practitioners directly for specific pricing and insurance acceptance.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do I choose a hypnotherapist in ${city.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `When choosing a hypnotherapist in ${city.name}, look for proper certifications (CHt, NGH, IACT, or ABH), relevant experience in your concern area, good reviews, and someone you feel comfortable with. Licensed healthcare providers (psychologists, physicians) with hypnotherapy training are ideal if you want insurance coverage. Browse our ${city.name} directory to compare credentials and specialties.`,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hypnotherapy-finder.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: 'https://hypnotherapy-finder.com/locations',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${city.name}, ${city.state}`,
        item: `https://hypnotherapy-finder.com/location/${slug}`,
      },
    ],
  };

  return (
    <>
      <Script
        id="schema-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="beforeInteractive"
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-gray-50 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <MapPin className="h-6 w-6" />
                <span className="text-lg font-medium">{city.state}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Hypnotherapists in {city.name}
              </h1>

              <p className="text-xl text-gray-600">
                Connect with {city.practitionerCount} certified hypnotherapy practitioners
                in {city.name}, {city.state}
              </p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="bg-white py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Find Qualified Hypnotherapists in {city.name}, {city.state}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Looking for hypnotherapy in {city.name}?</strong> Our directory features {city.practitionerCount} certified
                hypnotherapists in the {city.name} area. Whether you're seeking help with anxiety, weight loss, smoking cessation,
                pain management, or other challenges, you'll find experienced practitioners ready to help you achieve your wellness goals.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                What Can {city.name} Hypnotherapists Help With?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hypnotherapists in {city.name}, {city.state} use guided relaxation and focused attention to help with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Anxiety and stress management</strong> - Reduce worry, panic attacks, and daily anxiety</li>
                <li><strong>Weight loss and healthy habits</strong> - Address emotional eating and build sustainable habits</li>
                <li><strong>Smoking cessation</strong> - Break nicotine addiction and become smoke-free</li>
                <li><strong>Phobia treatment</strong> - Overcome specific fears like flying, heights, or public speaking</li>
                <li><strong>Sleep disorders and insomnia</strong> - Improve sleep quality and overcome sleep issues</li>
                <li><strong>Chronic pain management</strong> - Reduce pain intensity and improve quality of life</li>
                <li><strong>PTSD and trauma therapy</strong> - Process traumatic experiences in a safe environment</li>
                <li><strong>Confidence and performance</strong> - Enhance sports performance, public speaking, and self-esteem</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                How Much Does Hypnotherapy Cost in {city.name}?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hypnotherapy sessions in {city.name} typically cost <strong>$100-$250 per session</strong>, with the average
                around $150-$175. Initial consultations may be longer and cost $150-$250. Many {city.name} hypnotherapists
                offer package deals for multiple sessions at discounted rates. Some practitioners accept insurance when hypnotherapy
                is provided by a licensed healthcare professional for a covered condition.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                How to Choose a Hypnotherapist in {city.name}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                When selecting a hypnotherapist in {city.name}, {city.state}, consider:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Credentials:</strong> Look for CHt certification from NGH, IACT, or ABH</li>
                <li><strong>Experience:</strong> Ask about their experience treating your specific concern</li>
                <li><strong>Specialization:</strong> Find practitioners who specialize in your area of need</li>
                <li><strong>Licensed providers:</strong> Psychologists or physicians with hypnotherapy training often qualify for insurance</li>
                <li><strong>Personal comfort:</strong> Choose someone you feel comfortable working with</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Practitioners Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              All Practitioners in {city.name}
            </h2>
            <p className="text-gray-600">
              Browse {practitioners.length} certified hypnotherapists
            </p>
          </div>

          {practitioners.length === 0 ? (
            <div className="bg-white p-12 rounded-lg border text-center">
              <p className="text-gray-600">
                No practitioners found in {city.name} yet.
              </p>
              <Link
                href="/search"
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Search all locations
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practitioners.map((practitioner) => (
                <PractitionerCard key={practitioner.id} practitioner={practitioner} />
              ))}
            </div>
          )}
        </div>

        {/* Related Locations */}
        <div className="bg-white py-12 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Explore Other Locations
            </h2>
            <div className="flex justify-center">
              <Link
                href="/locations"
                className="text-blue-600 hover:underline text-lg"
              >
                View all locations →
              </Link>
            </div>
          </div>
        </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
