import { MongoClient, Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB || "devraj_cms";

let clientPromise: Promise<MongoClient> | null = null;

export function isMongoConfigured(): boolean {
  return Boolean(uri && uri.trim().length > 0);
}

export function getMongoClientPromise(): Promise<MongoClient> | null {
  if (!isMongoConfigured()) {
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
      });
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    // However, in serverless environments (e.g. Vercel), reusing across function invocations
    // is recommended to avoid connection leaks:
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
      });
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }
}

export async function getDb(): Promise<Db | null> {
  const promise = getMongoClientPromise();
  if (!promise) return null;

  try {
    const client = await promise;
    return client.db(dbName);
  } catch (err) {
    console.error("[MongoDB] Connection failure:", err);
    return null;
  }
}

export async function testMongoConnection(): Promise<{ connected: boolean; error?: string }> {
  if (!isMongoConfigured()) {
    return { connected: false, error: "MONGODB_URI environment variable is not defined." };
  }

  try {
    const db = await getDb();
    if (!db) {
      return { connected: false, error: "Failed to obtain database instance." };
    }

    // Ping server
    await db.command({ ping: 1 });
    return { connected: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown connection error";
    return { connected: false, error: msg };
  }
}
