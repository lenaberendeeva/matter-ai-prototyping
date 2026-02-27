# AGENTS.md

## Cursor Cloud specific instructions

This is a React/TypeScript SPA (Vite + shadcn/ui + Tailwind CSS) with no backend services, no database, and no environment variables.

### Services

| Service | Command | Port |
|---|---|---|
| Vite Dev Server | `npm run dev` | 8080 |

### Key commands

See `package.json` scripts. Summary:

- **Dev server**: `npm run dev` (port 8080)
- **Lint**: `npm run lint` (ESLint 9 flat config)
- **Test**: `npm run test` (Vitest with jsdom)
- **Build**: `npm run build` (Vite production build)

### Notes

- The lockfile is `package-lock.json`; use `npm` (not pnpm/yarn/bun).
- Pre-existing lint errors come from scaffolded shadcn/ui components (empty interfaces, `require()` in tailwind config). These are not regressions.
- No Docker, no `.env` files, and no external service dependencies are needed.
