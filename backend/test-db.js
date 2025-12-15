import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

async function test() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("DB connected:", res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
}

test();
