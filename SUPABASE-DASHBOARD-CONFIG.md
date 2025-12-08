# Supabase Dashboard Configuration Guide

## Quick Setup Instructions

### 1. URL Configuration

Go to: **Supabase Dashboard > Authentication > URL Configuration**

#### Site URL

**For Development:**
```
http://localhost:3000
```

**For Production:**
```
https://your-vercel-app.vercel.app
```
OR your custom domain:
```
https://hypnotherapy-finder.com
```

#### Redirect URLs

Add ALL of the following URLs to the "Redirect URLs" list:

```
http://localhost:3000/**
https://your-vercel-app.vercel.app/**
https://*.vercel.app/**
https://hypnotherapy-finder.com/**
```

**Important:** The `/**` wildcard is necessary to allow redirects to any path within your domain.

---

### 2. Email Templates

Go to: **Supabase Dashboard > Authentication > Email Templates**

#### Confirm Signup Template

Click on "Confirm signup" and update the template:

**Replace:**
```
{{ .ConfirmationURL }}
```

**With:**
```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
```

**Full Template Example:**
```html
<h2>Confirm your signup</h2>

<p>Follow this link to confirm your account:</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Confirm your email</a></p>

<p>If you didn't sign up for an account, you can safely ignore this email.</p>
```

#### Magic Link Template (Optional)

Click on "Magic Link" and update:

**Replace:**
```
{{ .ConfirmationURL }}
```

**With:**
```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=magiclink
```

#### Change Email Address Template (Optional)

Click on "Change Email Address" and update:

**Replace:**
```
{{ .ConfirmationURL }}
```

**With:**
```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email_change
```

#### Reset Password Template (Optional)

Click on "Reset Password" and update:

**Replace:**
```
{{ .ConfirmationURL }}
```

**With:**
```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/reset-password
```

---

### 3. Email Settings

Go to: **Supabase Dashboard > Authentication > Providers > Email**

Make sure these settings are configured:

- **Enable Email provider:** ✅ Enabled
- **Confirm email:** ✅ Enabled (for spam protection)
- **Secure email change:** ✅ Enabled (recommended)
- **Double confirm email change:** ⬜ Disabled (optional, based on your preference)

---

### 4. Verification

After making changes, verify everything is correct:

1. **Site URL matches your environment:**
   - Development: `http://localhost:3000`
   - Production: Your actual domain

2. **Redirect URLs include wildcards:**
   - Local: `http://localhost:3000/**`
   - Production: `https://your-domain.com/**`
   - Vercel previews: `https://*.vercel.app/**`

3. **Email templates use `/auth/confirm` route:**
   - NOT `/auth/callback`
   - Uses `token_hash` parameter
   - Uses `type` parameter

4. **Environment variables match:**
   - `NEXT_PUBLIC_SITE_URL` in `.env.local` matches Site URL

---

### 5. Testing

Test the email confirmation flow:

1. Sign up with a new email address
2. Check the confirmation email
3. Verify the link points to your correct domain
4. Click the link and ensure it redirects properly
5. Verify practitioner profile is created

**Expected Flow:**
```
User signs up → Email sent → User clicks link →
/auth/confirm validates token → Profile created →
Redirected to dashboard
```

---

### Troubleshooting

**Problem:** Email link redirects to wrong domain

**Solution:** Check Site URL in Supabase dashboard matches your domain

---

**Problem:** "Invalid redirect URL" error

**Solution:** Ensure exact URL is in Redirect URLs list (including wildcards)

---

**Problem:** Email template variables not working

**Solution:** Use exact variable names:
- `{{ .SiteURL }}` - Your site URL
- `{{ .TokenHash }}` - The verification token
- `{{ .ConfirmationURL }}` - Supabase default (don't use this)

---

**Problem:** Email confirmation link expires

**Solution:** Supabase email tokens expire after 24 hours by default. Users must click the link within this timeframe.

---

### Production Deployment Checklist

Before deploying to production:

- [ ] Update Site URL to production domain
- [ ] Add production domain to Redirect URLs with wildcard
- [ ] Set `NEXT_PUBLIC_SITE_URL` environment variable in Vercel
- [ ] Test email confirmation flow in production
- [ ] Verify database triggers are active
- [ ] Check that email templates use production domain

---

### Environment-Specific Configuration

#### Development (localhost)
```
Site URL: http://localhost:3000
Redirect URLs: http://localhost:3000/**
NEXT_PUBLIC_SITE_URL: http://localhost:3000
```

#### Production (Vercel)
```
Site URL: https://your-app.vercel.app
Redirect URLs:
  - https://your-app.vercel.app/**
  - https://*.vercel.app/**  (for preview deployments)
NEXT_PUBLIC_SITE_URL: https://your-app.vercel.app
```

#### Production (Custom Domain)
```
Site URL: https://hypnotherapy-finder.com
Redirect URLs:
  - https://hypnotherapy-finder.com/**
  - https://www.hypnotherapy-finder.com/**
  - https://your-app.vercel.app/**  (keep as fallback)
  - https://*.vercel.app/**  (for preview deployments)
NEXT_PUBLIC_SITE_URL: https://hypnotherapy-finder.com
```

---

### Important Notes

1. **Changes take effect immediately** - No need to restart Supabase
2. **Wildcards are supported** - Use `**` for path matching
3. **Email templates are global** - Not environment-specific
4. **Site URL determines default redirect** - When no redirectTo is specified
5. **Redirect URLs must match exactly** - Including protocol (http/https)

---

### Support

If you encounter issues:
1. Check Supabase logs: Dashboard > Logs > Auth Logs
2. Check browser console for errors
3. Verify environment variables are set correctly
4. Ensure database triggers are active
5. Test with a different email address

For more information:
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Redirect URLs Documentation](https://supabase.com/docs/guides/auth/redirect-urls)
- [Email Templates Documentation](https://supabase.com/docs/guides/auth/auth-email-templates)
