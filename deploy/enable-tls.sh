#!/usr/bin/env bash
#
# Issue Let's Encrypt certificates for all three hostnames and switch Nginx to
# HTTPS. Run as root ONLY after the A records resolve to this server:
#
#   bash /var/www/oddstrading/deploy/enable-tls.sh
#
# Certbot rewrites the site file in place to add the 443 listeners and the
# port-80 redirect, and installs a systemd timer that renews automatically.
set -euo pipefail

EMAIL="contact@oddstradingview.com"
DOMAINS=(oddstradingview.com www.oddstradingview.com app.oddstradingview.com)

log() { printf '\n\033[1;32m==>\033[0m %s\n' "$1"; }

[[ $EUID -eq 0 ]] || { echo "Run as root."; exit 1; }

log "Checking DNS before asking Let's Encrypt for anything"
# A failed challenge counts against the rate limit, so verify resolution first.
MYIP="$(curl -fsS https://api.ipify.org)"
for domain in "${DOMAINS[@]}"; do
  resolved="$(getent hosts "$domain" | awk '{print $1}' | head -1 || true)"
  if [[ "$resolved" != "$MYIP" ]]; then
    echo "  $domain resolves to '${resolved:-nothing}', expected $MYIP"
    echo "  DNS has not propagated yet. Wait and re-run."
    exit 1
  fi
  echo "  $domain -> $resolved  OK"
done

log "Installing certbot"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq certbot python3-certbot-nginx

log "Issuing certificates"
certbot --nginx \
  --non-interactive \
  --agree-tos \
  --email "$EMAIL" \
  --redirect \
  $(printf -- '-d %s ' "${DOMAINS[@]}")

log "Renewal dry run"
certbot renew --dry-run

nginx -t && systemctl reload nginx
log "HTTPS is live"
