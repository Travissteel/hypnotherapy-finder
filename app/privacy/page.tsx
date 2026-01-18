import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | Hypnotherapy Finder',
  description: 'Privacy policy for Hypnotherapy Finder directory. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/privacy',
  },
};

export default function PrivacyPage() {
  const lastUpdated = 'November 28, 2025';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: {lastUpdated}</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Hypnotherapy Finder ("we," "us," or "our") is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you visit our website and use our services.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Please read this privacy policy carefully. If you do not agree with the terms of
                  this privacy policy, please do not access the site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>

                <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may collect personally identifiable information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Register as a practitioner on our directory</li>
                  <li>Create or claim a practitioner profile</li>
                  <li>Contact us through our contact form</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Interact with our services</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This information may include:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Name and professional title</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Business address</li>
                  <li>Professional certifications and credentials</li>
                  <li>Website URL</li>
                  <li>Specialties and service descriptions</li>
                  <li>Payment information (for premium services)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Automatically Collected Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you visit our website, we automatically collect certain information about
                  your device and browsing behavior, including:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website</li>
                  <li>Date and time of access</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>To provide, maintain, and improve our directory services</li>
                  <li>To create and display practitioner profiles</li>
                  <li>To process practitioner registrations and account management</li>
                  <li>To send administrative information and updates</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To send marketing communications (with your consent)</li>
                  <li>To monitor and analyze usage patterns and trends</li>
                  <li>To detect, prevent, and address technical issues and fraud</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Sharing Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may share your information in the following situations:
                </p>

                <h3 className="text-xl font-semibold mb-3">Public Directory Listings</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you are a practitioner with a profile on our directory, certain information
                  (name, location, specialties, contact information, website) will be publicly
                  displayed to help clients find and contact you.
                </p>

                <h3 className="text-xl font-semibold mb-3">Service Providers</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may share your information with third-party service providers who perform
                  services on our behalf, such as:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Web hosting and infrastructure services</li>
                  <li>Payment processing</li>
                  <li>Email delivery services</li>
                  <li>Analytics providers</li>
                  <li>Customer support tools</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Legal Requirements</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may disclose your information if required to do so by law or in response to
                  valid requests by public authorities (e.g., court orders, subpoenas).
                </p>

                <h3 className="text-xl font-semibold mb-3">Business Transfers</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In connection with any merger, sale of company assets, financing, or acquisition
                  of all or a portion of our business, user information may be transferred.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to track activity on our website
                  and store certain information. You can instruct your browser to refuse all cookies
                  or to indicate when a cookie is being sent. However, if you do not accept cookies,
                  you may not be able to use some portions of our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect
                  your personal information. However, no method of transmission over the Internet or
                  electronic storage is 100% secure. While we strive to use commercially acceptable
                  means to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Your Data Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Access:</strong> Request copies of your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Restriction:</strong> Request restriction of processing your information</li>
                  <li><strong>Portability:</strong> Request transfer of your information to another service</li>
                  <li><strong>Objection:</strong> Object to our processing of your information</li>
                  <li><strong>Withdraw consent:</strong> Withdraw consent where we rely on it</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  To exercise these rights, please contact us at{' '}
                  <a href="mailto:privacy@hypnotherapy-finder.com" className="text-blue-600 hover:underline">
                    privacy@hypnotherapy-finder.com
                  </a>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the
                  purposes outlined in this Privacy Policy, unless a longer retention period is
                  required by law. Practitioner profile information remains active until you request
                  removal or your account is terminated.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our services are not intended for individuals under the age of 18. We do not
                  knowingly collect personal information from children. If you are a parent or
                  guardian and believe your child has provided us with personal information, please
                  contact us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any
                  changes by posting the new Privacy Policy on this page and updating the "Last
                  updated" date. You are advised to review this Privacy Policy periodically for
                  any changes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Email:</strong> <a href="mailto:privacy@hypnotherapy-finder.com" className="text-blue-600 hover:underline">privacy@hypnotherapy-finder.com</a></li>
                  <li><strong>Website:</strong> <a href="/contact" className="text-blue-600 hover:underline">Contact Form</a></li>
                </ul>
              </section>

              <div className="bg-gray-50 border-l-4 border-blue-600 p-6 rounded mt-8">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This privacy policy is provided as a template and should
                  be reviewed by legal counsel to ensure compliance with applicable laws in your
                  jurisdiction, including GDPR (EU), CCPA (California), and other data protection
                  regulations.
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
