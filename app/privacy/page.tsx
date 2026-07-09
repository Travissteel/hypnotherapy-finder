import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Hypnotherapy Finder directory. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://hypnotherapy-finder.com/privacy',
  },
};

export default function PrivacyPage() {
  const lastUpdated = 'November 28, 2025';

  const h2Style = { fontSize: 22, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 };
  const h3Style = { fontSize: 17, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 12, marginTop: 24 };
  const pStyle = { fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 16 };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, paddingTop: 80 }}>
        <section style={{ background: 'var(--hf-bg-mid)', padding: '56px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Legal</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 12 }}>Privacy Policy</h1>
            <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)' }}>Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section style={{ padding: '56px 24px 80px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '48px' }}>
              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Introduction</h2>
                <p style={pStyle}>
                  Hypnotherapy Finder ("we," "us," or "our") is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you visit our website and use our services.
                </p>
                <p style={pStyle}>
                  Please read this privacy policy carefully. If you do not agree with the terms of
                  this privacy policy, please do not access the site.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Information We Collect</h2>
                <h3 style={h3Style}>Personal Information</h3>
                <p style={pStyle}>We may collect personally identifiable information that you voluntarily provide to us when you:</p>
                <ul style={{ paddingLeft: 24, marginBottom: 16, color: 'var(--hf-fg-dim)', lineHeight: 2 }}>
                  <li>Register as a practitioner on our directory</li>
                  <li>Create or claim a practitioner profile</li>
                  <li>Contact us through our contact form</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Interact with our services</li>
                </ul>
                <p style={pStyle}>This information may include:</p>
                <ul style={{ paddingLeft: 24, marginBottom: 16, color: 'var(--hf-fg-dim)', lineHeight: 2 }}>
                  <li>Name and professional title</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Business address</li>
                  <li>Professional certifications and credentials</li>
                  <li>Website URL</li>
                  <li>Specialties and service descriptions</li>
                  <li>Payment information (for premium services)</li>
                </ul>

                <h3 style={h3Style}>Automatically Collected Information</h3>
                <p style={pStyle}>When you visit our website, we automatically collect certain information about your device and browsing behavior, including:</p>
                <ul style={{ paddingLeft: 24, marginBottom: 16, color: 'var(--hf-fg-dim)', lineHeight: 2 }}>
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website</li>
                  <li>Date and time of access</li>
                </ul>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>How We Use Your Information</h2>
                <p style={pStyle}>We use the information we collect for various purposes, including:</p>
                <ul style={{ paddingLeft: 24, marginBottom: 16, color: 'var(--hf-fg-dim)', lineHeight: 2 }}>
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

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Sharing Your Information</h2>
                <p style={pStyle}>We may share your information in the following situations:</p>

                <h3 style={h3Style}>Public Directory Listings</h3>
                <p style={pStyle}>
                  If you are a practitioner with a profile on our directory, certain information
                  (name, location, specialties, contact information, website) will be publicly
                  displayed to help clients find and contact you.
                </p>

                <h3 style={h3Style}>Service Providers</h3>
                <p style={pStyle}>We may share your information with third-party service providers who perform services on our behalf, such as:</p>
                <ul style={{ paddingLeft: 24, marginBottom: 16, color: 'var(--hf-fg-dim)', lineHeight: 2 }}>
                  <li>Web hosting and infrastructure services</li>
                  <li>Payment processing</li>
                  <li>Email delivery services</li>
                  <li>Analytics providers</li>
                  <li>Customer support tools</li>
                </ul>

                <h3 style={h3Style}>Legal Requirements</h3>
                <p style={pStyle}>
                  We may disclose your information if required to do so by law or in response to
                  valid requests by public authorities (e.g., court orders, subpoenas).
                </p>

                <h3 style={h3Style}>Business Transfers</h3>
                <p style={pStyle}>
                  In connection with any merger, sale of company assets, financing, or acquisition
                  of all or a portion of our business, user information may be transferred.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Cookies and Tracking Technologies</h2>
                <p style={pStyle}>
                  We use cookies and similar tracking technologies to track activity on our website
                  and store certain information. You can instruct your browser to refuse all cookies
                  or to indicate when a cookie is being sent. However, if you do not accept cookies,
                  you may not be able to use some portions of our service.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Data Security</h2>
                <p style={pStyle}>
                  We implement appropriate technical and organizational security measures to protect
                  your personal information. However, no method of transmission over the Internet or
                  electronic storage is 100% secure. While we strive to use commercially acceptable
                  means to protect your personal information, we cannot guarantee its absolute security.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Your Data Rights</h2>
                <p style={pStyle}>Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul style={{ paddingLeft: 24, marginBottom: 16, color: 'var(--hf-fg-dim)', lineHeight: 2 }}>
                  <li><strong style={{ color: 'var(--hf-fg)' }}>Access:</strong> Request copies of your personal information</li>
                  <li><strong style={{ color: 'var(--hf-fg)' }}>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong style={{ color: 'var(--hf-fg)' }}>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong style={{ color: 'var(--hf-fg)' }}>Restriction:</strong> Request restriction of processing your information</li>
                  <li><strong style={{ color: 'var(--hf-fg)' }}>Portability:</strong> Request transfer of your information to another service</li>
                  <li><strong style={{ color: 'var(--hf-fg)' }}>Objection:</strong> Object to our processing of your information</li>
                  <li><strong style={{ color: 'var(--hf-fg)' }}>Withdraw consent:</strong> Withdraw consent where we rely on it</li>
                </ul>
                <p style={pStyle}>
                  To exercise these rights, please contact us at{' '}
                  <a href="mailto:privacy@hypnotherapy-finder.com" style={{ color: 'var(--hf-accent)', textDecoration: 'none' }}>
                    privacy@hypnotherapy-finder.com
                  </a>
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Data Retention</h2>
                <p style={pStyle}>
                  We retain your personal information only for as long as necessary to fulfill the
                  purposes outlined in this Privacy Policy, unless a longer retention period is
                  required by law. Practitioner profile information remains active until you request
                  removal or your account is terminated.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Children's Privacy</h2>
                <p style={pStyle}>
                  Our services are not intended for individuals under the age of 18. We do not
                  knowingly collect personal information from children. If you are a parent or
                  guardian and believe your child has provided us with personal information, please
                  contact us.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Changes to This Privacy Policy</h2>
                <p style={pStyle}>
                  We may update our Privacy Policy from time to time. We will notify you of any
                  changes by posting the new Privacy Policy on this page and updating the "Last
                  updated" date. You are advised to review this Privacy Policy periodically for
                  any changes.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Contact Us</h2>
                <p style={pStyle}>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--hf-fg-dim)', lineHeight: 2 }}>
                  <li><strong style={{ color: 'var(--hf-fg)' }}>Email:</strong>{' '}<a href="mailto:privacy@hypnotherapy-finder.com" style={{ color: 'var(--hf-accent)', textDecoration: 'none' }}>privacy@hypnotherapy-finder.com</a></li>
                  <li><strong style={{ color: 'var(--hf-fg)' }}>Website:</strong>{' '}<a href="/contact" style={{ color: 'var(--hf-accent)', textDecoration: 'none' }}>Contact Form</a></li>
                </ul>
              </section>

              <div style={{ padding: '20px 24px', borderRadius: 10, borderLeft: '3px solid var(--hf-accent)', background: 'rgba(255,255,255,0.03)' }}>
                <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>
                  <strong style={{ color: 'var(--hf-fg)' }}>Note:</strong> This privacy policy is provided as a template and should
                  be reviewed by legal counsel to ensure compliance with applicable laws in your
                  jurisdiction, including GDPR (EU), CCPA (California), and other data protection
                  regulations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
