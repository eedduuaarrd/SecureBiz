# SecureBiz AI

Programmatic SEO (**pSEO**) (Next.js App Router) to generate sector-specific compliance and cybersecurity guides (e.g. **GDPR / ISO 27001 / cookie law**) with **lead capture**, **affiliate tool links**, and **JSON-LD** (Article, FAQ, Breadcrumb).

## Requirements

- Node.js 20+
- Postgres account (e.g. [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres/overview) or similar)
- [Google AI (Gemini)](https://aistudio.google.com/apikey) API key

## Configuration

1. Copy the env example and fill real values:

   ```bash
   cp .env.example .env.local
   ```

2. Main variables:

   | Variable | Description |
   |----------|------------|
  | `DATABASE_URL` | Postgres connection string (with SSL if applicable) |
  | `GEMINI_API_KEY` | Gemini API key |
  | `NEXT_PUBLIC_SITE_URL` | Public URL (`http://localhost:3000` locally; production `https://securebiz.org`) |
  | `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container (`GTM-XXXX`); default `GTM-5F2SKDDX` in code if unset |
  | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional GA4 ID (`G-XXXX`); prefer loading GA via GTM to avoid double tags |
  | `PREBUILD_GUIDE_SECTORS` | Optional: how many sectors to pre-generate at build time (0 = only on-demand) |

3. Seed the database:

   ```bash
   npm run seed
   ```

## Development

```bash
npm install
npm run dev
```

Development uses **Webpack** (not Turbopack) to avoid common **memory (OOM)** issues on Windows with large projects.  
Open [http://localhost:3000](http://localhost:3000).  
Example guide: `/guia/clinica-dental-independent/rgpd` (after seeding).

If you still run out of RAM, run this in PowerShell before starting:

```powershell
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Massive generation (autopilot)

Run the guide batch and save to Postgres:

```bash
npm run generate:guides -- --limit=30 --delayMs=900
```

Useful parameters:
- `--dryRun=true` simulates without calling Gemini
- `--sector=<slug>` or `--regulation=<slug>` to filter

## GA4 events (optional)

- `generate_lead` — audit form submitted successfully
- `affiliate_click` — click on a recommended affiliate tool (`tool_name`, `link_url`)

## SEO structure

- Guide route: `app/guia/[sector-slug]/[regulations-slug]/page.tsx`
- Shared defaults & OG helpers: `lib/seo.ts`
- Sitemap: `app/sitemap.ts` (sectors, regulations, guides)
- `robots.txt`: `app/robots.ts` (allows `/`, blocks `/admin`)
- Web app manifest: `app/manifest.ts` (PWA-style install metadata)
- Home: Organization + WebSite + FAQ JSON-LD; guides: Article + FAQ + Breadcrumb (with sector step)
- Set **`NEXT_PUBLIC_SITE_URL`** to your production URL (`https://securebiz.org`) so canonicals, sitemap, and Open Graph use absolute URLs

### Deploy (Vercel)

1. Push to Git and import the repo in Vercel, or run `npx vercel` from this folder (CLI must be logged in).
2. Add environment variables (same as `.env.local`, especially `NEXT_PUBLIC_SITE_URL` and `DATABASE_URL`).
3. Production: **Deployments → Redeploy** or `npx vercel --prod`.

## Legal notice

This content is **informational** and generated with AI; it does not replace professional legal advice (see `app/legal/disclaimer`).
