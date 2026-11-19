<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project

`hire-loop` — Next.js 16.4.6 App Router frontend (React 19) with shadcn/ui `base-nova` and better-auth on MongoDB. Jobs, applications, and payments are served by a **separate Express API** in the sibling repo `../hire-loop-server`; this app has almost no server-side data layer of its own.

## Commands

- `npm run dev` / `build` / `start`.
- `npm run lint` (ESLint flat config), `npm run typecheck` (`tsc --noEmit`), `npm run format` (Prettier writes `**/*.{ts,tsx}` only).
- No test runner, CI workflows, or pre-commit hooks.
- Current baseline is red: `typecheck`/`build` fail on `app/dashboard/recruiter/addJobs/page.tsx` (`JobsForm.minSalary` is `string`, submit sends `number | null`); `lint` fails on `react-hooks/set-state-in-effect` in that page and `hooks/use-mobile.ts`. Don't chase these unless the task is about them.
- Style: Prettier enforces no semicolons, double quotes, LF, 80 cols. Existing code is inconsistent (stray semicolons, single quotes, Bengali comments) — follow Prettier, don't mass-reformat unrelated files.

## Architecture

- Path alias `@/*` maps to the **repo root** (not `src/`), e.g. `@/lib/auth`.
- `lib/actions/*` and `lib/api/jobs.ts` are plain `fetch` wrappers — despite the folder name they are **not** `"use server"` actions. All use `NEXT_PUBLIC_API_BASE_URL` (fallback `http://localhost:5000`). They are called from both server pages and client components, so the Express server's permissive `cors()` is load-bearing.
- Backend must be started separately: `cd ../hire-loop-server && node index.js` (no dev script, port 5000). It shares the MongoDB database `hireLoop` with better-auth and reads/writes `jobs`, `application`, `payment`, and `user` (including the `premium` flag). Without it, browse-jobs/applications requests fail and premium verification silently does nothing.
- Types are defined in route files and imported back into lib: `JobsForm` from the `"use client"` page `app/dashboard/recruiter/addJobs/page.tsx`, `JobRow` from `app/dashboard/recruiter/jobs/page.tsx`, and `JobData` from `app/browse-jobs/[id]/page.tsx`. `lib/api/jobs.ts`, `lib/actions/jobs.ts`, `app/browse-jobs/components/job.ts`, and `ApplyButton.tsx` depend on these — change the type and its page together.
- Applications come in two shapes: real submissions store `jobId`/`jobTitle`/`companyName`/`userId`/`email` but no status or date, while older seeded docs store `title`/`company`/`workMode` and a relative `appliedAt` but no `jobId`. The recruiter view filters strictly by `jobId`; the seeker view shows the rest. Applicant names are resolved by joining the backend `/users` list, since application docs carry only `userId`/`email`.
- Pages that read `searchParams`/session and fetch uncached data should set `export const dynamic = "force-dynamic"`; `app/browse-jobs/page.tsx` and `app/dashboard/recruiter/jobs/page.tsx` are the examples.
- Page-local components stay colocated: `app/components/` (dashboard sidebar, `AlertDialog`), `app/browse-jobs/components/`. Only shadcn-generated primitives belong in `components/ui/`.

## Auth (better-auth + MongoDB)

- Server: `lib/auth.ts` using `@better-auth/mongo-adapter`, database name hardcoded to `hireLoop`; mounted at `app/api/auth/[...all]/route.ts`. Client: `lib/auth-client.ts` exporting `authClient` and `signIn`/`signUp`/`signOut`/`useSession`.
- Roles are **lowercase**: `"seeker" | "recruiter" | "admin"` (`lib/roles.ts`). `role` is a better-auth `user.additionalField` (default `"seeker"`, validated by a custom `StandardSchemaV1`); the sign-up form passes it, and the sidebar falls back to `seeker` when there is no session.
- Server session: `auth.api.getSession({ headers: await headers() })` or `getSession()` from `lib/core/server.ts`. Dashboard routes have **no auth gating** — they only read the session to scope API queries, so unauthenticated access is not redirected.
- `.env` keys: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_DB_URL`, `NEXT_PUBLIC_API_BASE_URL`, `STRIPE_SECRET_KEY`, `PRICE_ID`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`. GitHub OAuth is configured in `lib/auth.ts` but no credentials are set, so social login cannot work locally.
- `BETTER_AUTH_URL` is not `NEXT_PUBLIC_*`, so it is not inlined into the browser bundle; the client relies on same-origin base URLs locally.
- `/sign-in` and `/sign-up` live in the `app/(auth)/` route group — keep that structure (flat `app/sign-in/` copies collide). Forms read `?redirectTo=` and push it after success.

## UI conventions

- shadcn style is `base-nova` = **Base UI, not Radix**. Compose with `render={<Link ... />}` (and `nativeButton={false}` when a `Button` wraps a link), never `asChild`. `Select` is driven by an `items` array plus `onValueChange`.
- Application status is centralized in `lib/application-status.ts` (values, colors, guards) with reusable `ApplicationStatusBadge` / `ApplicationStatusSelect` / `ApplicationStatusFilter` in `components/applications/`. Use these instead of re-declaring status strings or Tailwind colors per page.
- `cn` is re-exported from the `cn` npm package in `lib/utils.ts` (not clsx/tailwind-merge).
- Toasts: `toast.add({ type: "success" | "error", title, description })` from `@/components/ui/toast`; `<Toaster />` is mounted in both the root and dashboard layouts.
- Tailwind **v4** with no `tailwind.config.*`; tokens/radii live in `app/globals.css` (`@theme inline`, `:root`, `.dark`). Dark mode is class-based via `next-themes`; `components/theme-provider.tsx` also binds a plain `d` keypress to toggle it.
- `components/ui/sidebar.tsx` is customized (logo, session-aware nav, `next/link`), so re-running `npx shadcn add sidebar` would overwrite real work.
- The home hero backdrop is one raster asset, `app/assets/globe.png` (starfield + glows + globe), layered behind `Hero`/`WorldStats` in `app/page.tsx` — there is no CSS starfield. `logo.png` is used in the navbar/auth shell; `cta-bg.png` is the company image on job details.

## Payments

- `/checkout` renders a hand-built Stripe-lookalike form; it POSTs to `app/api/checkout_sessions`, which ignores the submitted body and creates a Checkout Session from `PRICE_ID`, then 303-redirects to Stripe. `@stripe/stripe-js` is installed but unused — there are no Stripe Elements to wire.
- `/checkout/success` retrieves the session with `stripe`, then calls the backend `/payments/checkout-verify`, which records a `payment` and flips `user.premium`. Apply flow allows 2 applications unless the backend reports `premium`.

## Gotchas

- `/payment` is linked from the navbar ("Pricing") and the seeker sidebar ("Billing") but **no such route exists**; checkout is `/checkout`.
- Dashboard coverage is partial: `admin/*`, `*/settings`, and `recruiter/applications` are linked but have no routes; `dashboard/recruiter/jobs/[id]` is still a stub, but its `applications` child is now the real applicant review table (status changes are local-only until persistence is added).
- `lib/actions/users.ts` reads `premium` straight from the backend `user` document, not from the better-auth session.
- `next-env.d.ts` is gitignored and generated; don't hand-edit or commit it.
- `CLAUDE.md` is just `@AGENTS.md` — keep it pointing here.
