import pg from 'pg';
const { Pool } = pg;
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "../../../shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Parse base DATABASE_URL to get connection details
const baseUrl = new URL(process.env.DATABASE_URL);

// Create a factory function to create database connections for different companies
export function createDatabaseConnection(databaseName: string) {
  // Build company-specific connection string
  const companyDbUrl = new URL(baseUrl.toString());
  companyDbUrl.pathname = `/${databaseName}`;
  
  const pool = new Pool({ 
    connectionString: companyDbUrl.toString(),
    ssl: false
  });

  pool.on('error', (err) => {
    console.error(`Database pool error for ${databaseName}:`, err);
  });

  return drizzle({ client: pool, schema });
}

// Default connection (for migrations and system operations)
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

// Keep old export name for backwards compatibility
export const defaultPool = pool;

pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err);
});

export const db = drizzle({ client: pool, schema });

// Cache for database connections per company
const dbConnections = new Map<string, ReturnType<typeof createDatabaseConnection>>();

/**
 * Get database connection for a specific company
 * Caches connections to avoid creating new pools for each request
 */
export function getCompanyDatabase(companyId: string) {
  if (!dbConnections.has(companyId)) {
    dbConnections.set(companyId, createDatabaseConnection(companyId));
  }
  return dbConnections.get(companyId)!;
}

/**
 * Close all database connections (for graceful shutdown)
 */
export async function closeAllDatabases() {
  for (const db of dbConnections.values()) {
    // Drizzle doesn't expose the pool directly, so we just let Node.js handle cleanup
  }
  dbConnections.clear();
}
