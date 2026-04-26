'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Claim } from '@/lib/types/practitioner';

export default function AdminClaimsPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login?redirect=/admin/claims');
      } else if (profile && !profile.is_admin) {
        router.push('/dashboard');
      } else {
        fetchClaims();
      }
    }
  }, [user, profile, authLoading, router]);

  const fetchClaims = async () => {
    try {
      const response = await fetch('/api/claims');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch claims');
      setClaims(data.claims || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load claims');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveClaim = async (claimId: string) => {
    setProcessing(true);
    setError('');
    try {
      const response = await fetch(`/api/claims/${claimId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved', admin_notes: adminNotes }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to approve claim');
      await fetchClaims();
      setSelectedClaim(null);
      setAdminNotes('');
    } catch (err: any) {
      setError(err.message || 'Failed to approve claim');
    } finally {
      setProcessing(false);
    }
  };

  const handleRejectClaim = async (claimId: string) => {
    if (!rejectionReason.trim()) { setError('Please provide a rejection reason'); return; }
    setProcessing(true);
    setError('');
    try {
      const response = await fetch(`/api/claims/${claimId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected', admin_notes: adminNotes, rejection_reason: rejectionReason }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to reject claim');
      await fetchClaims();
      setSelectedClaim(null);
      setAdminNotes('');
      setRejectionReason('');
    } catch (err: any) {
      setError(err.message || 'Failed to reject claim');
    } finally {
      setProcessing(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--hf-bg)' }}>
        <p style={{ color: 'var(--hf-fg-dim)', fontSize: 16 }}>Loading...</p>
      </div>
    );
  }

  if (!profile?.is_admin) return null;

  const pendingClaims = claims.filter((c) => c.status === 'pending');
  const approvedClaims = claims.filter((c) => c.status === 'approved');
  const rejectedClaims = claims.filter((c) => c.status === 'rejected');

  const cardStyle: React.CSSProperties = {
    background: 'var(--hf-bg-mid)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
  };

  const statCardStyle: React.CSSProperties = { ...cardStyle, padding: 16 };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', padding: '32px 16px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--hf-fg)' }}>Claims Management</h1>
          <p style={{ color: 'var(--hf-fg-dim)', marginTop: 6 }}>Review and manage practitioner listing claims</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Claims', value: claims.length, color: 'var(--hf-fg)' },
            { label: 'Pending', value: pendingClaims.length, color: 'oklch(0.75 0.15 60)' },
            { label: 'Approved', value: approvedClaims.length, color: 'oklch(0.7 0.15 145)' },
            { label: 'Rejected', value: rejectedClaims.length, color: 'oklch(0.65 0.2 20)' },
          ].map(({ label, value, color }) => (
            <div key={label} style={statCardStyle}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--hf-fg-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{label}</p>
              <p style={{ fontSize: 32, fontWeight: 800, color }}>{value}</p>
            </div>
          ))}
        </div>

        {error && (
          <div style={{ background: 'oklch(0.25 0.1 20 / 0.3)', border: '1px solid oklch(0.5 0.2 20 / 0.4)', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: 'oklch(0.8 0.1 20)' }}>{error}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24 }}>
          {/* Pending Claims */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>
              Pending Claims ({pendingClaims.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {pendingClaims.length === 0 ? (
                <div style={cardStyle}>
                  <p style={{ textAlign: 'center', color: 'var(--hf-fg-dim)', fontSize: 14 }}>No pending claims</p>
                </div>
              ) : (
                pendingClaims.map((claim) => (
                  <div key={claim.id} style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--hf-fg)' }}>
                          {claim.practitioner?.name || 'Unknown Practitioner'}
                        </p>
                        <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)' }}>
                          {claim.practitioner?.city}, {claim.practitioner?.state}
                        </p>
                      </div>
                      <span style={{ padding: '3px 10px', borderRadius: 9999, background: 'rgba(255,255,255,0.08)', color: 'var(--hf-fg-dim)', fontSize: 11, fontWeight: 700 }}>
                        Pending
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.7, marginBottom: 14 }}>
                      <p><strong style={{ color: 'var(--hf-fg)' }}>Claimed by:</strong> {claim.user?.full_name || 'Unknown'}</p>
                      <p><strong style={{ color: 'var(--hf-fg)' }}>Email:</strong> {claim.verification_email}</p>
                      {claim.verification_phone && <p><strong style={{ color: 'var(--hf-fg)' }}>Phone:</strong> {claim.verification_phone}</p>}
                      <p><strong style={{ color: 'var(--hf-fg)' }}>Submitted:</strong> {new Date(claim.created_at).toLocaleDateString()}</p>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <textarea
                        placeholder="Admin notes (optional)"
                        value={selectedClaim?.id === claim.id ? adminNotes : ''}
                        onChange={(e) => { setSelectedClaim(claim); setAdminNotes(e.target.value); }}
                        rows={2}
                        style={{
                          width: '100%', boxSizing: 'border-box',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 8, padding: '8px 12px',
                          color: 'var(--hf-fg)', fontSize: 13,
                          outline: 'none', resize: 'none',
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => handleApproveClaim(claim.id)}
                        disabled={processing}
                        style={{ flex: 1, padding: '9px', borderRadius: 8, border: 'none', background: 'oklch(0.35 0.15 145)', color: '#fff', fontWeight: 700, fontSize: 13, cursor: processing ? 'not-allowed' : 'pointer', opacity: processing ? 0.6 : 1 }}
                      >
                        {processing && selectedClaim?.id === claim.id ? 'Approving...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedClaim(claim);
                          const reason = prompt('Rejection reason:');
                          if (reason) { setRejectionReason(reason); handleRejectClaim(claim.id); }
                        }}
                        disabled={processing}
                        style={{ flex: 1, padding: '9px', borderRadius: 8, border: 'none', background: 'oklch(0.35 0.15 20)', color: '#fff', fontWeight: 700, fontSize: 13, cursor: processing ? 'not-allowed' : 'pointer', opacity: processing ? 0.6 : 1 }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 16 }}>Recent Activity</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[...approvedClaims, ...rejectedClaims]
                .sort((a, b) => new Date(b.reviewed_at || b.updated_at).getTime() - new Date(a.reviewed_at || a.updated_at).getTime())
                .slice(0, 10)
                .map((claim) => (
                  <div key={claim.id} style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--hf-fg)' }}>
                          {claim.practitioner?.name || 'Unknown Practitioner'}
                        </p>
                        <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)' }}>
                          {claim.practitioner?.city}, {claim.practitioner?.state}
                        </p>
                      </div>
                      <span style={{
                        padding: '3px 10px', borderRadius: 9999, fontSize: 11, fontWeight: 700,
                        background: claim.status === 'approved' ? 'oklch(0.3 0.12 145 / 0.4)' : 'oklch(0.3 0.12 20 / 0.4)',
                        color: claim.status === 'approved' ? 'oklch(0.7 0.15 145)' : 'oklch(0.7 0.15 20)',
                      }}>
                        {claim.status}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--hf-fg-dim)', lineHeight: 1.6 }}>
                      <p><strong style={{ color: 'var(--hf-fg)' }}>Claimed by:</strong> {claim.user?.full_name || 'Unknown'}</p>
                      <p><strong style={{ color: 'var(--hf-fg)' }}>Reviewed:</strong> {new Date(claim.reviewed_at || claim.updated_at).toLocaleDateString()}</p>
                      {claim.admin_notes && <p><strong style={{ color: 'var(--hf-fg)' }}>Notes:</strong> {claim.admin_notes}</p>}
                      {claim.rejection_reason && <p style={{ color: 'oklch(0.65 0.15 20)' }}><strong>Reason:</strong> {claim.rejection_reason}</p>}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
