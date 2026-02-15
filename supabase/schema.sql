-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search

-- ============================================
-- PRACTITIONERS TABLE
-- ============================================
CREATE TABLE practitioners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Basic Information
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  website TEXT,

  -- Professional Information
  credentials TEXT[],
  specialties TEXT[],
  bio TEXT,
  years_experience INTEGER,

  -- Location
  address TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT,
  country TEXT DEFAULT 'United States',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- Session & Pricing
  session_types TEXT[], -- in-person, online, hybrid
  insurance_accepted TEXT[],
  price_range TEXT, -- $, $$, $$$, $$$$
  consultation_free BOOLEAN DEFAULT false,

  -- Additional Details
  languages TEXT[],
  certifications TEXT[],
  memberships TEXT[],

  -- Ratings & Reviews
  rating DECIMAL(2, 1),
  review_count INTEGER DEFAULT 0,

  -- Claim Status
  claim_status TEXT DEFAULT 'unclaimed' CHECK (claim_status IN ('unclaimed', 'claimed', 'pending', 'rejected')),
  claimed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  claim_date TIMESTAMP WITH TIME ZONE,
  verified BOOLEAN DEFAULT false,
  verification_date TIMESTAMP WITH TIME ZONE,

  -- Profile Enhancement
  profile_photo_url TEXT,
  profile_completeness INTEGER DEFAULT 0, -- Percentage 0-100
  featured BOOLEAN DEFAULT false,

  -- SEO & Metadata
  slug TEXT UNIQUE,
  meta_description TEXT,

  -- Source tracking
  data_source TEXT DEFAULT 'scraped', -- scraped, user_created, imported
  source_url TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for practitioners
CREATE INDEX idx_practitioners_city ON practitioners(city);
CREATE INDEX idx_practitioners_state ON practitioners(state);
CREATE INDEX idx_practitioners_claim_status ON practitioners(claim_status);
CREATE INDEX idx_practitioners_claimed_by ON practitioners(claimed_by);
CREATE INDEX idx_practitioners_slug ON practitioners(slug);
CREATE INDEX idx_practitioners_email ON practitioners(email);
CREATE INDEX idx_practitioners_specialties ON practitioners USING GIN(specialties);
CREATE INDEX idx_practitioners_name_trgm ON practitioners USING GIN(name gin_trgm_ops);

-- ============================================
-- CLAIMS TABLE
-- ============================================
CREATE TABLE claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Relationships
  practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Claim Details
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'disputed')),
  claim_method TEXT CHECK (claim_method IN ('email', 'phone', 'document')),

  -- Verification Data
  verification_email TEXT,
  verification_phone TEXT,
  verification_code TEXT,
  verification_token TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,

  -- Supporting Documents
  document_urls TEXT[],
  license_number TEXT,

  -- Review & Notes
  admin_notes TEXT,
  rejection_reason TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  UNIQUE(practitioner_id, user_id)
);

-- Indexes for claims
CREATE INDEX idx_claims_practitioner_id ON claims(practitioner_id);
CREATE INDEX idx_claims_user_id ON claims(user_id);
CREATE INDEX idx_claims_status ON claims(status);
CREATE INDEX idx_claims_created_at ON claims(created_at);

-- ============================================
-- USER PROFILES TABLE
-- ============================================
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- User Type
  user_type TEXT DEFAULT 'practitioner' CHECK (user_type IN ('practitioner', 'admin', 'client')),

  -- Basic Info
  full_name TEXT,
  phone TEXT,

  -- Practitioner-specific
  is_practitioner BOOLEAN DEFAULT true,
  claimed_listings_count INTEGER DEFAULT 0,

  -- Admin-specific
  is_admin BOOLEAN DEFAULT false,
  admin_level TEXT CHECK (admin_level IN ('super', 'moderator', 'viewer')),

  -- Preferences
  email_notifications BOOLEAN DEFAULT true,
  marketing_emails BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for user profiles
CREATE INDEX idx_user_profiles_user_type ON user_profiles(user_type);
CREATE INDEX idx_user_profiles_is_admin ON user_profiles(is_admin);

-- ============================================
-- VERIFICATION LOGS TABLE
-- ============================================
CREATE TABLE verification_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Relationships
  claim_id UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Verification Details
  verification_type TEXT NOT NULL CHECK (verification_type IN ('email', 'phone', 'sms', 'document')),
  verification_method TEXT,
  status TEXT NOT NULL CHECK (status IN ('sent', 'verified', 'failed', 'expired')),

  -- Tracking
  attempts INTEGER DEFAULT 1,
  ip_address TEXT,
  user_agent TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Index for verification logs
CREATE INDEX idx_verification_logs_claim_id ON verification_logs(claim_id);
CREATE INDEX idx_verification_logs_user_id ON verification_logs(user_id);
CREATE INDEX idx_verification_logs_status ON verification_logs(status);

