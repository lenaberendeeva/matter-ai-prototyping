# AGENTS.md

## Cursor Cloud specific instructions

This is a single-service frontend React SPA (Vite + TypeScript + Tailwind + shadcn/ui). No backend, database, or Docker required.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 8080) |
| Lint | `npm run lint` |
| Test | `npm run test` |
| Build | `npm run build` |

### Notes

- The lockfile is `package-lock.json`; use **npm** (not pnpm/yarn).
- ESLint reports 3 pre-existing errors and 7 warnings in generated shadcn/ui components — these are upstream and not regressions.
- Vitest has one placeholder test (`src/test/example.test.ts`).
- The dev server binds to `::` (all interfaces) on port **8080** with HMR overlay disabled (see `vite.config.ts`).
