import { resend, EMAIL_FROM, EMAIL_REPLY_TO } from './resend';
import ClaimApprovedEmail from '@/emails/templates/claim-approved';
import ClaimRejectedEmail from '@/emails/templates/claim-rejected';
import WelcomeEmail from '@/emails/templates/welcome';

interface SendClaimApprovedEmailParams {
  to: string;
  practitionerName: string;
  claimantName: string;
  city: string;
  state: string;
  dashboardUrl: string;
  practitionerSlug?: string;
  adminNotes?: string;
}

export async function sendClaimApprovedEmail(params: SendClaimApprovedEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      replyTo: EMAIL_REPLY_TO,
      to: params.to,
      subject: `Your claim has been approved! - ${params.practitionerName}`,
      react: ClaimApprovedEmail({
        practitionerName: params.practitionerName,
        claimantName: params.claimantName,
        city: params.city,
        state: params.state,
        dashboardUrl: params.dashboardUrl,
        practitionerSlug: params.practitionerSlug,
        adminNotes: params.adminNotes,
      }),
    });

    if (error) {
      console.error('Error sending claim approved email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('✅ Claim approved email sent:', data?.id);
    return { success: true, id: data?.id };
  } catch (error: any) {
    console.error('Error in sendClaimApprovedEmail:', error);
    throw error;
  }
}

interface SendClaimRejectedEmailParams {
  to: string;
  practitionerName: string;
  claimantName: string;
  city: string;
  state: string;
  rejectionReason: string;
  contactUrl: string;
  adminNotes?: string;
}

export async function sendClaimRejectedEmail(params: SendClaimRejectedEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      replyTo: EMAIL_REPLY_TO,
      to: params.to,
      subject: `Claim status update - ${params.practitionerName}`,
      react: ClaimRejectedEmail({
        practitionerName: params.practitionerName,
        claimantName: params.claimantName,
        city: params.city,
        state: params.state,
        rejectionReason: params.rejectionReason,
        contactUrl: params.contactUrl,
        adminNotes: params.adminNotes,
      }),
    });

    if (error) {
      console.error('Error sending claim rejected email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('✅ Claim rejected email sent:', data?.id);
    return { success: true, id: data?.id };
  } catch (error: any) {
    console.error('Error in sendClaimRejectedEmail:', error);
    throw error;
  }
}

interface SendWelcomeEmailParams {
  to: string;
  name: string;
  loginUrl: string;
}

export async function sendWelcomeEmail(params: SendWelcomeEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      replyTo: EMAIL_REPLY_TO,
      to: params.to,
      subject: 'Welcome to Hypnotherapy Finder!',
      react: WelcomeEmail({
        name: params.name,
        loginUrl: params.loginUrl,
      }),
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('✅ Welcome email sent:', data?.id);
    return { success: true, id: data?.id };
  } catch (error: any) {
    console.error('Error in sendWelcomeEmail:', error);
    throw error;
  }
}
