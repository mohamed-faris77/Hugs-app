import pg from 'pg';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

// ✅ Force Node to prefer IPv4 (Render has IPv6 routing issues)
dns.setDefaultResultOrder('ipv4first');

const { Pool } = pg;

// ✅ Create the connection pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase/Render
  },
  connectionTimeoutMillis: 10000, // 10s timeout for connecting
  idleTimeoutMillis: 30000,       // 30s idle timeout
  max: 20,                        // Max concurrent connections
  allowExitOnIdle: true,
});

// ✅ Handle pool-level errors safely
pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client:', err.message);
});

// ✅ Retry connection with backoff
const connectWithRetry = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      console.log('✅ Database connected successfully');
      client.release();
      return;
    } catch (err) {
      console.error(`❌ Database connection attempt ${i + 1} failed: ${err.message}`);
      if (i === retries - 1) {
        console.error('❌ All connection attempts failed. Exiting...');
        process.exit(1);
      }
      // Wait 2 seconds before retry
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};

// ✅ Initiate connection
connectWithRetry();

export default pool;
