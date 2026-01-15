# Firebase Studio

A Next.js starter in Firebase Studio with a writing assistant UI and a set of
Genkit AI flows. See the product vision in `docs/blueprint.md` and the draft
data model in `docs/backend.json`.

## What is here
- Writing workspace layout with left/right sidebars and a focused editor area.
- Feature panels for Admin Desk, AI Actions, History, Reference, and Side-by-side
  views.
- Genkit flows for rewriting, summaries, email composition, form templates,
  letters, presentation outlines, social posts, code snippets, stories, poems,
  scripts, co-authoring, and contextual Admin Desk generation.

## Tech stack
- Next.js App Router (React 19) with TypeScript.
- Tailwind CSS with shadcn/ui and Radix UI primitives.
- Genkit with `@genkit-ai/google-genai` using the Gemini 2.5 Flash model.

## Project layout
- `src/app` App Router entry points, layout, and global styles.
- `src/components/app` Shell layout (header, sidebars, main content).
- `src/components/features` Feature panels and editor UI.
- `src/ai` Genkit config and AI flows.
- `docs/` Product blueprint and backend draft.
- `apphosting.yaml` Firebase App Hosting run configuration.

## Getting started
1. Install dependencies: `pnpm install`
2. Start the dev server: `pnpm dev` (runs on http://localhost:9002)
3. Optional Genkit dev UI: `pnpm genkit:dev` or `pnpm genkit:watch`

## Environment
- Genkit dev loads `.env` via `dotenv` in `src/ai/dev.ts`.
- Configure Google AI credentials required by `@genkit-ai/google-genai` per
  the Genkit docs.

## Quality checks
- `pnpm lint`
- `pnpm typecheck`

## Deployment map
```
Browser
  -> Next.js App Router (`src/app`)
     -> UI panels (`src/components/features`)
     -> Genkit server flows (`src/ai/flows`)
        -> Google AI (Gemini 2.5 Flash)

Build: `pnpm build` -> `.next/`
Runtime: `pnpm start` or Firebase App Hosting (see `apphosting.yaml`)
```

Detailed version: `docs/deployment-map.md`.

To get oriented, start with `src/app/page.tsx`.
