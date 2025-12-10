import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Heart, Brain, CheckCircle, Search, Shield, Clock } from 'lucide-react';
import { getAllPractitioners } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Hypnotherapy for Anxiety - Find Anxiety Hypnotherapists Near You',
  description: 'Hypnotherapy for anxiety helps manage stress, panic attacks, and anxiety disorders. Find certified specialists near you for lasting relief.',
  keywords: 'hypnotherapy for anxiety, anxiety hypnotherapy, hypnosis for anxiety, anxiety treatment, hypnotherapy anxiety relief',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/hypnotherapy-for-anxiety',
  },
  openGraph: {
    title: 'Hypnotherapy for Anxiety - Natural Anxiety Relief',
    description: 'Learn how hypnotherapy can help with anxiety disorders. Find qualified practitioners specializing in anxiety treatment.',
    url: 'https://hypnotherapy-finder.com/hypnotherapy-for-anxiety',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Hypnotherapy for Anxiety',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hypnotherapy for Anxiety - Natural Anxiety Relief',
    description: 'Learn how hypnotherapy can help with anxiety disorders. Find qualified practitioners specializing in anxiety treatment.',
    images: ['/logo.png'],
  },
};

export default async function HypnotherapyForAnxietyPage() {
  const allPractitioners = getAllPractitioners();

  const anxietySpecialists = allPractitioners.filter(p =>
    p.specialties.some(s => s.toLowerCase().includes('anxiety') || s.toLowerCase().includes('stress'))
  ).slice(0, 9);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Hypnotherapy for Anxiety - Natural Relief & Treatment',
    description: 'Comprehensive guide to hypnotherapy for anxiety. Learn how hypnotherapy helps manage anxiety disorders, panic attacks, and chronic stress. Find certified anxiety hypnotherapists.',
    mainEntity: {
      '@type': 'MedicalCondition',
      name: 'Anxiety Disorders',
      possibleTreatment: {
        '@type': 'MedicalTherapy',
        name: 'Hypnotherapy for Anxiety',
        description: 'Evidence-based hypnotherapy techniques for treating anxiety disorders, panic attacks, and stress-related conditions.',
      },
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does hypnotherapy work for anxiety?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, research shows hypnotherapy for anxiety is highly effective. Studies demonstrate that hypnotherapy helps reduce anxiety symptoms, manage panic attacks, and improve overall well-being. It works by addressing the subconscious patterns that contribute to anxiety.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many sessions of hypnotherapy for anxiety do I need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most people see improvement in 4-8 sessions of hypnotherapy for anxiety. The exact number depends on the severity of your anxiety and your individual response to treatment. Your hypnotherapist will create a personalized treatment plan.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is hypnotherapy for anxiety safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, hypnotherapy for anxiety is completely safe when conducted by a certified professional. It\'s a non-invasive, drug-free approach with no negative side effects. You remain in control throughout the session.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can hypnotherapy for anxiety be combined with other treatments?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, hypnotherapy for anxiety works well alongside other treatments like medication, cognitive behavioral therapy (CBT), and lifestyle changes. Always consult with your healthcare providers about combining treatments.',
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
                Hypnotherapy for Anxiety - Natural, Evidence-Based Relief
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Struggling with anxiety? Hypnotherapy for anxiety offers a proven, drug-free approach to managing
                anxiety disorders, panic attacks, and chronic stress. Find certified anxiety hypnotherapists near you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/search?specialty=anxiety">
                    <Search className="h-5 w-5 mr-2" />
                    Find Anxiety Specialists
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-600">
                  <Link href="#how-it-works">How It Works</Link>
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
                  src="/hypnotherapy-for-anxiety.png"
                  alt="Hypnotherapy for anxiety session showing therapist helping client with relaxation techniques for anxiety relief and stress management"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* What is Hypnotherapy for Anxiety */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What is Hypnotherapy for Anxiety?</h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  <strong>Hypnotherapy for anxiety</strong> is a therapeutic approach that uses guided hypnosis to help
                  individuals manage and overcome anxiety disorders. During hypnotherapy for anxiety sessions, a certified
                  hypnotherapist guides you into a deeply relaxed state where your subconscious mind becomes more receptive
                  to positive suggestions and behavioral changes.
                </p>
                <p>
                  Anxiety hypnotherapy works by addressing the root causes of anxiety at a subconscious level. Unlike
                  traditional talk therapy that focuses on conscious thoughts, hypnotherapy for anxiety accesses deeper
                  mental patterns that may be fueling anxious responses. This makes anxiety hypnotherapy particularly
                  effective for individuals who haven't found relief through other methods.
                </p>
                <p>
                  Research shows that hypnotherapy for anxiety can be highly effective. Studies published in the
                  International Journal of Clinical and Experimental Hypnosis demonstrate that anxiety hypnotherapy
                  significantly reduces symptoms in individuals with generalized anxiety disorder, social anxiety,
                  and panic disorders. Many people experience lasting relief after just a few hypnotherapy for anxiety sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Hypnotherapy for Anxiety</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Shield className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">Drug-Free Treatment</h3>
                    <p className="text-gray-700 text-center">
                      Anxiety hypnotherapy offers a natural alternative to medication with no side effects or dependency risks.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Brain className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">Addresses Root Causes</h3>
                    <p className="text-gray-700 text-center">
                      Hypnotherapy for anxiety targets subconscious patterns rather than just managing surface symptoms.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Clock className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">Fast Results</h3>
                    <p className="text-gray-700 text-center">
                      Many clients report significant improvement after just 3-6 hypnotherapy for anxiety sessions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Heart className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">Lasting Relief</h3>
                    <p className="text-gray-700 text-center">
                      Anxiety hypnotherapy creates long-term changes by rewiring subconscious anxiety triggers.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <CheckCircle className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">Personalized Approach</h3>
                    <p className="text-gray-700 text-center">
                      Each hypnotherapy for anxiety session is tailored to your specific triggers and concerns.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Shield className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">Complementary Treatment</h3>
                    <p className="text-gray-700 text-center">
                      Anxiety hypnotherapy works well alongside other treatments like therapy or medication.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">How Hypnotherapy for Anxiety Works</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <span className="text-xl font-bold text-blue-600">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Initial Consultation</h3>
                        <p className="text-gray-700">
                          Your anxiety hypnotherapy journey begins with a consultation where your hypnotherapist learns
                          about your specific anxiety symptoms, triggers, and goals. They'll explain how hypnotherapy
                          for anxiety works and answer your questions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <span className="text-xl font-bold text-blue-600">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Induction and Relaxation</h3>
                        <p className="text-gray-700">
                          The hypnotherapist guides you into a state of deep relaxation through breathing exercises
                          and verbal cues. This relaxed state is where anxiety hypnotherapy becomes most effective,
                          as your mind becomes more open to positive change.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <span className="text-xl font-bold text-blue-600">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Therapeutic Suggestions</h3>
                        <p className="text-gray-700">
                          During hypnotherapy for anxiety, the practitioner introduces positive suggestions and
                          visualizations designed to reduce anxiety responses. These may include relaxation anchors,
                          confidence building, and reframing anxious thoughts into calm, rational perspectives.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <span className="text-xl font-bold text-blue-600">4</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Addressing Root Causes</h3>
                        <p className="text-gray-700">
                          Anxiety hypnotherapy often involves exploring past experiences or patterns that contribute
                          to current anxiety. Your hypnotherapist helps you process these experiences in a safe,
                          controlled environment, reducing their emotional charge.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <span className="text-xl font-bold text-blue-600">5</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Self-Hypnosis Training</h3>
                        <p className="text-gray-700">
                          Most hypnotherapy for anxiety programs include teaching you self-hypnosis techniques.
                          These tools allow you to manage anxiety symptoms on your own between sessions and after
                          treatment concludes, providing lasting benefits.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Anxiety */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Types of Anxiety Treated with Hypnotherapy</h2>
              <p className="text-gray-700 mb-8">
                Hypnotherapy for anxiety is effective for various anxiety disorders and anxiety-related conditions.
                Anxiety hypnotherapy can help whether you experience generalized anxiety or specific anxiety triggers.
              </p>
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Generalized Anxiety Disorder (GAD)</h3>
                    <p className="text-gray-700">
                      Hypnotherapy for anxiety helps those with GAD reduce constant worry and excessive anxiety about
                      everyday situations. Anxiety hypnotherapy teaches your mind to respond more calmly to stressors.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Social Anxiety Disorder</h3>
                    <p className="text-gray-700">
                      For social anxiety, hypnotherapy helps reduce fear of judgment and embarrassment in social
                      situations. Anxiety hypnotherapy builds confidence and changes negative self-perceptions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Panic Disorder and Panic Attacks</h3>
                    <p className="text-gray-700">
                      Hypnotherapy for anxiety teaches techniques to prevent and manage panic attacks. Anxiety
                      hypnotherapy helps break the cycle of fear that often perpetuates panic disorder.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Performance Anxiety</h3>
                    <p className="text-gray-700">
                      Whether it's public speaking, test anxiety, or stage fright, hypnotherapy for anxiety helps
                      performers and professionals overcome situational anxiety and perform at their best.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Health Anxiety</h3>
                    <p className="text-gray-700">
                      Anxiety hypnotherapy addresses excessive worry about health and illness. Hypnotherapy for
                      anxiety helps reframe health concerns and reduce compulsive health-checking behaviors.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Specific Phobias</h3>
                    <p className="text-gray-700">
                      From fear of flying to fear of enclosed spaces, hypnotherapy for anxiety is highly effective
                      for treating specific phobias by desensitizing triggers at a subconscious level.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Find Specialists */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Find Hypnotherapists Specializing in Anxiety Treatment
              </h2>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Connect with certified hypnotherapists who specialize in anxiety hypnotherapy. Each practitioner
                has experience helping clients overcome anxiety disorders using proven hypnotherapy techniques.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {anxietySpecialists.map((practitioner) => (
                  <Card key={practitioner.id} className="hover:shadow-lg transition">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-lg mb-2">{practitioner.name}</h3>
                      {practitioner.credentials && (
                        <p className="text-sm text-blue-600 mb-3">{practitioner.credentials}</p>
                      )}
                      <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
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
                  <Link href="/search?specialty=anxiety">
                    View All Anxiety Specialists
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">What to Expect from Hypnotherapy for Anxiety</h2>
              <div className="space-y-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">During Your First Session</h3>
                    <p className="text-gray-700 mb-4">
                      Your first hypnotherapy for anxiety session typically lasts 60-90 minutes. The hypnotherapist
                      will discuss your anxiety symptoms, medical history, and goals. They'll explain how anxiety
                      hypnotherapy works and may begin with a gentle induction to help you experience the relaxed state.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>You remain fully aware and in control throughout the session</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Most people describe the experience as deeply relaxing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>You can stop the session at any time if you feel uncomfortable</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Timeline for Results</h3>
                    <p className="text-gray-700 mb-4">
                      Many people notice improvements after their first hypnotherapy for anxiety session, though
                      lasting change typically requires 4-8 sessions. The timeline varies based on:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Severity and duration of your anxiety</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Your responsiveness to hypnotherapy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Whether you practice self-hypnosis between sessions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Consistency of your session schedule</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions About Hypnotherapy for Anxiety</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Is hypnotherapy for anxiety safe?</h3>
                    <p className="text-gray-700">
                      Yes, anxiety hypnotherapy is completely safe when conducted by a certified professional. You remain
                      in control throughout the session and cannot be made to do anything against your will. Hypnotherapy
                      for anxiety has no harmful side effects and is recognized by major medical organizations as a
                      legitimate therapeutic approach.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Can hypnotherapy for anxiety replace medication?</h3>
                    <p className="text-gray-700">
                      While anxiety hypnotherapy can be highly effective, you should never stop prescribed medication
                      without consulting your doctor. Many people use hypnotherapy for anxiety alongside medication,
                      and some are eventually able to reduce medication under medical supervision. Always work with
                      both your hypnotherapist and doctor for the best results.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">How long does hypnotherapy for anxiety take to work?</h3>
                    <p className="text-gray-700">
                      Many people experience some relief after their first session of anxiety hypnotherapy, but lasting
                      results typically require 4-8 sessions. Some individuals with severe or long-standing anxiety may
                      benefit from ongoing sessions. Your hypnotherapist will create a personalized treatment plan based
                      on your needs.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">What if I can't be hypnotized?</h3>
                    <p className="text-gray-700">
                      Nearly everyone can benefit from hypnotherapy for anxiety. Hypnosis is a natural state that most
                      people experience daily (like when absorbed in a book or movie). A skilled anxiety hypnotherapist
                      can work with different levels of suggestibility. The key is finding a practitioner you trust and
                      feel comfortable with.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Does insurance cover hypnotherapy for anxiety?</h3>
                    <p className="text-gray-700">
                      Some insurance plans cover anxiety hypnotherapy when provided by a licensed healthcare professional.
                      Coverage varies by provider and plan. Many hypnotherapists offer package deals or payment plans.
                      Contact practitioners directly through our directory to ask about insurance acceptance and pricing.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources - Internal Links */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Related Hypnotherapy Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/quit-smoking-hypnotherapy" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">Quit Smoking Hypnotherapy</h3>
                  <p className="text-sm text-gray-600">Break free from nicotine addiction with proven hypnotherapy techniques</p>
                </Link>
                <Link href="/weight-loss-hypnotherapy" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">Weight Loss Hypnotherapy</h3>
                  <p className="text-sm text-gray-600">Address emotional eating and achieve sustainable weight management</p>
                </Link>
                <Link href="/how-it-works" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">How Hypnotherapy Works</h3>
                  <p className="text-sm text-gray-600">Learn about the science and process behind hypnotherapy treatment</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Overcome Anxiety with Hypnotherapy?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Take the first step toward lasting anxiety relief. Find a certified hypnotherapist specializing
                in anxiety treatment near you today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/search?specialty=anxiety">
                    <Search className="h-5 w-5 mr-2" />
                    Find Anxiety Hypnotherapists
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-600">
                  <Link href="/hypnotherapy-near-me">Browse All Hypnotherapists</Link>
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
