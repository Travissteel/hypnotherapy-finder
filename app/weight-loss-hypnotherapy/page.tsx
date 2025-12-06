import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Scale, Target, CheckCircle, Search, TrendingDown, Brain } from 'lucide-react';
import { getAllPractitioners } from '@/lib/data/practitioners';

export const metadata = {
  title: 'Weight Loss Hypnotherapy - Find Certified Hypnotherapists for Weight Management',
  description: 'Discover how weight loss hypnotherapy can help you achieve lasting results. Find certified hypnotherapists specializing in weight management. Natural, effective approach to healthy weight loss.',
  keywords: 'weight loss hypnotherapy, hypnosis for weight loss, weight management hypnotherapy, lose weight with hypnosis, hypnotherapy diet',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/weight-loss-hypnotherapy',
  },
  openGraph: {
    title: 'Weight Loss Hypnotherapy - Natural Weight Management',
    description: 'Achieve your weight loss goals with hypnotherapy. Find qualified practitioners specializing in weight management.',
    url: 'https://hypnotherapy-finder.com/weight-loss-hypnotherapy',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Weight Loss Hypnotherapy',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Hypnotherapy - Natural Weight Management',
    description: 'Achieve your weight loss goals with hypnotherapy. Find qualified practitioners specializing in weight management.',
    images: ['/logo.png'],
  },
};

