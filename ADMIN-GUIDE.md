# 📊 Admin Guide - Where to Check Everything

Complete guide to monitoring your hypnotherapy directory.

---

## 🔐 Step 1: Create Your Admin Account

### First Time Setup:

1. **Sign up** at your live site or http://localhost:3000/practitioner-signup
2. **Go to Supabase**: https://app.supabase.com/project/cprlplsmgznmyzwcusro/editor
3. **Open Table Editor** → Select `user_profiles` table
4. **Find your user** (search by email)
5. **Click to edit** your user record
6. **Set these fields:**
   - `is_admin` = `true` (checkbox)
   - `admin_level` = `super` (dropdown)
7. **Save changes**
8. **Log out and log back in** to activate admin privileges

---

## 📧 Where to Check Emails

### Resend Dashboard (Email Sending Service)

**URL:** https://resend.com/emails

**What you'll see:**
- All sent emails (claim approvals, rejections, welcome emails)
- Delivery status (delivered, bounced, failed)
- Open rates and click tracking
- Email content preview

**API Key:** Already configured in your `.env.local`
```
RESEND_API_KEY=re_RtmAaZaD_C552oVQr9ufUkFs4dFyMDncj
```

### Email Types Sent Automatically:

1. **Claim Approved** - Sent when you approve a claim
2. **Claim Rejected** - Sent when you reject a claim (with reason)
3. **Welcome Email** - (Optional) Can be sent on user signup

### Test Email Sending:

1. Go to http://localhost:3000/admin/claims (or your live site)
2. Approve or reject a test claim
3. Check Resend dashboard to see the email
4. Check your email inbox to see it delivered

---

## 👥 Where to Check New User Profiles

### Supabase Table Editor

**URL:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/editor

### Tables to Monitor:

#### 1. **`user_profiles`** - All registered users
- **Location:** Table Editor → `user_profiles`
- **What you see:**
  - User ID, email (from auth)
  - Full name, phone
  - User type (practitioner, admin, client)
  - Admin status
  - Creation date
  - Total claimed listings

**Filter to see new users:**
```sql
ORDER BY created_at DESC
```

#### 2. **`auth.users`** - Authentication data
- **Location:** Authentication → Users
- **What you see:**
  - Email addresses
  - Sign-up date
  - Email confirmation status
  - Last sign-in

**To view:**
Go to Supabase → Authentication → Users

---

## 📋 Where to Check New Claims

### Option 1: Admin Dashboard (Best for managing)

**URL:** http://localhost:3000/admin/claims (or your live site URL)

