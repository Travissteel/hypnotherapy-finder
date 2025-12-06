# 📍 Quick Reference: Where to Check Everything

## 🔐 First: Create Admin Account

1. Go to http://localhost:3000/practitioner-signup
2. Sign up with your email
3. Open Supabase: https://app.supabase.com/project/cprlplsmgznmyzwcusro/editor
4. Click `user_profiles` table
5. Find your user, click edit
6. Set: `is_admin` = ✅, `admin_level` = `super`
7. Log out and back in

---

## 📧 Check Emails

### Resend Dashboard
**URL:** https://resend.com/emails

**What You'll See:**
- All emails sent (claim approved, rejected, welcome)
- Delivery status
- Open rates
- Failed emails

**API Key:** `re_RtmAaZaD_C552oVQr9ufUkFs4dFyMDncj` (already configured)

---

## 📋 Check New Claims

### Option 1: Admin Dashboard (Easiest)
**URL:** http://localhost:3000/admin/claims

**What You'll See:**
- **Left:** Pending claims to approve/reject
- **Right:** Recently processed claims
- Approve/reject buttons
- Add admin notes

### Option 2: Supabase Database
**URL:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/editor

**Table:** `claims`

**Quick Filters:**
```sql
-- Pending claims
SELECT * FROM claims WHERE status = 'pending' ORDER BY created_at DESC

-- Approved claims
SELECT * FROM claims WHERE status = 'approved' ORDER BY created_at DESC

-- All claims for a specific practitioner
SELECT * FROM claims WHERE practitioner_id = 'uuid-here'
```

---

## 👥 Check New User Profiles

### Supabase Users
**URL:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/auth/users

**What You'll See:**
- All registered users
- Email addresses
- Sign-up dates
- Email verified status
- Last sign-in

### User Profiles Table
**URL:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/editor

**Table:** `user_profiles`

**Sort by newest:**
```sql
SELECT * FROM user_profiles ORDER BY created_at DESC
```

**Check admin users:**
```sql
SELECT * FROM user_profiles WHERE is_admin = true
```

---

## 🔍 Check Individual Practitioners

### Option 1: Search Page
**URL:** http://localhost:3000/search

Search by name, city, or email

### Option 2: Supabase Database
**URL:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/editor

**Table:** `practitioners` (1,530 records)

**Useful Queries:**
```sql
-- Unclaimed listings
SELECT * FROM practitioners WHERE claim_status = 'unclaimed' ORDER BY name

-- Claimed listings
SELECT * FROM practitioners WHERE claim_status = 'claimed' ORDER BY claim_date DESC

-- By city
SELECT * FROM practitioners WHERE city = 'Los Angeles' ORDER BY name

-- Incomplete profiles
SELECT * FROM practitioners WHERE profile_completeness < 50 ORDER BY profile_completeness
```

---

## 📊 Check Analytics

### Option 1: Analytics Dashboard (Best)
**URL:** http://localhost:3000/admin/analytics

**What You'll See:**
- Total page views (last 30 days)
- Unique users
- Total searches
- Claims created
- Popular pages
- Top search queries with CTR
- Most viewed practitioners
- Claim conversion funnel

### Option 2: Supabase Tables
**URL:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/editor

**Tables to Check:**

#### `page_views` - Every page visit
```sql
SELECT * FROM page_views ORDER BY viewed_at DESC LIMIT 100
```

#### `search_queries` - All searches
```sql
SELECT * FROM search_queries ORDER BY searched_at DESC LIMIT 100
```

#### `practitioner_views` - Profile views
```sql
SELECT * FROM practitioner_views ORDER BY viewed_at DESC LIMIT 100
```

#### `claim_events` - Claim lifecycle
```sql
SELECT * FROM claim_events ORDER BY created_at DESC LIMIT 100
```

**Analytics Views (Pre-made):**
```sql
-- Daily summary
SELECT * FROM daily_page_views ORDER BY date DESC

-- Popular searches
SELECT * FROM top_searches LIMIT 20

-- Top practitioners
SELECT * FROM most_viewed_practitioners LIMIT 20

-- Conversion funnel
SELECT * FROM claim_funnel ORDER BY date DESC
```

---

## 📁 Check Uploaded Files

### Supabase Storage
**URL:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/storage/buckets

### Buckets:

#### 1. `claim-documents` (Private)
- Verification documents (PDFs, images)
- Only visible to claim owner and admins
- Path: `claims/{claim-id}/{filename}`

#### 2. `practitioner-photos` (Public)
- Profile photos
- Publicly accessible
- Path: `practitioners/{practitioner-id}/{filename}`

---

## 🎯 Daily Checklist

### Every Morning:
1. Check `/admin/claims` for pending claims
2. Review `/admin/analytics` for yesterday's stats
3. Check Resend for email delivery issues
4. Monitor Supabase errors (if any)

### Weekly:
1. Review top search queries
2. Check practitioner profile completeness
3. Monitor claim approval rates
4. Review most viewed practitioners

---

## 🔗 All Important URLs

### Admin Pages:
- **Claims:** http://localhost:3000/admin/claims
- **Analytics:** http://localhost:3000/admin/analytics

### User Pages:
- **Sign Up:** http://localhost:3000/practitioner-signup
- **Login:** http://localhost:3000/login
- **Claim Listing:** http://localhost:3000/claim-listing
- **Dashboard:** http://localhost:3000/dashboard
- **Edit Profile:** http://localhost:3000/profile/edit

### Supabase:
- **Dashboard:** https://app.supabase.com/project/cprlplsmgznmyzwcusro
- **Table Editor:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/editor
- **SQL Editor:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/sql
- **Storage:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/storage/buckets
- **Users:** https://app.supabase.com/project/cprlplsmgznmyzwcusro/auth/users

### Resend (Email):
- **Emails:** https://resend.com/emails
- **API Keys:** https://resend.com/api-keys

### GitHub:
- **Repository:** https://github.com/Travissteel/hypnotherapy-finder

---

## 🚀 Current Status

✅ **Database:** 1,530 practitioners loaded
✅ **Git:** Pushed to GitHub
✅ **Local:** Running at http://localhost:3000
⏳ **Production:** Deploying to Vercel (in progress)

---

## 📞 Support

- **Supabase Docs:** https://supabase.com/docs
- **Resend Docs:** https://resend.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

**Everything is accessible through your admin account in Supabase!**
