#!/usr/bin/env bash
#
# First-time provisioning for the OddsTrading VPS (Ubuntu, Hostinger KVM).
# Idempotent — safe to re-run. Run once as root:
#
#   bash deploy/setup-server.sh
#
# It does NOT issue certificates; DNS has to resolve to this box first.
# Run deploy/enable-tls.sh once the A records have propagated.
set -euo pipefail

REPO_URL="https://github.com/nostratechsas/oddstrading.git"
ROOT="/var/www/oddstrading"
NODE_MAJOR="22" # Active LTS. Next 16 needs >= 20.9.

log() { printf '\n\033[1;32m==>\033[0m %s\n' "$1"; }

[[ $EUID -eq 0 ]] || { echo "Run as root."; exit 1; }

log "Base packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq curl git nginx ufw ca-certificates gnupg

log "Node.js ${NODE_MAJOR}.x"
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v)" != v${NODE_MAJOR}* ]]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y -qq nodejs
fi
node -v && npm -v

log "PM2 + Corepack (the landing builds with Yarn 4, the dashboard with npm)"
npm install -g pm2@latest >/dev/null
corepack enable
# No TTY here, so Corepack must not stop to confirm the Yarn download.
export COREPACK_ENABLE_DOWNLOAD_PROMPT=0

log "Firewall — SSH and web only"
ufw allow OpenSSH >/dev/null
ufw allow 'Nginx Full' >/dev/null
ufw --force enable >/dev/null
ufw status verbose

log "Source checkout at ${ROOT}"
mkdir -p "$(dirname "$ROOT")"
if [[ -d "$ROOT/.git" ]]; then
  git -C "$ROOT" remote set-url origin "$REPO_URL"
  git -C "$ROOT" fetch --depth 1 origin main
  git -C "$ROOT" reset --hard origin/main
else
  git clone --depth 1 "$REPO_URL" "$ROOT"
fi
mkdir -p "$ROOT/logs" /var/cache/nginx/oddstrading

log "Nginx site"
cp "$ROOT/deploy/nginx/oddstradingview.conf" /etc/nginx/sites-available/oddstradingview.conf
ln -sf /etc/nginx/sites-available/oddstradingview.conf /etc/nginx/sites-enabled/oddstradingview.conf
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

log "Environment files"
# Written only if absent, so a re-run never clobbers real secrets.
if [[ ! -f "$ROOT/.env.production" ]]; then
  cat > "$ROOT/.env.production" <<'ENV'
NEXT_PUBLIC_SITE_URL=https://oddstradingview.com

# Where "Iniciar sesión" points. Without it the link falls back to localhost.
NEXT_PUBLIC_APP_URL=https://app.oddstradingview.com

# Leads are only written to the PM2 log until this points at a real upstream.
CONTACT_ENDPOINT=

# Orders are only written to the PM2 log until this points at a real upstream.
CHECKOUT_ENDPOINT=
ENV
fi
# The dashboard reads no environment variables, so it gets no env file.

log "Build and start"
bash "$ROOT/deploy/deploy.sh" --skip-pull

log "PM2 boot on reboot"
pm2 startup systemd -u root --hp /root >/dev/null
pm2 save

log "Done. Point DNS here, then run deploy/enable-tls.sh"
