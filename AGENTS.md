# AGENTS.md

## Cursor Cloud specific instructions

This is a frontend-only React + TypeScript landing page ("Matter by JetBrains") scaffolded with Lovable. There is no backend, database, or external service dependency.

### Key commands

All standard commands are in `package.json` scripts:

| Task | Command | Notes |
|------|---------|-------|
| Dev server | `npm run dev` | Vite on port **8080** |
| Lint | `npm run lint` | ESLint 9 flat config; pre-existing warnings/errors in shadcn/ui components are expected |
| Test | `npm run test` | Vitest with jsdom |
| Build | `npm run build` | Production build to `dist/` |

### Non-obvious caveats

- The ESLint config lints `.ts` / `.tsx` files only. There are 3 pre-existing errors and 7 warnings from auto-generated shadcn/ui components and `tailwind.config.ts` — these are not regressions.
- Running `npm run lint` while the Vite dev server is actively compiling can fail with `ENOENT` on a temporary `.timestamp-*.mjs` file. Re-run lint after the dev server stabilizes.
- Path alias `@/` maps to `./src/` (configured in both `vite.config.ts` and `vitest.config.ts`).
- Both `package-lock.json` (npm) and `bun.lockb` (Bun) exist; use **npm** as the canonical package manager.
