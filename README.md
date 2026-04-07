# Amicus Juris

A polished Next.js starter for a Nigerian law firm website with:

- a professional homepage and brand direction
- practice area pages
- a publications hub with reusable report, insight, and brief templates
- sitemap and robots support
- a content model that is ready to move into a CMS

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Current structure

- `src/app/page.tsx` contains the homepage
- `src/app/publications/page.tsx` contains the publication index
- `src/app/publications/[slug]/page.tsx` renders publication pages
- `src/lib/publications.ts` holds the reusable publication system and starter entries
- `src/components/publications/` contains the publication card and block renderers

## Adding a new publication

Add one new object inside `src/lib/publications.ts` and provide:

- core metadata: `title`, `slug`, `category`, `template`, `publishedAt`
- summary fields: `excerpt`, `seoDescription`, `shareMessage`, `summaryPoints`
- audience and positioning: `reportLabel`, `audience`, `focusAreas`
- page content using reusable `blocks` such as `richText`, `keyPoints`, `stats`, `timeline`, `quote`, and `cta`

This means the client can keep publishing into a fixed system instead of requesting a new design for every report.

## Recommended production setup

For the final live solution, the strongest setup is:

- `Next.js` for the frontend
- `Sanity` for content management
- `Vercel` for hosting
- `Buffer` or `Publer` for social distribution

## Suggested CMS model

The project now includes a Sanity Studio and a CMS-ready publication schema.

## Sanity setup

1. Copy `.env.example` to `.env.local`
2. Add your Sanity project ID and dataset
3. Run `npm run dev`
4. Run `npm run studio` to open the Sanity Studio

Until those environment variables are added, the publication pages continue using the local fallback data in `src/lib/publications.ts`.

## Publication schema

The Sanity publication model includes fields like:

- title
- slug
- category
- template
- audience
- excerpt
- summary points
- focus areas
- structured content blocks
- report label
- featured image
- SEO description
- social share message
- publish date
- author

## Social publishing workflow

Recommended flow:

1. Write and approve the article in Sanity.
2. Publish the article to the website.
3. Trigger a webhook to generate social copy drafts.
4. Send those drafts to Buffer or Publer for LinkedIn, X, and Facebook review.
5. Approve and publish per platform.

This gives the firm a clean editorial workflow without turning the website into a fragile marketing tool.

## Before launch

Replace the placeholders with:

- final lawyer biography
- real office address, phone, and email
- actual practice area copy
- final publication entries
- firm logo and brand assets
- domain and analytics settings
# amicusjurislp
