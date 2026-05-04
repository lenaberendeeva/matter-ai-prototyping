# AGENTS.md

## Cursor Cloud specific instructions

This is a React + TypeScript + Vite front-end SPA (no backend, no database, no external services).

### Quick reference

| Action | Command |
|--------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port **8080**) |
| Lint | `npm run lint` |
| Test | `npm run test` |
| Build | `npm run build` |

### Non-obvious notes

- The dev server binds to `::` (all interfaces) on port **8080**, configured in `vite.config.ts`.
- ESLint reports 3 pre-existing errors and 7 warnings from the shadcn/ui template code; these are not regressions.
- Node.js is managed via **nvm**. Source it before running npm commands: `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"`.
- There is only one trivial example test (`src/test/example.test.ts`). Use `npm run test` (vitest) to run it.
- The `lovable-tagger` dev dependency adds a component tagger plugin in development mode; it is harmless.
