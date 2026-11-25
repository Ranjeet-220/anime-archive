import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";
import { Client } from "pg";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
nextEnv.loadEnvConfig(root, true);

async function checkConnection(connectionString) {
  const client = new Client({ connectionString, connectionTimeoutMillis: 4000, query_timeout: 4000 });
  try {
    await client.connect();
    await client.query("SELECT 1");
  } finally {
    await client.end();
  }
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Set DATABASE_URL in your environment or .env file.");

  const url = new URL(connectionString);
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  const port = url.port || "5432";
  const dataDir = process.env.PG_DATA_DIR || join(homedir(), ".local/share/anime_pgdata_v2");

  try {
    await checkConnection(connectionString);
  } catch (error) {
    const refused = error.code === "ECONNREFUSED" || (
      error instanceof AggregateError && error.errors.length > 0 &&
      error.errors.every((cause) => cause.code === "ECONNREFUSED")
    );
    if (!local || !refused || port !== (process.env.PG_PORT || "5432") ||
        !existsSync(resolve(root, dataDir, "PG_VERSION"))) {
      throw error;
    }

    const start = spawnSync("bash", ["scripts/db.sh", "start"], { cwd: root, stdio: "inherit" });
    if (start.error) throw start.error;
    await checkConnection(connectionString);
  }
}

main().catch((error) => {
  const detail = error.code ? ` (${error.code})` : "";
  if (!process.env.DATABASE_URL) {
    console.error(error.message);
  } else {
    console.error(`Development database check failed${detail}. Check DATABASE_URL and start the configured PostgreSQL server.`);
  }
  process.exitCode = 1;
});
