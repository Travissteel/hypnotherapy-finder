-- ============================================
-- ANALYTICS TABLES
-- ============================================
-- Run this in Supabase SQL Editor to create analytics tracking

-- Page views tracking
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Page information
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,

  -- User information
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  ip_address TEXT,
  user_agent TEXT,

  -- Device information
  device_type TEXT, -- mobile, desktop, tablet
  browser TEXT,
  os TEXT,

  -- Location (optional)
  country TEXT,
  city TEXT,

  -- Timestamp
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for page views
CREATE INDEX idx_page_views_path ON page_views(page_path);
CREATE INDEX idx_page_views_user_id ON page_views(user_id);
CREATE INDEX idx_page_views_viewed_at ON page_views(viewed_at);
CREATE INDEX idx_page_views_session_id ON page_views(session_id);

-- Search queries tracking
CREATE TABLE IF NOT EXISTS search_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Search information
  query_text TEXT NOT NULL,
  filters JSONB, -- Store filters as JSON
  results_count INTEGER DEFAULT 0,

  -- User information
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  ip_address TEXT,

  -- Was a result clicked?
  result_clicked BOOLEAN DEFAULT FALSE,
  clicked_practitioner_id UUID REFERENCES practitioners(id) ON DELETE SET NULL,

  -- Timestamp
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for search queries
CREATE INDEX idx_search_queries_query_text ON search_queries(query_text);
CREATE INDEX idx_search_queries_user_id ON search_queries(user_id);
CREATE INDEX idx_search_queries_searched_at ON search_queries(searched_at);
CREATE INDEX idx_search_queries_session_id ON search_queries(session_id);

-- Practitioner profile views
CREATE TABLE IF NOT EXISTS practitioner_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Practitioner information
  practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,

  -- User information
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  ip_address TEXT,

  -- Source of visit
  source TEXT, -- search, direct, location-page, featured
  referrer TEXT,

  -- Actions taken
  clicked_phone BOOLEAN DEFAULT FALSE,
  clicked_email BOOLEAN DEFAULT FALSE,
  clicked_website BOOLEAN DEFAULT FALSE,

  -- Timestamp
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for practitioner views
CREATE INDEX idx_practitioner_views_practitioner_id ON practitioner_views(practitioner_id);
CREATE INDEX idx_practitioner_views_user_id ON practitioner_views(user_id);
CREATE INDEX idx_practitioner_views_viewed_at ON practitioner_views(viewed_at);
CREATE INDEX idx_practitioner_views_session_id ON practitioner_views(session_id);

-- Claim events tracking
CREATE TABLE IF NOT EXISTS claim_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Claim information
  claim_id UUID REFERENCES claims(id) ON DELETE CASCADE,
  practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Event information
  event_type TEXT NOT NULL, -- created, approved, rejected, disputed, updated
  event_data JSONB, -- Additional event data

  -- Admin who performed action (for approval/rejection)
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for claim events
CREATE INDEX idx_claim_events_claim_id ON claim_events(claim_id);
CREATE INDEX idx_claim_events_practitioner_id ON claim_events(practitioner_id);
CREATE INDEX idx_claim_events_user_id ON claim_events(user_id);
CREATE INDEX idx_claim_events_created_at ON claim_events(created_at);
CREATE INDEX idx_claim_events_event_type ON claim_events(event_type);

-- ============================================
-- ANALYTICS VIEWS
-- ============================================

-- Daily page views summary
CREATE OR REPLACE VIEW daily_page_views
WITH (security_invoker=true) AS
SELECT
  DATE(viewed_at) as date,
  COUNT(*) as total_views,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(DISTINCT session_id) as unique_sessions
FROM page_views
GROUP BY DATE(viewed_at)
ORDER BY date DESC;

-- Popular pages
CREATE OR REPLACE VIEW popular_pages
WITH (security_invoker=true) AS
SELECT
  page_path,
  COUNT(*) as view_count,
  COUNT(DISTINCT user_id) as unique_viewers,
  COUNT(DISTINCT session_id) as unique_sessions
FROM page_views
GROUP BY page_path
ORDER BY view_count DESC;

-- Top searched terms
CREATE OR REPLACE VIEW top_searches
WITH (security_invoker=true) AS
SELECT
  query_text,
  COUNT(*) as search_count,
  AVG(results_count) as avg_results,
  SUM(CASE WHEN result_clicked THEN 1 ELSE 0 END) as clicks,
  ROUND(SUM(CASE WHEN result_clicked THEN 1 ELSE 0 END)::numeric / COUNT(*)::numeric * 100, 2) as click_through_rate
