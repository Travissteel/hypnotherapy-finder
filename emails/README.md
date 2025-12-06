# Email System Documentation

This directory contains email templates and configuration for the Hypnotherapy Directory application.

## Setup

### 1. Get Resend API Key

1. Go to [Resend](https://resend.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `re_`)

### 2. Configure Environment Variables

Add to `.env.local`:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
EMAIL_FROM=Hypnotherapy Finder <noreply@hypnotherapy-finder.com>
EMAIL_REPLY_TO=support@hypnotherapy-finder.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Verify Domain (Production)

For production, you need to verify your sending domain:

1. Go to Resend Dashboard → Domains
2. Add your domain (e.g., `hypnotherapy-finder.com`)
3. Add the DNS records provided by Resend
4. Wait for verification
5. Update `EMAIL_FROM` to use your verified domain

## Email Templates

### Available Templates

1. **claim-approved.tsx** - Sent when a claim is approved
2. **claim-rejected.tsx** - Sent when a claim is rejected
3. **welcome.tsx** - Sent when a user signs up

### Template Structure

All templates use React Email components for consistent rendering across email clients.

```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
```

## Usage

### Sending Emails

Import the email functions from `@/lib/email/send-emails`:

```typescript
import {
  sendClaimApprovedEmail,
  sendClaimRejectedEmail,
  sendWelcomeEmail,
} from '@/lib/email/send-emails';

// Send claim approved email
await sendClaimApprovedEmail({
  to: 'user@example.com',
  practitionerName: 'Dr. Smith',
  claimantName: 'John Doe',
  city: 'Los Angeles',
  state: 'California',
  dashboardUrl: 'https://hypnotherapy-finder.com/dashboard',
  adminNotes: 'Optional admin notes',
});
```

### Automatic Email Sending

Emails are automatically sent when:

- **Claim Approved**: Admin approves a claim → User receives approval email
- **Claim Rejected**: Admin rejects a claim → User receives rejection email with reason

This is handled in `/app/api/claims/[id]/route.ts`

## Testing Emails

### Development Mode

In development, emails won't actually send unless you have a valid `RESEND_API_KEY`.

To test email templates visually:

```bash
npm run email
```

This starts the React Email dev server at http://localhost:3000

### Preview Templates

You can preview email templates at:

- http://localhost:3000/claim-approved
- http://localhost:3000/claim-rejected
- http://localhost:3000/welcome

## Email Features

### Claim Approved Email

- Congratulatory message
- Practitioner and location details
- Optional admin notes
- Direct link to dashboard
- Professional branding

### Claim Rejected Email

- Polite rejection notification
- Clear rejection reason
- Optional additional information
- Guidance on next steps
- Contact support link

### Welcome Email

- Warm welcome message
- Overview of features
- Direct login link
- Support information

## Troubleshooting

### Emails Not Sending

1. Check `RESEND_API_KEY` is set in `.env.local`
2. Verify API key is valid (check Resend dashboard)
3. Check server logs for error messages
4. Ensure recipient email is valid

### Emails Going to Spam

1. Verify your domain in Resend
2. Set up SPF, DKIM, and DMARC records
3. Use a professional `EMAIL_FROM` address
4. Avoid spam trigger words in subject/body

### Domain Not Verified

In development, you can send from any email. In production:

1. Add your domain in Resend Dashboard
2. Add required DNS records
3. Wait for verification (can take up to 48 hours)
4. Update `EMAIL_FROM` to use verified domain

## Best Practices

1. **Always provide fallback values** for template props
2. **Keep email templates simple** - complex CSS may not render
3. **Test across email clients** - Gmail, Outlook, Apple Mail
4. **Include plain text alternatives** - Resend handles this automatically
5. **Use transactional email domain** - Not your main website domain
6. **Monitor email metrics** - Open rates, bounce rates in Resend dashboard
7. **Respect user preferences** - Honor unsubscribe requests

## Cost

Resend Pricing (as of 2024):

- **Free Tier**: 3,000 emails/month
- **Pro**: $20/month for 50,000 emails
- **Business**: $80/month for 200,000 emails

For most directories, the free tier is sufficient to start.

## Production Checklist

- [ ] Get Resend API key
- [ ] Verify custom domain
- [ ] Update `EMAIL_FROM` to verified domain
- [ ] Update `EMAIL_REPLY_TO` to monitored inbox
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production URL
- [ ] Test all email templates
- [ ] Set up email monitoring
- [ ] Configure bounce handling
- [ ] Add unsubscribe functionality (if needed)

## Support

- [Resend Documentation](https://resend.com/docs)
- [React Email Documentation](https://react.email/docs)
- [Email Support](mailto:support@hypnotherapy-finder.com)
