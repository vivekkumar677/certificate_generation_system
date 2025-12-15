import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is missing");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

// Test connection
pool.connect()
  .then(client => { console.log("PostgreSQL connected"); client.release(); })
  .catch(err => { console.error("PostgreSQL connection error:", err.message); process.exit(1); });

export default pool;
