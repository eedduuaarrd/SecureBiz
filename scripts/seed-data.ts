import { config } from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import { buildSeedSectors, seedRegulations } from "../lib/catalog";

config({ path: ".env.local" });
config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME ?? "securebiz_ai";

if (!uri) {
  throw new Error("Missing MONGODB_URI in environment.");
}
const mongoUri: string = uri;

async function run() {
  const client = new MongoClient(mongoUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  const db = client.db(dbName);

  const sectors = buildSeedSectors().map((sector) => ({
    name: sector.name,
    slug: sector.slug,
    main_risks: sector.mainRisks,
  }));

  await db.collection("sectors").createIndex({ slug: 1 }, { unique: true });
  await db.collection("regulations").createIndex({ slug: 1 }, { unique: true });
  await db
    .collection("generated_content")
    .createIndex({ sector_slug: 1, regulation_slug: 1 }, { unique: true });
  await db.collection("leads").createIndex({ timestamp: -1 });

  for (const sector of sectors) {
    await db.collection("sectors").updateOne(
      { slug: sector.slug },
      {
        $set: sector,
      },
      { upsert: true },
    );
  }

  for (const regulation of seedRegulations) {
    await db.collection("regulations").updateOne(
      { slug: regulation.slug },
      {
        $set: regulation,
      },
      { upsert: true },
    );
  }

  console.log(
    `Seed completed: ${sectors.length} sectors and ${seedRegulations.length} regulations.`,
  );

  await client.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
