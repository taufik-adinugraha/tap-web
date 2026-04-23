// instrumentation.ts — Next.js instrumentation hook
// This file runs BEFORE any other code in the Next.js app
// Perfect place to initialize Sentry so it catches everything

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side: import Sentry Node SDK config
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime: import Sentry Edge config
    await import('./sentry.server.config');
  }
}
