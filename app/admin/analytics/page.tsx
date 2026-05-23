'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
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
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--hf-bg)' }}>
        <p style={{ color: 'var(--hf-fg-dim)', fontSize: 16 }}>Loading analytics...</p>
      </div>
    );
  }

  if (!profile?.is_admin) return null;

  const totalViews = stats?.dailyViews.reduce((sum: number, day: any) => sum + (day.total_views || 0), 0) || 0;
  const totalUsers = stats?.dailyViews[0]?.unique_users || 0;
  const totalSearches = stats?.topSearches.reduce((sum: number, search: any) => sum + (search.search_count || 0), 0) || 0;
  const totalClaims = stats?.claimFunnel[0]?.claims_created || 0;

  const cardStyle: React.CSSProperties = {
    background: 'var(--hf-bg-mid)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--hf-bg)', padding: '32px 16px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--hf-fg)' }}>Analytics Dashboard</h1>
          <p style={{ color: 'var(--hf-fg-dim)', marginTop: 6 }}>Track engagement, searches, and user behavior</p>
        </div>

        {/* Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total Page Views', value: totalViews.toLocaleString(), sub: 'Last 30 days' },
            { label: 'Unique Users', value: totalUsers.toLocaleString(), sub: 'Today' },
            { label: 'Total Searches', value: totalSearches.toLocaleString(), sub: 'All time' },
            { label: 'Claims Created', value: totalClaims.toLocaleString(), sub: 'Today' },
          ].map(({ label, value, sub }) => (
            <div key={label} style={cardStyle}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--hf-fg-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>{label}</p>
              <p style={{ fontSize: 32, fontWeight: 800, color: 'var(--hf-fg)' }}>{value}</p>
              <p style={{ fontSize: 12, color: 'var(--hf-fg-dim)', marginTop: 4 }}>{sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 24 }}>
          {/* Popular Pages */}
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 4 }}>Popular Pages</h2>
            <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', marginBottom: 20 }}>Most visited pages in the last 30 days</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {stats?.popularPages.map((page: any, index: number) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{page.page_path}</p>
                    <p style={{ fontSize: 11, color: 'var(--hf-fg-dim)' }}>{page.unique_viewers.toLocaleString()} unique viewers</p>
                  </div>
                  <div style={{ marginLeft: 16, textAlign: 'right' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--hf-fg)' }}>{page.view_count.toLocaleString()}</p>
                    <p style={{ fontSize: 11, color: 'var(--hf-fg-dim)' }}>views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Searches */}
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 4 }}>Top Search Queries</h2>
            <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', marginBottom: 20 }}>Most common search terms</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {stats?.topSearches.map((search: any, index: number) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{search.query_text}</p>
                    <p style={{ fontSize: 11, color: 'var(--hf-fg-dim)' }}>{search.avg_results.toFixed(0)} avg results</p>
                  </div>
                  <div style={{ marginLeft: 16, textAlign: 'right' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--hf-fg)' }}>{search.search_count.toLocaleString()}</p>
                    <p style={{ fontSize: 11, color: 'var(--hf-fg-dim)' }}>{search.click_through_rate}% CTR</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Viewed Practitioners */}
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 4 }}>Most Viewed Practitioners</h2>
            <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', marginBottom: 20 }}>Practitioners with the most profile views</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {stats?.topPractitioners.map((practitioner: any, index: number) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{practitioner.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--hf-fg-dim)' }}>{practitioner.city}, {practitioner.state}</p>
                  </div>
                  <div style={{ marginLeft: 16, textAlign: 'right' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--hf-fg)' }}>{practitioner.view_count.toLocaleString()}</p>
                    <p style={{ fontSize: 11, color: 'var(--hf-fg-dim)' }}>{practitioner.phone_clicks + practitioner.email_clicks + practitioner.website_clicks} contacts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Claim Funnel */}
          <div style={cardStyle}>
            <h2 style={{ fontWeight: 700, color: 'var(--hf-fg)', marginBottom: 4 }}>Claim Conversion Funnel</h2>
            <p style={{ fontSize: 13, color: 'var(--hf-fg-dim)', marginBottom: 20 }}>Claim approval rates over the last 30 days</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {stats?.claimFunnel.slice(0, 10).map((day: any, index: number) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--hf-fg)' }}>
                      {new Date(day.date).toLocaleDateString()}
                    </p>
                    <div style={{ display: 'flex', gap: 12, fontSize: 11, marginTop: 2 }}>
                      <span style={{ color: 'var(--hf-fg-dim)' }}>{day.claims_created} created</span>
                      <span style={{ color: 'oklch(0.7 0.15 145)' }}>{day.claims_approved} approved</span>
                      <span style={{ color: 'oklch(0.65 0.2 20)' }}>{day.claims_rejected} rejected</span>
                    </div>
                  </div>
                  <div style={{ marginLeft: 16, textAlign: 'right' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--hf-fg)' }}>{day.approval_rate || 0}%</p>
                    <p style={{ fontSize: 11, color: 'var(--hf-fg-dim)' }}>approval</p>
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
