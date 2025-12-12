import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Hypnotherapy Finder',
  description: 'Terms of service for Hypnotherapy Finder directory. Read our terms and conditions for using the hypnotherapist directory.',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/terms',
  },
  openGraph: {
    url: 'https://hypnotherapy-finder.com/terms',
    title: 'Terms of Service | Hypnotherapy Finder',
    description: 'Terms of service for Hypnotherapy Finder directory. Read our terms and conditions for using the hypnotherapist directory.',
    siteName: 'Hypnotherapy Finder',
    locale: 'en_US',
    type: 'website',
  },
};

export default function TermsPage() {
  const lastUpdated = 'December 10, 2025';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: {lastUpdated}</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By accessing or using Hypnotherapy Finder ("the Service"), you agree to be bound by
                  these Terms of Service ("Terms"). If you do not agree to these Terms, you may not
                  access or use the Service.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  These Terms apply to all visitors, users, and others who access or use the Service,
                  including practitioners who list their services on our directory.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Description of Service</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Hypnotherapy Finder is an online directory that connects individuals seeking
                  hypnotherapy services with certified hypnotherapists. Our Service includes:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>A searchable directory of hypnotherapy practitioners</li>
                  <li>Practitioner profile pages with contact information</li>
                  <li>Educational resources about hypnotherapy</li>
                  <li>Tools for practitioners to manage their listings</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  We do not provide hypnotherapy services directly. We serve only as a platform to
                  connect clients with practitioners.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">User Accounts</h2>

                <h3 className="text-xl font-semibold mb-3">Account Creation</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To access certain features of the Service, you may need to create an account.
                  When you create an account, you agree to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Keep your login credentials secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Account Termination</h3>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to suspend or terminate your account at any time, without
                  notice, for conduct that we believe violates these Terms or is harmful to other
                  users, practitioners, or the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Practitioner Listings</h2>

                <h3 className="text-xl font-semibold mb-3">Listing Requirements</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Practitioners who create or claim listings on our directory agree to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Provide truthful and accurate information about their qualifications</li>
                  <li>Hold valid certifications and licenses as claimed</li>
                  <li>Maintain professional liability insurance (where required by law)</li>
                  <li>Comply with all applicable laws and professional standards</li>
                  <li>Keep their listing information current and up-to-date</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Verification</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  While we may verify certain information provided by practitioners, we do not
                  guarantee the accuracy of any listing. Users should independently verify
                  credentials and qualifications before engaging any practitioner's services.
                </p>

                <h3 className="text-xl font-semibold mb-3">Removal of Listings</h3>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to remove any listing that violates these Terms, contains
                  inaccurate information, or is the subject of complaints or legal action.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Disclaimer of Medical Advice</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The information provided on Hypnotherapy Finder is for informational purposes only
                  and is not intended as a substitute for professional medical advice, diagnosis,
                  or treatment.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Always seek the advice of your physician or other qualified health provider with
                  any questions you may have regarding a medical condition. Never disregard
                  professional medical advice or delay in seeking it because of something you have
                  read on this website.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Hypnotherapy is a complementary therapy and should not be used as a replacement
                  for conventional medical treatment.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To the maximum extent permitted by law, Hypnotherapy Finder and its owners,
                  officers, directors, employees, and agents shall not be liable for:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
                  <li>Damages resulting from your use or inability to use the Service</li>
                  <li>Any conduct or content of any third party on the Service</li>
                  <li>Any content obtained from the Service</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  <li>The services provided by any practitioner listed on our directory</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree to defend, indemnify, and hold harmless Hypnotherapy Finder and its
                  officers, directors, employees, and agents from any claims, damages, obligations,
                  losses, liabilities, costs, or debt, and expenses (including attorney's fees)
                  arising from: (i) your use of the Service; (ii) your violation of these Terms;
                  (iii) your violation of any third-party right, including any privacy or
                  intellectual property right; or (iv) any claim that your content caused damage
                  to a third party.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Service and its original content, features, and functionality are and will
                  remain the exclusive property of Hypnotherapy Finder. The Service is protected
                  by copyright, trademark, and other laws.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our trademarks may not be used in connection with any product or service without
                  our prior written consent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Prohibited Uses</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree not to use the Service:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>For any unlawful purpose or in violation of any laws</li>
                  <li>To harass, abuse, or harm another person</li>
                  <li>To impersonate any person or entity</li>
                  <li>To interfere with or disrupt the Service or servers</li>
                  <li>To engage in any data mining, scraping, or similar activities</li>
                  <li>To transmit viruses, malware, or other malicious code</li>
                  <li>To spam or send unsolicited communications</li>
                  <li>To collect personal information about users without their consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
                <p className="text-gray-700 leading-relaxed">
                  The Service may contain links to third-party websites or services that are not
                  owned or controlled by Hypnotherapy Finder. We have no control over, and assume
                  no responsibility for, the content, privacy policies, or practices of any
                  third-party websites or services. You acknowledge and agree that we shall not
                  be responsible or liable for any damage or loss caused by the use of any such
                  content, goods, or services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision
                  is material, we will provide at least 30 days' notice prior to any new terms
                  taking effect. What constitutes a material change will be determined at our
                  sole discretion. By continuing to access or use our Service after any revisions
                  become effective, you agree to be bound by the revised terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of
                  the United States, without regard to its conflict of law provisions. Any legal
                  action or proceeding arising under these Terms will be brought exclusively in
                  the federal or state courts located in the United States.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Severability</h2>
                <p className="text-gray-700 leading-relaxed">
                  If any provision of these Terms is held to be invalid or unenforceable, the
                  remaining provisions will remain in full force and effect. The invalid or
                  unenforceable provision will be modified to reflect the parties' intention
                  as closely as possible.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Email:</strong> <a href="mailto:legal@hypnotherapy-finder.com" className="text-blue-600 hover:underline">legal@hypnotherapy-finder.com</a></li>
                  <li><strong>Website:</strong> <a href="/contact" className="text-blue-600 hover:underline">Contact Form</a></li>
                </ul>
              </section>

              <div className="bg-gray-50 border-l-4 border-blue-600 p-6 rounded mt-8">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This terms of service document is provided as a template
                  and should be reviewed by legal counsel to ensure compliance with applicable laws
                  in your jurisdiction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
