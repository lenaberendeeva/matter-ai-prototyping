#!/usr/bin/env bash
# Air cloud startup script for matter-ai-prototyping (Vite + React + TS landing pages).
# WARMUP: install deps, verify build + tests, start dev server and block until it serves.
# TASK:   install deps (fast from snapshot), start dev server in background, exit promptly.
set -euo pipefail

if [ "${AIR_STARTUP_MODE:-}" = warmup ]; then WARMUP=1; else WARMUP=; fi

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_DIR"
PORT=8080
DEV_LOG=/tmp/vite-dev.log

echo "[startup] mode=${AIR_STARTUP_MODE:-unset} repo=$REPO_DIR node=$(node -v) npm=$(npm -v)"

# package-lock.json is out of sync with package.json (test deps missing), so `npm ci` fails.
# --no-save installs everything without rewriting the committed lockfile.
echo "[startup] npm install..."
npm install --no-save --no-audit --no-fund --loglevel=error
echo "[startup] npm install done"

healthcheck() {
  echo "[healthcheck] production build smoke (vite build -> /tmp/air-build-check)"
  npx vite build --outDir /tmp/air-build-check --emptyOutDir --logLevel warn
  echo "[healthcheck] unit tests (vitest run)"
  npx vitest run
  echo "[healthcheck] waiting for dev server on :$PORT"
  local n=0 body
  until body="$(curl -fsS -H 'Host: air-proxy-check.example.net' "http://127.0.0.1:$PORT/" 2>/dev/null)" \
        && grep -q 'id="root"' <<<"$body"; do
    n=$((n + 1))
    if ! pgrep -f "vite.*--config .air/cloud/vite.config.mjs" >/dev/null; then
      echo "[healthcheck] dev server process died; log tail:"; tail -n 40 "$DEV_LOG" || true
      return 1
    fi
    if [ $((n % 10)) -eq 0 ]; then echo "[healthcheck] still waiting (${n}s)..."; tail -n 3 "$DEV_LOG" || true; fi
    sleep 1
  done
  echo "[healthcheck] dev server serves index.html with foreign Host header; checking app module"
  curl -fsS -H 'Host: air-proxy-check.example.net' "http://127.0.0.1:$PORT/src/main.tsx" >/dev/null
  echo "[healthcheck] OK"
}

if ! curl -fsS "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
  echo "[startup] starting Vite dev server on 0.0.0.0:$PORT (log: $DEV_LOG)"
  nohup npx vite --config .air/cloud/vite.config.mjs > "$DEV_LOG" 2>&1 &
else
  echo "[startup] something already answers on :$PORT, not starting another dev server"
fi

if [ -n "$WARMUP" ]; then healthcheck; fi
echo "[startup] done"
