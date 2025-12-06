'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
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

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch claims');
      }

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
        body: JSON.stringify({
          status: 'approved',
          admin_notes: adminNotes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to approve claim');
      }

      // Refresh claims list
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
    if (!rejectionReason.trim()) {
      setError('Please provide a rejection reason');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const response = await fetch(`/api/claims/${claimId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'rejected',
          admin_notes: adminNotes,
          rejection_reason: rejectionReason,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reject claim');
      }

      // Refresh claims list
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!profile?.is_admin) {
    return null;
  }

  const pendingClaims = claims.filter((c) => c.status === 'pending');
  const approvedClaims = claims.filter((c) => c.status === 'approved');
  const rejectedClaims = claims.filter((c) => c.status === 'rejected');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Claims Management</h1>
          <p className="text-gray-600 mt-2">Review and manage practitioner listing claims</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{claims.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600">{pendingClaims.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{approvedClaims.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">{rejectedClaims.length}</p>
            </CardContent>
          </Card>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Claims List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Claims */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Pending Claims ({pendingClaims.length})</h2>
            <div className="space-y-4">
              {pendingClaims.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-500">No pending claims</p>
                  </CardContent>
                </Card>
              ) : (
                pendingClaims.map((claim) => (
                  <Card key={claim.id} className="hover:shadow-lg transition">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {claim.practitioner?.name || 'Unknown Practitioner'}
                          </CardTitle>
                          <CardDescription>
                            {claim.practitioner?.city}, {claim.practitioner?.state}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm">
                        <p className="text-gray-600">
                          <strong>Claimed by:</strong> {claim.user?.full_name || 'Unknown'}
                        </p>
                        <p className="text-gray-600">
                          <strong>Email:</strong> {claim.verification_email}
                        </p>
                        {claim.verification_phone && (
                          <p className="text-gray-600">
                            <strong>Phone:</strong> {claim.verification_phone}
                          </p>
                        )}
                        <p className="text-gray-600">
                          <strong>Submitted:</strong> {new Date(claim.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Textarea
                          placeholder="Admin notes (optional)"
                          value={selectedClaim?.id === claim.id ? adminNotes : ''}
                          onChange={(e) => {
                            setSelectedClaim(claim);
                            setAdminNotes(e.target.value);
                          }}
                          rows={2}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveClaim(claim.id)}
                          disabled={processing}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          {processing && selectedClaim?.id === claim.id ? 'Approving...' : 'Approve'}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setSelectedClaim(claim);
                            const reason = prompt('Rejection reason:');
                            if (reason) {
                              setRejectionReason(reason);
                              handleRejectClaim(claim.id);
                            }
                          }}
                          disabled={processing}
                          className="flex-1"
                        >
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[...approvedClaims, ...rejectedClaims]
                .sort((a, b) => new Date(b.reviewed_at || b.updated_at).getTime() - new Date(a.reviewed_at || a.updated_at).getTime())
                .slice(0, 10)
                .map((claim) => (
                  <Card key={claim.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {claim.practitioner?.name || 'Unknown Practitioner'}
                          </CardTitle>
                          <CardDescription>
                            {claim.practitioner?.city}, {claim.practitioner?.state}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={claim.status === 'approved' ? 'default' : 'destructive'}
                          className={claim.status === 'approved' ? 'bg-green-600' : ''}
                        >
                          {claim.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <strong>Claimed by:</strong> {claim.user?.full_name || 'Unknown'}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Reviewed:</strong> {new Date(claim.reviewed_at || claim.updated_at).toLocaleDateString()}
                      </p>
                      {claim.admin_notes && (
                        <p className="text-sm text-gray-600">
                          <strong>Notes:</strong> {claim.admin_notes}
                        </p>
                      )}
                      {claim.rejection_reason && (
                        <p className="text-sm text-red-600">
                          <strong>Reason:</strong> {claim.rejection_reason}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
