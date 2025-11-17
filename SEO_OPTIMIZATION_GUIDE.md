# SEO Optimization Guide for FaithLife Church

## Overview
This document explains the SEO improvements made to your website and how to maintain and expand them.

---

## 1. Files Created/Modified

### Core SEO Files
- **`public/robots.txt`** - Guides search engines on what to crawl
- **`public/sitemap.xml`** - Lists all important pages for search engines
- **`scripts/generate-sitemap.js`** - Automated script to generate/update sitemap
- **`src/lib/seo-utils.ts`** - Utility functions for dynamic SEO management
- **`index.html`** - Enhanced with meta tags, Open Graph, and JSON-LD structured data
- **`vite.config.ts`** - Updated with security and caching headers

---

## 2. Key SEO Improvements Made

### A. Meta Tags in HTML Head
✅ **Description Tag** - Compelling page description for search results
✅ **Keywords Tag** - Relevant keywords for the church
✅ **Author Tag** - Author information for credibility
✅ **Theme Color** - Visual consistency across browsers
✅ **Robots Meta** - Tells search engines to index and follow links

### B. Open Graph Tags
✅ **og:title, og:description, og:image** - Better sharing on Facebook, LinkedIn, etc.
✅ **og:type, og:url, og:site_name** - Complete social media optimization

### C. Twitter Card Tags
✅ **twitter:card** - Optimized for Twitter/X sharing with large image preview
✅ **twitter:title, twitter:description, twitter:image** - Twitter-specific formatting

### D. Structured Data (JSON-LD)
✅ **Church Schema** - Tells Google your site is a church with contact info
✅ **Breadcrumb Schema** - Can be added per-page for better navigation display
✅ **Article/Sermon Schema** - Can be added for sermon pages

### E. Robots.txt
✅ **User-agent Rules** - Specific rules for Google, Bing, and other bots
✅ **Crawl Delays** - Prevents server overload from bots
✅ **Disallow Rules** - Prevents indexing of admin, API, and private pages
✅ **Sitemap Location** - Points bots to your sitemap

### F. Sitemap.xml
✅ **All Main Pages Listed** - Home, Sermons, Events, About, Donations
✅ **Update Frequency** - Tells search engines how often pages change
✅ **Priority Scores** - Indicates which pages are most important
✅ **Multiple Namespace Support** - Mobile, Image, and Video support ready

---

## 3. How to Use the Sitemap Generator

### Generate Sitemap Automatically (with build)
```bash
npm run build
```
This will:
1. Build your Vite project
2. Automatically generate updated `public/sitemap.xml`

### Generate Sitemap Manually
```bash
npm run sitemap
```

### Update Routes in Sitemap
Edit `scripts/generate-sitemap.js` to add/modify routes:
```javascript
const routes = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/sermons', priority: 0.9, changefreq: 'weekly' },
  // Add more routes here...
];
```

---

## 4. Dynamic SEO in Your React Components

### Update Page Metadata on Route Change
Use the `seo-utils.ts` file in any component:

```typescript
import { updateSEOMetadata, generateArticleSchema } from '@/lib/seo-utils';

export default function SermonPage({ sermon }) {
  useEffect(() => {
    // Update meta tags
    updateSEOMetadata({
      title: `${sermon.title} - FaithLife Church Sermons`,
      description: sermon.description,
      keywords: `sermon, ${sermon.speaker}, ${sermon.series}`,
      image: sermon.thumbnailUrl,
      url: `https://faithlife-church.com/sermons/${sermon._id}`,
      type: 'article'
    });

    // Add structured data for this sermon
    generateArticleSchema({
      title: sermon.title,
      description: sermon.description,
      image: sermon.thumbnailUrl,
      datePublished: sermon.date,
      author: sermon.speaker,
      url: `https://faithlife-church.com/sermons/${sermon._id}`
    });
  }, [sermon]);

  return (
    // Your component JSX
  );
}
```

### For Event Pages
```typescript
import { generateEventSchema } from '@/lib/seo-utils';

