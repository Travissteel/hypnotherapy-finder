import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Wind, Heart, CheckCircle, Search, Ban, TrendingUp } from 'lucide-react';
import { getAllPractitioners } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Quit Smoking Hypnotherapy | Stop Smoking',
  description: 'Quit smoking hypnotherapy helps you become smoke-free. Find certified specialists in smoking cessation.',
  keywords: 'quit smoking hypnotherapy, stop smoking hypnosis, smoking cessation hypnotherapy, hypnosis to quit smoking, quit cigarettes hypnotherapy',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/quit-smoking-hypnotherapy',
  },
  openGraph: {
    title: 'Quit Smoking with Hypnotherapy - Natural Smoking Cessation',
    description: 'Stop smoking for good with hypnotherapy. Find qualified practitioners specializing in smoking cessation.',
    url: 'https://hypnotherapy-finder.com/quit-smoking-hypnotherapy',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Quit Smoking Hypnotherapy',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quit Smoking with Hypnotherapy - Natural Smoking Cessation',
    description: 'Stop smoking for good with hypnotherapy. Find qualified practitioners specializing in smoking cessation.',
    images: ['/logo.png'],
  },
};

export default async function QuitSmokingHypnotherapyPage() {
  const allPractitioners = getAllPractitioners();

  const smokingCessationSpecialists = allPractitioners.filter(p =>
    p.specialties.some(s => s.toLowerCase().includes('smoking'))
  ).slice(0, 9);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Quit Smoking Hypnotherapy - Stop Smoking Permanently',
    description: 'Comprehensive guide to quit smoking hypnotherapy. Learn how hypnotherapy helps break nicotine addiction and achieve lasting smoking cessation. Find certified smoking cessation hypnotherapists.',
    mainEntity: {
      '@type': 'MedicalCondition',
      name: 'Nicotine Addiction',
      possibleTreatment: {
        '@type': 'MedicalTherapy',
        name: 'Quit Smoking Hypnotherapy',
        description: 'Evidence-based hypnotherapy techniques for smoking cessation, addressing nicotine cravings, behavioral triggers, and long-term relapse prevention.',
      },
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does quit smoking hypnotherapy really work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, research shows quit smoking hypnotherapy is one of the most effective methods for smoking cessation. Studies indicate that hypnotherapy can be more effective than nicotine replacement therapy or willpower alone. It works by addressing both the physical addiction and psychological dependence on cigarettes, helping to break the habit permanently.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many sessions does it take to quit smoking with hypnotherapy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many people quit smoking in just 1-3 sessions of hypnotherapy, though some may benefit from additional sessions for reinforcement. The exact number depends on how long you\'ve smoked, how heavily you smoke, and your individual response to treatment. Your hypnotherapist will create a personalized quit smoking plan.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens during a quit smoking hypnotherapy session?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'During quit smoking hypnotherapy, your practitioner guides you into a relaxed, focused state. They use suggestion techniques to help you break associations between smoking and daily activities, reduce cravings, strengthen your resolve to quit, and reinforce your identity as a non-smoker. Sessions typically last 60-90 minutes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will I gain weight after quitting smoking with hypnotherapy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Quit smoking hypnotherapy often includes suggestions to prevent weight gain after quitting. Hypnotherapists can address concerns about eating habits, metabolism, and healthy alternatives to smoking. Many people find that hypnotherapy helps them quit smoking without significant weight gain.',
        },
      },
      {
        '@type': 'Question',
        name: 'How effective is quit smoking hypnotherapy compared to other methods?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Studies suggest quit smoking hypnotherapy has higher success rates than many other cessation methods. Research shows hypnotherapy can be 2-3 times more effective than nicotine replacement therapy alone. It addresses both the physical addiction and psychological aspects of smoking, making it a comprehensive solution for permanent smoking cessation.',
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
                Quit Smoking Hypnotherapy - Stop Smoking for Good
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Ready to quit smoking? Quit smoking hypnotherapy offers one of the most effective ways to become
                smoke-free. Find certified smoking cessation hypnotherapists near you and break free from cigarettes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/search?specialty=smoking">
                    <Search className="h-5 w-5 mr-2" />
                    Find Smoking Cessation Specialists
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
                  src="/quit-smoking-hypnotherapy.png"
                  alt="Quit smoking hypnotherapy session with professional hypnotherapist helping client break nicotine addiction and become smoke-free for good"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* What is Quit Smoking Hypnotherapy */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What is Quit Smoking Hypnotherapy?</h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  <strong>Quit smoking hypnotherapy</strong> is a proven therapeutic approach that uses hypnosis to help
                  smokers overcome nicotine addiction and break free from cigarettes. Unlike willpower alone or nicotine
                  replacement therapy, quit smoking hypnotherapy addresses both the physical addiction and the psychological
                  habits that keep you smoking.
                </p>
                <p>
                  During quit smoking hypnotherapy sessions, a certified hypnotherapist guides you into a deeply relaxed
                  state where your subconscious mind becomes receptive to positive suggestions about being smoke-free.
                  This makes quit smoking hypnotherapy particularly effective because smoking is largely a subconscious
                  habit - your conscious mind may want to quit, but your subconscious drives the urge to smoke.
                </p>
                <p>
                  Research supports quit smoking hypnotherapy as an effective cessation method. A meta-analysis in the
                  International Journal of Clinical and Experimental Hypnosis found that hypnosis to quit smoking showed
                  higher success rates than unassisted quitting and was comparable to or better than nicotine replacement
                  therapy. Many people successfully quit smoking after just one to three quit smoking hypnotherapy sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Quit Smoking Hypnotherapy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Ban className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">No Nicotine Replacement</h3>
                    <p className="text-gray-700 text-center">
                      Quit smoking hypnotherapy works without patches, gum, or medication - just natural,
                      effective behavioral change.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <TrendingUp className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">High Success Rate</h3>
                    <p className="text-gray-700 text-center">
                      Studies show quit smoking hypnotherapy has success rates significantly higher than
                      willpower alone or nicotine replacement.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Wind className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">Reduces Cravings</h3>
                    <p className="text-gray-700 text-center">
                      Hypnosis to quit smoking significantly reduces or eliminates cravings by changing
                      your subconscious association with cigarettes.
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
                    <h3 className="font-semibold text-lg mb-2 text-center">Fast Results</h3>
                    <p className="text-gray-700 text-center">
                      Many people quit smoking after just one quit smoking hypnotherapy session, with
                      some programs offering 1-3 session packages.
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
                    <h3 className="font-semibold text-lg mb-2 text-center">Addresses Root Causes</h3>
                    <p className="text-gray-700 text-center">
                      Quit smoking hypnotherapy identifies and resolves psychological triggers that
                      cause smoking, not just the physical addiction.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Ban className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">No Weight Gain</h3>
                    <p className="text-gray-700 text-center">
                      Smoking cessation hypnotherapy can include suggestions to maintain healthy eating
                      and prevent post-quitting weight gain.
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
              <h2 className="text-3xl font-bold mb-8">How Quit Smoking Hypnotherapy Works</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <span className="text-xl font-bold text-blue-600">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Pre-Session Assessment</h3>
                        <p className="text-gray-700">
                          Your quit smoking hypnotherapy begins with understanding your smoking habits, triggers,
                          and reasons for wanting to quit. The hypnotherapist learns when you smoke, why you smoke,
                          and what's prevented you from quitting before. This information customizes your treatment.
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
                        <h3 className="font-semibold text-lg mb-2">Deep Relaxation Induction</h3>
                        <p className="text-gray-700">
                          The hypnotherapist guides you into a deeply relaxed, focused state through breathing
                          exercises and verbal cues. This hypnotic state allows your subconscious mind to become
                          more receptive to quit smoking suggestions. You remain fully aware and in control.
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
                        <h3 className="font-semibold text-lg mb-2">Reframing Smoking Associations</h3>
                        <p className="text-gray-700">
                          During quit smoking hypnotherapy, the practitioner introduces suggestions that change how
                          your subconscious perceives cigarettes. Smoking becomes associated with negative feelings
                          (disgust, poison, harm) rather than relaxation or pleasure. This reframing makes quitting
                          easier and more natural.
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
                        <h3 className="font-semibold text-lg mb-2">Reinforcing Non-Smoker Identity</h3>
                        <p className="text-gray-700">
                          Hypnosis to quit smoking helps you visualize yourself as a non-smoker. You imagine your
                          life smoke-free, breathing easily, feeling healthier, and being proud of your achievement.
                          This creates a powerful mental blueprint that your subconscious follows.
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
                        <h3 className="font-semibold text-lg mb-2">Breaking Trigger Patterns</h3>
                        <p className="text-gray-700">
                          Quit smoking hypnotherapy addresses specific triggers like stress, coffee, alcohol, or
                          social situations. The hypnotherapist provides alternative coping mechanisms and breaks
                          the automatic trigger-smoke response pattern that keeps you addicted.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <span className="text-xl font-bold text-blue-600">6</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Post-Hypnotic Suggestions</h3>
                        <p className="text-gray-700">
                          The hypnotherapist embeds post-hypnotic suggestions that continue working after the
                          session ends. These ensure cravings remain minimal, withdrawal symptoms are manageable,
                          and you maintain your commitment to being smoke-free.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why People Smoke and How Hypnotherapy Helps */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Why Quit Smoking Hypnotherapy is So Effective</h2>
              <p className="text-gray-700 mb-8">
                Understanding why quit smoking hypnotherapy works requires knowing why smoking is so hard to quit.
                Smoking isn't just physical addiction - it's deeply psychological. Quit smoking hypnotherapy addresses
                all aspects of the addiction.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Breaks the Habit Loop</h3>
                    <p className="text-gray-700 mb-3">
                      Smoking is a habit driven by cue-routine-reward loops. Quit smoking hypnotherapy rewrites
                      these loops at a subconscious level, eliminating the automatic response to smoke when
                      triggers appear.
                    </p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Identifies your smoking triggers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Breaks automatic smoking responses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Creates new, healthy habits</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Changes Emotional Associations</h3>
                    <p className="text-gray-700 mb-3">
                      Many smokers use cigarettes to manage stress, boredom, or anxiety. Smoking cessation
                      hypnotherapy helps you develop healthier coping mechanisms and removes the emotional
                      dependency on smoking.
                    </p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Addresses emotional smoking triggers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Provides alternative stress management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Breaks emotional dependence</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Reduces Withdrawal Symptoms</h3>
                    <p className="text-gray-700 mb-3">
                      Hypnosis to quit smoking includes suggestions to minimize withdrawal symptoms like
                      irritability, anxiety, and intense cravings. This makes the quitting process much
                      more comfortable than going cold turkey.
                    </p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Minimizes physical withdrawal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Reduces craving intensity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Maintains calm and focus</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Strengthens Willpower and Motivation</h3>
                    <p className="text-gray-700 mb-3">
                      Quit smoking hypnotherapy reinforces your reasons for quitting and strengthens your
                      commitment. You become deeply motivated to remain smoke-free, making relapse much
                      less likely.
                    </p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Amplifies motivation to quit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Strengthens commitment daily</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Prevents relapse temptation</span>
                      </li>
                    </ul>
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
                Find Quit Smoking Hypnotherapy Specialists Near You
              </h2>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Connect with certified hypnotherapists who specialize in smoking cessation. Each practitioner
                has experience helping smokers quit for good using proven quit smoking hypnotherapy techniques.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {smokingCessationSpecialists.map((practitioner) => (
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
                  <Link href="/search?specialty=smoking">
                    View All Smoking Cessation Specialists
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Success Expectations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">What to Expect from Quit Smoking Hypnotherapy</h2>
              <div className="space-y-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">During Your Session</h3>
                    <p className="text-gray-700 mb-4">
                      Quit smoking hypnotherapy sessions typically last 60-90 minutes. You'll be seated or reclined
                      comfortably as the hypnotherapist guides you into a relaxed state. Most people describe the
                      experience as pleasant and deeply calming.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>You remain fully conscious and aware</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>You cannot be made to do anything against your will</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Most people feel relaxed and refreshed afterward</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">After Your Session</h3>
                    <p className="text-gray-700 mb-4">
                      Many people find they have no desire to smoke immediately after their first quit smoking
                      hypnotherapy session. For others, the urge to smoke gradually diminishes over a few days.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Significantly reduced or eliminated cravings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Minimal withdrawal symptoms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Strong motivation to remain smoke-free</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Cigarettes may seem unappealing or disgusting</span>
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
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions About Quit Smoking Hypnotherapy</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Can anyone quit smoking with hypnotherapy?</h3>
                    <p className="text-gray-700">
                      Quit smoking hypnotherapy works best for people who are genuinely motivated to quit. While
                      nearly everyone can benefit from hypnosis, you must actually want to stop smoking for it to be
                      effective. If you're being pressured by others but aren't personally committed, results may be
                      limited. The good news is that if you truly want to quit, hypnosis is one of the most effective
                      methods available.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">How many sessions does it take to quit smoking?</h3>
                    <p className="text-gray-700">
                      Many people quit smoking after just one quit smoking hypnotherapy session. Some hypnotherapists
                      offer single-session intensive programs (2-3 hours), while others recommend 2-3 sessions for
                      reinforcement. If you've been a heavy smoker for many years, you might benefit from additional
                      follow-up sessions to ensure long-term success.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Will I experience withdrawal symptoms?</h3>
                    <p className="text-gray-700">
                      Quit smoking hypnotherapy significantly reduces withdrawal symptoms for most people. While you
                      may experience some mild physical symptoms as nicotine leaves your body, the psychological
                      cravings and irritability are usually minimal. Many clients report being surprised at how easy
                      quitting was with hypnosis compared to previous attempts.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">What's the success rate of quit smoking hypnotherapy?</h3>
                    <p className="text-gray-700">
                      Studies show quit smoking hypnotherapy has success rates ranging from 50-80%, significantly
                      higher than the 5-7% success rate of quitting cold turkey. Success depends on factors like your
                      motivation level, the hypnotherapist's skill, and whether you follow through with post-session
                      recommendations. Many practitioners offer satisfaction guarantees or free follow-up sessions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Will I gain weight after quitting smoking with hypnotherapy?</h3>
                    <p className="text-gray-700">
                      One advantage of quit smoking hypnotherapy is that it can include suggestions to prevent weight
                      gain. The hypnotherapist can address concerns about substituting food for cigarettes and help
                      you maintain healthy eating habits. Many people maintain their weight or even lose weight after
                      quitting with hypnosis.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">How much does quit smoking hypnotherapy cost?</h3>
                    <p className="text-gray-700">
                      Smoking cessation hypnotherapy typically costs $150-$500 per session, with some practitioners
                      offering package deals. While this may seem expensive, consider that a pack-a-day smoker spends
                      over $2,500 per year on cigarettes. Quit smoking hypnotherapy pays for itself within weeks and
                      may be covered by some health insurance plans as smoking cessation treatment.
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
                <Link href="/weight-loss-hypnotherapy" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">Weight Loss Hypnotherapy</h3>
                  <p className="text-sm text-gray-600">Achieve sustainable weight management through hypnotherapy</p>
                </Link>
                <Link href="/hypnotherapy-for-anxiety" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">Hypnotherapy for Anxiety</h3>
                  <p className="text-sm text-gray-600">Manage stress and anxiety with proven techniques</p>
                </Link>
                <Link href="/does-hypnotherapy-work" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">Does Hypnotherapy Work?</h3>
                  <p className="text-sm text-gray-600">Learn about the research and effectiveness of hypnotherapy</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Quit Smoking for Good?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Take the first step toward a smoke-free life. Find a certified quit smoking hypnotherapist
                near you and break free from cigarettes today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/search?specialty=smoking">
                    <Search className="h-5 w-5 mr-2" />
                    Find Smoking Cessation Hypnotherapists
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
