'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Practitioner } from '@/lib/types/practitioner';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Loader2 } from 'lucide-react';

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

const selectStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '2px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '12px 16px',
  color: 'var(--hf-fg)',
  fontSize: 15,
  outline: 'none',
};

const cardStyle: React.CSSProperties = {
  background: 'var(--hf-bg-mid)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 20,
  padding: '32px',
  width: '100%',
  maxWidth: 520,
};

function ClaimListingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState<'search' | 'select' | 'verify'>('search');
  const [searchType, setSearchType] = useState<'email' | 'phone' | 'name'>('email');
  const [searchValue, setSearchValue] = useState('');
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState<Practitioner | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const practitionerId = searchParams.get('practitioner');
    if (practitionerId) {
      fetchPractitionerById(practitionerId);
    } else {
      setInitialLoading(false);
    }
  }, [searchParams]);

  const fetchPractitionerById = async (id: string) => {
    setInitialLoading(true);
    try {
      const response = await fetch(`/api/practitioners/${id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch practitioner');
      if (data.practitioner) {
        if (data.practitioner.claim_status !== 'unclaimed') {
          setError(`This listing is already ${data.practitioner.claim_status}. You cannot claim it.`);
          setInitialLoading(false);
          return;
        }
        setSelectedPractitioner(data.practitioner);
        setStep('verify');
      } else {
        setError('Practitioner not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load practitioner');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.set(searchType, searchValue);
      params.set('forClaim', 'true');
      const response = await fetch(`/api/practitioners/search?${params}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to search');
      if (data.practitioners.length === 0) {
        setError('No unclaimed listings found matching your search. Try a different search term.');
        setPractitioners([]);
      } else {
        setPractitioners(data.practitioners);
        setStep('select');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to search for listings');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPractitioner = (practitioner: Practitioner) => {
    setSelectedPractitioner(practitioner);
    setStep('verify');
  };

  const handleSubmitClaim = async () => {
    if (!selectedPractitioner) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          practitioner_id: selectedPractitioner.id,
          claim_method: 'email',
          verification_email: user?.email,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit claim');
      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit claim');
    } finally {
      setLoading(false);
    }
  };

  const centerLayout = { minHeight: '100vh', display: 'flex', flexDirection: 'column' as const };
  const mainCenter: React.CSSProperties = { flex: 1, paddingTop: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 16px 48px' };

  if (initialLoading) {
    return (
      <div style={centerLayout}>
        <Header />
        <main style={mainCenter}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '16px 0' }}>
              <Loader2 style={{ width: 32, height: 32, color: 'var(--hf-accent)', animation: 'spin 1s linear infinite' }} />
              <p style={{ color: 'var(--hf-fg-dim)', fontSize: 15 }}>Loading listing details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!authLoading && !user) {
    return (
      <div style={centerLayout}>
        <Header />
        <main style={mainCenter}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 8 }}>Login Required</h2>
            <p style={{ color: 'var(--hf-fg-dim)', marginBottom: 20, fontSize: 14 }}>
              You need to be logged in to claim a listing. Please log in or create an account.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href={`/login?redirect=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '/claim-listing')}`}
                className="btn-gradient hf-btn-accent"
                style={{ flex: 1, padding: '11px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none', textAlign: 'center' }}
              >
                Log In
              </a>
              <a href="/practitioner-signup" style={{ flex: 1, padding: '11px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.12)', color: 'var(--hf-fg)', fontWeight: 600, fontSize: 14, textDecoration: 'none', textAlign: 'center' }}>
                Sign Up
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div style={centerLayout}>
        <Header />
        <main style={mainCenter}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'oklch(0.7 0.15 145)', marginBottom: 10 }}>Claim Submitted Successfully!</h2>
            <p style={{ color: 'var(--hf-fg-dim)', marginBottom: 12, lineHeight: 1.6 }}>
              Your claim has been submitted for review. We'll notify you once it's been approved.
            </p>
            <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', opacity: 0.7 }}>Redirecting to your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 8 };
  const btnOutline: React.CSSProperties = { width: '100%', padding: '12px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.12)', background: 'none', color: 'var(--hf-fg)', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginTop: 12 };
  const errorBox: React.CSSProperties = { background: 'oklch(0.25 0.1 20 / 0.3)', border: '1px solid oklch(0.5 0.2 20 / 0.4)', borderRadius: 10, padding: '12px 16px', marginBottom: 16 };

  return (
    <div style={centerLayout}>
      <Header />
      <main style={{ flex: 1, paddingTop: 80, padding: '80px 16px 48px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 12 }}>Claim Your Listing</h1>
            <p style={{ color: 'var(--hf-fg-dim)', fontSize: 15, lineHeight: 1.6 }}>
              Find and claim your hypnotherapy practice listing to manage your profile
            </p>
          </div>

          {/* Search Step */}
          {step === 'search' && (
            <div style={cardStyle}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 6 }}>Find Your Listing</h2>
              <p style={{ color: 'var(--hf-fg-dim)', fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
                Search for your practice using your email, phone number, or business name
              </p>
              <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label htmlFor="searchType" style={labelStyle}>Search By</label>
                  <select id="searchType" value={searchType} onChange={(e) => setSearchType(e.target.value as any)} style={selectStyle}>
                    <option value="email">Email Address</option>
                    <option value="phone">Phone Number</option>
                    <option value="name">Business Name</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="searchValue" style={labelStyle}>
                    {searchType === 'email' ? 'Email Address' : searchType === 'phone' ? 'Phone Number' : 'Business Name'}
                  </label>
                  <input
                    id="searchValue"
                    type={searchType === 'email' ? 'email' : 'text'}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={searchType === 'email' ? 'you@example.com' : searchType === 'phone' ? '(555) 123-4567' : 'Your Business Name'}
                    required
                    style={inputStyle}
                  />
                </div>
                {error && <div style={errorBox}><p style={{ fontSize: 13, color: 'oklch(0.8 0.1 20)' }}>{error}</p></div>}
                <button type="submit" disabled={loading} className={!loading ? 'btn-gradient hf-btn-accent' : ''} style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', color: '#fff', fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', background: loading ? 'rgba(255,255,255,0.08)' : undefined, opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Searching...' : 'Search for My Listing'}
                </button>
              </form>
            </div>
          )}

          {/* Select Step */}
          {step === 'select' && (
            <div style={cardStyle}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 6 }}>Select Your Listing</h2>
              <p style={{ color: 'var(--hf-fg-dim)', fontSize: 13, marginBottom: 24 }}>
                Found {practitioners.length} listing{practitioners.length !== 1 ? 's' : ''}. Select yours to continue.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {practitioners.map((practitioner) => (
                  <div
                    key={practitioner.id}
                    onClick={() => handleSelectPractitioner(practitioner)}
                    style={{ padding: 16, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, cursor: 'pointer', transition: 'all 0.15s', background: 'rgba(255,255,255,0.02)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--hf-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  >
                    <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)' }}>{practitioner.name}</p>
                    {practitioner.credentials && practitioner.credentials.length > 0 && (
                      <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>{practitioner.credentials.join(', ')}</p>
                    )}
                    <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>{practitioner.city}, {practitioner.state}</p>
                    {practitioner.email && <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', opacity: 0.7 }}>{practitioner.email}</p>}
                    {practitioner.phone && <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', opacity: 0.7 }}>{practitioner.phone}</p>}
                  </div>
                ))}
              </div>
              <button onClick={() => { setStep('search'); setPractitioners([]); }} style={btnOutline}>
                Back to Search
              </button>
            </div>
          )}

          {/* Verify Step */}
          {step === 'verify' && selectedPractitioner && (
            <div style={cardStyle}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 6 }}>Verify and Claim</h2>
              <p style={{ color: 'var(--hf-fg-dim)', fontSize: 13, marginBottom: 24 }}>Review the listing details and submit your claim</p>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <p style={{ fontWeight: 700, fontSize: 17, color: 'var(--hf-fg)', marginBottom: 8 }}>{selectedPractitioner.name}</p>
                {selectedPractitioner.credentials && selectedPractitioner.credentials.length > 0 && (
                  <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', marginBottom: 4 }}>{selectedPractitioner.credentials.join(', ')}</p>
                )}
                <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', marginBottom: 2 }}>{selectedPractitioner.address || ''}</p>
                <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', marginBottom: 2 }}>
                  {selectedPractitioner.city}, {selectedPractitioner.state} {selectedPractitioner.zip}
                </p>
                {selectedPractitioner.email && <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>{selectedPractitioner.email}</p>}
                {selectedPractitioner.phone && <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>{selectedPractitioner.phone}</p>}
              </div>

              <div style={{ background: 'oklch(0.72 0.12 185 / 0.08)', border: '1px solid oklch(0.72 0.12 185 / 0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>
                  By claiming this listing, you confirm that you are authorized to manage this practice. Your claim will be reviewed by our team.
                </p>
              </div>

              {error && <div style={errorBox}><p style={{ fontSize: 13, color: 'oklch(0.8 0.1 20)' }}>{error}</p></div>}

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => {
                    if (practitioners.length === 0) { setStep('search'); setSelectedPractitioner(null); }
                    else { setStep('select'); setSelectedPractitioner(null); }
                  }}
                  style={{ flex: 1, padding: '12px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.12)', background: 'none', color: 'var(--hf-fg)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitClaim}
                  disabled={loading || !user}
                  className={!loading && !!user ? 'btn-gradient hf-btn-accent' : ''}
                  style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', color: '#fff', fontWeight: 700, fontSize: 14, cursor: (loading || !user) ? 'not-allowed' : 'pointer', background: (loading || !user) ? 'rgba(255,255,255,0.08)' : undefined, opacity: (loading || !user) ? 0.6 : 1 }}
                >
                  {loading ? 'Submitting...' : 'Submit Claim'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ClaimListingPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--hf-bg)' }}>
        <Loader2 style={{ width: 32, height: 32, color: 'var(--hf-accent)', animation: 'spin 1s linear infinite' }} />
      </div>
    }>
      <ClaimListingContent />
    </Suspense>
  );
}