export default async function WeightLossHypnotherapyPage() {
  const allPractitioners = getAllPractitioners();

  const weightLossSpecialists = allPractitioners.filter(p =>
    p.specialties.some(s => s.toLowerCase().includes('weight'))
  ).slice(0, 9);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Weight Loss Hypnotherapy - Natural Weight Management Solutions',
    description: 'Comprehensive guide to weight loss hypnotherapy. Learn how hypnotherapy helps achieve sustainable weight loss through behavior modification and mindset change. Find certified weight loss hypnotherapists.',
    mainEntity: {
      '@type': 'MedicalCondition',
      name: 'Weight Management',
      possibleTreatment: {
        '@type': 'MedicalTherapy',
        name: 'Weight Loss Hypnotherapy',
        description: 'Evidence-based hypnotherapy techniques for sustainable weight loss, addressing emotional eating, portion control, and healthy habit formation.',
      },
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does weight loss hypnotherapy really work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, research shows weight loss hypnotherapy is effective for sustainable weight management. Studies demonstrate that hypnotherapy helps modify eating behaviors, reduce emotional eating, increase motivation for exercise, and support long-term weight maintenance. It works by addressing the subconscious patterns and beliefs that affect your relationship with food.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many sessions of weight loss hypnotherapy will I need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most people see results with 4-10 sessions of weight loss hypnotherapy. The exact number depends on your weight loss goals, eating patterns, and individual response. Your hypnotherapist will create a personalized program that may include weekly sessions initially, then maintenance sessions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does weight loss hypnotherapy involve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Weight loss hypnotherapy involves guided relaxation and focused concentration to access your subconscious mind. Sessions typically address emotional eating triggers, portion control, food choices, motivation for exercise, and positive self-image. Hypnotherapists use suggestion techniques to help reprogram unhealthy eating patterns and build sustainable healthy habits.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can weight loss hypnotherapy help with emotional eating?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, weight loss hypnotherapy is particularly effective for emotional eating. It helps identify and address the underlying emotional triggers that lead to overeating, such as stress, anxiety, boredom, or past trauma. Hypnotherapy provides alternative coping strategies and helps break the cycle of emotional eating.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is weight loss hypnotherapy safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, weight loss hypnotherapy is completely safe when conducted by a certified professional. It\'s a natural, drug-free approach with no side effects. Weight loss hypnotherapy works best as part of a comprehensive approach that includes healthy eating and regular physical activity.',
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
                Weight Loss Hypnotherapy - Achieve Your Goals Naturally
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Struggling with weight loss? Weight loss hypnotherapy offers a proven approach to changing eating habits,
                increasing motivation, and achieving lasting results. Find certified weight loss hypnotherapists near you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/search?specialty=weight">
                    <Search className="h-5 w-5 mr-2" />
                    Find Weight Loss Specialists
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
                  src="/weight-loss-hypnotherapy.png"
                  alt="Weight loss hypnotherapy session with certified hypnotherapist helping client overcome emotional eating and achieve sustainable weight management goals"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* What is Weight Loss Hypnotherapy */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What is Weight Loss Hypnotherapy?</h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  <strong>Weight loss hypnotherapy</strong> is a therapeutic approach that uses hypnosis to help individuals
                  achieve and maintain a healthy weight. Unlike fad diets or temporary solutions, weight loss hypnotherapy
                  addresses the psychological and emotional factors that influence eating behaviors and weight management.
                </p>
                <p>
                  During weight loss hypnotherapy sessions, a certified hypnotherapist guides you into a relaxed,
                  focused state where your subconscious mind becomes more receptive to positive suggestions about food,
                  exercise, and self-image. This makes weight loss hypnotherapy particularly effective for lasting change
                  rather than quick fixes.
                </p>
                <p>
                  Research supports the effectiveness of weight loss hypnotherapy. A meta-analysis published in the
                  Journal of Consulting and Clinical Psychology found that participants who used hypnosis for weight
                  loss lost more weight than 90% of those not using hypnosis. Studies show weight loss hypnotherapy
                  helps people lose weight and keep it off long-term by changing fundamental beliefs and behaviors
                  around food and eating.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Weight Loss Hypnotherapy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Brain className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">Changes Root Behaviors</h3>
                    <p className="text-gray-700 text-center">
                      Weight loss hypnotherapy targets subconscious eating patterns, emotional eating triggers,
                      and limiting beliefs about weight loss.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Target className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">Sustainable Results</h3>
                    <p className="text-gray-700 text-center">
                      Unlike crash diets, weight loss hypnotherapy creates lasting behavioral changes for
                      long-term weight management.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Scale className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">No Restrictive Diets</h3>
                    <p className="text-gray-700 text-center">
                      Weight loss hypnotherapy helps you develop a healthier relationship with food naturally,
                      without strict dieting.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <TrendingDown className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">Reduces Cravings</h3>
                    <p className="text-gray-700 text-center">
                      Hypnosis for weight loss can significantly reduce cravings for unhealthy foods and
                      emotional eating urges.
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
                    <h3 className="font-semibold text-lg mb-2 text-center">Boosts Motivation</h3>
                    <p className="text-gray-700 text-center">
                      Weight loss hypnotherapy increases motivation for exercise and healthy eating through
                      positive reinforcement.
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
                    <h3 className="font-semibold text-lg mb-2 text-center">Addresses Emotional Eating</h3>
                    <p className="text-gray-700 text-center">
                      Identify and overcome emotional eating patterns that sabotage weight loss efforts.
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
              <h2 className="text-3xl font-bold mb-8">How Weight Loss Hypnotherapy Works</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <span className="text-xl font-bold text-blue-600">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Initial Assessment</h3>
                        <p className="text-gray-700">
                          Your weight loss hypnotherapy journey begins with understanding your relationship with food,
                          identifying triggers for overeating, and setting realistic weight loss goals. The hypnotherapist
                          learns about your eating patterns, previous diet attempts, and emotional connections to food.
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
                        <h3 className="font-semibold text-lg mb-2">Relaxation and Hypnotic Induction</h3>
                        <p className="text-gray-700">
                          The hypnotherapist guides you into a deeply relaxed state. In this state, your subconscious
                          mind is more open to positive suggestions about weight loss, healthy eating, and exercise.
                          This is where weight loss hypnotherapy becomes most effective.
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
                        <h3 className="font-semibold text-lg mb-2">Positive Suggestions and Visualization</h3>
                        <p className="text-gray-700">
                          During weight loss hypnotherapy sessions, you receive positive suggestions about healthy eating,
                          portion control, and exercise. Visualization techniques help you imagine yourself at your ideal
                          weight, reinforcing your weight loss goals and building confidence.
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
                        <h3 className="font-semibold text-lg mb-2">Addressing Emotional Eating</h3>
                        <p className="text-gray-700">
                          Weight loss hypnotherapy identifies emotional triggers that lead to overeating. Through hypnosis,
                          you learn new coping mechanisms for stress, boredom, or sadness that don't involve food. This
                          breaks the cycle of emotional eating.
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
                        <h3 className="font-semibold text-lg mb-2">Building New Habits</h3>
                        <p className="text-gray-700">
                          Hypnosis for weight loss reinforces positive behaviors like choosing nutritious foods,
                          eating mindfully, stopping when full, and enjoying regular exercise. These suggestions help
                          your subconscious mind support your weight loss goals automatically.
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
                        <h3 className="font-semibold text-lg mb-2">Self-Hypnosis for Ongoing Support</h3>
                        <p className="text-gray-700">
                          Most weight loss hypnotherapy programs teach self-hypnosis techniques. This allows you to
                          reinforce positive suggestions daily, manage cravings, and stay motivated throughout your
                          weight loss journey and beyond.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What It Helps With */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">What Weight Loss Hypnotherapy Can Help With</h2>
              <p className="text-gray-700 mb-8">
                Weight loss hypnotherapy addresses multiple aspects of weight management, making it a comprehensive
                approach to achieving and maintaining a healthy weight.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Emotional and Stress Eating</h3>
                    <p className="text-gray-700 mb-3">
                      Weight loss hypnotherapy is highly effective for emotional eating. If you eat in response to
                      stress, anxiety, boredom, or sadness, hypnosis can help you develop healthier coping mechanisms.
                    </p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Identify emotional eating triggers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Break the stress-food connection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Learn alternative stress management</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Food Cravings and Binge Eating</h3>
                    <p className="text-gray-700 mb-3">
                      Hypnosis for weight loss can reduce or eliminate cravings for specific foods, especially sugary
                      and high-fat options. Weight loss hypnotherapy also helps control binge eating episodes.
                    </p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Reduce sugar and junk food cravings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Control portion sizes naturally</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Stop binge eating patterns</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Lack of Motivation for Exercise</h3>
                    <p className="text-gray-700 mb-3">
                      Weight loss hypnotherapy can increase your motivation to exercise and help you enjoy physical
                      activity. Positive suggestions make exercise feel less like a chore and more like self-care.
                    </p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Build enthusiasm for exercise</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Create consistent workout habits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Enjoy movement and activity</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Poor Self-Image and Confidence</h3>
                    <p className="text-gray-700 mb-3">
                      Weight loss hypnotherapy addresses negative self-talk and poor body image. Improving your
                      self-image can be crucial for weight loss success and maintaining healthy behaviors.
                    </p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Build positive self-image</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Overcome self-sabotaging thoughts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Increase self-confidence</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Mindless Eating Habits</h3>
                    <p className="text-gray-700 mb-3">
                      Hypnosis for weight loss promotes mindful eating - being present and aware while eating.
                      This helps you recognize true hunger, enjoy food more, and stop when satisfied.
                    </p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Eat slowly and mindfully</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Recognize fullness signals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Stop eating when satisfied</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">Weight Loss Plateaus</h3>
                    <p className="text-gray-700 mb-3">
                      Weight loss hypnotherapy can help you overcome plateaus by renewing motivation, adjusting
                      mental blocks, and reinforcing commitment to your weight loss goals.
                    </p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Overcome mental barriers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Renew weight loss motivation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Break through plateaus</span>
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
                Find Weight Loss Hypnotherapy Specialists Near You
              </h2>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Connect with certified hypnotherapists who specialize in weight loss and weight management.
                Each practitioner has experience helping clients achieve their weight loss goals through hypnotherapy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {weightLossSpecialists.map((practitioner) => (
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
                  <Link href="/search?specialty=weight">
                    View All Weight Loss Specialists
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions About Weight Loss Hypnotherapy</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Does weight loss hypnotherapy really work?</h3>
                    <p className="text-gray-700">
                      Yes, research shows weight loss hypnotherapy can be highly effective. Studies indicate that people
                      who use hypnosis for weight loss lose more weight and maintain weight loss better than those using
                      traditional dieting alone. The key is working with a qualified hypnotherapist and being committed
                      to making lifestyle changes.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">How much weight can I lose with hypnotherapy?</h3>
                    <p className="text-gray-700">
                      Weight loss varies by individual and depends on many factors including starting weight, diet,
                      exercise, and consistency with hypnotherapy sessions. Weight loss hypnotherapy is not a magic
                      solution but rather a tool to support healthy lifestyle changes. Most people lose weight gradually
                      and sustainably - 1-2 pounds per week is considered healthy.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">How many sessions of weight loss hypnotherapy do I need?</h3>
                    <p className="text-gray-700">
                      Most weight loss hypnotherapy programs involve 4-8 initial sessions, followed by maintenance
                      sessions as needed. Some people benefit from ongoing monthly sessions to reinforce positive
                      behaviors. Your hypnotherapist will create a personalized plan based on your weight loss goals
                      and progress.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Can hypnosis for weight loss help with emotional eating?</h3>
                    <p className="text-gray-700">
                      Absolutely. Weight loss hypnotherapy is particularly effective for emotional eating because it
                      addresses the subconscious emotional triggers that drive eating behaviors. Hypnosis helps you
                      develop new coping mechanisms for stress, anxiety, and other emotions that don't involve food.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Do I still need to diet and exercise?</h3>
                    <p className="text-gray-700">
                      Yes. Weight loss hypnotherapy is not a replacement for healthy eating and exercise - it's a tool
                      that makes these lifestyle changes easier to adopt and maintain. Hypnosis helps change your mindset,
                      reduce cravings, increase motivation, and break unhealthy patterns, supporting your weight loss
                      efforts rather than replacing them.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Is weight loss hypnotherapy safe?</h3>
                    <p className="text-gray-700">
                      Weight loss hypnotherapy is completely safe when conducted by a certified professional. It has no
                      side effects and doesn't involve medication or surgery. You remain in control throughout the session
                      and can't be made to do anything against your will. Always consult with your doctor before starting
                      any weight loss program.
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
                <Link href="/hypnotherapy-for-anxiety" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">Hypnotherapy for Anxiety</h3>
                  <p className="text-sm text-gray-600">Reduce stress and manage anxiety with evidence-based hypnotherapy</p>
                </Link>
                <Link href="/quit-smoking-hypnotherapy" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">Quit Smoking Hypnotherapy</h3>
                  <p className="text-sm text-gray-600">Break free from nicotine addiction with proven techniques</p>
                </Link>
                <Link href="/hypnotherapy-near-me" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2 text-blue-600">Find Hypnotherapists Near You</h3>
                  <p className="text-sm text-gray-600">Search certified practitioners in your local area</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Achieve Your Weight Loss Goals?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Find a certified weight loss hypnotherapist near you and start your journey to a healthier,
                happier you. Natural, lasting weight loss starts in your mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/search?specialty=weight">
                    <Search className="h-5 w-5 mr-2" />
                    Find Weight Loss Hypnotherapists
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
