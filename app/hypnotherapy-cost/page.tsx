import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Script from 'next/script';
import { DollarSign, MapPin, CheckCircle, Search, CreditCard } from 'lucide-react';

export const metadata = {
  title: 'How Much Does Hypnotherapy Cost? 2025 Prices & Insurance Coverage',
  description: 'Complete guide to hypnotherapy costs: average session prices, insurance coverage, payment options, and cost by condition. Find affordable hypnotherapy near you.',
  keywords: 'how much does hypnotherapy cost, hypnotherapy cost, hypnotherapy prices, hypnotherapy insurance coverage, how much is hypnotherapy',
};

export default function HypnotherapyCostPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does hypnotherapy cost per session?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hypnotherapy costs between $75 and $300 per session in the United States, with a national average of $150 per session. Prices vary based on location, practitioner credentials and experience, session length (typically 60-90 minutes), and specialty area. Major cities like New York, Los Angeles, and San Francisco charge $200-$300 per session, while smaller cities and rural areas typically charge $75-$150. Initial consultations often cost more ($150-$250) as they are longer and more comprehensive."
        }
      },
      {
        "@type": "Question",
        "name": "Is hypnotherapy covered by insurance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Some insurance plans cover hypnotherapy when specific conditions are met: (1) the practitioner is a licensed healthcare professional (psychologist, physician, licensed clinical social worker), (2) hypnotherapy is used to treat a covered medical or mental health condition, (3) treatment is deemed medically necessary. Commonly covered conditions include chronic pain management, anxiety disorders, PTSD, smoking cessation, and IBS. Medicare may cover hypnotherapy in limited circumstances. Coverage varies significantly by insurance provider and plan. Always verify coverage with your insurance company before starting treatment and get pre-authorization if required."
        }
      },
      {
        "@type": "Question",
        "name": "How many hypnotherapy sessions do I need?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most people need 4-8 hypnotherapy sessions for optimal results, though this varies by condition and individual. Smoking cessation may only require 1-3 sessions for some people. Anxiety, weight loss, and phobias typically need 4-6 sessions. Chronic conditions like pain management or trauma may require 8-12+ sessions. Your hypnotherapist will create a treatment plan based on your specific needs. Total costs typically range from $300 for single-session smoking cessation to $1,200-$2,400 for comprehensive 8-session programs."
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
                How Much Does Hypnotherapy Cost? Complete Pricing Guide
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Comprehensive breakdown of hypnotherapy costs, insurance coverage, payment options,
                and how to find affordable hypnotherapy near you.
              </p>
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <DollarSign className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Quick Answer: Average Hypnotherapy Cost
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div>
                          <p className="font-semibold mb-1">National Average</p>
                          <p className="text-3xl font-bold text-blue-600">$150</p>
                          <p className="text-sm">per session</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Typical Range</p>
                          <p className="text-3xl font-bold text-blue-600">$75-$300</p>
                          <p className="text-sm">depending on location & experience</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Pricing */}
        <section id="pricing" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Hypnotherapy Cost Breakdown</h2>

              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Cost by Location</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-semibold">Major Cities (NYC, LA, SF, Chicago)</p>
                          <p className="text-sm text-gray-600">High cost of living areas</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$200-$300</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-semibold">Medium Cities (Austin, Denver, Seattle)</p>
                          <p className="text-sm text-gray-600">Moderate cost of living</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$125-$200</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <div>
                          <p className="font-semibold">Smaller Cities & Rural Areas</p>
                          <p className="text-sm text-gray-600">Lower cost of living</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$75-$150</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Cost by Practitioner Credentials</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-semibold">Licensed Psychologist/Physician</p>
                          <p className="text-sm text-gray-600">Advanced degrees + hypnotherapy training</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$175-$300</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-semibold">Licensed Therapist/Counselor</p>
                          <p className="text-sm text-gray-600">Master's degree + certification</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$125-$200</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <div>
                          <p className="font-semibold">Certified Hypnotherapist (CHt)</p>
                          <p className="text-sm text-gray-600">Hypnotherapy certification only</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$75-$150</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Cost by Session Type</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-semibold">Initial Consultation</p>
                          <p className="text-sm text-gray-600">90-120 minutes, comprehensive assessment</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$150-$250</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-semibold">Standard Session</p>
                          <p className="text-sm text-gray-600">60-75 minutes, ongoing treatment</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$100-$200</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-semibold">Online/Virtual Session</p>
                          <p className="text-sm text-gray-600">60 minutes via video call</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$75-$150</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <div>
                          <p className="font-semibold">Group Session</p>
                          <p className="text-sm text-gray-600">Per person, 90 minutes</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$30-$75</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Total Cost by Condition</h3>
                    <p className="text-gray-700 mb-4">
                      How much does hypnotherapy cost depends on how many sessions you need:
                    </p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-semibold">Smoking Cessation</p>
                          <p className="text-sm text-gray-600">1-3 sessions typically</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$150-$600</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-semibold">Phobias & Specific Fears</p>
                          <p className="text-sm text-gray-600">3-5 sessions typically</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$450-$1,000</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <div>
                          <p className="font-semibold">Anxiety, Weight Loss, Confidence</p>
                          <p className="text-sm text-gray-600">6-8 sessions typically</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$900-$1,600</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <div>
                          <p className="font-semibold">Chronic Pain, Trauma, IBS</p>
                          <p className="text-sm text-gray-600">8-12+ sessions typically</p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">$1,200-$3,000+</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Coverage */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Is Hypnotherapy Covered by Insurance?</h2>

              <Card className="mb-8">
                <CardContent className="pt-6">
                  <p className="text-gray-700 mb-4">
                    <strong>Is hypnotherapy covered by insurance?</strong> The answer depends on several factors.
                    Some insurance plans do cover hypnotherapy, while others don't. Here's what you need to know:
                  </p>

                  <h3 className="font-semibold text-lg mb-3">When Insurance Typically Covers Hypnotherapy:</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Provided by a licensed healthcare professional (psychologist, physician, LCSW)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Used to treat a covered medical or mental health condition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Deemed medically necessary by your doctor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Pre-authorized by your insurance company (if required)</span>
                    </li>
                  </ul>

                  <h3 className="font-semibold text-lg mb-3">Commonly Covered Conditions:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">• Chronic pain management</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">• Anxiety disorders</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">• PTSD and trauma</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">• IBS and digestive disorders</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">• Smoking cessation programs</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">• Sleep disorders</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-2xl font-semibold mb-4">How to Get Insurance Coverage</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Contact Your Insurance Provider</h4>
                        <p className="text-gray-700">
                          Call the number on your insurance card and ask about coverage for "clinical hypnosis"
                          or "hypnotherapy." Ask what conditions are covered and what credentials the provider needs.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Find an In-Network Provider</h4>
                        <p className="text-gray-700">
                          Ask for a list of in-network hypnotherapists or licensed healthcare providers who
                          practice clinical hypnosis. Out-of-network providers may require higher copays or
                          may not be covered at all.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Get a Referral if Required</h4>
                        <p className="text-gray-700">
                          Some plans require a referral from your primary care physician. Ask your doctor to
                          refer you for hypnotherapy to treat your specific medical or mental health condition.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Request Pre-Authorization</h4>
                        <p className="text-gray-700">
                          Many insurance plans require pre-authorization for hypnotherapy. Your hypnotherapist
                          or their billing department can usually help with this process.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                        5
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Keep Detailed Records</h4>
                        <p className="text-gray-700">
                          Save all receipts, session notes, and documentation. Even if not covered initially,
                          you may be able to submit for reimbursement. Some plans cover a percentage after you
                          meet your deductible.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Options */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Payment Options & Ways to Save</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <CreditCard className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Package Deals</h3>
                    <p className="text-gray-700 text-sm">
                      Many hypnotherapists offer discounted rates when you buy multiple sessions upfront.
                      A 6-session package might save you 10-20% compared to paying per session.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <CreditCard className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Sliding Scale Fees</h3>
                    <p className="text-gray-700 text-sm">
                      Some practitioners offer sliding scale fees based on income. Ask if this option
                      is available, especially if you're experiencing financial hardship.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <CreditCard className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-lg mb-2">HSA/FSA Accounts</h3>
                    <p className="text-gray-700 text-sm">
                      If hypnotherapy is medically necessary, you may be able to use Health Savings Account
                      (HSA) or Flexible Spending Account (FSA) funds to pay for sessions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <CreditCard className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Payment Plans</h3>
                    <p className="text-gray-700 text-sm">
                      Ask about payment plans that allow you to spread the cost over several months.
                      Many practitioners work with services like CareCredit for healthcare financing.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <CreditCard className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Online Sessions</h3>
                    <p className="text-gray-700 text-sm">
                      Virtual hypnotherapy sessions often cost 20-40% less than in-person sessions and
                      can be just as effective for many conditions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <CreditCard className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Group Sessions</h3>
                    <p className="text-gray-700 text-sm">
                      Group hypnotherapy for issues like smoking cessation or weight loss costs
                      significantly less per person ($30-$75) than individual sessions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Find Affordable Hypnotherapy Near You
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Compare prices, check insurance acceptance, and find qualified hypnotherapists
                in your area through our free directory.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/hypnotherapy-near-me">
                    <MapPin className="h-5 w-5 mr-2" />
                    Find Hypnotherapists Near Me
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-600">
                  <Link href="/search">Search Directory</Link>
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
