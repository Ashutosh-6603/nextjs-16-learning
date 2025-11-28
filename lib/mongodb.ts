import mongoose, { ConnectOptions } from "mongoose";

/**
 * Type-safe interface for the cached Mongoose connection stored on `globalThis`.
 * This avoids using `any` while allowing us to reuse the connection across
 * hot reloads in development and across API route invocations.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Augment the global type definition to include our Mongoose cache.
 *
 * In Next.js (Node.js runtime), `globalThis` is shared between hot reloads
 * in development, so we can safely attach a cache object to it.
 */
declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // Fail fast in case the environment variable is not configured.
  throw new Error(
    "Please define the MONGODB_URI environment variable in your environment."
  );
}

// Initialize the global cache if it does not exist yet.
const cached: MongooseCache = global._mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global._mongooseCache) {
  global._mongooseCache = cached;
}

/**
 * Establishes (or reuses) a single Mongoose connection to MongoDB.
 *
 * This function is safe to call from:
 * - Next.js Route Handlers / API routes
 * - `getServerSideProps` / server components
 *
 * It ensures that:
 * - In development, we do not create a new connection on every hot reload.
 * - In production, we open exactly one connection per server instance.
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  // If a connection is already established, reuse it.
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection is already being established, reuse the existing promise.
  if (!cached.promise) {
    const options: ConnectOptions = {
      // Add any options you need here (e.g. authSource, dbName, etc.).
      // Keep this minimal by default for production readiness.
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI as string, options)
      .then((mongooseInstance) => mongooseInstance);
  }

  // Await the connection promise and cache the resolved connection instance.
  cached.conn = await cached.promise;

  return cached.conn;
}

export default connectToDatabase;
