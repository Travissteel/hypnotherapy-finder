import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { MapPin, Search, CheckCircle, Users, Star, Clock } from 'lucide-react';
import { getAllPractitioners, getAllCities } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Hypnotherapy Near Me - Find Local Certified Hypnotherapists | Free Directory',
  description: 'Find qualified hypnotherapists near you. Search our directory of certified hypnotherapy professionals in your local area. Compare credentials, specialties, and reviews to find the best hypnotherapist near me.',
  keywords: 'hypnotherapy near me, hypnotherapist near me, local hypnotherapy, find hypnotherapist, certified hypnotherapist near me',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/hypnotherapy-near-me',
  },
  openGraph: {
    title: 'Find Hypnotherapy Near Me - Local Certified Practitioners',
    description: 'Discover qualified hypnotherapists in your area. Free directory with verified credentials and specialties.',
    url: 'https://hypnotherapy-finder.com/hypnotherapy-near-me',
    type: 'website',
    images: [
      {
        url: '/hypnotherapy-near-me.png',
        width: 1200,
        height: 630,
        alt: 'Find certified hypnotherapists near me',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Hypnotherapy Near Me - Local Certified Practitioners',
    description: 'Discover qualified hypnotherapists in your area. Free directory with verified credentials and specialties.',
    images: ['/hypnotherapy-near-me.png'],
  },
};

export default async function HypnotherapyNearMePage() {
  const allPractitioners = getAllPractitioners();
  const cities = getAllCities();

  const featuredPractitioners = allPractitioners.filter(p => p.featured).slice(0, 6);
  const popularCities = cities.slice(0, 12);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Hypnotherapy Near Me - Find Local Hypnotherapists',
    description: 'Comprehensive directory to find hypnotherapy near me. Connect with certified hypnotherapists in your local area for anxiety, weight loss, smoking cessation, and more.',
    mainEntity: {
      '@type': 'ItemList',
      name: 'How to Find Hypnotherapy Near Me',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Search by Location',
          description: 'Enter your city or zip code to find hypnotherapy near me',
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
          name: 'Review Credentials',
          description: 'All hypnotherapists are verified and certified',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Contact Directly',
          description: 'Reach out to schedule your first consultation',
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
        name: 'How do I find hypnotherapy near me?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To find hypnotherapy near me, use our search tool by entering your city or zip code. We have over 2,030 certified hypnotherapists across 30 major cities. You can filter results by specialty, insurance acceptance, session type (in-person or virtual), and more to find the perfect hypnotherapy near me for your needs.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should I look for in hypnotherapy near me?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When searching for hypnotherapy near me, look for certified practitioners with credentials like NGH, IACT, or ABH certification. Check their specialties match your needs (anxiety, weight loss, smoking cessation, etc.), verify they accept your insurance if needed, and ensure they offer your preferred session type (in-person or virtual).',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does hypnotherapy near me cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hypnotherapy near me typically costs between $75-$300 per session, with most practitioners charging $125-$200. Many hypnotherapists accept insurance, and some offer package deals for multiple sessions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is virtual hypnotherapy as effective as in-person?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, virtual hypnotherapy can be just as effective as in-person sessions. Many practitioners offer both options. When searching for hypnotherapy near me, you can filter by session type to find practitioners who offer virtual sessions.',
        },
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
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        strategy="beforeInteractive"
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find Hypnotherapy Near Me - Connect with Local Certified Hypnotherapists
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Searching for hypnotherapy near me? Discover qualified hypnotherapists in your local area.
                Our free directory helps you find certified practitioners specializing in anxiety, weight loss,
                smoking cessation, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/search">
                    <Search className="h-5 w-5 mr-2" />
                    Search Hypnotherapists Near Me
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-600">
                  <Link href="#how-to-find">How to Find the Right Hypnotherapist</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/hypnotherapy-near-me.png"
                  alt="Find certified hypnotherapists near me with comprehensive directory showing local practitioners specializing in anxiety, weight loss, and smoking cessation hypnotherapy"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="flex justify-center mb-3">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{allPractitioners.length.toLocaleString()}+</div>
                  <p className="text-gray-600">Verified Hypnotherapists</p>
                </div>
                <div>
                  <div className="flex justify-center mb-3">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <MapPin className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{cities.length}+</div>
                  <p className="text-gray-600">Cities Across the US</p>
                </div>
                <div>
                  <div className="flex justify-center mb-3">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <Star className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
                  <p className="text-gray-600">Free to Use</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Hypnotherapy Near Me */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Does "Hypnotherapy Near Me" Mean?</h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  When you search for <strong>hypnotherapy near me</strong>, you're looking for qualified hypnotherapists
                  practicing in your local area. Hypnotherapy near me searches help you find certified professionals who can
                  provide in-person or virtual hypnotherapy services tailored to your specific needs.
                </p>
                <p>
                  Finding a local hypnotherapist offers several advantages. Local hypnotherapy practitioners understand your
                  community, can offer flexible scheduling for in-person sessions, and are often more accessible for ongoing
                  treatment. Many people searching for hypnotherapy near me want the personal connection that comes with
                  face-to-face sessions.
                </p>
                <p>
                  Our hypnotherapy directory makes it easy to find hypnotherapists near you. Whether you're looking for
                  hypnotherapy for anxiety, weight loss hypnotherapy, smoking cessation, or other specialized services,
                  you can filter by location and specialty to find the perfect match.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Find Section */}
        <section id="how-to-find" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">How to Find the Best Hypnotherapist Near Me</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">1. Check Credentials and Certifications</h3>
                        <p className="text-gray-700">
                          When searching for hypnotherapy near me, verify that practitioners hold proper certifications
                          from recognized organizations like NGH (National Guild of Hypnotists), IACT (International
                          Association of Counselors & Therapists), or ABH (American Board of Hypnotherapy). Our directory
                          displays all certifications for each hypnotherapist.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">2. Review Their Specialties</h3>
                        <p className="text-gray-700">
                          Different hypnotherapists near you may specialize in different areas. Some focus on anxiety
                          and stress relief, while others specialize in weight loss, smoking cessation, phobias, or
                          pain management. Use our search filters to find hypnotherapy professionals who specialize in
                          your specific concern.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">3. Consider Location and Availability</h3>
                        <p className="text-gray-700">
                          Finding hypnotherapy near me means considering practical factors like distance, parking,
                          and appointment availability. Many hypnotherapists also offer online sessions, which can be
                          just as effective for certain concerns. Check each practitioner's profile to see if they
                          offer virtual hypnotherapy sessions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">4. Read Reviews and Experience</h3>
                        <p className="text-gray-700">
                          Years of experience matter when choosing a hypnotherapist near you. Our directory shows how long
                          each practitioner has been practicing. More experienced hypnotherapists have worked with a wider
                          variety of cases and developed refined techniques.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">5. Schedule a Consultation</h3>
                        <p className="text-gray-700">
                          Most hypnotherapists near you offer initial consultations. Use this opportunity to discuss your
                          goals, ask about their approach, and determine if you feel comfortable with them. The therapeutic
                          relationship is crucial for successful hypnotherapy outcomes.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Practitioners */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Featured Hypnotherapists Near You</h2>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Browse certified hypnotherapy practitioners in your area. Each profile includes credentials, specialties,
                and contact information to help you find the right hypnotherapist near me.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredPractitioners.map((practitioner) => (
                  <Card key={practitioner.id} className="hover:shadow-lg transition">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-lg mb-2">{practitioner.name}</h3>
                      {practitioner.credentials && (
                        <p className="text-sm text-blue-600 mb-3">{practitioner.credentials}</p>
                      )}
                      <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{practitioner.city}, {practitioner.state}</span>
                      </div>
                      {practitioner.specialties.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-medium text-gray-500 mb-2">SPECIALTIES</p>
                          <div className="flex flex-wrap gap-1">
                            {practitioner.specialties.slice(0, 3).map((specialty, idx) => (
                              <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <Button asChild className="w-full" size="sm">
                        <Link href={`/practitioner/${practitioner.slug}`}>View Profile</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Button asChild size="lg">
                  <Link href="/search">
                    View All Hypnotherapists Near Me
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Locations */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Find Hypnotherapy in Popular Cities</h2>
              <p className="text-center text-gray-600 mb-8">
                Looking for hypnotherapy near me in a specific city? Browse our location pages to find certified
                hypnotherapists in major cities across the United States.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {popularCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/location/${city.slug}`}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition text-center"
                  >
                    <MapPin className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">{city.name}</div>
                    <div className="text-sm text-gray-600">{city.practitionerCount} practitioners</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Common Concerns */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">What Can Hypnotherapy Near Me Help With?</h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4 mb-8">
                <p>
                  When you find a qualified hypnotherapist near you, they can help address a wide range of concerns.
                  Hypnotherapy has been shown to be effective for many conditions, both mental and physical.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Mental Health & Wellness</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Anxiety and Stress:</strong> Find hypnotherapy for anxiety near me to learn relaxation techniques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Depression:</strong> Complement traditional treatments with hypnotherapy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>PTSD and Trauma:</strong> Process traumatic experiences safely</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Phobias and Fears:</strong> Overcome specific fears and phobias</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Behavioral Change</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Smoking Cessation:</strong> Quit smoking with hypnotherapy near me</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Weight Loss:</strong> Achieve healthy eating habits and weight management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Breaking Bad Habits:</strong> Eliminate unwanted behaviors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Sleep Issues:</strong> Improve sleep quality and overcome insomnia</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Pain Management</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Chronic Pain:</strong> Manage pain through hypnotic techniques</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Migraines and Headaches:</strong> Reduce frequency and intensity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>IBS and Digestive Issues:</strong> Manage symptoms effectively</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Performance Enhancement</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Sports Performance:</strong> Improve focus and mental game</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Public Speaking:</strong> Overcome stage fright and anxiety</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Confidence Building:</strong> Boost self-esteem and confidence</span>
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
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions About Hypnotherapy Near Me</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">How do I find a qualified hypnotherapist near me?</h3>
                    <p className="text-gray-700">
                      Use our free directory to search for certified hypnotherapists in your area. Filter by city,
                      specialty, and credentials. Look for practitioners certified by recognized organizations like
                      NGH, IACT, or ABH. Read their profiles, check their experience, and contact them directly to
                      schedule a consultation.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">How much does hypnotherapy near me cost?</h3>
                    <p className="text-gray-700">
                      Hypnotherapy costs vary by location, practitioner experience, and session length. Most sessions
                      range from $75 to $200 per hour. Many hypnotherapists offer package deals for multiple sessions.
                      Contact practitioners directly through our directory to inquire about their rates and payment
                      options. Some may accept insurance or offer sliding scale fees.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Is online hypnotherapy as effective as in-person?</h3>
                    <p className="text-gray-700">
                      Research shows that online hypnotherapy can be just as effective as in-person sessions for many
                      concerns. The key is having a quiet, comfortable space and a stable internet connection. Many
                      people find online sessions more convenient and accessible. Check practitioner profiles to see
                      who offers virtual hypnotherapy sessions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">How many sessions will I need?</h3>
                    <p className="text-gray-700">
                      The number of sessions varies depending on your goals and the issue being addressed. Some concerns
                      like smoking cessation may only require 1-3 sessions, while ongoing issues like anxiety management
                      might benefit from 6-10 sessions or more. Your hypnotherapist will discuss a treatment plan during
                      your initial consultation.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">What should I look for when choosing a hypnotherapist near me?</h3>
                    <p className="text-gray-700">
                      Look for proper certifications, relevant experience in your area of concern, and someone you feel
                      comfortable with. Check their specialties, years in practice, and approach to treatment. Most
                      importantly, trust your instincts - the therapeutic relationship is crucial for successful outcomes.
                      Our directory makes it easy to compare hypnotherapists in your area.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Related Hypnotherapy Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/what-is-hypnotherapy" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">What is Hypnotherapy?</h3>
                  <p className="text-sm text-gray-600">Learn everything about hypnotherapy and how it works</p>
                </Link>
                <Link href="/hypnotherapy-for-anxiety" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">Hypnotherapy for Anxiety</h3>
                  <p className="text-sm text-gray-600">Discover how hypnotherapy helps reduce anxiety and stress</p>
                </Link>
                <Link href="/does-hypnotherapy-work" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">Does Hypnotherapy Work?</h3>
                  <p className="text-sm text-gray-600">Scientific evidence and research on hypnotherapy effectiveness</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Hypnotherapist?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Search our free directory of certified hypnotherapy professionals. Find the right hypnotherapist
                near you today and take the first step toward positive change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/search">
                    <Search className="h-5 w-5 mr-2" />
                    Find Hypnotherapists Near Me
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-600">
                  <Link href="/how-it-works">Learn About Hypnotherapy</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

        <Footer />
      </div>
    </>
  );
}
