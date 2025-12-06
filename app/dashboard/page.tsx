'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Eye, Edit, Save, CheckCircle, TrendingUp, Users, Star, ExternalLink } from 'lucide-react';

export default function DashboardPage() {
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);

  // Mock practitioner data - in production, this would come from your backend
  const [profileData, setProfileData] = useState({
    name: 'Dr. Jane Smith',
    credentials: 'CHt, NGH Certified',
    email: 'jane@example.com',
    phone: '(555) 123-4567',
    businessName: 'Smith Hypnotherapy',
    street: '123 Main St, Suite 200',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    website: 'https://smithhypnotherapy.com',
    specialties: ['Anxiety & Stress', 'Weight Loss', 'Smoking Cessation'],
    yearsExperience: '10',
    bio: 'I help clients overcome anxiety, manage stress, and achieve their wellness goals using evidence-based hypnotherapy techniques. With over 10 years of experience, I provide a supportive, judgment-free environment.',
    acceptsInsurance: true,
    offersOnline: true,
    profileViews: 234,
    inquiries: 12,
  });

  const handleSave = () => {
    // In production, save to backend
    console.log('Saving profile:', profileData);
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const stats = [
    { label: 'Profile Views', value: profileData.profileViews, icon: Eye, trend: '+15% this month' },
    { label: 'Client Inquiries', value: profileData.inquiries, icon: Users, trend: '+3 this week' },
    { label: 'Profile Completeness', value: '85%', icon: CheckCircle, trend: 'Good' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-8 pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back, {profileData.name.split(' ')[1]}!</p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline">
                  <Link href="/practitioner/jane-smith-austin-0">
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
                      <Button onClick={() => setEditMode(false)} variant="outline" size="sm">
                        Cancel
                      </Button>
                      <Button onClick={handleSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
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

                  {/* Business Info */}
                  <div className="pt-6 border-t">
                    <h3 className="font-semibold mb-4">Business Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Business Name</label>
                        <Input
                          value={profileData.businessName}
                          disabled={!editMode}
                          onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                        />
                      </div>
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
