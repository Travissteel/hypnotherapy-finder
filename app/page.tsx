import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchBar } from '@/components/home/SearchBar';
import { PractitionerCard } from '@/components/search/PractitionerCard';
import { getFeaturedPractitioners, getAllCities } from '@/lib/data/practitioners';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Script from 'next/script';
import { Search, Users, CheckCircle, MapPin, Star, Award, Shield, Activity, Brain, Users2, Repeat2 } from 'lucide-react';

export const metadata = {
  title: 'Find a Certified Hypnotherapist Near You',
  description: 'Connect with qualified hypnotherapy practitioners specializing in anxiety, weight loss, smoking cessation, and more. Search 1,150+ verified hypnotherapists nationwide.',
  keywords: 'hypnotherapy near me, hypnotherapist, hypnosis therapy, anxiety treatment, weight loss hypnotherapy, quit smoking',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com',
  },
  openGraph: {
    title: 'Find a Certified Hypnotherapist Near You | Hypnotherapy Finder',
    description: 'Connect with qualified hypnotherapy practitioners specializing in anxiety, weight loss, smoking cessation, and more. Search 1,150+ verified hypnotherapists nationwide.',
    url: 'https://hypnotherapy-finder.com',
    type: 'website',
    images: [
      {
        url: '/therapy-session.png',
        width: 1200,
        height: 630,
        alt: 'Hypnotherapy Session',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find a Certified Hypnotherapist Near You',
    description: 'Connect with qualified hypnotherapy practitioners specializing in anxiety, weight loss, smoking cessation, and more.',
    images: ['/therapy-session.png'],
  },
};

export default function Home() {
  const featured = getFeaturedPractitioners();
  const cities = getAllCities().slice(0, 12);

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hypnotherapy Finder',
    url: 'https://hypnotherapy-finder.com',
    logo: 'https://hypnotherapy-finder.com/logo.png',
    description: 'The leading directory for finding certified hypnotherapy practitioners specializing in anxiety, weight loss, smoking cessation, and more.',
    sameAs: [
      'https://www.facebook.com/profile.php?id=61584471600142',
      'https://www.linkedin.com/company/hypnotherapy-finder',
      'https://www.instagram.com/hypnotherapyfinder',
      'https://x.com/Hypnofinder'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: 'https://hypnotherapy-finder.com/contact'
    }
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Hypnotherapy Finder',
    url: 'https://hypnotherapy-finder.com',
    description: 'Find certified hypnotherapists near you. Search our comprehensive directory of qualified hypnotherapy practitioners.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://hypnotherapy-finder.com/search?location={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Hypnotherapy Directory',
    provider: {
      '@type': 'Organization',
      name: 'Hypnotherapy Finder'
    },
    areaServed: 'United States',
    description: 'Comprehensive directory service connecting clients with certified hypnotherapy practitioners across the United States.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free directory service to find hypnotherapists'
    }
  };

  return (
    <>
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        strategy="beforeInteractive"
      />

      <div className="min-h-screen flex flex-col bg-white">
        <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section - Vivid & Animated */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
          {/* Vivid Animated Background */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-100 via-blue-100 to-teal-100 animate-gradient -z-20"></div>

          {/* Colorful Animated Blobs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-60 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl opacity-60 animate-blob" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-teal-400 rounded-full filter blur-3xl opacity-60 animate-blob" style={{animationDelay: '4s'}}></div>
            <div className="absolute bottom-[-10%] right-[10%] w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-60 animate-blob" style={{animationDelay: '6s'}}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">

              {/* Left Column: Text & Search */}
              <div className="flex-1 text-center lg:text-left relative">
                {/* Blob effects behind left section - Enhanced visibility */}
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-400 rounded-full filter blur-3xl opacity-70 animate-blob -z-10"></div>
                <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-65 animate-blob -z-10" style={{animationDelay: '3s'}}></div>
                <div className="absolute top-64 left-10 w-60 h-60 bg-pink-300 rounded-full filter blur-3xl opacity-60 animate-blob -z-10" style={{animationDelay: '5s'}}></div>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight drop-shadow-sm">
                  Find Your Path to <br />
                  <span className="text-indigo-700 inline-block mt-2">Inner Calm</span>
                </h1>
                <p className="mt-6 text-xl text-gray-800 font-medium mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Connect with certified, verified hypnotherapists. Start your journey towards a healthier, happier mind today.
                </p>

                {/* Glassmorphism Search Box */}
                <div className="glass-card p-8 rounded-3xl shadow-2xl transform transition-all duration-300 text-left border-2 border-white/60">
                  <SearchBar />
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm pt-6">
                  <span className="flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-bold text-gray-900">1,150+ Certified</span>
                  </span>
                  <span className="flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-bold text-gray-900">31 Cities</span>
                  </span>
                  <span className="flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-bold text-gray-900">100% Verified</span>
                  </span>
                </div>

                {/* Quick Links for SEO */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                  <Link href="/hypnotherapy-near-me" className="text-indigo-700 hover:text-indigo-900 font-semibold underline underline-offset-2">
                    Find Hypnotherapy Near Me
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/hypnotherapy-for-anxiety" className="text-indigo-700 hover:text-indigo-900 font-semibold underline underline-offset-2">
                    Anxiety Hypnotherapy
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/weight-loss-hypnotherapy" className="text-indigo-700 hover:text-indigo-900 font-semibold underline underline-offset-2">
                    Weight Loss Hypnotherapy
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/quit-smoking-hypnotherapy" className="text-indigo-700 hover:text-indigo-900 font-semibold underline underline-offset-2">
                    Quit Smoking Hypnotherapy
                  </Link>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="flex-1 relative hidden lg:block">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-all duration-500 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent z-10 group-hover:from-indigo-900/40 transition-all"></div>
                  <img
                    src="/therapy-session.png"
                    alt="Professional hypnotherapy session with certified hypnotherapist helping client with anxiety, weight loss, and smoking cessation treatment"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Floating Badge */}
                  <div className="absolute bottom-8 left-8 z-20 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white">
                    <div className="flex items-center gap-4">
                      <div className="text-white bg-gradient-to-br from-teal-400 to-blue-500 p-3 rounded-full shadow-md">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Verified Pros</p>
                        <p className="text-gray-900 font-bold text-lg">100% Credentialed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements behind image */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full filter blur-2xl opacity-60 animate-blob"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300 rounded-full filter blur-2xl opacity-60 animate-blob" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section - Colorful Icons */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-extrabold text-gray-900">How It Works</h2>
              <p className="mt-4 text-xl text-gray-600">Your journey to wellness in three simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-teal-200 via-blue-200 to-teal-200 -z-10"></div>

              {[
                {
                  title: 'Search',
                  icon: Search,
                  desc: 'Enter your location and needs to browse certified hypnotherapists.',
                  gradient: 'from-orange-400 to-pink-400'
                },
                {
                  title: 'Compare',
                  icon: Users,
                  desc: 'Review detailed profiles, verified credentials, and client reviews.',
                  gradient: 'from-green-400 to-cyan-400'
                },
                {
                  title: 'Connect',
                  icon: CheckCircle,
                  desc: 'Contact practitioners directly to schedule your consultation.',
                  gradient: 'from-purple-400 to-pink-400'
                },
              ].map((step, index) => (
                <div key={index} className="relative flex flex-col items-center text-center group">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.gradient} shadow-xl flex items-center justify-center mb-8 relative z-10 border-4 border-white group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-10 w-10 text-white drop-shadow-md" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Practitioners - World Class Design */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <div>
                <h2 className="text-4xl font-extrabold text-gray-900">Featured Practitioners</h2>
                <p className="mt-3 text-xl text-gray-600">Top-rated hypnotherapists ready to help you</p>
              </div>
              <Button asChild className="btn-gradient text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <Link href="/search">View All <span className="ml-2">→</span></Link>
              </Button>
            </div>

            {/* Practitioner Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((practitioner) => (
                <div key={practitioner.id} className="transform hover:-translate-y-2 transition-all duration-300">
                  <PractitionerCard practitioner={practitioner} />
                </div>
              ))}
            </div>

            {/* Trust Section Below Featured */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Verified Credentials</h3>
                <p className="text-gray-700 leading-relaxed">All practitioners are vetted with verified certifications from recognized hypnotherapy organizations.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Authentic Reviews</h3>
                <p className="text-gray-700 leading-relaxed">Read genuine client experiences to find the perfect practitioner for your needs.</p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl border border-teal-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Expert Specialists</h3>
                <p className="text-gray-700 leading-relaxed">From anxiety to weight loss, find practitioners specialized in your specific concerns.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Locations */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900">Popular Locations</h2>
              <p className="mt-4 text-xl text-gray-600">Find hypnotherapists in major cities</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/location/${city.slug}`}
                  className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-teal-500 hover:shadow-xl transition-all bg-white transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{city.name}</div>
                      <div className="text-sm text-gray-600">{city.state}</div>
                      <div className="text-xs text-teal-600 font-semibold mt-2">
                        {city.practitionerCount} practitioners
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline" className="px-8 py-6 text-lg font-bold rounded-xl border-2 hover:bg-gray-50">
                <Link href="/locations">View All Locations →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900">Free Mental Health Quizzes</h2>
              <p className="mt-4 text-xl text-gray-600">Anonymous self-assessments to help you understand your wellbeing</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/ocd-test" className="group block p-7 bg-gradient-to-br from-orange-50 to-rose-50 border-2 border-orange-100 rounded-2xl hover:shadow-xl hover:border-orange-300 transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Repeat2 className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">OCD Test</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">Check for obsessions, compulsions, and Pure O symptoms.</p>
                <span className="text-orange-600 font-semibold text-sm group-hover:text-orange-800 transition-colors">Take the free test →</span>
              </Link>

              <Link href="/social-anxiety-test" className="group block p-7 bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-100 rounded-2xl hover:shadow-xl hover:border-pink-300 transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Users2 className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Social Anxiety Test</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">Do you have social anxiety disorder? Find out in 2 minutes.</p>
                <span className="text-pink-600 font-semibold text-sm group-hover:text-pink-800 transition-colors">Take the free test →</span>
              </Link>

              <Link href="/ptsd-quiz" className="group block p-7 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-100 rounded-2xl hover:shadow-xl hover:border-purple-300 transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">PTSD Quiz</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">Check for PTSD and Complex PTSD symptoms.</p>
                <span className="text-purple-600 font-semibold text-sm group-hover:text-purple-800 transition-colors">Take the free quiz →</span>
              </Link>

              <Link href="/free-quizzes" className="group block p-7 bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-dashed border-gray-300 rounded-2xl hover:shadow-xl hover:border-indigo-400 transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Activity className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">See All 15 Free Quizzes</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">Anger, insomnia, burnout, phobias, thalassophobia, people pleasing, and more.</p>
                <span className="text-indigo-600 font-semibold text-sm group-hover:text-indigo-800 transition-colors">View all free tests →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section - Gradient Design */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden p-12 md:p-16 text-center bg-gradient-to-br from-indigo-900 via-blue-900 to-teal-800 rounded-[2.5rem] shadow-2xl transform hover:scale-[1.01] transition-transform duration-500">
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white opacity-10 blur-3xl"></div>
                <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-400 opacity-20 blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Ready to Start Your Journey?</h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                  Find qualified practitioners in your area and take the first step toward positive change. Join thousands who have transformed their lives through hypnotherapy.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Button asChild size="lg" className="px-10 py-6 bg-white text-teal-900 font-extrabold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-white/50 text-lg transform hover:-translate-y-1">
                    <Link href="/search">Search Practitioners Now</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="px-10 py-6 bg-transparent text-white font-bold rounded-xl hover:bg-white/10 transition-all border-2 border-white/30 text-lg backdrop-blur-sm">
                    <Link href="/practitioner-signup">For Practitioners</Link>
                  </Button>
                </div>
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
