import { createClient } from '@supabase/supabase-js';

let _supabase: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  // Don't init Supabase during SSR/build.
  if (typeof window === 'undefined') return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env vars aren't present (local build / CI), analytics should no-op.
  if (!supabaseUrl || !supabaseAnonKey) return null;

  if (_supabase) return _supabase;
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
  return _supabase;
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

// Get user ID if authenticated
async function getUserId(): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.user?.id || null;
}

interface TrackPageViewParams {
  path: string;
  title?: string;
  referrer?: string;
}

/**
 * Track a page view
 */
export async function trackPageView(params: TrackPageViewParams) {
  try {
    const supabase = getSupabase();
    if (!supabase) return;

    const userId = await getUserId();
    const sessionId = getSessionId();

    await (supabase as any).rpc('track_page_view', {
      p_page_path: params.path,
      p_page_title: params.title || document.title,
      p_referrer: params.referrer || document.referrer,
      p_user_id: userId,
      p_session_id: sessionId,
      p_ip_address: null, // IP will be captured server-side
      p_user_agent: navigator.userAgent,
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

interface TrackSearchParams {
  query: string;
  filters?: Record<string, any>;
  resultsCount?: number;
}

/**
 * Track a search query
 */
export async function trackSearch(params: TrackSearchParams) {
  try {
    const supabase = getSupabase();
    if (!supabase) return;

    const userId = await getUserId();
    const sessionId = getSessionId();

    await (supabase as any).rpc('track_search_query', {
      p_query_text: params.query,
      p_filters: params.filters ? JSON.stringify(params.filters) : null,
      p_results_count: params.resultsCount || 0,
      p_user_id: userId,
      p_session_id: sessionId,
      p_ip_address: null,
    });
  } catch (error) {
    console.error('Failed to track search:', error);
  }
}

interface TrackPractitionerViewParams {
  practitionerId: string;
  source?: string;
  referrer?: string;
}

/**
 * Track a practitioner profile view
 */
export async function trackPractitionerView(params: TrackPractitionerViewParams) {
  try {
    const supabase = getSupabase();
    if (!supabase) return;

    const userId = await getUserId();
    const sessionId = getSessionId();

    await (supabase as any).rpc('track_practitioner_view', {
      p_practitioner_id: params.practitionerId,
      p_user_id: userId,
      p_session_id: sessionId,
      p_ip_address: null,
      p_source: params.source || 'direct',
      p_referrer: params.referrer || document.referrer,
    });
  } catch (error) {
    console.error('Failed to track practitioner view:', error);
  }
}

interface TrackContactClickParams {
  practitionerId: string;
  contactType: 'phone' | 'email' | 'website';
}

/**
 * Track when a user clicks a contact method
 */
export async function trackContactClick(params: TrackContactClickParams) {
  try {
    const supabase = getSupabase();
    if (!supabase) return;

    const sessionId = getSessionId();

    // Find the most recent practitioner view for this session
    const { data: recentView } = await (supabase as any)
      .from('practitioner_views')
      .select('id')
      .eq('practitioner_id', params.practitionerId)
      .eq('session_id', sessionId)
      .order('viewed_at', { ascending: false })
      .limit(1)
      .single();

    if (recentView) {
      // Update the view with the click event
      const updateField = `clicked_${params.contactType}`;
      await (supabase as any)
        .from('practitioner_views')
        // Supabase generated types can be overly strict for dynamic column updates.
        .update({ [updateField]: true })
        .eq('id', recentView.id);
    }
  } catch (error) {
    console.error('Failed to track contact click:', error);
  }
}

interface TrackClaimEventParams {
  claimId: string;
  practitionerId: string;
  eventType: 'created' | 'approved' | 'rejected' | 'disputed' | 'updated';
  eventData?: Record<string, any>;
  adminId?: string;
}

/**
 * Track claim-related events
 */
export async function trackClaimEvent(params: TrackClaimEventParams) {
  try {
    const supabase = getSupabase();
    if (!supabase) return;

    const userId = await getUserId();

    await (supabase as any).from('claim_events').insert({
      claim_id: params.claimId,
      practitioner_id: params.practitionerId,
      user_id: userId,
      event_type: params.eventType,
      event_data: params.eventData ? JSON.stringify(params.eventData) : null,
      admin_id: params.adminId || null,
    });
  } catch (error) {
    console.error('Failed to track claim event:', error);
  }
}

/**
 * Track search result click
 */
export async function trackSearchResultClick(searchId: string, practitionerId: string) {
  try {
    const supabase = getSupabase();
    if (!supabase) return;

    await (supabase as any)
      .from('search_queries')
      .update({
        result_clicked: true,
        clicked_practitioner_id: practitionerId,
      })
      .eq('id', searchId);
  } catch (error) {
    console.error('Failed to track search result click:', error);
  }
}
