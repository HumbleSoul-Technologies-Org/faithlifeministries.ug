# 🆘 SEO Troubleshooting Quick Reference

## Common Issues & Solutions

### ❌ Problem: Sitemap Not Generating During Build

**Error Message:**
```
Error: Cannot find module './generate-sitemap.js'
```

**Solution:**
```bash
# 1. Create scripts folder if missing
mkdir scripts

# 2. Make sure file exists
ls scripts/generate-sitemap.js

# 3. Try build again
npm run build

# 4. Or run sitemap generator manually
npm run sitemap
```

**If still not working:**
- Check that `scripts/generate-sitemap.js` exists
- Verify file is not empty
- Check package.json has sitemap script: `"sitemap": "node scripts/generate-sitemap.js"`

---

### ❌ Problem: "Command not found: npm"

**Solution:**
```bash
# Check if Node.js/npm is installed
node --version
npm --version

# If not installed, download from:
# https://nodejs.org/ (LTS version recommended)

# After installation, restart terminal and try again
npm run build
```

---

### ❌ Problem: Domain URLs Not Updated

**What went wrong:**
You forgot to replace `faithlife-church.com` with your actual domain

**Solution:**
```bash
# In VS Code:
# 1. Press Ctrl+Shift+H (Find & Replace)
# 2. Find: faithlife-church.com
# 3. Replace with: yourdomain.com
# 4. Click "Replace All"

# Files that need updating:
- index.html (6 occurrences)
- scripts/generate-sitemap.js (1 occurrence on line 14)
- src/lib/seo-utils.ts (search for URLs)
```

---

### ❌ Problem: Robots.txt Not Accessible

**Error:**
```
404 - robots.txt not found
```

**Solutions:**

**For Vercel:**
- Robots.txt is in `public/robots.txt` ✅ (automatically served)
- After deploy, wait 5 minutes for CDN
- Then check: `yourdomain.com/robots.txt`

**For Netlify:**
- Create `public/robots.txt` in your project
- Deploy using: `npm run build`
- Netlify will serve static files from `public/`

**For other hosting:**
- Upload `public/robots.txt` to your web root
- Ensure file permissions are 644 or public readable

**Verify it works:**
```bash
# After deployment, visit in browser:
https://yourdomain.com/robots.txt
# You should see the file content
```

---

### ❌ Problem: Sitemap Not Accessible

**Error:**
```
404 - sitemap.xml not found
```

**Solution:**
Same as robots.txt above. Must run build first:
```bash
npm run build    # This generates sitemap.xml

# After deployment, check:
https://yourdomain.com/sitemap.xml
```

---

### ❌ Problem: Pages Not Appearing in Google

**Timeline reminder:**
- ⏱️ Initial crawl: 2-4 weeks
- ⏱️ Indexing: 1-3 months  
- ⏱️ Ranking: 3-6 months

**Checklist:**

1. **Verify HTTPS is enabled**
   ```
   Your site must be HTTPS (not HTTP)
   Check browser - should show 🔒 padlock
   ```

2. **Submit sitemap to Google**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your domain
   - Go to Sitemaps section
   - Enter: `/sitemap.xml`
   - Click Submit

3. **Request indexing for homepage**
   - In Search Console, paste your homepage URL
   - Click "Inspect URL"
   - Click "Request Indexing"
   - Wait for verification (hours to days)

4. **Check for robots.txt issues**
   - Visit: `yourdomain.com/robots.txt`
   - Make sure it doesn't have `Disallow: /`
   - Our robots.txt has `Allow: /` ✅

5. **Check for crawl errors**
   - In Search Console: Coverage report
   - Fix any errors shown
   - Submit pages for indexing

6. **Wait 2-4 weeks**
   - Google needs time to crawl
   - Check Search Console weekly
   - Look for "Discovered" pages increasing

---

### ❌ Problem: Meta Tags Not Showing

**What to check:**
```bash
# 1. Open your website in browser
# 2. Right-click → "View Page Source" (or Ctrl+U)
# 3. Search for "description"
# 4. You should see lines like:
#    <meta name="description" content="...">
#    <meta property="og:title" content="...">
#    <meta name="twitter:card" content="...">
```

**If meta tags are missing:**

1. **Check index.html was updated**
   ```bash
   grep "og:title" index.html
   # Should output: <meta property="og:title"...
   ```

2. **Rebuild project**
   ```bash
   npm run build
   ```

3. **Clear browser cache**
   - Press Ctrl+Shift+Delete
   - Select "All time"
   - Clear cache
   - Reload page

4. **If still not showing:**
   - Copy meta tag section from `index.html`
   - Paste into your `index.html` file
   - Save and rebuild

---

### ❌ Problem: Social Media Sharing Looks Bad

**What went wrong:**
Image or title not showing when shared on Facebook/Twitter

**Solution:**

1. **Check your meta tags**
   ```html
   <!-- In index.html, should have: -->
   <meta property="og:title" content="...">
   <meta property="og:description" content="...">
   <meta property="og:image" content="...">
   ```

2. **Use Meta Tags Validator**
   - Go to https://metatags.io
   - Enter your website URL
   - See exactly how your site will appear
   - Look for issues (red warnings)

3. **Common issues:**
   - Image URL is broken (fix in og:image)
   - Title is too long (max 60 characters)
   - Description is too long (max 160 characters)
   - Using non-HTTPS image URL

4. **Test on Facebook**
   - Go to https://developers.facebook.com/tools/debug/
   - Paste your URL
   - Click "Scrape Again"
   - See how Facebook will show your page

