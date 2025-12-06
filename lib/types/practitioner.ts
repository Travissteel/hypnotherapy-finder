export interface Practitioner {
  id: string;

  // Basic Information
  name: string;
  email?: string;
  phone?: string;
  website?: string;

  // Professional Information
  credentials?: string[];
  specialties: string[];
  bio?: string;
  years_experience?: number;

  // Location
  address?: string;
  city: string;
  state: string;
  zip?: string;
  country?: string;
  latitude?: number;
  longitude?: number;

  // Session & Pricing
  session_types?: string[]; // 'in-person', 'online', 'hybrid'
  insurance_accepted?: string[];
  price_range?: string; // '$', '$$', '$$$', '$$$$'
  consultation_free?: boolean;

  // Additional Details
  languages?: string[];
  certifications?: string[];
  memberships?: string[];

  // Ratings & Reviews
  rating?: number;
  review_count?: number;

  // Claim Status
  claim_status: 'unclaimed' | 'claimed' | 'pending' | 'rejected';
  claimed_by?: string;
  claim_date?: string;
  verified?: boolean;
  verification_date?: string;

  // Profile Enhancement
  profile_photo_url?: string;
  profile_completeness?: number;
  featured?: boolean;

  // SEO & Metadata
  slug: string;
  meta_description?: string;

  // Source tracking
  data_source?: string;
  source_url?: string;

  // Timestamps
  created_at?: string;
  updated_at?: string;

  // Legacy fields for backward compatibility
  title?: string;
  street?: string;
  categoryname?: string;
  citySlug?: string;
  sessionType?: 'in-person' | 'virtual' | 'both';
  acceptsInsurance?: boolean;
  insuranceProviders?: string[];
  sessionPrice?: number;
  yearsExperience?: number;
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  acceptingNewClients?: boolean;
}

export interface Claim {
  id: string;
  practitioner_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'disputed';
  claim_method?: 'email' | 'phone' | 'document';
  verification_email?: string;
  verification_phone?: string;
  verification_code?: string;
  verification_token?: string;
  verified_at?: string;
  document_urls?: string[];
  license_number?: string;
  admin_notes?: string;
  rejection_reason?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_type: 'practitioner' | 'admin' | 'client';
  full_name?: string;
  phone?: string;
  is_practitioner: boolean;
  claimed_listings_count: number;
  is_admin: boolean;
  admin_level?: 'super' | 'moderator' | 'viewer';
  email_notifications: boolean;
  marketing_emails: boolean;
  created_at: string;
  updated_at: string;
}

export interface City {
  name: string;
  state: string;
  slug: string;
  practitionerCount: number;
}
