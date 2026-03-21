import { MongoClient } from "mongodb";

const dbName = process.env.MONGODB_DB_NAME ?? "securebiz_ai";

const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise() {
  // Some deploy environments may store env vars with invisible whitespace/newlines.
  // Mongo URI must not contain whitespace; normalize defensively.
  const uriRaw = process.env.MONGODB_URI;
  const uri = uriRaw
    ? uriRaw.replace(/[\r\n\t]/g, "").trim()
    : uriRaw;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  if (!globalWithMongo._mongoClientPromise) {
    const connectOnce = async (
      targetUri: string,
      options?: {
        directConnection?: boolean;
      },
    ) => {
      const client = new MongoClient(targetUri, {
        tls: true,
        // In serverless environments, these timeouts prevent hanging promises.
        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        directConnection: options?.directConnection,
      });
      return client.connect();
    };

    const buildSrvToDirectUri = (inputUri: string): string | null => {
      if (!inputUri.startsWith("mongodb+srv://")) return null;
      // Convert the scheme but keep the rest of the query string.
      return inputUri.replace(/^mongodb\+srv:\/\//, "mongodb://");
    };

    globalWithMongo._mongoClientPromise = (async () => {
      const directUri = buildSrvToDirectUri(uri);
      let srvErr: unknown;

      try {
        return await connectOnce(uri);
      } catch (err) {
        srvErr = err;
      }

      if (!directUri) {
        throw srvErr;
      }

      try {
        // With a "mongodb://" URI, force directConnection to avoid SRV.
        return await connectOnce(directUri, { directConnection: true });
      } catch (directErr) {
        const srvMsg = (srvErr as { message?: string })?.message ?? String(srvErr);
        const directMsg =
          (directErr as { message?: string })?.message ?? String(directErr);
        throw new Error(`Mongo connect failed. srv: ${srvMsg}. direct: ${directMsg}`);
      }
    })().catch((err) => {
      // Avoid getting stuck in a permanently rejected promise.
      globalWithMongo._mongoClientPromise = undefined;
      throw err;
    });
  }

  return globalWithMongo._mongoClientPromise;
}

export async function getDb() {
  const mongoClient = await getClientPromise();
  return mongoClient.db(dbName);
}
