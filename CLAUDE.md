# Hypnotherapy Finder - Project Context

## Project Overview
A production hypnotherapy practitioner directory website with 1,150+ practitioners across 31 US cities.

**Live Site**: https://hypnotherapy-finder.com
**Repo**: https://github.com/Travissteel/hypnotherapy-finder

## Tech Stack
- Next.js 16 with App Router (React 19) - Security Hardened
- TypeScript
- Tailwind CSS 4 + shadcn/ui
- Supabase (PostgreSQL + Auth + Storage)
- Resend for transactional emails
- Vercel deployment

## Project Structure
```
source/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── search/            # Search page
│   ├── location/[slug]/   # City pages (31 cities)
│   ├── practitioner/[slug]/ # Practitioner profiles
│   ├── hypnotherapy-near-me/
│   ├── hypnotherapy-for-anxiety/
│   ├── weight-loss-hypnotherapy/
│   ├── quit-smoking-hypnotherapy/
│   ├── free-quizzes/      # Hub page listing all 17 quizzes
│   ├── stress-level-calculator/
│   ├── ptsd-quiz/
│   ├── anxiety-quiz/
│   ├── social-anxiety-test/
│   ├── ocd-test/
│   ├── phobia-test/
│   ├── thalassophobia-test/
│   ├── burnout-quiz/
│   ├── caregiver-burnout-quiz/
│   ├── agoraphobia-test/
│   ├── claustrophobia-test/
│   ├── emetophobia-test/
│   ├── insomnia-test/
│   ├── anger-test/
│   ├── people-pleaser-quiz/
│   ├── self-esteem-test/
│   ├── codependency-quiz/
│   ├── admin/             # Admin dashboard
│   ├── dashboard/         # Practitioner dashboard
│   └── claim-listing/     # Claim flow
├── components/
│   ├── layout/           # Header, Footer
│   ├── quiz/             # ShareResult.tsx — viral share buttons for quiz results
│   ├── search/           # SearchBar, PractitionerCard
│   └── ui/               # shadcn components
├── lib/
│   ├── data/practitioners.ts  # Static JSON data loader
│   ├── email/            # Resend email functions
│   └── supabase/         # Supabase client
├── data/
│   └── practitioners.json # 1,150+ practitioner records
├── emails/
│   └── templates/        # React Email templates
└── public/
    └── badges/           # Verified practitioner badge SVG
```

## Key Features
1. **Search & Filter**: Location, specialty, session type, insurance
2. **31 City Pages**: SEO-optimized location landing pages
3. **Specialty Pages**: Anxiety, weight loss, quit smoking
4. **17 Free Quizzes**: SEO traffic magnets targeting ~62k+ US searches/month (see memory for full keyword data)
5. **Claim System**: Practitioners can claim listings via Supabase
6. **Badge System**: Verified practitioner badges for backlinks
7. **Email System**: Claim approved/rejected, welcome emails via Resend

## Quiz Page Architecture
Each quiz uses a server/client split — **required** because `'use client'` and `export const metadata` cannot coexist:
- `page.tsx` — server component, exports SEO metadata + wraps layout
- `QuizName.tsx` — `'use client'` component with all useState logic

ShareResult component: `components/quiz/ShareResult.tsx`
- Props: `quizName`, `resultHeadline`, `url`
- StressCalculator uses `result.level` (not `result.headline`) — special case
- PhobiaTest has a 3-stage flow (phobia select → impact → result) — special case
- Self-esteem test has inverted scoring on Q1-3 and Q7-9 (positively worded questions)

## SEO Implementation
- FAQ schema on all major pages
- Schema.org MedicalBusiness markup on practitioner pages
- Breadcrumb schema
- Optimized titles (<60 chars with suffix)
- Meta descriptions (<160 chars)
- XML sitemap at /sitemap.xml
- Canonical URLs on all pages (non-www domain)
- Internal linking structure
- www → non-www 301 redirect (middleware)
- trailingSlash: false for URL consistency
- robots.txt blocks auth pages (/login, /claim-listing, /dashboard, /admin)
- nofollow on claim-listing links

## Recent Work

### Apr 2026 - 17 Quiz Pages + Viral Share Buttons ✅
- Built 17 quiz/test pages targeting ~62k+ US monthly searches (low-KD keywords from Ahrefs)
- Each quiz: server `page.tsx` (SEO metadata) + client `QuizName.tsx` (logic)
- Smart detection: OCD Pure O pattern, PTSD C-PTSD, anger suppressor, self-esteem inverted scoring
- Created `components/quiz/ShareResult.tsx` — Twitter/X, WhatsApp, Facebook, copy-link share buttons
- Added share buttons to all 17 quiz result pages
- Created `/free-quizzes` hub page; linked from homepage Resources section
- Added ~35 keyword variant 301 redirects in `next.config.ts`
- **Pending**: Submit `/free-quizzes` and `/emetophobia-test` to Google Search Console (daily quota hit)

### Feb 2026 - Ahrefs SEO Issues Analysis ✅
- **Status**: All critical issues already fixed in code, needs redeploy
- Analyzed complete Ahrefs export (32 issue types from "hypnofinder latest issues" folder)
- **Key Findings**:
  - ✅ 404 errors (65 links) - Fixed in commit `1726dd4` (removed broken "Visit website" links from PractitionerCard)
  - ✅ Non-canonical pages (5) - Fixed in commit `d858c37` (correct canonical URLs on /faq, /privacy, /about, /hypnotherapy-cost, /locations)
  - ✅ Orphan page (/find-a-hypnotherapist) - Already has footer link, not actually orphaned
  - ✅ Meta descriptions - Enhanced in practitioner template (already in code, old deployment doesn't have it)
- **Action Required**:
  ```bash
  cd source
  rm -rf .next
  npm run build
  npx vercel --prod
  ```
- **Documentation**: See [AHREFS_ISSUES_REPORT.md](AHREFS_ISSUES_REPORT.md) for full analysis
- **Timeline**: Ahrefs will detect fixes on next crawl (1-2 weeks after redeploy)

### Jan 2026 - SEO Audit Fixes
- **SEO Audit Fixes**: Addressed Search Console & Ahrefs issues
  - Fixed 46.6% redirect chain rate (removed duplicate trailing-slash redirects)
  - Fixed 23 "Alternate Page with Proper Canonical" issues (www→non-www redirect)
  - Fixed 24+ 404 errors (malformed URLs with .com domains)
  - Added canonical URLs to 5 pages missing them
  - Updated robots.txt to block auth redirect chains
- High-severity vulnerability fixes via Next.js upgrade
- Security headers implementation (CSP, HSTS, XFO)
- Admin API hardening (removed hardcoded secrets)
- Search API refactored for least-privilege (RLS enforcement)

## Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
EMAIL_FROM=
EMAIL_REPLY_TO=
```

## Common Tasks
- Add practitioners: Update data/practitioners.json
- Deploy: `npx vercel --prod` from /source
- Preview emails: `npm run email:dev`
- Git: Repo is in /source folder, not project root
