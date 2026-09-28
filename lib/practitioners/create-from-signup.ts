import type { SupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/server';

export interface SignupProfileData {
  name?: string;
  firstName?: string;
  lastName?: string;
  credentials?: string;
  email: string;
  phone?: string;
  website?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  bio?: string;
  specialties?: string[];
  yearsExperience?: string | number;
  acceptsInsurance?: boolean;
  offersOnline?: boolean;
}

/**
 * Creates a practitioner listing for a newly-confirmed user and fast-tracks
 * it through the claims-approval pipeline (see on_claim_approved trigger in
 * supabase/schema.sql), which is what actually sets claim_status='claimed',
 * verified, and increments user_profiles.claimed_listings_count. Shared by
 * POST /api/practitioners (same-session signup, no email confirmation
 * required) and app/auth/callback (post email-confirmation signup).
 */
export async function createPractitionerFromSignup(
  supabase: SupabaseClient,
  userId: string,
  data: SignupProfileData
) {
  const name = data.name || `${data.firstName ?? ''} ${data.lastName ?? ''}`.trim();

  const insertData = {
    name,
    credentials: data.credentials ? [data.credentials] : [],
    email: data.email,
    phone: data.phone,
    website: data.website || null,
    address: data.street,
    city: data.city,
    state: data.state,
    zip: data.zipCode,
    bio: data.bio || null,
    specialties: data.specialties || [],
    years_experience: data.yearsExperience ? parseInt(String(data.yearsExperience)) : null,
    session_types: data.offersOnline ? ['in-person', 'online'] : ['in-person'],
    insurance_accepted: data.acceptsInsurance ? ['Insurance accepted'] : [],
    certifications: data.credentials ? [data.credentials] : [],
    profile_completeness: 60,
  };

  const { data: practitioner, error } = await supabase
    .from('practitioners')
    .insert(insertData)
    .select()
    .single();

  if (error) throw error;

  // Claims can only be approved by an admin (RLS), so use the admin client
  // for the auto-approval step below — a self-registered practitioner has
  // no pre-existing listing to dispute, so their own claim is fast-tracked.
  const adminClient = createAdminClient();

  const { data: existingProfile } = await adminClient
    .from('user_profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle();

  if (!existingProfile) {
    await adminClient.from('user_profiles').insert({
      id: userId,
      full_name: name || data.email?.split('@')[0] || 'User',
      user_type: 'practitioner',
      is_practitioner: false,
      is_admin: false,
    });
  }

  const { data: claim, error: claimError } = await adminClient
    .from('claims')
    .insert({
      practitioner_id: practitioner.id,
      user_id: userId,
      claim_method: 'email',
      verification_email: data.email,
      status: 'pending',
    })
    .select()
    .single();

  if (claimError) throw claimError;

  const { error: approveError } = await adminClient
    .from('claims')
    .update({
      status: 'approved',
      reviewed_at: new Date().toISOString(),
      admin_notes: 'Auto-approved: self-registered listing',
    })
    .eq('id', claim.id);

  if (approveError) throw approveError;

  // Re-fetch so the caller sees the claim_status/verified fields the
  // on_claim_approved trigger just set.
  const { data: claimedPractitioner, error: refetchError } = await supabase
    .from('practitioners')
    .select()
    .eq('id', practitioner.id)
    .single();

  if (refetchError) throw refetchError;

  return claimedPractitioner;
}
