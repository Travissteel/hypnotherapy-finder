import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllPractitioners, getPractitionerBySlug } from '@/lib/data/practitioners';
import { MapPin, Phone, Globe, Mail } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

interface PractitionerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const practitioners = getAllPractitioners();
  return practitioners.map((practitioner) => ({
    slug: practitioner.slug,
  }));
}

export async function generateMetadata({
  params,
}: PractitionerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const practitioner = getPractitionerBySlug(slug);

  if (!practitioner) {
    return {
      title: 'Practitioner Not Found',
    };
  }

  return {
    title: `${practitioner.name} - Hypnotherapist in ${practitioner.city}, ${practitioner.state}`,
    description: `Connect with ${practitioner.name}, a certified hypnotherapist in ${practitioner.city}, ${practitioner.state}. Specializing in ${practitioner.specialties.slice(0, 3).join(', ')}.`,
    keywords: `${practitioner.name}, hypnotherapist ${practitioner.city}, ${practitioner.specialties.join(', ')}`,
    alternates: {
      canonical: `https://hypnotherapy-finder.com/practitioner/${slug}`,
    },
  };
}

export default async function PractitionerPage({ params }: PractitionerPageProps) {
  const { slug } = await params;
  const practitioner = getPractitionerBySlug(slug);

  if (!practitioner) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: practitioner.name,
    description: `Certified hypnotherapist specializing in ${practitioner.specialties.join(', ')}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: practitioner.street,
      addressLocality: practitioner.city,
      addressRegion: practitioner.state,
      addressCountry: 'US',
    },
    ...(practitioner.phone && { telephone: practitioner.phone }),
    ...(practitioner.email && { email: practitioner.email }),
    ...(practitioner.website && { url: practitioner.website }),
    medicalSpecialty: practitioner.specialties,
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
        name: 'Find Hypnotherapists',
        item: 'https://hypnotherapy-finder.com/search',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${practitioner.city}, ${practitioner.state}`,
        item: `https://hypnotherapy-finder.com/location/${practitioner.city.toLowerCase().replace(/\s+/g, '-')}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: practitioner.name,
        item: `https://hypnotherapy-finder.com/practitioner/${slug}`,
      },
    ],
  };

  return (
    <>
      <Script
        id="schema-medical"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600">
                    {practitioner.name.charAt(0)}
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {practitioner.name}
                  </h1>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">
                      {practitioner.city}, {practitioner.state}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {practitioner.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {practitioner.phone && (
                      <Button asChild>
                        <a href={`tel:${practitioner.phone}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </a>
                      </Button>
                    )}
                    {practitioner.website && (
                      <Button asChild variant="outline">
                        <a
                          href={practitioner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Visit Website
                        </a>
                      </Button>
                    )}
                    {practitioner.email && (
                      <Button asChild variant="outline">
                        <a href={`mailto:${practitioner.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {practitioner.name} is a certified hypnotherapist located in{' '}
                    {practitioner.city}, {practitioner.state}. With expertise in{' '}
                    {practitioner.specialties.slice(0, 3).join(', ')}, they provide
                    professional hypnotherapy services to help clients achieve their goals.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Specialties</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {practitioner.specialties.map((specialty) => (
                      <div
                        key={specialty}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        {specialty}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Location</h2>
                  <div className="space-y-3 text-gray-700">
                    <p className="font-medium">{practitioner.street}</p>
                    <p>
                      {practitioner.city}, {practitioner.state}
                    </p>
                    <div className="pt-4">
                      <Link
                        href={`/location/${practitioner.citySlug}`}
                        className="text-blue-600 hover:underline"
                      >
                        View all practitioners in {practitioner.city} →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    {practitioner.phone && (
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Phone</div>
                        <a
                          href={`tel:${practitioner.phone}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {practitioner.phone}
                        </a>
                      </div>
                    )}
                    {practitioner.email && (
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Email</div>
                        <a
                          href={`mailto:${practitioner.email}`}
                          className="text-blue-600 hover:underline font-medium break-all"
                        >
                          {practitioner.email}
                        </a>
                      </div>
                    )}
                    {practitioner.website && (
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Website</div>
                        <a
                          href={practitioner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium break-all"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