5. **Test on Twitter**
   - Go to https://cards-dev.twitter.com/validator
   - Paste your URL
   - See how Twitter will show your page

---

### ❌ Problem: Vercel Build Fails

**Error in logs:**
```
error: Could not find npm executable
error: Command 'npm run build' failed
```

**Solution:**

1. **Check package.json syntax**
   ```bash
   # Make sure scripts section is valid JSON
   "scripts": {
     "dev": "vite",
     "build": "vite build && node scripts/generate-sitemap.js",
     "check": "tsc"
   }
   ```
   (No trailing comma after last item!)

2. **Verify scripts folder exists**
   ```bash
   ls scripts/
   # Should show: generate-sitemap.js
   ```

3. **Check node_modules installed locally**
   ```bash
   npm install
   npm run build
   ```

4. **Push to GitHub and redeploy**
   ```bash
   git add .
   git commit -m "SEO optimization"
   git push
   # Vercel will auto-rebuild
   ```

---

### ❌ Problem: Social Media Links Not Working

**Issue:**
Links in JSON-LD schema are broken

**Solution:**

In `index.html`, find this section:
```json
"sameAs": [
  "https://www.facebook.com/your-page",
  "https://www.youtube.com/your-channel",
  "https://www.instagram.com/your-handle"
]
```

Make sure:
1. **URLs are correct** - Copy from your actual social profiles
2. **URLs have HTTPS** - Not HTTP
3. **No trailing slashes** - Unless it's a specific path
4. **Account names match** - Use exact handles from social platforms

**Test it:**
- Go to https://validator.schema.org
- Paste your website URL
- Look for "sameAs" section
- Click URLs to verify they work

---

### ❌ Problem: "Cannot read property 'baseUrl' undefined"

**Error location:**
```
scripts/generate-sitemap.js:14: Cannot read property 'baseUrl'
```

**Solution:**

1. **Check config object exists**
   ```javascript
   // In generate-sitemap.js around line 11, should have:
   const config = {
     baseUrl: 'https://faithlife-church.com',
     lastmod: new Date().toISOString().split('T')[0],
   };
   ```

2. **Update domain name in config**
   ```javascript
   const config = {
     baseUrl: 'https://yourdomain.com',  // Change this!
     lastmod: new Date().toISOString().split('T')[0],
   };
   ```

3. **Save and try again**
   ```bash
   npm run sitemap
   ```

---

### ❌ Problem: JSON-LD Schema Invalid

**What to check:**

1. **Validate schema**
   - Go to https://validator.schema.org
   - Paste your website URL
   - Look for errors (red icons)
   - Click error to see fix needed

2. **Common JSON-LD errors:**
   - Missing `@context`
   - Missing `@type`
   - Invalid property names (check spelling)
   - URL format issues

3. **Fix it:**
   - In `index.html`, find `<script type="application/ld+json">`
   - Check JSON syntax (use online JSON validator)
   - Make sure all quotes match
   - No trailing commas before closing braces

---

### ❌ Problem: Slow Page Load / Poor PageSpeed Score

**Check score:**
- Go to https://pagespeed.web.dev
- Enter your URL
- See score and recommendations

**Common fixes:**

1. **Optimize images**
   ```
   - Use WebP format
   - Compress with TinyPNG
   - Add sizes attribute to img tags
   ```

2. **Lazy load images**
   ```html
   <img loading="lazy" src="..." />
   ```

3. **Minimize CSS/JS**
   - Already done by Vite ✅

4. **Enable gzip compression**
   - Already configured ✅

5. **Use CDN for images**
   - You're using Cloudinary ✅
   - Make sure URLs use HTTPS

6. **Check Core Web Vitals**
   - LCP: Largest Contentful Paint
   - FID: First Input Delay
   - CLS: Cumulative Layout Shift

---

## 📞 Need More Help?

### Check These Docs
1. **SEO_OPTIMIZATION_GUIDE.md** - Detailed explanations
2. **SEO_CHECKLIST.md** - Deployment guide
3. **FILE_INDEX.md** - File reference

### Official Resources
- [Google Search Central](https://developers.google.com/search)
- [Google Search Console Help](https://support.google.com/webmasters)
- [Schema.org Documentation](https://schema.org/)
- [Web.dev Guides](https://web.dev/)

### Testing Tools
| Tool | URL | Purpose |
|------|-----|---------|
| Meta Tags | https://metatags.io | Preview social sharing |
| Schema Validator | https://validator.schema.org | Validate JSON-LD |
| Mobile Friendly | https://search.google.com/test/mobile-friendly | Test mobile SEO |
| PageSpeed | https://pagespeed.web.dev | Performance audit |
| GTmetrix | https://gtmetrix.com | Full page analysis |

---

## 🎯 Quick Diagnosis

**Choose the issue closest to yours:**

- [ ] Build or deploy failing → Check Node.js/npm installed
- [ ] Files missing → Run `npm run build`
- [ ] Domain not updated → Use Find & Replace
- [ ] Pages not in Google → Submit sitemap + wait 2-4 weeks
- [ ] Social sharing looks bad → Use Meta Tags Validator
- [ ] Performance poor → Check PageSpeed Insights
- [ ] JSON-LD invalid → Use Schema Validator
- [ ] Still not working → Check SEO_OPTIMIZATION_GUIDE.md

---

**Last updated:** November 17, 2025

Good luck! 🚀 You've got this!
