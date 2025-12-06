import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Brain, CheckCircle, Search, BookOpen, Users } from 'lucide-react';

export const metadata = {
  title: 'What is Hypnotherapy? Complete Guide to Hypnosis Therapy | 2025',
  description: 'What is hypnotherapy and how does it work? Learn everything about hypnotherapy, clinical hypnosis, and therapeutic hypnosis. Evidence-based answers to all your hypnotherapy questions.',
  keywords: 'what is hypnotherapy, hypnosis therapy, clinical hypnosis, therapeutic hypnosis, hypnotherapy definition',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/what-is-hypnotherapy',
  },
};

export default function WhatIsHypnotherapyPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is hypnotherapy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hypnotherapy is a form of complementary therapy that uses guided hypnosis to help individuals achieve a heightened state of focus and concentration. During hypnotherapy, a trained hypnotherapist guides the client into a relaxed, trance-like state where the subconscious mind becomes more receptive to positive suggestions and behavioral changes. Hypnotherapy is used to treat various conditions including anxiety, pain management, smoking cessation, weight loss, phobias, and stress-related disorders."
        }
      },
      {
        "@type": "Question",
        "name": "Does hypnotherapy work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, hypnotherapy works for many people and conditions. Research shows hypnotherapy is effective for pain management, anxiety reduction, smoking cessation, weight loss, and IBS treatment. Studies published in peer-reviewed journals demonstrate that hypnotherapy produces measurable changes in brain activity and behavior. Success rates vary by individual and condition, but meta-analyses show hypnotherapy significantly outperforms placebo treatments. The American Psychological Association recognizes hypnotherapy as a valid therapeutic approach."
        }
      },
      {
        "@type": "Question",
        "name": "How much does hypnotherapy cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hypnotherapy typically costs between $75 and $300 per session in the United States, with the national average around $150 per session. Prices vary based on location, practitioner experience, session length, and specialty. Major cities tend to have higher rates ($150-$300), while smaller areas may charge $75-$150. Some hypnotherapists offer package deals for multiple sessions at reduced rates. Insurance coverage varies - some plans cover hypnotherapy when provided by licensed healthcare professionals for specific conditions."
        }
      },
      {
        "@type": "Question",
        "name": "Is hypnotherapy covered by insurance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hypnotherapy insurance coverage depends on your insurance plan, the condition being treated, and the practitioner's credentials. Some insurance companies cover hypnotherapy when: (1) it's provided by a licensed healthcare professional such as a psychologist or physician, (2) it's used to treat a covered medical or mental health condition, and (3) it's deemed medically necessary. Common covered conditions include chronic pain, anxiety disorders, smoking cessation, and IBS. Medicare may cover hypnotherapy in specific circumstances. Always verify coverage with your insurance provider before starting treatment."
        }
      },
      {
        "@type": "Question",
        "name": "Does hypnotherapy work for weight loss?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, hypnotherapy can be effective for weight loss when combined with healthy eating and exercise. Research shows people who use hypnotherapy for weight loss lose more weight than those using diet and exercise alone. A meta-analysis in the Journal of Consulting and Clinical Psychology found hypnotherapy participants lost more weight than 90% of control subjects. Hypnotherapy works for weight loss by addressing emotional eating, reducing cravings, increasing motivation for exercise, and changing subconscious beliefs about food. Results are most effective when hypnotherapy is part of a comprehensive weight management program."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="beforeInteractive"
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                What is Hypnotherapy? Your Complete Guide
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Discover everything about hypnotherapy: what it is, how it works, what it treats,
                costs, effectiveness, and how to find qualified practitioners.
              </p>
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="/hypnotherapy-near-me">
                  <Search className="h-5 w-5 mr-2" />
                  Find a Hypnotherapist
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/what-is-hypnotherapy.png"
                  alt="What is hypnotherapy explained with professional hypnotherapist conducting therapeutic session demonstrating clinical hypnotherapy techniques for anxiety, weight loss, and behavioral change"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What is Hypnotherapy? Definition and Overview</h2>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6 mb-12">
                <p>
                  <strong>Hypnotherapy</strong> is a form of complementary therapy that uses guided hypnosis to help
                  individuals achieve specific therapeutic goals. During hypnotherapy sessions, a trained and certified
                  hypnotherapist guides the client into a deeply relaxed, focused state of consciousness known as a
                  hypnotic trance. In this state, the subconscious mind becomes more receptive to positive suggestions,
                  making it easier to change unwanted behaviors, overcome fears, and address psychological or physical issues.
                </p>

                <p>
                  What is hypnotherapy used for? Hypnotherapy is used to treat a wide range of conditions including:
                  anxiety and stress, chronic pain, smoking addiction, weight management, phobias, sleep disorders,
                  PTSD and trauma, IBS and digestive issues, confidence and performance issues, and many other
                  behavioral and psychological concerns.
                </p>

                <p>
                  It's important to understand what hypnotherapy is NOT. Hypnotherapy is not mind control, and you
                  cannot be made to do anything against your will. You remain fully aware and in control throughout
                  the session. Hypnotherapy is also not sleep - you are awake and alert, simply in a deeply focused
                  and relaxed state similar to daydreaming or being absorbed in a good book.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Brain className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Evidence-Based</h3>
                    <p className="text-sm text-gray-600">
                      Recognized by major medical organizations with extensive research support
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Widely Used</h3>
                    <p className="text-sm text-gray-600">
                      Millions of people worldwide use hypnotherapy for various health concerns
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Long History</h3>
                    <p className="text-sm text-gray-600">
                      Used therapeutically for over 200 years with modern clinical applications
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-3xl font-bold mb-6">How Does Hypnotherapy Work?</h2>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6 mb-12">
                <p>
                  Understanding what hypnotherapy is requires knowing how hypnotherapy works. The process involves
                  several key mechanisms that make it effective for behavioral and psychological change.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900">The Hypnotic State</h3>
                <p>
                  During hypnotherapy, the brain enters an altered state of consciousness characterized by heightened
                  focus and suggestibility. Brain imaging studies show that hypnosis creates distinct patterns of
                  brain activity. The prefrontal cortex (responsible for critical thinking) becomes less active,
                  while areas associated with imagination and emotional processing become more active. This allows
                  the hypnotherapist to work directly with the subconscious mind, where many automatic behaviors
                  and emotional responses are stored.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900">Accessing the Subconscious Mind</h3>
                <p>
                  What is hypnotherapy's main advantage? It provides direct access to the subconscious mind. Your
                  subconscious controls automatic behaviors, habits, and emotional reactions. While conscious willpower
                  alone often fails to change deep-seated patterns, hypnotherapy bypasses conscious resistance and
                  works with the subconscious to create lasting change. This is why hypnotherapy is often more
                  effective than traditional talk therapy or willpower alone for certain issues.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900">The Power of Suggestion</h3>
                <p>
                  In the hypnotic state, positive suggestions become more readily accepted by the subconscious mind.
                  These suggestions can help reframe negative thought patterns, reduce anxiety responses, eliminate
                  cravings, increase motivation, and create new, healthier behavioral patterns. The hypnotherapist
                  carefully crafts suggestions tailored to your specific goals and needs.
                </p>
              </div>

              <h2 className="text-3xl font-bold mb-6">Does Hypnotherapy Work? Scientific Evidence</h2>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6 mb-12">
                <p>
                  One of the most common questions about what hypnotherapy is: "Does hypnotherapy actually work?"
                  The scientific evidence is clear: yes, hypnotherapy works for many conditions and many people.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900">Research-Proven Effectiveness</h3>
                <p>
                  Numerous peer-reviewed studies demonstrate hypnotherapy's effectiveness:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Pain Management:</strong> A meta-analysis of 18 studies found hypnotherapy provides
                    significant pain relief for 75% of clinical and experimental pain conditions. Hypnotherapy is
                    particularly effective for chronic pain, surgical pain, and cancer pain.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Anxiety:</strong> Multiple studies show hypnotherapy significantly reduces anxiety
                    symptoms. A 2019 study found hypnotherapy as effective as cognitive behavioral therapy for anxiety
                    disorders.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Smoking Cessation:</strong> Research indicates hypnotherapy produces higher quit
                    rates than unassisted quitting and is comparable to nicotine replacement therapy. Some studies
                    show quit rates of 30-60% with hypnotherapy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>IBS:</strong> The American College of Gastroenterology recognizes hypnotherapy
                    as an effective treatment for IBS. Studies show 70-80% of IBS patients experience significant
                    symptom improvement with gut-directed hypnotherapy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Weight Loss:</strong> Meta-analyses show hypnotherapy significantly enhances
                    weight loss when combined with diet and exercise. Participants using hypnotherapy lose more
                    weight and maintain losses better than those using diet alone.</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-semibold text-gray-900">Medical Recognition</h3>
                <p>
                  Major medical and psychological organizations recognize hypnotherapy as a legitimate therapeutic
                  approach. The American Psychological Association (APA), British Medical Association, and American
                  Medical Association have all endorsed clinical hypnosis when practiced by qualified professionals.
                </p>
              </div>

              <h2 className="text-3xl font-bold mb-6">How Much Does Hypnotherapy Cost?</h2>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6 mb-12">
                <p>
                  When considering what hypnotherapy is and whether to pursue it, cost is an important factor.
                  How much does hypnotherapy cost varies based on several factors:
                </p>

                <h3 className="text-2xl font-semibold text-gray-900">Average Hypnotherapy Costs</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span><strong>Per Session:</strong> $75-$300, with a national average of $150 per session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span><strong>Initial Consultation:</strong> Often longer and may cost $150-$250</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span><strong>Package Deals:</strong> Many practitioners offer 4-8 session packages at
                    reduced per-session rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span><strong>Online Sessions:</strong> Often $50-$100 less than in-person sessions</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-semibold text-gray-900">Factors Affecting Cost</h3>
                <p>
                  How much is hypnotherapy in your area depends on location (major cities cost more), practitioner
                  credentials and experience (licensed healthcare providers often charge more), session length
                  (60-90 minutes is standard), specialty area (some specialties command higher rates), and whether
                  it's in-person or virtual.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900">Is Hypnotherapy Covered by Insurance?</h3>
                <p>
                  Insurance coverage for hypnotherapy varies. Some insurance plans cover hypnotherapy when provided
                  by licensed healthcare professionals (psychologists, physicians, licensed clinical social workers)
                  for specific medical or mental health conditions. Commonly covered conditions include chronic pain
                  management, anxiety disorders, PTSD, smoking cessation programs, and IBS treatment.
                </p>
                <p>
                  To determine if hypnotherapy is covered by insurance for you, contact your insurance provider
                  and ask about coverage for "clinical hypnosis" or "hypnotherapy." Get pre-authorization if
                  required. Ensure your hypnotherapist is a licensed healthcare provider if insurance coverage
                  is needed. Keep detailed records and receipts for potential reimbursement.
                </p>
              </div>

              <h2 className="text-3xl font-bold mb-6">What Does Hypnotherapy Treat?</h2>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6 mb-12">
                <p>
                  Understanding what hypnotherapy is includes knowing what conditions it can help treat.
                  Hypnotherapy is used for a wide variety of physical, psychological, and behavioral issues:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Mental Health</h3>
                    <ul className="space-y-2">
                      <li>• Anxiety and panic disorders</li>
                      <li>• Depression (as complementary treatment)</li>
                      <li>• PTSD and trauma</li>
                      <li>• Stress management</li>
                      <li>• Phobias and fears</li>
                      <li>• OCD symptoms</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Behavioral Issues</h3>
                    <ul className="space-y-2">
                      <li>• Smoking cessation</li>
                      <li>• Weight loss and management</li>
                      <li>• Nail biting and other habits</li>
                      <li>• Insomnia and sleep issues</li>
                      <li>• Alcoholism support</li>
                      <li>• Confidence building</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Physical Health</h3>
                    <ul className="space-y-2">
                      <li>• Chronic pain management</li>
                      <li>• IBS and digestive disorders</li>
                      <li>• Migraines and headaches</li>
                      <li>• Skin conditions (eczema, psoriasis)</li>
                      <li>• Surgical recovery</li>
                      <li>• Childbirth preparation</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance</h3>
                    <ul className="space-y-2">
                      <li>• Public speaking anxiety</li>
                      <li>• Sports performance</li>
                      <li>• Test and exam anxiety</li>
                      <li>• Creative blocks</li>
                      <li>• Fear of flying</li>
                      <li>• Relationship issues</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6">Hypnotherapy Training and Credentials</h2>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6 mb-12">
                <p>
                  When seeking to understand what hypnotherapy is, it's important to know about hypnotherapy
                  training and professional credentials. Not all hypnotherapists have the same level of training
                  or qualifications.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900">Common Hypnotherapy Certifications</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span><strong>CHt (Certified Hypnotherapist):</strong> Basic certification requiring 100-200
                    hours of training from an accredited hypnotherapy school</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span><strong>NGH (National Guild of Hypnotists):</strong> Largest hypnotherapy organization
                    offering various certification levels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span><strong>ABH (American Board of Hypnotherapy):</strong> Professional certification
                    with continuing education requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span><strong>IACT (International Association of Counselors & Therapists):</strong>
                    Recognized certification for hypnotherapy practitioners</span>
                  </li>
                </ul>

                <p>
                  The most qualified hypnotherapists are often licensed healthcare providers (psychologists,
                  physicians, licensed counselors) who have additional training in clinical hypnosis. These
                  practitioners can integrate hypnotherapy with other evidence-based treatments and are more
                  likely to be covered by insurance.
                </p>
              </div>

              <h2 className="text-3xl font-bold mb-6">Finding a Qualified Hypnotherapist</h2>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6 mb-12">
                <p>
                  Now that you understand what hypnotherapy is, finding the right practitioner is crucial for
                  success. Here's what to look for:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Proper Credentials:</strong> Look for CHt certification at minimum, preferably
                    from NGH, ABH, or IACT. Licensed healthcare providers with hypnotherapy training are ideal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Experience:</strong> Ask how long they've practiced and how many clients they've
                    treated for your specific concern.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Specialization:</strong> Some hypnotherapists specialize in specific areas like
                    smoking cessation, weight loss, or trauma. Find one who specializes in your concern.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Professional Approach:</strong> Legitimate hypnotherapists provide clear
                    information about their training, methods, and success rates. Avoid anyone making unrealistic
                    promises or guarantees.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <span><strong>Good Rapport:</strong> You should feel comfortable with your hypnotherapist.
                    Trust and comfort are essential for effective hypnotherapy.</span>
                  </li>
                </ul>
              </div>

              <Card className="bg-blue-50 border-blue-200 mb-12">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-3">Ready to Try Hypnotherapy?</h3>
                  <p className="text-gray-700 mb-4">
                    Now that you know what hypnotherapy is, how it works, and what it can treat, you can find
                    qualified hypnotherapists in your area through our free directory.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild>
                      <Link href="/hypnotherapy-near-me">
                        Find Hypnotherapists Near Me
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/search">
                        Search by Specialty
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Related Hypnotherapy Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/hypnotherapy-near-me" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">Find Hypnotherapists Near Me</h3>
                  <p className="text-sm text-gray-600">Search our directory of certified practitioners in your area</p>
                </Link>
                <Link href="/how-it-works" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">How Hypnotherapy Works</h3>
                  <p className="text-sm text-gray-600">Understand the hypnotherapy process and what to expect</p>
                </Link>
                <Link href="/hypnotherapy-cost" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">Hypnotherapy Cost Guide</h3>
                  <p className="text-sm text-gray-600">Learn about session costs and insurance coverage</p>
                </Link>
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
