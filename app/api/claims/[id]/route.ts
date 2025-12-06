import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase/server';
import { sendClaimApprovedEmail, sendClaimRejectedEmail } from '@/lib/email/send-emails';

// GET /api/claims/[id] - Get specific claim
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createRouteHandlerClient();
    const { id } = await params;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: claim, error } = await supabase
      .from('claims')
      .select(`
        *,
        practitioner:practitioners(*),
        user:user_profiles(full_name, phone)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    // Check if user owns this claim or is admin
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();

    if (claim.user_id !== session.user.id && !profile?.is_admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ claim });
  } catch (error: any) {
    console.error('Error fetching claim:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch claim' },
      { status: 500 }
    );
  }
}

// PATCH /api/claims/[id] - Update claim (admin only for approval/rejection)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createRouteHandlerClient();
    const { id } = await params;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();

    if (!profile?.is_admin) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 });
    }

    const body = await request.json();
    const { status, admin_notes, rejection_reason } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    if (!['approved', 'rejected', 'pending', 'disputed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Get the claim with full details for email
    const { data: claim } = await supabase
      .from('claims')
      .select(`
        *,
        practitioner:practitioners(name, city, state),
        user:user_profiles(full_name)
      `)
      .eq('id', id)
      .single();

    if (!claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
    }

    // Update claim
    const { data: updatedClaim, error: updateError } = await supabase
      .from('claims')
      .update({
        status,
        admin_notes,
        rejection_reason: status === 'rejected' ? rejection_reason : null,
        reviewed_by: session.user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Create audit log
    await supabase.from('audit_logs').insert({
      admin_id: session.user.id,
      action: status === 'approved' ? 'approved_claim' : 'rejected_claim',
      resource_type: 'claim',
      resource_id: id,
      reason: admin_notes,
      changes: {
        status,
        rejection_reason,
      },
    });

    // Send email notification
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const userEmail = claim.verification_email || session.user.email;
      const practitionerName = claim.practitioner?.name || 'Unknown';
      const claimantName = claim.user?.full_name || 'User';
      const city = claim.practitioner?.city || '';
      const state = claim.practitioner?.state || '';

      if (status === 'approved' && userEmail) {
        await sendClaimApprovedEmail({
          to: userEmail,
          practitionerName,
          claimantName,
          city,
          state,
          dashboardUrl: `${baseUrl}/dashboard`,
          adminNotes: admin_notes,
        });
      } else if (status === 'rejected' && userEmail && rejection_reason) {
        await sendClaimRejectedEmail({
          to: userEmail,
          practitionerName,
          claimantName,
          city,
          state,
          rejectionReason: rejection_reason,
          contactUrl: `${baseUrl}/contact`,
          adminNotes: admin_notes,
        });
      }
    } catch (emailError: any) {
      // Log email error but don't fail the request
      console.error('Failed to send email notification:', emailError);
    }

    return NextResponse.json({ claim: updatedClaim });
  } catch (error: any) {
    console.error('Error updating claim:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update claim' },
      { status: 500 }
    );
  }
}
