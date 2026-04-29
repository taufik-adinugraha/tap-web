# tap-web — AI Context

## Purpose
Single-page promotional website for a shirt product. Lightweight marketing landing page with product showcase, hero imagery, and call-to-action.

## Current state
⚠️ **Initial scaffold only** — Next.js app not yet created. Repository contains Sentry configuration files and documentation templates. The Next.js application, components, and tests need to be implemented.

## Planned stack
- **Framework**: Next.js 14 (App Router) — *not yet installed*
- **Runtime**: Node 20
- **Styling**: Tailwind CSS — *not yet configured*
- **Deployment**: Vercel
- **Error monitoring**: Sentry — *config files present*

## Files currently in repo
- `instrumentation.ts` — Sentry initialization hook (ready for Next.js integration)
- `sentry.client.config.ts` — client-side Sentry setup (ready)
- `sentry.server.config.ts` — server-side Sentry setup (ready)
- `.env.example` — environment variables template

## Next steps to implement
1. Initialize Next.js 14 project (`npx create-next-app@latest`)
2. Move Sentry config files into new project structure
3. Create `src/app/page.tsx` — landing page
4. Create `src/app/layout.tsx` — root layout with metadata
5. Set up Tailwind CSS
6. Create components in `src/components/`
7. Add product images to `public/`

## Development patterns (when implemented)
- **Components**: Colocate in `src/components/`, prefer Server Components by default
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

⚠️ **Not yet implemented** — no test suite or package.json exists yet.

**Planned test setup:**
- Test framework: Jest or Vitest
- Testing library: React Testing Library
- Test files: `src/app/page.test.tsx`, component tests

**When implemented, run tests:**
```bash
npm test                  # full suite
npm test -- --watch       # watch mode
```

**What to test:**
- Component rendering (smoke tests for main page sections)
- Responsive behavior
- Accessibility basics (heading hierarchy, alt text)

**Pre-push checklist (once set up):**
- `npm run lint`
- `npm run type-check`
- `npm test`

## Do not touch
- `instrumentation.ts` — Sentry must initialize first, don't move or delay imports
- `sentry.*.config.ts` — error reporting config, changes should be intentional
- `.github/workflows/ci.yml` — managed by DevOS Watcher/Medic (will be created when app is set up)

## Local development (once Next.js is set up)
```bash
npm install       # install dependencies
npm run dev       # starts dev server on http://localhost:3000
npm run build     # production build check
npm run lint      # ESLint (needs config)
npm run type-check # TypeScript
npm test          # test suite (not yet created)
```

## Deployment (once app is implemented)
Vercel auto-deploys from `main` branch. Preview deployments on every PR. Set `SENTRY_DSN` in Vercel environment variables.
