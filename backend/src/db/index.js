import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction
    ? {
        rejectUnauthorized: false
    }
    : false
});

pool.query("SELECT NOW()")
  .then(res => console.log("✅ DB Connected:", res.rows[0]))
  .catch(err => console.error("❌ DB Connection Failed:", err));


export default pool;