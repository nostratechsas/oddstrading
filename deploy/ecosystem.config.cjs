/**
 * PM2 process definitions for the OddsTrading VPS.
 *
 * Two Next.js servers behind one Nginx reverse proxy:
 *   3000 → oddstradingview.com      (landing, this repo's root)
 *   3001 → app.oddstradingview.com  (dashboard, ./dashboard)
 *
 * `cluster` mode is deliberately avoided: Next already handles concurrency and
 * a second instance would double the memory for no gain on a marketing site.
 * Restart both with `pm2 reload ecosystem.config.cjs --update-env`.
 */
const path = require("node:path");

const ROOT = "/var/www/oddstrading";

/** Shared PM2 behaviour — restart on crash, cap memory, keep logs dated. */
const common = {
  exec_mode: "fork",
  instances: 1,
  autorestart: true,
  max_restarts: 10,
  // Next leaks nothing at this size, but a ceiling turns a runaway into a
  // restart instead of an OOM kill that takes the whole box down.
  max_memory_restart: "600M",
  log_date_format: "YYYY-MM-DD HH:mm:ss Z",
  merge_logs: true,
};

module.exports = {
  apps: [
    {
      ...common,
      name: "oddstrading-landing",
      cwd: ROOT,
      script: "node_modules/next/dist/bin/next",
      args: "start --port 3000",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      error_file: path.join(ROOT, "logs/landing.error.log"),
      out_file: path.join(ROOT, "logs/landing.out.log"),
    },
    {
      ...common,
      name: "oddstrading-dashboard",
      cwd: path.join(ROOT, "dashboard"),
      script: "node_modules/next/dist/bin/next",
      args: "start --port 3001",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
      },
      error_file: path.join(ROOT, "logs/dashboard.error.log"),
      out_file: path.join(ROOT, "logs/dashboard.out.log"),
    },
  ],
};
