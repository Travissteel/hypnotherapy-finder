import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Script from 'next/script';
import { Brain, Clock, Heart, Shield, Sparkles, Target } from 'lucide-react';

export const metadata = {
  title: 'How Hypnotherapy Works | Understanding the Science and Process',
  description: 'Learn how hypnotherapy works, what to expect in a session, and how it helps with anxiety, weight loss, smoking cessation, and more.',
  keywords: 'how does hypnotherapy work, what is hypnotherapy, hypnosis therapy, clinical hypnotherapy',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/how-it-works',
  },
  openGraph: {
    title: 'How Hypnotherapy Works - Complete Guide',
    description: 'Understand the science behind hypnotherapy and what happens during a session. Learn how hypnotherapy helps with various conditions.',
    url: 'https://hypnotherapy-finder.com/how-it-works',
    type: 'article',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'How Hypnotherapy Works',
      }
    ],
  },
};

export default function HowItWorksPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How Hypnotherapy Works',
    description: 'Step-by-step explanation of how hypnotherapy works, from initial consultation to achieving your therapeutic goals.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Initial Consultation',
        text: 'Your hypnotherapist discusses your goals, medical history, and explains the hypnotherapy process. This helps create a personalized treatment plan.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Induction Phase',
        text: 'Through guided relaxation techniques, your hypnotherapist helps you enter a focused, relaxed state of heightened awareness and concentration.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Therapeutic Suggestion',
        text: 'In this receptive state, your hypnotherapist uses specific suggestions and imagery to help address your concerns and achieve your goals.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Emergence and Discussion',
        text: 'Your hypnotherapist gently guides you back to full alertness. You discuss your experience and any insights gained during the session.',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does hypnotherapy work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hypnotherapy works by guiding you into a deeply relaxed, focused state where your subconscious mind becomes more receptive to positive suggestions. In this state, your hypnotherapist can help address unwanted behaviors, thoughts, and feelings by working with your subconscious patterns. The process is collaborative and you remain in control throughout.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens during a hypnotherapy session?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A typical hypnotherapy session lasts 60-90 minutes. Your hypnotherapist starts with a discussion of your goals, then guides you into a relaxed state through verbal cues and imagery. While in this focused state, they provide therapeutic suggestions tailored to your needs. You remain aware and in control throughout. Afterward, you discuss your experience and progress.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is hypnotherapy scientifically proven?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, research supports hypnotherapy\'s effectiveness for various conditions. Studies published in peer-reviewed journals show hypnotherapy can effectively treat anxiety, chronic pain, IBS, smoking cessation, and weight management. Brain imaging studies demonstrate measurable changes in brain activity during hypnosis, validating it as a legitimate therapeutic approach.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will I be in control during hypnotherapy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you remain in complete control during hypnotherapy. You cannot be made to do anything against your will or values. Hypnotherapy is a collaborative process where you actively participate. You can speak, move, and end the session at any time. The hypnotic state is simply a natural state of focused relaxation that you experience daily.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="schema-howto"
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
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                How Hypnotherapy Works
              </h1>
              <p className="text-xl text-gray-600">
                Understanding the science, process, and benefits of clinical hypnotherapy
              </p>
            </div>
          </div>
        </section>

        {/* What is Hypnotherapy */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What is Hypnotherapy?</h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Hypnotherapy is a therapeutic technique that uses guided relaxation, intense
                  concentration, and focused attention to achieve a heightened state of awareness,
                  often called a trance. This natural state allows you to focus your mind in a way
                  that makes you more open to suggestions and positive change.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Unlike stage hypnosis (which is entertainment), clinical hypnotherapy is a
                  recognized therapeutic approach used by trained professionals to help people
                  overcome challenges, change unwanted behaviors, and improve their wellbeing.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
                  <p className="font-semibold text-gray-900 mb-2">Important to Know:</p>
                  <p className="text-gray-700">
                    You are always in control during hypnotherapy. You cannot be made to do
                    anything against your will or values. You remain aware and can choose to
                    accept or reject any suggestions given.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Science */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">The Science Behind Hypnotherapy</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Brain className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Brain Activity</h3>
                        <p className="text-gray-600 text-sm">
                          Brain imaging shows hypnosis creates unique patterns of activity,
                          particularly in areas controlling attention, emotion, and body awareness.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Target className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Neuroplasticity</h3>
                        <p className="text-gray-600 text-sm">
                          Hypnotherapy leverages your brain's ability to rewire itself, creating
                          new neural pathways that support healthier thoughts and behaviors.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Heart className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Mind-Body Connection</h3>
                        <p className="text-gray-600 text-sm">
                          Research shows hypnosis can influence physical processes like pain
                          perception, immune function, and stress response.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Shield className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Evidence-Based</h3>
                        <p className="text-gray-600 text-sm">
                          Hundreds of peer-reviewed studies support the effectiveness of
                          hypnotherapy for various conditions and goals.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* The Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">What to Expect in a Session</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Initial Consultation (15-30 min)</h3>
                    <p className="text-gray-700">
                      Your hypnotherapist will discuss your goals, medical history, and what you
                      hope to achieve. They'll explain the process and answer any questions you have.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Induction (5-10 min)</h3>
                    <p className="text-gray-700">
                      You'll be guided into a relaxed, focused state through breathing exercises,
                      visualization, or progressive relaxation. You remain fully aware and in control.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Therapeutic Work (20-40 min)</h3>
                    <p className="text-gray-700">
                      Your hypnotherapist uses various techniques tailored to your goals: positive
                      suggestions, visualization, regression, or other evidence-based methods.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Emergence (5 min)</h3>
                    <p className="text-gray-700">
                      You're gently guided back to full alertness. Most people feel relaxed,
                      refreshed, and energized after a session.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Discussion & Plan (5-10 min)</h3>
                    <p className="text-gray-700">
                      Your hypnotherapist discusses the session, provides self-hypnosis techniques
                      you can practice at home, and plans next steps if needed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <p className="flex items-center gap-2 text-gray-700">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">Typical session length:</span> 60-90 minutes
                </p>
                <p className="flex items-center gap-2 text-gray-700 mt-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">Number of sessions:</span> 1-10 depending on goals
                  (some see results in 1-3 sessions)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Can It Help With */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">What Can Hypnotherapy Help With?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-blue-600">Common Uses</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Anxiety and stress management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Weight loss and healthy eating habits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Smoking cessation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Phobias and fears</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Insomnia and sleep disorders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Pain management</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-blue-600">Also Helps With</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>PTSD and trauma recovery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Confidence and self-esteem</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Sports and performance enhancement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Breaking unwanted habits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Irritable bowel syndrome (IBS)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Childbirth preparation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Hypnotherapy?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Find a certified hypnotherapist in your area and take the first step toward positive change.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/search">Find a Practitioner</Link>
            </Button>
          </div>
        </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
