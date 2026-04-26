import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Award, BookOpen, History, Users, Linkedin, Shield, Heart, CheckCircle, Focus, Eye, Accessibility } from 'lucide-react';
import Script from 'next/script';

export const metadata = {
  title: 'About Hypnotherapy | History & Science',
  description: 'Learn about the history of hypnotherapy, from ancient practices to modern clinical applications. Discover professional certifications and what makes a qualified hypnotherapist.',
  keywords: 'hypnotherapy history, clinical hypnosis, hypnotherapy certification, professional hypnotherapist',
  alternates: { canonical: 'https://hypnotherapy-finder.com/about' },
  openGraph: {
    title: 'About Hypnotherapy | History & Science',
    description: 'Learn about the history of hypnotherapy, from ancient practices to modern clinical applications.',
    url: 'https://hypnotherapy-finder.com/about',
    siteName: 'Hypnotherapy Finder',
    images: [{ url: 'https://hypnotherapy-finder.com/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Hypnotherapy | History & Science',
    description: 'Learn about the history of hypnotherapy, from ancient practices to modern clinical applications.',
    images: ['https://hypnotherapy-finder.com/og-image.jpg'],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hypnotherapy Finder',
  url: 'https://hypnotherapy-finder.com',
  logo: 'https://hypnotherapy-finder.com/og-image.jpg',
  description: 'A directory of verified certified hypnotherapists across the United States.',
  foundingDate: '2024',
  knowsAbout: ['Hypnotherapy', 'Clinical Hypnosis', 'Hypnosis for Anxiety', 'Hypnosis for Weight Loss', 'Smoking Cessation Hypnotherapy'],
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', url: 'https://hypnotherapy-finder.com/contact' },
};

const timelineItems = [
  { title: 'Ancient Roots', content: 'Trance-like states and healing rituals have been documented in ancient civilizations for thousands of years. Egyptian, Greek, and Hindu texts describe sleep temples and healing ceremonies that share similarities with modern hypnotherapy.', time: 'Ancient Era' },
  { title: '18th Century – Franz Mesmer', content: 'Austrian physician Franz Mesmer (1734–1815) developed "animal magnetism," believing he could harness magnetic forces to heal patients. While his theories were later disproven, his work laid the foundation for understanding the power of suggestion and the mind-body connection.', time: '1734–1815' },
  { title: '19th Century – Scientific Foundation', content: 'Scottish surgeon James Braid (1795–1860) coined the term "hypnosis" and established it as a legitimate area of scientific study. French neurologist Jean-Martin Charcot brought it into mainstream medical practice, influencing Sigmund Freud.', time: '1800s' },
  { title: '20th Century – Milton Erickson', content: 'Milton H. Erickson, MD revolutionized hypnotherapy with his innovative techniques. In 1958, both the AMA and APA recognized hypnosis as a valid therapeutic technique.', time: '1900s' },
  { title: '21st Century – Evidence-Based', content: 'Modern hypnotherapy is backed by extensive research using brain imaging technology (fMRI, PET scans) that shows measurable changes in brain activity during hypnosis.', time: 'Today' },
];

const researchItems = [
  { title: 'Pain Management', content: 'Multiple studies show hypnosis effectively reduces acute and chronic pain. Some patients achieve pain reduction comparable to medication.', hue: 210 },
  { title: 'Anxiety & Stress', content: 'Research demonstrates hypnotherapy significantly reduces anxiety symptoms, with effects lasting months after treatment.', hue: 340 },
  { title: 'Irritable Bowel Syndrome', content: 'Gut-directed hypnotherapy is recommended by the ACG, with studies showing 70–80% improvement rates.', hue: 140 },
  { title: 'Smoking Cessation', content: 'Meta-analyses suggest hypnotherapy can be more effective than nicotine replacement therapy alone.', hue: 30 },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <Header />

      <main style={{ flex: 1, paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ background: 'var(--hf-bg-mid)', padding: '72px 24px 64px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 400, height: 400, background: 'oklch(0.72 0.12 285)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.06 }} />
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 400, height: 400, background: 'oklch(0.72 0.12 185)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.06 }} />
          <div style={{ maxWidth: 1020, margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40, alignItems: 'center' }}>
              <div>
                <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 20 }}>Our Story</span>
                <h1 className="font-serif-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 20 }}>
                  Cultivating <span style={{ color: 'var(--hf-accent)' }}>Clarity</span> and Inner Peace
                </h1>
                <p style={{ fontSize: 17, color: 'var(--hf-fg-dim)', lineHeight: 1.7, maxWidth: 560, marginBottom: 32, fontWeight: 300 }}>
                  We've built a sanctuary for those seeking professional guidance. Our platform bridges the gap between expert hypnotherapists and individuals ready for positive, lasting change.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-block', padding: '13px 28px', borderRadius: 9999, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                    Find a Therapist
                  </Link>
                  <Link href="/how-it-works" className="glass hf-glass-hover" style={{ display: 'inline-block', padding: '13px 28px', borderRadius: 9999, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>
                    How It Works
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Foundation */}
        <section style={{ padding: '72px 24px' }}>
          <div style={{ maxWidth: 1020, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 className="font-serif-display" style={{ fontSize: 36, color: 'var(--hf-fg)', marginBottom: 16 }}>Our Foundation</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', maxWidth: 560, margin: '0 auto', lineHeight: 1.65, fontWeight: 300 }}>
                Grounded in compassion and evidence-based practice, we are redefining the path to mental wellness.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 20 }}>
              {/* Mission */}
              <div className="glass-card" style={{ padding: '40px', position: 'relative', overflow: 'hidden', background: 'oklch(0.11 0.012 260)' }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, background: 'var(--hf-accent)', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.12 }} />
                <div style={{ position: 'relative' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'oklch(0.72 0.12 185 / 0.7)', display: 'block', marginBottom: 16 }}>Our Mission</span>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 14 }}>Bridging the Gap</h3>
                  <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, fontWeight: 300 }}>
                    To normalize the use of clinical hypnotherapy and connect individuals with high-quality, compassionate practitioners who facilitate deep healing and sustainable personal growth.
                  </p>
                  <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Focus style={{ width: 18, height: 18, color: 'var(--hf-accent)' }} />
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>Focused on meaningful outcomes</span>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="glass-card" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, background: 'oklch(0.72 0.12 160)', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.1 }} />
                <div style={{ position: 'relative' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'oklch(0.72 0.12 160 / 0.8)', display: 'block', marginBottom: 16 }}>Our Vision</span>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 14 }}>A World of Clarity</h3>
                  <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, fontWeight: 300 }}>
                    We envision a future where mental wellness is prioritized, accessible, and free of stigma, where every person has the tools to master their inner world.
                  </p>
                  <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Eye style={{ width: 18, height: 18, color: 'oklch(0.72 0.12 160)' }} />
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>Seeing beyond the horizon</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Values */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {[
                { icon: Shield, title: 'Radical Trust', desc: 'Every therapist undergoes a rigorous verification process to ensure the highest standards of ethics.' },
                { icon: Heart, title: 'Empathy First', desc: 'We approach mental health with deep sensitivity, fostering a community that is supportive and non-judgmental.' },
                { icon: Accessibility, title: 'Inclusive Care', desc: 'We are committed to making therapeutic resources accessible across different cultures and backgrounds.' },
              ].map((v) => (
                <div key={v.title} className="glass-card hf-card-hover" style={{ padding: '32px' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'oklch(0.72 0.12 185 / 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <v.icon style={{ width: 24, height: 24, color: 'var(--hf-accent)' }} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.65, fontWeight: 300 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section style={{ padding: '0 24px 72px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', paddingTop: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
              <div style={{ padding: 12, background: 'oklch(0.72 0.12 185 / 0.12)', borderRadius: 14 }}>
                <History style={{ width: 28, height: 28, color: 'var(--hf-accent)' }} />
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)' }}>The Rich History of Hypnotherapy</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {timelineItems.map((era, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '28px 32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)' }}>{era.title}</h3>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--hf-accent)', background: 'oklch(0.72 0.12 185 / 0.1)', padding: '3px 10px', borderRadius: 9999 }}>{era.time}</span>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.7, fontWeight: 300 }}>{era.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder */}
        <section style={{ padding: '0 24px 72px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', paddingTop: 64 }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--hf-accent)', display: 'block', marginBottom: 12 }}>The Visionaries</span>
              <h2 style={{ fontSize: 32, fontWeight: 700, color: 'var(--hf-fg)' }}>People Behind the Platform</h2>
            </div>
            <div className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
              <div style={{ flexShrink: 0, position: 'relative' }}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'oklch(0.14 0.01 260)', border: '3px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg-dim)' }}>TS</span>
                </div>
                <div style={{ position: 'absolute', bottom: -4, right: -4, background: 'var(--hf-accent)', borderRadius: '50%', padding: 6 }}>
                  <CheckCircle style={{ width: 14, height: 14, color: '#fff' }} />
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 4 }}>Travis Steel</h3>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-accent)', marginBottom: 16 }}>Founder & Creator of Hypnotherapy Finder</p>
                <p style={{ fontSize: 15, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 24, maxWidth: 480, fontWeight: 300 }}>
                  Travis is passionate about connecting people with effective therapeutic solutions. With a background in modern hypnosis, he understands the transformative power of professional hypnotherapy.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                  <div className="glass" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 12 }}>
                    <Award style={{ width: 18, height: 18, color: 'var(--hf-accent)', flexShrink: 0 }} />
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--hf-fg)' }}>Certified Modern Hypnosis</p>
                      <p style={{ fontSize: 11, color: 'var(--hf-fg-dim)' }}>Institute of Applied Psychology AU</p>
                    </div>
                  </div>
                  <a href="https://www.linkedin.com/in/travis-steel-94596143/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#0077b5', color: '#fff', borderRadius: 12, fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
                    <Linkedin style={{ width: 16, height: 16 }} />
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research */}
        <section style={{ padding: '0 24px 72px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ maxWidth: 1020, margin: '0 auto', paddingTop: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48, justifyContent: 'center' }}>
              <div style={{ padding: 12, background: 'oklch(0.72 0.12 185 / 0.12)', borderRadius: 14 }}>
                <BookOpen style={{ width: 28, height: 28, color: 'var(--hf-accent)' }} />
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--hf-fg)' }}>Scientific Research & Evidence</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 24 }}>
              {researchItems.map((item) => (
                <div key={item.title} className="glass-card hf-card-hover" style={{ padding: '32px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `oklch(0.72 0.18 ${item.hue} / 0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: `oklch(0.72 0.18 ${item.hue})` }} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.65, fontWeight: 300 }}>{item.content}</p>
                </div>
              ))}
            </div>
            <div className="glass-card" style={{ padding: '24px 28px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <Shield style={{ width: 24, height: 24, color: 'var(--hf-accent)', flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.65, fontWeight: 300 }}>
                <strong style={{ color: 'var(--hf-accent)', fontWeight: 600 }}>Note:</strong> While research supports hypnotherapy's effectiveness, individual results vary. Hypnotherapy works best as part of a comprehensive treatment approach. Always consult healthcare providers for medical conditions.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '0 24px 80px' }}>
          <div className="glass-card" style={{ maxWidth: 900, margin: '0 auto', padding: '64px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, background: 'oklch(0.72 0.12 185)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.08 }} />
            <div style={{ position: 'absolute', bottom: -80, right: -80, width: 300, height: 300, background: 'oklch(0.72 0.12 285)', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.07 }} />
            <div style={{ position: 'relative' }}>
              <h2 className="font-serif-display" style={{ fontSize: 36, color: 'var(--hf-fg)', marginBottom: 16 }}>Your wellness journey starts here.</h2>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.65, fontWeight: 300 }}>
                Take the first step toward a more balanced life. Join thousands who have found clarity through our directory of world-class hypnotherapists.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/search" className="btn-gradient hf-btn-accent" style={{ display: 'inline-block', padding: '14px 36px', borderRadius: 9999, color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                  Find a Therapist Now
                </Link>
                <Link href="/contact" className="glass hf-glass-hover" style={{ display: 'inline-block', padding: '14px 36px', borderRadius: 9999, color: 'var(--hf-fg)', fontWeight: 500, fontSize: 15, textDecoration: 'none' }}>
                  Contact Support
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