generateEventSchema({
  name: event.title,
  description: event.description,
  startDate: event.startDate,
  endDate: event.endDate,
  location: event.location,
  image: event.image,
  url: `https://faithlife-church.com/events/${event._id}`
});
```

---

## 5. Important Configuration Updates Needed

### Update Domain URLs
1. **In `index.html`** - Replace `https://faithlife-church.com` with your actual domain
2. **In `scripts/generate-sitemap.js`** - Update `baseUrl` configuration
3. **In `src/lib/seo-utils.ts`** - Update any hardcoded URLs to match your domain

### Add Your Social Media Profiles
Edit `index.html` JSON-LD section:
```json
"sameAs": [
  "https://www.facebook.com/your-page",
  "https://www.youtube.com/your-channel",
  "https://www.instagram.com/your-handle"
]
```

### Update Contact Information
Edit `index.html` contactPoint section:
```json
"contactPoint": {
  "@type": "ContactPoint",
  "contactType": "Customer Service",
  "email": "your-email@church.com"
}
```

---

## 6. Testing Your SEO

### Tools to Use
1. **Google Search Console** (https://search.google.com/search-console)
   - Submit your sitemap
   - Check for indexing issues
   - Monitor search performance

2. **Google PageSpeed Insights** (https://pagespeed.web.dev/)
   - Test mobile and desktop performance
   - Get specific improvement recommendations

3. **Schema.org Validator** (https://validator.schema.org/)
   - Validate your JSON-LD structured data
   - Fix any schema errors

4. **Open Graph Debugger** (https://developers.facebook.com/tools/debug/)
   - Test how your site appears when shared on Facebook

5. **Twitter Card Validator** (https://cards-dev.twitter.com/validator)
   - Test how your site appears on Twitter

---

## 7. Ongoing SEO Maintenance

### Monthly Tasks
- [ ] Regenerate sitemap: `npm run sitemap`
- [ ] Check Google Search Console for new issues
- [ ] Update meta descriptions if content changes
- [ ] Monitor search ranking with Google Search Console

### When Adding New Content
- [ ] Add new routes to `scripts/generate-sitemap.js`
- [ ] Use `updateSEOMetadata()` in new pages
- [ ] Add appropriate structured data (articles, events, etc.)
- [ ] Run `npm run build` to regenerate sitemap

### When Changing URLs
- [ ] Update URLs in sitemap
- [ ] Set up 301 redirects from old URLs
- [ ] Update your sitemap in Google Search Console

---

## 8. Best Practices Checklist

- ✅ Each page has unique, descriptive title (50-60 characters)
- ✅ Meta descriptions are compelling (150-160 characters)
- ✅ Images have alt text (for accessibility and image SEO)
- ✅ Content uses proper heading hierarchy (h1, h2, h3)
- ✅ Internal links use descriptive anchor text
- ✅ Mobile-responsive design (covered by your Tailwind setup)
- ✅ Fast page load time (covered by Vite optimization)
- ✅ HTTPS enabled (required by Google)
- ✅ Schema markup for all key content types
- ✅ Sitemap submitted to Google Search Console

---

## 9. Troubleshooting

### Sitemap Not Generating
```bash
# Make sure scripts folder exists
mkdir -p scripts

# Run manually
node scripts/generate-sitemap.js
```

### Pages Not Appearing in Google
1. Submit sitemap in Google Search Console
2. Check for robots.txt issues blocking content
3. Wait 1-2 weeks for initial indexing
4. Check Search Console for any crawl errors

### Poor Search Rankings
- Improve content quality and relevance
- Add more internal links with good anchor text
- Build backlinks (other sites linking to you)
- Increase page load speed
- Improve Core Web Vitals

---

## 10. Next Steps

1. **Update all URLs** in the configuration files to match your domain
2. **Add your social media links** to the structured data
3. **Build and deploy** your updated website
4. **Submit sitemap** to Google Search Console
5. **Monitor performance** in Google Search Console weekly

---

## Resources

- Google Search Central: https://developers.google.com/search
- Schema.org: https://schema.org/
- Google Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- SEO Starter Guide: https://developers.google.com/search/docs/beginner/seo-starter-guide

---

**Last Updated:** November 17, 2025
**SEO Score Target:** 90+ (Google PageSpeed Insights)
