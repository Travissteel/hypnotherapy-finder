# Deployment Guide

## Production Deployment to Vercel

### Prerequisites
- Vercel account (free tier works)
- GitHub repository (optional but recommended)

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Hypnotherapy directory"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Framework preset will auto-detect Next.js
   - Click "Deploy"

3. **Configure Domain**
   - Go to project settings → Domains
   - Add custom domain: `hypnotherapy-finder.com`
   - Update DNS records as instructed by Vercel

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Environment Variables

No environment variables are required for MVP. All data is static.

Optional for future:
- `NEXT_PUBLIC_SITE_URL` - Site URL for canonical links

### Post-Deployment Checklist

- [ ] Verify homepage loads at your domain
- [ ] Test search functionality
- [ ] Check 3-5 practitioner profiles
- [ ] Check 3-5 location pages
- [ ] Verify sitemap: `your-domain.com/sitemap.xml`
- [ ] Verify robots.txt: `your-domain.com/robots.txt`
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

### Performance Optimization

The site is already optimized for production with:
- Static Site Generation (SSG) for all pages
- Automatic image optimization
- Code splitting and lazy loading
- Minimal JavaScript bundle

Expected Lighthouse scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Monitoring

After deployment, monitor:
- Vercel Analytics (free tier)
- Google Search Console for indexing
- Page load times
- Error logs in Vercel dashboard

### Updating Content

To add/update practitioners:

1. Update CSV files in `../hypnotherapy-data/`
2. Run data processing:
   ```bash
   npm run process-data
   ```
3. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update practitioner data"
   git push
   ```
4. Vercel auto-deploys on push

### Rollback

If deployment fails:
```bash
vercel rollback
```

Or use Vercel dashboard → Deployments → Redeploy previous version

### Cost

- **Hosting**: FREE on Vercel (hobby plan)
- **Domain**: ~$12/year
- **Total MVP cost**: ~$12/year

### Support

For deployment issues:
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
