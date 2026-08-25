#!/usr/bin/env bash
# Air environment startup script for matter-ai-prototyping
# (Vite + React + TypeScript + Tailwind/shadcn-ui single-page app).
#
# Runs in two modes, announced by AIR_STARTUP_MODE:
#   warmup - snapshot-baking run (also used by environment-setup verification):
#            install deps, prime caches, run the smoke test + production build,
#            start the dev server and BLOCK in healthcheck until it serves.
#   task   - real task run: install deps if needed, start the dev server in the
#            background and return promptly.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$REPO_DIR"

PORT="${VITE_DEV_PORT:-8080}"
PREVIEW_CONFIG="$SCRIPT_DIR/vite.preview.config.ts"
RUN_DIR="/tmp/air-matter-ai"
DEV_LOG="$RUN_DIR/vite-dev.log"
DEV_PID_FILE="$RUN_DIR/vite-dev.pid"
DEPS_STAMP="node_modules/.air-deps-stamp"
# Any Host header must be accepted: the public proxy forwards its own hostname.
PROBE_HOST="air-preview-probe.example.com"

if [ "${AIR_STARTUP_MODE:-}" = warmup ]; then WARMUP=1; else WARMUP=; fi

log() { printf '[startup %s] %s\n' "$(date -u '+%H:%M:%S')" "$*"; }

mkdir -p "$RUN_DIR"

# --- dependencies -----------------------------------------------------------

deps_fingerprint() {
  cat package.json package-lock.json 2>/dev/null | sha256sum | cut -d' ' -f1
}

install_deps() {
  local want
  want="$(deps_fingerprint)"

  if [ -f "$DEPS_STAMP" ] && [ "$(cat "$DEPS_STAMP")" = "$want" ]; then
    log "dependencies already installed and up to date (skipping install)"
    return 0
  fi

  # package-lock.json is currently out of sync with package.json (the test
  # tooling was added without refreshing it), so `npm ci` is expected to fail
  # here. Fall back to a --no-save install so the working tree stays clean.
  log "installing npm dependencies (this is cached into the snapshot)"
  if npm ci --no-audit --no-fund > "$RUN_DIR/npm-ci.log" 2>&1; then
    log "npm ci succeeded"
  else
    log "npm ci failed - falling back to 'npm install --no-save' (full log: $RUN_DIR/npm-ci.log):"
    grep -m 3 'npm error' "$RUN_DIR/npm-ci.log" | sed 's/^/    /' || true
    npm install --no-save --no-audit --no-fund
  fi

  echo "$want" > "$DEPS_STAMP"
  log "dependencies installed"
}

# --- cache priming / smoke checks (warmup only) -----------------------------

prime_caches() {
  log "running unit tests (vitest) as an install smoke check"
  npm test

  log "running production build to prime the vite/swc build caches"
  npm run build

  log "pre-bundling dev dependencies (vite optimize)"
  ./node_modules/.bin/vite optimize --config "$PREVIEW_CONFIG" --force
}

# --- dev server -------------------------------------------------------------

dev_server_pid() {
  [ -f "$DEV_PID_FILE" ] || return 1
  local pid
  pid="$(cat "$DEV_PID_FILE" 2>/dev/null || true)"
  [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null && printf '%s' "$pid"
}

start_dev_server() {
  mkdir -p "$RUN_DIR"

  if dev_server_pid >/dev/null; then
    log "vite dev server already running (pid $(dev_server_pid))"
    return 0
  fi

  log "starting vite dev server on 0.0.0.0:$PORT (log: $DEV_LOG)"
  : > "$DEV_LOG"
  nohup ./node_modules/.bin/vite --config "$PREVIEW_CONFIG" >>"$DEV_LOG" 2>&1 &
  local pid=$!
  disown "$pid" 2>/dev/null || true
  echo "$pid" > "$DEV_PID_FILE"
  log "vite dev server started (pid $pid)"
}

# --- healthcheck ------------------------------------------------------------
# Asserts the environment really works for a task: the dev server answers on
# its port through a proxied Host header AND actually transforms app sources.
# Polls until ready; no internal timeout (the setup system applies its own).
healthcheck() {
  local attempt=0 pid code body

  log "healthcheck: waiting for the app to serve on http://127.0.0.1:$PORT/"
  while :; do
    attempt=$((attempt + 1))

    if ! pid="$(dev_server_pid)"; then
      log "healthcheck: FAILED - the vite dev server is not running any more"
      log "healthcheck: last lines of $DEV_LOG:"
      tail -n 40 "$DEV_LOG" || true
      return 1
    fi

    code="$(curl -s -o "$RUN_DIR/index.html" -w '%{http_code}' -m 15 \
      -H "Host: $PROBE_HOST" "http://127.0.0.1:$PORT/" || true)"
    body="$(cat "$RUN_DIR/index.html" 2>/dev/null || true)"

    if [ "$code" = "200" ]; then
      # A host-check page answers 200 too, but is a hard configuration error.
      case "$body" in
        *"Blocked request"*|*"Invalid Host header"*)
          log "healthcheck: FAILED - vite rejected the forwarded Host header:"
          printf '%s\n' "$body" | head -n 5
          return 1
          ;;
      esac

      case "$body" in
        *'id="root"'*'/src/main.tsx'*)
          # index.html is served; now prove the TS/React transform pipeline works.
          code="$(curl -s -o "$RUN_DIR/main.js" -w '%{http_code}' -m 60 \
            -H "Host: $PROBE_HOST" "http://127.0.0.1:$PORT/src/main.tsx" || true)"
          if [ "$code" = "200" ] && grep -q 'createRoot' "$RUN_DIR/main.js"; then
            log "healthcheck: OK - index.html and the compiled /src/main.tsx module both served (attempt $attempt)"
            return 0
          fi
          log "healthcheck: index.html is up, /src/main.tsx returned HTTP $code - still compiling"
          ;;
        *)
          log "healthcheck: HTTP 200 but the app shell was not recognised yet"
          ;;
      esac
    else
      if [ $((attempt % 5)) -eq 1 ]; then
        log "healthcheck: HTTP $code from the dev server (pid $pid) - still starting"
        tail -n 5 "$DEV_LOG" || true
      fi
    fi

    sleep 3
  done
}

# --- main -------------------------------------------------------------------

log "repository: $REPO_DIR"
log "mode: ${AIR_STARTUP_MODE:-task}; node $(node -v); npm $(npm -v)"

install_deps

if [ -n "$WARMUP" ]; then
  prime_caches
fi

start_dev_server

if [ -n "$WARMUP" ]; then
  healthcheck
  log "environment verified: the app is served on port $PORT"
else
  log "dev server starting in the background; it will answer on port $PORT shortly"
fi

log "startup complete"
