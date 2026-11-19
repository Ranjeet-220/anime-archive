#!/usr/bin/env bash
# ANIME ARCHIVE — local PostgreSQL convenience script.
# Usage: ./scripts/db.sh {start|stop|status|seed|reset}
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PG_BIN="${PG_BIN:-/usr/bin}"
PGDATA="${PG_DATA_DIR:-$HOME/.local/share/anime_pgdata_v2}"
PGPORT="${PG_PORT:-5432}"
PGSOCK="${PG_SOCKET_DIR:-/tmp}"
PGLOG="$PGDATA/server.log"

require_bin() {
  if [ ! -x "$PG_BIN/pg_ctl" ] && command -v pg_ctl >/dev/null 2>&1; then
    PG_BIN="$(dirname "$(command -v pg_ctl)")"
  fi
  if [ ! -x "$PG_BIN/pg_ctl" ]; then
    echo "PostgreSQL binaries not found at $PG_BIN" >&2
    echo "Set PG_BIN to your PostgreSQL 15+ install (e.g. the zonkyio embedded binaries)." >&2
    exit 1
  fi
}

start() {
  require_bin
  mkdir -p "$PGDATA" "$PGSOCK"
  if "$PG_BIN/pg_ctl" -D "$PGDATA" status >/dev/null 2>&1; then
    echo "PostgreSQL already running on port $PGPORT."
    return
  fi
  if [ ! -f "$PGDATA/PG_VERSION" ]; then
    echo "Initialising data directory at $PGDATA…"
    "$PG_BIN/initdb" -D "$PGDATA" -U postgres --auth=trust >/dev/null
  fi
  echo "Starting PostgreSQL on port $PGPORT…"
  "$PG_BIN/pg_ctl" -D "$PGDATA" -l "$PGLOG" -o "-p $PGPORT -k $PGSOCK" start
  "$PG_BIN/pg_ctl" -D "$PGDATA" status
}

stop() {
  require_bin
  "$PG_BIN/pg_ctl" -D "$PGDATA" stop -m fast 2>/dev/null || echo "Not running."
}

status() {
  require_bin
  "$PG_BIN/pg_ctl" -D "$PGDATA" status 2>/dev/null || echo "PostgreSQL is not running."
}

seed() {
  start
  cd "$ROOT"
  export DATABASE_URL="${DATABASE_URL:-postgresql://postgres@localhost:$PGPORT/animearchive}"
  # Create the database if missing and verify connectivity (no psql in the
  # embedded binaries, so use node).
  node -e "
    let Client;
    try {
      Client = require('pg').Client;
    } catch {
      Client = require(process.cwd() + '/node_modules/pg').Client;
    }
    const url = new URL(process.env.DATABASE_URL);
    const db = url.pathname.slice(1) || 'animearchive';
    const admin = new Client({
      host: url.hostname || 'localhost',
      port: Number(url.port) || 5432,
      user: url.username || 'postgres',
      password: url.password ? decodeURIComponent(url.password) : undefined,
      database: 'postgres',
    });
    admin.connect().then(async () => {
      const r = await admin.query('SELECT 1 FROM pg_database WHERE datname = \$1', [db]);
      if (r.rowCount === 0) {
        const cleanDb = db.replace(/\"/g, '\"\"');
        await admin.query('CREATE DATABASE \"' + cleanDb + '\"');
        console.log('created database ' + cleanDb);
      }
      await admin.end();
    }).catch((e) => { console.error(e.message); process.exit(1); });
  "
  npm run migrate
  npm run seed
  echo "Database ready: $DATABASE_URL"
}

case "${1:-}" in
  start)  start ;;
  stop)   stop ;;
  status) status ;;
  seed)   seed ;;
  reset)
    stop
    if [ -n "$PGDATA" ] && [ "$PGDATA" != "/" ] && [ "$PGDATA" != "$HOME" ]; then
      rm -rf "$PGDATA"
    fi
    start
    seed
    ;;
  *) echo "Usage: $0 {start|stop|status|seed|reset}" >&2; exit 1 ;;
esac