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
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 12 }}>Terms of Service</h1>
            <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)' }}>Last updated: {lastUpdated}</p>
          </div>
        </section>

        <section style={{ padding: '56px 24px 80px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '48px' }}>
              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Agreement to Terms</h2>
                <p style={pStyle}>
                  By accessing or using Hypnotherapy Finder ("the Service"), you agree to be bound by
                  these Terms of Service ("Terms"). If you do not agree to these Terms, you may not
                  access or use the Service.
                </p>
                <p style={pStyle}>
                  These Terms apply to all visitors, users, and others who access or use the Service,
                  including practitioners who list their services on our directory.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Description of Service</h2>
                <p style={pStyle}>Hypnotherapy Finder is an online directory that connects individuals seeking hypnotherapy services with certified hypnotherapists. Our Service includes:</p>
                <ul style={{ paddingLeft: 24, marginBottom: 16, color: 'var(--hf-fg-dim)', lineHeight: 2 }}>
                  <li>A searchable directory of hypnotherapy practitioners</li>
                  <li>Practitioner profile pages with contact information</li>
                  <li>Educational resources about hypnotherapy</li>
                  <li>Tools for practitioners to manage their listings</li>
                </ul>
                <p style={pStyle}>We do not provide hypnotherapy services directly. We serve only as a platform to connect clients with practitioners.</p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>User Accounts</h2>
                <h3 style={h3Style}>Account Creation</h3>
                <p style={pStyle}>To access certain features of the Service, you may need to create an account. When you create an account, you agree to:</p>
                <ul style={{ paddingLeft: 24, marginBottom: 16, color: 'var(--hf-fg-dim)', lineHeight: 2 }}>
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Keep your login credentials secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>

                <h3 style={h3Style}>Account Termination</h3>
                <p style={pStyle}>
                  We reserve the right to suspend or terminate your account at any time, without
                  notice, for conduct that we believe violates these Terms or is harmful to other
                  users, practitioners, or the Service.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Practitioner Listings</h2>
                <h3 style={h3Style}>Listing Requirements</h3>
                <p style={pStyle}>Practitioners who create or claim listings on our directory agree to:</p>
                <ul style={{ paddingLeft: 24, marginBottom: 16, color: 'var(--hf-fg-dim)', lineHeight: 2 }}>
                  <li>Provide truthful and accurate information about their qualifications</li>
                  <li>Hold valid certifications and licenses as claimed</li>
                  <li>Maintain professional liability insurance (where required by law)</li>
                  <li>Comply with all applicable laws and professional standards</li>
                  <li>Keep their listing information current and up-to-date</li>
                </ul>

                <h3 style={h3Style}>Verification</h3>
                <p style={pStyle}>
                  While we may verify certain information provided by practitioners, we do not
                  guarantee the accuracy of any listing. Users should independently verify
                  credentials and qualifications before engaging any practitioner's services.
                </p>

                <h3 style={h3Style}>Removal of Listings</h3>
                <p style={pStyle}>
                  We reserve the right to remove any listing that violates these Terms, contains
                  inaccurate information, or is the subject of complaints or legal action.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Disclaimer of Medical Advice</h2>
                <p style={pStyle}>
                  The information provided on Hypnotherapy Finder is for informational purposes only
                  and is not intended as a substitute for professional medical advice, diagnosis,
                  or treatment.
                </p>
                <p style={pStyle}>
                  Always seek the advice of your physician or other qualified health provider with
                  any questions you may have regarding a medical condition. Never disregard
                  professional medical advice or delay in seeking it because of something you have
                  read on this website.
                </p>
                <p style={pStyle}>
                  Hypnotherapy is a complementary therapy and should not be used as a replacement
                  for conventional medical treatment.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Limitation of Liability</h2>
                <p style={pStyle}>To the maximum extent permitted by law, Hypnotherapy Finder and its owners, officers, directors, employees, and agents shall not be liable for:</p>
                <ul style={{ paddingLeft: 24, marginBottom: 16, color: 'var(--hf-fg-dim)', lineHeight: 2 }}>
                  <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
                  <li>Damages resulting from your use or inability to use the Service</li>
                  <li>Any conduct or content of any third party on the Service</li>
                  <li>Any content obtained from the Service</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  <li>The services provided by any practitioner listed on our directory</li>
                </ul>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Indemnification</h2>
                <p style={pStyle}>
                  You agree to defend, indemnify, and hold harmless Hypnotherapy Finder and its
                  officers, directors, employees, and agents from any claims, damages, obligations,
                  losses, liabilities, costs, or debt, and expenses (including attorney's fees)
                  arising from: (i) your use of the Service; (ii) your violation of these Terms;
                  (iii) your violation of any third-party right, including any privacy or
                  intellectual property right; or (iv) any claim that your content caused damage
                  to a third party.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Intellectual Property</h2>
                <p style={pStyle}>
                  The Service and its original content, features, and functionality are and will
                  remain the exclusive property of Hypnotherapy Finder. The Service is protected
                  by copyright, trademark, and other laws.
                </p>
                <p style={pStyle}>Our trademarks may not be used in connection with any product or service without our prior written consent.</p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Prohibited Uses</h2>
                <p style={pStyle}>You agree not to use the Service:</p>
                <ul style={{ paddingLeft: 24, marginBottom: 16, color: 'var(--hf-fg-dim)', lineHeight: 2 }}>
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

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Third-Party Links</h2>
                <p style={pStyle}>
                  The Service may contain links to third-party websites or services that are not
                  owned or controlled by Hypnotherapy Finder. We have no control over, and assume
                  no responsibility for, the content, privacy policies, or practices of any
                  third-party websites or services. You acknowledge and agree that we shall not
                  be responsible or liable for any damage or loss caused by the use of any such
                  content, goods, or services.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Changes to Terms</h2>
                <p style={pStyle}>
                  We reserve the right to modify or replace these Terms at any time. If a revision
                  is material, we will provide at least 30 days' notice prior to any new terms
                  taking effect. What constitutes a material change will be determined at our
                  sole discretion. By continuing to access or use our Service after any revisions
                  become effective, you agree to be bound by the revised terms.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Governing Law</h2>
                <p style={pStyle}>
                  These Terms shall be governed by and construed in accordance with the laws of
                  the United States, without regard to its conflict of law provisions. Any legal
                  action or proceeding arising under these Terms will be brought exclusively in
                  the federal or state courts located in the United States.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Severability</h2>
                <p style={pStyle}>
                  If any provision of these Terms is held to be invalid or unenforceable, the
                  remaining provisions will remain in full force and effect. The invalid or
                  unenforceable provision will be modified to reflect the parties' intention
                  as closely as possible.
                </p>
              </section>

              <section style={{ marginBottom: 40 }}>
                <h2 style={h2Style}>Contact Us</h2>
                <p style={pStyle}>If you have any questions about these Terms, please contact us:</p>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--hf-fg-dim)', lineHeight: 2 }}>
                  <li><strong style={{ color: 'var(--hf-fg)' }}>Email:</strong>{' '}<a href="mailto:legal@hypnotherapy-finder.com" style={{ color: 'var(--hf-accent)', textDecoration: 'none' }}>legal@hypnotherapy-finder.com</a></li>
                  <li><strong style={{ color: 'var(--hf-fg)' }}>Website:</strong>{' '}<a href="/contact" style={{ color: 'var(--hf-accent)', textDecoration: 'none' }}>Contact Form</a></li>
                </ul>
              </section>

              <div style={{ padding: '20px 24px', borderRadius: 10, borderLeft: '3px solid var(--hf-accent)', background: 'rgba(255,255,255,0.03)' }}>
                <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6, margin: 0 }}>
                  <strong style={{ color: 'var(--hf-fg)' }}>Note:</strong> This terms of service document is provided as a template
                  and should be reviewed by legal counsel to ensure compliance with applicable laws
                  in your jurisdiction.
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
