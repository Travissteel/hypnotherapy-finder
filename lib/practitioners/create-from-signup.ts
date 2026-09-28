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
 * Creates a practitioner listing for a newly-confirmed user and files a
 * pending claim on it — the same claims-review pipeline used to claim an
 * existing scraped listing (see app/api/claims POST), rather than
 * auto-approving. An admin approves via /admin/claims once the ownership
 * pixel (app/api/verify-pixel/[id]) confirms the practitioner controls the
 * website they listed, or on manual review otherwise. This is what keeps
 * spam/fake signups from instantly becoming "Verified Practitioner" listings.
 * Shared by POST /api/practitioners (same-session signup, no email
 * confirmation required) and app/auth/callback (post email-confirmation
 * signup).
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

  // user_profiles/claims inserts and the practitioners status update below
  // need to happen regardless of what RLS would otherwise allow this
  // brand-new, not-yet-linked user to do, so use the admin client.
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

  await adminClient.from('verification_logs').insert({
    claim_id: claim.id,
    user_id: userId,
    verification_type: 'email',
    status: 'sent',
  });

  // Mark the listing as pending review — mirrors what POST /api/claims does
  // for claiming an existing scraped listing. claim_status stays 'unclaimed'
  // until now so the practitioner insert above never had a moment of
  // looking claimed before a claim actually existed.
  const { data: pendingPractitioner, error: updateError } = await adminClient
    .from('practitioners')
    .update({ claim_status: 'pending' })
    .eq('id', practitioner.id)
    .select()
    .single();

  if (updateError) throw updateError;

  return pendingPractitioner;
}
