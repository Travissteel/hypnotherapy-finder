import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️ RESEND_API_KEY is not set. Email sending will not work.');
}

export const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-development');

export const EMAIL_FROM = process.env.EMAIL_FROM || 'Hypnotherapy Finder <noreply@hypnotherapy-finder.com>';
export const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || 'support@hypnotherapy-finder.com';
