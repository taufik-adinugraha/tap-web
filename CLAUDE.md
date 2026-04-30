# tap-web — AI Context

## Purpose
Single-page promotional website for a shirt product. Lightweight marketing landing page with product showcase, hero imagery, and call-to-action.

## Current status
**Scaffold stage**: This repository currently contains only Sentry configuration files and documentation. The Next.js application structure needs to be initialized.

**Files in place:**
- `instrumentation.ts` — Sentry initialization (first thing loaded)
- `sentry.client.config.ts` — client-side Sentry setup
- `sentry.server.config.ts` — server-side Sentry setup
- `.env.example` — environment variable template

**Next steps**: Run `npx create-next-app@latest . --typescript --tailwind --app --src-dir` to scaffold the Next.js application, then integrate the existing Sentry files.

## Target stack
- **Framework**: Next.js 14 (App Router)
- **Runtime**: Node 20
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Error monitoring**: Sentry (already configured)

## Key files (once initialized)
- `src/app/page.tsx` — main landing page component
- `src/app/layout.tsx` — root layout with metadata and global styles
- `instrumentation.ts` — ✅ Sentry initialization (already in place)
- `sentry.client.config.ts` — ✅ client-side Sentry setup (already in place)
- `sentry.server.config.ts` — ✅ server-side Sentry setup (already in place)
- `tailwind.config.ts` — Tailwind configuration
- `public/` — static assets (images, fonts)

## Request lifecycle
1. Next.js loads instrumentation.ts → Sentry initialized
2. App Router serves `/` from `src/app/page.tsx`
3. Client-side hydration with React 18
4. Static assets served from `/public`

## Development patterns
- **Components**: Colocate in `src/components/` as needed, prefer Server Components by default
- **Metadata**: Define in layout.tsx for SEO (title, description, og:image)
- **Images**: Use `next/image` for automatic optimization
- **Styling**: Tailwind utility classes, custom theme in tailwind.config.ts
- **Responsive**: Mobile-first design, test at 375px, 768px, 1440px breakpoints

## Error monitoring
Sentry is initialized in `instrumentation.ts` (runs before anything else in Next.js 14+).

**Always call `Sentry.captureException(err)` at service boundaries:**
- Server Components: wrap data fetching in try/catch
- Client event handlers: catch errors in onClick, onSubmit
- API routes (if added): wrap handler logic

**Never swallow errors silently.** If you log it, also send it to Sentry so the team sees production issues.

## Testing

**Run the full test suite:**
```bash
npm test
```

**Required environment variables for tests:**
- `NODE_ENV=test` (usually auto-set by Jest/Vitest)
- No external services needed for unit tests

**Setup steps:**
1. Install dependencies: `npm install`
2. Run tests: `npm test`
3. For watch mode during development: `npm test -- --watch`

**Expected output:**
Tests will pass with output like:
```
✓ src/app/page.test.tsx (2)
  ✓ renders hero section
  ✓ displays product image

Tests: 2 passed (2 total)
```

**What we test:**
- Component rendering (smoke tests for main page sections)
- Responsive behavior (if using testing-library)
- Accessibility basics (heading hierarchy, alt text)

**Running locally before push:**
Always run `npm run lint`, `npm run type-check`, and `npm test` before committing. CI will run the same checks.

## Do not touch
- `instrumentation.ts` — Sentry must initialize first, don't move or delay imports
- `.github/workflows/ci.yml` — managed by DevOS Watcher/Medic, edit via devos-api if needed
- `sentry.*.config.ts` — error reporting config, changes should be intentional

## Local development
```bash
npm install
npm run dev       # starts dev server on http://localhost:3000
npm run build     # production build check
npm run lint      # ESLint
npm run type-check # TypeScript
npm test          # Jest/Vitest
```

## Deployment
Vercel auto-deploys from `main` branch. Preview deployments on every PR. Set `SENTRY_DSN` in Vercel environment variables.
