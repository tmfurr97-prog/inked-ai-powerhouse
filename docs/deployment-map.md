# Deployment Map

This document outlines how the app runs locally and in production, and how
requests move through the system. It reflects what is in the repo today and
calls out planned pieces when they are not wired up yet.

## High-level flow
```
Browser
  -> Next.js App Router (src/app)
     -> UI shell + feature panels (src/components)
     -> Genkit flows (src/ai/flows)
        -> Google AI (Gemini 2.5 Flash)

Planned data layer: Firestore (see docs/backend.json)
```

## Runtime components
- Client: React UI in `src/components/app` and `src/components/features`.
- Server: Next.js App Router server rendering and server actions.
- AI: Genkit flows in `src/ai/flows`, configured in `src/ai/genkit.ts`.
- Data: Draft model lives in `docs/backend.json` (not yet integrated in code).

## Environments
### Local development
- Install deps: `pnpm install`
- Run the app: `pnpm dev` (Next dev server on http://localhost:9002)
- Run Genkit dev tools: `pnpm genkit:dev` or `pnpm genkit:watch`
- Env vars: set the Google AI credentials required by `@genkit-ai/google-genai`
  (see Genkit docs for the exact variable names).

### Production (Firebase App Hosting)
- Build output: `.next/` from `pnpm build`
- Runtime entry: `pnpm start` (Next.js production server)
- Hosting config: `apphosting.yaml` (runtime settings like max instances)
- Deploy: handled by Firebase App Hosting (CLI or console workflows)

## Config inventory
- `apphosting.yaml` Firebase App Hosting runtime settings.
- `next.config.ts` Next.js config.
- `package.json` scripts and dependencies.
- `docs/blueprint.md` product vision.
- `docs/backend.json` draft Firestore schemas and auth providers.

## Request paths by feature
- Writing actions (reword/enhance/continue): `src/ai/flows/rewrite-enhance-continue.ts`
- Admin Desk tools (email, summarize, social posts, forms, letters, outlines):
  `src/components/features/admin-desk.tsx` -> `src/ai/flows/*`
- Co-authoring and creative generators: `src/ai/flows/*`

## Release checklist (quick)
- Verify required env vars are present in the hosting environment.
- Run `pnpm lint` and `pnpm typecheck`.
- Run `pnpm build` and confirm no errors.
