import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import Script from 'next/script';

export const metadata = {
  title: 'Hypnotherapy FAQs | Common Questions About Hypnosis Answered',
  description: 'Get answers to common questions about hypnotherapy, including safety, effectiveness, what to expect, costs, and how to choose a hypnotherapist.',
  keywords: 'hypnotherapy questions, is hypnotherapy safe, how much does hypnotherapy cost, hypnosis FAQ',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/faq',
  },
  openGraph: {
    title: 'Hypnotherapy FAQs | Common Questions Answered',
    description: 'Get answers to common questions about hypnotherapy, including safety, effectiveness, what to expect, costs, and how to choose a hypnotherapist.',
    url: 'https://hypnotherapy-finder.com/faq',
    siteName: 'Hypnotherapy Finder',
    images: [{ url: 'https://hypnotherapy-finder.com/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hypnotherapy FAQs | Common Questions Answered',
    description: 'Get answers to common questions about hypnotherapy, including safety, effectiveness, what to expect, costs, and how to choose a hypnotherapist.',
    images: ['https://hypnotherapy-finder.com/og-image.jpg'],
  },
};

export default function FAQPage() {
  const faqs = [
    {
      category: 'Basics',
      questions: [
        {
          q: 'What is hypnotherapy?',
          a: 'Hypnotherapy is a therapeutic technique that uses guided relaxation and focused attention to achieve a heightened state of awareness (trance). In this state, you can focus your mind more effectively and become more open to suggestions that help you make positive changes in your thoughts, feelings, and behaviors.'
        },
        {
          q: 'Is hypnotherapy the same as stage hypnosis?',
          a: 'No. Stage hypnosis is entertainment, while clinical hypnotherapy is a serious therapeutic practice. In therapeutic hypnosis, you remain in control, cannot be made to do anything against your will, and work with a trained professional toward specific healing or behavioral goals.'
        },
        {
          q: 'Does hypnotherapy really work?',
          a: 'Yes. Hundreds of peer-reviewed studies support hypnotherapy\'s effectiveness for various conditions including pain management, anxiety, IBS, smoking cessation, and more. Success rates vary by individual and condition, but many people experience significant benefits, often in just a few sessions.'
        },
      ]
    },
    {
      category: 'Safety & Control',
      questions: [
        {
          q: 'Is hypnotherapy safe?',
          a: 'Yes, hypnotherapy is very safe when conducted by a trained, certified professional. It\'s a natural state similar to deep relaxation or focused concentration. You remain aware throughout the session and cannot be "stuck" in hypnosis.'
        },
        {
          q: 'Will I be unconscious or asleep?',
          a: 'No. You remain aware and conscious during hypnotherapy. You can hear everything, speak if needed, and remember the session. Many people describe it as feeling deeply relaxed while staying mentally alert and focused.'
        },
        {
          q: 'Can I be made to do things against my will?',
          a: 'Absolutely not. You maintain complete control during hypnotherapy and cannot be made to do, say, or reveal anything against your values or desires. You can reject any suggestion and can emerge from hypnosis at any time.'
        },
        {
          q: 'What if I can\'t be hypnotized?',
          a: 'Most people can be hypnotized to some degree. Hypnosis is a natural state we all experience daily (like getting absorbed in a book or movie). About 95% of people can achieve sufficient depth for therapeutic work. Willingness and trust in your hypnotherapist are key factors.'
        },
      ]
    },
    {
      category: 'What to Expect',
      questions: [
        {
          q: 'What happens in a hypnotherapy session?',
          a: 'A typical session includes: (1) Discussion of your goals and concerns, (2) Explanation of the process, (3) Guided relaxation to enter hypnotic state, (4) Therapeutic work using techniques tailored to your needs, (5) Gentle return to full awareness, (6) Discussion of the session and next steps. Sessions typically last 60-90 minutes.'
        },
        {
          q: 'How many sessions will I need?',
          a: 'This varies by person and goal. Some people see results in 1-3 sessions (especially for smoking cessation or specific phobias). More complex issues like chronic anxiety or weight management might require 6-10 sessions. Your hypnotherapist will discuss a treatment plan based on your specific needs.'
        },
        {
          q: 'What does hypnosis feel like?',
          a: 'Most people describe it as deeply relaxing and pleasant. You might feel: very calm and peaceful, heavy or light, warm and comfortable, mentally focused, or like you\'re in a dreamlike state while still aware. There\'s no single "right" way to experience hypnosis.'
        },
        {
          q: 'Will I remember the session?',
          a: 'Usually yes. Most people remember all or most of their session. Some people may have gaps in memory, similar to when you "zone out" during a long drive but that\'s normal and doesn\'t affect results.'
        },
      ]
    },
    {
      category: 'Effectiveness & Results',
      questions: [
        {
          q: 'What can hypnotherapy help with?',
          a: 'Hypnotherapy is effective for many issues including: anxiety and stress, weight loss, smoking cessation, pain management, insomnia, phobias and fears, IBS and digestive issues, confidence and performance, PTSD and trauma, breaking unwanted habits, and much more. Consult with a hypnotherapist about your specific goals.'
        },
        {
          q: 'How quickly will I see results?',
          a: 'Results vary by individual and issue. Some people notice changes immediately after the first session. Others see gradual improvement over several sessions. Smoking cessation often shows results in 1-3 sessions, while chronic anxiety or pain management might take longer.'
        },
        {
          q: 'Is hypnotherapy a permanent solution?',
          a: 'Hypnotherapy creates lasting change by working with your subconscious mind to establish new patterns. Many people experience long-term or permanent results. However, like any therapy, maintaining results may require occasional "booster" sessions or practicing self-hypnosis techniques at home.'
        },
        {
          q: 'Can hypnotherapy replace medical treatment?',
          a: 'No. Hypnotherapy should complement, not replace, medical care. Always consult with your physician about medical conditions. Many doctors recommend hypnotherapy as an adjunct treatment for pain, anxiety, IBS, and other conditions.'
        },
      ]
    },
    {
      category: 'Choosing a Hypnotherapist',
      questions: [
        {
          q: 'How do I choose a qualified hypnotherapist?',
          a: 'Look for: (1) Certification from recognized organizations (NGH, IACT, AHA, etc.), (2) Adequate training hours (minimum 100, preferably 200+), (3) Specialization in your specific issue, (4) Good reviews and testimonials, (5) Professional liability insurance, (6) Someone you feel comfortable with. Schedule a consultation before committing.'
        },
        {
          q: 'What certifications should a hypnotherapist have?',
          a: 'Reputable certifications include: Certified Hypnotherapist (CHt) from NGH, IACT, or ACHE; Clinical Hypnotherapist credentials; or medical professionals (MD, DO, psychologist, dentist) with hypnosis training through ASCH or SCEH.'
        },
        {
          q: 'Should I see a medical professional or a certified hypnotherapist?',
          a: 'For medical conditions, seeing a licensed healthcare provider (physician, psychologist) trained in hypnosis is ideal. For non-medical issues like habits, confidence, or stress management, a certified hypnotherapist is appropriate. For medical issues, a certified hypnotherapist can work alongside your medical team.'
        },
        {
          q: 'Can hypnotherapy be done online?',
          a: 'Yes! Online hypnotherapy via video call is very effective and convenient. The hypnotic state is achieved through voice and guidance, not physical presence. Many practitioners offer virtual sessions, which can be just as effective as in-person for most issues.'
        },
      ]
    },
    {
      category: 'Cost & Insurance',
      questions: [
        {
          q: 'How much does hypnotherapy cost?',
          a: 'Costs vary by location and practitioner experience. Typical ranges: $75-$150 per hour for certified hypnotherapists, $150-$300+ per hour for clinical hypnotherapists or medical professionals. Initial sessions may cost more. Package deals for multiple sessions are often available.'
        },
        {
          q: 'Does insurance cover hypnotherapy?',
          a: 'Coverage varies. Some insurance plans cover hypnotherapy when performed by licensed healthcare providers (MD, DO, psychologist) for covered conditions like pain management or smoking cessation. Coverage by certified hypnotherapists (non-medical) is less common. Check with your insurance provider and ask about HSA/FSA eligibility.'
        },
        {
          q: 'Is hypnotherapy worth the cost?',
          a: 'Many people find hypnotherapy cost-effective because it often requires fewer sessions than traditional talk therapy to see results. For example, 3-5 sessions for smoking cessation ($450-$750) is typically less expensive than years of buying cigarettes, and the health benefits are invaluable.'
        },
      ]
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.flatMap((category) =>
      category.questions.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      }))
    ),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <div className="flex justify-center mb-4">
                <HelpCircle className="h-16 w-16 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600">
                Everything you need to know about hypnotherapy
              </p>
            </div>
          </div>
        </section>

        {/* FAQs by Category */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {faqs.map((category, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
                    {category.category}
                  </h2>
                  <div className="space-y-6">
                    {category.questions.map((faq, qIdx) => (
                      <div key={qIdx} className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {faq.q}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-xl text-gray-600 mb-8">
                The best way to learn more is to speak directly with a certified hypnotherapist
                in your area. Most offer free consultations to discuss your goals and answer
                your specific questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/search">Find a Practitioner</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Learn More</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/how-it-works" className="p-6 border rounded-lg hover:border-blue-600 hover:shadow-md transition text-center">
                  <h3 className="font-semibold text-lg mb-2">How It Works</h3>
                  <p className="text-gray-600 text-sm">
                    Understand the process and what to expect
                  </p>
                </Link>
                <Link href="/about" className="p-6 border rounded-lg hover:border-blue-600 hover:shadow-md transition text-center">
                  <h3 className="font-semibold text-lg mb-2">About Hypnotherapy</h3>
                  <p className="text-gray-600 text-sm">
                    History, science, and professional standards
                  </p>
                </Link>
                <Link href="/locations" className="p-6 border rounded-lg hover:border-blue-600 hover:shadow-md transition text-center">
                  <h3 className="font-semibold text-lg mb-2">Find by Location</h3>
                  <p className="text-gray-600 text-sm">
                    Browse practitioners in 30+ cities
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