**What you see:**
- **Pending Claims** (left column)
  - Practitioner name and location
  - Who claimed it (user's name and email)
  - Submission date
  - Approve/Reject buttons

- **Recent Activity** (right column)
  - Recently approved claims
  - Recently rejected claims
  - Admin notes
  - Review dates

**Actions you can take:**
- Approve claims (sends email to user)
- Reject claims with reason (sends email with reason)
- Add admin notes for internal tracking

### Option 2: Supabase Database (For detailed data)

**URL:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/editor

**Table:** `claims`

**What you see:**
- Claim ID
- Practitioner ID (links to practitioner)
- User ID (who claimed it)
- Status: pending, approved, rejected
- Verification email/phone
- Admin notes
- Reviewed by (admin ID)
- Created date, reviewed date

**Useful SQL queries:**

See all pending claims:
```sql
SELECT * FROM claims WHERE status = 'pending' ORDER BY created_at DESC
```

See approved claims:
```sql
SELECT * FROM claims WHERE status = 'approved' ORDER BY created_at DESC
```

Count claims by status:
```sql
SELECT status, COUNT(*) FROM claims GROUP BY status
```

### Option 3: Pending Claims View (Pre-made query)

**Table:** `pending_claims_view`

This view automatically joins claims with practitioner and user data:
```sql
SELECT * FROM pending_claims_view
```

Shows:
- All pending claims
- Practitioner name, email, city, state
- Claimant name and phone
- Sorted by submission date

---

## 📊 Where to Check Analytics

### Option 1: Admin Analytics Dashboard (Best for insights)

**URL:** http://localhost:3000/admin/analytics (or your live site URL)

**What you see:**

#### Summary Cards:
- **Total Page Views** (last 30 days)
- **Unique Users** (today)
- **Total Searches** (all time)
- **Claims Created** (today)

#### Popular Pages:
- Top 10 most visited pages
- View counts
- Unique viewers

#### Top Search Queries:
- Most searched terms
- Average results per search
- Click-through rate (CTR)

#### Most Viewed Practitioners:
- Practitioners with most profile views
- Unique viewers
- Contact clicks (phone, email, website)

#### Claim Conversion Funnel:
- Claims created per day
- Approval/rejection rates
- Conversion metrics

### Option 2: Supabase Database (For raw data)

**URL:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/editor

**Analytics Tables:**

#### 1. `page_views` - Every page visit
```sql
SELECT * FROM page_views ORDER BY viewed_at DESC LIMIT 100
```
Shows: page path, user, session, timestamp, device info

#### 2. `search_queries` - All searches
```sql
SELECT * FROM search_queries ORDER BY searched_at DESC LIMIT 100
```
Shows: query text, filters, results count, clicked results

#### 3. `practitioner_views` - Profile views
```sql
SELECT * FROM practitioner_views ORDER BY viewed_at DESC LIMIT 100
```
Shows: which practitioners were viewed, contact clicks

#### 4. `claim_events` - Claim lifecycle
```sql
SELECT * FROM claim_events ORDER BY created_at DESC LIMIT 100
```
Shows: claim created, approved, rejected events

**Pre-made Analytics Views:**

Daily summary:
```sql
SELECT * FROM daily_page_views ORDER BY date DESC
```

Popular searches:
```sql
SELECT * FROM top_searches LIMIT 20
```

Top practitioners:
```sql
SELECT * FROM most_viewed_practitioners LIMIT 20
```

Conversion funnel:
```sql
SELECT * FROM claim_funnel ORDER BY date DESC
```

---

## 📁 Where to Check Uploaded Files

### Supabase Storage

**URL:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/storage/buckets

### Storage Buckets:

#### 1. **`claim-documents`** (Private)
- Verification documents uploaded by practitioners
- PDFs, DOC files, images
- Only visible to claim owner and admins
- Path: `claims/{claim-id}/{filename}`

**To view:**
1. Go to Storage → Buckets → `claim-documents`
2. Navigate to `claims` folder
3. Each claim has its own subfolder

#### 2. **`practitioner-photos`** (Public)
- Profile photos uploaded by practitioners
- JPG, PNG, WEBP images
- Publicly accessible
- Path: `practitioners/{practitioner-id}/{filename}`

**To view:**
1. Go to Storage → Buckets → `practitioner-photos`
2. Navigate to `practitioners` folder
3. Each practitioner has their own subfolder

---

## 🔍 Where to Check Individual Practitioners

### Option 1: Admin Dashboard

Go to: http://localhost:3000/search

Search for any practitioner by name, city, or email.

### Option 2: Supabase Table Editor

**URL:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/editor

**Table:** `practitioners`

**Total Records:** 1,530+ practitioners

**Filter options:**

By claim status:
```sql
SELECT * FROM practitioners WHERE claim_status = 'unclaimed'
SELECT * FROM practitioners WHERE claim_status = 'claimed'
```

By city:
```sql
SELECT * FROM practitioners WHERE city = 'Los Angeles' ORDER BY name
```

By completeness:
```sql
SELECT * FROM practitioners WHERE profile_completeness > 80 ORDER BY profile_completeness DESC
```

Featured practitioners:
```sql
SELECT * FROM practitioners WHERE featured = true
```

### Option 3: Practitioner Stats View

```sql
SELECT * FROM practitioner_stats ORDER BY view_count DESC
```

Shows:
- Practitioner name and claim status
- Review count and rating
- Total claims on their listing
- Pending claims

---

## 📱 Quick Access URLs

### Admin Pages:
- **Claims Management**: /admin/claims
- **Analytics Dashboard**: /admin/analytics

### User Pages:
- **Sign Up**: /practitioner-signup
- **Login**: /login
- **Claim Listing**: /claim-listing
- **Dashboard**: /dashboard
- **Profile Edit**: /profile/edit

### Public Pages:
- **Homepage**: /
- **Search**: /search
- **Locations**: /locations
- **About**: /about
- **Contact**: /contact
- **FAQ**: /faq

### Supabase:
- **Dashboard**: https://app.supabase.com/project/cprlplsmgznmyzwcusro
- **Table Editor**: https://app.supabase.com/project/cprlplsmgznmyzwcusro/editor
- **SQL Editor**: https://app.supabase.com/project/cprlplsmgznmyzwcusro/sql
- **Storage**: https://app.supabase.com/project/cprlplsmgznmyzwcusro/storage/buckets
- **Authentication**: https://app.supabase.com/project/cprlplsmgznmyzwcusro/auth/users

### Resend (Email):
- **Dashboard**: https://resend.com/emails
- **API Keys**: https://resend.com/api-keys
- **Domains**: https://resend.com/domains

---

## 📊 Daily Monitoring Checklist

### Every Morning:
- [ ] Check pending claims at `/admin/claims`
- [ ] Review analytics dashboard at `/admin/analytics`
- [ ] Check Resend for email delivery issues
- [ ] Monitor Supabase errors (if any)

### Weekly:
- [ ] Review top search queries (adjust SEO if needed)
- [ ] Check practitioner profile completeness
- [ ] Monitor claim approval rates
- [ ] Review most viewed practitioners

### Monthly:
- [ ] Export analytics data
- [ ] Review growth metrics
- [ ] Check storage usage
- [ ] Monitor email credits (Resend free tier: 3,000/month)

---

## 🚨 Important Notes

### Email Sending Limits:
- **Resend Free Tier**: 3,000 emails/month
- **Resend Pro**: $20/month for 50,000 emails
- Monitor usage at: https://resend.com/overview

### Storage Limits:
- **Supabase Free Tier**: 1GB storage
- Monitor usage at: https://app.supabase.com/project/cprlplsmgznmyzwcusro/settings/billing

### Database Limits:
- **Supabase Free Tier**: 500MB database
- Monitor usage at: https://app.supabase.com/project/cprlplsmgznmyzwcusro/settings/database

---

## 🔧 Troubleshooting

### "Can't access admin pages"
→ Make sure `is_admin = true` in your user_profiles record

### "Emails not sending"
→ Check Resend dashboard for errors
→ Verify RESEND_API_KEY in environment variables

### "Claims not showing in dashboard"
→ Refresh the page
→ Check Supabase for claims in database
→ Verify RLS policies are correct

### "Analytics not tracking"
→ Wait a few minutes for data to populate
→ Check browser console for errors
→ Verify analytics SQL was run in Supabase

---

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Resend Docs**: https://resend.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support

---

## 🎯 Quick Summary

**Check Claims:** → `/admin/claims` or Supabase `claims` table
**Check Emails:** → https://resend.com/emails
**Check Users:** → Supabase `user_profiles` table or Authentication → Users
**Check Analytics:** → `/admin/analytics` or Supabase analytics tables
**Check Files:** → Supabase Storage → Buckets
**Check Practitioners:** → `/search` or Supabase `practitioners` table

**All access starts with your admin account in Supabase!**
