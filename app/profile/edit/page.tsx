'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import FileUpload from '@/components/FileUpload';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '2px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '12px 16px',
  color: 'var(--hf-fg)',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
};

const cardStyle: React.CSSProperties = {
  background: 'var(--hf-bg-mid)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
  padding: 24,
  marginBottom: 20,
};

export default function EditProfilePage() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const [practitioner, setPractitioner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    bio: '', phone: '', email: '', website: '',
    address: '', city: '', state: '', zip: '',
    years_experience: '', credentials: '', specialties: '',
    session_types: '', insurance_accepted: '', price_range: '',
    consultation_free: false, languages: '', certifications: '', memberships: '',
  });

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login?redirect=/profile/edit');
      } else {
        fetchPractitioner();
      }
    }
  }, [user, authLoading, router]);

  const fetchPractitioner = async () => {
    try {
      const response = await fetch('/api/claims');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch claims');

      const approvedClaim = data.claims?.find((c: any) => c.status === 'approved');
      if (!approvedClaim) {
        setError('You do not have an approved claim. Please claim a listing first.');
        setLoading(false);
        return;
      }

      const practitionerResponse = await fetch(`/api/practitioners/${approvedClaim.practitioner_id}`);
      const practitionerData = await practitionerResponse.json();
      if (!practitionerResponse.ok) throw new Error(practitionerData.error || 'Failed to fetch practitioner');

      const p = practitionerData.practitioner;
      setPractitioner(p);
      setFormData({
        bio: p.bio || '',
        phone: p.phone || '',
        email: p.email || '',
        website: p.website || '',
        address: p.address || '',
        city: p.city || '',
        state: p.state || '',
        zip: p.zip || '',
        years_experience: p.years_experience?.toString() || '',
        credentials: Array.isArray(p.credentials) ? p.credentials.join(', ') : '',
        specialties: Array.isArray(p.specialties) ? p.specialties.join(', ') : '',
        session_types: Array.isArray(p.session_types) ? p.session_types.join(', ') : '',
        insurance_accepted: Array.isArray(p.insurance_accepted) ? p.insurance_accepted.join(', ') : '',
        price_range: p.price_range || '',
        consultation_free: p.consultation_free || false,
        languages: Array.isArray(p.languages) ? p.languages.join(', ') : '',
        certifications: Array.isArray(p.certifications) ? p.certifications.join(', ') : '',
        memberships: Array.isArray(p.memberships) ? p.memberships.join(', ') : '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const split = (s: string) => s ? s.split(',').map(x => x.trim()).filter(Boolean) : [];
      const updateData = {
        bio: formData.bio, phone: formData.phone, email: formData.email,
        website: formData.website, address: formData.address, city: formData.city,
        state: formData.state, zip: formData.zip,
        years_experience: formData.years_experience ? parseInt(formData.years_experience) : null,
        credentials: split(formData.credentials),
        specialties: split(formData.specialties),
        session_types: split(formData.session_types),
        insurance_accepted: split(formData.insurance_accepted),
        price_range: formData.price_range,
        consultation_free: formData.consultation_free,
        languages: split(formData.languages),
        certifications: split(formData.certifications),
        memberships: split(formData.memberships),
      };
      const response = await fetch(`/api/practitioners/${practitioner.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update profile');
      setSuccess('Profile updated successfully!');
      setPractitioner(data.practitioner);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--hf-bg)' }}>
        <p style={{ color: 'var(--hf-fg-dim)', fontSize: 16 }}>Loading...</p>
      </div>
    );
  }

  if (!practitioner) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--hf-bg)', padding: 16 }}>
        <div className="glass-card" style={{ padding: 32, maxWidth: 400, textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--hf-fg)', marginBottom: 10 }}>No Profile Found</h2>
          <p style={{ color: 'var(--hf-fg-dim)', marginBottom: 20, lineHeight: 1.6, fontSize: 14 }}>
            You need to claim a listing before you can edit your profile.
          </p>
          <button
            onClick={() => router.push('/claim-listing')}
            className="btn-gradient hf-btn-accent"
            style={{ padding: '11px 24px', borderRadius: 10, border: 'none', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
          >
            Claim Listing
          </button>
        </div>
      </div>
    );
  }

  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--hf-fg-dim)', marginBottom: 8 };
  const gridTwo: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', padding: '32px 16px 48px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--hf-fg)' }}>Edit Your Profile</h1>
          <p style={{ color: 'var(--hf-fg-dim)', marginTop: 6, lineHeight: 1.6 }}>
            Update your information to help clients find and connect with you
          </p>
          {practitioner.profile_completeness !== undefined && (
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--hf-fg-dim)', marginBottom: 6 }}>
                <span>Profile Completeness</span>
                <span style={{ fontWeight: 700 }}>{practitioner.profile_completeness}%</span>
              </div>
              <div style={{ width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: 9999, height: 6 }}>
                <div style={{ background: 'var(--hf-accent)', height: '100%', borderRadius: 9999, width: `${practitioner.profile_completeness}%`, transition: 'width 0.4s' }} />
              </div>
            </div>
          )}
        </div>

        {error && (
          <div style={{ background: 'oklch(0.25 0.1 20 / 0.3)', border: '1px solid oklch(0.5 0.2 20 / 0.4)', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: 'oklch(0.8 0.1 20)' }}>{error}</p>
          </div>
        )}
        {success && (
          <div style={{ background: 'oklch(0.25 0.15 145 / 0.3)', border: '1px solid oklch(0.5 0.15 145 / 0.4)', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: 'oklch(0.75 0.15 145)' }}>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Profile Photo */}
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 4 }}>Profile Photo</h2>
            <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', marginBottom: 16 }}>Upload a professional headshot</p>
            {practitioner.profile_photo_url && (
              <div style={{ marginBottom: 16 }}>
                <img src={practitioner.profile_photo_url} alt="Profile" style={{ width: 96, height: 96, borderRadius: 9999, objectFit: 'cover' }} />
              </div>
            )}
            <FileUpload
              type="practitioner-photo"
              resourceId={practitioner.id}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              maxSize={5}
              buttonText="Upload Photo"
              onUploadComplete={(url) => {
                setPractitioner({ ...practitioner, profile_photo_url: url });
                setSuccess('Photo uploaded successfully!');
              }}
            />
          </div>

          {/* Basic Information */}
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 20 }}>Basic Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Professional Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tell potential clients about your background, approach, and expertise..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <div style={gridTwo}>
                {[
                  { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
                  { label: 'Phone', name: 'phone', type: 'tel', placeholder: '(555) 123-4567' },
                  { label: 'Website', name: 'website', type: 'url', placeholder: 'https://yourwebsite.com' },
                  { label: 'Years of Experience', name: 'years_experience', type: 'number', placeholder: '10' },
                ].map(({ label, name, type, placeholder }) => (
                  <div key={name}>
                    <label style={labelStyle}>{label}</label>
                    <input type={type} name={name} value={(formData as any)[name]} onChange={handleInputChange} placeholder={placeholder} style={inputStyle} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location */}
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 20 }}>Location</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Main Street" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                {[
                  { label: 'City', name: 'city', placeholder: 'Los Angeles' },
                  { label: 'State', name: 'state', placeholder: 'CA' },
                  { label: 'ZIP Code', name: 'zip', placeholder: '90001' },
                ].map(({ label, name, placeholder }) => (
                  <div key={name}>
                    <label style={labelStyle}>{label}</label>
                    <input type="text" name={name} value={(formData as any)[name]} onChange={handleInputChange} placeholder={placeholder} style={inputStyle} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 4 }}>Professional Details</h2>
            <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', marginBottom: 20 }}>Separate multiple items with commas</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Credentials (e.g., CHt, PhD, LMFT)', name: 'credentials', placeholder: 'CHt, PhD, LMFT' },
                { label: 'Specialties (e.g., Anxiety, Weight Loss, Smoking Cessation)', name: 'specialties', placeholder: 'Anxiety, Weight Loss, Smoking Cessation' },
                { label: 'Certifications', name: 'certifications', placeholder: 'NGH Certified, IACT Member' },
                { label: 'Professional Memberships', name: 'memberships', placeholder: 'American Society of Clinical Hypnosis' },
                { label: 'Languages Spoken', name: 'languages', placeholder: 'English, Spanish, French' },
              ].map(({ label, name, placeholder }) => (
                <div key={name}>
                  <label style={labelStyle}>{label}</label>
                  <input type="text" name={name} value={(formData as any)[name]} onChange={handleInputChange} placeholder={placeholder} style={inputStyle} />
                </div>
              ))}
            </div>
          </div>

          {/* Services & Pricing */}
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)', marginBottom: 20 }}>Services & Pricing</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Session Types (e.g., In-Person, Online, Hybrid)</label>
                <input type="text" name="session_types" value={formData.session_types} onChange={handleInputChange} placeholder="In-Person, Online, Hybrid" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Insurance Accepted</label>
                <input type="text" name="insurance_accepted" value={formData.insurance_accepted} onChange={handleInputChange} placeholder="Blue Cross, Aetna, UnitedHealth" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Price Range</label>
                  <select
                    name="price_range"
                    value={formData.price_range}
                    onChange={handleInputChange}
                    style={{ ...inputStyle, appearance: 'none' }}
                  >
                    <option value="">Select price range</option>
                    <option value="$">$ (Under $100)</option>
                    <option value="$$">$$ ($100-$200)</option>
                    <option value="$$$">$$$ ($200-$300)</option>
                    <option value="$$$$">$$$$ ($300+)</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: 28 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, color: 'var(--hf-fg-dim)' }}>
                    <input
                      type="checkbox"
                      id="consultation_free"
                      name="consultation_free"
                      checked={formData.consultation_free}
                      onChange={handleInputChange}
                      style={{ accentColor: 'var(--hf-accent)', width: 16, height: 16 }}
                    />
                    Free Consultation Available
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="submit"
              disabled={saving}
              className={!saving ? 'btn-gradient hf-btn-accent' : ''}
              style={{ flex: 1, padding: '13px', borderRadius: 10, border: 'none', color: '#fff', fontWeight: 700, fontSize: 15, cursor: saving ? 'not-allowed' : 'pointer', background: saving ? 'rgba(255,255,255,0.08)' : undefined, opacity: saving ? 0.7 : 1 }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              style={{ padding: '13px 24px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.12)', background: 'none', color: 'var(--hf-fg)', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
