'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Eye, Edit, Save, CheckCircle, TrendingUp, Users, Star, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
import { Practitioner } from '@/lib/types/practitioner';

export default function DashboardPage() {
  const { user, session, loading: authLoading } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [practitionerId, setPractitionerId] = useState<string | null>(null);
  const [practitionerSlug, setPractitionerSlug] = useState<string | null>(null);
  const [noPractitionerRecord, setNoPractitionerRecord] = useState(false);

  // Practitioner profile data
  const [profileData, setProfileData] = useState({
    name: '',
    credentials: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    website: '',
    specialties: [] as string[],
    yearsExperience: '',
    bio: '',
    acceptsInsurance: false,
    offersOnline: false,
    profileViews: 0,
    inquiries: 0,
  });

  // Fetch practitioner data on mount
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

      // Fetch practitioner data where claimed_by = user.id
      const { data, error: fetchError } = await supabase
        .from('practitioners')
        .select('*')
        .eq('claimed_by', user!.id)
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          // No practitioner record found
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

      // Map Supabase data to profile state
      setPractitionerId(data.id);

      // Generate slug from name and city (matching the pattern from static data)
      const slug = `${data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${data.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${data.id.substring(0, 8)}`;
      setPractitionerSlug(slug);

      setProfileData({
        name: data.name || '',
        credentials: Array.isArray(data.credentials)
          ? data.credentials.join(', ')
          : data.credentials || '',
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
        profileViews: 0, // TODO: Implement analytics
        inquiries: 0, // TODO: Implement analytics
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
    if (!practitionerId) {
      setError('No practitioner ID found');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Prepare data for API
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
        session_types: profileData.offersOnline
          ? ['online', 'in-person']
          : ['in-person'],
      };

      // Save to database via API
      const response = await fetch(`/api/practitioners/${practitionerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save changes');
      }

      setSaved(true);
      setEditMode(false);
      setTimeout(() => setSaved(false), 3000);

      // Refresh data
      await fetchPractitionerData();
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const stats = [
    { label: 'Profile Views', value: profileData.profileViews, icon: Eye, trend: '+15% this month' },
    { label: 'Client Inquiries', value: profileData.inquiries, icon: Users, trend: '+3 this week' },
    { label: 'Profile Completeness', value: '85%', icon: CheckCircle, trend: 'Good' },
  ];

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 py-8 pt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-3" />
                    <span className="text-lg">Loading your dashboard...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show error state for no practitioner record
  if (noPractitionerRecord) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 py-8 pt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AlertCircle className="h-16 w-16 text-amber-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No Practitioner Profile Found</h2>
                    <p className="text-gray-600 mb-6 max-w-md">
                      You don't have a claimed practitioner profile yet. Please claim a listing first to access your dashboard.
                    </p>
                    <div className="flex gap-3">
                      <Button asChild>
                        <Link href="/claim-listing">Claim a Listing</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/">Return Home</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-8 pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 mb-1">Error</h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setError(null)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-100"
                >
                  Dismiss
                </Button>
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Welcome back{profileData.name ? `, ${profileData.name.split(' ')[0]}` : ''}!
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline" disabled={!practitionerSlug}>
                  <Link href={practitionerSlug ? `/practitioner/${practitionerSlug}` : '#'}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Public Profile
                  </Link>
                </Button>
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Free Period Banner */}
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-lg">
                    <Star className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Pre-Launch Member Benefits</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      As a founding member, you have full access to all features free for 6 months before our official launch.
                      Help us build the best hypnotherapy directory! After official launch, premium features start at $29/month.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Learn More About Premium</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          {stat.trend}
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <stat.icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Profile Management */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Your Profile</CardTitle>
                  {saved && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Changes saved!</span>
                    </div>
                  )}
                  {!editMode ? (
                    <Button onClick={() => setEditMode(true)} size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setEditMode(false);
                          setError(null);
                        }}
                        variant="outline"
                        size="sm"
                        disabled={saving}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSave} size="sm" disabled={saving}>
                        {saving ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="font-semibold mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <Input
                          value={profileData.name}
                          disabled={!editMode}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Credentials</label>
                        <Input
                          value={profileData.credentials}
                          disabled={!editMode}
                          onChange={(e) => setProfileData({ ...profileData, credentials: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                          type="email"
                          value={profileData.email}
                          disabled={!editMode}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input
                          value={profileData.phone}
                          disabled={!editMode}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="pt-6 border-t">
                    <h3 className="font-semibold mb-4">Location & Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Street Address</label>
                        <Input
                          value={profileData.street}
                          disabled={!editMode}
                          onChange={(e) => setProfileData({ ...profileData, street: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <Input
                          value={profileData.city}
                          disabled={!editMode}
                          onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State</label>
                        <Input
                          value={profileData.state}
                          disabled={!editMode}
                          onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Zip Code</label>
                        <Input
                          value={profileData.zipCode}
                          disabled={!editMode}
                          onChange={(e) => setProfileData({ ...profileData, zipCode: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Website</label>
                        <Input
                          type="url"
                          value={profileData.website}
                          disabled={!editMode}
                          onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Details */}
                  <div className="pt-6 border-t">
                    <h3 className="font-semibold mb-4">Professional Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Specialties</label>
                        <div className="flex flex-wrap gap-2">
                          {profileData.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                          {editMode && (
                            <Button size="sm" variant="outline">
                              + Add Specialty
                            </Button>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Years of Experience</label>
                        <Input
                          type="number"
                          value={profileData.yearsExperience}
                          disabled={!editMode}
                          onChange={(e) => setProfileData({ ...profileData, yearsExperience: e.target.value })}
                          className="max-w-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Bio / About</label>
                        <textarea
                          value={profileData.bio}
                          disabled={!editMode}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          rows={4}
                          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={profileData.acceptsInsurance}
                            disabled={!editMode}
                            onChange={(e) => setProfileData({ ...profileData, acceptsInsurance: e.target.checked })}
                            className="rounded"
                          />
                          <span className="text-sm">I accept insurance</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={profileData.offersOnline}
                            disabled={!editMode}
                            onChange={(e) => setProfileData({ ...profileData, offersOnline: e.target.checked })}
                            className="rounded"
                          />
                          <span className="text-sm">I offer online/virtual sessions</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips to Improve Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Add a professional photo to increase trust (coming soon)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Write a detailed bio highlighting your unique approach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>List all your specialties to appear in more searches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Keep your contact information up to date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500">Collect client reviews (coming soon)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
