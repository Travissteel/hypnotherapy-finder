'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import { CheckCircle, Star, Users, TrendingUp, Shield, AlertCircle } from 'lucide-react';

function PractitionerSignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signUp } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '',
    businessName: '', street: '', city: '', state: '', zipCode: '', website: '',
    certifications: '', specialties: [] as string[], yearsExperience: '', bio: '',
    acceptsInsurance: false, offersOnline: false,
  });

  useEffect(() => {
    const confirmed = searchParams.get('confirmed');
    const stepParam = searchParams.get('step');
    if (confirmed === 'true' && stepParam === 'complete') {
      setIsEmailConfirmed(true);
      const savedData = localStorage.getItem('pendingSignupData');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setFormData(parsed);
          createPractitionerProfileAfterConfirmation(parsed);
        } catch (err) {
          setError('Failed to load your signup data. Please sign up again.');
        }
      }
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError('');
  };

  const createPractitionerProfileAfterConfirmation = async (data: typeof formData) => {
    setLoading(true);
    try {
      const fullName = `${data.firstName} ${data.lastName}`.trim();
      const response = await fetch('/api/practitioners', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, credentials: data.certifications, email: data.email, phone: data.phone, street: data.street, city: data.city, state: data.state, zipCode: data.zipCode, website: data.website, bio: data.bio, specialties: data.specialties, yearsExperience: data.yearsExperience, acceptsInsurance: data.acceptsInsurance, offersOnline: data.offersOnline }),
      });
      if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.error || 'Failed to create profile'); }
      localStorage.removeItem('pendingSignupData');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create practitioner profile');
    } finally {
      setLoading(false);
    }
  };

  const createPractitionerProfile = async (fullName: string, data: typeof formData) => {
    const response = await fetch('/api/practitioners', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: fullName, credentials: data.certifications, email: data.email, phone: data.phone, street: data.street, city: data.city, state: data.state, zipCode: data.zipCode, website: data.website, bio: data.bio, specialties: data.specialties, yearsExperience: data.yearsExperience, acceptsInsurance: data.acceptsInsurance, offersOnline: data.offersOnline }),
    });
    const responseData = await response.json();
    if (!response.ok) throw new Error(responseData.error || 'Failed to create profile');
    return responseData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      localStorage.setItem('pendingSignupData', JSON.stringify(formData));
      const { error } = await signUp(formData.email, formData.password, fullName);
      if (error) {
        setError(error.message || 'Failed to create account');
        setLoading(false);
      } else {
        const { createBrowserClient } = await import('@/lib/supabase/client');
        const supabase = createBrowserClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await createPractitionerProfile(fullName, formData);
          localStorage.removeItem('pendingSignupData');
          await new Promise(resolve => setTimeout(resolve, 500));
          router.push('/dashboard');
        } else {
          setStep(4);
          setLoading(false);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
      setLoading(false);
    }
  };

  const specialtyOptions = ['Anxiety & Stress', 'Weight Loss', 'Smoking Cessation', 'Phobias', 'Insomnia', 'Pain Management', 'PTSD & Trauma', 'Confidence & Performance', 'Past Life Regression', 'General Hypnotherapy'];
  const toggleSpecialty = (specialty: string) => {
    setFormData({ ...formData, specialties: formData.specialties.includes(specialty) ? formData.specialties.filter(s => s !== specialty) : [...formData.specialties, specialty] });
  };

  const inputStyle = { width: '100%', height: 44, padding: '0 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: 'var(--hf-fg)', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 6 };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, paddingTop: 80 }}>
        {/* Hero */}
        <section style={{ background: 'var(--hf-bg-mid)', padding: '56px 24px 48px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-5%', width: 300, height: 300, background: 'var(--hf-accent)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.07 }} />
          <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
            <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--hf-accent)', marginBottom: 16 }}>For Practitioners</span>
            <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 14 }}>Join Our Directory</h1>
            <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)', marginBottom: 24, lineHeight: 1.6 }}>Connect with clients actively seeking hypnotherapy services in your area</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
              {['100% Free During Pre-Launch', 'Easy Profile Setup', 'Get Found by Local Clients'].map((item) => (
                <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--hf-fg-dim)' }}>
                  <CheckCircle style={{ width: 15, height: 15, color: 'var(--hf-accent)' }} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section style={{ padding: '48px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 28 }}>Why List with Us?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {[
                { icon: Users, title: 'Reach More Clients', desc: 'Get discovered by people actively searching for hypnotherapy' },
                { icon: Star, title: 'Build Your Reputation', desc: 'Showcase your credentials and expertise' },
                { icon: TrendingUp, title: 'Grow Your Practice', desc: 'Connect with clients in your specialty areas' },
                { icon: Shield, title: '100% Free (Launch Special)', desc: 'Join during our pre-launch period' },
              ].map((item) => (
                <div key={item.title} className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
                  <item.icon style={{ width: 28, height: 28, color: 'var(--hf-accent)', margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', lineHeight: 1.5, fontWeight: 300 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section style={{ padding: '48px 24px 80px' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            {step === 4 ? (
              <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, background: 'oklch(0.6 0.15 145 / 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle style={{ width: 32, height: 32, color: 'oklch(0.7 0.15 145)' }} />
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 12 }}>Check Your Email!</h2>
                <p style={{ fontSize: 14, color: 'var(--hf-fg-dim)', lineHeight: 1.65, marginBottom: 24 }}>
                  We've sent a confirmation link to <strong style={{ color: 'var(--hf-fg)' }}>{formData.email}</strong>. Please check your email and click the link to verify your account.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div className="glass" style={{ padding: '16px 20px', borderRadius: 12, textAlign: 'left' }}>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 10 }}>What happens next?</h3>
                    {['Click the confirmation link in your email', "You'll be redirected back to complete your profile", 'Your profile will be live and searchable'].map((item) => (
                      <div key={item} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--hf-fg-dim)', marginBottom: 6, alignItems: 'flex-start' }}>
                        <CheckCircle style={{ width: 13, height: 13, color: 'var(--hf-accent)', flexShrink: 0, marginTop: 1 }} />
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link href="/" className="btn-gradient" style={{ display: 'block', padding: '12px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none', textAlign: 'center' }}>
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: '36px' }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 6 }}>Create Your Profile</h2>
                <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', marginBottom: 20 }}>Step {step} of 3</p>
                {/* Progress Bar */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
                  {[1, 2, 3].map((s) => (
                    <div key={s} style={{ flex: 1, height: 3, borderRadius: 9999, background: s <= step ? 'var(--hf-accent)' : 'rgba(255,255,255,0.1)' }} />
                  ))}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Step 1 */}
                  {step === 1 && (
                    <>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 4 }}>Personal Information</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div><label style={labelStyle}>First Name *</label><input name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="John" style={inputStyle} /></div>
                        <div><label style={labelStyle}>Last Name *</label><input name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Doe" style={inputStyle} /></div>
                      </div>
                      <div><label style={labelStyle}>Email Address *</label><input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Phone Number *</label><input name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Password *</label><input name="password" type="password" required value={formData.password} onChange={handleChange} placeholder="Create a secure password" style={inputStyle} /></div>
                      <button type="button" onClick={() => setStep(2)} className="btn-gradient hf-btn-accent" style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginTop: 8 }}>
                        Continue
                      </button>
                    </>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 4 }}>Business Information</h3>
                      <div><label style={labelStyle}>Business Name</label><input name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Your practice name (or leave blank)" style={inputStyle} /></div>
                      <div><label style={labelStyle}>Street Address *</label><input name="street" required value={formData.street} onChange={handleChange} placeholder="123 Main St, Suite 100" style={inputStyle} /></div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div><label style={labelStyle}>City *</label><input name="city" required value={formData.city} onChange={handleChange} placeholder="Austin" style={inputStyle} /></div>
                        <div><label style={labelStyle}>State *</label><input name="state" required value={formData.state} onChange={handleChange} placeholder="TX" style={inputStyle} /></div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div><label style={labelStyle}>Zip Code *</label><input name="zipCode" required value={formData.zipCode} onChange={handleChange} placeholder="78701" style={inputStyle} /></div>
                        <div><label style={labelStyle}>Website</label><input name="website" type="url" value={formData.website} onChange={handleChange} placeholder="https://yourwebsite.com" style={inputStyle} /></div>
                      </div>
                      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                        <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'none', color: 'var(--hf-fg-dim)', fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>Back</button>
                        <button type="button" onClick={() => setStep(3)} className="btn-gradient hf-btn-accent" style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Continue</button>
                      </div>
                    </>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 4 }}>Professional Details</h3>
                      {error && (
                        <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <AlertCircle style={{ width: 15, height: 15, color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
                          <p style={{ fontSize: 12, color: '#fca5a5' }}>{error}</p>
                        </div>
                      )}
                      <div><label style={labelStyle}>Certifications *</label><input name="certifications" required value={formData.certifications} onChange={handleChange} placeholder="e.g., CHt, NGH Certified" style={inputStyle} /></div>
                      <div>
                        <label style={labelStyle}>Specialties * (select all that apply)</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {specialtyOptions.map((specialty) => (
                            <button key={specialty} type="button" onClick={() => toggleSpecialty(specialty)}
                              style={{ padding: '5px 12px', borderRadius: 9999, border: `1px solid ${formData.specialties.includes(specialty) ? 'var(--hf-accent)' : 'rgba(255,255,255,0.12)'}`, background: formData.specialties.includes(specialty) ? 'oklch(0.72 0.12 185 / 0.15)' : 'transparent', color: formData.specialties.includes(specialty) ? 'var(--hf-accent)' : 'var(--hf-fg-dim)', fontSize: 12, cursor: 'pointer', transition: 'all 0.15s' }}>
                              {specialty}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div><label style={labelStyle}>Years of Experience</label><input name="yearsExperience" type="number" value={formData.yearsExperience} onChange={handleChange} placeholder="5" style={inputStyle} /></div>
                      <div>
                        <label style={labelStyle}>About You / Bio</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} placeholder="Tell potential clients about your approach and experience..." style={{ ...inputStyle, height: 'auto', padding: '12px 14px', resize: 'vertical' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                          { name: 'acceptsInsurance', checked: formData.acceptsInsurance, label: 'I accept insurance' },
                          { name: 'offersOnline', checked: formData.offersOnline, label: 'I offer online/virtual sessions' },
                        ].map((item) => (
                          <label key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                            <input type="checkbox" name={item.name} checked={item.checked} onChange={handleChange} style={{ accentColor: 'var(--hf-accent)', width: 15, height: 15 }} />
                            <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>{item.label}</span>
                          </label>
                        ))}
                      </div>
                      <div className="glass" style={{ padding: '14px 16px', borderRadius: 10, fontSize: 12 }}>
                        <p style={{ fontWeight: 600, color: 'var(--hf-fg)', marginBottom: 4 }}>Launch Special – Free Access</p>
                        <p style={{ color: 'var(--hf-fg-dim)', lineHeight: 1.55, fontWeight: 300 }}>Join and get free access for 6 months as a founding practitioner. All features are completely free during this pre-launch period.</p>
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button type="button" onClick={() => setStep(2)} disabled={loading} style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'none', color: 'var(--hf-fg-dim)', fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>Back</button>
                        <button type="submit" disabled={loading} className="btn-gradient hf-btn-accent" style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
                          {loading ? 'Creating Account…' : 'Complete Registration'}
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            )}

            {step !== 4 && (
              <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--hf-fg-dim)', marginTop: 20 }}>
                Already have an account?{' '}
                <Link href="/login" style={{ color: 'var(--hf-accent)', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function PractitionerSignupPage() {
  return (
    <Suspense fallback={
      // Rendered into the initial HTML while useSearchParams suspends — must
      // carry the H1, copy, and site chrome so crawlers see a real page.
      <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: 80 }}>
          <section style={{ background: 'var(--hf-bg-mid)', padding: '56px 24px 48px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ maxWidth: 1020, margin: '0 auto', textAlign: 'center' }}>
              <h1 className="font-serif-display" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--hf-fg)', lineHeight: 1.15, marginBottom: 14 }}>Join Our Directory</h1>
              <p style={{ fontSize: 16, color: 'var(--hf-fg-dim)' }}>List your hypnotherapy practice, reach more clients, and grow with Hypnotherapy Finder.</p>
            </div>
          </section>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 24px', color: 'var(--hf-fg-dim)' }}>Loading…</div>
        </main>
        <Footer />
      </div>
    }>
      <PractitionerSignupForm />
    </Suspense>
  );
}
