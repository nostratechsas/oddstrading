#!/usr/bin/env bash
#
# Pull, build and reload both apps. Run on the VPS:
#
#   bash /var/www/oddstrading/deploy/deploy.sh
#
# Builds into a fresh directory before swapping, so a failed build leaves the
# currently-serving version untouched.
set -euo pipefail

ROOT="/var/www/oddstrading"
SKIP_PULL="${1:-}"

log() { printf '\n\033[1;32m==>\033[0m %s\n' "$1"; }

cd "$ROOT"

if [[ "$SKIP_PULL" != "--skip-pull" ]]; then
  log "Fetching origin/main"
  git fetch --depth 1 origin main
  git reset --hard origin/main
fi

log "Landing — install (Yarn 4 via Corepack)"
corepack yarn install --immutable

log "Landing — build"
# `next build` replaces .next atomically enough for a marketing site; PM2 is
# reloaded straight after so no request is served from a half-written manifest.
corepack yarn build

log "Dashboard — install (npm)"
cd "$ROOT/dashboard"
npm ci --no-audit --no-fund

log "Dashboard — build"
npm run build

log "Reload PM2"
cd "$ROOT"
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
pm2 save

log "Status"
pm2 list
