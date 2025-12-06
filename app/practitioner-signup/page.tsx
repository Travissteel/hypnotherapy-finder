'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import { CheckCircle, Star, Users, TrendingUp, Shield } from 'lucide-react';

export default function PractitionerSignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',

    // Business Info
    businessName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    website: '',

    // Professional Info
    certifications: '',
    specialties: [] as string[],
    yearsExperience: '',
    bio: '',

    // Preferences
    acceptsInsurance: false,
    offersOnline: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const { error } = await signUp(formData.email, formData.password, fullName);

      if (error) {
        setError(error.message || 'Failed to create account');
        setLoading(false);
      } else {
        setStep(4); // Success step
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
      setLoading(false);
    }
  };

  const specialtyOptions = [
    'Anxiety & Stress',
    'Weight Loss',
    'Smoking Cessation',
    'Phobias',
    'Insomnia',
    'Pain Management',
    'PTSD & Trauma',
    'Confidence & Performance',
    'Past Life Regression',
    'General Hypnotherapy',
  ];

  const toggleSpecialty = (specialty: string) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.includes(specialty)
        ? formData.specialties.filter(s => s !== specialty)
        : [...formData.specialties, specialty],
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Join Hypnotherapy Finder
              </h1>
              <p className="text-xl mb-6">
                Connect with clients actively seeking hypnotherapy services in your area
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  100% Free During Pre-Launch
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Easy Profile Setup
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Get Found by Local Clients
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Why List with Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Users className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Reach More Clients</h3>
                    <p className="text-sm text-gray-600">
                      Get discovered by people actively searching for hypnotherapy
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Star className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Build Your Reputation</h3>
                    <p className="text-sm text-gray-600">
                      Showcase your credentials and expertise
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Grow Your Practice</h3>
                    <p className="text-sm text-gray-600">
                      Connect with clients in your specialty areas
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Shield className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">100% Free (Launch Special)</h3>
                    <p className="text-sm text-gray-600">
                      Join during our pre-launch period
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Sign Up Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {step === 4 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">Welcome to Hypnotherapy Finder!</h2>
                      <p className="text-gray-600 mb-6">
                        Your profile has been submitted for review. We'll send you an email within
                        24 hours with your login credentials and next steps.
                      </p>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg text-left">
                          <h3 className="font-semibold mb-2">What happens next?</h3>
                          <ul className="text-sm text-gray-700 space-y-2">
                            <li>✓ We'll review your information (typically within 24 hours)</li>
                            <li>✓ You'll receive an email with login credentials</li>
                            <li>✓ You can then complete and publish your profile</li>
                            <li>✓ Your profile will be live and searchable</li>
                          </ul>
                        </div>
                        <Button asChild className="w-full">
                          <Link href="/">Return to Homepage</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Create Your Profile</CardTitle>
                    <div className="flex gap-2 mt-4">
                      <div className={`h-2 flex-1 rounded ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                      <div className={`h-2 flex-1 rounded ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                      <div className={`h-2 flex-1 rounded ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Step 1: Personal Information */}
                      {step === 1 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Personal Information</h3>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">First Name *</label>
                              <Input
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="John"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Last Name *</label>
                              <Input
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Doe"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Email Address *</label>
                            <Input
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Phone Number *</label>
                            <Input
                              name="phone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="(555) 123-4567"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Password *</label>
                            <Input
                              name="password"
                              type="password"
                              required
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Create a secure password"
                            />
                          </div>

                          <Button type="button" onClick={() => setStep(2)} className="w-full">
                            Continue
                          </Button>
                        </div>
                      )}

                      {/* Step 2: Business Information */}
                      {step === 2 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Business Information</h3>

                          <div>
                            <label className="block text-sm font-medium mb-2">Business Name</label>
                            <Input
                              name="businessName"
                              value={formData.businessName}
                              onChange={handleChange}
                              placeholder="Your practice name (or leave blank to use your name)"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Street Address *</label>
                            <Input
                              name="street"
                              required
                              value={formData.street}
                              onChange={handleChange}
                              placeholder="123 Main St, Suite 100"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">City *</label>
                              <Input
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Austin"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">State *</label>
                              <Input
                                name="state"
                                required
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="TX"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Zip Code *</label>
                              <Input
                                name="zipCode"
                                required
                                value={formData.zipCode}
                                onChange={handleChange}
                                placeholder="78701"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Website</label>
                              <Input
                                name="website"
                                type="url"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://yourwebsite.com"
                              />
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                              Back
                            </Button>
                            <Button type="button" onClick={() => setStep(3)} className="flex-1">
                              Continue
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Professional Details */}
                      {step === 3 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Professional Details</h3>

                          <div>
                            <label className="block text-sm font-medium mb-2">Certifications *</label>
                            <Input
                              name="certifications"
                              required
                              value={formData.certifications}
                              onChange={handleChange}
                              placeholder="e.g., CHt, NGH Certified"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-3">Specialties * (select all that apply)</label>
                            <div className="flex flex-wrap gap-2">
                              {specialtyOptions.map((specialty) => (
                                <Badge
                                  key={specialty}
                                  variant={formData.specialties.includes(specialty) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleSpecialty(specialty)}
                                >
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Years of Experience</label>
                            <Input
                              name="yearsExperience"
                              type="number"
                              value={formData.yearsExperience}
                              onChange={handleChange}
                              placeholder="5"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">About You / Bio</label>
                            <textarea
                              name="bio"
                              value={formData.bio}
                              onChange={handleChange}
                              rows={4}
                              placeholder="Tell potential clients about your approach, experience, and what makes you unique..."
                              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                            />
                          </div>

                          <div className="space-y-3">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                name="acceptsInsurance"
                                checked={formData.acceptsInsurance}
                                onChange={handleChange}
                                className="rounded"
                              />
                              <span className="text-sm">I accept insurance</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                name="offersOnline"
                                checked={formData.offersOnline}
                                onChange={handleChange}
                                className="rounded"
                              />
                              <span className="text-sm">I offer online/virtual sessions</span>
                            </label>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg text-sm">
                            <p className="font-semibold mb-2">Launch Special - Free Access</p>
                            <p className="text-gray-700">
                              Join us and get free access for 6 months before our official launch as a founding practitioner.
                              All features are completely free during this pre-launch period. After official launch, premium features start at $29/month.
                            </p>
                          </div>

                          <div className="flex gap-4">
                            <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                              Back
                            </Button>
                            <Button type="submit" className="flex-1">
                              Complete Registration
                            </Button>
                          </div>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Already Have Account */}
              {step !== 4 && (
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                      Sign In
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
