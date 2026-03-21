import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import {
  MapPin,
  Phone,
  Globe,
  Mail,
  CheckCircle,
  Star,
  History,
  User,
  Calendar,
  Award,
  Video,
  ChevronRight,
  ShieldCheck,
  Languages,
  DollarSign,
  BrainCircuit
} from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

// Helper to ensure website URLs have proper protocol
function normalizeWebsiteUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

interface PractitionerPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all practitioners at build time
export async function generateStaticParams() {
  const { getAllPractitioners } = await import('@/lib/data/practitioners');
  const practitioners = getAllPractitioners();
  return practitioners.map((practitioner) => ({
    slug: practitioner.slug,
  }));
}

// Helper to create Supabase client
async function createSupabaseClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

// Fetch practitioner from database
async function getPractitioner(slugOrId: string) {
  const supabase = await createSupabaseClient();
  const isUUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(slugOrId);

  if (isUUID) {
    const { data, error } = await supabase.from('practitioners').select('*').eq('id', slugOrId).maybeSingle();
    if (!error && data) return data;
  }

  const { data: dataBySlug, error: errorBySlug } = await supabase.from('practitioners').select('*').eq('slug', slugOrId).maybeSingle();
  if (!errorBySlug && dataBySlug) return dataBySlug;

  try {
    const { getPractitionerBySlug } = await import('@/lib/data/practitioners');
    const staticPractitioner = getPractitionerBySlug(slugOrId);
    if (staticPractitioner) {
      return {
        ...staticPractitioner,
        id: staticPractitioner.id,
        years_experience: (staticPractitioner as any).yearsExperience || null,
        address: (staticPractitioner as any).street || null,
        claim_status: 'unclaimed',
      };
    }
  } catch (e) {
    console.error('Error loading static data:', e);
  }
  return null;
}

