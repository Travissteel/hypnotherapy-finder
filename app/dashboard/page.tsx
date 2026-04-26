'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { Eye, Edit, Save, CheckCircle, TrendingUp, Users, Star, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';

const inputStyle = (enabled: boolean): React.CSSProperties => ({
  width: '100%',
  background: enabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
  border: `2px solid ${enabled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
  borderRadius: 10,
  padding: '11px 14px',
  color: enabled ? 'var(--hf-fg)' : 'var(--hf-fg-dim)',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box' as const,
});

const cardStyle: React.CSSProperties = {
  background: 'var(--hf-bg-mid)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  padding: 24,
};

const ALL_SPECIALTIES = [
  'Anxiety & Stress', 'Weight Loss', 'Smoking Cessation', 'Phobias', 'Insomnia',
  'Pain Management', 'PTSD & Trauma', 'Confidence & Performance', 'Past Life Regression', 'General Hypnotherapy',
];

export default function DashboardPage() {
  const { user, session, loading: authLoading, signOut } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [practitionerId, setPractitionerId] = useState<string | null>(null);
  const [practitionerSlug, setPractitionerSlug] = useState<string | null>(null);
  const [noPractitionerRecord, setNoPractitionerRecord] = useState(false);
  const [verified, setVerified] = useState(false);
  const [actualSlug, setActualSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '', credentials: '', email: '', phone: '',
    street: '', city: '', state: '', zipCode: '', website: '',
    specialties: [] as string[], yearsExperience: '', bio: '',
    acceptsInsurance: false, offersOnline: false,
    profileViews: 0, inquiries: 0,
  });

  useEffect(() => {
    if (authLoading) return;
    if (!user || !session) {
      setLoading(false);
      setError('Please log in to access your dashboard');
      return;
    }
    fetchPractitionerData();
  }, [user, session, authLoading]);

  const fetchPractitionerData = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createBrowserClient();
      const { data, error: fetchError } = await supabase
        .from('practitioners')
        .select('*')
        .eq('claimed_by', user!.id)
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          setNoPractitionerRecord(true);
          setError('No practitioner profile found. Please claim a listing first.');
        } else {
          throw fetchError;
        }
        setLoading(false);
        return;
      }

      if (!data) {
        setNoPractitionerRecord(true);
        setError('No practitioner profile found. Please claim a listing first.');
        setLoading(false);
        return;
      }

      setPractitionerId(data.id);
      setPractitionerSlug(data.id);
      setActualSlug(data.slug || null);
      setVerified(data.verified === true && data.claim_status === 'claimed');

      setProfileData({
        name: data.name || '',
        credentials: Array.isArray(data.credentials) ? data.credentials.join(', ') : data.credentials || '',
        email: data.email || '',
        phone: data.phone || '',
        street: data.address || '',
        city: data.city || '',
        state: data.state || '',
        zipCode: data.zip || '',
        website: data.website || '',
        specialties: Array.isArray(data.specialties) ? data.specialties : [],
        yearsExperience: data.years_experience?.toString() || '',
        bio: data.bio || '',
        acceptsInsurance: Array.isArray(data.insurance_accepted) && data.insurance_accepted.length > 0,
        offersOnline: Array.isArray(data.session_types) && data.session_types.includes('online'),
        profileViews: 0,
        inquiries: 0,
      });

      setNoPractitionerRecord(false);
    } catch (err: any) {
      console.error('Error fetching practitioner data:', err);
      setError(err.message || 'Failed to load practitioner data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!practitionerId) { setError('No practitioner ID found'); return; }
    try {
      setSaving(true);
      setError(null);
      const updateData = {
        name: profileData.name,
        credentials: profileData.credentials.split(',').map(c => c.trim()).filter(Boolean),
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.street,
        city: profileData.city,
        state: profileData.state,
        zip: profileData.zipCode,
        website: profileData.website,
        specialties: profileData.specialties,
        years_experience: profileData.yearsExperience ? parseInt(profileData.yearsExperience) : undefined,
        bio: profileData.bio,
        insurance_accepted: profileData.acceptsInsurance ? ['Yes'] : [],
        session_types: profileData.offersOnline ? ['online', 'in-person'] : ['in-person'],
      };
      const response = await fetch(`/api/practitioners/${practitionerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save changes');
      }
      setSaved(true);
      setEditMode(false);
      setTimeout(() => setSaved(false), 3000);
      await fetchPractitionerData();
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSpecialty = (specialty: string) => {
    setProfileData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  if (authLoading || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Loader2 style={{ width: 32, height: 32, color: 'var(--hf-accent)', animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: 16, color: 'var(--hf-fg-dim)' }}>Loading your dashboard...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (noPractitionerRecord) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 16px' }}>
          <div className="glass-card" style={{ padding: 48, textAlign: 'center', maxWidth: 480 }}>
            <AlertCircle style={{ width: 56, height: 56, color: 'oklch(0.75 0.15 60)', margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 10 }}>No Practitioner Profile Found</h2>
            <p style={{ color: 'var(--hf-fg-dim)', marginBottom: 24, lineHeight: 1.6 }}>
              You don't have a claimed practitioner profile yet. Please claim a listing first to access your dashboard.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Link href="/claim-listing" className="btn-gradient hf-btn-accent" style={{ padding: '10px 20px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Claim a Listing
              </Link>
              <Link href="/" style={{ padding: '10px 20px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.12)', color: 'var(--hf-fg)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Return Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const sectionDivider: React.CSSProperties = { paddingTop: 24, marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, paddingTop: 80, padding: '80px 16px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {error && (
            <div style={{ marginBottom: 24, background: 'oklch(0.25 0.1 20 / 0.3)', border: '1px solid oklch(0.5 0.2 20 / 0.4)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <AlertCircle style={{ width: 20, height: 20, color: 'oklch(0.7 0.15 20)', flexShrink: 0, marginTop: 1 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, color: 'oklch(0.8 0.1 20)', marginBottom: 4 }}>Error</p>
                <p style={{ fontSize: 13, color: 'oklch(0.75 0.1 20)' }}>{error}</p>
              </div>
              <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: 'oklch(0.7 0.15 20)', cursor: 'pointer', fontSize: 13 }}>Dismiss</button>
            </div>
          )}

          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--hf-fg)' }}>Dashboard</h1>
              <p style={{ color: 'var(--hf-fg-dim)', marginTop: 4 }}>
                Welcome back{profileData.name ? `, ${profileData.name.split(' ')[0]}` : ''}!
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {practitionerSlug ? (
                <Link href={`/practitioner/${practitionerSlug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.12)', color: 'var(--hf-fg)', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>
                  <Eye style={{ width: 15, height: 15 }} />
                  View Public Profile
                </Link>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.06)', color: 'var(--hf-fg-dim)', fontWeight: 600, fontSize: 13, opacity: 0.5 }}>
                  <Eye style={{ width: 15, height: 15 }} />
                  View Public Profile
                </span>
              )}
              <button
                onClick={async () => { await signOut(); window.location.href = '/'; }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.12)', background: 'none', color: 'var(--hf-fg)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
              >
                <ExternalLink style={{ width: 15, height: 15 }} />
                Logout
              </button>
            </div>
          </div>

          {/* Free Period Banner */}
          <div className="glass-card" style={{ padding: 24, marginBottom: 24, borderLeft: '3px solid var(--hf-accent)' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ padding: 12, background: 'oklch(0.72 0.12 185 / 0.15)', borderRadius: 12, flexShrink: 0 }}>
                <Star style={{ width: 22, height: 22, color: 'var(--hf-accent)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 6 }}>Pre-Launch Member Benefits</h3>
                <p style={{ color: 'var(--hf-fg-dim)', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                  As a founding member, you have full access to all features free for 6 months before our official launch. Help us build the best hypnotherapy directory! After official launch, premium features start at $29/month.
                </p>
                <button style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'none', color: 'var(--hf-fg-dim)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  Learn More About Premium
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Profile Views', value: profileData.profileViews, Icon: Eye, trend: '+15% this month' },
              { label: 'Client Inquiries', value: profileData.inquiries, Icon: Users, trend: '+3 this week' },
              { label: 'Profile Completeness', value: '85%', Icon: CheckCircle, trend: 'Good' },
            ].map(({ label, value, Icon, trend }) => (
              <div key={label} style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', marginBottom: 8, fontWeight: 500 }}>{label}</p>
                    <p style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)' }}>{value}</p>
                    <p style={{ fontSize: 12, color: 'oklch(0.7 0.15 145)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <TrendingUp style={{ width: 13, height: 13 }} />{trend}
                    </p>
                  </div>
                  <div style={{ padding: 12, background: 'oklch(0.72 0.12 185 / 0.12)', borderRadius: 10 }}>
                    <Icon style={{ width: 22, height: 22, color: 'var(--hf-accent)' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Profile Card */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontWeight: 800, fontSize: 18, color: 'var(--hf-fg)' }}>Your Profile</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {saved && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'oklch(0.7 0.15 145)', fontSize: 13, fontWeight: 600 }}>
                    <CheckCircle style={{ width: 16, height: 16 }} />
                    Changes saved!
                  </div>
                )}
                {!editMode ? (
                  <button onClick={() => setEditMode(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '2px solid rgba(255,255,255,0.12)', background: 'none', color: 'var(--hf-fg)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                    <Edit style={{ width: 14, height: 14 }} />Edit Profile
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => { setEditMode(false); setError(null); }} disabled={saving} style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid rgba(255,255,255,0.12)', background: 'none', color: 'var(--hf-fg-dim)', fontSize: 13, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.5 : 1 }}>
                      Cancel
                    </button>
                    <button onClick={handleSave} disabled={saving} className={!saving ? 'btn-gradient hf-btn-accent' : ''} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', background: saving ? 'rgba(255,255,255,0.08)' : undefined, opacity: saving ? 0.7 : 1 }}>
                      {saving ? <><Loader2 style={{ width: 14, height: 14, animation: 'spin 1s linear infinite' }} />Saving...</> : <><Save style={{ width: 14, height: 14 }} />Save Changes</>}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 14, color: 'var(--hf-fg-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Basic Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                {[
                  { label: 'Full Name', key: 'name', type: 'text' },
                  { label: 'Credentials', key: 'credentials', type: 'text' },
                  { label: 'Email', key: 'email', type: 'email' },
                  { label: 'Phone', key: 'phone', type: 'tel' },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 6 }}>{label}</label>
                    <input
                      type={type}
                      value={(profileData as any)[key]}
                      disabled={!editMode}
                      onChange={(e) => setProfileData({ ...profileData, [key]: e.target.value })}
                      style={inputStyle(editMode)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div style={sectionDivider}>
              <h3 style={{ fontWeight: 700, fontSize: 14, color: 'var(--hf-fg-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Location & Contact</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 6 }}>Street Address</label>
                  <input value={profileData.street} disabled={!editMode} onChange={(e) => setProfileData({ ...profileData, street: e.target.value })} style={inputStyle(editMode)} />
                </div>
                {[
                  { label: 'City', key: 'city' },
                  { label: 'State', key: 'state' },
                  { label: 'Zip Code', key: 'zipCode' },
                  { label: 'Website', key: 'website' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 6 }}>{label}</label>
                    <input value={(profileData as any)[key]} disabled={!editMode} onChange={(e) => setProfileData({ ...profileData, [key]: e.target.value })} style={inputStyle(editMode)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Details */}
            <div style={sectionDivider}>
              <h3 style={{ fontWeight: 700, fontSize: 14, color: 'var(--hf-fg-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Professional Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 8 }}>Specialties</label>
                  {editMode ? (
                    <div>
                      <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', marginBottom: 10 }}>Click to add or remove specialties:</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {ALL_SPECIALTIES.map((specialty) => {
                          const selected = profileData.specialties.includes(specialty);
                          return (
                            <button
                              key={specialty}
                              type="button"
                              onClick={() => toggleSpecialty(specialty)}
                              style={{
                                padding: '5px 12px', borderRadius: 9999,
                                border: `1px solid ${selected ? 'var(--hf-accent)' : 'rgba(255,255,255,0.12)'}`,
                                background: selected ? 'oklch(0.72 0.12 185 / 0.2)' : 'rgba(255,255,255,0.04)',
                                color: selected ? 'var(--hf-fg)' : 'var(--hf-fg-dim)',
                                fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                              }}
                            >
                              {specialty}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {profileData.specialties.length > 0 ? (
                        profileData.specialties.map((specialty) => (
                          <span key={specialty} style={{ padding: '4px 12px', borderRadius: 9999, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'var(--hf-fg-dim)', fontSize: 12, fontWeight: 600 }}>
                            {specialty}
                          </span>
                        ))
                      ) : (
                        <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', opacity: 0.6 }}>No specialties selected</p>
                      )}
                    </div>
                  )}
                </div>

                <div style={{ maxWidth: 200 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 6 }}>Years of Experience</label>
                  <input
                    type="number"
                    value={profileData.yearsExperience}
                    disabled={!editMode}
                    onChange={(e) => setProfileData({ ...profileData, yearsExperience: e.target.value })}
                    style={inputStyle(editMode)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 6 }}>Bio / About</label>
                  <textarea
                    value={profileData.bio}
                    disabled={!editMode}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      background: editMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                      border: `2px solid ${editMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
                      borderRadius: 10, padding: '11px 14px',
                      color: editMode ? 'var(--hf-fg)' : 'var(--hf-fg-dim)',
                      fontSize: 14, outline: 'none', resize: 'vertical',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { key: 'acceptsInsurance', label: 'I accept insurance' },
                    { key: 'offersOnline', label: 'I offer online/virtual sessions' },
                  ].map(({ key, label }) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: editMode ? 'pointer' : 'default' }}>
                      <input
                        type="checkbox"
                        checked={(profileData as any)[key]}
                        disabled={!editMode}
                        onChange={(e) => setProfileData({ ...profileData, [key]: e.target.checked })}
                        style={{ accentColor: 'var(--hf-accent)', width: 16, height: 16 }}
                      />
                      <span style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div style={{ ...cardStyle, marginTop: 20 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 16 }}>Quick Tips to Improve Your Profile</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { text: 'Add a professional photo to increase trust (coming soon)', done: true },
                { text: 'Write a detailed bio highlighting your unique approach', done: true },
                { text: 'List all your specialties to appear in more searches', done: true },
                { text: 'Keep your contact information up to date', done: true },
                { text: 'Collect client reviews (coming soon)', done: false },
              ].map(({ text, done }) => (
                <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle style={{ width: 18, height: 18, color: done ? 'oklch(0.7 0.15 145)' : 'rgba(255,255,255,0.2)', flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 13, color: done ? 'var(--hf-fg-dim)' : 'rgba(255,255,255,0.3)' }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Badge */}
          {verified && actualSlug && (
            <div style={{ ...cardStyle, marginTop: 20, borderLeft: '3px solid oklch(0.7 0.15 145)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <CheckCircle style={{ width: 20, height: 20, color: 'oklch(0.7 0.15 145)' }} />
                <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)' }}>Your Verified Practitioner Badge</h3>
              </div>
              <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', marginBottom: 20, lineHeight: 1.6 }}>
                You are a verified practitioner on Hypnotherapy Finder. Add this badge to your website to show clients you are verified — it links back to your profile.
              </p>

              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 10 }}>Badge preview:</p>
                <img src={`/api/badge/${actualSlug}`} alt="Verified Practitioner Badge" width={200} height={56} style={{ borderRadius: 8 }} />
              </div>

              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 10 }}>Embed code for your website:</p>
                <div style={{ position: 'relative' }}>
                  <pre style={{ background: 'oklch(0.12 0 0)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 16px', fontSize: 12, color: 'oklch(0.7 0.12 185)', overflowX: 'auto', paddingRight: 80, lineHeight: 1.6 }}>
{`<a href="https://hypnotherapy-finder.com/practitioner/${actualSlug}" target="_blank" rel="noopener">
  <img src="https://hypnotherapy-finder.com/api/badge/${actualSlug}" alt="Verified Practitioner - Hypnotherapy Finder" width="200" height="56" />
</a>`}
                  </pre>
                  <button
                    style={{ position: 'absolute', top: 8, right: 8, padding: '5px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: 'var(--hf-fg-dim)', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => handleCopy(`<a href="https://hypnotherapy-finder.com/practitioner/${actualSlug}" target="_blank" rel="noopener">\n  <img src="https://hypnotherapy-finder.com/api/badge/${actualSlug}" alt="Verified Practitioner - Hypnotherapy Finder" width="200" height="56" />\n</a>`)}
                  >
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
                <p style={{ fontSize: 11, color: 'var(--hf-fg-dim)', marginTop: 8, opacity: 0.7 }}>
                  Place this code anywhere on your website — your homepage, contact page, or email signature works great.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
