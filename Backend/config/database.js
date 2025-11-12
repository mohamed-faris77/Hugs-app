import pg from 'pg';
import dotenv from 'dotenv';
import dns from 'dns';

// Load .env early
dotenv.config();

// Force Node to prefer IPv4 (Render fix)
dns.setDefaultResultOrder('ipv4first');

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 20,
  allowExitOnIdle: true,
});

// Log pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client:', err.message);
});

// Retry logic for connection
const connectWithRetry = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      console.log('Database connected successfully!');
      client.release();
      return;
    } catch (err) {
      console.error(`Database connection attempt ${i + 1} failed: ${err.message}`);
      if (i === retries - 1) {
        console.error('All connection attempts failed. Exiting...');
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};

connectWithRetry();

// Export BOTH: named AND default
export { pool };
export default pool;  // ← This allows `import pool from ...`