FROM search_queries
GROUP BY query_text
ORDER BY search_count DESC;

-- Most viewed practitioners
CREATE OR REPLACE VIEW most_viewed_practitioners
WITH (security_invoker=true) AS
SELECT
  pv.practitioner_id,
  p.name,
  p.city,
  p.state,
  COUNT(*) as view_count,
  COUNT(DISTINCT pv.user_id) as unique_viewers,
  SUM(CASE WHEN pv.clicked_phone THEN 1 ELSE 0 END) as phone_clicks,
  SUM(CASE WHEN pv.clicked_email THEN 1 ELSE 0 END) as email_clicks,
  SUM(CASE WHEN pv.clicked_website THEN 1 ELSE 0 END) as website_clicks
FROM practitioner_views pv
JOIN practitioners p ON pv.practitioner_id = p.id
GROUP BY pv.practitioner_id, p.name, p.city, p.state
ORDER BY view_count DESC;

-- Claim funnel metrics
CREATE OR REPLACE VIEW claim_funnel
WITH (security_invoker=true) AS
SELECT
  DATE(created_at) as date,
  COUNT(*) FILTER (WHERE event_type = 'created') as claims_created,
  COUNT(*) FILTER (WHERE event_type = 'approved') as claims_approved,
  COUNT(*) FILTER (WHERE event_type = 'rejected') as claims_rejected,
  ROUND(
    COUNT(*) FILTER (WHERE event_type = 'approved')::numeric /
    NULLIF(COUNT(*) FILTER (WHERE event_type = 'created'), 0)::numeric * 100,
    2
  ) as approval_rate
FROM claim_events
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ============================================
-- ANALYTICS FUNCTIONS
-- ============================================

-- Function to track page view
CREATE OR REPLACE FUNCTION track_page_view(
  p_page_path TEXT,
  p_page_title TEXT DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL,
  p_user_id UUID DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_view_id UUID;
BEGIN
  INSERT INTO page_views (
    page_path,
    page_title,
    referrer,
    user_id,
    session_id,
    ip_address,
    user_agent
  )
  VALUES (
    p_page_path,
    p_page_title,
    p_referrer,
    p_user_id,
    p_session_id,
    p_ip_address,
    p_user_agent
  )
  RETURNING id INTO v_view_id;

  RETURN v_view_id;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_catalog;

-- Function to track search query
CREATE OR REPLACE FUNCTION track_search_query(
  p_query_text TEXT,
  p_filters JSONB DEFAULT NULL,
  p_results_count INTEGER DEFAULT 0,
  p_user_id UUID DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_search_id UUID;
BEGIN
  INSERT INTO search_queries (
    query_text,
    filters,
    results_count,
    user_id,
    session_id,
    ip_address
  )
  VALUES (
    p_query_text,
    p_filters,
    p_results_count,
    p_user_id,
    p_session_id,
    p_ip_address
  )
  RETURNING id INTO v_search_id;

  RETURN v_search_id;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_catalog;

-- Function to track practitioner view
CREATE OR REPLACE FUNCTION track_practitioner_view(
  p_practitioner_id UUID,
  p_user_id UUID DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_source TEXT DEFAULT 'direct',
  p_referrer TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_view_id UUID;
BEGIN
  INSERT INTO practitioner_views (
    practitioner_id,
    user_id,
    session_id,
    ip_address,
    source,
    referrer
  )
  VALUES (
    p_practitioner_id,
    p_user_id,
    p_session_id,
    p_ip_address,
    p_source,
    p_referrer
  )
  RETURNING id INTO v_view_id;

  RETURN v_view_id;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_catalog;

-- ============================================
-- ROW LEVEL SECURITY FOR ANALYTICS
-- ============================================

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE practitioner_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_events ENABLE ROW LEVEL SECURITY;

-- Only admins can view analytics data
CREATE POLICY "Admins can view all page views"
ON page_views FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can view all search queries"
ON search_queries FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can view all practitioner views"
ON practitioner_views FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can view all claim events"
ON claim_events FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));

-- Anyone can insert analytics (tracking)
CREATE POLICY "Anyone can track page views"
ON page_views FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can track searches"
ON search_queries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can track practitioner views"
ON practitioner_views FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can track claim events"
ON claim_events FOR INSERT
WITH CHECK (true);
