'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Mail, MessageSquare, HelpCircle, AlertCircle, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle = { width: '100%', height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'var(--hf-fg)', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 6 };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ background: 'var(--hf-bg-mid)', padding: '56px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>Get in Touch</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 12 }}>Contact Us</h1>
            <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>Have questions or need assistance? We're here to help.</p>
          </div>
        </section>

        <section style={{ padding: '56px 24px 80px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
              {/* Contact Form */}
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 24 }}>Send Us a Message</h2>

                {submitted ? (
                  <div className="glass-card" style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'oklch(0.6 0.15 145 / 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle style={{ width: 20, height: 20, color: 'oklch(0.7 0.15 145)' }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>Message Sent Successfully!</h3>
                        <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.6, marginBottom: 16 }}>
                          Thank you for contacting us. We'll get back to you within 1–2 business days.
                        </p>
                        <button onClick={() => setSubmitted(false)} className="glass hf-glass-hover" style={{ padding: '8px 16px', borderRadius: 8, border: 'none', color: 'var(--hf-fg)', fontSize: 13, cursor: 'pointer' }}>
                          Send Another Message
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label htmlFor="name" style={labelStyle}>Your Name *</label>
                      <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Doe" style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="email" style={labelStyle}>Email Address *</label>
                      <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="subject" style={labelStyle}>Subject *</label>
                      <select id="subject" name="subject" required value={formData.subject} onChange={handleChange} style={{ ...inputStyle, appearance: 'none' }}>
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="practitioner">I'm a Practitioner</option>
                        <option value="listing">Update Listing Information</option>
                        <option value="technical">Technical Issue</option>
                        <option value="feedback">Feedback or Suggestion</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" style={labelStyle}>Message *</label>
                      <textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={6} placeholder="Tell us how we can help..." style={{ ...inputStyle, height: 'auto', padding: '12px 14px', resize: 'vertical' }} />
                    </div>
                    <button type="submit" className="btn-gradient hf-btn-accent" style={{ height: 48, borderRadius: 10, border: 'none', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                      Send Message
                    </button>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>* Required fields. We typically respond within 1–2 business days.</p>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: Mail, title: 'Email Support', desc: 'For general inquiries and support', link: 'support@hypnotherapy-finder.com', href: 'mailto:support@hypnotherapy-finder.com' },
                  { icon: MessageSquare, title: 'For Practitioners', desc: 'Want to claim your profile or update your information?', link: 'practitioners@hypnotherapy-finder.com', href: 'mailto:practitioners@hypnotherapy-finder.com' },
                ].map((item) => (
                  <div key={item.title} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'oklch(0.72 0.12 185 / 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon style={{ width: 18, height: 18, color: 'var(--hf-accent)' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 4 }}>{item.title}</h3>
                      <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', marginBottom: 8, lineHeight: 1.5 }}>{item.desc}</p>
                      <a href={item.href} style={{ fontSize: 13, color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 500 }}>{item.link}</a>
                    </div>
                  </div>
                ))}

                <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'oklch(0.72 0.12 185 / 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <HelpCircle style={{ width: 18, height: 18, color: 'var(--hf-accent)' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 4 }}>Looking for answers?</h3>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', marginBottom: 12, lineHeight: 1.5 }}>Check our FAQ page for quick answers to common questions about hypnotherapy.</p>
                    <a href="/faq" className="glass hf-glass-hover" style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500, color: 'var(--hf-fg)', textDecoration: 'none' }}>View FAQ</a>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'oklch(0.72 0.12 185 / 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <AlertCircle style={{ width: 18, height: 18, color: 'var(--hf-accent)' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 4 }}>Report an Issue</h3>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.5 }}>Found incorrect information in a listing? Notice a technical problem? Let us know and we'll fix it promptly.</p>
                  </div>
                </div>

                <div className="glass" style={{ padding: '16px 20px', borderRadius: 12, borderLeft: '3px solid var(--hf-accent)' }}>
                  <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--hf-fg)' }}>Our Commitment:</strong> We strive to respond to all inquiries within 1–2 business days. For urgent matters regarding incorrect listing information, we typically respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Help Links */}
        <section style={{ padding: '0 24px 72px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', paddingTop: 48 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 24 }}>Other Ways to Get Help</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
              {[
                { href: '/faq', icon: HelpCircle, title: 'FAQ', desc: 'Browse frequently asked questions' },
                { href: '/how-it-works', icon: MessageSquare, title: 'How It Works', desc: 'Learn about the hypnotherapy process' },
                { href: '/search', icon: Mail, title: 'Find a Practitioner', desc: 'Search our directory' },
              ].map((link) => (
                <a key={link.href} href={link.href} className="glass-card hf-card-hover" style={{ display: 'block', padding: '20px', textAlign: 'center', textDecoration: 'none' }}>
                  <link.icon style={{ width: 22, height: 22, color: 'var(--hf-accent)', margin: '0 auto 10px' }} />
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 4 }}>{link.title}</h3>
                  <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.4 }}>{link.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
