# AGENTS.md

## Cursor Cloud specific instructions

This is a Vite + React + TypeScript frontend SPA (landing page for "Matter by JetBrains"). No backend, database, or Docker needed.

### Quick reference

- **Package manager:** npm (lockfile: `package-lock.json`)
- **Dev server:** `npm run dev` — serves on port `8080` (host `::`)
- **Lint:** `npm run lint` (ESLint 9; expect 3 pre-existing errors + 7 warnings from scaffolded shadcn/ui code)
- **Test:** `npm test` (Vitest with jsdom)
- **Build:** `npm run build` (Vite production build)

### Non-obvious notes

- The Vite dev server binds to `::` (all interfaces) on port **8080**, not the default 5173.
- ESLint exits with code 1 due to pre-existing `@typescript-eslint/no-empty-object-type` and `@typescript-eslint/no-require-imports` errors in generated shadcn/ui components and `tailwind.config.ts`. These are not regressions.
- Path alias `@` maps to `./src` (configured in both `vite.config.ts` and `vitest.config.ts`).
