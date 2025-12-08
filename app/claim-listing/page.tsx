'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Practitioner } from '@/lib/types/practitioner';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function ClaimListingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState<'search' | 'select' | 'verify'>('search');
  const [searchType, setSearchType] = useState<'email' | 'phone' | 'name'>('email');
  const [searchValue, setSearchValue] = useState('');
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState<Practitioner | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      params.set(searchType, searchValue);
      params.set('forClaim', 'true');

      const url = `/api/practitioners/search?${params}`;
      console.log('[Claim Search] Fetching:', url);

      const response = await fetch(url);
      const data = await response.json();

      console.log('[Claim Search] Response:', { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.error || 'Failed to search');
      }

      if (data.practitioners.length === 0) {
        setError('No unclaimed listings found matching your search. Try a different search term.');
        setPractitioners([]);
      } else {
        setPractitioners(data.practitioners);
        setStep('select');
      }
    } catch (err: any) {
      console.error('[Claim Search] Error:', err);
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

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit claim');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit claim');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-green-600">Claim Submitted Successfully!</CardTitle>
            <CardDescription>
              Your claim has been submitted for review. We'll notify you once it's been approved.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Redirecting to your dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Claim Your Listing</h1>
          <p className="text-lg text-gray-600">
            Find and claim your hypnotherapy practice listing to manage your profile
          </p>
        </div>

        {/* Search Step */}
        {step === 'search' && (
          <Card>
            <CardHeader>
              <CardTitle>Find Your Listing</CardTitle>
              <CardDescription>
                Search for your practice using your email, phone number, or business name
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <Label htmlFor="searchType">Search By</Label>
                  <select
                    id="searchType"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value as any)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="email">Email Address</option>
                    <option value="phone">Phone Number</option>
                    <option value="name">Business Name</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="searchValue">
                    {searchType === 'email' && 'Email Address'}
                    {searchType === 'phone' && 'Phone Number'}
                    {searchType === 'name' && 'Business Name'}
                  </Label>
                  <Input
                    id="searchValue"
                    type={searchType === 'email' ? 'email' : 'text'}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={
                      searchType === 'email'
                        ? 'you@example.com'
                        : searchType === 'phone'
                          ? '(555) 123-4567'
                          : 'Your Business Name'
                    }
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Searching...' : 'Search for My Listing'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Select Step */}
        {step === 'select' && (
          <Card>
            <CardHeader>
              <CardTitle>Select Your Listing</CardTitle>
              <CardDescription>
                Found {practitioners.length} listing{practitioners.length !== 1 ? 's' : ''}. Select yours to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {practitioners.map((practitioner) => (
                  <div
                    key={practitioner.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
                    onClick={() => handleSelectPractitioner(practitioner)}
                  >
                    <h3 className="font-semibold text-lg">{practitioner.name}</h3>
                    {practitioner.credentials && practitioner.credentials.length > 0 && (
                      <p className="text-sm text-gray-600">{practitioner.credentials.join(', ')}</p>
                    )}
                    <p className="text-sm text-gray-600">
                      {practitioner.city}, {practitioner.state}
                    </p>
                    {practitioner.email && (
                      <p className="text-sm text-gray-500">{practitioner.email}</p>
                    )}
                    {practitioner.phone && (
                      <p className="text-sm text-gray-500">{practitioner.phone}</p>
                    )}
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => {
                  setStep('search');
                  setPractitioners([]);
                }}
              >
                Back to Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Verify Step */}
        {step === 'verify' && selectedPractitioner && (
          <Card>
            <CardHeader>
              <CardTitle>Verify and Claim</CardTitle>
              <CardDescription>
                Review the listing details and submit your claim
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{selectedPractitioner.name}</h3>
                {selectedPractitioner.credentials && selectedPractitioner.credentials.length > 0 && (
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedPractitioner.credentials.join(', ')}
                  </p>
                )}
                <p className="text-sm text-gray-600 mb-1">
                  {selectedPractitioner.address || ''}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  {selectedPractitioner.city}, {selectedPractitioner.state} {selectedPractitioner.zip}
                </p>
                {selectedPractitioner.email && (
                  <p className="text-sm text-gray-600">{selectedPractitioner.email}</p>
                )}
                {selectedPractitioner.phone && (
                  <p className="text-sm text-gray-600">{selectedPractitioner.phone}</p>
                )}
              </div>

              <Alert>
                <AlertDescription>
                  By claiming this listing, you confirm that you are authorized to manage this practice.
                  Your claim will be reviewed by our team.
                </AlertDescription>
              </Alert>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setStep('select');
                    setSelectedPractitioner(null);
                  }}
                >
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSubmitClaim}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Claim'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