export async function generateMetadata({ params }: PractitionerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const practitioner = await getPractitioner(slug);
  if (!practitioner) return { title: 'Practitioner Not Found' };

  const specialties = Array.isArray(practitioner.specialties) ? practitioner.specialties : [];
  let description = `Connect with ${practitioner.name}, a certified hypnotherapist in ${practitioner.city}, ${practitioner.state}. ${specialties.length > 0 ? `Specializing in ${specialties.slice(0, 3).join(', ')}.` : ''}`;
  if (description.length > 155) description = description.substring(0, 152) + '...';

  const ogTitle = `${practitioner.name} - Hypnotherapist in ${practitioner.city}, ${practitioner.state}`;
  const ogImage = practitioner.photo_url || 'https://hypnotherapy-finder.com/og-image.jpg';

  return {
    title: ogTitle,
    description,
    alternates: { canonical: `https://hypnotherapy-finder.com/practitioner/${slug}` },
    openGraph: {
      title: ogTitle,
      description,
      url: `https://hypnotherapy-finder.com/practitioner/${slug}`,
      siteName: 'Hypnotherapy Finder',
      images: [{ url: ogImage, width: 1200, height: 630, alt: practitioner.name }],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}

export default async function PractitionerPage({ params }: PractitionerPageProps) {
  const { slug } = await params;
  const practitioner = await getPractitioner(slug);
  if (!practitioner) notFound();

  const specialties = Array.isArray(practitioner.specialties) ? practitioner.specialties : [];
  const websiteUrl = normalizeWebsiteUrl(practitioner.website);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: practitioner.name,
    description: `Certified hypnotherapist specializing in ${specialties.join(', ')}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: practitioner.address,
      addressLocality: practitioner.city,
      addressRegion: practitioner.state,
      addressCountry: 'US',
    },
    ...(practitioner.phone && { telephone: practitioner.phone }),
    ...(websiteUrl && { url: websiteUrl }),
    medicalSpecialty: specialties,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Script id="schema-medical" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="flex-grow pt-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

          {/* Breadcrumbs */}
          <div className="mb-8 flex items-center gap-2 px-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link href="/" className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-gray-300" />
            <Link href="/search" className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors">Find a Therapist</Link>
            <ChevronRight className="h-3 w-3 text-gray-300" />
            <Link href={`/search?location=${practitioner.city}`} className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors">{practitioner.city}</Link>
            <ChevronRight className="h-3 w-3 text-gray-300" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-700">{practitioner.name}</span>
          </div>

          {/* Profile Hero Section */}
          <section className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 mb-12 transform transition-all">
            <div className="h-48 bg-gradient-to-r from-indigo-600 via-indigo-700 to-teal-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-white rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-50%] right-[-10%] w-96 h-96 bg-teal-200 rounded-full blur-[100px]"></div>
              </div>
            </div>
            <div className="px-8 pb-10 -mt-20 relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-8 text-center md:text-left">
                <div className="relative">
                  <div className="size-48 min-w-48 rounded-[2.5rem] border-8 border-white bg-white shadow-2xl overflow-hidden flex items-center justify-center">
                    {practitioner.imageUrl ? (
                      <img alt={practitioner.name} className="w-full h-full object-cover" src={practitioner.imageUrl} />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-300 w-full h-full bg-gray-50">
                        <User className="h-20 w-20" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest mt-2">Certified</span>
                      </div>
                    )}
                  </div>
                  {practitioner.acceptingNewClients && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-2xl border-4 border-white shadow-lg">
                      <ShieldCheck className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col pb-2">
                  <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                      {practitioner.name}
                    </h1>
                    {practitioner.verified === true && practitioner.claim_status === 'claimed' && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-700 shadow-sm ring-1 ring-indigo-100">
                        <CheckCircle className="h-3.5 w-3.5 fill-indigo-700 text-indigo-50" />
                        Verified Professional
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-xl md:text-2xl text-gray-500 font-medium">
                    {practitioner.title || 'Clinical Hypnotherapist & Mindset Coach'}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm">
                    <span className="flex items-center gap-2 font-bold text-gray-600">
                      <MapPin className="h-5 w-5 text-indigo-600" /> {practitioner.city}, {practitioner.state}
                    </span>
                    <span className="flex items-center gap-2 font-bold text-gray-600">
                      <Award className="h-5 w-5 text-indigo-600" /> {practitioner.years_experience || '10'}+ Years Exp.
                    </span>
                    <span className="flex items-center gap-2 font-bold text-gray-600">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" /> 4.9 (82 reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-full shrink-0 gap-4 lg:w-auto pb-2">
                {practitioner.phone && (
                  <Button asChild variant="outline" className="flex-1 lg:flex-none h-14 rounded-2xl border-2 border-gray-100 bg-white px-8 text-sm font-bold text-gray-700 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm">
                    <a href={`tel:${practitioner.phone}`}>Inquiry</a>
                  </Button>
                )}
                <Button className="flex-1 lg:flex-none h-14 rounded-2xl bg-indigo-700 px-10 text-sm font-bold text-white shadow-xl shadow-indigo-100 hover:bg-indigo-800 transition-all transform hover:-translate-y-1">
                  Book Consultation
                </Button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Content */}
            <div className="lg:col-span-8 space-y-12">

              {/* About Section */}
              <div className="bg-[#fffcf8] rounded-[3rem] shadow-sm border border-orange-100/30 overflow-hidden">
                <div className="px-10 py-6 border-b border-orange-100/20 bg-white/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-xl">
                      <User className="h-5 w-5 text-orange-600" />
                    </div>
                    <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-800/60">Introduction</h2>
                  </div>
                </div>
                <div className="p-10 md:p-14">
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-8 leading-tight">Mastering the Mind for Sustainable Change</h2>
                  <div className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-relaxed font-medium space-y-6">
                    {practitioner.bio ? (
                      <p>{practitioner.bio}</p>
                    ) : (
                      <>
                        <p>Welcome. I'm {practitioner.name}, a certified hypnotherapist dedicated to helping individuals unlock their potential and overcome personal challenges in {practitioner.city}. My practice is built on a deep fascination for the subconscious mind and its profound ability to influence our behaviors, emotions, and well-being.</p>
                        <p>I believe that every person holds the key to their own healing. My role is to provide a safe, supportive, and non-judgmental space where you can explore the depths of your mind, identify the root causes of your concerns, and create lasting, positive change.</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Specialties Section */}
              <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-10 md:p-14">
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-2 bg-indigo-50 rounded-xl">
                    <BrainCircuit className="h-6 w-6 text-indigo-700" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Clinical Specialties</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {specialties.map((spec: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 p-5 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-indigo-50/30 hover:border-indigo-100 transition-all group">
                      <div className="p-2 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                        <CheckCircle className="h-5 w-5 text-indigo-600" />
                      </div>
                      <span className="font-bold text-gray-700">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Claims Section */}
              {practitioner.claim_status === 'unclaimed' && (
                <div className="bg-indigo-900 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
                  <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold mb-4">Are you {practitioner.name}?</h2>
                    <p className="text-indigo-100 text-lg mb-8 font-medium max-w-xl">Claim this listing to update your information, manage appointments, and connect with more clients.</p>
                    <Button asChild size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 font-extrabold px-10 py-7 rounded-2xl shadow-xl transform transition-all active:scale-95">
                      <Link href={`/claim-listing?practitioner=${practitioner.id}`} rel="nofollow">Claim Profile Now</Link>
                    </Button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Sidebar */}
            <aside className="lg:col-span-4 space-y-8">

              {/* Contact Card */}
              <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 p-10 border border-gray-50 flex flex-col gap-8">
                <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400">Practice Details</h3>

                <div className="space-y-8">
                  <div className="flex items-center justify-between group cursor-default">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 transition-colors">
                        <Languages className="h-4 w-4 text-indigo-600 group-hover:text-white" />
                      </div>
                      <span className="text-sm font-bold text-gray-500">Languages</span>
                    </div>
                    <span className="text-sm font-extrabold text-gray-900">English, Spanish</span>
                  </div>

                  <div className="flex items-center justify-between group cursor-default">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-teal-50 rounded-xl group-hover:bg-teal-600 transition-colors">
                        <Video className="h-4 w-4 text-teal-600 group-hover:text-white" />
                      </div>
                      <span className="text-sm font-bold text-gray-500">Sessions</span>
                    </div>
                    <span className="text-sm font-extrabold text-gray-900">Virtual & In-Person</span>
                  </div>

                  <div className="flex items-center justify-between group cursor-default">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-50 rounded-xl group-hover:bg-amber-600 transition-colors">
                        <DollarSign className="h-4 w-4 text-amber-600 group-hover:text-white" />
                      </div>
                      <span className="text-sm font-bold text-gray-500">Rate</span>
                    </div>
                    <span className="text-sm font-extrabold text-gray-900">${practitioner.session_price || '150'} - $220</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-50 space-y-4">
                  {practitioner.phone && (
                    <a href={`tel:${practitioner.phone}`} className="flex items-center gap-4 text-gray-700 hover:text-indigo-700 transition-colors group">
                      <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                        <Phone className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-sm tracking-tight">{practitioner.phone}</span>
                    </a>
                  )}
                  {websiteUrl && (
                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-700 hover:text-indigo-700 transition-colors group">
                      <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                        <Globe className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-sm tracking-tight truncate">Official Website</span>
                    </a>
                  )}
                  {practitioner.email && (
                    <a href={`mailto:${practitioner.email}`} className="flex items-center gap-4 text-gray-700 hover:text-indigo-700 transition-colors group">
                      <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                        <Mail className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-sm tracking-tight truncate">{practitioner.email}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Verified Badge */}
              {practitioner.verified === true && practitioner.claim_status === 'claimed' && (
                <div className="bg-green-50 rounded-[2.5rem] p-8 border border-green-100 shadow-sm">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-green-700 mb-4">Verified Practitioner</h4>
                  <div className="flex justify-center mb-4">
                    <a href={`https://hypnotherapy-finder.com/practitioner/${practitioner.slug}`}>
                      <img
                        src={`/api/badge/${practitioner.slug}`}
                        alt="Verified Practitioner - Hypnotherapy Finder"
                        width={200}
                        height={56}
                        className="rounded"
                      />
                    </a>
                  </div>
                  <p className="text-xs text-green-700 text-center font-medium">
                    Identity and credentials verified by Hypnotherapy Finder
                  </p>
                </div>
              )}

              {/* Benefits CTA */}
              <div className="bg-gradient-to-br from-indigo-50 to-white rounded-[2.5rem] p-10 border border-indigo-100/50 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-40 group-hover:scale-150 transition-transform duration-1000"></div>
                <h4 className="font-extrabold text-gray-900 text-lg leading-tight mb-4">Start Your Transformation</h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-8">Most clients see measurable change within 3-5 sessions. Discovery calls are recommended.</p>
                <Button className="w-full h-14 rounded-2xl bg-indigo-700 text-white font-extrabold hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-100">
                  Schedule Free Call
                </Button>
              </div>

            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
