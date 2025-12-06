'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AnalyticsDashboard() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login?redirect=/admin/analytics');
      } else if (profile && !profile.is_admin) {
        router.push('/dashboard');
      } else {
        fetchAnalytics();
      }
    }
  }, [user, profile, authLoading, router]);

  const fetchAnalytics = async () => {
    try {
      // Fetch various analytics
      const [
        { data: dailyViews },
        { data: popularPages },
        { data: topSearches },
        { data: topPractitioners },
        { data: claimFunnel },
      ] = await Promise.all([
        supabase.from('daily_page_views').select('*').limit(30),
        supabase.from('popular_pages').select('*').limit(10),
        supabase.from('top_searches').select('*').limit(10),
        supabase.from('most_viewed_practitioners').select('*').limit(10),
        supabase.from('claim_funnel').select('*').limit(30),
      ]);

      setStats({
        dailyViews: dailyViews || [],
        popularPages: popularPages || [],
        topSearches: topSearches || [],
        topPractitioners: topPractitioners || [],
        claimFunnel: claimFunnel || [],
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading analytics...</p>
      </div>
    );
  }

  if (!profile?.is_admin) {
    return null;
  }

  const totalViews = stats?.dailyViews.reduce((sum: number, day: any) => sum + (day.total_views || 0), 0) || 0;
  const totalUsers = stats?.dailyViews[0]?.unique_users || 0;
  const totalSearches = stats?.topSearches.reduce((sum: number, search: any) => sum + (search.search_count || 0), 0) || 0;
  const totalClaims = stats?.claimFunnel[0]?.claims_created || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Track engagement, searches, and user behavior</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalViews.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Unique Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalSearches.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Claims Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalClaims.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Pages</CardTitle>
              <CardDescription>Most visited pages in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats?.popularPages.map((page: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{page.page_path}</p>
                      <p className="text-xs text-gray-500">
                        {page.unique_viewers.toLocaleString()} unique viewers
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {page.view_count.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Searches */}
          <Card>
            <CardHeader>
              <CardTitle>Top Search Queries</CardTitle>
              <CardDescription>Most common search terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats?.topSearches.map((search: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{search.query_text}</p>
                      <p className="text-xs text-gray-500">
                        {search.avg_results.toFixed(0)} avg results
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {search.search_count.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {search.click_through_rate}% CTR
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Most Viewed Practitioners */}
          <Card>
            <CardHeader>
              <CardTitle>Most Viewed Practitioners</CardTitle>
              <CardDescription>Practitioners with the most profile views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats?.topPractitioners.map((practitioner: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {practitioner.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {practitioner.city}, {practitioner.state}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {practitioner.view_count.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {practitioner.phone_clicks + practitioner.email_clicks + practitioner.website_clicks} contacts
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Claim Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Claim Conversion Funnel</CardTitle>
              <CardDescription>Claim approval rates over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats?.claimFunnel.slice(0, 10).map((day: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(day.date).toLocaleDateString()}
                      </p>
                      <div className="flex gap-4 text-xs text-gray-500 mt-1">
                        <span>{day.claims_created} created</span>
                        <span className="text-green-600">{day.claims_approved} approved</span>
                        <span className="text-red-600">{day.claims_rejected} rejected</span>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {day.approval_rate || 0}%
                      </p>
                      <p className="text-xs text-gray-500">approval</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
