import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Script from 'next/script';
import { CheckCircle, XCircle, Brain, TrendingUp, Search } from 'lucide-react';

export const metadata = {
  title: 'Does Hypnotherapy Work? Scientific Evidence & Success Rates | 2025',
  description: 'Does hypnotherapy really work? Scientific evidence, success rates, and effectiveness for anxiety, weight loss, smoking, and pain management.',
  keywords: 'does hypnotherapy work, hypnotherapy effectiveness, hypnotherapy success rate, clinical hypnosis research',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/does-hypnotherapy-work',
  },
  openGraph: {
    title: 'Does Hypnotherapy Work? Scientific Evidence & Success Rates',
    description: 'Does hypnotherapy really work? Comprehensive review of scientific evidence, success rates, and effectiveness.',
    url: 'https://hypnotherapy-finder.com/does-hypnotherapy-work',
    type: 'article',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Does Hypnotherapy Work - Scientific Evidence',
      }
    ],
  },
};

export default function DoesHypnotherapyWorkPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does hypnotherapy really work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, hypnotherapy works for many conditions when practiced by qualified professionals. Extensive scientific research demonstrates hypnotherapy's effectiveness for pain management (75% of patients show improvement), anxiety reduction (comparable to CBT), smoking cessation (30-60% quit rates), IBS (70-80% symptom improvement), and weight loss (enhanced results when combined with diet/exercise). The American Psychological Association, American Medical Association, and British Medical Association all recognize clinical hypnosis as a legitimate therapeutic approach. Success depends on individual responsiveness, practitioner skill, and the specific condition being treated."
        }
      },
      {
        "@type": "Question",
        "name": "Does hypnotherapy work for weight loss?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, hypnotherapy works for weight loss and has been proven effective in multiple scientific studies. A meta-analysis in the Journal of Consulting and Clinical Psychology found that people using hypnotherapy lost more weight than 90% of control group subjects. Research shows hypnotherapy enhances weight loss by reducing emotional eating, decreasing food cravings, increasing exercise motivation, and changing subconscious beliefs about food. Results are most significant when hypnotherapy is combined with healthy diet and regular exercise. Studies show weight loss hypnotherapy participants lose 5-15% more weight than those using diet and exercise alone."
        }
      },
      {
        "@type": "Question",
        "name": "What is the success rate of hypnotherapy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hypnotherapy success rates vary by condition but are generally high compared to other treatments. Research shows: Pain management 75% effectiveness, Smoking cessation 30-60% quit rates (vs 5-7% cold turkey), IBS 70-80% symptom improvement, Anxiety 60-80% significant reduction, Weight loss 90th percentile compared to diet alone, Phobias 70-85% improvement, Insomnia 60-75% better sleep quality. Success depends on individual suggestibility, practitioner experience, number of sessions, client motivation, and the specific condition. Most conditions require 4-8 sessions for optimal results."
        }
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Does Hypnotherapy Work? Scientific Evidence & Success Rates",
    "description": "Comprehensive review of scientific research on hypnotherapy effectiveness, success rates, and evidence-based applications.",
    "author": {
      "@type": "Organization",
      "name": "Hypnotherapy Finder"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hypnotherapy Finder"
    },
    "datePublished": "2025-01-15",
    "dateModified": "2025-01-15"
  };

  return (
    <>
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="schema-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="beforeInteractive"
      />

      <div className="min-h-screen flex-col">
        <Header />

        <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Does Hypnotherapy Work? Scientific Evidence & Research
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Comprehensive review of clinical research, success rates, and evidence-based applications
                of hypnotherapy for various conditions.
              </p>
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="#evidence">View the Evidence</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Yes, Hypnotherapy Works - Here's the Evidence
                      </h2>
                      <p className="text-gray-700 text-lg mb-4">
                        Extensive scientific research confirms that hypnotherapy is an effective treatment for many
                        conditions when practiced by qualified professionals. Major medical organizations including
                        the American Psychological Association and American Medical Association recognize clinical
                        hypnosis as a legitimate therapeutic approach.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <span><strong>75%</strong> effectiveness for pain management</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <span><strong>30-60%</strong> smoking cessation success</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <span><strong>70-80%</strong> IBS symptom improvement</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          <span><strong>90th percentile</strong> weight loss results</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Evidence Section */}
        <section id="evidence" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Scientific Evidence: Does Hypnotherapy Work?</h2>

              <div className="space-y-8">
                {/* Pain Management */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Brain className="h-8 w-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">Pain Management</h3>
                        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                          75% Effectiveness Rate
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      <strong>Does hypnotherapy work for pain?</strong> Extensive research confirms yes. A comprehensive
                      meta-analysis of 18 studies published in the International Journal of Clinical and Experimental
                      Hypnosis found that hypnotherapy provides substantial pain relief for approximately 75% of both
                      clinical and experimental pain conditions.
                    </p>
                    <h4 className="font-semibold mb-2">Key Research Findings:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Chronic pain: 60-80% of patients report significant reduction in pain intensity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Cancer pain: Hypnotherapy reduces pain by 50% on average (Journal of Pain)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Surgical pain: Patients using hypnotherapy require 50% less pain medication post-surgery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Migraines: 70% reduction in frequency and severity with regular hypnotherapy</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Anxiety */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Brain className="h-8 w-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">Anxiety and Stress</h3>
                        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                          60-80% Improvement Rate
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      <strong>Does hypnotherapy work for anxiety?</strong> Yes, with results comparable to cognitive
                      behavioral therapy (CBT). A 2019 systematic review found hypnotherapy produces significant
                      anxiety reduction across multiple anxiety disorders.
                    </p>
                    <h4 className="font-semibold mb-2">Evidence-Based Results:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Generalized anxiety: 70% of patients show clinically significant improvement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Social anxiety: Hypnotherapy as effective as CBT in head-to-head studies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Test anxiety: 80% reduction in anxiety symptoms (American Journal of Clinical Hypnosis)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Performance anxiety: Significant improvement in 75% of cases</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Weight Loss */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Brain className="h-8 w-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">Weight Loss</h3>
                        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                          90th Percentile Results
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      <strong>Does hypnotherapy work for weight loss?</strong> Research strongly supports yes.
                      A landmark meta-analysis in the Journal of Consulting and Clinical Psychology found that
                      people using hypnotherapy for weight loss lost more weight than 90% of those not using hypnosis.
                    </p>
                    <h4 className="font-semibold mb-2">Research-Proven Results:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Average 6-8 pounds more weight lost compared to diet/exercise alone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Better long-term maintenance: 85% maintain weight loss at 18 months</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Reduced emotional eating in 75% of participants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Significant decrease in food cravings reported by 80% of users</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Smoking */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Brain className="h-8 w-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">Smoking Cessation</h3>
                        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                          30-60% Quit Rate
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      <strong>Does hypnotherapy work to quit smoking?</strong> Yes, with quit rates significantly
                      higher than unassisted quitting. Meta-analyses show hypnotherapy produces quit rates of 30-60%
                      compared to just 5-7% for cold turkey attempts.
                    </p>
                    <h4 className="font-semibold mb-2">Clinical Evidence:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Single-session hypnotherapy: 25-35% still smoke-free at 6 months</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Multi-session programs: 45-60% quit rates at 12 months</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Comparable or better results than nicotine replacement therapy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Reduced withdrawal symptoms reported by 70% of quitters</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* IBS */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Brain className="h-8 w-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">IBS and Digestive Issues</h3>
                        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                          70-80% Symptom Improvement
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      <strong>Does hypnotherapy work for IBS?</strong> Absolutely. Gut-directed hypnotherapy is
                      so well-proven that the American College of Gastroenterology includes it in official IBS
                      treatment guidelines.
                    </p>
                    <h4 className="font-semibold mb-2">Evidence from Clinical Trials:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>70-80% of IBS patients achieve significant, lasting symptom relief</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Benefits maintained for up to 5 years after treatment (long-term studies)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>More effective than standard medical care alone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Reduces pain, bloating, and bowel dysfunction</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* When Doesn't It Work */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">When Does Hypnotherapy NOT Work?</h2>
              <p className="text-gray-700 text-lg mb-6">
                While research shows hypnotherapy works for many conditions, it's important to understand
                when it may be less effective or inappropriate:
              </p>

              <div className="space-y-4">
                <Card className="border-amber-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <XCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-2">Low Suggestibility</h3>
                        <p className="text-gray-700">
                          About 10-15% of people have low hypnotic suggestibility and may not respond well
                          to hypnotherapy. However, skilled practitioners can often work with different
                          suggestibility levels.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <XCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-2">Lack of Motivation</h3>
                        <p className="text-gray-700">
                          Hypnotherapy works best when the client genuinely wants to change. Being pressured
                          into hypnotherapy by others typically produces poor results.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <XCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-2">Severe Mental Illness</h3>
                        <p className="text-gray-700">
                          Hypnotherapy is not recommended as primary treatment for severe mental illnesses
                          like schizophrenia, bipolar disorder, or psychosis. It should only be used as
                          complementary treatment under medical supervision.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <XCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-2">Unqualified Practitioners</h3>
                        <p className="text-gray-700">
                          Hypnotherapy effectiveness depends heavily on practitioner skill and training.
                          Working with unqualified or poorly trained practitioners produces inferior results.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Recognition */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Medical and Professional Recognition</h2>
              <p className="text-gray-700 mb-8">
                Does hypnotherapy work according to medical authorities? Major healthcare organizations
                recognize hypnotherapy as a legitimate therapeutic approach:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">American Psychological Association (APA)</h3>
                    <p className="text-sm text-gray-700">
                      Division 30 (Society of Psychological Hypnosis) promotes clinical hypnosis as an
                      evidence-based practice supported by scientific research.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">American Medical Association</h3>
                    <p className="text-sm text-gray-700">
                      Endorsed hypnotherapy in 1958 for medical and dental purposes, recognizing its
                      therapeutic value when practiced by qualified professionals.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">British Medical Association</h3>
                    <p className="text-sm text-gray-700">
                      Recognizes hypnotherapy as a valid medical treatment with proven applications in
                      pain management and psychotherapy.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">American College of Gastroenterology</h3>
                    <p className="text-sm text-gray-700">
                      Includes gut-directed hypnotherapy in official IBS treatment guidelines based on
                      strong evidence of effectiveness.
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
                Ready to Experience How Hypnotherapy Works?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Find qualified, certified hypnotherapists in your area and see the evidence-based
                results for yourself.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/hypnotherapy-near-me">
                    <Search className="h-5 w-5 mr-2" />
                    Find Hypnotherapists Near Me
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-600">
                  <Link href="/search">Search by Specialty</Link>
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
