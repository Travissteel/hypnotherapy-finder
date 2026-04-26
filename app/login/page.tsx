'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '2px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '12px 16px',
  color: 'var(--hf-fg)',
  fontSize: 15,
  outline: 'none',
  boxSizing: 'border-box',
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, user } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const redirect = searchParams.get('redirect') || '/dashboard';
      router.push(redirect);
    }
  }, [user, router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        setError(error.message || 'Invalid email or password');
        setLoading(false);
      } else {
        const redirect = searchParams.get('redirect') || '/dashboard';
        router.push(redirect);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, paddingTop: 80, padding: '80px 16px 48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)', textAlign: 'center', marginBottom: 32 }}>Sign In</h1>

          <div className="glass-card" style={{ padding: 32 }}>
            <div style={{ marginBottom: 24, textAlign: 'center' }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 8 }}>Practitioner Sign In</h2>
              <p style={{ color: 'var(--hf-fg-dim)', fontSize: 14 }}>Manage your profile and connect with clients</p>
            </div>

            {error && (
              <div style={{ marginBottom: 20, padding: 14, background: 'oklch(0.25 0.1 20 / 0.3)', border: '1px solid oklch(0.5 0.2 20 / 0.4)', borderRadius: 10, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <AlertCircle style={{ width: 18, height: 18, color: 'oklch(0.7 0.15 20)', flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 13, color: 'oklch(0.8 0.1 20)', lineHeight: 1.5 }}>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 8 }}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="password" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 8 }}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" style={{ accentColor: 'var(--hf-accent)' }} />
                  <span style={{ color: 'var(--hf-fg-dim)' }}>Remember me</span>
                </label>
                <a href="#" style={{ color: 'var(--hf-accent)', textDecoration: 'underline' }}>
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={!loading ? 'btn-gradient hf-btn-accent' : ''}
                style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', color: '#fff', fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', background: loading ? 'rgba(255,255,255,0.08)' : undefined, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
              <p style={{ color: 'var(--hf-fg-dim)', marginBottom: 16, fontSize: 14 }}>Don't have an account?</p>
              <Link
                href="/practitioner-signup"
                style={{ display: 'block', width: '100%', padding: '12px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.12)', color: 'var(--hf-fg)', fontWeight: 600, fontSize: 14, textDecoration: 'none', textAlign: 'center' }}
              >
                Create Free Profile
              </Link>
            </div>

            <div style={{ marginTop: 20, background: 'oklch(0.72 0.12 185 / 0.08)', border: '1px solid oklch(0.72 0.12 185 / 0.2)', borderRadius: 10, padding: 16 }}>
              <p style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 6, fontSize: 14 }}>Pre-Launch Special — 100% Free!</p>
              <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>
                Join our founding practitioner community and get free access for 6 months before our official launch. All features free during this pre-launch period.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: 'var(--hf-fg-dim)' }}>
            <p style={{ marginBottom: 8 }}>Need help getting started?</p>
            <Link href="/contact" style={{ color: 'var(--hf-accent)', textDecoration: 'underline' }}>
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card" style={{ padding: 32, textAlign: 'center' }}>
            <p style={{ color: 'var(--hf-fg-dim)', fontSize: 16 }}>Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