-- ============================================
-- ADMIN AUDIT LOGS TABLE
-- ============================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Who & What
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- approved_claim, rejected_claim, verified_practitioner, etc.
  resource_type TEXT NOT NULL, -- claim, practitioner, user
  resource_id UUID NOT NULL,

  -- Details
  changes JSONB, -- Store before/after state
  reason TEXT,
  ip_address TEXT,

  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for audit logs
CREATE INDEX idx_audit_logs_admin_id ON audit_logs(admin_id);
CREATE INDEX idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX idx_audit_logs_resource_id ON audit_logs(resource_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_catalog;

-- Triggers for updated_at
CREATE TRIGGER update_practitioners_updated_at BEFORE UPDATE ON practitioners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON claims
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'practitioner')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_catalog;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update practitioner claim status when claim is approved
CREATE OR REPLACE FUNCTION public.handle_claim_approval()
RETURNS TRIGGER AS $$
DECLARE
  practitioner_record RECORD;
BEGIN
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    -- Get practitioner details
    SELECT name, city, state INTO practitioner_record
    FROM practitioners
    WHERE id = NEW.practitioner_id;

    -- Update practitioner with claim info AND auto-generate slug
    UPDATE practitioners
    SET
      claim_status = 'claimed',
      claimed_by = NEW.user_id,
      claim_date = NOW(),
      verified = true,
      verification_date = NOW(),
      -- Auto-generate slug if missing
      slug = COALESCE(
        NULLIF(slug, ''),  -- Keep existing slug if not empty
        generate_slug(practitioner_record.name, practitioner_record.city, practitioner_record.state)  -- Generate new slug
      )
    WHERE id = NEW.practitioner_id;

    -- Update user profile
    UPDATE user_profiles
    SET claimed_listings_count = claimed_listings_count + 1
    WHERE id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public, pg_catalog;

-- Trigger for claim approval
CREATE TRIGGER on_claim_approved
  AFTER UPDATE ON claims
  FOR EACH ROW
  WHEN (NEW.status = 'approved' AND OLD.status != 'approved')
  EXECUTE FUNCTION public.handle_claim_approval();

-- Function to generate slug from name
CREATE OR REPLACE FUNCTION generate_slug(name TEXT, city TEXT, state TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Create base slug
  base_slug := lower(regexp_replace(name || '-' || city || '-' || state, '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  final_slug := base_slug;

  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM practitioners WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;

  RETURN final_slug;
END;
$$ LANGUAGE plpgsql
SET search_path = public, pg_catalog;

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Practitioners: Public read access
CREATE POLICY "Practitioners are viewable by everyone"
  ON practitioners FOR SELECT
  USING (true);

-- Practitioners: Only claimed practitioner or admin can update
CREATE POLICY "Practitioners can be updated by owner or admin"
  ON practitioners FOR UPDATE
  USING (
    claimed_by = auth.uid() OR
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Claims: Users can view their own claims
CREATE POLICY "Users can view their own claims"
  ON claims FOR SELECT
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));

-- Claims: Users can create claims
CREATE POLICY "Users can create claims"
  ON claims FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Claims: Only admins can update claims
CREATE POLICY "Admins can update claims"
  ON claims FOR UPDATE
  USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));

-- User Profiles: Users can view their own profile
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (id = auth.uid() OR EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));

-- User Profiles: Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (id = auth.uid());

-- Verification Logs: Users can view their own logs
CREATE POLICY "Users can view their own verification logs"
  ON verification_logs FOR SELECT
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));

-- Audit Logs: Only admins can view
CREATE POLICY "Admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================
-- HELPFUL VIEWS
-- ============================================

-- View for pending claims with practitioner details
CREATE VIEW pending_claims_view
WITH (security_invoker=true) AS
SELECT
  c.*,
  p.name as practitioner_name,
  p.email as practitioner_email,
  p.city,
  p.state,
  up.full_name as claimant_name,
  up.phone as claimant_phone
FROM claims c
JOIN practitioners p ON c.practitioner_id = p.id
JOIN user_profiles up ON c.user_id = up.id
WHERE c.status = 'pending'
ORDER BY c.created_at ASC;

-- View for practitioner statistics
CREATE VIEW practitioner_stats
WITH (security_invoker=true) AS
SELECT
  p.id,
  p.name,
  p.claim_status,
  p.review_count,
  p.rating,
  COUNT(DISTINCT c.id) as total_claims,
  COUNT(DISTINCT c.id) FILTER (WHERE c.status = 'pending') as pending_claims
FROM practitioners p
LEFT JOIN claims c ON p.id = c.practitioner_id
GROUP BY p.id, p.name, p.claim_status, p.review_count, p.rating;
