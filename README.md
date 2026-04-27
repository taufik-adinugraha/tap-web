# tap-web

> **⚠️ SCAFFOLD STATE**: This repo currently contains only Sentry configuration and documentation. Application code, dependencies, and build tooling are not yet implemented.

Single-page promotional website for a shirt product.

## Stack
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript
- Sentry (error monitoring)

## Getting started

> **Note**: Installation and build commands below require `package.json` and Next.js dependencies, which are not yet configured.

### Prerequisites
- Node.js 20+
- npm 10+

### Installation
```bash
npm install
```

### Environment variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Required variables:
- `SENTRY_DSN` — get from Sentry dashboard (Settings → Projects → tap-web → Client Keys)

Optional:
- `NEXT_PUBLIC_SITE_URL` — canonical URL for SEO (defaults to localhost in dev)

### Development
Start the dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build
Production build:
```bash
npm run build
npm start  # serve production build locally
```

### Code quality
```bash
npm run lint         # ESLint
npm run type-check   # TypeScript compiler
npm run format       # Prettier (if configured)
```

## Testing

> **Note**: Test infrastructure not yet implemented. Below describes the planned testing setup.

### Run all tests
```bash
npm test
```

### Watch mode (during development)
```bash
npm test -- --watch
```

### Required setup
- No external services needed for unit tests
- `NODE_ENV=test` is auto-set by the test runner

### What's tested
- Component rendering (hero, product sections)
- Responsive behavior
- Accessibility (alt text, heading structure)

**Always run lint + type-check + test before pushing** — CI runs the same checks on every PR.

## Project structure

**Currently implemented:**
```
instrumentation.ts   # ✅ Sentry init (loads first)
sentry.client.config.ts  # ✅
sentry.server.config.ts  # ✅
.env.example        # ✅
```

**Planned structure:**
```
src/
  app/
    layout.tsx       # root layout, metadata
    page.tsx         # landing page
  components/        # reusable React components
  lib/               # utilities
public/              # static assets
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed structure.

## CI / CD

> **Note**: CI workflow not yet configured. Below describes the planned setup.

GitHub Actions runs on every PR and push to `main`:
- Lint (ESLint)
- Type-check (TypeScript)
- Test (Jest/Vitest)

Workflow: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) (to be created)

DevOS **Watcher** monitors CI runs and alerts on failures.  
DevOS **Medic** auto-investigates flaky tests and proposes fixes.

### Deployment
Vercel auto-deploys:
- `main` branch → production
- Every PR → preview deployment

Set `SENTRY_DSN` in Vercel project settings → Environment Variables.

## Error monitoring
Sentry captures:
- Uncaught exceptions (client + server)
- Unhandled promise rejections
- Manual captures via `Sentry.captureException(err)`

View errors: [sentry.io](https://sentry.io) → tap-web project

## Support
See [tap-meta](https://github.com/taufik-adinugraha/tap-meta) for project overview and repo index.
