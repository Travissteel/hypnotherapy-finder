'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const redirect = searchParams.get('redirect') || '/dashboard';
      router.push(redirect);
    }
  }, [user, router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        setError(error.message || 'Invalid email or password');
        setLoading(false);
      } else {
        // Success - redirect handled by useEffect
        const redirect = searchParams.get('redirect') || '/dashboard';
        router.push(redirect);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-16 pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Practitioner Sign In</CardTitle>
                <p className="text-center text-gray-600 mt-2">
                  Manage your profile and connect with clients
                </p>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="text-blue-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-gray-600 mb-4">Don't have an account?</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/practitioner-signup">Create Free Profile</Link>
                  </Button>
                </div>

                <div className="mt-6 bg-blue-50 p-4 rounded-lg text-sm">
                  <p className="font-semibold text-gray-900 mb-1">Pre-Launch Special - 100% Free!</p>
                  <p className="text-gray-700">
                    Join our founding practitioner community and get free access for 6 months before our official launch. All features free during this pre-launch period.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <p className="mb-2">Need help getting started?</p>
              <Link href="/contact" className="text-blue-600 hover:underline">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
