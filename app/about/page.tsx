import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, BookOpen, History, Users } from 'lucide-react';

export const metadata = {
  title: 'About Hypnotherapy | History, Science, and Professional Standards',
  description: 'Learn about the history of hypnotherapy, from ancient practices to modern clinical applications. Discover professional certifications and what makes a qualified hypnotherapist.',
  keywords: 'hypnotherapy history, clinical hypnosis, hypnotherapy certification, professional hypnotherapist',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                About Hypnotherapy
              </h1>
              <p className="text-xl text-gray-600">
                A journey through the history, science, and professional practice of clinical hypnotherapy
              </p>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <History className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold">The History of Hypnotherapy</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">Ancient Roots</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Trance-like states and healing rituals have been documented in ancient civilizations
                    for thousands of years. Egyptian, Greek, and Hindu texts describe sleep temples
                    and healing ceremonies that share similarities with modern hypnotherapy.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">18th Century - Franz Mesmer</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Austrian physician Franz Mesmer (1734-1815) developed "animal magnetism," believing
                    he could harness magnetic forces to heal patients. While his theories were later
                    disproven, his work laid the foundation for understanding the power of suggestion
                    and the mind-body connection. The term "mesmerize" comes from his name.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">19th Century - Scientific Foundation</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Scottish surgeon James Braid (1795-1860) coined the term "hypnosis" (from Greek
                    "hypnos" meaning sleep) and established it as a legitimate area of scientific study.
                    He demonstrated that hypnotic effects were psychological, not magnetic.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    French neurologist Jean-Martin Charcot studied hypnosis at Paris's Salpêtrière
                    Hospital, bringing it into mainstream medical practice. His work influenced Sigmund
                    Freud, who initially used hypnosis before developing psychoanalysis.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">20th Century - Modern Clinical Hypnotherapy</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Milton H. Erickson, MD (1901-1980) revolutionized hypnotherapy with his innovative
                    techniques and naturalistic approach. He demonstrated hypnosis could be used
                    therapeutically without formal induction, influencing modern brief therapy and NLP.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    In 1958, both the American Medical Association and the American Psychological
                    Association recognized hypnosis as a valid therapeutic technique. The British
                    Medical Association had approved it in 1955.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">21st Century - Evidence-Based Practice</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Modern hypnotherapy is backed by extensive research using brain imaging technology
                    (fMRI, PET scans) that shows measurable changes in brain activity during hypnosis.
                    It's integrated into pain management, mental health treatment, and behavioral
                    medicine across healthcare systems worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Standards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Award className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold">Professional Certifications & Standards</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">Certified Hypnotherapist (CHt)</h3>
                  <p className="text-gray-700 mb-3">
                    Requires completion of accredited training (typically 100-500 hours) and
                    certification through recognized organizations.
                  </p>
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold mb-1">Major Certifying Bodies:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>National Guild of Hypnotists (NGH)</li>
                      <li>American Council of Hypnotist Examiners (ACHE)</li>
                      <li>International Association of Counselors & Therapists (IACT)</li>
                      <li>American Hypnosis Association (AHA)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">Clinical Hypnotherapist</h3>
                  <p className="text-gray-700 mb-3">
                    Advanced practitioners with additional clinical training, often in healthcare
                    settings. May work alongside physicians, psychologists, or other healthcare providers.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3">Medical/Dental Hypnosis</h3>
                  <p className="text-gray-700 mb-3">
                    Licensed healthcare professionals (MDs, DOs, psychologists, dentists) who have
                    completed additional hypnosis training and use it within their scope of practice.
                  </p>
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold mb-1">Professional Organizations:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>American Society of Clinical Hypnosis (ASCH)</li>
                      <li>Society for Clinical and Experimental Hypnosis (SCEH)</li>
                      <li>British Society of Clinical Hypnosis (BSCH)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
                  <p className="font-semibold text-gray-900 mb-2">When Choosing a Hypnotherapist:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Verify certification from recognized organizations</li>
                    <li>Check training hours (minimum 100, preferably 200+)</li>
                    <li>Ask about specialization in your specific need</li>
                    <li>Confirm they carry professional liability insurance</li>
                    <li>Read reviews and testimonials</li>
                    <li>Schedule a consultation to ensure good fit</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research & Evidence */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold">Scientific Research & Evidence</h2>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Modern hypnotherapy is supported by extensive scientific research demonstrating its
                  effectiveness for various conditions:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Pain Management</h3>
                    <p className="text-gray-700 text-sm">
                      Multiple studies show hypnosis effectively reduces acute and chronic pain,
                      including post-surgical pain, fibromyalgia, and cancer-related pain. Some
                      patients achieve pain reduction comparable to medication.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Anxiety & Stress</h3>
                    <p className="text-gray-700 text-sm">
                      Research demonstrates hypnotherapy significantly reduces anxiety symptoms,
                      with effects lasting months after treatment. Particularly effective for
                      medical anxiety and pre-surgical stress.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Irritable Bowel Syndrome</h3>
                    <p className="text-gray-700 text-sm">
                      Gut-directed hypnotherapy is recommended by the American College of
                      Gastroenterology for IBS, with studies showing 70-80% improvement rates
                      that persist long-term.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Smoking Cessation</h3>
                    <p className="text-gray-700 text-sm">
                      Meta-analyses suggest hypnotherapy can be more effective than nicotine
                      replacement therapy alone, especially when combined with other cessation
                      methods.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold">Note:</span> While research supports hypnotherapy's
                    effectiveness, individual results vary. Hypnotherapy is not a cure-all and works
                    best as part of a comprehensive treatment approach. Always consult healthcare
                    providers for medical conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About This Directory */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Users className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold">About Hypnotherapy Finder</h2>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Hypnotherapy Finder is a comprehensive directory connecting people seeking
                  hypnotherapy services with certified, professional practitioners across the
                  United States.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Our mission is to make it easy to find qualified hypnotherapists in your area,
                  compare their specialties and credentials, and make informed decisions about
                  your therapeutic journey.
                </p>

                <div className="bg-white p-6 rounded-lg border mt-6">
                  <h3 className="text-xl font-semibold mb-4">Our Commitment:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Featuring certified and trained hypnotherapists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Providing educational resources about hypnotherapy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Making it easy to search by location and specialty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Supporting evidence-based therapeutic practices</span>
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
            <h2 className="text-3xl font-bold mb-4">Find a Certified Hypnotherapist Today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Search our directory of qualified practitioners in your area.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/search">Search Directory</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
