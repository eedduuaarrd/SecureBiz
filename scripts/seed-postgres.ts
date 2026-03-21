import { config } from "dotenv";
import { ensurePostgresSchema } from "../lib/postgres";
import { buildSeedSectors, seedRegulations } from "../lib/catalog";

config({ path: ".env.local" });
config();

async function run() {
  await ensurePostgresSchema();
  const sectors = buildSeedSectors().length;
  const regulations = seedRegulations.length;
  console.log(
    `Postgres schema OK. Catalog: ${sectors} sectors · ${regulations} regulations.`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

