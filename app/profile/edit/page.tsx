'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FileUpload from '@/components/FileUpload';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const [practitioner, setPractitioner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    bio: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    years_experience: '',
    credentials: '',
    specialties: '',
    session_types: '',
    insurance_accepted: '',
    price_range: '',
    consultation_free: false,
    languages: '',
    certifications: '',
    memberships: '',
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
      // Get user's claimed practitioner
      const response = await fetch('/api/claims');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch claims');
      }

      // Find approved claim
      const approvedClaim = data.claims?.find((c: any) => c.status === 'approved');

      if (!approvedClaim) {
        setError('You do not have an approved claim. Please claim a listing first.');
        setLoading(false);
        return;
      }

      // Fetch practitioner details
      const practitionerResponse = await fetch(
        `/api/practitioners/${approvedClaim.practitioner_id}`
      );
      const practitionerData = await practitionerResponse.json();

      if (!practitionerResponse.ok) {
        throw new Error(practitionerData.error || 'Failed to fetch practitioner');
      }

      const p = practitionerData.practitioner;
      setPractitioner(p);

      // Populate form
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
        insurance_accepted: Array.isArray(p.insurance_accepted)
          ? p.insurance_accepted.join(', ')
          : '',
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Convert comma-separated strings to arrays
      const updateData = {
        bio: formData.bio,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        years_experience: formData.years_experience ? parseInt(formData.years_experience) : null,
        credentials: formData.credentials
          ? formData.credentials.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        specialties: formData.specialties
          ? formData.specialties.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        session_types: formData.session_types
          ? formData.session_types.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        insurance_accepted: formData.insurance_accepted
          ? formData.insurance_accepted.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        price_range: formData.price_range,
        consultation_free: formData.consultation_free,
        languages: formData.languages
          ? formData.languages.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        certifications: formData.certifications
          ? formData.certifications.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        memberships: formData.memberships
          ? formData.memberships.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      };

      const response = await fetch(`/api/practitioners/${practitioner.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!practitioner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Profile Found</CardTitle>
            <CardDescription>
              You need to claim a listing before you can edit your profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/claim-listing')}>Claim Listing</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Your Profile</h1>
          <p className="text-gray-600 mt-2">
            Update your information to help clients find and connect with you
          </p>
          {practitioner.profile_completeness !== undefined && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Profile Completeness</span>
                <span className="font-semibold">{practitioner.profile_completeness}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${practitioner.profile_completeness}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4">
            <AlertDescription className="text-green-600">{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
              <CardDescription>Upload a professional headshot</CardDescription>
            </CardHeader>
            <CardContent>
              {practitioner.profile_photo_url && (
                <div className="mb-4">
                  <img
                    src={practitioner.profile_photo_url}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
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
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Professional Bio</label>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tell potential clients about your background, approach, and expertise..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <Input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Years of Experience</label>
                  <Input
                    type="number"
                    name="years_experience"
                    value={formData.years_experience}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium mb-2">City</label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Los Angeles"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="CA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">ZIP Code</label>
                  <Input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    placeholder="90001"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
              <CardDescription>Separate multiple items with commas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Credentials (e.g., CHt, PhD, LMFT)
                </label>
                <Input
                  type="text"
                  name="credentials"
                  value={formData.credentials}
                  onChange={handleInputChange}
                  placeholder="CHt, PhD, LMFT"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Specialties (e.g., Anxiety, Weight Loss, Smoking Cessation)
                </label>
                <Input
                  type="text"
                  name="specialties"
                  value={formData.specialties}
                  onChange={handleInputChange}
                  placeholder="Anxiety, Weight Loss, Smoking Cessation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Certifications
                </label>
                <Input
                  type="text"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleInputChange}
                  placeholder="NGH Certified, IACT Member"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Professional Memberships
                </label>
                <Input
                  type="text"
                  name="memberships"
                  value={formData.memberships}
                  onChange={handleInputChange}
                  placeholder="American Society of Clinical Hypnosis"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Languages Spoken
                </label>
                <Input
                  type="text"
                  name="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                  placeholder="English, Spanish, French"
                />
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Services & Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Session Types (e.g., In-Person, Online, Hybrid)
                </label>
                <Input
                  type="text"
                  name="session_types"
                  value={formData.session_types}
                  onChange={handleInputChange}
                  placeholder="In-Person, Online, Hybrid"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Insurance Accepted
                </label>
                <Input
                  type="text"
                  name="insurance_accepted"
                  value={formData.insurance_accepted}
                  onChange={handleInputChange}
                  placeholder="Blue Cross, Aetna, UnitedHealth"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <select
                    name="price_range"
                    value={formData.price_range}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select price range</option>
                    <option value="$">$ (Under $100)</option>
                    <option value="$$">$$ ($100-$200)</option>
                    <option value="$$$">$$$ ($200-$300)</option>
                    <option value="$$$$">$$$$ ($300+)</option>
                  </select>
                </div>

                <div className="flex items-center pt-8">
                  <input
                    type="checkbox"
                    id="consultation_free"
                    name="consultation_free"
                    checked={formData.consultation_free}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="consultation_free" className="text-sm font-medium">
                    Free Consultation Available
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
